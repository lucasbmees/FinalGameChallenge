import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import './Button.css';

const Button = ({ children, onClick, disabled }) => {
  const { theme } = useContext(ThemeContext);

  const style = {
    backgroundImage: `linear-gradient(to right, ${theme.botaoFundo} 0%, ${theme.botaoHover} 51%, ${theme.botaoFundo} 100%)`,
    color: theme.botaoTexto,
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const handleClick = disabled ? undefined : onClick;

  return (
    <button
      className="custom-button"
      style={style}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;