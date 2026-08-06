import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, TrendingUp } from 'lucide-react';

export default function EurHeroSection() {
  return (
    <section className="relative w-full px-[24px] mx-auto pt-[20px] pb-[40px] md:pb-[0px] flex flex-col md:flex-row items-center md:items-start justify-between gap-[24px] md:gap-[20px] overflow-hidden bg-[#FAFAFA]">
      
      {/* Text & Button Column */}
      <div className="flex flex-col items-start gap-[24px] md:gap-[40px] w-full md:w-1/2 z-10 md:pl-[60px] lg:pl-[100px] md:pt-[40px]">
        
        {/* Text Block */}
        <div className="flex flex-col items-start gap-[12px] w-full">
          <span className="font-outfit font-semibold text-[12px] md:text-[16px] text-[#709A11] uppercase tracking-wide">
            EURO ACCOUNT
          </span>
          <h1 className="font-urbanist font-bold text-[26px] sm:text-[32px] md:text-[72px] leading-[1.1] text-black">
            <span className="whitespace-nowrap">
              A <span className="relative inline-block z-10">
                Smarter Way to
                {/* Hand-drawn style underline */}
                <svg className="absolute w-[110%] md:w-[120%] h-[15px] md:h-[25px] -bottom-[8px] md:-bottom-[15px] left-[-2%] text-[#709A11] -z-10" viewBox="0 0 300 20" preserveAspectRatio="none">
                   <path d="M5,10 Q100,20 150,10 T295,15" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </span><br />
            Hold Euros.
          </h1>
          <p className="font-outfit text-[14px] md:text-[20px] text-[#4D525F] leading-[1.5] max-w-[500px] mt-2">
            ValarPay Is An Innovative Banking Solutions For Future And Beyond
          </p>
        </div>

        {/* Buttons & Features block */}
        <div className="flex flex-col items-start gap-[12px] md:gap-[16px]">
          
          {/* Download Buttons */}
          <div className="flex flex-row items-start gap-[12px]">
            {/* Apple Store Button */}
            <Link href="https://apps.apple.com/us/app/valarpay-local-global-bank/id6755668965" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-[120px] h-[40px] md:w-[150px] md:h-[48px] bg-black rounded-[8px] hover:bg-black/90 transition-colors">
              <svg className="w-[18px] h-[22px] md:w-[22px] md:h-[26px]" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.532 5.093c1.139-1.378 1.907-3.153 1.698-4.943-1.545.062-3.46.1-4.733.154-1.255.053-2.732 1.542-3.565 2.53-.787.935-1.636 2.766-1.393 4.542 1.706.132 3.518-.086 4.67-1.464 1.138-1.365 3.323-.819 3.323-.819zm5.342 6.643c-.024-3.535 2.875-5.228 3.003-5.305-1.637-2.395-4.17-2.721-5.074-2.77-2.158-.217-4.218 1.272-5.313 1.272-1.096 0-2.802-1.242-4.578-1.205-2.302.035-4.425 1.338-5.6 3.38-2.378 4.122-.607 10.222 1.703 13.557 1.132 1.638 2.473 3.473 4.237 3.407 1.716-.067 2.37-.107 4.453-.107 2.083 0 2.664.107 4.453.107 1.838-.035 3.01-1.674 4.11-3.284 1.276-1.868 1.8-3.684 1.826-3.774-.038-.016-3.197-1.226-3.22-4.75z" fill="#FFF"/>
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-[8px] md:text-[10px] font-medium text-white leading-none">Download on the</span>
                <span className="text-[14px] md:text-[18px] font-semibold text-white leading-none">App Store</span>
              </div>
            </Link>
            
            {/* Play Store Button */}
            <Link href="https://play.google.com/store/apps/details?id=com.valarglobal.valarpay&hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-[120px] h-[40px] md:w-[150px] md:h-[48px] bg-black rounded-[8px] hover:bg-black/90 transition-colors">
              <svg className="w-[18px] h-[20px] md:w-[22px] md:h-[24px]" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.385 1.543C.952 2.01.714 2.7.714 3.568v21.864c0 .867.238 1.558.671 2.025L1.51 27.58l13.064-13.06-13.064-13.06-.125.083z" fill="#4285F4"/>
                <path d="M18.878 19.38l-4.304-4.305v-.016L14.57 14.52l4.308-4.305.126.072 5.093 2.894c1.455.826 1.455 2.179 0 3.004l-5.219 3.195z" fill="#FBBC04"/>
                <path d="M14.778 15.06l-13.268 13.27a2.531 2.531 0 0 0 2.53-.16l10.738-6.143 5.485-3.13z" fill="#EA4335"/>
                <path d="M14.778 13.98l5.485-3.13L9.525 4.707a2.531 2.531 0 0 0-2.53-.16L1.51 1.428l13.268 12.552z" fill="#34A853"/>
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-[8px] md:text-[10px] uppercase text-white leading-none">GET IT ON</span>
                <span className="text-[14px] md:text-[18px] font-semibold text-white leading-none">Google Play</span>
              </div>
            </Link>
          </div>

          {/* Features */}
          <div className="flex flex-row items-center gap-[12px]">
            <div className="flex items-center gap-[6px]">
              <CheckCircle2 size={16} className="text-black/60 w-[14px] h-[14px] md:w-[18px] md:h-[18px]" />
              <span className="font-outfit text-[12px] md:text-[14px] text-black/70 font-medium">No Card required</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <CheckCircle2 size={16} className="text-black/60 w-[14px] h-[14px] md:w-[18px] md:h-[18px]" />
              <span className="font-outfit text-[12px] md:text-[14px] text-black/70 font-medium">Fast acceptance</span>
            </div>
          </div>
        </div>

        {/* Licences */}
        <div className="flex flex-row items-center gap-[8px] md:gap-[24px]">
          <div className="flex items-center gap-[4px] md:gap-[6px]">
            <span className="font-figtree text-[11px] md:text-[16px] text-black font-medium whitespace-nowrap">Licenced by CBN</span>
            <div className="w-[30px] h-[20px] md:w-[45px] md:h-[30px] relative">
              <Image src="/images/cbn.png" alt="CBN" fill className="object-contain" />
            </div>
          </div>
          <div className="flex items-center gap-[4px] md:gap-[6px] border-l border-black/20 pl-[8px] md:pl-[24px]">
            <span className="font-figtree text-[11px] md:text-[16px] text-black font-medium whitespace-nowrap">Deposits Insured by</span>
            <div className="w-[45px] h-[20px] md:w-[70px] md:h-[30px] relative">
              <Image src="/images/ndic.png" alt="NDIC" fill className="object-contain" />
            </div>
          </div>
        </div>

      </div>

      {/* Graphic Column */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-center relative">
        
        {/* Main Hero Image Container */}
        <div className="relative w-full max-w-[400px] md:max-w-[650px] aspect-[4/5] md:aspect-[3/4]">
          <Image src="/images/eurhero.png" alt="EUR Hero" fill className="object-contain object-top" priority />
          
          {/* Floating Card: Payment Received */}
          <div className="absolute left-[5%] bottom-[10%] bg-white rounded-[10px] p-[12px] md:p-[16px] flex flex-col gap-[6px] shadow-[0_15px_30px_rgba(0,0,0,0.1)] z-20 w-[140px] md:w-[180px] transform hover:-translate-y-1 transition-transform">
            <div className="flex flex-col gap-[2px]">
              <span className="font-urbanist font-semibold text-[10px] md:text-[12px] text-[#111111]">Payment Received</span>
              <span className="font-urbanist font-bold text-[14px] md:text-[18px] text-[#709A11]">+35,890.00</span>
            </div>
            <div className="flex items-center justify-between w-full mt-1">
              <span className="font-outfit text-[9px] md:text-[11px] text-[#4D525F]">1th Jan, 2024</span>
              <div className="flex items-center gap-[2px]">
                <span className="font-outfit text-[9px] md:text-[11px] font-semibold text-[#37C390]">3.09%</span>
                <TrendingUp size={12} className="text-[#37C390] w-[10px] h-[10px]" />
              </div>
            </div>
          </div>

          {/* Floating Card: Active Users */}
          <div className="absolute right-[-5%] md:right-[5%] top-[50%] bg-white rounded-[10px] p-[10px] md:p-[12px] flex items-center gap-[8px] shadow-[0_15px_30px_rgba(0,0,0,0.1)] z-20 transform hover:-translate-y-1 transition-transform">
            {/* Avatars Overlapping */}
            <div className="flex items-center">
               <div className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] bg-gray-200 rounded-full border-2 border-white relative -mr-[10px] overflow-hidden">
                 <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-500" />
               </div>
               <div className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] bg-gray-300 rounded-full border-2 border-white relative -mr-[10px] overflow-hidden z-10">
                 <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500" />
               </div>
               <div className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] bg-gray-400 rounded-full border-2 border-white relative overflow-hidden z-20">
                 <div className="w-full h-full bg-gradient-to-br from-green-400 to-teal-500" />
               </div>
            </div>
            <div className="flex flex-col ml-2">
              <span className="font-urbanist font-bold text-[12px] md:text-[14px] text-black leading-tight">120K+</span>
              <span className="font-outfit text-[9px] md:text-[11px] text-[#4D525F] leading-tight">Active users</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
