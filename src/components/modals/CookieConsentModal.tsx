"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CookieConsentModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('valarpay_cookie_consent');
    if (!hasAccepted) {
      // Show modal after a small delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('valarpay_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-[100] border-t border-gray-100 p-4 md:p-6 animate-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        <div className="flex-1 pr-4">
          <h4 className="text-[#0A192F] font-bold text-[18px] md:text-[20px] mb-2">We respect your privacy</h4>
          <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies. 
            Read our <Link href="/privacy-policy" className="text-[#FF5E00] font-semibold hover:underline">Privacy Policy</Link> and <Link href="/cookies-policy" className="text-[#FF5E00] font-semibold hover:underline">Cookies Policy</Link> for more information.
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button 
            onClick={() => setIsVisible(false)}
            className="flex-1 md:flex-none px-6 py-3 rounded-[12px] border border-gray-200 text-gray-700 font-bold text-[15px] hover:bg-gray-50 transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={acceptCookies}
            className="flex-1 md:flex-none px-8 py-3 rounded-[12px] bg-[#FF5E00] text-white font-bold text-[15px] hover:bg-[#E05200] transition-colors shadow-lg shadow-[#FF5E00]/20"
          >
            Accept All
          </button>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
