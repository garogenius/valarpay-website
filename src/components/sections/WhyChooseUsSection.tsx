import React from 'react';
import Image from 'next/image';
import { Clock, Store, ShieldCheck, Headset } from 'lucide-react';

const features = [
  {
    number: '01',
    title: 'Fast Transactions',
    description: 'ValarPay offers a one-stop solution for all your financial needs. our platform is designed to simplify your financial life.',
    icon: <Clock className="w-8 h-8 md:w-10 md:h-10 text-black" strokeWidth={1.5} />,
  },
  {
    number: '02',
    title: 'Convenience',
    description: 'With ValarPay, you can manage your finances anytime, anywhere by eliminating the need to visit a bank or service provider.',
    icon: <Store className="w-8 h-8 md:w-10 md:h-10 text-black" strokeWidth={1.5} />,
  },
  {
    number: '03',
    title: 'Security',
    description: 'We prioritize the security of your financial information, by employing advanced encryption and fraud detection technologies...',
    icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-black" strokeWidth={1.5} />,
  },
  {
    number: '04',
    title: 'Customer Support',
    description: 'Our dedicated support team is always ready to help. Whether you have a question about a transaction or need assistance w...',
    icon: <Headset className="w-8 h-8 md:w-10 md:h-10 text-black" strokeWidth={1.5} />,
  }
];

export default function WhyChooseUsSection() {
  return (
    <section className="w-full bg-[#F9FAFB] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6 md:gap-8">
        
        {/* Header */}
        <div className="flex flex-col items-start w-full">
          <span className="text-[#FF5E00] text-[12px] md:text-[14px] font-bold uppercase tracking-wider mb-2">
            WHY CHOOSE US
          </span>
          <h2 className="text-[#111827] text-[28px] sm:text-[36px] md:text-[48px] font-bold leading-tight">
            Why Choose ValarPay?
          </h2>
        </div>

        {/* Features Grid in White Card */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 lg:p-12 shadow-sm w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0 w-full">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-start gap-4 px-4 sm:px-6 lg:px-8 ${
                  index % 2 !== 0 ? 'border-l border-gray-200' : ''
                } ${
                  index > 0 && index % 2 === 0 ? 'lg:border-l lg:border-gray-200' : ''
                }`}
              >
                {/* Icon & Number Wrapper */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-start mb-2 z-0">
                  <span className="absolute left-0 text-[#FFF0E6] text-[64px] md:text-[80px] font-black leading-none z-0 select-none">
                    {feature.number}
                  </span>
                  <div className="relative z-10 pl-4 md:pl-6 pt-2 md:pt-4">
                    {feature.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-[#FF5E00] text-[16px] md:text-[20px] font-bold leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[#4B5563] text-[12px] md:text-[14px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Large Image */}
        <div className="w-full relative aspect-[4/3] md:aspect-[21/9] rounded-[24px] overflow-hidden shadow-sm mt-2 md:mt-4">
          <Image 
            src="/images/why-us.png" 
            alt="Why Choose ValarPay" 
            fill 
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}
