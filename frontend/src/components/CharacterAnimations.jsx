import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CharacterAnimations({ character, isActive, children }) {
  const [particles, setParticles] = useState([]);

  // Character-specific animations
  const getCharacterAnimation = () => {
    switch (character.subject?.toLowerCase()) {
      case 'math':
        return {
          idle: { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] },
          active: { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] },
          particles: ['🔢', '📐', '📊', '➕', '➖', '✖️', '➗']
        };
      case 'science':
        return {
          idle: { y: [0, -5, 0], scale: [1, 1.02, 1] },
          active: { y: [0, -10, 0], scale: [1, 1.05, 1] },
          particles: ['🔬', '🧪', '⚗️', '🌱', '🔋', '💡', '🔭']
        };
      case 'english':
        return {
          idle: { x: [0, 3, -3, 0], scale: [1, 1.03, 1] },
          active: { x: [0, 8, -8, 0], scale: [1, 1.08, 1] },
          particles: ['📚', '✍️', '📝', '📖', '🔤', '📝', '✏️']
        };
      case 'history':
        return {
          idle: { rotate: [0, -3, 3, 0], scale: [1, 1.02, 1] },
          active: { rotate: [0, -8, 8, 0], scale: [1, 1.06, 1] },
          particles: ['🏛️', '👑', '⚔️', '🗺️', '📜', '🏺', '🕰️']
        };
      default:
        return {
          idle: { scale: [1, 1.02, 1] },
          active: { scale: [1, 1.05, 1] },
          particles: ['✨', '🌟', '💫', '⭐', '🎯', '🎨', '🎭']
        };
    }
  };

  const animation = getCharacterAnimation();

  // Generate particles
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        const newParticle = {
          id: Date.now() + Math.random(),
          emoji: animation.particles[Math.floor(Math.random() * animation.particles.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 2
        };
        setParticles(prev => [...prev, newParticle]);
        
        // Remove particle after animation
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 3000);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive, animation.particles]);

  return (
    <div className="relative">
      {/* Character with animations */}
      <motion.div
        animate={isActive ? animation.active : animation.idle}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {children}
      </motion.div>

      {/* Particle effects */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none text-2xl"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0, 
            y: 0 
          }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1.5, 0], 
            y: [-20, -60, -100] 
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
    </div>
  );
} 