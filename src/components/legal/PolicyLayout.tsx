import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function PolicyLayout({ title, lastUpdated, children }: PolicyLayoutProps) {
  return (
    <div className="w-full bg-[#081220] min-h-screen text-blue-50">
      {/* Policy Hero Header */}
      <div className="w-full relative flex flex-col items-center justify-center py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#1D9BF0]/10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/blue-policy-bg.png"
            alt="Policy Background"
            fill
            className="object-cover opacity-40 mix-blend-screen"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-[#081220]/70 pointer-events-none z-10"></div>
        
        <div className="relative z-20 max-w-[1000px] mx-auto text-center w-full">
          <h1 className="text-white text-[32px] md:text-[48px] lg:text-[56px] font-bold mb-4 tracking-tight leading-[1.2]">
            {title}
          </h1>
          <p className="text-[#1D9BF0] text-[14px] md:text-[16px] font-medium tracking-[2px] uppercase">
            LAST UPDATED: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Policy Content Body */}
      <div className="w-full pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 mt-12 md:mt-16 relative z-20">
        <div className="max-w-[900px] mx-auto">
          <div className="
            [&>h2]:text-[24px] [&>h2]:md:text-[32px] [&>h2]:font-bold [&>h2]:text-white [&>h2]:mb-6 [&>h2]:mt-12 [&>h2:first-child]:mt-0 [&>h2]:border-b [&>h2]:border-blue-900/30 [&>h2]:pb-2
            [&>h3]:text-[18px] [&>h3]:md:text-[22px] [&>h3]:font-bold [&>h3]:text-white [&>h3]:mb-4 [&>h3]:mt-8
            [&>p]:text-blue-100/70 [&>p]:leading-[1.8] [&>p]:text-[16px] [&>p]:md:text-[18px] [&>p]:mb-8
            [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-8 [&>ul>li]:text-blue-100/70 [&>ul>li]:mb-3 [&>ul>li]:leading-[1.8] [&>ul>li]:text-[16px] [&>ul>li]:md:text-[18px]
            [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-8 [&>ol>li]:text-blue-100/70 [&>ol>li]:mb-3 [&>ol>li]:leading-[1.8] [&>ol>li]:text-[16px] [&>ol>li]:md:text-[18px]
            [&>a]:text-[#1D9BF0] [&>a]:hover:underline
            [&>strong]:text-blue-50
          ">
            {children}
          </div>
        </div>
        
        {/* Back Button */}
        <div className="max-w-[900px] mx-auto mt-16 flex justify-center md:justify-start">
          <Link href="/" className="inline-flex items-center gap-2 text-[#1D9BF0] hover:text-white transition-colors text-[14px] font-medium bg-[#1D9BF0]/10 px-8 py-3 rounded-full border border-[#1D9BF0]/30 hover:bg-[#1D9BF0]/20">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
