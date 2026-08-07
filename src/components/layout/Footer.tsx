import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


export default function Footer() {
  return (
    <footer className="w-full bg-white text-black flex flex-col items-center">
      
      {/* Top Orange Partner Bar */}
      <div className="w-[350px] md:w-[1087px] bg-[#FF6600] rounded-[20px] md:rounded-[24px] mx-auto mt-12 md:mt-20 px-[12px] py-[19px] md:px-[52px] md:py-[36px] flex flex-wrap justify-center md:flex-nowrap items-center gap-[7px] md:gap-[14px]">
        {/* Partner Logos 1 to 5 */}
        <div className="w-[122px] md:w-[187px] h-[34px] md:h-[52px] relative flex items-center justify-center rounded-[6.5px] md:rounded-[10px] overflow-hidden">
           <Image src="/icons/1.png" alt="Partner 1" fill className="object-cover" />
        </div>
        <div className="w-[124px] md:w-[189px] h-[34.5px] md:h-[53px] relative flex items-center justify-center rounded-[6.5px] md:rounded-[10px] overflow-hidden">
           <Image src="/icons/2.png" alt="Partner 2" fill className="object-cover" />
        </div>
        <div className="w-[124px] md:w-[189px] h-[34.5px] md:h-[53px] relative flex items-center justify-center rounded-[6.5px] md:rounded-[10px] overflow-hidden">
           <Image src="/icons/3.png" alt="Partner 3" fill className="object-cover" />
        </div>
        <div className="w-[122px] md:w-[187px] h-[34px] md:h-[52px] relative flex items-center justify-center rounded-[6.5px] md:rounded-[10px] overflow-hidden">
           <Image src="/icons/4.png" alt="Partner 4" fill className="object-cover" />
        </div>
        <div className="w-[124px] md:w-[189px] h-[34.5px] md:h-[53px] relative flex items-center justify-center rounded-[6.5px] md:rounded-[10px] overflow-hidden">
           <Image src="/icons/5.png" alt="Partner 5" fill className="object-cover" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full max-w-[1440px] px-[24px] md:px-[60px] mt-12 md:mt-20 flex flex-col md:flex-row items-center md:items-start justify-between gap-[48px] md:gap-[86px]">
        
        {/* Brand & Description (Column 1) */}
        <div className="flex flex-col items-center md:items-start gap-[16px] w-full md:w-[447px]">
          {/* Logo Group */}
          <div className="flex items-center">
            <div className="relative w-[200px] h-[55px] md:w-[260px] md:h-[65px] flex items-center justify-center">
              <Image src="/images/logo-black.png" alt="ValarPay Logo" fill className="object-contain" />
            </div>
          </div>
          
          <p className="font-poppins text-[14px] leading-[19px] text-black text-justify md:text-left">
            ValarPay is more than just a financial service provider; we are a community dedicated to improving financial well-being. Join thousands of satisfied users who trust ValarPay for their financial needs. Download the ValarPay app today and experience the future of finance in Nigeria.
          </p>

          {/* Desktop Socials */}
          <div className="hidden md:flex flex-row items-start gap-[18px] mt-2">
            <SocialIcons />
          </div>
        </div>

        {/* Links Columns Container */}
        <div className="flex flex-col md:flex-row items-start gap-[31px] md:gap-[86px] w-full md:w-auto">
          
          {/* Company */}
          <div className="flex flex-col items-start gap-[9px] w-[123px]">
            <h4 className="font-poppins font-bold text-[12px] leading-[24px] text-black">Company</h4>
            <div className="flex flex-col gap-1 font-poppins text-[12px] leading-[23px] text-black">
              <Link href="/about" className="hover:text-[#FF6600] transition-colors">About Us</Link>
              <Link href="/business" className="hover:text-[#FF6600] transition-colors">Business Account</Link>
              <Link href="/careers" className="hover:text-[#FF6600] transition-colors">Join Our Team</Link>
              <Link href="/blog" className="hover:text-[#FF6600] transition-colors">Blog</Link>
              <Link href="/contact" className="hover:text-[#FF6600] transition-colors">Contact Us</Link>
              <Link href="/delete-account" className="hover:text-[#FF6600] transition-colors">Delete my Account</Link>
            </div>
          </div>

          {/* Resources */}
          <div className="flex flex-col items-start gap-[9px] w-[154px]">
            <h4 className="font-poppins font-bold text-[12px] leading-[30px] text-black">Resources</h4>
            <div className="flex flex-col gap-1 font-poppins text-[12px] leading-[23px] text-black">
              <Link href="/terms-of-use" className="hover:text-[#FF6600] transition-colors">Terms of Use</Link>
              <Link href="/terms-and-conditions" className="hover:text-[#FF6600] transition-colors">Terms & Condition</Link>
              <Link href="/privacy-policy" className="hover:text-[#FF6600] transition-colors">Privacy Policy</Link>
              <Link href="/data-protection-policy" className="hover:text-[#FF6600] transition-colors">Data Protection Policy</Link>
              <Link href="/cookies-policy" className="hover:text-[#FF6600] transition-colors">Cookies Policy</Link>
              <Link href="/dispute-handling" className="hover:text-[#FF6600] transition-colors">Dispute & Complaint Handling</Link>
              <Link href="/fraud-monitoring" className="hover:text-[#FF6600] transition-colors">Fraud Monitoring & User Security</Link>
              <Link href="/refund-policy" className="hover:text-[#FF6600] transition-colors">Refund Policy</Link>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col items-start gap-[12px] w-[296px]">
            <h4 className="font-poppins font-bold text-[12px] leading-[32px] text-black">Info</h4>
            <div className="font-poppins text-[12px] leading-[23px] text-black flex flex-col">
              <span>Head office: 23, OGAGIFO STREET OFF DBS ROAD BEFORE GQ SUITES , ASABA, DELTA STATE</span>
              <span>02013309609</span>
              <span>support@valarpay.com</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full max-w-[1440px] px-[24px] md:px-[60px] mt-12 md:mt-20 mb-8 md:mb-12">
        <div className="w-full h-[1px] bg-[#C8C8C8] md:border-t md:border-[rgba(82,81,81,0.53)] md:bg-transparent"></div>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-center pt-[23px] md:pt-[8px] gap-[23px] md:gap-[3px]">
          <span className="font-poppins text-[14px] leading-[21px] text-black">
            © 2026 ValarPay • All Rights Reserved
          </span>
          {/* Mobile Socials */}
          <div className="flex md:hidden flex-row items-center gap-[18px]">
            <SocialIcons />
          </div>
        </div>
      </div>
      
    </footer>
  );
}

// Reusable Social Icons Component
function SocialIcons() {
  return (
    <>
      <a href="#" className="w-[24px] h-[24px] rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      </a>
      <a href="#" className="w-[24px] h-[24px] rounded-[6px] bg-[#1D9BF0] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      </a>
      <a href="#" className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center text-white hover:opacity-80 transition-opacity" style={{ background: 'linear-gradient(219.2deg, #AE3DAE 11.15%, #CE2E69 28.62%, #FF1800 45.15%, #F79A2E 88.91%)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>
      <a href="#" className="w-[24px] h-[24px] rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      </a>
    </>
  );
}
