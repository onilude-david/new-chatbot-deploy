import React from "react";

export default function VoiceButton({ text, character }) {
  // TODO: Implement text-to-speech per character
  return (
    <button
      className="ml-1 p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-700"
      title="Hear it out loud"
      aria-label="Play voice"
      disabled
    >
      <span role="img" aria-label="speaker">🔊</span>
    </button>
  );
} 