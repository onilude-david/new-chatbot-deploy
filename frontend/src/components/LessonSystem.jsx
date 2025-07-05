import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, CheckCircle, Target, Clock, Star, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

export default function LessonSystem({ 
  lesson, 
  character, 
  userName, 
  onComplete, 
  onBack 
}) {
  console.log('LessonSystem received lesson:', lesson);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Safety check for lesson data
  if (!lesson || !lesson.topic) {
    console.error('Invalid lesson data:', lesson);
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Lesson Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The lesson data is missing or invalid.
          </p>
          <Button onClick={onBack} variant="outline">
            ← Go Back
          </Button>
        </div>
      </div>
    );
  }

  const lessonSteps = [
    {
      type: 'introduction',
      title: 'Lesson Introduction',
      content: `Welcome to ${lesson.topic.title}! Let's learn about ${lesson.topic.description.toLowerCase()}.`,
      duration: 2
    },
    {
      type: 'content',
      title: 'Learning Content',
      content: lesson.topic.content,
      duration: 5
    },
    {
      type: 'exercise',
      title: 'Practice Exercise',
      content: `Let's practice what we learned! ${lesson.topic.exercises[0]}`,
      exercises: lesson.topic.exercises,
      duration: 8
    },
    {
      type: 'quiz',
      title: 'Quick Quiz',
      content: 'Test your knowledge with these questions!',
      questions: generateQuizQuestions(lesson),
      duration: 10
    },
    {
      type: 'completion',
      title: 'Lesson Complete!',
      content: 'Great job! You\'ve completed this lesson.',
      duration: 3
    }
  ];

  function generateQuizQuestions(lesson) {
    // Generate quiz questions based on the lesson topic
    const baseQuestions = [
      {
        question: `What did we learn about in ${lesson.topic.title}?`,
        options: [
          lesson.topic.description,
          'Something else',
          'I don\'t know',
          'Can you repeat?'
        ],
        correct: 0
      },
      {
        question: 'How many exercises are in this lesson?',
        options: [
          lesson.topic.exercises.length.toString(),
          '2',
          '5',
          '10'
        ],
        correct: 0
      },
      {
        question: 'What difficulty level is this lesson?',
        options: [
          lesson.topic.difficulty.charAt(0).toUpperCase() + lesson.topic.difficulty.slice(1),
          'Easy',
          'Hard',
          'Medium'
        ],
        correct: 0
      }
    ];
    return baseQuestions;
  }

  const currentStepData = lessonSteps[currentStep];
  const progress = ((currentStep + 1) / lessonSteps.length) * 100;

  const handleNext = () => {
    console.log('Next button clicked, current step:', currentStep, 'total steps:', lessonSteps.length);
    if (currentStep < lessonSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      console.log('Moving to step:', currentStep + 1);
    } else {
      setShowResults(true);
      console.log('Showing results');
    }
  };

  const handleAnswer = (questionIndex, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const calculateScore = () => {
    if (currentStepData.type !== 'quiz') return 0;
    
    let correct = 0;
    currentStepData.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / currentStepData.questions.length) * 100);
  };

  const handleComplete = () => {
    const score = calculateScore();
    onComplete({
      lessonId: lesson.topic.id,
      score,
      timeSpent: 15, // Mock time
      completed: true
    });
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {lesson.topic.title}
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {lesson.className} • {lesson.subjectName} • {lesson.topic.difficulty}
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

        {/* Progress Bar */}
        <motion.div 
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step {currentStep + 1} of {lessonSteps.length}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Debug Info - Remove this in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Debug:</strong> Current Step: {currentStep}, Total Steps: {lessonSteps.length}, 
              Lesson: {lesson.topic.title}
            </p>
          </div>
        )}

        {/* Lesson Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                {currentStepData.type === 'introduction' && <Play className="h-6 w-6" />}
                {currentStepData.type === 'content' && <BookOpen className="h-6 w-6" />}
                {currentStepData.type === 'exercise' && <Target className="h-6 w-6" />}
                {currentStepData.type === 'quiz' && <Star className="h-6 w-6" />}
                {currentStepData.type === 'completion' && <CheckCircle className="h-6 w-6" />}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentStepData.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentStepData.duration} minutes
                </p>
              </div>
            </div>

            {/* Content based on step type */}
            {currentStepData.type === 'introduction' && (
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {currentStepData.content}
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200">
                    <strong>Learning Objective:</strong> {lesson.topic.description}
                  </p>
                </div>
              </div>
            )}

            {currentStepData.type === 'content' && (
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentStepData.content}
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="text-green-800 dark:text-green-200">
                    <strong>Key Points:</strong>
                  </p>
                  <ul className="mt-2 space-y-1">
                    {lesson.topic.exercises.slice(0, 3).map((exercise, index) => (
                      <li key={index} className="text-green-700 dark:text-green-300">
                        • {exercise}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {currentStepData.type === 'exercise' && (
              <div className="space-y-6">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {currentStepData.content}
                </p>
                <div className="space-y-4">
                  {currentStepData.exercises.map((exercise, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Exercise {index + 1}:</strong> {exercise}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStepData.type === 'quiz' && (
              <div className="space-y-6">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {currentStepData.content}
                </p>
                <div className="space-y-6">
                  {currentStepData.questions.map((question, qIndex) => (
                    <div key={qIndex} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                        Question {qIndex + 1}: {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <label
                            key={oIndex}
                            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                              userAnswers[qIndex] === oIndex
                                ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500'
                                : 'bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                            } border`}
                          >
                            <input
                              type="radio"
                              name={`question-${qIndex}`}
                              value={oIndex}
                              checked={userAnswers[qIndex] === oIndex}
                              onChange={() => handleAnswer(qIndex, oIndex)}
                              className="mr-3"
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStepData.type === 'completion' && (
              <div className="text-center space-y-6">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Lesson Complete!
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Great job! You've successfully completed this lesson.
                </p>
                {currentStepData.type === 'quiz' && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <p className="text-green-800 dark:text-green-200 font-semibold">
                      Your Score: {calculateScore()}%
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            ← Previous
          </Button>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>

            {currentStep < lessonSteps.length - 1 ? (
              <Button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                Next Step
                <SkipForward className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                Complete Lesson
                <CheckCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 