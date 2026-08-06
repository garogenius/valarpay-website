import React from 'react';
import Image from 'next/image';

export default function BusinessAnalyticsSection() {
  return (
    <section className="w-full bg-[#081220] py-24 md:py-32 flex justify-center overflow-hidden font-poppins border-t border-blue-900/20">
      <div className="w-full max-w-[1440px] mx-auto px-[24px] md:px-[60px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Graphic */}
        <div className="relative w-full h-[350px] md:h-[500px] rounded-[32px] overflow-hidden order-2 lg:order-1">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent z-10 rounded-[32px]"></div>
          <Image 
            src="/images/business-analytics.png" 
            alt="Financial Data Analytics" 
            fill 
            className="object-cover"
          />
        </div>

        {/* Right Side: Text */}
        <div className="flex flex-col items-start text-left order-1 lg:order-2">
          <span className="text-[#FF5E00] font-bold uppercase tracking-widest text-[13px] mb-4">
            Advanced Analytics
          </span>
          <h2 className="text-[32px] md:text-[48px] font-bold text-white leading-tight mb-6">
            Take Control of Your <br /> Financial Data.
          </h2>
          <p className="text-blue-100/70 text-[18px] leading-relaxed mb-8">
            Stop guessing about your cash flow. ValarPay Business provides real-time, granular insights into your revenue, expenses, and international transfers across all currencies.
          </p>
          
          <ul className="flex flex-col gap-5 mb-10 w-full">
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#1D9BF0]/20 flex items-center justify-center shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-[#1D9BF0]"></div>
              </div>
              <div>
                <strong className="text-white block mb-1">Real-time Reconciliation</strong>
                <span className="text-blue-100/60 text-[14px]">Automatically map incoming transfers to invoices instantly.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#FF5E00]/20 flex items-center justify-center shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-[#FF5E00]"></div>
              </div>
              <div>
                <strong className="text-white block mb-1">Custom Reporting</strong>
                <span className="text-blue-100/60 text-[14px]">Export CSV/PDF reports tailored to your accounting software (Xero, QuickBooks).</span>
              </div>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
}
