"use client";

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  method?: string;
  path?: string;
  titleRight?: string;
}

export default function CodeBlock({ code, language, tabs, activeTab, onTabChange, method, path, titleRight }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="w-full rounded-xl overflow-hidden bg-[#2D3748] shadow-md flex flex-col mt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#3A4556] px-4 py-2.5 text-white border-b border-white/5 gap-2 sm:gap-0">
        
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Method Badge (e.g. POST, GET) */}
          {method && (
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase ${
              method === 'POST' ? 'bg-blue-500' : 
              method === 'GET' ? 'bg-green-500' : 
              'bg-gray-500'
            }`}>
              {method}
            </span>
          )}

          {/* Path */}
          {path && (
            <span className="text-[13px] text-gray-200 font-mono">{path}</span>
          )}

          {/* Tabs */}
          {tabs && tabs.length > 0 && (
            <div className="flex gap-4 items-center">
              {tabs.map((tab) => (
                <button 
                  key={tab}
                  onClick={() => onTabChange && onTabChange(tab)}
                  className={`text-[12px] md:text-[13px] font-medium transition-colors ${
                    activeTab === tab ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          {/* Simple Language / Title (if no method/tabs) */}
          {!method && !tabs && language && (
            <span className="text-[12px] md:text-[13px] font-medium text-gray-200">
              {language}
            </span>
          )}
        </div>

        {/* Right side title / Copy button */}
        <div className="flex items-center gap-3">
          {titleRight && (
            <span className="text-[12px] md:text-[13px] font-medium text-gray-300">
              {titleRight}
            </span>
          )}
          <button 
            onClick={handleCopy}
            className="text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors"
            aria-label="Copy code"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            <span className="text-[12px] font-medium">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

      </div>

      {/* Code Area */}
      <div className="relative">
        <pre className="p-4 md:p-5 overflow-x-auto text-[13px] leading-[1.6] text-gray-100 font-mono custom-scrollbar">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

