// src/scenes/ConfigScene.jsx

import React, { useContext } from 'react';
import Button from '../components/Button';
import { ThemeContext } from '../contexts/ThemeContext';
import './../App.css';

const ConfigScene = ({ changeScene }) => {
  // Obtém a função de mudar tema e a lista de temas do contexto
  const { changeTheme, themes } = useContext(ThemeContext);

  return (
    <div className="scene-container">
      <h1 className="scene-title">TEMAS</h1>
      
      {/* Container para os botões de tema */}
      <div className="button-container">
        {/* Mapeia o objeto de temas para criar um botão para cada um */}
        {Object.keys(themes).map((themeKey) => (
          <Button key={themeKey} onClick={() => changeTheme(themeKey)}>
            {themes[themeKey].nome.toUpperCase()}
          </Button>
        ))}
      </div>

      {/* Botão para voltar ao menu */}
      <div style={{ marginTop: '60px' }}>
        <Button onClick={() => changeScene('menu')}>VOLTAR AO MENU</Button>
      </div>
    </div>
  );
};

export default ConfigScene;