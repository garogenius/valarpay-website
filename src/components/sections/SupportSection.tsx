import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Greg Max',
    rating: 5,
    text: 'ValarPay makes managing my finances effortless, with transparency and support I can always count on.',
    avatar: '/images/testimonials/avatar1.png',
    position: 'top-[-80px] xl:top-[-120px] right-0 transform translate-x-[40%] xl:translate-x-[50%]',
  },
  {
    name: 'Welton Chris',
    rating: 4.5,
    text: 'Switching to ValarPay was the best decision - no hidden fees and support whenever I need it!',
    avatar: '/images/testimonials/avatar2.png',
    position: 'top-1/2 right-0 transform translate-x-[10%] xl:translate-x-[15%] -translate-y-1/2',
  },
  {
    name: 'Charl Femi',
    rating: 4,
    text: 'ValarPay has completely changed the way I bank - transparent fees, seamless access to my funds.',
    avatar: '/images/testimonials/avatar3.png',
    position: 'bottom-[-80px] xl:bottom-[-120px] right-0 transform translate-x-[40%] xl:translate-x-[50%]',
  }
];

export default function SupportSection() {
  return (
    <section className="w-full bg-[#FF5E00] py-16 md:py-32 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* White Container */}
        <div className="bg-white rounded-[24px] md:rounded-[40px] p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative w-full">
          
          {/* Left Graphic */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[280px] xl:max-w-[320px] aspect-square">
              <Image 
                src="/images/help.png" 
                alt="24/7 Customer Support" 
                fill 
                className="object-contain"
              />
            </div>
          </div>

          {/* Middle Text */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left gap-2 md:gap-4 z-10">
            <h2 className="text-[#FF5E00] text-[64px] sm:text-[80px] md:text-[96px] lg:text-[120px] font-bold leading-none tracking-tight">
              24/7
            </h2>
            <h3 className="text-[#111827] text-[24px] sm:text-[32px] md:text-[36px] font-bold leading-tight max-w-[300px] mx-auto lg:mx-0">
              Access to funds and customer support.
            </h3>
            <p className="text-[#4B5563] text-[14px] md:text-[16px] leading-relaxed max-w-[350px] mx-auto lg:mx-0 mt-2">
              Enjoy Round-the-Clock Access to Your Funds and Dedicated Customer Support Anytime, Anywhere.
            </p>
          </div>

          {/* Right Testimonials (Desktop Only) */}
          <div className="hidden lg:block lg:w-1/3 relative h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`absolute ${testimonial.position} w-[320px] bg-white rounded-[16px] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-3 z-20`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                      <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#111827] font-bold text-[16px]">{testimonial.name}</span>
                      <div className="flex items-center gap-[2px]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className={`w-3 h-3 ${star <= testimonial.rating ? 'text-[#FF5E00]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Quote Icon */}
                  <div className="text-gray-100">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
                <p className="text-[#4B5563] text-[12px] leading-relaxed">
                  {testimonial.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
