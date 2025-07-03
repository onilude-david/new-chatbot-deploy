import { useState, useCallback, useRef } from 'react';

export const useSpeech = (character) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // To keep track of the current Audio object

  const speak = useCallback(async (text) => {
    if (!text || !character?.id) return;

    // If audio is already playing, stop it first
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setIsPlaying(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/speak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, characterId: character.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch audio from server.');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.play();
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url); // Clean up the object URL
      };
      audio.onerror = () => {
        console.error("Error playing audio.");
        setIsPlaying(false);
      };

    } catch (error) {
      console.error(error);
      setIsPlaying(false);
    }
  }, [character]);

  const cancel = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  return { speak, cancel, isPlaying };
};