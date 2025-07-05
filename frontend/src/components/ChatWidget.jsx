import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import VoiceButton from "./VoiceButton";
import TypingIndicator from './TypingIndicator';

import MiniGame from './MiniGame';
import StudyTimer from './StudyTimer';


import FlashcardCreator from './FlashcardCreator';
import AdvancedGames from './AdvancedGames';
import SoundManager from './SoundManager';
import ProgressDashboard from './ProgressDashboard';
import LearningPath from './LearningPath';
import StorybookStore from './StorybookStore';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, PlusCircle, History, Paperclip, X, Gamepad2, Timer, Trophy, BookOpen, Music, BarChart3, Award, Settings, Target, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import 'highlight.js/styles/github.css';



export default function ChatWidget({ 
  character, 
  userName, 
  onBack,
  pendingQuestion,
  onQuestionHandled
}) {
  const storageKey = `chat_sessions_${character.id}_${userName}`;

  // We need a way to create the new session and its ID at the same time.
  // We'll use a ref to hold the initial new session so it's not recreated on every render.
  const initialSessionRef = useRef({
    id: Date.now(),
    messages: [{ from: "ai", text: `Hi ${userName}! I'm ${character.name}. What's our first assignment today? 📝` }]
  });

  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      const parsed = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed)) {
        // Add the new assignment to the start of the loaded list
        return [initialSessionRef.current, ...parsed];
      }
    } catch (e) {
      console.error("Failed to parse sessions from localStorage", e);
    }
    // If storage fails, just start with the new assignment
    return [initialSessionRef.current];
  });

  // The active session is now always the new one we just created.
  const [activeSessionId, setActiveSessionId] = useState(initialSessionRef.current.id);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  const setMessages = (updateFn) => {
    setSessions(currentSessions => 
      currentSessions.map(s => s.id === activeSessionId ? { ...s, messages: updateFn(s.messages) } : s)
    );
  };

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null); // 2. Add state to hold the selected file
  const fileInputRef = useRef(null); // 3. Add a ref to trigger the file input
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null); // For auto-resizing
  const [pendingAIText, setPendingAIText] = useState(""); // Buffer for streaming AI text
  const [isAITyping, setIsAITyping] = useState(false);

  // New features state
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [showStudyTimer, setShowStudyTimer] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showAdvancedGames, setShowAdvancedGames] = useState(false);
  const [showSoundManager, setShowSoundManager] = useState(false);
  const [showProgressDashboard, setShowProgressDashboard] = useState(false);
  const [showLearningPath, setShowLearningPath] = useState(false);
  const [showStorybookStore, setShowStorybookStore] = useState(false);
  const [totalMessages, setTotalMessages] = useState(0);




  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(sessions));
  }, [sessions, storageKey]);

  // Track total messages for progress
  useEffect(() => {
    const total = sessions.reduce((sum, session) => sum + session.messages.length, 0);
    setTotalMessages(total);
  }, [sessions]);





  // 2. Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Direct text display: show full response immediately
  useEffect(() => {
    if (pendingAIText.length > 0) {
      setIsAITyping(true);
      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (!lastMsg || lastMsg.from !== "ai") {
          return prev;
        }
        // Show full response immediately
        const updated = [
          ...prev.slice(0, -1),
          { ...lastMsg, text: lastMsg.text + pendingAIText },
        ];
        return updated;
      });
      setPendingAIText(""); // Clear buffer
      setIsAITyping(false);
    }
  }, [pendingAIText]);

  // When pendingAIText is empty and loading, finish loading
  useEffect(() => {
    if (loading && pendingAIText === "") {
      setLoading(false);
    }
  }, [pendingAIText, loading]);

  const handleNewChat = () => {
    // This function now creates a "New Assignment"
    const newAssignment = { id: Date.now(), messages: [{ from: "ai", text: `Okay, ${userName}! A fresh assignment. What would you like to work on?` }] };
    setSessions(currentSessions => [newAssignment, ...currentSessions]); // Add to the top
    setActiveSessionId(newAssignment.id);
  };





  const handleStorySelect = (story) => {
    setShowStorybookStore(false);
    const storyMessage = `I'd like to read "${story.title}" today! Can you read it to me?`;
    setInput(storyMessage);
  };

  const sendMessage = async () => {
    if ((!input.trim() && !file) || !activeSession) {
      return;
    }



    const userMsg = { 
      from: "user", 
      text: input,
      fileName: file ? file.name : null,
      timestamp: Date.now()
    };

    const updatedHistory = [...activeSession.messages, userMsg];

    setMessages(currentMessages => [...currentMessages, userMsg, { from: "ai", text: "", timestamp: Date.now() }]);
    setInput("");
    setFile(null);
    setLoading(true);
    setPendingAIText(""); // Reset buffer

    try {
      const formData = new FormData();
      formData.append("characterId", character.id);
      formData.append("history", JSON.stringify(updatedHistory));
      formData.append("userName", userName);
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/chat`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.error || "Failed to fetch response from server.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value, { stream: true });
        setPendingAIText(prev => prev + chunk); // Buffer the chunk for typing effect
      }
    } catch (e) {
      setMessages(msgs => {
        const newMessages = [...msgs];
        const lastMessage = newMessages[newMessages.length - 1];
        lastMessage.text = `Sorry, I had trouble answering. Error: ${e.message}`;
        return newMessages;
      });
    }
    // Let the typing effect handle completion
  };

  const sendSpecificMessage = async (questionText) => {
    if (!questionText.trim() || !activeSession) return;
    const userMsg = { from: "user", text: questionText };

    // Use the same history logic as sendMessage
    const updatedHistory = [...activeSession.messages, userMsg];

    setMessages(msgs => [...msgs, userMsg, { from: "ai", text: "" }]);
    setLoading(true);
    setPendingAIText(""); // Reset buffer

    try {
      const formData = new FormData();
      formData.append("characterId", character.id);
      formData.append("history", JSON.stringify(updatedHistory));
      formData.append("userName", userName);

      const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/chat`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.error || "Failed to fetch response from server.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setPendingAIText(prev => prev + chunk); // Buffer the chunk for typing effect
      }
    } catch (e) {
      setMessages(msgs => {
        const newMessages = [...msgs];
        const lastMessage = newMessages[newMessages.length - 1];
        lastMessage.text = `Sorry, I had trouble answering. Error: ${e.message}`;
        return newMessages;
      });
      console.error(e);
    }
    // Let the typing effect handle completion
  };

  useEffect(() => {
    if (pendingQuestion && !loading) {
      const timer = setTimeout(() => {
        sendSpecificMessage(pendingQuestion);
        if (onQuestionHandled) onQuestionHandled();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [pendingQuestion, activeSession, loading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSwitchCharacter = (characterId) => {
    const lastUserMessage = activeSession?.messages.slice().reverse().find(msg => msg.from === "user");
    const lastQuestion = lastUserMessage?.text || null;
    localStorage.setItem(storageKey, JSON.stringify(sessions));
    onBack(characterId, lastQuestion);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Card className="w-full max-w-xs sm:max-w-md md:max-w-2xl h-[calc(100vh-4rem)] flex flex-col md:h-[calc(85vh-4rem)] md:max-h-[900px] md:rounded-3xl md:shadow-2xl bg-white dark:bg-gray-900 border-0 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-gray-800 rounded-t-3xl">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Button variant="ghost" size="icon" onClick={() => onBack()} className="hover:bg-blue-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-3xl sm:text-4xl drop-shadow-lg">{character.emoji}</div>
          <div>
            <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{character.name}</CardTitle>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{character.subject} Tutor</div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {/* Mobile: Show only essential buttons, desktop: show all */}
          
          {/* Always visible on mobile and desktop */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden sm:block">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowLearningPath(true)}
              title="Learning Path" 
              className="hover:bg-indigo-100 dark:hover:bg-indigo-800 rounded-full transition-all duration-200"
            >
              <Target className="h-5 w-5 text-indigo-600" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden sm:block">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowProgressDashboard(true)}
              title="Progress Dashboard" 
              className="hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition-all duration-200"
            >
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden sm:block">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowSoundManager(true)}
              title="Sound Settings" 
              className="hover:bg-yellow-100 dark:hover:bg-yellow-800 rounded-full transition-all duration-200"
            >
              <Music className="h-5 w-5 text-yellow-600" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden sm:block">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowFlashcards(true)}
              title="Create Flashcards" 
              className="hover:bg-pink-100 dark:hover:bg-pink-800 rounded-full transition-all duration-200"
            >
              <BookOpen className="h-5 w-5 text-pink-600" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden sm:block">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowAdvancedGames(true)}
              title="Learning Games" 
              className="hover:bg-purple-100 dark:hover:bg-purple-800 rounded-full transition-all duration-200"
            >
              <Gamepad2 className="h-5 w-5 text-purple-600" />
            </Button>
          </motion.div>

          {/* Storybook Store Button - Only show for Storybook character */}
          {character.id === 'storybook' && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden sm:block">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowStorybookStore(true)}
                title="Browse Stories" 
                className="hover:bg-orange-100 dark:hover:bg-orange-800 rounded-full transition-all duration-200"
              >
                <span className="text-xl">📚</span>
              </Button>
            </motion.div>
          )}

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden sm:block">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowStudyTimer(true)}
              title="Study Timer" 
              className="hover:bg-green-100 dark:hover:bg-green-800 rounded-full transition-all duration-200"
            >
              <Timer className="h-5 w-5 text-green-600" />
            </Button>
          </motion.div>
          
          {/* Mobile: Dropdown menu for all features */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" title="More Features" className="sm:hidden hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <DropdownMenuItem onClick={() => setShowLearningPath(true)} className="hover:bg-indigo-50 dark:hover:bg-indigo-700 transition-colors duration-200">
                <Target className="h-4 w-4 mr-2 text-indigo-600" />
                Learning Path
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowProgressDashboard(true)} className="hover:bg-blue-50 dark:hover:bg-blue-700 transition-colors duration-200">
                <BarChart3 className="h-4 w-4 mr-2 text-blue-600" />
                Progress Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowSoundManager(true)} className="hover:bg-yellow-50 dark:hover:bg-yellow-700 transition-colors duration-200">
                <Music className="h-4 w-4 mr-2 text-yellow-600" />
                Sound Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowFlashcards(true)} className="hover:bg-pink-50 dark:hover:bg-pink-700 transition-colors duration-200">
                <BookOpen className="h-4 w-4 mr-2 text-pink-600" />
                Create Flashcards
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowAdvancedGames(true)} className="hover:bg-purple-50 dark:hover:bg-purple-700 transition-colors duration-200">
                <Gamepad2 className="h-4 w-4 mr-2 text-purple-600" />
                Learning Games
              </DropdownMenuItem>
              {character.id === 'storybook' && (
                <DropdownMenuItem onClick={() => setShowStorybookStore(true)} className="hover:bg-orange-50 dark:hover:bg-orange-700 transition-colors duration-200">
                  <span className="text-lg mr-2">📚</span>
                  Browse Stories
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => setShowStudyTimer(true)} className="hover:bg-green-50 dark:hover:bg-green-700 transition-colors duration-200">
                <Timer className="h-4 w-4 mr-2 text-green-600" />
                Study Timer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Always visible buttons */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" title="Past Assignments" className="hover:bg-blue-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200">
                <History className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              {sessions.map(session => (
                <DropdownMenuItem key={session.id} onSelect={() => setActiveSessionId(session.id)} className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  Assignment from {new Date(session.id).toLocaleString()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" onClick={handleNewChat} title="New Assignment" className="hover:bg-blue-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      


      <CardContent className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-5 space-y-3 sm:space-y-4 bg-gray-50 dark:bg-gray-900">
        <AnimatePresence>
          {activeSession?.messages.map((msg, i) => {
            const showDateSeparator = i > 0 &&
              new Date(msg.timestamp || Date.now()).toDateString() !==
              new Date(activeSession.messages[i-1].timestamp || Date.now()).toDateString();
            return (
              <React.Fragment key={i}>
                {showDateSeparator && (
                  <motion.div 
                    className="flex justify-center my-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="bg-blue-100 dark:bg-gray-700 px-4 py-2 rounded-full text-xs text-blue-700 dark:text-gray-200 font-medium shadow-sm border border-blue-200 dark:border-gray-600">
                      {new Date(msg.timestamp || Date.now()).toLocaleDateString()}
                    </div>
                  </motion.div>
                )}
                <MessageBubble 
                  from={msg.from} 
                  text={msg.text} 
                  character={character}
                  onSwitchCharacter={handleSwitchCharacter}
                  fileName={msg.fileName}
                  timestamp={msg.timestamp || Date.now()}
                />
              </React.Fragment>
            );
          })}
          {isAITyping && <TypingIndicator character={character} />}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-2 sm:p-3 md:p-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-3xl">
        <div className="flex flex-col w-full">
          {/* Improved File Preview */}
          {file && (
            <motion.div 
              className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-between text-sm border border-blue-200 dark:border-blue-700 shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <span className="truncate pr-2 text-blue-800 dark:text-blue-200 font-medium">Attaching: {file.name}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition-all duration-200" onClick={() => setFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
          <div className="flex w-full items-end space-x-2 sm:space-x-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,application/pdf"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => fileInputRef.current.click()}
              title="Attach file"
              className="shrink-0 h-10 w-10 sm:h-12 sm:w-12 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200"
            >
              <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 resize-none max-h-32 sm:max-h-40 overflow-y-auto text-sm sm:text-base py-2 sm:py-3 px-3 sm:px-4 border-2 border-gray-200/50 dark:border-gray-600/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm focus:shadow-md"
              rows={1}
              disabled={loading}
            />
            <Button 
              onClick={() => {
                sendMessage();
              }} 
              disabled={loading || (!input.trim() && !file)} 
              className="shrink-0 h-10 px-3 sm:h-12 sm:px-4 text-sm sm:text-base bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:opacity-50"
            >
              Send
            </Button>
            <VoiceButton 
              text={activeSession?.messages.filter(m => m.from === 'ai').at(-1)?.text} 
              character={character} 
              className="shrink-0 h-10 w-10 sm:h-12 sm:w-12"
            />
          </div>
        </div>
      </CardFooter>
      
      {/* All Feature Modals */}
      <AnimatePresence>
        {showMiniGame && (
          <MiniGame 
            onClose={() => setShowMiniGame(false)}
            onReward={handleGameScore}
          />
        )}
        
        {showStudyTimer && (
          <StudyTimer 
            onClose={() => setShowStudyTimer(false)}
          />
        )}
        
        {showFlashcards && (
          <FlashcardCreator 
            character={character}
            onClose={() => setShowFlashcards(false)}
          />
        )}
        
        {showAdvancedGames && (
          <AdvancedGames 
            character={character}
            onClose={() => setShowAdvancedGames(false)}
            onScoreUpdate={handleGameScore}
          />
        )}
        
        {showSoundManager && (
          <SoundManager 
            onClose={() => setShowSoundManager(false)}
          />
        )}
        
        {showProgressDashboard && (
          <ProgressDashboard 
            character={character}
            onClose={() => setShowProgressDashboard(false)}
          />
        )}
        
        {showLearningPath && (
          <LearningPath 
            character={character}
            onClose={() => setShowLearningPath(false)}
            onPathSelected={(lesson) => {
              // Auto-generate a question based on the selected lesson
              const lessonQuestion = `Can you help me learn about ${lesson.name}? I'd like to understand this topic better.`;
              setInput(lessonQuestion);
              setShowLearningPath(false);
            }}
          />
        )}
        
        {showStorybookStore && (
          <StorybookStore 
            onStorySelect={handleStorySelect}
            onClose={() => setShowStorybookStore(false)}
          />
        )}
      </AnimatePresence>
    </Card>
  );
}