import React, { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import './Button.css';

const Button = ({ children, onClick }) => {
  const { theme } = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);

  // Estilos dinâmicos baseados no tema e no estado hover
  const style = {
    backgroundColor: isHovered ? theme.botaoHover : theme.botaoFundo,
    color: theme.botaoTexto,
  };

  return (
    <button
      className="custom-button"
      style={style}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

export default Button;