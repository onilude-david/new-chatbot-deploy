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
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-screen p-4"
    >
      <Card className="w-full max-w-sm mx-auto shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-center space-y-2 pb-4">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl mb-2"
            >
              🎓
            </motion.div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome!
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
              Please enter your first name to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              className="text-lg py-3 px-4 border-2 focus:border-blue-500 transition-all duration-200"
            />
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Let's Go! 🚀
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}