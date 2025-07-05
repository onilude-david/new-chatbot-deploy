import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Target, BookOpen, Clock, Award, Zap, Heart } from 'lucide-react';

export default function AchievementSystem({ userName, learningStats }) {
  const [achievements, setAchievements] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);

  // Achievement definitions
  const achievementTypes = {
    firstSession: {
      id: 'firstSession',
      title: 'First Steps! 🚀',
      description: 'Completed your first learning session',
      icon: '🎯',
      color: 'bg-blue-500',
      condition: (stats) => stats.totalSessions >= 1
    },
    studyStreak: {
      id: 'studyStreak',
      title: 'Study Warrior! ⚡',
      description: 'Maintained a 3-day study streak',
      icon: '🔥',
      color: 'bg-orange-500',
      condition: (stats) => stats.streakDays >= 3
    },
    perfectScore: {
      id: 'perfectScore',
      title: 'Perfect Score! 🌟',
      description: 'Got 100% on any assessment',
      icon: '⭐',
      color: 'bg-yellow-500',
      condition: (stats) => stats.averageScore >= 100
    },
    timeMaster: {
      id: 'timeMaster',
      title: 'Time Master! ⏰',
      description: 'Studied for 60 minutes total',
      icon: '⏰',
      color: 'bg-green-500',
      condition: (stats) => stats.totalTime >= 60
    },
    subjectExplorer: {
      id: 'subjectExplorer',
      title: 'Subject Explorer! 📚',
      description: 'Tried 3 different subjects',
      icon: '📚',
      color: 'bg-purple-500',
      condition: (stats) => stats.topicsLearned >= 3
    },
    weeklyGoal: {
      id: 'weeklyGoal',
      title: 'Goal Crusher! 🎯',
      description: 'Met your weekly learning goal',
      icon: '🎯',
      color: 'bg-red-500',
      condition: (stats) => stats.weeklyGoalMet
    },
    helpfulStudent: {
      id: 'helpfulStudent',
      title: 'Helpful Student! 🤝',
      description: 'Asked 10 questions to your tutor',
      icon: '🤝',
      color: 'bg-pink-500',
      condition: (stats) => stats.questionsAsked >= 10
    },
    earlyBird: {
      id: 'earlyBird',
      title: 'Early Bird! 🌅',
      description: 'Studied before 9 AM',
      icon: '🌅',
      color: 'bg-indigo-500',
      condition: (stats) => stats.earlyStudySessions >= 1
    }
  };

  // Check for new achievements
  useEffect(() => {
    if (!learningStats) return;

    const newAchievements = [];
    Object.values(achievementTypes).forEach(achievement => {
      const isEarned = achievement.condition(learningStats);
      const wasEarned = achievements.find(a => a.id === achievement.id);
      
      if (isEarned && !wasEarned) {
        newAchievements.push(achievement);
      }
    });

    if (newAchievements.length > 0) {
      const latestAchievement = newAchievements[newAchievements.length - 1];
      setNewAchievement(latestAchievement);
      setShowNotification(true);
      
      // Add to achievements list
      setAchievements(prev => [...prev, ...newAchievements]);
      
      // Save to localStorage
      const savedAchievements = JSON.parse(localStorage.getItem('achievements') || '[]');
      const updatedAchievements = [...savedAchievements, ...newAchievements];
      localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
      
      // Hide notification after 5 seconds
      setTimeout(() => setShowNotification(false), 5000);
    }
  }, [learningStats]);

  // Load saved achievements on mount
  useEffect(() => {
    const savedAchievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    setAchievements(savedAchievements);
  }, []);

  const getProgressForAchievement = (achievement) => {
    if (!learningStats) return 0;
    
    switch (achievement.id) {
      case 'firstSession':
        return Math.min(learningStats.totalSessions, 1);
      case 'studyStreak':
        return Math.min(learningStats.streakDays / 3, 1);
      case 'perfectScore':
        return Math.min(learningStats.averageScore / 100, 1);
      case 'timeMaster':
        return Math.min(learningStats.totalTime / 60, 1);
      case 'subjectExplorer':
        return Math.min(learningStats.topicsLearned / 3, 1);
      default:
        return 0;
    }
  };

  return (
    <>
      {/* Achievement Notification */}
      <AnimatePresence>
        {showNotification && newAchievement && (
          <motion.div
            className="fixed top-24 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 border-green-500 p-4 max-w-sm"
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl ${newAchievement.color}`}>
                {newAchievement.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {newAchievement.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {newAchievement.description}
                </p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Dashboard */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Achievements
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {achievements.length} earned
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(achievementTypes).map((achievement) => {
            const isEarned = achievements.find(a => a.id === achievement.id);
            const progress = getProgressForAchievement(achievement);
            
            return (
              <motion.div
                key={achievement.id}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  isEarned 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Achievement Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl ${
                    isEarned ? achievement.color : 'bg-gray-400'
                  }`}>
                    {achievement.icon}
                  </div>
                  {isEarned && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-500"
                    >
                      <Star className="h-5 w-5" />
                    </motion.div>
                  )}
                </div>

                {/* Achievement Details */}
                <div className="mb-3">
                  <h4 className={`font-semibold ${
                    isEarned ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${
                    isEarned ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                </div>

                {/* Progress Bar */}
                {!isEarned && progress > 0 && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}

                {/* Earned Badge */}
                {isEarned && (
                  <motion.div
                    className="absolute top-2 right-2"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Award className="h-6 w-6 text-yellow-500" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Achievement Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {achievements.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Achievements Earned
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {Math.round((achievements.length / Object.keys(achievementTypes).length) * 100)}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Completion Rate
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {learningStats?.streakDays || 0}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Day Streak
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {learningStats?.totalTime || 0}m
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Study Time
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 