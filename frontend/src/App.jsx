import React, { useState, useEffect, useContext } from "react";
import CharacterSelector from "./components/CharacterSelector";
import ChatWidget from "./components/ChatWidget";
import WelcomeScreen from "./components/WelcomeScreen";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { ThemeProviderContext } from "./components/ThemeProvider";

// Use environment variable for production, empty string for local development (proxy)
const apiUrl = import.meta.env.VITE_API_URL || "";

export default function App() {
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || null);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [pendingQuestion, setPendingQuestion] = useState(null); // New state for pending questions
  const { theme, setTheme } = useContext(ThemeProviderContext);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/characters`);
        if (!res.ok) throw new Error("Failed to fetch characters");
        const data = await res.json();
        setCharacters(data);
      } catch (e) {
        console.error(e);
      }
    };
    // Only fetch characters if a user name exists
    if (userName) {
      fetchCharacters();
    }
  }, [userName]);

  const handleNameSubmit = (name) => {
    localStorage.setItem("userName", name);
    setUserName(name);
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

  const renderContent = () => {
    if (!userName) {
      return <WelcomeScreen onNameSubmit={handleNameSubmit} />;
    }
    
    if (characters.length === 0) {
        return <div>Loading characters...</div>;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center p-2 sm:p-4">
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl">
        {renderContent()}
      </div>
    </div>
  );
}