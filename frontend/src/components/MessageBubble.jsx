import React from "react";

const characterEmojis = {
  lantern: "🔆",
  lanterness: "💜",
  sprout: "🌱",
  greenie: "🐛",
  brainy: "✨",
};

export default function MessageBubble({ from, text }) {
  const isAI = from === "ai";
  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"} mb-1`}>
      <div
        className={`px-3 py-2 rounded-xl max-w-[80%] text-base whitespace-pre-line ${
          isAI
            ? "bg-yellow-50 text-gray-800 border border-yellow-200"
            : "bg-blue-100 text-blue-900 border border-blue-200"
        }`}
      >
        {isAI && <span className="mr-1">🤖</span>}
        {text}
      </div>
    </div>
  );
} 