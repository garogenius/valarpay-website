"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export interface Testimonial {
  id: string;
  profileImage: string;
  name: string;
  review: string;
  rating: number;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Only auto-slide on mobile screens
    const intervalId = setInterval(() => {
      if (window.innerWidth >= 768) return; // Check if mobile
      
      const slider = sliderRef.current;
      if (!slider) return;

      // Reset to start if at the end, else scroll right
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 3500);

    return () => clearInterval(intervalId);
  }, []);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="relative group w-full mt-12 md:mt-16">
      {/* Navigation Buttons (Desktop) */}
      <button 
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white hover:bg-gray-50 border border-gray-200 rounded-full items-center justify-center shadow-lg text-[#FF5E00] transition-all opacity-0 group-hover:opacity-100 hover:scale-105"
        aria-label="Scroll Left"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white hover:bg-gray-50 border border-gray-200 rounded-full items-center justify-center shadow-lg text-[#FF5E00] transition-all opacity-0 group-hover:opacity-100 hover:scale-105"
        aria-label="Scroll Right"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slider Container */}
      <div 
        ref={sliderRef}
        className="w-full flex flex-row gap-6 pb-8 pt-4 overflow-x-auto snap-x snap-mandatory px-4 md:px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
      >
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id}
            className="flex-shrink-0 w-[300px] md:w-[350px] snap-center bg-[#0A192F] rounded-[24px] p-8 flex flex-col justify-between shadow-xl border border-blue-900/30 hover:border-[#1D9BF0]/50 transition-colors"
          >
            {/* Top: Rating & Review */}
            <div>
              <div className="flex items-center gap-1 mb-6 text-[#FFC107]">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < testimonial.rating ? "currentColor" : "none"} 
                    className={i < testimonial.rating ? "text-[#FFC107]" : "text-gray-600"} 
                  />
                ))}
              </div>
              <p className="text-blue-50/90 text-[15px] leading-relaxed line-clamp-4 italic mb-8">
                &quot;{testimonial.review}&quot;
              </p>
            </div>
            
            {/* Bottom: User Info */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-blue-900/50 flex-shrink-0 border-2 border-white/10">
                {testimonial.profileImage ? (
                  <img 
                    src={testimonial.profileImage} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-[15px]">{testimonial.name}</span>
                <span className="text-blue-300/70 text-[12px]">ValarPay Customer</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
