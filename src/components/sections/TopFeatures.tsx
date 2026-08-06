import React from 'react';
import Image from 'next/image';
import { Radio, ArrowDownUp, Globe, PiggyBank, ArrowRightLeft, CreditCard, Plane, Heart } from 'lucide-react';

const featuresList = [
  {
    title: 'Airtime Top Ups',
    description: 'Top up your mobile phone with airtime from your favorite network service providers locally and internationally',
    icon: <Radio className="w-5 h-5 text-[#FF5E00]" />,
  },
  {
    title: 'Mobile Data Top Up',
    description: 'Top up your mobile devices with your favorite internet subscription plans from all internet network providers',
    icon: <ArrowDownUp className="w-5 h-5 text-[#FF5E00]" />,
  },
  {
    title: 'Internets',
    description: 'Pay for internet subscriptions from internet routers and network internet cables like Smile, Swift, Mobitel etc',
    icon: <Globe className="w-5 h-5 text-[#FF5E00]" />,
  },
  {
    title: 'Savings & Investments',
    description: 'Create savings goals and track your progress. Earn attractive interest rates on your savings, and Manage your inve...',
    icon: <PiggyBank className="w-5 h-5 text-[#FF5E00]" />,
  },
  {
    title: 'Instant Transfers',
    description: 'Send money to friends and family instantly to any bank or physically through cash pickups. Receive funds qu...',
    icon: <ArrowRightLeft className="w-5 h-5 text-[#FF5E00]" />,
  },
  {
    title: 'Instant Virtual Cards',
    description: 'Create Naira and USD virtual cards for secure online shopping. Set spending limits and track your expenses effortles...',
    icon: <CreditCard className="w-5 h-5 text-[#FF5E00]" />,
  },
  {
    title: 'Flight/Bus Tickets',
    description: 'Book bus tickets for intercity travel within Nigeria. Book domestic and international flights at competitive rates.',
    icon: <Plane className="w-5 h-5 text-[#FF5E00]" />,
  },
  {
    title: 'Healthcare & Insurance',
    description: 'Access healthcare services and purchase insurance plans. Find the best options for your health and insurance n...',
    icon: <Heart className="w-5 h-5 text-[#FF5E00]" />,
  },
];

export default function TopFeatures() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-10 md:gap-16">
        
        {/* Header */}
        <div className="flex flex-col items-start w-full max-w-4xl">
          <span className="text-[#FF5E00] text-[12px] md:text-[14px] font-bold uppercase tracking-wider mb-2 md:mb-4">
            TOP FEATURES
          </span>
          <h2 className="text-[#111827] text-[18px] sm:text-[24px] md:text-[36px] lg:text-[42px] font-bold leading-tight">
            Pay all your bills at once with ValarPay without leaving your home.
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-8 w-full">
          
          {/* Features Grid */}
          <div className="w-full lg:w-[60%] grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {featuresList.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col gap-3 md:gap-4 p-3 md:p-6 bg-white rounded-[12px] md:rounded-[16px] border border-[#FF5E00]/40 shadow-[0_4px_20px_rgba(255,94,0,0.05)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <h3 className="text-[#111827] text-[12px] md:text-[16px] font-bold leading-tight">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-[#4B5563] text-[10px] md:text-[13px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[40%] flex justify-center lg:justify-end items-center relative mt-8 lg:mt-0">
            <div className="relative w-full max-w-[450px] lg:max-w-[600px] aspect-[4/5]">
              <Image 
                src="/images/mobile.png" 
                alt="ValarPay Mobile App Features" 
                fill 
                className="object-contain object-center lg:object-right"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
