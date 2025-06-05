import React from 'react';
import Button from '../components/Button';
import './../App.css';

const GameScene = ({ changeScene }) => {
  return (
    <div className="scene-container">
      <h1 className="scene-title">JOGO</h1>
      <p className="info-text">O jogo ainda está em desenvolvimento.</p>
      <p className="sub-text">Volte em breve!</p>
      <div style={{ marginTop: '40px' }}>
        <Button onClick={() => changeScene('menu')}>VOLTAR AO MENU</Button>
      </div>
    </div>
  );
};

export default GameScene;