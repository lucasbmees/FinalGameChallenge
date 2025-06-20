import React, { useContext } from 'react';
import Button from '../components/Button';
import { ThemeContext } from '../contexts/ThemeContext';
import './../App.css';

const ConfigScene = ({ changeScene }) => {
  const { changeTheme, themes } = useContext(ThemeContext);

  return (
    <div className="scene-container">
      <h1 className="scene-title">TEMAS</h1>
      
      <div className="button-container">
        {Object.keys(themes).map((themeKey) => (
          <Button key={themeKey} onClick={() => changeTheme(themeKey)}>
            {themes[themeKey].nome.toUpperCase()}
          </Button>
        ))}
      </div>

      <div style={{ marginTop: '60px' }}>
        <Button onClick={() => changeScene('menu')}>VOLTAR AO MENU</Button>
      </div>
    </div>
  );
};

export default ConfigScene;