import React, { useState, useEffect, useContext } from "react";
import CharacterSelector from "./components/CharacterSelector";
import ChatWidget from "./components/ChatWidget";
import WelcomeScreen from "./components/WelcomeScreen";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { ThemeProviderContext } from "./components/ThemeProvider";

const apiUrl = import.meta.env.VITE_API_URL;

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
    <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      {renderContent()}
    </div>
  );
}