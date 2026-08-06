"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FaqAccordion() {
  const faqs = [
    {
      q: "What is ValarPay?",
      a: "Experience seamless financial transactions with ValarPay, a leading financial service provider locally and globally. We make banking easy and convenient by allowing you to pay for multiple services in one place, access financial tools, and even earn through our agent program."
    },
    {
      q: "How can I download the ValarPay app?",
      a: "You can download the ValarPay app directly from the Google Play Store for Android devices, or the Apple App Store for iOS devices. Simply search for 'ValarPay' and hit install to get started."
    },
    {
      q: "Is ValarPay secure?",
      a: "Yes, security is our top priority. ValarPay utilizes bank-grade encryption, two-factor authentication, and continuous monitoring to ensure your money and personal data are always protected."
    },
    {
      q: "How do I create a ValarPay account?",
      a: "Creating an account is simple. Download the app, click on 'Sign Up', provide your basic details such as name, phone number, and email, and verify your identity to start transacting."
    },
    {
      q: "I forgot my password. How do I reset it?",
      a: "On the login screen, click 'Forgot Password'. You will be prompted to enter your registered email or phone number. We will send you a secure link or OTP to reset your password immediately."
    },
    {
      q: "What bills can I pay using ValarPay?",
      a: "You can pay for a wide range of services including electricity, internet and data subscriptions, cable TV (DSTV, GOTV), water bills, and more directly from your ValarPay wallet."
    },
    {
      q: "What are virtual cards?",
      a: "Virtual cards are digital credit or debit cards that you can use for online shopping without exposing your primary bank account details. They function exactly like physical cards but live entirely within the ValarPay app."
    },
    {
      q: "How do I create a virtual card?",
      a: "Log into your ValarPay app, navigate to the 'Cards' section, and tap 'Create New Virtual Card'. You can fund it directly from your main wallet and start using it for online purchases instantly."
    }
  ];

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
                    {faq.q}
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
                        {faq.a}
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
