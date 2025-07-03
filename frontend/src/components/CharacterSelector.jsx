import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function CharacterSelector({ characters, onSelect, userName }) {
  const handleKeyDown = (e, char) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(char);
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-4 pt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-7xl">
        <motion.div 
          className="text-center mb-8"
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome, {userName}! 👋
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Who would you like to learn with today?
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {characters.map((char) => (
            <motion.div
              key={char.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.97 }}
            >
              <Card
                onClick={() => onSelect(char)}
                onKeyDown={(e) => handleKeyDown(e, char)}
                tabIndex={0}
                role="button"
                className="cursor-pointer h-full min-h-[180px] flex flex-col justify-center hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 hover:border-blue-300 dark:hover:border-blue-600"
              >
                <CardHeader className="text-center pb-2">
                  <motion.div 
                    className="text-5xl md:text-6xl mx-auto mb-2"
                    whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {char.emoji}
                  </motion.div>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardTitle className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {char.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Expert in <span className="font-semibold text-blue-600 dark:text-blue-400">{char.subject}</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}