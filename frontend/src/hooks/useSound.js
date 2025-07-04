import { useCallback } from 'react';

export const useSound = () => {
  const playSound = useCallback((type) => {
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    switch (type) {
      case 'success':
        // Play a cheerful success sound
        playTone(audioContext, [523, 659, 784], [0.1, 0.1, 0.2]); // C, E, G
        break;
      case 'notification':
        // Play a gentle notification sound
        playTone(audioContext, [440, 554], [0.15, 0.15]); // A, C#
        break;
      case 'click':
        // Play a soft click sound
        playTone(audioContext, [800], [0.05]); // High C
        break;
      case 'celebration':
        // Play a celebration sound
        playTone(audioContext, [523, 659, 784, 1047], [0.1, 0.1, 0.1, 0.2]); // C major arpeggio
        break;
      default:
        break;
    }
  }, []);

  const playTone = (audioContext, frequencies, durations) => {
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + durations[index]);
      
      oscillator.start(audioContext.currentTime + index * 0.1);
      oscillator.stop(audioContext.currentTime + index * 0.1 + durations[index]);
    });
  };

  return { playSound };
}; 