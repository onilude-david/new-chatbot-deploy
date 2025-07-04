import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, Calendar, Target, Trophy, Star, Clock, BookOpen, Award, X, BarChart3, PieChart } from 'lucide-react';

export default function ProgressDashboard({ character, onClose }) {
  const [progressData, setProgressData] = useState({
    totalSessions: 0,
    totalTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    badgesEarned: 0,
    gamesPlayed: 0,
    averageScore: 0,
    subjects: {
      math: { sessions: 0, time: 0, score: 0 },
      science: { sessions: 0, time: 0, score: 0 },
      english: { sessions: 0, time: 0, score: 0 },
      history: { sessions: 0, time: 0, score: 0 }
    },
    weeklyData: [],
    monthlyData: []
  });

  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Load progress data from localStorage
    const savedData = localStorage.getItem(`progress_${character.id}`);
    if (savedData) {
      setProgressData(JSON.parse(savedData));
    } else {
      // Initialize with sample data
      initializeSampleData();
    }
  }, [character.id]);

  const initializeSampleData = () => {
    const sampleData = {
      totalSessions: 12,
      totalTime: 480, // minutes
      currentStreak: 5,
      longestStreak: 8,
      badgesEarned: 7,
      gamesPlayed: 15,
      averageScore: 85,
      subjects: {
        math: { sessions: 4, time: 180, score: 92 },
        science: { sessions: 3, time: 120, score: 88 },
        english: { sessions: 3, time: 120, score: 85 },
        history: { sessions: 2, time: 60, score: 78 }
      },
      weeklyData: [
        { day: 'Mon', sessions: 2, time: 45, score: 90 },
        { day: 'Tue', sessions: 1, time: 30, score: 85 },
        { day: 'Wed', sessions: 3, time: 75, score: 88 },
        { day: 'Thu', sessions: 2, time: 60, score: 92 },
        { day: 'Fri', sessions: 1, time: 25, score: 87 },
        { day: 'Sat', sessions: 2, time: 50, score: 89 },
        { day: 'Sun', sessions: 1, time: 35, score: 91 }
      ],
      monthlyData: [
        { week: 'Week 1', sessions: 8, time: 200, score: 87 },
        { week: 'Week 2', sessions: 10, time: 250, score: 89 },
        { week: 'Week 3', sessions: 7, time: 180, score: 85 },
        { week: 'Week 4', sessions: 12, time: 300, score: 92 }
      ]
    };
    setProgressData(sampleData);
    localStorage.setItem(`progress_${character.id}`, JSON.stringify(sampleData));
  };

  const getSubjectColor = (subject) => {
    switch (subject) {
      case 'math': return 'from-blue-500 to-purple-500';
      case 'science': return 'from-green-500 to-blue-500';
      case 'english': return 'from-pink-500 to-red-500';
      case 'history': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getSubjectEmoji = (subject) => {
    switch (subject) {
      case 'math': return '🔢';
      case 'science': return '🔬';
      case 'english': return '📚';
      case 'history': return '🏛️';
      default: return '📖';
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const renderWeeklyChart = () => {
    const maxSessions = Math.max(...progressData.weeklyData.map(d => d.sessions));
    
    return (
      <div className="space-y-2">
        {progressData.weeklyData.map((day, index) => (
          <div key={day.day} className="flex items-center gap-3">
            <div className="w-8 text-sm font-medium text-gray-600 dark:text-gray-300">
              {day.day}
            </div>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500"
                initial={{ width: 0 }}
                animate={{ width: `${(day.sessions / maxSessions) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              />
            </div>
            <div className="w-12 text-xs text-gray-500 dark:text-gray-400 text-right">
              {day.sessions}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSubjectProgress = () => {
    return Object.entries(progressData.subjects).map(([subject, data]) => (
      <motion.div
        key={subject}
        className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="text-2xl">{getSubjectEmoji(subject)}</div>
            <div>
              <div className="font-semibold text-gray-800 dark:text-white capitalize">
                {subject}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {data.sessions} sessions • {formatTime(data.time)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">{data.score}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Average</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Progress</span>
            <span>{getProgressPercentage(data.sessions, 10)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full bg-gradient-to-r ${getSubjectColor(subject)}`}
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage(data.sessions, 10)}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
    ));
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-4xl w-full mx-4 shadow-2xl border-2 border-pink-200 dark:border-pink-500 max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-4xl">📊</div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Learning Progress
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Track your learning journey with {character.name}!
              </p>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-500"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Sessions</span>
              </div>
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                {progressData.totalSessions}
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 rounded-xl p-4 border-2 border-green-200 dark:border-green-500"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Time</span>
              </div>
              <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                {formatTime(progressData.totalTime)}
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-800/30 dark:to-red-800/30 rounded-xl p-4 border-2 border-pink-200 dark:border-pink-500"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-pink-600" />
                <span className="text-sm font-medium text-pink-700 dark:text-pink-300">Streak</span>
              </div>
              <div className="text-2xl font-bold text-pink-800 dark:text-pink-200">
                {progressData.currentStreak}
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-800/30 dark:to-orange-800/30 rounded-xl p-4 border-2 border-yellow-200 dark:border-yellow-500"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Score</span>
              </div>
              <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                {progressData.averageScore}%
              </div>
            </motion.div>
          </div>

          {/* Subject Progress */}
          <Card className="border-2 border-pink-200 dark:border-pink-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderSubjectProgress()}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card className="border-2 border-blue-200 dark:border-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderWeeklyChart()}
            </CardContent>
          </Card>

          {/* Achievements Summary */}
          <Card className="border-2 border-yellow-200 dark:border-yellow-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="font-semibold text-yellow-800 dark:text-yellow-200">
                    {progressData.badgesEarned}
                  </div>
                  <div className="text-sm text-yellow-600 dark:text-yellow-400">
                    Badges Earned
                  </div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="text-3xl mb-2">🎮</div>
                  <div className="font-semibold text-blue-800 dark:text-blue-200">
                    {progressData.gamesPlayed}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    Games Played
                  </div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <div className="text-3xl mb-2">🔥</div>
                  <div className="font-semibold text-green-800 dark:text-green-200">
                    {progressData.longestStreak}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Longest Streak
                  </div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="font-semibold text-purple-800 dark:text-purple-200">
                    {Math.round(progressData.averageScore)}
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">
                    Avg Score
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
} 