import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Paperclip } from "lucide-react";

export default function MessageBubble({ from, text, character, onSwitchCharacter, fileName, timestamp }) {
  const isAI = from === "ai";
  
  // Simple text processing - no markdown
  const regex = /\[SWITCH_TO:(\w+)\]/g;
  const matches = [...(text?.matchAll(regex) || [])];
  
  let formattedText = text || "";
  const buttons = [];
  
  if (matches.length > 0) {
    matches.forEach((match, index) => {
      const characterId = match[1];
      formattedText = formattedText.replace(match[0], "");
      
      buttons.push(
        <Button 
          key={index}
          variant="outline" 
          className="mt-2 mr-2 text-sm py-1 h-auto"
          onClick={() => onSwitchCharacter && onSwitchCharacter(characterId)}
        >
          Switch to this character
        </Button>
      );
    });
  }

  return (
    <div className={`flex ${from === "user" ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-3 py-2 rounded-xl max-w-[80%] text-base ${
          from === "user"
            ? "bg-blue-100 text-blue-900"
            : "bg-yellow-50 text-gray-800"
        }`}
      >
        {isAI && character && (
          <div className="flex items-center gap-1 mb-1 font-medium">
            <span className="text-lg">{character.emoji}</span>
            <span>{character.name}</span>
          </div>
        )}
        {/* Just display text directly - no markdown */}
        <div className="whitespace-pre-wrap break-words">
          {formattedText}
        </div>
        
        {fileName && (
          <div className="mt-2 p-2 bg-gray-100 rounded-md text-sm">
            <span>{fileName}</span>
          </div>
        )}
        
        {buttons.length > 0 && (
          <div className="mt-2">
            {buttons}
          </div>
        )}
        
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
          {timestamp ? 
            new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) :
            new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          }
        </div>
      </div>
    </div>
  );
}