"use client";

import React, { useState, useEffect } from 'react';

interface HeroSliderProps {
  slides: React.ReactNode[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden bg-[#FAFAFA]">
      
      {/* Slides Container */}
      <div className="relative w-full h-[750px] md:h-[700px] lg:h-[750px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-[20px] left-1/2 transform -translate-x-1/2 flex items-center gap-[8px] z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex 
                ? 'w-[12px] h-[12px] bg-[#FF5E00]' 
                : 'w-[10px] h-[10px] bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
