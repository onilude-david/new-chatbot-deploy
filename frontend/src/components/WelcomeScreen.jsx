import React, { useState } from 'react';
import { Button } from './ui/button'; // Changed from "@/components/ui/button"
import { Input } from './ui/input';   // Changed from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'; // Changed from "@/components/ui/card"

export default function WelcomeScreen({ onNameSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <Card className="w-full max-w-xs sm:max-w-sm mx-auto p-4 sm:p-6">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-center">Welcome!</CardTitle>
          <CardDescription className="text-sm sm:text-base text-center">
            Please enter your first name to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            className="text-base sm:text-lg py-3"
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full py-3 text-base sm:text-lg">
            Let's Go!
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}