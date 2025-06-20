import React, { useState } from 'react';
import Button from '../components/Button';
import { CHARACTERS } from '../gameData/characters';
import './TrainingScene.css'; 

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

const InteractionModal = ({ characterKey, onClose }) => {
    const characterData = CHARACTERS[characterKey];
    const [stats, setStats] = useState(getCharacterStats(characterKey));
    const [dialogue, setDialogue] = useState('O que vamos fazer?');

    const xpToNextLevel = stats.level * 100;

    const handleTalk = () => {
        const dialogues = characterData.dialogues || ["..."];
        const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
        setDialogue(randomDialogue);
    };

    const handleTrain = () => {
        if (stats.fatigue >= 100) {
            setDialogue("Estou muito cansado para treinar agora...");
            return;
        }

        const xpGained = 25;
        const fatigueGained = 20;
        let newXp = stats.xp + xpGained;
        let newLevel = stats.level;

        if (newXp >= xpToNextLevel) {
            newLevel++;
            newXp -= xpToNextLevel;
            setDialogue(`Uau! Subi para o nível ${newLevel}!`);
        } else {
            setDialogue(`Ganhei ${xpGained} XP! Ótimo treino!`);
        }

        const newStats = {
            level: newLevel,
            xp: newXp,
            fatigue: Math.min(100, stats.fatigue + fatigueGained)
        };
        
        setStats(newStats);
        saveCharacterStats(characterKey, newStats);
    };

    return (
        <div className="interaction-modal-overlay" onClick={onClose}>
            <div className="interaction-modal" onClick={(e) => e.stopPropagation()}>
                <h2>{characterData.name}</h2>
                <img src={characterData.imageSelected} alt={characterData.name} className="modal-character-image" />
                
                <div className="training-info">
                    <p>Nível: {stats.level} | XP: {stats.xp} / {xpToNextLevel}</p>
                    <p>Fadiga: {stats.fatigue} / 100</p>
                    <div className="fatigue-bar-container">
                        <div className="fatigue-bar" style={{ width: `${stats.fatigue}%` }}></div>
                    </div>
                </div>

                <div className="dialogue-box">
                    <p>"{dialogue}"</p>
                </div>

                <div className="modal-actions">
                    <Button onClick={handleTalk}>CONVERSAR</Button>
                    <Button onClick={handleTrain} disabled={stats.fatigue >= 100}>TREINAR (+25 XP)</Button>
                    <Button onClick={onClose}>FECHAR</Button>
                </div>
            </div>
        </div>
    );
};

const TrainingScene = ({ changeScene }) => {
    const [modalNpc, setModalNpc] = useState(null);

    const openModal = (npcKey) => setModalNpc(npcKey);
    const closeModal = () => setModalNpc(null);

    const charactersToDisplay = Object.keys(CHARACTERS);

    return (
        <div className="training-scene-wrapper">
            {modalNpc && <InteractionModal characterKey={modalNpc} onClose={closeModal} />}

            <h1 className="training-scene-title">
                MODO TREINO
            </h1>
            
            <div className="characters-display-area">
                {charactersToDisplay.map(charKey => (
                    <div key={charKey} className="npc-container" onClick={() => openModal(charKey)}>
                        <img src={CHARACTERS[charKey].image} alt={CHARACTERS[charKey].name} className="npc-image" />
                        <span className="npc-name-label">{CHARACTERS[charKey].name}</span>
                    </div>
                ))}
            </div>
            
            <div className="training-back-button">
                <Button onClick={() => changeScene('gameMenu')}>VOLTAR</Button>
            </div>
        </div>
    );
};

export default TrainingScene;