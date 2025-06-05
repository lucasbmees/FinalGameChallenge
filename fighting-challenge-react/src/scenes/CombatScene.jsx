import React from 'react';
import Button from '../components/Button';
import './../App.css';

const CombatScene = ({ changeScene }) => {
  return (
    <div className="scene-container">
      <h1 className="scene-title">COMBATE</h1>
      <p className="info-text">A luta começará em breve...</p>
      <p className="sub-text">Funcionalidade em desenvolvimento.</p>
      <div style={{ marginTop: '40px' }}>
        <Button onClick={() => changeScene('characterSelection')}>ESCOLHER PERSONAGENS</Button>
      </div>
    </div>
  );
};

export default CombatScene;