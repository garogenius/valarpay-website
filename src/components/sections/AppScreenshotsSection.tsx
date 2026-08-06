import React from 'react';
import Image from 'next/image';

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
  return (
    <section className="w-full bg-[#FF5E00] pt-16 md:pt-24 pb-16 md:pb-24">
      <div className="max-w-[1600px] mx-auto flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col items-start px-4 sm:px-6 lg:px-12 mb-8 md:mb-12">
          <h2 className="text-white text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-tight mb-1 md:mb-2 pr-4 md:pr-0">
            Beautiful, Simple and Powerful
          </h2>
          <p className="text-white/90 text-[16px] md:text-[20px] lg:text-[24px]">
            Beautiful, Simple and Powerful
          </p>
        </div>

        {/* White Container & Image Slider */}
        <div className="w-full md:px-6 lg:px-12">
          <div className="w-full bg-white md:rounded-[40px] py-8 md:p-6 lg:p-10 xl:p-12 overflow-hidden shadow-sm">
            <div className="w-full flex flex-row gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory px-4 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth">
              {images.map((src, index) => (
                <div 
                  key={index} 
                  className="relative flex-shrink-0 w-[140px] sm:w-[180px] md:w-[160px] lg:w-[180px] xl:w-[200px] aspect-[9/19] snap-center"
                >
                  <Image 
                    src={src}
                    alt={`App screenshot ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
