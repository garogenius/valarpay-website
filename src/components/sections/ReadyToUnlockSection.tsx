import React from 'react';
import Image from 'next/image';

export default function ReadyToUnlockSection() {
  return (
    <section className="w-full relative overflow-hidden bg-white">
      
      {/* Desktop Blue Band Background */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-[400px] lg:h-[500px] bg-[#0C1998] transform -translate-y-1/2 z-0" />
      
      {/* Mobile Blue Background (Full) */}
      <div className="block md:hidden absolute top-0 left-0 w-full h-full bg-[#0C1998] z-0" />

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center relative z-10 pt-8 md:pt-12 pb-8 md:pb-12">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start gap-6 md:gap-8 pt-4 md:pt-0">
          <h2 className="text-white text-[32px] sm:text-[40px] md:text-[44px] lg:text-[56px] font-bold leading-[1.1] max-w-[500px]">
            Ready to Unlock Your Financial Potential?
          </h2>
          <button className="bg-[#FF5E00] hover:bg-[#E05200] transition-colors text-white text-[15px] lg:text-[16px] font-medium px-6 lg:px-8 py-3.5 rounded-[12px] shadow-sm">
            Open ValarPay Instantly
          </button>
          <p className="text-white/90 text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed max-w-[450px]">
            Take charge of your finances with ValarPay. Join today and experience a smarter, simpler way to manage your money like never before.
          </p>
        </div>

        {/* Images */}
        <div className="w-full md:w-1/2 relative flex justify-center md:justify-end">
          
          {/* Mobile Image */}
          <div className="block md:hidden relative w-full max-w-[400px] aspect-[1/2] mt-10 mb-8">
            <Image 
              src="/images/ready-mobile.png" 
              alt="Unlock your financial potential" 
              fill 
              className="object-contain"
            />
          </div>

          {/* Desktop Image */}
          <div className="hidden md:block relative w-[120%] h-[500px] lg:h-[650px] xl:h-[750px] right-[-10%] lg:right-[-5%] xl:right-[-2%]">
            <Image 
              src="/images/ready.png" 
              alt="Unlock your financial potential" 
              fill 
              className="object-contain object-right lg:object-center"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
