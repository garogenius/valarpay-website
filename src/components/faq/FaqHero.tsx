import React from 'react';
import Image from 'next/image';

export default function FaqHero() {
  return (
    <section className="w-full relative bg-[#1E1E1E] flex flex-col items-center justify-center py-32 md:py-48 overflow-hidden border-b-4 border-blue-500">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/faq-hero-bg.png"
          alt="FAQ Background"
          fill
          className="object-cover opacity-50"
        />
      </div>

      {/* Gradient Overlay for extra text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/20 pointer-events-none z-10"></div>

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-[#FF5E00] text-[36px] md:text-[56px] lg:text-[64px] font-bold leading-tight mb-4 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-white text-[15px] md:text-[18px] lg:text-[20px] font-light tracking-wide max-w-2xl">
          See some of the frequently asked questions from our customers about our services
        </p>
      </div>
    </section>
  );
}
