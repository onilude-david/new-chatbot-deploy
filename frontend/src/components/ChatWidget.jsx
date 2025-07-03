import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import VoiceButton from "./VoiceButton";
import TypingIndicator from './TypingIndicator';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, PlusCircle, History, Paperclip, X } from "lucide-react"; // 1. Add X icon
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import 'highlight.js/styles/github.css';

export default function ChatWidget({ 
  character, 
  userName, 
  onBack,
  pendingQuestion,
  onQuestionHandled
}) {
  const storageKey = `chat_sessions_${character.id}_${userName}`;

  // We need a way to create the new session and its ID at the same time.
  // We'll use a ref to hold the initial new session so it's not recreated on every render.
  const initialSessionRef = useRef({
    id: Date.now(),
    messages: [{ from: "ai", text: `Hi ${userName}! I'm ${character.name}. What's our first assignment today? 📝` }]
  });

  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      const parsed = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed)) {
        // Add the new assignment to the start of the loaded list
        return [initialSessionRef.current, ...parsed];
      }
    } catch (e) {
      console.error("Failed to parse sessions from localStorage", e);
    }
    // If storage fails, just start with the new assignment
    return [initialSessionRef.current];
  });

  // The active session is now always the new one we just created.
  const [activeSessionId, setActiveSessionId] = useState(initialSessionRef.current.id);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  const setMessages = (updateFn) => {
    setSessions(currentSessions => 
      currentSessions.map(s => s.id === activeSessionId ? { ...s, messages: updateFn(s.messages) } : s)
    );
  };

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null); // 2. Add state to hold the selected file
  const fileInputRef = useRef(null); // 3. Add a ref to trigger the file input
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null); // For auto-resizing

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(sessions));
  }, [sessions, storageKey]);

  // 2. Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleNewChat = () => {
    // This function now creates a "New Assignment"
    const newAssignment = { id: Date.now(), messages: [{ from: "ai", text: `Okay, ${userName}! A fresh assignment. What would you like to work on?` }] };
    setSessions(currentSessions => [newAssignment, ...currentSessions]); // Add to the top
    setActiveSessionId(newAssignment.id);
  };

  const sendMessage = async () => {
    if ((!input.trim() && !file) || !activeSession) return;
  
    const userMsg = { 
      from: "user", 
      text: input,
      fileName: file ? file.name : null,
      timestamp: Date.now() // Add this line
    };
  
    // Create the complete history that will be sent to the backend
    const updatedHistory = [...activeSession.messages, userMsg];
  
    // Update the UI immediately
    setMessages(currentMessages => [...currentMessages, userMsg, { from: "ai", text: "", timestamp: Date.now() }]); // Add timestamp here too
    const currentInput = input; // Save input before clearing
    setInput("");
    setFile(null);
    setLoading(true);
  
    try {
      const formData = new FormData();
      // The 'message' field is no longer needed, as the message is now in the history
      formData.append("characterId", character.id);
      formData.append("history", JSON.stringify(updatedHistory)); // Send the correct, updated history
      formData.append("userName", userName);
      if (file) {
        formData.append("file", file);
      }
  
      const res = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) {
        // Try to get more detailed error from the server response
        const errorBody = await res.json();
        console.error("Server responded with an error:", errorBody);
        throw new Error(errorBody.error || "Failed to fetch response from server.");
      }
  
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        
        setMessages(currentMessages => {
          const lastMessage = currentMessages[currentMessages.length - 1];
          const updatedLastMessage = { ...lastMessage, text: lastMessage.text + chunk };
          return [...currentMessages.slice(0, -1), updatedLastMessage];
        });
      }
    } catch (e) {
      setMessages(msgs => {
        const newMessages = [...msgs];
        const lastMessage = newMessages[newMessages.length - 1];
        // Update the UI with the specific error message
        lastMessage.text = `Sorry, I had trouble answering. Error: ${e.message}`;
        return newMessages;
      });
      console.error(e);
    }
    setLoading(false);
  };

  const sendSpecificMessage = async (questionText) => {
    if (!questionText.trim() || !activeSession) return;
    const userMsg = { from: "user", text: questionText };
    
    // Use the same history logic as sendMessage
    const updatedHistory = [...activeSession.messages, userMsg];

    setMessages(msgs => [...msgs, userMsg, { from: "ai", text: "" }]);
    setLoading(true);

    try {
      // This now sends FormData, just like the main sendMessage function
      const formData = new FormData();
      formData.append("characterId", character.id); // <-- FIX: Was 'character'
      formData.append("history", JSON.stringify(updatedHistory));
      formData.append("userName", userName);

      const res = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorBody = await res.json();
        console.error("Server responded with an error:", errorBody);
        throw new Error(errorBody.error || "Failed to fetch response from server.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        
        setMessages(currentMessages => {
          const lastMessage = currentMessages[currentMessages.length - 1];
          const updatedLastMessage = { ...lastMessage, text: lastMessage.text + chunk };
          return [...currentMessages.slice(0, -1), updatedLastMessage];
        });
      }
    } catch (e) {
      setMessages(msgs => {
        const newMessages = [...msgs];
        const lastMessage = newMessages[newMessages.length - 1];
        lastMessage.text = `Sorry, I had trouble answering. Error: ${e.message}`;
        return newMessages;
      });
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (pendingQuestion && !loading) {
      const timer = setTimeout(() => {
        sendSpecificMessage(pendingQuestion);
        if (onQuestionHandled) onQuestionHandled();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [pendingQuestion, activeSession, loading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSwitchCharacter = (characterId) => {
    const lastUserMessage = activeSession?.messages.slice().reverse().find(msg => msg.from === "user");
    const lastQuestion = lastUserMessage?.text || null;
    localStorage.setItem(storageKey, JSON.stringify(sessions));
    onBack(characterId, lastQuestion);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Card className="w-screen h-screen flex flex-col md:h-[85vh] md:max-h-[900px] md:max-w-2xl md:rounded-xl md:shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => onBack()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-4xl">{character.emoji}</div>
          <div>
            <CardTitle className="text-xl">{character.name}</CardTitle>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" title="Past Assignments">
                <History className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sessions.map(session => (
                <DropdownMenuItem key={session.id} onSelect={() => setActiveSessionId(session.id)}>
                  Assignment from {new Date(session.id).toLocaleString()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" onClick={handleNewChat} title="New Assignment">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {activeSession?.messages.map((msg, i) => {
              // Check if this message is from a different day than the previous one
              const showDateSeparator = i > 0 && 
                new Date(msg.timestamp || Date.now()).toDateString() !== 
                new Date(activeSession.messages[i-1].timestamp || Date.now()).toDateString();
              
              return (
                <React.Fragment key={i}>
                  {showDateSeparator && (
                    <div className="flex justify-center my-4">
                      <div className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">
                        {new Date(msg.timestamp || Date.now()).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  <MessageBubble 
                    from={msg.from} 
                    text={msg.text} 
                    character={character}
                    onSwitchCharacter={handleSwitchCharacter}
                    fileName={msg.fileName}
                    timestamp={msg.timestamp || Date.now()} // Add this line
                  />
                </React.Fragment>
              );
            })}
            {loading && <TypingIndicator />}
          </AnimatePresence>
          <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-2 border-t md:p-4">
        <div className="flex flex-col w-full">
          {/* 3. Improved File Preview */}
          {file && (
            <div className="mb-2 p-2 bg-muted rounded-lg flex items-center justify-between text-sm">
              <span className="truncate pr-2">Attaching: {file.name}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div className="flex w-full items-end space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,application/pdf"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => fileInputRef.current.click()}
              title="Attach file"
              className="shrink-0"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="resize-none max-h-40 overflow-y-auto"
              rows={1}
              disabled={loading}
            />
            <Button onClick={sendMessage} disabled={loading || (!input.trim() && !file)} className="shrink-0">
              Send
            </Button>
            <VoiceButton 
              text={activeSession?.messages.filter(m => m.from === 'ai').at(-1)?.text} 
              character={character} 
              className="shrink-0"
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}