import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Star, Trophy, Target } from 'lucide-react';

export default function MiniGame({ onClose, onReward }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [targets, setTargets] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        addTarget();
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const startGame = () => {
    setGameStarted(true);
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
  };

  const endGame = () => {
    setIsPlaying(false);
    const reward = Math.floor(score / 5) + 1;
    onReward(reward);
  };

  const addTarget = () => {
    const newTarget = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      size: Math.random() * 20 + 20,
    };
    setTargets(prev => [...prev, newTarget]);
    
    // Remove target after 3 seconds
    setTimeout(() => {
      setTargets(prev => prev.filter(t => t.id !== newTarget.id));
    }, 3000);
  };

  const hitTarget = (id) => {
    setScore(score + 1);
    setTargets(prev => prev.filter(t => t.id !== id));
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl border-2 border-pink-200 dark:border-pink-500"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        {!gameStarted ? (
          <div className="text-center">
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🎮
            </motion.div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent mb-4">
              Study Break Game!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Click the floating stars to earn points! Perfect for a quick study break! ⭐
            </p>
            <div className="flex gap-3">
              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white"
              >
                Start Game! 🚀
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold text-pink-600">
                Score: {score} ⭐
              </div>
              <div className="text-lg font-bold text-blue-600">
                Time: {timeLeft}s ⏰
              </div>
            </div>
            
            <div className="relative h-64 bg-gradient-to-br from-pink-100 to-yellow-100 dark:from-purple-800 dark:to-pink-800 rounded-2xl mb-4 overflow-hidden border-2 border-pink-200 dark:border-pink-500">
              <AnimatePresence>
                {targets.map(target => (
                  <motion.div
                    key={target.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${target.x}%`,
                      top: `${target.y}%`,
                      width: `${target.size}px`,
                      height: `${target.size}px`,
                    }}
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ 
                      scale: 1, 
                      rotate: 360,
                      y: [0, -10, 0]
                    }}
                    exit={{ scale: 0, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => hitTarget(target.id)}
                    whileHover={{ scale: 1.2 }}
                  >
                    <motion.div
                      className="w-full h-full text-2xl flex items-center justify-center"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ⭐
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {!isPlaying && (
              <motion.div
                className="text-center p-4 bg-yellow-100 dark:bg-yellow-800/30 rounded-lg mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                  Game Over! 🎉
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Final Score: {score} stars! ⭐
                </p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
                  You earned {Math.floor(score / 5) + 1} bonus points! 🏆
                </p>
              </motion.div>
            )}
            
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white"
            >
              Back to Learning! 📚
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
} 