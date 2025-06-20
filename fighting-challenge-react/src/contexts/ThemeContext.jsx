import React, { createContext, useState, useMemo } from 'react';

export const themes = {
  padrao: {
    nome: "Hunter x Hunter",
    fundo: '#0a1a24',
    titulo: '#fca311',
    linha: '#fca311',
    botaoFundo: '#14532d',
    botaoHover: '#166534',
    botaoTexto: '#f1f5f9'
  },
  hisoka: {
    nome: "Hisoka",
    fundo: '#240046',
    titulo: '#e01e84',
    linha: '#5a189a',
    botaoFundo: '#e01e84',
    botaoHover: '#ff4da6',
    botaoTexto: '#e9d5ff',
    image: 'https://i.pinimg.com/736x/c8/bc/96/c8bc962745ed32dc674fd5738df3c3b5.jpg',
    imageSelected: 'https://pm1.aminoapps.com/6799/168ceb0ad98b277485b3da801b34facdf0378ae0v2_hq.jpg'
  },
  gon: {
    nome: "Gon",
    fundo: '#0b2e2b',
    titulo: '#2dc26b',
    linha: '#e89c31',
    botaoFundo: '#22584e',
    botaoHover: '#2a6d5f',
    botaoTexto: '#f0fdf4',
    image: 'https://i.pinimg.com/736x/5e/6f/c8/5e6fc81420cd5dac18207160a00c533d.jpg',
    imageSelected: 'https://i.pinimg.com/736x/cc/e7/e9/cce7e94da7ccb74bbc1ab7ce4397fe0f.jpg'
  },
  killua: {
    nome: "Killua",
    fundo: '#101827',
    titulo: '#ffffff',
    linha: '#7dd3fc',
    botaoFundo: '#0369a1',
    botaoHover: '#0ea5e9',
    botaoTexto: '#f0f9ff',
    image: 'https://wallpapers.com/images/hd/killua-pictures-nzrvzuxb4g3y1ufz.jpg',
    imageSelected: 'https://i.pinimg.com/736x/d8/35/21/d8352100c00520cfadb5ec8c470d1c7b.jpg'
  },
  kurapika: {
    nome: "Kurapika",
    fundo: '#1d2c58',
    titulo: '#ef4444',
    linha: '#fef08a',
    botaoFundo: '#3b559a',
    botaoHover: '#4e6ab3',
    botaoTexto: '#fefce8',
    image: 'https://wallpapers.com/images/hd/hxh-pfp-1200-x-1200-454uuie77rq43h7a.jpg',
    imageSelected: 'https://wallpapers.com/images/hd/shocked-kurapika-pfp-w4txpmh7czlr62el.jpg'
  }
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.padrao);

  const changeTheme = (themeName) => {
    setTheme(themes[themeName] || themes.padrao);
  };

  const value = useMemo(() => ({ theme, changeTheme, themes }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider> 
  );
};