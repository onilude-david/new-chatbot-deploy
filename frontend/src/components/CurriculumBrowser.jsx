import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronRight, Play, Target, Clock, Star } from 'lucide-react';
import { Button } from './ui/button';
import { nigerianCurriculum, getAllClasses, getSubjects, getTopics } from '../data/nigerianCurriculum';

export default function CurriculumBrowser({ userName, onBack, onStartLesson }) {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const classes = getAllClasses();

  const handleClassSelect = (classId) => {
    setSelectedClass(classId);
    setSelectedSubject(null);
    setSelectedTopic(null);
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedTopic(null);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleStartLesson = () => {
    if (selectedTopic) {
      onStartLesson(selectedClass, selectedSubject, selectedTopic);
    }
  };

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

  return (
    <motion.div 
      className="min-h-screen bg-white dark:bg-gray-900 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Nigerian Curriculum
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Explore lessons by class level and subject, {userName}! 📚
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
              className="flex items-center gap-2"
            >
              ← Back
            </Button>
          </motion.div>
        </div>

        {/* Breadcrumb */}
        <motion.div 
          className="flex items-center space-x-2 mb-6 text-sm text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span 
            className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => {
              setSelectedClass(null);
              setSelectedSubject(null);
              setSelectedTopic(null);
            }}
          >
            All Classes
          </span>
          {selectedClass && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span 
                className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => {
                  setSelectedSubject(null);
                  setSelectedTopic(null);
                }}
              >
                {nigerianCurriculum[selectedClass].name}
              </span>
            </>
          )}
          {selectedSubject && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span 
                className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setSelectedTopic(null)}
              >
                {nigerianCurriculum[selectedClass].subjects[selectedSubject].name}
              </span>
            </>
          )}
          {selectedTopic && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-blue-600 dark:text-blue-400">
                {selectedTopic.title}
              </span>
            </>
          )}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {!selectedClass && (
            <motion.div
              key="classes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose Your Class Level</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {classes.map((classInfo, index) => (
                  <motion.div
                    key={classInfo.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all"
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleClassSelect(classInfo.id)}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">
                        {classInfo.id === 'nursery1' ? '👶' :
                         classInfo.id === 'nursery2' ? '👧' :
                         classInfo.id === 'primary1' ? '📚' :
                         classInfo.id === 'primary2' ? '📖' :
                         classInfo.id === 'primary3' ? '📝' :
                         classInfo.id === 'primary4' ? '✏️' :
                         classInfo.id === 'primary5' ? '🎓' :
                         classInfo.id === 'primary6' ? '🏆' : '📚'}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {classInfo.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {classInfo.age}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedClass && !selectedSubject && (
            <motion.div
              key="subjects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {nigerianCurriculum[selectedClass].name} - Choose Subject
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(nigerianCurriculum[selectedClass].subjects).map(([subjectKey, subject], index) => (
                  <motion.div
                    key={subjectKey}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all"
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSubjectSelect(subjectKey)}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">
                        {subjectKey === 'english' ? '📝' :
                         subjectKey === 'mathematics' ? '🔢' :
                         subjectKey === 'science' ? '🔬' :
                         subjectKey === 'social' ? '🌍' : '📚'}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {subject.topics.length} topics available
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedClass && selectedSubject && (
            <motion.div
              key="topics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {nigerianCurriculum[selectedClass].subjects[selectedSubject].name} - Topics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getTopics(selectedClass, selectedSubject).map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer border-2 transition-all ${
                      selectedTopic?.id === topic.id 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-transparent hover:border-blue-500'
                    }`}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleTopicSelect(topic)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {topic.description}
                        </p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs text-white ${getDifficultyColor(topic.difficulty)}`}>
                        {getDifficultyText(topic.difficulty)}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Target className="h-4 w-4 mr-2" />
                        {topic.exercises.length} exercises
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        ~15 minutes
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Start Lesson Button */}
        {selectedTopic && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={handleStartLesson}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Lesson: {selectedTopic.title}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
} 