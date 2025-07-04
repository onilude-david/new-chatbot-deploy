import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Plus, RotateCcw, BookOpen, Star, X, Edit3, Trash2 } from 'lucide-react';

export default function FlashcardCreator({ character, onClose }) {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const [showCreator, setShowCreator] = useState(false);
  const [newCard, setNewCard] = useState({ question: '', answer: '', difficulty: 'easy' });

  // Load flashcards from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`flashcards_${character.id}`);
    if (saved) {
      setFlashcards(JSON.parse(saved));
    }
  }, [character.id]);

  // Save flashcards to localStorage
  useEffect(() => {
    localStorage.setItem(`flashcards_${character.id}`, JSON.stringify(flashcards));
  }, [flashcards, character.id]);

  const addFlashcard = () => {
    if (newCard.question.trim() && newCard.answer.trim()) {
      setFlashcards(prev => [...prev, { ...newCard, id: Date.now() }]);
      setNewCard({ question: '', answer: '', difficulty: 'easy' });
      setShowCreator(false);
    }
  };

  const deleteFlashcard = (id) => {
    setFlashcards(prev => prev.filter(card => card.id !== id));
  };

  const nextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
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

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-2xl w-full mx-4 shadow-2xl border-2 border-pink-200 dark:border-pink-500 max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{character.emoji}</div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Flashcard Creator
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Create and study flashcards with {character.name}!
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

        {/* Study Mode */}
        {isStudying && flashcards.length > 0 ? (
          <div className="text-center">
            <div className="mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Card {currentCard + 1} of {flashcards.length}
              </span>
            </div>
            
            <motion.div
              className="relative h-64 mb-6 cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-100 to-yellow-100 dark:from-purple-800 dark:to-pink-800 rounded-2xl p-6 flex items-center justify-center border-2 border-pink-200 dark:border-pink-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-center">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getDifficultyColor(flashcards[currentCard].difficulty)}`}>
                    {getDifficultyEmoji(flashcards[currentCard].difficulty)} {flashcards[currentCard].difficulty}
                  </div>
                  <div className="text-lg font-medium text-gray-800 dark:text-white">
                    {isFlipped ? flashcards[currentCard].answer : flashcards[currentCard].question}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {isFlipped ? 'Answer' : 'Question'} - Click to flip!
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={prevCard}
                disabled={currentCard === 0}
                variant="outline"
                className="border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                ← Previous
              </Button>
              <Button
                onClick={() => setIsStudying(false)}
                className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white"
              >
                Exit Study Mode
              </Button>
              <Button
                onClick={nextCard}
                disabled={currentCard === flashcards.length - 1}
                variant="outline"
                className="border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                Next →
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Flashcard List */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Your Flashcards ({flashcards.length})
                </h3>
                <div className="flex gap-2">
                  {flashcards.length > 0 && (
                    <Button
                      onClick={() => setIsStudying(true)}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Study Mode
                    </Button>
                  )}
                  <Button
                    onClick={() => setShowCreator(true)}
                    className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Card
                  </Button>
                </div>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {flashcards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(card.difficulty)}`}>
                            {getDifficultyEmoji(card.difficulty)} {card.difficulty}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-800 dark:text-white mb-1">
                          Q: {card.question}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          A: {card.answer}
                        </div>
                      </div>
                      <Button
                        onClick={() => deleteFlashcard(card.id)}
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Create New Flashcard */}
            <AnimatePresence>
              {showCreator && (
                <motion.div
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                    Create New Flashcard
                  </h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Question
                      </label>
                      <Textarea
                        value={newCard.question}
                        onChange={(e) => setNewCard(prev => ({ ...prev, question: e.target.value }))}
                        placeholder="Enter your question..."
                        className="resize-none"
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Answer
                      </label>
                      <Textarea
                        value={newCard.answer}
                        onChange={(e) => setNewCard(prev => ({ ...prev, answer: e.target.value }))}
                        placeholder="Enter the answer..."
                        className="resize-none"
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Difficulty
                      </label>
                      <select
                        value={newCard.difficulty}
                        onChange={(e) => setNewCard(prev => ({ ...prev, difficulty: e.target.value }))}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                      >
                        <option value="easy">😊 Easy</option>
                        <option value="medium">🤔 Medium</option>
                        <option value="hard">🧠 Hard</option>
                      </select>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={addFlashcard}
                        className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Card
                      </Button>
                      <Button
                        onClick={() => setShowCreator(false)}
                        variant="outline"
                        className="border-gray-300 text-gray-600 hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </motion.div>
  );
} 