import React, { useState, useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import MenuScene from './scenes/MenuScene';
import ConfigScene from './scenes/ConfigScene';
import AboutScene from './scenes/AboutScene';
import ExitScene from './scenes/ExitScene';
import GameMenuScene from './scenes/GameMenuScene';
import TrainingScene from './scenes/TrainingScene'; 
import CharacterSelectionScene from './scenes/CharacterSelectionScene';
import CombatScene from './scenes/CombatScene';
import FishingScene from './scenes/FishingScene';
import './App.css';

const SceneManager = () => {
  const [scene, setScene] = useState('menu');
  const { theme } = useContext(ThemeContext);

  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  const startCombat = (p1, p2) => {
    setPlayer1(p1);
    setPlayer2(p2);
    setScene('combat');
  };

  const renderScene = () => {
    switch (scene) {
      case 'gameMenu':
        return <GameMenuScene changeScene={setScene} />;
      case 'training': 
        return <TrainingScene changeScene={setScene} />;
      case 'characterSelection':
        return <CharacterSelectionScene onCombatStart={startCombat} changeScene={setScene} />;
      case 'fishing': 
        return <FishingScene changeScene={setScene} />;
      case 'combat':
        return <CombatScene player1Key={player1} botKey={player2} changeScene={setScene} />;
      case 'config':
        return <ConfigScene changeScene={setScene} />;
      case 'about':
        return <AboutScene changeScene={setScene} />;
      case 'exit':
        return <ExitScene changeScene={setScene} />;
      case 'menu':
      default:
        return <MenuScene changeScene={setScene} />;
    }
  };

  return (
    <div className="app-container" style={{ backgroundColor: theme.fundo, color: theme.texto }}>
      {renderScene()}
    </div>
  );
};

const App = () => {
  return (
      <SceneManager />
  );
};

export default App;