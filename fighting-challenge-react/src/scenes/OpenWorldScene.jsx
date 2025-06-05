import React from 'react';
import Button from '../components/Button';
import './../App.css';

const OpenWorldScene = ({ changeScene }) => {
  return (
    <div className="scene-container">
      <h1 className="scene-title">MUNDO ABERTO</h1>
      <p className="info-text">Este modo de jogo está em desenvolvimento.</p>
      <p className="sub-text">Volte em breve!</p>
      <div style={{ marginTop: '40px' }}>
        <Button onClick={() => changeScene('gameMenu')}>VOLTAR</Button>
      </div>
    </div>
  );
};

export default OpenWorldScene;