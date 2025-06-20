import React from 'react';
import Button from '../components/Button';
import './../App.css';

const GameMenuScene = ({ changeScene }) => {
  return (
    <div className="scene-container">
      <h1 className="scene-title">MODO DE JOGO</h1>
      <div className="button-container">
        <Button onClick={() => changeScene('characterSelection')}>MODO COMBATE</Button>
        <Button onClick={() => changeScene('training')}>MODO TREINO</Button>
        <Button onClick={() => changeScene('fishing')}>MODO PESCA</Button>
      </div>
      <div style={{ marginTop: '60px' }}>
        <Button onClick={() => changeScene('menu')}>VOLTAR AO MENU</Button>
      </div>
    </div>
  );
};

export default GameMenuScene;