import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Play, Pause, RotateCcw, Coffee, BookOpen } from 'lucide-react';

export default function StudyTimer({ onClose }) {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [breakTime, setBreakTime] = useState(5 * 60); // 5 minutes
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isBreak) {
      // Study session ended, start break
      setIsBreak(true);
      setTimeLeft(breakTime);
      setSessions(sessions + 1);
    } else if (timeLeft === 0 && isBreak) {
      // Break ended, start new study session
      setIsBreak(false);
      setTimeLeft(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, breakTime, sessions]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? ((breakTime - timeLeft) / breakTime) * 100
    : ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  const getEncouragingMessage = () => {
    if (isBreak) {
      return "Great job! Time for a well-deserved break! ☕";
    }
    if (sessions === 0) {
      return "Ready to start your study session? You've got this! 💪";
    }
    if (sessions === 1) {
      return "Amazing! You're building great study habits! 🌟";
    }
    return `Incredible! You've completed ${sessions} study sessions! 🏆`;
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
        <div className="text-center">
          <motion.div
            className="text-6xl mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: isBreak ? [0, 10, -10, 0] : [0, -5, 5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {isBreak ? "☕" : "📚"}
          </motion.div>
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent mb-2">
            {isBreak ? "Break Time!" : "Study Time!"}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {getEncouragingMessage()}
          </p>

          {/* Timer Display */}
          <motion.div
            className="text-6xl font-bold text-gray-800 dark:text-white mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            {formatTime(timeLeft)}
          </motion.div>

          {/* Progress Bar */}
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6 overflow-hidden">
            <motion.div 
              className={`h-full rounded-full ${
                isBreak 
                  ? "bg-gradient-to-r from-green-500 to-blue-500"
                  : "bg-gradient-to-r from-pink-500 to-yellow-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Session Counter */}
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Completed Sessions: {sessions} 🏆
          </div>

          {/* Controls */}
          <div className="flex gap-3 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={toggleTimer}
                className={`${
                  isBreak
                    ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    : "bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
                } text-white`}
              >
                {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isRunning ? "Pause" : "Start"}
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={resetTimer}
                variant="outline"
                className="border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </Button>
            </motion.div>
          </div>

          {/* Tips */}
          <motion.div
            className="mt-6 p-4 bg-pink-50 dark:bg-pink-900/30 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-pink-700 dark:text-pink-300">
              💡 {isBreak 
                ? "Take a short walk, stretch, or grab a healthy snack!" 
                : "Focus on one topic at a time. You're doing great!"
              }
            </p>
          </motion.div>

          <motion.div
            className="mt-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Close Timer
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
} 