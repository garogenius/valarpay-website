import React from 'react';
import Image from 'next/image';

export default function CareersHero() {
  return (
    <section className="w-full bg-[#F9FAFB] pt-12 pb-24 md:py-32 flex justify-center border-b border-gray-200 font-poppins">
      <div className="w-full max-w-[1440px] mx-auto px-[24px] md:px-[60px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Text */}
        <div className="flex flex-col items-start text-left">
          <span className="bg-[#FF5E00]/10 text-[#FF5E00] px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-wider mb-6">
            Join Our Team
          </span>
          <h1 className="text-[32px] md:text-[56px] lg:text-[64px] font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Build the Future of <span className="text-[#1D9BF0]">Global Finance</span>
          </h1>
          <p className="text-gray-600 text-[18px] md:text-[20px] leading-relaxed mb-8 max-w-lg">
            At ValarPay, we are on a mission to democratize financial access. We are looking for passionate, driven individuals to help us build borderless financial infrastructure.
          </p>
          <a href="#open-positions" className="bg-[#FF5E00] hover:bg-[#E05200] text-white font-medium px-8 py-4 rounded-full transition-colors shadow-lg hover:shadow-xl">
            View Open Positions
          </a>
        </div>

        {/* Right Side: Image */}
        <div className="relative w-full h-[400px] lg:h-[550px] rounded-[32px] overflow-hidden shadow-2xl">
          <Image 
            src="/images/careers-hero.png" 
            alt="ValarPay Team" 
            fill 
            className="object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
}
