import React from 'react';
import Image from 'next/image';

const features = [
  {
    title: 'Personal account',
    description: 'Open a personal account with ValarPay to manage your finances',
    image: '/images/services/personal.png',
  },
  {
    title: 'Business account',
    description: 'Take your business to the next level with a business account from ValarPay.',
    image: '/images/services/business.png',
  },
  {
    title: 'Investments',
    description: 'Grow your wealth with our flexible and secure investment plans tailored for your goals.',
    image: '/images/services/investments.png',
  },
  {
    title: 'Multicurrency account',
    description: 'Manage and spend your money globally in multiple currencies seamlessly.',
    image: '/images/services/multicurrency.png',
    mobileOnly: true,
  },
];

export default function GrowthSection() {
  return (
    <section className="w-full bg-[#FF5E00] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6 md:gap-12">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-12 w-full">
          <h2 className="text-white text-[18px] min-[400px]:text-[22px] sm:text-[24px] md:text-[36px] lg:text-[42px] font-bold leading-tight md:w-1/2">
            <span className="whitespace-nowrap">Banking designed for personal</span><br />
            <span className="whitespace-nowrap">and business growth</span>
          </h2>
          
          <div className="flex flex-col gap-4 md:w-5/12 lg:w-1/3">
            <div className="w-[60px] md:w-[80px] h-[2px] bg-white" />
            <p className="text-white text-[12px] min-[400px]:text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed">
              Providing financial solutions that empower both business and individuals to thrive and achieve remarkable growth milestones.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16 md:gap-x-6 md:gap-y-20 lg:gap-8 pt-4 md:pt-8">
          {features.map((feature, index) => (
            <div key={index} className={`bg-white rounded-[16px] md:rounded-[24px] p-4 md:p-8 flex-col items-start relative mt-8 md:mt-12 lg:mt-16 ${feature.mobileOnly ? 'flex md:hidden' : 'flex'}`}>
              
              {/* Overlapping Image Container */}
              <div className="absolute top-[-40px] md:top-[-60px] left-4 md:left-8 w-[80px] h-[80px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] rounded-[16px] md:rounded-[24px] border-4 border-[#0033A0] overflow-hidden bg-white z-10 shadow-lg">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card Content Spacer */}
              <div className="h-[40px] md:h-[60px] lg:h-[80px] w-full" />
              
              {/* Card Text */}
              <div className="mt-2 md:mt-4 flex flex-col gap-2 md:gap-4 w-full">
                <h3 className="text-[#FF5E00] text-[16px] md:text-[22px] lg:text-[24px] font-bold leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[#111827] text-[12px] md:text-[14px] lg:text-[16px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
