import React from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, User, Bot } from "lucide-react";
import { motion } from "framer-motion";

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
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button 
            variant="outline" 
            className="mt-2 mr-2 text-sm py-2 px-4 h-auto bg-gradient-to-r from-pink-50 to-yellow-50 hover:from-pink-100 hover:to-yellow-100 border-pink-200 hover:border-pink-300 text-pink-700 hover:text-pink-800 dark:from-purple-700 dark:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 dark:border-pink-500 dark:hover:border-pink-400 dark:text-pink-200 dark:hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => onSwitchCharacter && onSwitchCharacter(characterId)}
          >
            Switch to this character
          </Button>
        </motion.div>
      );
    });
  }

  return (
    <motion.div 
      className={`flex ${from === "user" ? "justify-end" : "justify-start"} mb-6`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className={`flex max-w-[85%] md:max-w-[70%] ${from === "user" ? "flex-row-reverse" : "flex-row"} items-end space-x-3`}>
        {/* Avatar */}
        <motion.div 
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg
            ${from === "user" 
              ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white ml-3 ring-2 ring-pink-200 dark:ring-pink-800" 
              : "bg-gradient-to-br from-yellow-400 to-orange-400 text-gray-800 mr-3 ring-2 ring-yellow-200 dark:ring-yellow-800"
            }`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {isAI ? (
            <span className="text-lg drop-shadow-sm">{character?.emoji || <Bot className="w-5 h-5" />}</span>
          ) : (
            <User className="w-5 h-5" />
          )}
        </motion.div>
        
        {/* Message Content */}
        <motion.div 
          className={`
            px-6 py-5 rounded-3xl shadow-lg backdrop-blur-sm
            ${from === "user"
              ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-br-md shadow-pink-500/25"
              : "bg-gradient-to-br from-white to-yellow-50 dark:from-purple-800 dark:to-pink-800 text-gray-800 dark:text-white border-2 border-yellow-200/50 dark:border-pink-500/50 rounded-bl-md shadow-yellow-500/10"
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {isAI && character && (
            <motion.div 
              className="flex items-center gap-2 mb-3 text-sm font-semibold opacity-90"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.9, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-lg">{character.emoji}</span>
              <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">{character.name}</span>
            </motion.div>
          )}
          <motion.div 
            className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {formattedText}
            {/* Celebration emojis for positive messages */}
            {isAI && (formattedText.includes('great') || formattedText.includes('excellent') || formattedText.includes('awesome') || formattedText.includes('perfect') || formattedText.includes('amazing')) && (
              <motion.div 
                className="inline-block ml-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-2xl"
                >
                  🎉
                </motion.span>
              </motion.div>
            )}
            {/* Encouragement for learning */}
            {isAI && (formattedText.includes('learn') || formattedText.includes('study') || formattedText.includes('practice')) && (
              <motion.div 
                className="inline-block ml-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1],
                    y: [0, -5, 0]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-xl"
                >
                  ✨
                </motion.span>
              </motion.div>
            )}
          </motion.div>
          {fileName && (
            <motion.div 
              className="mt-4 p-4 bg-yellow-100/80 dark:bg-pink-700/80 rounded-2xl text-sm flex items-center gap-3 border-2 border-yellow-200/50 dark:border-pink-600/50"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Paperclip className="w-5 h-5 text-gray-500" />
              </motion.div>
              <span className="truncate font-medium">{fileName}</span>
            </motion.div>
          )}
          {buttons.length > 0 && (
            <motion.div 
              className="mt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {buttons}
            </motion.div>
          )}
          <motion.div 
            className={`text-xs mt-4 font-medium ${from === "user" ? "text-pink-100" : "text-gray-500 dark:text-gray-400"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {timestamp ? 
              new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) :
              new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            }
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}