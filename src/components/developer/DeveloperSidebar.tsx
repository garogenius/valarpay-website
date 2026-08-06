"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

const NAV_DATA_DOCS = [
  {
    title: 'Get Started',
    items: ['Introduction', 'Quick Start', 'Client', 'Libraries']
  },
  {
    title: 'Guide',
    items: ['Authentication', 'Error Handling', 'Response', 'Request', 'Pagination', 'Webhook']
  },
  {
    title: 'Core Resources',
    items: ['Payment', 'Overview', 'Accept Payment', 'Subscription', 'Payout', 'Refund', 'Split Payment', 'Transaction Search', 'Orders', 'Invoicing']
  }
];

const NAV_DATA_REF = [
  {
    title: 'Authentication & Profiles',
    items: ['Register User', 'Login', 'Verify Account']
  },
  {
    title: 'Transactions',
    items: ['Transfer', 'Get Balance', 'Transaction History']
  },
  {
    title: 'Virtual Accounts',
    items: ['Create Virtual Account']
  },
  {
    title: 'Settings',
    items: ['Update Webhook']
  }
];

interface DeveloperSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mode?: 'docs' | 'reference';
}

export default function DeveloperSidebar({ activeTab, setActiveTab, mode = 'docs' }: DeveloperSidebarProps) {
  const dataToUse = mode === 'docs' ? NAV_DATA_DOCS : NAV_DATA_REF;
  
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    dataToUse.forEach(section => {
      initialState[section.title] = true;
    });
    return initialState;
  });
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const handleSelectTab = (item: string) => {
    setActiveTab(item);
    setIsMobileMenuOpen(false); // Close mobile menu after selecting
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-6 w-full pr-2">
      {dataToUse.map((section) => {
        const isOpen = openSections[section.title];
        return (
          <div key={section.title} className="flex flex-col">
            <button 
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between w-full text-left font-bold text-gray-900 text-[14px] md:text-[15px] hover:text-[#FF5E00] transition-colors py-2"
            >
              <span>{section.title}</span>
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            <div className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ${isOpen ? 'mt-2 max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {section.items.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSelectTab(item)}
                  className={`text-left text-[13px] md:text-[14px] py-2 pl-4 border-l-2 transition-all duration-200 ${
                    activeTab === item 
                      ? 'border-[#FF5E00] text-[#FF5E00] font-semibold bg-[#FF5E00]/5' 
                      : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden w-full bg-white border-b border-gray-200 p-4 sticky top-0 z-40 flex items-center justify-between">
        <span className="font-bold text-gray-900">Developer Menu</span>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-900 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-[280px] lg:w-[320px] flex-shrink-0 border-r border-gray-200 pl-4 lg:pl-12 py-6">
        <SidebarContent />
      </div>

      {/* Mobile Overlay Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex">
          <div className="w-[280px] max-w-[80vw] h-full bg-white shadow-2xl p-4 flex flex-col animate-in slide-in-from-left-full">
            <div className="flex items-center justify-between border-b pb-4 mb-2">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
