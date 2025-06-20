import React, { createContext, useState, useRef, useEffect, useCallback, useContext } from 'react';

const MUSIC_FILE_URL = '/background-music.mp3'; // Verifique se o nome do seu arquivo está correto aqui

export const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }
  }, []);

  const toggleSound = useCallback(() => {
    if (isReady && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(error => console.error("Falha ao iniciar o áudio:", error));
    } else if (isPlaying) {
      setIsMuted(current => !current);
    }
  }, [isReady, isPlaying]);

  const value = { isMuted, isPlaying, toggleSound };

  return (
    <AudioContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={MUSIC_FILE_URL}
        loop
        onCanPlayThrough={() => setIsReady(true)}
        onPlay={() => setIsPlaying(true)}
      />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);