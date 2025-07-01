import React, { useState } from "react";
import ChatWidget from "./components/ChatWidget";
import CharacterSelector from "./components/CharacterSelector";

export default function App() {
  const [character, setCharacter] = useState("lantern");
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-xs w-full">
      <CharacterSelector selected={character} onSelect={setCharacter} />
      <ChatWidget character={character} />
    </div>
  );
} 