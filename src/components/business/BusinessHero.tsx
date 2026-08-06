import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BusinessHero() {
  return (
    <section className="w-full bg-[#081220] pt-12 pb-24 md:pt-16 md:pb-32 flex justify-center overflow-hidden font-poppins relative">
      {/* Background glow effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#1D9BF0] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#FF5E00] rounded-full blur-[180px] opacity-10 pointer-events-none"></div>
      
      <div className="w-full max-w-[1440px] mx-auto px-[24px] md:px-[60px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Side: Text */}
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-[#FF5E00]"></span>
            <span className="text-[#FF5E00] font-bold tracking-widest uppercase text-[12px] md:text-[14px]">
              ValarPay for Business
            </span>
          </div>
          
          <h1 className="text-[26px] md:text-[56px] lg:text-[72px] font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Power Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E00] to-[#FF9040]">Enterprise</span>
          </h1>
          
          <p className="text-blue-100/70 text-[18px] md:text-[22px] leading-relaxed mb-10 max-w-lg font-light">
            Scale seamlessly with borderless corporate accounts, automated payroll, and robust API infrastructure built for modern global businesses.
          </p>
          
          <div className="flex flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
            <Link href="/contact" className="flex-1 md:flex-none whitespace-nowrap bg-[#FF5E00] hover:bg-[#E05200] text-white font-medium px-4 py-3 md:px-8 md:py-4 rounded-full text-[12px] md:text-[16px] transition-all shadow-[0_0_20px_rgba(255,94,0,0.3)] hover:shadow-[0_0_30px_rgba(255,94,0,0.5)] text-center">
              Open Account
            </Link>
            <Link href="/contact" className="flex-1 md:flex-none whitespace-nowrap bg-transparent border-2 border-blue-900/50 hover:border-[#1D9BF0] text-white font-medium px-4 py-3 md:px-8 md:py-4 rounded-full text-[12px] md:text-[16px] transition-colors text-center">
              Contact Sales
            </Link>
          </div>
        </div>

        {/* Right Side: Image/Dashboard Mockup */}
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[650px] rounded-[24px] overflow-visible perspective-[1000px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent rounded-[24px] transform lg:rotate-y-[-10deg] lg:rotate-x-[5deg] transition-transform duration-700 hover:rotate-0">
            <Image 
              src="/images/business-dashboard.png" 
              alt="ValarPay Business Dashboard" 
              fill 
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
