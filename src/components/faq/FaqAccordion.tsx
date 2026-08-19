"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs?: FaqItem[];
}

export default function FaqAccordion({ faqs = [] }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#F4F4F4] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
          
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx} 
                onClick={() => toggleFaq(idx)}
                className={`w-full rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden
                  ${isOpen ? 'bg-[#FCECE3] shadow-md' : 'bg-[#FF5E00] hover:bg-[#E05200] shadow-sm'}`}
              >
                {/* Header (Question) */}
                <div className={`flex items-center justify-between p-6 md:p-8 ${isOpen ? 'pb-2' : ''}`}>
                  <h3 className={`font-semibold text-[15px] md:text-[18px] pr-4 ${isOpen ? 'text-black' : 'text-white'}`}>
                    {faq.question}
                  </h3>
                  
                  {/* Icon Box */}
                  <div className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-[6px] transition-colors ${
                    isOpen ? 'bg-black text-white' : 'bg-white text-[#FF5E00]'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4" strokeWidth={3} />
                    ) : (
                      <Plus className="w-4 h-4" strokeWidth={3} />
                    )}
                  </div>
                </div>

                {/* Body (Answer) */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2">
                      <p className="text-gray-800 text-[13px] md:text-[15px] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
