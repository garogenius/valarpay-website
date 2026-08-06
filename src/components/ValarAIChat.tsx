"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Loader2, ArrowLeft } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface ValarAIChatProps {
  onClose: () => void;
  onBack: () => void;
}

export default function ValarAIChat({ onClose, onBack }: ValarAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Hi there! I am ValarAI. How can I help you with your banking today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to UI immediately
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      
      // Add AI response to UI
      setMessages((prev) => [...prev, { role: 'model', content: data.message }]);
      
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: 'model', content: "I'm having trouble connecting to the server right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[320px] sm:w-[350px] h-[500px] max-h-[80vh] bg-white rounded-[24px] shadow-2xl border border-gray-100 overflow-hidden flex-shrink-0 relative z-50">
      
      {/* Header */}
      <div className="bg-[#FF5E00] text-white p-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-white/20 rounded-full transition-colors" aria-label="Back to menu">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white text-[#FF5E00] flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] leading-tight">ValarAI</h3>
              <p className="text-[11px] text-white/80">Active now</p>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors" aria-label="Close chat">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-[14px] leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-[#FF5E00] text-white rounded-tr-sm' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#FF5E00]" />
              <span className="text-[13px] text-gray-500">ValarAI is typing...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100 z-10">
        <form onSubmit={sendMessage} className="flex items-center gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-100 text-gray-900 border-none rounded-full pl-4 pr-12 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF5E00]/20"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-1 w-10 h-10 bg-[#FF5E00] text-white rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:bg-gray-300 hover:bg-[#E05200]"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
