import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Volume2, VolumeX, Music, Play, Pause, SkipBack, SkipForward, Settings, X } from 'lucide-react';

export default function SoundManager({ onClose }) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const audioRef = useRef(null);

  const musicTracks = [
    {
      id: 1,
      name: 'Learning Adventure',
      description: 'Upbeat and educational',
      emoji: '🎓',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 2,
      name: 'Study Time',
      description: 'Calm and focused',
      emoji: '📚',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 3,
      name: 'Creative Minds',
      description: 'Inspiring and creative',
      emoji: '🎨',
      color: 'from-pink-500 to-yellow-500'
    },
    {
      id: 4,
      name: 'Science Lab',
      description: 'Curious and experimental',
      emoji: '🔬',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 5,
      name: 'Math Magic',
      description: 'Logical and rhythmic',
      emoji: '🔢',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const soundEffects = {
    message: '🔔',
    correct: '✅',
    incorrect: '❌',
    achievement: '🏆',
    gameStart: '🎮',
    gameEnd: '🎯',
    button: '🔘',
    notification: '📢'
  };

  useEffect(() => {
    // Load settings from localStorage
    const savedVolume = localStorage.getItem('musicVolume');
    const savedSoundEffects = localStorage.getItem('soundEffectsEnabled');
    const savedTrack = localStorage.getItem('currentTrack');
    
    if (savedVolume) setVolume(parseFloat(savedVolume));
    if (savedSoundEffects) setSoundEffectsEnabled(JSON.parse(savedSoundEffects));
    if (savedTrack) setCurrentTrack(parseInt(savedTrack));
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem('musicVolume', volume.toString());
    localStorage.setItem('soundEffectsEnabled', soundEffectsEnabled.toString());
    localStorage.setItem('currentTrack', currentTrack.toString());
  }, [volume, soundEffectsEnabled, currentTrack]);

  const playSoundEffect = (effect) => {
    if (!soundEffectsEnabled) return;
    
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different sound effects
    switch (effect) {
      case 'message':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        break;
      case 'correct':
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
        break;
      case 'incorrect':
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);
        break;
      case 'achievement':
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(1047, audioContext.currentTime + 0.3);
        break;
      case 'button':
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(500, audioContext.currentTime + 0.05);
        break;
      default:
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    }
    
    gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      setIsMusicPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setIsMusicPlaying(true);
      playBackgroundMusic();
    }
  };

  const playBackgroundMusic = () => {
    // Simulate background music with Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create a simple melody
    const notes = [
      { freq: 261.63, duration: 0.5 }, // C
      { freq: 293.66, duration: 0.5 }, // D
      { freq: 329.63, duration: 0.5 }, // E
      { freq: 349.23, duration: 0.5 }, // F
      { freq: 392.00, duration: 0.5 }, // G
      { freq: 440.00, duration: 0.5 }, // A
      { freq: 493.88, duration: 0.5 }, // B
      { freq: 523.25, duration: 0.5 }  // C
    ];
    
    let currentTime = audioContext.currentTime;
    
    notes.forEach((note, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(note.freq, currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(volume * 0.1, currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
      
      oscillator.start(currentTime);
      oscillator.stop(currentTime + note.duration);
      
      currentTime += note.duration;
    });
    
    // Loop the melody
    if (isMusicPlaying) {
      setTimeout(playBackgroundMusic, 4000);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + musicTracks.length) % musicTracks.length);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-2xl w-full mx-4 shadow-2xl border-2 border-pink-200 dark:border-pink-500"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🎵</div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Sound Manager
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Control music and sound effects
              </p>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Background Music */}
          <Card className="border-2 border-pink-200 dark:border-pink-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Background Music
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Track */}
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-yellow-50 dark:from-pink-900/30 dark:to-yellow-900/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{musicTracks[currentTrack].emoji}</div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">
                      {musicTracks[currentTrack].name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {musicTracks[currentTrack].description}
                    </div>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${musicTracks[currentTrack].color}`}></div>
              </div>

              {/* Music Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={prevTrack}
                  variant="outline"
                  size="icon"
                  className="border-pink-200 text-pink-600 hover:bg-pink-50"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                
                <Button
                  onClick={toggleMusic}
                  className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white w-16 h-16 rounded-full"
                >
                  {isMusicPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                
                <Button
                  onClick={nextTrack}
                  variant="outline"
                  size="icon"
                  className="border-pink-200 text-pink-600 hover:bg-pink-50"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Volume
                  </span>
                  <div className="flex items-center gap-2">
                    {volume === 0 ? (
                      <VolumeX className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-pink-500" />
                    )}
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sound Effects */}
          <Card className="border-2 border-blue-200 dark:border-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔊 Sound Effects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enable Sound Effects
                </span>
                <Button
                  onClick={() => setSoundEffectsEnabled(!soundEffectsEnabled)}
                  variant={soundEffectsEnabled ? "default" : "outline"}
                  className={soundEffectsEnabled ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white" : ""}
                >
                  {soundEffectsEnabled ? "ON" : "OFF"}
                </Button>
              </div>

              {/* Sound Effect Test */}
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(soundEffects).map(([effect, emoji]) => (
                  <motion.button
                    key={effect}
                    onClick={() => playSoundEffect(effect)}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-1">{emoji}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 capitalize">
                      {effect}
                    </div>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button
              onClick={() => playSoundEffect('achievement')}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            >
              🏆 Test Achievement Sound
            </Button>
            <Button
              onClick={() => playSoundEffect('correct')}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
            >
              ✅ Test Correct Sound
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 