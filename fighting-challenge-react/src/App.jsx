import React, { useState, useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import MenuScene from './scenes/MenuScene';
import ConfigScene from './scenes/ConfigScene';
import AboutScene from './scenes/AboutScene';
import ExitScene from './scenes/ExitScene';
import GameMenuScene from './scenes/GameMenuScene';
import OpenWorldScene from './scenes/OpenWorldScene';
import CharacterSelectionScene from './scenes/CharacterSelectionScene';
import CombatScene from './scenes/CombatScene';
import './App.css';

const SceneManager = () => {
  const [scene, setScene] = useState('menu');
  const { theme } = useContext(ThemeContext);

  // A função 'setScene' substitui a 'mudarCena()'
  const renderScene = () => {
    switch (scene) {
      case 'gameMenu':
        return <GameMenuScene changeScene={setScene} />;
      case 'openWorld':
        return <OpenWorldScene changeScene={setScene} />;
      case 'characterSelection':
        return <CharacterSelectionScene changeScene={setScene} />;
      case 'combat':
        return <CombatScene changeScene={setScene} />;
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