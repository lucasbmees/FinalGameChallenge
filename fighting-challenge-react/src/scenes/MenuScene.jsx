import React, { useContext } from 'react';
import Button from '../components/Button';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAudio } from '../contexts/AudioContext';
import './MenuScene.css';

const MenuScene = ({ changeScene }) => {
  const { theme } = useContext(ThemeContext);
  const { isMuted, isPlaying, toggleSound } = useAudio();

  const getSoundButtonText = () => {
    if (!isPlaying) {
      return 'SOM: DESLIGADO';
    }
    return `SOM: ${!isMuted ? 'LIGADO' : 'DESLIGADO'}`;
  };

  return (
    <div className="menu-scene">
      <img src="/logo-hxh.png" alt="Logo Hunter x Hunter" className="game-logo" />

      <div className="button-container">
        <Button onClick={() => changeScene('gameMenu')}>JOGAR</Button>
        <Button onClick={() => changeScene('config')}>OPÇÕES</Button>
        <Button onClick={toggleSound}>
          {getSoundButtonText()}
        </Button>
        <Button onClick={() => changeScene('about')}>SOBRE</Button>
        <Button onClick={() => changeScene('exit')}>SAIR</Button>
      </div>
    </div>
  );
};

export default MenuScene;