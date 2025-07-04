import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Target } from 'lucide-react';

export default function ProgressIndicator({ messagesCount = 0, characterName }) {
  const getLevel = (count) => {
    if (count < 5) return { level: 1, title: "Getting Started", emoji: "🌱" };
    if (count < 15) return { level: 2, title: "Learning Explorer", emoji: "🚀" };
    if (count < 30) return { level: 3, title: "Knowledge Seeker", emoji: "⭐" };
    if (count < 50) return { level: 4, title: "Study Champion", emoji: "🏆" };
    return { level: 5, title: "Learning Master", emoji: "👑" };
  };

  const { level, title, emoji } = getLevel(messagesCount);
  const progress = Math.min((messagesCount / 50) * 100, 100);

  return (
    <motion.div 
      className="bg-gradient-to-r from-pink-100 to-yellow-100 dark:from-purple-800 dark:to-pink-800 rounded-2xl p-4 mb-4 border-2 border-pink-200 dark:border-pink-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-2xl"
          >
            {emoji}
          </motion.div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {messagesCount} messages with {characterName}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-3xl"
        >
          {level >= 5 ? "👑" : level >= 4 ? "🏆" : level >= 3 ? "⭐" : level >= 2 ? "🚀" : "🌱"}
        </motion.div>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-white/50 dark:bg-gray-700/50 rounded-full h-3 mb-3 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      {/* Achievement Messages */}
      {messagesCount === 5 && (
        <motion.div 
          className="text-center p-2 bg-yellow-100 dark:bg-yellow-800/30 rounded-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            🎉 First Achievement! You're on your way! 🎉
          </span>
        </motion.div>
      )}
      
      {messagesCount === 15 && (
        <motion.div 
          className="text-center p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
            🌟 Amazing! You're becoming a learning explorer! 🌟
          </span>
        </motion.div>
      )}
      
      {messagesCount === 30 && (
        <motion.div 
          className="text-center p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
            ⭐ Incredible! You're a knowledge seeker! ⭐
          </span>
        </motion.div>
      )}
    </motion.div>
  );
} 