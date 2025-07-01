import React from "react";

const characters = [
  { id: "lantern", name: "Lantern", emoji: "🔆", subject: "Math" },
  { id: "lanterness", name: "Lanterness", emoji: "💜", subject: "English" },
  { id: "sprout", name: "Sprout", emoji: "🌱", subject: "Science" },
  { id: "greenie", name: "Greenie", emoji: "🐛", subject: "Agriculture" },
  { id: "brainy", name: "Brainy", emoji: "✨", subject: "Reasoning" },
];

export default function CharacterSelector({ selected, onSelect }) {
  return (
    <div className="flex space-x-2 mb-2 justify-center">
      {characters.map((c) => (
        <button
          key={c.id}
          className={`rounded-full p-2 text-2xl border-2 transition-all duration-200 focus:outline-none ${selected === c.id ? "bg-yellow-100 border-yellow-400 scale-110" : "bg-white border-gray-200"}`}
          onClick={() => onSelect(c.id)}
          aria-label={c.name}
        >
          {c.emoji}
        </button>
      ))}
    </div>
  );
} 