import React from 'react';
import Image from 'next/image';

export default function ProviderListSection() {
  return (
    <section className="w-full flex flex-col md:bg-[#07135C]">
      
      {/* Mobile Header (White Background) */}
      <div className="md:hidden w-full bg-white px-4 sm:px-6 py-12 flex flex-col gap-5 overflow-hidden">
        <h2 className="text-[#111827] text-[20px] min-[400px]:text-[24px] sm:text-[28px] font-bold leading-tight whitespace-nowrap">
          With Over 60 Service Provider
        </h2>
        <div className="w-[80px] h-[3px] bg-[#111827]" />
        <p className="text-[#4B5563] text-[15px] sm:text-[16px] leading-relaxed pr-4">
          Valarpay is more than just a financial service provider; we are a community dedicated to improving financial well-being
        </p>
      </div>

      {/* Desktop Header (Blue Background) */}
      <div className="hidden md:flex max-w-[1400px] mx-auto w-full px-6 lg:px-8 pt-12 pb-6 justify-between items-center gap-12">
        <h2 className="text-white text-[24px] lg:text-[36px] xl:text-[42px] font-bold leading-tight w-1/2 whitespace-nowrap">
          With Over 60 Service Provider
        </h2>
        <div className="w-1/2 flex justify-end">
          <p className="text-white/90 text-[14px] lg:text-[16px] leading-relaxed text-right max-w-[450px]">
            Valarpay is more than just a financial service provider; we are a community dedicated to improving financial well-being
          </p>
        </div>
      </div>

      {/* Image Container */}
      <div className="w-full bg-[#07135C] px-4 sm:px-6 md:px-8 pb-8 md:pb-12 pt-4 md:pt-0">
        <div className="max-w-[1400px] mx-auto w-full flex justify-center">
          
          {/* Mobile Image */}
          <div className="block md:hidden relative w-full max-w-[400px] aspect-[3/4]">
            <Image 
              src="/images/provider-mobile.png" 
              alt="60+ Service Providers" 
              fill 
              className="object-contain"
            />
          </div>

          {/* Desktop Image */}
          <div className="hidden md:block relative w-full aspect-[3/1] lg:aspect-[4/1]">
            <Image 
              src="/images/providers.png" 
              alt="60+ Service Providers" 
              fill 
              className="object-contain"
            />
          </div>

        </div>
      </div>

    </section>
  );
}
