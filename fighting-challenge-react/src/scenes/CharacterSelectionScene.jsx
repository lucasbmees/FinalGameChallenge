import React, { useState, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import Button from '../components/Button';
import './CharacterSelectionScene.css';
import './../App.css';

const CharacterSelectionScene = ({ changeScene, onCombatStart }) => {
  const { themes } = useContext(ThemeContext);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [hoveredCharacter, setHoveredCharacter] = useState(null);

  const characters = Object.keys(themes).filter(key => key !== 'padrao').map(key => ({
      key,
      ...themes[key]
  }));

  const handleSelectCharacter = (characterKey) => {
    if (player1 === characterKey || player2 === characterKey) {
        return;
    }

    if (currentPlayer === 1) {
      setPlayer1(characterKey);
      setCurrentPlayer(2);
    } else {
      setPlayer2(characterKey);
      setCurrentPlayer(null); 
    }
  };

  const getPlayerSelectionText = (playerNumber) => {
    const playerName = `JOGADOR ${playerNumber}`;
    const selectedKey = playerNumber === 1 ? player1 : player2;

    if (selectedKey) {
        return `${playerName}: ${themes[selectedKey].nome}`;
    }
    if(playerNumber === 2) return `${playerName} (BOT): ESCOLHA...`;

    return `${playerName}: ESCOLHA...`;
  };

  const renderPlayerStatus = (playerNumber) => {
    const selectedKey = playerNumber === 1 ? player1 : player2;
    const isActive = currentPlayer === playerNumber;

    return (
        <div className={`player-status ${isActive ? 'active' : ''}`}>
            <h2>{getPlayerSelectionText(playerNumber)}</h2>
            {selectedKey && (
                <img src={themes[selectedKey].imageSelected} alt={themes[selectedKey].nome} className="selected-character-image" />
            )}
        </div>
    );
  };

  return (
    <div className="scene-container character-selection-container">
      <h1 className="scene-title">SELEÇÃO DE PERSONAGENS</h1>

      <div className="players-selection-status">
        {renderPlayerStatus(1)}
        {renderPlayerStatus(2)}
      </div>

      <div className="character-grid">
        {characters.map(char => (
          <div
            key={char.key}
            className={`character-card ${player1 === char.key || player2 === char.key ? 'selected' : ''}`}
            style={{ 
              backgroundImage: `url(${hoveredCharacter === char.key ? char.imageSelected : char.image})` 
            }}
            onClick={() => handleSelectCharacter(char.key)}
            onMouseEnter={() => setHoveredCharacter(char.key)}
            onMouseLeave={() => setHoveredCharacter(null)}
          >
            <div className="character-name-overlay">
                <span className="character-name" style={{ color: char.titulo }}>
                    {char.nome.toUpperCase()}
                </span>
            </div>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <Button onClick={() => changeScene('gameMenu')}>VOLTAR</Button>
        {player1 && player2 && (
          <Button onClick={() => onCombatStart(player1, player2)}>LUTAR!</Button>
        )}
      </div>
    </div>
  );
};

export default CharacterSelectionScene;