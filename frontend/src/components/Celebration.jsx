import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Award, Target, Zap, Heart, Sparkles } from 'lucide-react';

export default function Celebration({ 
  type = 'achievement', 
  title = 'Amazing!', 
  message = 'You did it!', 
  onComplete,
  duration = 3000 
}) {
  const [particles, setParticles] = useState([]);
  const [show, setShow] = useState(true);

  const celebrationTypes = {
    achievement: {
      icon: '🏆',
      color: 'from-yellow-400 to-orange-500',
      particles: ['⭐', '🌟', '💫', '✨', '🎉', '🎊', '🏆', '👑'],
      sound: 'achievement'
    },
    milestone: {
      icon: '🎯',
      color: 'from-blue-400 to-purple-500',
      particles: ['🎯', '🎪', '🎨', '🎭', '🎪', '🎯', '⭐', '✨'],
      sound: 'milestone'
    },
    streak: {
      icon: '🔥',
      color: 'from-red-400 to-pink-500',
      particles: ['🔥', '⚡', '💥', '🌟', '⭐', '✨', '💫', '🎆'],
      sound: 'streak'
    },
    perfect: {
      icon: '💎',
      color: 'from-indigo-400 to-purple-500',
      particles: ['💎', '💍', '👑', '🏆', '⭐', '✨', '💫', '🌟'],
      sound: 'perfect'
    }
  };

  const config = celebrationTypes[type] || celebrationTypes.achievement;

  useEffect(() => {
    // Generate particles
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        emoji: config.particles[Math.floor(Math.random() * config.particles.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        size: Math.random() * 20 + 10
      });
    }
    setParticles(newParticles);

    // Auto-hide after duration
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onComplete?.(), 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete, config.particles]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-400/20 to-pink-400/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Main celebration card */}
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md mx-4 shadow-2xl border-2 border-yellow-200 dark:border-yellow-500 text-center"
            initial={{ scale: 0.8, y: 50, rotate: -5 }}
            animate={{ 
              scale: [0.8, 1.1, 1], 
              y: [50, -10, 0], 
              rotate: [-5, 2, 0] 
            }}
            exit={{ scale: 0.8, y: -50, rotate: 5 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              scale: { duration: 0.8, ease: "easeOut" }
            }}
          >
            {/* Floating icon */}
            <motion.div
              className="text-8xl mb-4"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {config.icon}
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {title}
            </motion.h2>

            {/* Message */}
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {message}
            </motion.p>

            {/* Celebration icons */}
            <motion.div
              className="flex justify-center gap-4 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Trophy className="h-8 w-8 text-yellow-500" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <Star className="h-8 w-8 text-yellow-400" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Award className="h-8 w-8 text-orange-500" />
              </motion.div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className={`h-3 rounded-full bg-gradient-to-r ${config.color}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
              />
            </motion.div>

            {/* Encouraging message */}
            <motion.p
              className="text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              Keep up the amazing work! 🚀
            </motion.p>
          </motion.div>

          {/* Particle effects */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute pointer-events-none"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                fontSize: `${particle.size}px`
              }}
              initial={{ 
                opacity: 0, 
                scale: 0, 
                y: 0,
                x: 0
              }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1.5, 0], 
                y: [-20, -100, -200],
                x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100]
              }}
              transition={{ 
                duration: 3, 
                delay: particle.delay,
                ease: "easeOut" 
              }}
            >
              {particle.emoji}
            </motion.div>
          ))}

          {/* Corner sparkles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute pointer-events-none"
              style={{
                left: i < 4 ? '10%' : '90%',
                top: i % 2 === 0 ? '10%' : '90%',
                transform: `rotate(${i * 45}deg)`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1, 0],
                rotate: [i * 45, i * 45 + 360]
              }}
              transition={{ 
                duration: 2, 
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </motion.div>
          ))}

          {/* Floating hearts */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute pointer-events-none text-pink-400"
              style={{
                left: `${20 + i * 15}%`,
                top: `${80 + Math.sin(i) * 20}%`,
                fontSize: `${20 + i * 5}px`
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                y: [-20, -100, -200],
                x: [0, Math.random() * 50 - 25]
              }}
              transition={{ 
                duration: 4, 
                delay: i * 0.3,
                ease: "easeOut" 
              }}
            >
              ❤️
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 