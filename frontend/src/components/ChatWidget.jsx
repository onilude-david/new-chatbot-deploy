import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import VoiceButton from "./VoiceButton";

export default function ChatWidget({ character }) {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi! I'm here to help. What's your question? 😊" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, character }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { from: "ai", text: data.response }]);
    } catch (e) {
      setMessages((msgs) => [...msgs, { from: "ai", text: "Sorry, I had trouble answering. Please try again!" }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col h-96">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <MessageBubble key={i} from={msg.from} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center space-x-2">
        <textarea
          className="flex-1 rounded-lg border border-gray-300 p-2 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          disabled={loading}
        />
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg px-4 py-2 font-bold disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
        <VoiceButton text={messages[messages.length - 1]?.text} character={character} />
      </div>
    </div>
  );
} 