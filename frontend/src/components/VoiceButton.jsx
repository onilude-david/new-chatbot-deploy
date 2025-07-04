import React from "react";
import { useSpeech } from "../hooks/useSpeech";
import { Button } from "./ui/button";
import { Play, Square, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        onClick={handleToggleSpeech}
        disabled={!text}
        variant={isPlaying ? "destructive" : "outline"}
        size="icon"
        aria-label={isPlaying ? "Stop voice" : "Play voice"}
        title={isPlaying ? "Stop voice" : "Play voice"}
        className={`transition-all duration-300 rounded-full ${
          isPlaying
            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-purple-600 border-2 border-pink-300"
            : "bg-gradient-to-r from-pink-50 to-yellow-50 hover:from-pink-100 hover:to-yellow-100 text-pink-600 hover:text-pink-700 border-2 border-pink-200 hover:border-pink-300 dark:from-purple-700 dark:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 dark:border-pink-500 dark:hover:border-pink-400 dark:text-pink-200 dark:hover:text-white shadow-sm hover:shadow-md"
        } ${className || ""}`}
      >
        <motion.div
          animate={isPlaying ? { 
            rotate: 360,
            scale: [1, 1.2, 1]
          } : { 
            rotate: 0,
            scale: 1
          }}
          transition={{ duration: 0.5 }}
        >
          {isPlaying ? (
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <Square className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 className="h-5 w-5" />
            </motion.div>
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
}