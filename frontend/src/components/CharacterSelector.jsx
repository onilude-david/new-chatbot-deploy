import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function CharacterSelector({ characters, onSelect, userName }) {
  // For keyboard accessibility
  const handleKeyDown = (e, char) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(char);
    }
  };

  return (
    <motion.div 
      className="text-center w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl p-2 sm:p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">Welcome, {userName}!</h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 md:mb-12">
        Who would you like to learn with today?
      </p>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } }
        }}
      >
        {characters.map((char) => (
          <motion.div
            key={char.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <Card
              onClick={() => onSelect(char)}
              onKeyDown={(e) => handleKeyDown(e, char)}
              tabIndex={0}
              role="button"
              className="cursor-pointer h-full flex flex-col justify-center hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200"
            >
              <CardHeader>
                <motion.div 
                  className="text-4xl sm:text-5xl md:text-7xl mx-auto"
                  whileHover={{ scale: 1.2, rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {char.emoji}
                </motion.div>
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle className="text-lg sm:text-xl md:text-2xl">{char.name}</CardTitle>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Specializes in <strong>{char.subject}</strong>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}