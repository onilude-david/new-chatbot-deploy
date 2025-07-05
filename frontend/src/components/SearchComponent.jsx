import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Target, Clock } from 'lucide-react';
import { nigerianCurriculum, getAllClasses } from '../data/nigerianCurriculum';

export default function SearchComponent({ onBack, onStartLesson }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Search through all curriculum content
  const searchCurriculum = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results = [];
    const queryLower = query.toLowerCase();

    // Search through all classes
    Object.entries(nigerianCurriculum).forEach(([classId, classData]) => {
      // Search through all subjects
      Object.entries(classData.subjects).forEach(([subjectKey, subject]) => {
        // Search through all topics
        subject.topics.forEach(topic => {
          const matchesTitle = topic.title.toLowerCase().includes(queryLower);
          const matchesDescription = topic.description.toLowerCase().includes(queryLower);
          const matchesContent = topic.content.toLowerCase().includes(queryLower);

          if (matchesTitle || matchesDescription || matchesContent) {
            results.push({
              classId,
              className: classData.name,
              subjectKey,
              subjectName: subject.name,
              topic,
              relevance: matchesTitle ? 3 : matchesDescription ? 2 : 1
            });
          }
        });
      });
    });

    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);
    setSearchResults(results);
    setIsSearching(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchCurriculum(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'Easy';
      case 'intermediate': return 'Medium';
      case 'advanced': return 'Hard';
      default: return 'Unknown';
    }
  };

  const getClassIcon = (classId) => {
    switch (classId) {
      case 'nursery1': return '👶';
      case 'nursery2': return '👧';
      case 'primary1': return '📚';
      case 'primary2': return '📖';
      case 'primary3': return '📝';
      case 'primary4': return '✏️';
      case 'primary5': return '🎓';
      case 'primary6': return '🏆';
      default: return '📚';
    }
  };

  const getSubjectIcon = (subjectKey) => {
    switch (subjectKey) {
      case 'english': return '📝';
      case 'mathematics': return '🔢';
      case 'science': return '🔬';
      case 'social': return '🌍';
      default: return '📚';
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-white dark:bg-gray-900 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Search Curriculum
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Find lessons by topic, subject, or keyword! 🔍
            </motion.p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={onBack}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm sm:text-base"
            >
              ← Back
            </button>
          </motion.div>
        </div>

        {/* Search Input */}
        <motion.div 
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for topics, subjects, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </motion.div>

        {/* Search Results */}
        <AnimatePresence mode="wait">
          {isSearching && (
            <motion.div
              key="loading"
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Searching...</p>
            </motion.div>
          )}

          {!isSearching && searchQuery && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Search Results
                </h2>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                </span>
              </div>

              {searchResults.length === 0 ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try searching with different keywords or browse the curriculum directly.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={`${result.classId}-${result.subjectKey}-${result.topic.id}`}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl sm:text-2xl">{getClassIcon(result.classId)}</span>
                            <span className="text-xl sm:text-2xl">{getSubjectIcon(result.subjectKey)}</span>
                            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                              {result.className} • {result.subjectName}
                            </span>
                          </div>
                          
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {result.topic.title}
                          </h3>
                          
                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                            {result.topic.description}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                              {result.topic.exercises.length} exercises
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                              ~15 minutes
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs text-white ${getDifficultyColor(result.topic.difficulty)}`}>
                              {getDifficultyText(result.topic.difficulty)}
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => onStartLesson(result.classId, result.subjectKey, result.topic)}
                          className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
                        >
                          Start Lesson
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {!searchQuery && (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6">
                Popular Searches
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4">
                {[
                  'addition',
                  'phonics',
                  'grammar',
                  'multiplication',
                  'reading',
                  'writing',
                  'shapes',
                  'colors'
                ].map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {suggestion}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 