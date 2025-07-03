import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const bounceTransition = {
  y: { duration: 0.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
};

export default function TypingIndicator({ character, loading, pendingAIText, setMessages, userName, activeSession, input, setInput, file, setFile }) {
  // Typing effect: reveal pendingAIText one character at a time
  useEffect(() => {
    if (!loading || !pendingAIText) return;
    const timeout = setTimeout(() => {
      setMessages(currentMessages => {
        const lastMessage = currentMessages[currentMessages.length - 1];
        if (lastMessage.from !== "ai") return currentMessages;
        const updatedLastMessage = { ...lastMessage, text: lastMessage.text + pendingAIText[0] };
        return [...currentMessages.slice(0, -1), updatedLastMessage];
      });
      setPendingAIText(prev => prev.slice(1));
    }, 18);
    return () => clearTimeout(timeout);
  }, [pendingAIText, loading, setMessages]);

  // When pendingAIText is empty and loading, finish loading
  useEffect(() => {
    if (loading && pendingAIText === "") {
      setLoading(false);
    }
  }, [pendingAIText, loading]);

  if (!loading) return null;

  const sendMessage = async () => {
    if ((!input.trim() && !file) || !activeSession) return;

    const userMsg = { 
      from: "user", 
      text: input,
      fileName: file ? file.name : null,
      timestamp: Date.now()
    };

    const updatedHistory = [...activeSession.messages, userMsg];

    setMessages(currentMessages => [...currentMessages, userMsg, { from: "ai", text: "", timestamp: Date.now() }]);
    setInput("");
    setFile(null);
    setLoading(true);
    setPendingAIText(""); // Reset buffer

    try {
      const formData = new FormData();
      formData.append("characterId", character.id);
      formData.append("history", JSON.stringify(updatedHistory));
      formData.append("userName", userName);
      if (file) {
        formData.append("file", file);
      }

      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.error || "Failed to fetch response from server.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setPendingAIText(prev => prev + chunk); // Buffer the chunk for typing effect
      }
      // Do NOT setLoading(false) or setPendingAIText("") here!
      // Let the useEffect above handle it.
    } catch (e) {
      setMessages(msgs => {
        const newMessages = [...msgs];
        const lastMessage = newMessages[newMessages.length - 1];
        lastMessage.text = `Sorry, I had trouble answering. Error: ${e.message}`;
        return newMessages;
      });
      setLoading(false);
      setPendingAIText("");
    }
  };

  return (
    <motion.div
      // Animate the indicator bubble itself
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start mb-4"
    >
      <div className="flex items-end space-x-2">
        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-2xl">
          {character?.emoji || "🤖"}
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-sm px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <motion.span
                className="block w-2 h-2 bg-gray-400 rounded-full"
                variants={{ initial: { y: '0%' }, animate: { y: '-50%' } }}
                transition={bounceTransition}
                initial="initial"
                animate="animate"
              />
              <motion.span
                className="block w-2 h-2 bg-gray-400 rounded-full"
                variants={{ initial: { y: '0%' }, animate: { y: '-50%' } }}
                transition={{ ...bounceTransition, delay: 0.2 }}
                initial="initial"
                animate="animate"
              />
              <motion.span
                className="block w-2 h-2 bg-gray-400 rounded-full"
                variants={{ initial: { y: '0%' }, animate: { y: '-50%' } }}
                transition={{ ...bounceTransition, delay: 0.4 }}
                initial="initial"
                animate="animate"
              />
            </div>
            <span className="text-xs text-gray-400 ml-2">typing…</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}