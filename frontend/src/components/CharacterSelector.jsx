import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import TypingIndicator from "./TypingIndicator"; // Adjust the import based on your file structure

export default function CharacterSelector({ characters, onSelect, userName, loading, character }) {
  const handleKeyDown = (e, char) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(char);
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 pt-16 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 dark:from-purple-900 dark:via-indigo-900 dark:to-pink-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Welcome, {userName}! 👋
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-200 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Who would you like to learn with today?
          </motion.p>
          <motion.div 
            className="mt-4 text-sm text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Choose your favorite tutor and start learning!
          </motion.div>
        </motion.div>

        <motion.div 
          className="w-full max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
            {characters.map((char, index) => (
              <motion.div
                key={char.id}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.05,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card
                  onClick={() => onSelect(char)}
                  onKeyDown={(e) => handleKeyDown(e, char)}
                  tabIndex={0}
                  role="button"
                  className="cursor-pointer h-full min-h-[200px] flex flex-col justify-center hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-500/30 transition-all duration-500 bg-gradient-to-br from-white via-pink-50 to-yellow-50 dark:from-purple-800 dark:via-pink-800 dark:to-orange-800 border-2 border-pink-200 dark:border-pink-500 hover:border-pink-400 dark:hover:border-pink-400 rounded-3xl overflow-hidden group relative w-full max-w-[300px]"
                >
                  {/* Animated sparkles */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="absolute top-4 right-4 text-2xl"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ✨
                    </motion.div>
                    <motion.div 
                      className="absolute bottom-4 left-4 text-xl"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, -15, 15, 0]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                      🌟
                    </motion.div>
                  </motion.div>

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-pink-100/50 dark:to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="text-center pb-2 relative z-10">
                    <motion.div 
                      className="text-6xl md:text-7xl mx-auto mb-3 drop-shadow-lg"
                      whileHover={{ 
                        scale: 1.4, 
                        rotate: [0, 15, -15, 0],
                        transition: { duration: 0.6, ease: "easeInOut" }
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      {char.emoji}
                    </motion.div>
                  </CardHeader>
                  <CardContent className="text-center pt-0 relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                        {char.name}
                      </CardTitle>
                      <p className="text-base text-gray-700 dark:text-gray-200 font-medium">
                        Expert in <span className="font-bold text-pink-600 dark:text-pink-400 bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">{char.subject}</span>
                      </p>
                    </motion.div>
                    <motion.div 
                      className="mt-4 text-sm text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                      >
                        Click to start learning! ✨
                      </motion.span>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {loading && <TypingIndicator character={character} loading={loading} />}
      </div>
    </motion.div>
  );
}