import React, { useState, useEffect, useCallback } from 'react';
import Button from '../components/Button';
import { CHARACTERS } from '../gameData/characters';
import './CombatScene.css';

const getCharacterStats = (charKey) => {
    const allStats = JSON.parse(localStorage.getItem('characterStats')) || {};
    if (allStats[charKey]) {
        return allStats[charKey];
    }
    return { level: 1, xp: 0, fatigue: 0 };
};

const saveCharacterStats = (charKey, stats) => {
    const allStats = JSON.parse(localStorage.getItem('characterStats')) || {};
    allStats[charKey] = stats;
    localStorage.setItem('characterStats', JSON.stringify(allStats));
};

const HpBar = ({ currentHp, maxHp }) => {
    const percentage = (currentHp / maxHp) * 100;
    let barClass = 'hp-bar';
    if (percentage < 50) barClass += ' low';
    if (percentage < 25) barClass += ' critical';
  
    return (
      <div className="hp-bar-container">
        <div className={barClass} style={{ width: `${percentage}%` }}></div>
      </div>
    );
};

const CharacterDisplay = ({ character, isBot }) => {
    if (!character) return null;
    return (
      <div className="character-display">
        <img 
          src={character.data.imageSelected} 
          alt={character.data.name} 
          className={`character-image ${isBot ? 'bot' : ''}`} 
        />
        <div className="stats-display">
          <h2 className="character-name-combat">{character.data.name}</h2>
          <p className='level-text'>Level: {character.level}</p>
          <HpBar currentHp={character.hp} maxHp={character.maxHp} />
          <p className="hp-text">{character.hp} / {character.maxHp}</p>
        </div>
      </div>
    );
};

const CombatScene = ({ player1Key, botKey, changeScene }) => {
    const [player, setPlayer] = useState(null);
    const [bot, setBot] = useState(null);
    const [turn, setTurn] = useState('player'); 
    const [combatLog, setCombatLog] = useState([]);
    const [gameOver, setGameOver] = useState(null); 
    const [specialCharges, setSpecialCharges] = useState(0);

    useEffect(() => {
        const playerStats = getCharacterStats(player1Key);
        const playerData = CHARACTERS[player1Key];
        const playerMaxHp = playerData.baseHp + (playerData.hpPerLevel * (playerStats.level - 1));
        
        setPlayer({
            key: player1Key,
            data: playerData,
            level: playerStats.level,
            maxHp: playerMaxHp,
            hp: playerMaxHp,
            attack: playerData.baseAttack + (playerData.attackPerLevel * (playerStats.level - 1))
        });

        const botStats = getCharacterStats(botKey);
        const botData = CHARACTERS[botKey];
        const botMaxHp = botData.baseHp + (botData.hpPerLevel * (botStats.level - 1));

        setBot({
            key: botKey,
            data: botData,
            level: botStats.level,
            maxHp: botMaxHp,
            hp: botMaxHp,
            attack: botData.baseAttack + (botData.attackPerLevel * (botStats.level - 1))
        });

        addLogMessage(`A batalha começa! ${playerData.name} (Lvl ${playerStats.level}) vs. ${botData.name} (Lvl ${botStats.level})!`);
    }, [player1Key, botKey]);

    const addLogMessage = (message) => {
        setCombatLog(prevLog => [message, ...prevLog]);
    };
    
    const handleWin = () => {
        setGameOver('win');
        const stats = getCharacterStats(player.key);
        stats.level += 1;
        stats.xp = 0; // Zera o XP ao subir de nível
        saveCharacterStats(player.key, stats);
        addLogMessage(`Você venceu! ${player.data.name} subiu para o nível ${stats.level}!`);
    };

    const handlePlayerAttack = (ability) => {
        if (turn !== 'player' || gameOver) return;

        const damage = ability.damage + player.attack;
        addLogMessage(`Você usou ${ability.name} e causou ${damage} de dano!`);
        
        const newBotHp = Math.max(0, bot.hp - damage);
        setBot(b => ({ ...b, hp: newBotHp }));

        if (newBotHp === 0) {
            handleWin();
            return;
        }

        if(specialCharges < player.data.special.cost) {
            setSpecialCharges(c => c + 1);
        }

        setTurn('bot');
    };

    const handlePlayerSpecial = () => {
        if (turn !== 'player' || gameOver || specialCharges < player.data.special.cost) return;

        const special = player.data.special;
        const damage = special.damage + player.attack;
        addLogMessage(`ATAQUE ESPECIAL! Você usou ${special.name} e causou ${damage} de dano!`);
        
        const newBotHp = Math.max(0, bot.hp - damage);
        setBot(b => ({ ...b, hp: newBotHp }));

        if (newBotHp === 0) {
            handleWin();
            return;
        }
        
        setSpecialCharges(0);
        setTurn('bot');
    }

    const handleBotTurn = useCallback(() => {
        if (!bot || !player || gameOver) return;
        
        const ability = bot.data.abilities[Math.floor(Math.random() * bot.data.abilities.length)];
        const damage = ability.damage + bot.attack;
        
        addLogMessage(`${bot.data.name} usou ${ability.name} e causou ${damage} de dano!`);

        const newPlayerHp = Math.max(0, player.hp - damage);
        setPlayer(p => ({ ...p, hp: newPlayerHp }));
        
        if (newPlayerHp === 0) {
            setGameOver('lose');
            addLogMessage('Você foi derrotado!');
            return;
        }
        
        setTurn('player');

    }, [bot, player, gameOver]);


    // Efeito para o turno do Bot
    useEffect(() => {
        if (turn === 'bot' && !gameOver) {
            const timer = setTimeout(() => {
                handleBotTurn();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [turn, gameOver, handleBotTurn]);

    if (!player || !bot) {
        return <div className="scene-container"><h1 className="scene-title">Carregando Batalha...</h1></div>;
    }

    const playerCurrentLevel = getCharacterStats(player.key).level;

    return (
        <div className="combat-container">
            {gameOver && (
                <div className="game-over-modal">
                    <h1 className="game-over-title">{gameOver === 'win' ? 'VITÓRIA!' : 'DERROTA!'}</h1>
                    <p className="game-over-text">
                        {gameOver === 'win' ? `${player.data.name} evoluiu para o nível ${playerCurrentLevel}!` : 'Tente novamente!'}
                    </p>
                    <Button onClick={() => changeScene('characterSelection')}>JOGAR NOVAMENTE</Button>
                </div>
            )}
            
            <div className="battlefield">
                <CharacterDisplay character={player} />
                <CharacterDisplay character={bot} isBot={true} />
            </div>

            <div className="ui-panel">
                <div className="actions-menu">
                    {player.data.abilities.map(ability => (
                        <Button key={ability.name} onClick={() => handlePlayerAttack(ability)} disabled={turn !== 'player' || gameOver}>
                            {ability.name.toUpperCase()}
                        </Button>
                    ))}
                    <Button 
                        onClick={handlePlayerSpecial} 
                        disabled={turn !== 'player' || gameOver || specialCharges < player.data.special.cost}>
                        {player.data.special.name.toUpperCase()} ({specialCharges}/{player.data.special.cost})
                    </Button>
                </div>
                <div className="combat-log-container">
                    {combatLog.map((msg, index) => (
                        <p key={index} className="combat-log-message">{msg}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CombatScene;