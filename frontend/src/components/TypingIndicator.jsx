import React from 'react';
import { motion } from 'framer-motion';

const bounceTransition = {
  y: { duration: 0.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
};

export default function TypingIndicator({ character }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start mb-6"
    >
      <div className="flex items-end space-x-3">
        <motion.div 
          className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-2xl shadow-lg ring-2 ring-yellow-200 dark:ring-yellow-800"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {character?.emoji || "🤖"}
        </motion.div>
        <motion.div 
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl rounded-bl-md px-5 py-4 shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <motion.span
                className="block w-3 h-3 bg-blue-400 rounded-full shadow-sm"
                variants={{ initial: { y: '0%' }, animate: { y: '-50%' } }}
                transition={bounceTransition}
                initial="initial"
                animate="animate"
              />
              <motion.span
                className="block w-3 h-3 bg-purple-400 rounded-full shadow-sm"
                variants={{ initial: { y: '0%' }, animate: { y: '-50%' } }}
                transition={{ ...bounceTransition, delay: 0.2 }}
                initial="initial"
                animate="animate"
              />
              <motion.span
                className="block w-3 h-3 bg-pink-400 rounded-full shadow-sm"
                variants={{ initial: { y: '0%' }, animate: { y: '-50%' } }}
                transition={{ ...bounceTransition, delay: 0.4 }}
                initial="initial"
                animate="animate"
              />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {character?.name || "AI"} is typing…
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}