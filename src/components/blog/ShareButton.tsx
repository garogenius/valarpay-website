"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Share2, Check, Link as LinkIcon } from 'lucide-react';

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShare = async () => {
    // If Web Share API is available (usually mobile/macOS Safari), use it
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: currentUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: Open dropdown for desktop
      setIsOpen(!isOpen);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getShareUrl = (platform: string) => {
    if (!currentUrl) return '#';
    const url = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);
    
    switch (platform) {
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      default:
        return '#';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleShare}
        className="inline-flex items-center gap-2 text-blue-300 hover:text-[#1D9BF0] transition-colors text-[14px] font-medium bg-transparent border-0 cursor-pointer"
        aria-label="Share this article"
      >
        <Share2 size={16} /> Share
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#0A192F] border border-blue-900/50 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <a href={getShareUrl('twitter')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-blue-100 transition-colors text-[14px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#1D9BF0]">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
            Share on X
          </a>
          <a href={getShareUrl('linkedin')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-blue-100 transition-colors text-[14px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#0A66C2]">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            Share on LinkedIn
          </a>
          <a href={getShareUrl('facebook')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-blue-100 transition-colors text-[14px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#1877F2]">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            Share on Facebook
          </a>
          
          <div className="h-[1px] w-full bg-blue-900/30 my-1"></div>
          
          <button onClick={copyLink} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-blue-100 transition-colors text-[14px] bg-transparent border-0 cursor-pointer">
            {copied ? <Check size={16} className="text-green-400" /> : <LinkIcon size={16} className="text-blue-400" />} 
            {copied ? "Link Copied!" : "Copy Link"}
          </button>
        </div>
      )}
    </div>
  );
}
