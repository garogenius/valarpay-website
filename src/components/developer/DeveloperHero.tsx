import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DeveloperHero() {
  return (
    <section className="w-full relative bg-[#1E1E1E] flex flex-col items-center justify-center py-20 md:py-48 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/developer-hero-bg.png"
          alt="Build with ValarPay APIs"
          fill
          className="object-cover opacity-30"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/20 pointer-events-none z-10"></div>

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto w-full">
        <h2 className="text-white text-[14px] md:text-[28px] font-medium tracking-wide mb-3 md:mb-4 uppercase tracking-[2px] md:normal-case md:tracking-wide">
          Developers
        </h2>
        <h1 className="text-[#FF5E00] text-[26px] md:text-[64px] lg:text-[72px] font-bold leading-[1.2] mb-6 md:mb-8 tracking-tight px-2">
          Build with ValarPay APIs
        </h1>
        
        <div className="flex flex-row items-center justify-center gap-2 md:gap-4 w-full sm:w-auto px-2 sm:px-0">
          <Link href="/developer" className="w-1/2 sm:w-auto bg-[#FF5E00] hover:bg-[#E05200] text-white font-medium py-2 md:py-3 px-2 md:px-8 rounded-[8px] transition-colors text-[12px] md:text-[16px] text-center whitespace-nowrap">
            Documentation
          </Link>
          <Link href="/developer/reference" className="w-1/2 sm:w-auto bg-transparent border border-white text-white hover:bg-white/10 font-medium py-2 md:py-3 px-2 md:px-8 rounded-[8px] transition-colors text-[12px] md:text-[16px] text-center whitespace-nowrap">
            API References
          </Link>
        </div>
      </div>
    </section>
  );
}
