import React from 'react';
import { motion } from 'framer-motion';

// Define the animation for a single dot
const bounceTransition = {
  y: {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  },
};

// Define the parent container animation to orchestrate the dots
const containerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2, // Makes the dots start their animation one after another
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function TypingIndicator() {
  return (
    <motion.div
      // Animate the indicator bubble itself
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start mb-2"
    >
      <div className="bg-yellow-50 text-gray-800 border border-yellow-200 rounded-xl p-3">
        <motion.div
          className="flex justify-around items-center w-10 h-4"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Create three dots that will bounce */}
          <motion.span
            className="block w-2 h-2 bg-current rounded-full"
            variants={{ initial: { y: '0%' }, animate: { y: '-50%' } }}
            transition={bounceTransition}
          />
          <motion.span
            className="block w-2 h-2 bg-current rounded-full"
            variants={{ initial: { y: '0%' }, animate: { y: '-50%' } }}
            transition={bounceTransition}
          />
          <motion.span
            className="block w-2 h-2 bg-current rounded-full"
            variants={{ initial: { y: '0%' }, animate: { y: '-50%' } }}
            transition={bounceTransition}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}