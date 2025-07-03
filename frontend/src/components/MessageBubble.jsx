import React from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, User, Bot } from "lucide-react";

export default function MessageBubble({ from, text, character, onSwitchCharacter, fileName, timestamp }) {
  const isAI = from === "ai";
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
    <div className={`flex ${from === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex max-w-[85%] md:max-w-[70%] ${from === "user" ? "flex-row-reverse" : "flex-row"} items-end space-x-2`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          ${from === "user" ? "bg-blue-500 text-white ml-2" : "bg-yellow-400 text-gray-800 mr-2"}`}>
          {isAI ? (
            <span className="text-lg">{character?.emoji || <Bot className="w-4 h-4" />}</span>
          ) : (
            <User className="w-4 h-4" />
          )}
        </div>
        {/* Message Content */}
        <div className={`
          px-4 py-3 rounded-2xl shadow-sm
          ${from === "user"
            ? "bg-blue-500 text-white rounded-br-sm"
            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-sm"
          }`
        }>
          {isAI && character && (
            <div className="flex items-center gap-2 mb-2 text-sm font-medium opacity-75">
              <span>{character.name}</span>
            </div>
          )}
          <div className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed">
            {formattedText}
          </div>
          {fileName && (
            <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm flex items-center gap-2">
              <Paperclip className="w-4 h-4" />
              <span className="truncate">{fileName}</span>
            </div>
          )}
          {buttons.length > 0 && (
            <div className="mt-2">
              {buttons}
            </div>
          )}
          <div className={`text-xs mt-2 ${from === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
            {timestamp ? 
              new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) :
              new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            }
          </div>
        </div>
      </div>
    </div>
  );
}