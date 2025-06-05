import React, { useContext } from 'react';
import Button from '../components/Button';
import { ThemeContext } from '../contexts/ThemeContext';
import './MenuScene.css';

const MenuScene = ({ changeScene }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="menu-scene">
      <h1 className="title" style={{ color: theme.texto }}>Bem-vindo ao Jogo</h1>
      <div className="title-underline" style={{ backgroundColor: theme.linha }}></div>

      <div className="button-container">
        <Button onClick={() => changeScene('gameMenu')}>JOGAR</Button>
        <Button onClick={() => changeScene('config')}>OPÇÕES</Button>
        <Button onClick={() => changeScene('about')}>SOBRE</Button>
        <Button onClick={() => changeScene('exit')}>SAIR</Button>
      </div>
    </div>
  );
};

export default MenuScene;