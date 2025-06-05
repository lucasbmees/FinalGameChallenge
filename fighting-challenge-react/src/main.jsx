import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Nosso componente App agora é o SceneManager
import { ThemeProvider } from './contexts/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);