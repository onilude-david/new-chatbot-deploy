import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, Circle, Lock, Unlock, Target, BookOpen, Star, ArrowRight, X, Trophy, Zap } from 'lucide-react';

export default function LearningPath({ character, onClose, onPathSelected }) {
  const [selectedPath, setSelectedPath] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showPathDetails, setShowPathDetails] = useState(false);

  const learningPaths = {
    math: {
      name: 'Math Adventure',
      description: 'Master numbers, shapes, and problem-solving!',
      icon: '🔢',
      color: 'from-blue-500 to-purple-500',
      levels: [
        {
          level: 1,
          name: 'Number Explorer',
          description: 'Learn counting, addition, and subtraction',
          lessons: [
            { id: 'm1_1', name: 'Counting to 20', duration: '15 min', difficulty: 'easy', completed: false },
            { id: 'm1_2', name: 'Simple Addition', duration: '20 min', difficulty: 'easy', completed: false },
            { id: 'm1_3', name: 'Simple Subtraction', duration: '20 min', difficulty: 'easy', completed: false },
            { id: 'm1_4', name: 'Number Patterns', duration: '25 min', difficulty: 'medium', completed: false }
          ]
        },
        {
          level: 2,
          name: 'Shape Detective',
          description: 'Discover geometry and measurements',
          lessons: [
            { id: 'm2_1', name: 'Basic Shapes', duration: '20 min', difficulty: 'easy', completed: false },
            { id: 'm2_2', name: 'Counting Money', duration: '25 min', difficulty: 'medium', completed: false },
            { id: 'm2_3', name: 'Telling Time', duration: '30 min', difficulty: 'medium', completed: false },
            { id: 'm2_4', name: 'Simple Fractions', duration: '35 min', difficulty: 'hard', completed: false }
          ]
        },
        {
          level: 3,
          name: 'Problem Solver',
          description: 'Tackle word problems and logic',
          lessons: [
            { id: 'm3_1', name: 'Word Problems', duration: '30 min', difficulty: 'medium', completed: false },
            { id: 'm3_2', name: 'Multiplication Basics', duration: '35 min', difficulty: 'medium', completed: false },
            { id: 'm3_3', name: 'Division Basics', duration: '35 min', difficulty: 'hard', completed: false },
            { id: 'm3_4', name: 'Math Puzzles', duration: '40 min', difficulty: 'hard', completed: false }
          ]
        }
      ]
    },
    science: {
      name: 'Science Explorer',
      description: 'Discover the wonders of the natural world!',
      icon: '🔬',
      color: 'from-green-500 to-blue-500',
      levels: [
        {
          level: 1,
          name: 'Nature Detective',
          description: 'Learn about plants, animals, and weather',
          lessons: [
            { id: 's1_1', name: 'Parts of Plants', duration: '20 min', difficulty: 'easy', completed: false },
            { id: 's1_2', name: 'Animal Habitats', duration: '25 min', difficulty: 'easy', completed: false },
            { id: 's1_3', name: 'Weather Patterns', duration: '30 min', difficulty: 'medium', completed: false },
            { id: 's1_4', name: 'Life Cycles', duration: '35 min', difficulty: 'medium', completed: false }
          ]
        },
        {
          level: 2,
          name: 'Lab Scientist',
          description: 'Explore experiments and materials',
          lessons: [
            { id: 's2_1', name: 'Simple Experiments', duration: '30 min', difficulty: 'medium', completed: false },
            { id: 's2_2', name: 'States of Matter', duration: '35 min', difficulty: 'medium', completed: false },
            { id: 's2_3', name: 'Energy Basics', duration: '40 min', difficulty: 'hard', completed: false },
            { id: 's2_4', name: 'Scientific Method', duration: '45 min', difficulty: 'hard', completed: false }
          ]
        }
      ]
    },
    english: {
      name: 'Word Wizard',
      description: 'Become a master of language and stories!',
      icon: '📚',
      color: 'from-pink-500 to-red-500',
      levels: [
        {
          level: 1,
          name: 'Reading Explorer',
          description: 'Learn phonics and basic reading',
          lessons: [
            { id: 'e1_1', name: 'Letter Sounds', duration: '20 min', difficulty: 'easy', completed: false },
            { id: 'e1_2', name: 'Sight Words', duration: '25 min', difficulty: 'easy', completed: false },
            { id: 'e1_3', name: 'Simple Stories', duration: '30 min', difficulty: 'medium', completed: false },
            { id: 'e1_4', name: 'Reading Comprehension', duration: '35 min', difficulty: 'medium', completed: false }
          ]
        },
        {
          level: 2,
          name: 'Writing Artist',
          description: 'Create stories and express ideas',
          lessons: [
            { id: 'e2_1', name: 'Sentence Building', duration: '30 min', difficulty: 'medium', completed: false },
            { id: 'e2_2', name: 'Story Writing', duration: '40 min', difficulty: 'medium', completed: false },
            { id: 'e2_3', name: 'Grammar Basics', duration: '35 min', difficulty: 'hard', completed: false },
            { id: 'e2_4', name: 'Creative Writing', duration: '45 min', difficulty: 'hard', completed: false }
          ]
        }
      ]
    },
    history: {
      name: 'Time Traveler',
      description: 'Journey through history and cultures!',
      icon: '🏛️',
      color: 'from-yellow-500 to-orange-500',
      levels: [
        {
          level: 1,
          name: 'Ancient Explorer',
          description: 'Discover ancient civilizations',
          lessons: [
            { id: 'h1_1', name: 'Ancient Egypt', duration: '25 min', difficulty: 'easy', completed: false },
            { id: 'h1_2', name: 'Ancient Greece', duration: '30 min', difficulty: 'medium', completed: false },
            { id: 'h1_3', name: 'Ancient Rome', duration: '30 min', difficulty: 'medium', completed: false },
            { id: 'h1_4', name: 'Ancient China', duration: '35 min', difficulty: 'medium', completed: false }
          ]
        },
        {
          level: 2,
          name: 'Modern Times',
          description: 'Explore recent history and cultures',
          lessons: [
            { id: 'h2_1', name: 'World Cultures', duration: '35 min', difficulty: 'medium', completed: false },
            { id: 'h2_2', name: 'Famous Leaders', duration: '40 min', difficulty: 'medium', completed: false },
            { id: 'h2_3', name: 'Important Events', duration: '45 min', difficulty: 'hard', completed: false },
            { id: 'h2_4', name: 'Historical Maps', duration: '40 min', difficulty: 'hard', completed: false }
          ]
        }
      ]
    },
    storytelling: {
      name: 'Storytelling Adventure',
      description: 'Discover the magic of stories and reading!',
      icon: '📖',
      color: 'from-purple-500 to-pink-500',
      levels: [
        {
          level: 1,
          name: 'Story Explorer',
          description: 'Learn to read and understand stories',
          lessons: [
            { id: 'st1_1', name: 'Reading with Expression', duration: '20 min', difficulty: 'easy', completed: false },
            { id: 'st1_2', name: 'Understanding Characters', duration: '25 min', difficulty: 'easy', completed: false },
            { id: 'st1_3', name: 'Story Settings', duration: '30 min', difficulty: 'medium', completed: false },
            { id: 'st1_4', name: 'Story Themes', duration: '35 min', difficulty: 'medium', completed: false }
          ]
        },
        {
          level: 2,
          name: 'Creative Storyteller',
          description: 'Create your own stories and adventures',
          lessons: [
            { id: 'st2_1', name: 'Creating Characters', duration: '30 min', difficulty: 'medium', completed: false },
            { id: 'st2_2', name: 'Building Plots', duration: '35 min', difficulty: 'medium', completed: false },
            { id: 'st2_3', name: 'Writing Dialogue', duration: '40 min', difficulty: 'hard', completed: false },
            { id: 'st2_4', name: 'Story Endings', duration: '45 min', difficulty: 'hard', completed: false }
          ]
        }
      ]
    }
  };

  useEffect(() => {
    // Load completed lessons from localStorage
    const saved = localStorage.getItem(`learning_path_${character.id}`);
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, [character.id]);

  useEffect(() => {
    // Save completed lessons to localStorage
    localStorage.setItem(`learning_path_${character.id}`, JSON.stringify(completedLessons));
  }, [completedLessons, character.id]);

  const getPathForSubject = (subject) => {
    return learningPaths[subject.toLowerCase()] || learningPaths.math;
  };

  const currentPath = getPathForSubject(character.subject);

  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-800/30';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-800/30';
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-800/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800/30';
    }
  };

  const getDifficultyEmoji = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '😊';
      case 'medium': return '🤔';
      case 'hard': return '🧠';
      default: return '📝';
    }
  };

  const calculateProgress = (level) => {
    const levelLessons = currentPath.levels[level - 1]?.lessons || [];
    const completedInLevel = levelLessons.filter(lesson => 
      completedLessons.includes(lesson.id)
    ).length;
    return (completedInLevel / levelLessons.length) * 100;
  };

  const isLevelUnlocked = (level) => {
    if (level === 1) return true;
    const previousLevel = currentPath.levels[level - 2];
    if (!previousLevel) return false;
    return previousLevel.lessons.every(lesson => 
      completedLessons.includes(lesson.id)
    );
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
            <div className="text-4xl">{currentPath.icon}</div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                {currentPath.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {currentPath.description}
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
          {/* Learning Path Overview */}
          <Card className="border-2 border-pink-200 dark:border-pink-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Your Learning Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentPath.levels.map((level, index) => (
                  <motion.div
                    key={level.level}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                      isLevelUnlocked(level.level)
                        ? 'border-green-200 dark:border-green-500 bg-green-50 dark:bg-green-900/30'
                        : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                    }`}
                    whileHover={{ scale: isLevelUnlocked(level.level) ? 1.02 : 1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {isLevelUnlocked(level.level) ? (
                          <Unlock className="h-5 w-5 text-green-600" />
                        ) : (
                          <Lock className="h-5 w-5 text-gray-400" />
                        )}
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          Level {level.level}
                        </h3>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {Math.round(calculateProgress(level.level))}%
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-800 dark:text-white mb-1">
                      {level.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {level.description}
                    </p>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-3">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${calculateProgress(level.level)}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    
                    <Button
                      onClick={() => {
                        setSelectedPath(level);
                        setShowPathDetails(true);
                      }}
                      disabled={!isLevelUnlocked(level.level)}
                      className={`w-full ${
                        isLevelUnlocked(level.level)
                          ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isLevelUnlocked(level.level) ? 'View Lessons' : 'Locked'}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievement Summary */}
          <Card className="border-2 border-yellow-200 dark:border-yellow-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                  <div className="text-3xl mb-2">📚</div>
                  <div className="font-semibold text-yellow-800 dark:text-yellow-200">
                    {completedLessons.length}
                  </div>
                  <div className="text-sm text-yellow-600 dark:text-yellow-400">
                    Lessons Completed
                  </div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="font-semibold text-blue-800 dark:text-blue-200">
                    {currentPath.levels.length}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    Total Levels
                  </div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="font-semibold text-green-800 dark:text-green-200">
                    {Math.round(completedLessons.length / 4 * 100)}%
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Overall Progress
                  </div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <div className="text-3xl mb-2">🔥</div>
                  <div className="font-semibold text-purple-800 dark:text-purple-200">
                    {Math.max(0, currentPath.levels.length - 1)}
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">
                    Levels Unlocked
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lesson Details Modal */}
        <AnimatePresence>
          {showPathDetails && selectedPath && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-2xl w-full mx-4 shadow-2xl border-2 border-pink-200 dark:border-pink-500"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {selectedPath.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedPath.description}
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowPathDetails(false)}
                    variant="ghost"
                    size="icon"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {selectedPath.lessons.map((lesson, index) => (
                    <motion.div
                      key={lesson.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        completedLessons.includes(lesson.id)
                          ? 'border-green-200 dark:border-green-500 bg-green-50 dark:bg-green-900/30'
                          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {completedLessons.includes(lesson.id) ? (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          ) : (
                            <Circle className="h-6 w-6 text-gray-400" />
                          )}
                          <div>
                            <div className="font-medium text-gray-800 dark:text-white">
                              {lesson.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {lesson.duration}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                            {getDifficultyEmoji(lesson.difficulty)} {lesson.difficulty}
                          </span>
                          
                          <Button
                            onClick={() => {
                              markLessonComplete(lesson.id);
                              onPathSelected?.(lesson);
                            }}
                            disabled={completedLessons.includes(lesson.id)}
                            className={`${
                              completedLessons.includes(lesson.id)
                                ? 'bg-green-500 text-white cursor-not-allowed'
                                : 'bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white'
                            }`}
                          >
                            {completedLessons.includes(lesson.id) ? 'Completed' : 'Start'}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
} 