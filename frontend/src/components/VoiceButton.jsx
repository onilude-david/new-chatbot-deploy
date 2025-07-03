import React from "react";
import { useSpeech } from "../hooks/useSpeech";
import { Button } from "./ui/button";
import { Play, Square } from "lucide-react";

export default function VoiceButton({ text, character, className }) {
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
      variant={isPlaying ? "destructive" : "outline"}
      size="icon"
      aria-label={isPlaying ? "Stop voice" : "Play voice"}
      title={isPlaying ? "Stop voice" : "Play voice"}
      className={`transition-all duration-200 ${
        isPlaying
          ? "bg-red-100 text-red-600"
          : "hover:bg-blue-100 hover:text-blue-600"
      } ${className || ""}`}
    >
      {isPlaying ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
    </Button>
  );
}