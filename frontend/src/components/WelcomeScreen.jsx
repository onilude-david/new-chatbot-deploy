import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { motion } from "framer-motion";

export default function WelcomeScreen({ onNameSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-center h-[calc(100vh-4rem)] w-full p-4 bg-white dark:bg-gray-900"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            <CardHeader className="text-center space-y-4 pb-6 pt-8">
              <motion.div
                initial={{ y: -20, scale: 0.8 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-8xl mb-4 drop-shadow-lg"
                whileHover={{ 
                  scale: 1.3, 
                  rotate: [0, 15, -15, 0],
                  transition: { duration: 0.8, ease: "easeInOut" }
                }}
              >
                🎓
              </motion.div>
              {/* Floating sparkles */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.div 
                  className="absolute top-8 right-8 text-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✨
                </motion.div>
                <motion.div 
                  className="absolute bottom-8 left-8 text-xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, -15, 15, 0],
                    y: [0, 10, 0]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  🌟
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  Welcome To Lanter's Homework Helper! 🎉
                </CardTitle>
                <CardDescription className="text-base text-gray-700 dark:text-gray-200 font-medium">
                  Please enter your first name to get started with your personalized learning experience! 🚀
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-6 px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <Input
                  placeholder="Your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                  className="text-lg py-4 px-5 border-2 border-pink-200/50 dark:border-pink-500/50 focus:border-pink-500 dark:focus:border-pink-400 transition-all duration-300 rounded-xl bg-white/80 dark:bg-purple-800/80 backdrop-blur-sm shadow-sm focus:shadow-md"
                />
              </motion.div>
            </CardContent>
            <CardFooter className="px-8 pb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="w-full"
              >
                <Button 
                  type="submit" 
                  className="w-full py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 rounded-xl shadow-lg hover:shadow-xl text-white"
                >
                  Let's Go! 🚀
                </Button>
              </motion.div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  );
}