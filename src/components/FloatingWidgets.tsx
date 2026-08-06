"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageSquare, Bot, MessageCircle, X } from 'lucide-react';
import ValarAIChat from './ValarAIChat';

export default function FloatingWidgets() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatView, setChatView] = useState<'menu' | 'ai'>('menu');

  // Handle scroll listener for the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (isChatOpen) {
      // Reset view back to menu when closing after animation ends
      setTimeout(() => setChatView('menu'), 300);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`w-12 h-12 bg-white text-[#FF5E00] rounded-full shadow-lg border border-gray-100 flex items-center justify-center transition-all duration-300 hover:bg-gray-50 hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Chat Windows Container */}
      <div 
        className={`flex flex-col gap-2 transition-all duration-300 origin-bottom-right mb-2 ${
          isChatOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
        }`}
      >
        {chatView === 'menu' ? (
          <div className="bg-white rounded-[16px] shadow-xl border border-gray-100 p-2 flex flex-col w-[200px] overflow-hidden relative z-20">
            <button 
              onClick={() => setChatView('ai')}
              className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 transition-colors rounded-[8px] text-left"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-gray-900 leading-tight">ValarAI</p>
                <p className="text-[11px] text-gray-500">Instant smart support</p>
              </div>
            </button>
            
            <div className="w-full h-[1px] bg-gray-100 my-1"></div>
            
            <a 
              href="https://wa.me/2348134146906" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 transition-colors rounded-[8px] text-left"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-gray-900 leading-tight">WhatsApp</p>
                <p className="text-[11px] text-gray-500">Chat with our team</p>
              </div>
            </a>
          </div>
        ) : (
          <div className="relative z-20">
            <ValarAIChat 
              onClose={() => {
                setIsChatOpen(false);
                setTimeout(() => setChatView('menu'), 300);
              }} 
              onBack={() => setChatView('menu')} 
            />
          </div>
        )}
      </div>

      {/* Main Chat FAB */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 bg-[#FF5E00] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-[#E05200] hover:scale-105 relative z-30"
        aria-label="Toggle chat support"
      >
        <X 
          className={`w-6 h-6 absolute transition-all duration-300 ${
            isChatOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'
          }`} 
        />
        <MessageSquare 
          className={`w-6 h-6 absolute transition-all duration-300 ${
            isChatOpen ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'
          }`} 
        />
      </button>

    </div>
  );
}
