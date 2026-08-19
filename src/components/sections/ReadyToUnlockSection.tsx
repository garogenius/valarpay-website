import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
          
          <div className="flex flex-row flex-wrap gap-4">
            <Link href="https://play.google.com/store/apps/details?id=com.valarglobal.valarpay&hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-white text-black px-4 lg:px-6 py-2.5 lg:py-3 rounded-[12px] hover:bg-gray-50 transition-all hover:scale-105 shadow-sm w-[160px] lg:w-[180px]">
              <svg viewBox="0 0 24 24" className="w-6 h-6 lg:w-7 lg:h-7 mr-2 lg:mr-3" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.937 3.518C2.697 3.791 2.553 4.225 2.553 4.793V19.207C2.553 19.775 2.697 20.209 2.937 20.482L3.003 20.543L11.666 11.974V11.838L3.003 3.457L2.937 3.518Z" fill="#3BCCFF"/>
                <path d="M14.542 14.821L11.666 11.974V11.838L14.542 8.991L14.619 9.035L18.257 11.089C19.297 11.674 19.297 12.634 18.257 13.224L14.619 15.274L14.542 14.821Z" fill="#FFC928"/>
                <path d="M14.619 15.274L11.666 12.351L3.003 20.92C3.332 21.261 3.863 21.306 4.471 20.966L14.619 15.274Z" fill="#FF3A44"/>
                <path d="M14.619 9.035L4.471 3.342C3.863 3.003 3.332 3.047 3.003 3.388L11.666 11.956L14.619 9.035Z" fill="#00E676"/>
              </svg>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] lg:text-[11px] text-gray-600 font-medium">GET IT ON</span>
                <span className="text-[14px] lg:text-[16px] font-bold">Google Play</span>
              </div>
            </Link>
            
            <Link href="https://apps.apple.com/us/app/valarpay-local-global-bank/id6755668965" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-white text-black px-4 lg:px-6 py-2.5 lg:py-3 rounded-[12px] hover:bg-gray-50 transition-all hover:scale-105 shadow-sm w-[160px] lg:w-[180px]">
              <svg viewBox="0 0 24 24" className="w-7 h-7 lg:w-8 lg:h-8 mr-2 lg:mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.529 11.161C15.512 8.895 17.375 7.784 17.464 7.728C16.417 6.195 14.808 5.961 14.264 5.938C12.871 5.795 11.512 6.757 10.799 6.757C10.088 6.757 8.983 5.952 7.828 5.975C6.34 6.002 4.958 6.84 4.195 8.169C2.639 10.865 3.799 14.858 5.318 17.042C6.059 18.106 6.945 19.308 8.105 19.261C9.222 19.215 9.642 18.536 10.978 18.536C12.308 18.536 12.684 19.261 13.847 19.238C15.053 19.215 15.803 18.151 16.539 17.078C17.387 15.835 17.737 14.629 17.755 14.568C17.73 14.557 15.547 13.731 15.529 11.161ZM12.78 4.095C13.398 3.348 13.811 2.308 13.698 1.25C12.784 1.287 11.666 1.861 11.031 2.597C10.462 3.253 9.967 4.316 10.098 5.352C11.119 5.432 12.163 4.843 12.78 4.095Z" fill="#000000"/>
              </svg>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] lg:text-[11px] text-gray-600 font-medium">Download on the</span>
                <span className="text-[14px] lg:text-[16px] font-bold">App Store</span>
              </div>
            </Link>
          </div>

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
