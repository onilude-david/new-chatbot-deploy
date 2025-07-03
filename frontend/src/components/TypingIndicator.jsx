import React from 'react';
import { motion } from 'framer-motion';

const bounceTransition = {
  y: { duration: 0.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
};

export default function TypingIndicator({ character, loading }) {
  if (!loading) return null;

  return (
    <motion.div
      // Animate the indicator bubble itself
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start mb-4"
    >
      <div className="flex items-end space-x-2">
        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-2xl">
          {character?.emoji || "🤖"}
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-sm px-4 py-3">
          <div className="flex items-center space-x-1">
            <motion.span
              className="block w-2 h-2 bg-gray-400 rounded-full"
              variants={{ initial: { y: '0%' }, animate: { y: '-50%' } }}
              transition={bounceTransition}
              initial="initial"
              animate="animate"
            />
            <motion.span
              className="block w-2 h-2 bg-gray-400 rounded-full"
              variants={{ initial: { y: '0%' }, animate: { y: '-50%' } }}
              transition={{ ...bounceTransition, delay: 0.2 }}
              initial="initial"
              animate="animate"
            />
            <motion.span
              className="block w-2 h-2 bg-gray-400 rounded-full"
              variants={{ initial: { y: '0%' }, animate: { y: '-50%' } }}
              transition={{ ...bounceTransition, delay: 0.4 }}
              initial="initial"
              animate="animate"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}