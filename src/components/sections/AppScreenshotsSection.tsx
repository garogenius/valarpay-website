"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const images = [
  '/images/mobile/1.png',
  '/images/mobile/2.png',
  '/images/mobile/3.png',
  '/images/mobile/4.png',
  '/images/mobile/5.png',
  '/images/mobile/6.png',
  '/images/mobile/7.png',
];

export default function AppScreenshotsSection() {
  const [showModal, setShowModal] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check local storage to see if user already accepted/rejected
    const consent = localStorage.getItem('valarpay_terms_consent');
    if (!consent) {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const intervalId = setInterval(() => {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('valarpay_terms_consent', 'accepted');
    setShowModal(false);
  };

  const handleReject = () => {
    localStorage.setItem('valarpay_terms_consent', 'rejected');
    setShowModal(false);
  };

  const handleRemindLater = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className="w-full bg-[#FF5E00] pt-16 md:pt-24 pb-16 md:pb-24 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto flex flex-col relative">
          
          {/* Header */}
          <div className="flex flex-col items-start px-4 sm:px-6 lg:px-12 mb-8 md:mb-12">
            <h2 className="text-white text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-tight mb-1 md:mb-2 pr-4 md:pr-0">
              Beautiful, Simple and Powerful
            </h2>
            <p className="text-white/90 text-[16px] md:text-[20px] lg:text-[24px]">
              Experience financial freedom with our intuitive app design.
            </p>
          </div>

          {/* White Container & Image Slider */}
          <div className="w-full md:px-6 lg:px-12 relative group">
            
            {/* Desktop Navigation Buttons */}
            <button 
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white hover:bg-gray-50 rounded-full items-center justify-center shadow-xl text-[#FF5E00] transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>
            
            <button 
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white hover:bg-gray-50 rounded-full items-center justify-center shadow-xl text-[#FF5E00] transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Scroll Right"
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>

            <div className="w-full bg-white md:rounded-[40px] py-8 md:p-6 lg:p-10 xl:p-12 shadow-lg">
              <div 
                ref={sliderRef}
                className="w-full flex flex-row gap-4 lg:gap-8 overflow-x-auto snap-x snap-mandatory px-4 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
              >
                {images.map((src, index) => (
                  <div 
                    key={index} 
                    className="relative flex-shrink-0 w-[140px] sm:w-[180px] md:w-[160px] lg:w-[200px] xl:w-[220px] aspect-[9/19] snap-center hover:scale-[1.02] transition-transform duration-300"
                  >
                    <Image 
                      src={src}
                      alt={`App screenshot ${index + 1}`}
                      fill
                      className="object-contain drop-shadow-xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Terms & Conditions Modal (Bottom fixed) */}
      {showModal && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center pointer-events-none">
          <div className="bg-white w-full max-w-6xl rounded-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border border-gray-200 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 pointer-events-auto relative">
            
            <div className="flex-1 pr-6 md:pr-0">
              <h3 className="text-gray-900 text-[18px] md:text-[22px] font-bold mb-2">
                Terms and Conditions Agreement
              </h3>
              <p className="text-gray-600 text-[13px] md:text-[15px] leading-relaxed">
                By continuing to use our application and website, you agree to our updated Terms and Conditions, Privacy Policy, and our use of cookies to enhance your experience, analyze site traffic, and deliver personalized content.
              </p>
            </div>

            <div className="flex flex-row flex-wrap md:flex-nowrap gap-3 w-full md:w-auto shrink-0 justify-end">
              <button 
                onClick={handleReject}
                className="flex-1 md:flex-none px-6 py-3 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-800 text-[14px] font-medium transition-all"
              >
                Reject
              </button>
              <button 
                onClick={handleRemindLater}
                className="flex-1 md:flex-none px-6 py-3 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-800 text-[14px] font-medium transition-all whitespace-nowrap"
              >
                Remind Later
              </button>
              <button 
                onClick={handleAccept}
                className="flex-1 md:flex-none px-8 py-3 rounded-full bg-[#FF5E00] hover:bg-[#E05200] hover:scale-105 text-white text-[14px] font-semibold transition-all whitespace-nowrap shadow-lg shadow-[#FF5E00]/20"
              >
                Accept All
              </button>
            </div>
            
            {/* Close button for mobile top-right */}
            <button 
              onClick={handleReject}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 md:hidden transition-colors"
            >
              <X size={20} />
            </button>

          </div>
        </div>
      )}
    </>
  );
}
