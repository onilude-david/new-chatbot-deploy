import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Shuffle, RotateCcw, Target, Brain, BookOpen, Calculator, Palette, Music, X } from 'lucide-react';

export default function AdvancedGames({ character, onClose, onScoreUpdate }) {
  const [currentGame, setCurrentGame] = useState(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);

  const games = [
    {
      id: 'word_scramble',
      name: 'Word Scramble',
      icon: '🔤',
      description: 'Unscramble the words!',
      color: 'from-blue-500 to-purple-500',
      subject: 'english'
    },
    {
      id: 'math_challenge',
      name: 'Math Challenge',
      icon: '🔢',
      description: 'Solve math problems!',
      color: 'from-green-500 to-blue-500',
      subject: 'math'
    },
    {
      id: 'memory_game',
      name: 'Memory Match',
      icon: '🧠',
      description: 'Find matching pairs!',
      color: 'from-pink-500 to-red-500',
      subject: 'general'
    },
    {
      id: 'science_quiz',
      name: 'Science Quiz',
      icon: '🔬',
      description: 'Test your science knowledge!',
      color: 'from-yellow-500 to-orange-500',
      subject: 'science'
    },
    {
      id: 'history_timeline',
      name: 'History Timeline',
      icon: '🏛️',
      description: 'Order historical events!',
      color: 'from-purple-500 to-pink-500',
      subject: 'history'
    },
    {
      id: 'color_mixer',
      name: 'Color Mixer',
      icon: '🎨',
      description: 'Mix colors to match!',
      color: 'from-indigo-500 to-purple-500',
      subject: 'art'
    },
    {
      id: 'story_builder',
      name: 'Story Builder',
      icon: '📚',
      description: 'Create stories with word prompts!',
      color: 'from-purple-500 to-pink-500',
      subject: 'storytelling'
    },
    {
      id: 'word_rhyme',
      name: 'Word Rhyme',
      icon: '🎵',
      description: 'Find rhyming words!',
      color: 'from-pink-500 to-red-500',
      subject: 'storytelling'
    }
  ];

  // Word Scramble Game
  const wordScrambleGame = {
    words: ['LEARN', 'STUDY', 'KNOWLEDGE', 'EDUCATION', 'SCHOOL', 'TEACHER', 'STUDENT', 'BOOK', 'PENCIL', 'DESK'],
    getScrambledWord: (word) => word.split('').sort(() => Math.random() - 0.5).join(''),
    checkAnswer: (scrambled, answer) => {
      const original = wordScrambleGame.words.find(w => wordScrambleGame.getScrambledWord(w) === scrambled);
      return answer.toUpperCase() === original;
    }
  };

  // Math Challenge Game
  const mathChallengeGame = {
    generateProblem: () => {
      const operations = ['+', '-', '*'];
      const op = operations[Math.floor(Math.random() * operations.length)];
      let a, b, answer;
      
      switch (op) {
        case '+':
          a = Math.floor(Math.random() * 50) + 1;
          b = Math.floor(Math.random() * 50) + 1;
          answer = a + b;
          break;
        case '-':
          a = Math.floor(Math.random() * 50) + 25;
          b = Math.floor(Math.random() * a) + 1;
          answer = a - b;
          break;
        case '*':
          a = Math.floor(Math.random() * 12) + 1;
          b = Math.floor(Math.random() * 12) + 1;
          answer = a * b;
          break;
      }
      
      return { problem: `${a} ${op} ${b}`, answer };
    }
  };

  // Memory Game
  const memoryGame = {
    symbols: ['🔢', '🔬', '📚', '🏛️', '🎨', '🎵', '🌟', '💫', '⭐', '🎯', '🎮', '🎪'],
    createBoard: () => {
      const symbols = [...memoryGame.symbols, ...memoryGame.symbols];
      return symbols.sort(() => Math.random() - 0.5);
    }
  };

  // Story Builder Game
  const storyBuilderGame = {
    prompts: [
      { character: 'brave knight', setting: 'magical forest', problem: 'lost treasure' },
      { character: 'curious cat', setting: 'space station', problem: 'missing stars' },
      { character: 'wise wizard', setting: 'underwater city', problem: 'broken magic' },
      { character: 'friendly robot', setting: 'candy land', problem: 'sweet mystery' }
    ],
    getRandomPrompt: () => {
      return storyBuilderGame.prompts[Math.floor(Math.random() * storyBuilderGame.prompts.length)];
    }
  };

  // Word Rhyme Game
  const wordRhymeGame = {
    wordSets: [
      { word: 'cat', rhymes: ['hat', 'bat', 'rat', 'sat'] },
      { word: 'dog', rhymes: ['log', 'fog', 'hog', 'jog'] },
      { word: 'tree', rhymes: ['bee', 'see', 'free', 'key'] },
      { word: 'star', rhymes: ['car', 'far', 'jar', 'bar'] },
      { word: 'moon', rhymes: ['soon', 'tune', 'spoon', 'noon'] }
    ],
    getRandomWordSet: () => {
      return wordRhymeGame.wordSets[Math.floor(Math.random() * wordRhymeGame.wordSets.length)];
    }
  };

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft]);

  const startGame = (game) => {
    setCurrentGame(game);
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    
    switch (game.id) {
      case 'word_scramble':
        const scrambled = wordScrambleGame.getScrambledWord(wordScrambleGame.words[0]);
        setGameState({ currentWord: scrambled, originalWord: wordScrambleGame.words[0], userAnswer: '' });
        break;
      case 'math_challenge':
        const problem = mathChallengeGame.generateProblem();
        setGameState({ problem: problem.problem, answer: problem.answer, userAnswer: '' });
        break;
      case 'memory_game':
        const board = memoryGame.createBoard();
        setGameState({ board, flipped: [], matched: [], canFlip: true });
        break;
      case 'story_builder':
        const prompt = storyBuilderGame.getRandomPrompt();
        setGameState({ prompt, userStory: '', wordCount: 0 });
        break;
      case 'word_rhyme':
        const wordSet = wordRhymeGame.getRandomWordSet();
        setGameState({ wordSet, userAnswer: '', correctRhymes: [] });
        break;
      default:
        setGameState({});
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    onScoreUpdate?.(score);
  };

  const handleWordScramble = (answer) => {
    if (wordScrambleGame.checkAnswer(gameState.currentWord, answer)) {
      setScore(score + 10);
      const nextWord = wordScrambleGame.words[Math.floor(Math.random() * wordScrambleGame.words.length)];
      const scrambled = wordScrambleGame.getScrambledWord(nextWord);
      setGameState({ currentWord: scrambled, originalWord: nextWord, userAnswer: '' });
    }
  };

  const handleMathChallenge = (answer) => {
    if (parseInt(answer) === gameState.answer) {
      setScore(score + 10);
      const problem = mathChallengeGame.generateProblem();
      setGameState({ problem: problem.problem, answer: problem.answer, userAnswer: '' });
    }
  };

  const handleMemoryGame = (index) => {
    if (!gameState.canFlip || gameState.flipped.includes(index) || gameState.matched.includes(index)) return;
    
    const newFlipped = [...gameState.flipped, index];
    setGameState(prev => ({ ...prev, flipped: newFlipped, canFlip: false }));
    
    if (newFlipped.length === 2) {
      setTimeout(() => {
        const [first, second] = newFlipped;
        if (gameState.board[first] === gameState.board[second]) {
          setGameState(prev => ({
            ...prev,
            matched: [...prev.matched, first, second],
            flipped: [],
            canFlip: true
          }));
          setScore(score + 5);
        } else {
          setGameState(prev => ({
            ...prev,
            flipped: [],
            canFlip: true
          }));
        }
      }, 1000);
    } else {
      setGameState(prev => ({ ...prev, canFlip: true }));
    }
  };

  const handleWordRhyme = (answer) => {
    const userWord = answer.toLowerCase().trim();
    if (gameState.wordSet.rhymes.includes(userWord)) {
      if (!gameState.correctRhymes.includes(userWord)) {
        setGameState(prev => ({
          ...prev,
          correctRhymes: [...prev.correctRhymes, userWord],
          userAnswer: ''
        }));
        setScore(score + 5);
        
        if (gameState.correctRhymes.length + 1 >= 3) {
          const newWordSet = wordRhymeGame.getRandomWordSet();
          setGameState({ wordSet: newWordSet, userAnswer: '', correctRhymes: [] });
        }
      }
    } else {
      setGameState(prev => ({ ...prev, userAnswer: '' }));
    }
  };

  const renderGame = () => {
    switch (currentGame?.id) {
      case 'word_scramble':
        return (
          <div className="text-center">
            <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {gameState.currentWord}
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={gameState.userAnswer}
                onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
                placeholder="Enter your answer..."
                className="w-full p-3 border border-gray-300 rounded-lg text-center text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleWordScramble(gameState.userAnswer)}
              />
            </div>
            <Button
              onClick={() => handleWordScramble(gameState.userAnswer)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              Submit Answer
            </Button>
          </div>
        );
      
      case 'math_challenge':
        return (
          <div className="text-center">
            <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              {gameState.problem}
            </div>
            <div className="mb-4">
              <input
                type="number"
                value={gameState.userAnswer}
                onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
                placeholder="Enter your answer..."
                className="w-full p-3 border border-gray-300 rounded-lg text-center text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleMathChallenge(gameState.userAnswer)}
              />
            </div>
            <Button
              onClick={() => handleMathChallenge(gameState.userAnswer)}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
            >
              Submit Answer
            </Button>
          </div>
        );
      
      case 'memory_game':
        return (
          <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
            {gameState.board?.map((symbol, index) => (
              <motion.div
                key={index}
                className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl cursor-pointer border-2 ${
                  gameState.flipped.includes(index) || gameState.matched.includes(index)
                    ? 'bg-white border-blue-500'
                    : 'bg-blue-500 border-blue-600'
                }`}
                onClick={() => handleMemoryGame(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {(gameState.flipped.includes(index) || gameState.matched.includes(index)) ? symbol : '❓'}
              </motion.div>
            ))}
          </div>
        );
      
      case 'story_builder':
        return (
          <div className="text-center">
            <div className="mb-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Story Prompt</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Character: <span className="font-semibold">{gameState.prompt.character}</span><br/>
                Setting: <span className="font-semibold">{gameState.prompt.setting}</span><br/>
                Problem: <span className="font-semibold">{gameState.prompt.problem}</span>
              </p>
            </div>
            <div className="mb-4">
              <textarea
                value={gameState.userStory}
                onChange={(e) => {
                  const story = e.target.value;
                  const wordCount = story.split(/\s+/).filter(word => word.length > 0).length;
                  setGameState(prev => ({ ...prev, userStory: story, wordCount }));
                }}
                placeholder="Write your story here..."
                className="w-full p-3 border border-gray-300 rounded-lg text-center text-lg h-32 resize-none"
              />
            </div>
            <div className="text-sm text-gray-600 mb-4">
              Word count: {gameState.wordCount}
            </div>
            <Button
              onClick={() => {
                if (gameState.wordCount >= 10) {
                  setScore(score + 15);
                  const newPrompt = storyBuilderGame.getRandomPrompt();
                  setGameState({ prompt: newPrompt, userStory: '', wordCount: 0 });
                }
              }}
              disabled={gameState.wordCount < 10}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Submit Story (min 10 words)
            </Button>
          </div>
        );
      
      case 'word_rhyme':
        return (
          <div className="text-center">
            <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              Find words that rhyme with: <span className="text-3xl">{gameState.wordSet.word}</span>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={gameState.userAnswer}
                onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
                placeholder="Enter a rhyming word..."
                className="w-full p-3 border border-gray-300 rounded-lg text-center text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleWordRhyme(gameState.userAnswer)}
              />
            </div>
            <Button
              onClick={() => handleWordRhyme(gameState.userAnswer)}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white"
            >
              Check Rhyme
            </Button>
            {gameState.correctRhymes.length > 0 && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-800/30 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">
                  Great rhymes: {gameState.correctRhymes.join(', ')}
                </p>
              </div>
            )}
          </div>
        );
      
      default:
        return <div>Game not implemented yet!</div>;
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
        className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-4xl w-full mx-4 shadow-2xl border-2 border-pink-200 dark:border-pink-500 max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🎮</div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Learning Games
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Play fun educational games with {character.name}!
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

        {currentGame ? (
          <div>
            {/* Game Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{currentGame.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {currentGame.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {currentGame.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">Score: {score}</div>
                <div className="text-lg text-orange-600">Time: {timeLeft}s</div>
              </div>
            </div>

            {/* Game Content */}
            <div className="mb-6">
              {renderGame()}
            </div>

            {/* Game Controls */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setCurrentGame(null)}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                ← Back to Games
              </Button>
              <Button
                onClick={endGame}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
              >
                End Game
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {games.map((game) => (
              <motion.div
                key={game.id}
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startGame(game)}
              >
                <Card className="h-full border-2 hover:border-pink-300 transition-colors">
                  <CardHeader className="text-center pb-2">
                    <div className="text-4xl mb-2">{game.icon}</div>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">
                      {game.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {game.description}
                    </p>
                    <div className={`mt-3 w-full h-2 rounded-full bg-gradient-to-r ${game.color}`}></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
} 