import React from 'react';
import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="w-full relative bg-[#1E1E1E] flex flex-col items-center justify-center py-32 md:py-48 overflow-hidden">
      {/* Top Orange Band */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[#FF5E00] z-20"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/about-hero-bg.png"
          alt="ValarPay Credit Card Background"
          fill
          className="object-cover opacity-40"
        />
      </div>

      {/* Optional Gradient Overlay for texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40 pointer-events-none z-10"></div>

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-[#FF5E00] text-[40px] md:text-[64px] font-bold leading-tight mb-4">
          About ValarPay
        </h1>
        <p className="text-white text-[16px] md:text-[20px] font-light tracking-wide max-w-2xl">
          Learn who we are, our mission, vision and the story behind ValarPay.
        </p>
      </div>
    </section>
  );
}
