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
    <Card className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome!</CardTitle>
          <CardDescription>
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
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Let's Go!
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}