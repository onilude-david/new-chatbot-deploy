import React from "react";
import { useSpeech } from "../hooks/useSpeech";
import { Button } from "./ui/button";
import { Play, Square } from "lucide-react";

export default function VoiceButton({ text, character }) {
  const { speak, cancel, isPlaying } = useSpeech(character);

  const handleToggleSpeech = () => {
    if (isPlaying) {
      cancel();
    } else {
      speak(text);
    }
  };

  return (
    <Button
      onClick={handleToggleSpeech}
      disabled={!text}
      variant="outline"
      size="icon"
    >
      {isPlaying ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
    </Button>
  );
}