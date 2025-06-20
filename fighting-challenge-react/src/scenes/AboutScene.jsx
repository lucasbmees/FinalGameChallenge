import React from 'react';
import Button from '../components/Button';
import './../App.css';

const AboutScene = ({ changeScene }) => {
  return (
    <div className="scene-container">
      <h1 className="scene-title">SOBRE</h1>
      <p className="info-text">Este é um projeto de jogo feito em React, inspirado no popular Anime Hunter x Hunter!</p>
      <p className="sub-text">Criado por Lucas Borinelli Mees.</p>
      <div style={{ marginTop: '40px' }}>
        <Button onClick={() => changeScene('menu')}>VOLTAR AO MENU</Button>
      </div>
    </div>
  );
};

export default AboutScene;