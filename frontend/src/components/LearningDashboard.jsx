import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Clock, Star, ArrowLeft, Target, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import AchievementSystem from './AchievementSystem';

export default function LearningDashboard({ userName, onBack, onNavigate }) {
  // Mock data - in a real app, this would come from a database
  const learningStats = {
    totalSessions: 12,
    totalTime: 145, // minutes
    averageScore: 85,
    streakDays: 5,
    topicsLearned: 8,
    nextGoal: "Complete Primary 3 English Grammar exercises"
  };

  const recentActivities = [
    { id: 1, type: 'primary3', title: 'Primary 3 - English Grammar', score: 90, time: '2 hours ago' },
    { id: 2, type: 'primary2', title: 'Primary 2 - Mathematics', score: 85, time: '1 day ago' },
    { id: 3, type: 'primary4', title: 'Primary 4 - Social Studies', score: 95, time: '2 days ago' },
    { id: 4, type: 'nursery2', title: 'Nursery 2 - Phonics', score: 88, time: '3 days ago' }
  ];

  const quickActions = [
    { id: 'nursery1', title: 'Nursery 1', icon: '👶', color: 'bg-pink-500' },
    { id: 'nursery2', title: 'Nursery 2', icon: '👧', color: 'bg-purple-500' },
    { id: 'primary1', title: 'Primary 1', icon: '📚', color: 'bg-blue-500' },
    { id: 'primary2', title: 'Primary 2', icon: '📖', color: 'bg-green-500' },
    { id: 'primary3', title: 'Primary 3', icon: '📝', color: 'bg-yellow-500' },
    { id: 'primary4', title: 'Primary 4', icon: '✏️', color: 'bg-orange-500' },
    { id: 'primary5', title: 'Primary 5', icon: '🎓', color: 'bg-red-500' },
    { id: 'primary6', title: 'Primary 6', icon: '🏆', color: 'bg-indigo-500' }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-white dark:bg-gray-900 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Learning Dashboard
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome back, {userName}! Let's see how you're doing! 🌟
            </motion.p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2 text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Chat
            </Button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 sm:p-6 rounded-xl text-white"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm font-medium">Total Sessions</p>
                <p className="text-xl sm:text-3xl font-bold">{learningStats.totalSessions}</p>
              </div>
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200" />
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-green-500 to-green-600 p-3 sm:p-6 rounded-xl text-white"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs sm:text-sm font-medium">Study Time</p>
                <p className="text-xl sm:text-3xl font-bold">{learningStats.totalTime}m</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-green-200" />
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 sm:p-6 rounded-xl text-white"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-xs sm:text-sm font-medium">Average Score</p>
                <p className="text-xl sm:text-3xl font-bold">{learningStats.averageScore}%</p>
              </div>
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-200" />
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 sm:p-6 rounded-xl text-white"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm font-medium">Day Streak</p>
                <p className="text-xl sm:text-3xl font-bold">{learningStats.streakDays}</p>
              </div>
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-purple-200" />
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                className={`${action.color} p-3 sm:p-6 rounded-xl text-white cursor-pointer`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 300 }}
                onClick={() => onNavigate && onNavigate('tutors')}
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{action.icon}</div>
                  <p className="font-semibold text-sm sm:text-base">{action.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div 
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Activities</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className={`flex items-center justify-between p-4 ${
                  index !== recentActivities.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg ${
                    activity.type === 'nursery1' ? 'bg-pink-500' :
                    activity.type === 'nursery2' ? 'bg-purple-500' :
                    activity.type === 'primary1' ? 'bg-blue-500' :
                    activity.type === 'primary2' ? 'bg-green-500' :
                    activity.type === 'primary3' ? 'bg-yellow-500' :
                    activity.type === 'primary4' ? 'bg-orange-500' :
                    activity.type === 'primary5' ? 'bg-red-500' :
                    activity.type === 'primary6' ? 'bg-indigo-500' : 'bg-gray-500'
                  }`}>
                    {activity.type === 'nursery1' ? '👶' :
                     activity.type === 'nursery2' ? '👧' :
                     activity.type === 'primary1' ? '📚' :
                     activity.type === 'primary2' ? '📖' :
                     activity.type === 'primary3' ? '📝' :
                     activity.type === 'primary4' ? '✏️' :
                     activity.type === 'primary5' ? '🎓' :
                     activity.type === 'primary6' ? '🏆' : '📖'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 dark:text-green-400">{activity.score}%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Score</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Goal */}
        <motion.div 
          className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 rounded-xl text-white mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center space-x-4">
            <Target className="h-8 w-8 text-pink-200" />
            <div>
              <h3 className="text-lg font-semibold mb-1">Your Next Goal</h3>
              <p className="text-pink-100">{learningStats.nextGoal}</p>
            </div>
          </div>
        </motion.div>

        {/* Achievement System */}
        <AchievementSystem userName={userName} learningStats={learningStats} />
      </div>
    </motion.div>
  );
} 