import React, { useState, useEffect, useContext } from "react";
import CharacterSelector from "./components/CharacterSelector";
import ChatWidget from "./components/ChatWidget";
import WelcomeScreen from "./components/WelcomeScreen";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LearningDashboard from "./components/LearningDashboard";
import Settings from "./components/Settings";
import CurriculumBrowser from "./components/CurriculumBrowser";
import LessonSystem from "./components/LessonSystem";
import SearchComponent from "./components/SearchComponent";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { ThemeProviderContext } from "./components/ThemeProvider";
import { motion } from "framer-motion";
import { nigerianCurriculum } from "./data/nigerianCurriculum";

// Use environment variable for production, empty string for local development (proxy)
const apiUrl = import.meta.env.VITE_API_URL || "";

export default function App() {
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || null);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [pendingQuestion, setPendingQuestion] = useState(null); // New state for pending questions
  const [loadingError, setLoadingError] = useState(null);
  const [showLearningDashboard, setShowLearningDashboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCurriculumBrowser, setShowCurriculumBrowser] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const { theme, setTheme } = useContext(ThemeProviderContext);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoadingError(null);
        console.log('Fetching characters from:', `${apiUrl}/api/characters`);
        
        // Add timeout to prevent infinite loading
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const res = await fetch(`${apiUrl}/api/characters`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        console.log('Response status:', res.status);
        
        if (!res.ok) throw new Error(`Failed to fetch characters: ${res.status}`);
        const data = await res.json();
        console.log('Characters loaded:', data);
        setCharacters(data);
      } catch (e) {
        console.error('Error fetching characters:', e);
        setLoadingError(e.message);
        // Set a fallback to prevent infinite loading
        setCharacters([]);
      }
    };
    // Only fetch characters if a user name exists
    if (userName) {
      fetchCharacters();
    }
  }, [userName, loadingError]);

  // Keyboard shortcuts for kids
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Escape key to go back
      if (e.key === 'Escape' && selectedCharacter) {
        handleCharacterSwitch();
      }
      // Enter key to submit (when focused on input)
      if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        e.target.form?.requestSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedCharacter]);

  const handleNameSubmit = (name) => {
    localStorage.setItem("userName", name);
    setUserName(name);
    // Add celebration effect
    const celebration = document.createElement('div');
    celebration.innerHTML = '🎉 Welcome! 🎉';
    celebration.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
      color: white;
      padding: 20px 40px;
      border-radius: 20px;
      font-size: 24px;
      font-weight: bold;
      z-index: 1000;
      animation: celebration 2s ease-out forwards;
    `;
    document.body.appendChild(celebration);
    setTimeout(() => celebration.remove(), 2000);
  };

  // Enhanced handleCharacterSwitch function
  const handleCharacterSwitch = (characterId = null, question = null) => {
    // Store the question if provided
    if (question) {
      setPendingQuestion(question);
    }

    // If no specific character was requested, just go back to the selector
    if (!characterId) {
      setSelectedCharacter(null);
      return;
    }
    
    // Find the requested character in our list
    const requestedCharacter = characters.find(c => c.id === characterId);
    
    // If found, switch to that character immediately
    if (requestedCharacter) {
      setSelectedCharacter(requestedCharacter);
    } else {
      // Otherwise just go back to the selector
      setSelectedCharacter(null);
    }
  };

  // Navigation handler for header buttons
  const handleNavigation = (destination) => {
    switch (destination) {
      case 'home':
        // Go back to welcome screen (reset everything)
        setUserName(null);
        setSelectedCharacter(null);
        setPendingQuestion(null);
        setShowLearningDashboard(false);
        setShowSettings(false);
        break;
      case 'tutors':
        // Go to character selection
        setSelectedCharacter(null);
        setPendingQuestion(null);
        setShowLearningDashboard(false);
        setShowSettings(false);
        break;
      case 'learning':
        // Show learning dashboard
        setShowLearningDashboard(true);
        setShowSettings(false);
        setShowCurriculumBrowser(false);
        break;
      case 'curriculum':
        // Show curriculum browser
        setShowCurriculumBrowser(true);
        setShowLearningDashboard(false);
        setShowSettings(false);
        setShowSearch(false);
        break;
      case 'search':
        // Show search
        setShowSearch(true);
        setShowLearningDashboard(false);
        setShowSettings(false);
        setShowCurriculumBrowser(false);
        break;
      case 'settings':
        // Show settings
        setShowSettings(true);
        setShowLearningDashboard(false);
        setShowCurriculumBrowser(false);
        setShowSearch(false);
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    if (!userName) {
      return <WelcomeScreen onNameSubmit={handleNameSubmit} />;
    }

    if (showLearningDashboard) {
      return (
        <LearningDashboard 
          userName={userName} 
          onBack={() => setShowLearningDashboard(false)}
          onNavigate={handleNavigation}
        />
      );
    }

    if (showSettings) {
      return (
        <Settings 
          userName={userName}
          onBack={() => setShowSettings(false)}
          theme={theme}
          setTheme={setTheme}
          onUpdateUserName={(newName) => {
            setUserName(newName);
            localStorage.setItem("userName", newName);
          }}
        />
      );
    }

    if (showCurriculumBrowser) {
      return (
        <CurriculumBrowser 
          userName={userName}
          onBack={() => setShowCurriculumBrowser(false)}
          onStartLesson={(classId, subject, topic) => {
            // Start the lesson system
            setShowCurriculumBrowser(false);
            setCurrentLesson({
              classId,
              className: nigerianCurriculum[classId].name,
              subjectKey: subject,
              subjectName: nigerianCurriculum[classId].subjects[subject].name,
              topic
            });
          }}
        />
      );
    }

    if (currentLesson) {
      return (
        <LessonSystem
          lesson={currentLesson}
          character={selectedCharacter}
          userName={userName}
          onComplete={(lessonResult) => {
            // Handle lesson completion
            console.log('Lesson completed:', lessonResult);
            setCurrentLesson(null);
            // You could save progress here
            // You could show celebration here
          }}
          onBack={() => setCurrentLesson(null)}
        />
      );
    }

    if (showSearch) {
      return (
        <SearchComponent
          onBack={() => setShowSearch(false)}
          onStartLesson={(classId, subject, topic) => {
            setShowSearch(false);
            setCurrentLesson({
              classId,
              className: nigerianCurriculum[classId].name,
              subjectKey: subject,
              subjectName: nigerianCurriculum[classId].subjects[subject].name,
              topic
            });
          }}
        />
      );
    }
    
    if (characters.length === 0) {
        return (
          <motion.div 
            className="flex items-center justify-center min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              {loadingError ? (
                // Error state
                <div>
                  <motion.div 
                    className="text-6xl mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    😔
                  </motion.div>
                  <motion.h2 
                    className="text-2xl font-bold text-red-600 mb-4"
                  >
                    Oops! Something went wrong
                  </motion.h2>
                  <motion.p 
                    className="text-lg text-gray-600 mb-6 max-w-md mx-auto"
                  >
                    We couldn't load the characters. Please check your connection and try again.
                  </motion.p>
                  <Button
                    onClick={() => {
                      setCharacters([]);
                      setLoadingError(null);
                      // Trigger a re-fetch
                      const event = new Event('storage');
                      window.dispatchEvent(event);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    Try Again 🔄
                  </Button>
                </div>
              ) : (
                // Loading state
                <div>
                  <motion.div 
                    className="text-8xl mb-6"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      y: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    🎓✨
                  </motion.div>
                  <motion.h2 
                    className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Getting Your Tutors Ready! 🎉
                  </motion.h2>
                  <motion.p 
                    className="text-xl text-gray-700 dark:text-gray-200 font-medium mb-6"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Loading amazing characters for you! 🌟
                  </motion.p>
                  <motion.div 
                    className="flex justify-center space-x-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.div 
                      className="w-3 h-3 bg-pink-500 rounded-full"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-yellow-500 rounded-full"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-blue-500 rounded-full"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        );
    }

    if (selectedCharacter) {
      return (
        <ChatWidget
          character={selectedCharacter}
          userName={userName}
          onBack={handleCharacterSwitch}
          pendingQuestion={pendingQuestion}
          onQuestionHandled={() => setPendingQuestion(null)}
        />
      );
    }
    
    return (
      <CharacterSelector
        characters={characters}
        onSelect={setSelectedCharacter}
        userName={userName}
      />
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header */}
      <Header theme={theme} setTheme={setTheme} userName={userName} onNavigate={handleNavigation} />
      
      {/* Main Content Area with Background */}
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-500">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-pink-300/30 dark:bg-pink-500/30 rounded-full blur-3xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-300/30 dark:bg-yellow-500/30 rounded-full blur-3xl"
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 5
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-300/30 dark:bg-blue-500/30 rounded-full blur-2xl"
            animate={{ 
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 10
            }}
          />
        </div>
        

        
        {/* Main Content */}
        <main className="flex items-center justify-center p-2 sm:p-4 relative z-10 min-h-[calc(100vh-4rem)]">
          <motion.div 
            className="w-full max-w-xs sm:max-w-md md:max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
      
      {/* Footer - Outside the main background */}
      <Footer />
    </div>
  );
}