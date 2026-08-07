"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Grid } from 'lucide-react';

const currencies = [
  { code: 'NGN', name: 'Nigeria', flag: 'ng', path: '/' },
  { code: 'USD', name: 'United States', flag: 'us', path: '/usd' },
  { code: 'EUR', name: 'Europe', flag: 'eu', path: '/eur' },
  // { code: 'GHS', name: 'Ghana', flag: 'gh', path: '/ghs' },
  { code: 'GBP', name: 'United Kingdom', flag: 'gb', path: '/gbp' }
];

function CurrencyDropdown({ isMobile = false }: { isMobile?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const activeCurrency = currencies.find(c => c.path === pathname) || currencies[0];

  return (
    <div className="relative">
      <div 
        className={`flex items-center gap-[5px] md:gap-[11px] bg-white/10 px-2 md:px-3 py-1 rounded-[10px] cursor-pointer hover:bg-white/20 transition-colors`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`w-[20px] h-[20px] md:w-[37px] md:h-[37px] rounded-full overflow-hidden relative flex-shrink-0`}>
          {mounted && <Image src={`https://flagcdn.com/w40/${activeCurrency.flag}.png`} alt={activeCurrency.code} fill className="object-cover" unoptimized />}
        </div>
        <div className="flex items-center">
          <span className={`font-figtree font-medium ${isMobile ? 'text-[12px]' : 'text-[14px]'} text-white`}>{mounted ? activeCurrency.code : '...'}</span>
          <ChevronDown size={isMobile ? 16 : 24} className="text-white" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+10px)] right-0 w-[190px] bg-[#FF6600] rounded-[15px] p-[10px] flex flex-col gap-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.2)] z-[100]">
          {currencies.map((c) => {
            const isActive = activeCurrency.code === c.code;
            return (
              <Link 
                href={c.path} 
                key={c.code}
                className={`flex items-center gap-[12px] w-full p-[8px] rounded-[12px] transition-colors ${isActive ? 'bg-black' : 'bg-[#D9D9D9] hover:bg-[#C9C9C9]'}`}
                onClick={() => setIsOpen(false)}
              >
                <div className="w-[32px] h-[32px] rounded-full overflow-hidden relative flex-shrink-0 bg-white shadow-sm border border-black/5">
                  <Image src={`https://flagcdn.com/w40/${c.flag}.png`} alt={c.code} fill className="object-cover" unoptimized />
                </div>
                <div className="flex flex-col justify-center">
                  <span className={`text-[12px] leading-[14px] font-poppins ${isActive ? 'text-[#FF6600]' : 'text-[#4A4A4A]'}`}>{c.name}</span>
                  <span className={`text-[13px] leading-[15px] mt-[2px] font-poppins font-bold ${isActive ? 'text-[#FF6600]' : 'text-black'}`}>{c.code}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="relative w-full h-[52px] md:h-[103px] bg-[#FF6600] shadow-[0px_4px_50px_rgba(0,0,0,0.05)] z-40 flex justify-center">
        <div className="w-full h-full px-[10px] md:px-[24px] flex items-center justify-between">
        
        {/* Logo Group */}
        <Link href="/" className="flex items-center -ml-3 md:ml-0">
          <div className="relative w-[130px] h-[40px] md:w-[260px] md:h-[65px] flex items-center justify-start md:justify-center">
            <Image src="/images/logo.png" alt="ValarPay Logo" fill className="object-contain" priority />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-[40px] lg:gap-[60px]">
          <div className="flex items-center gap-[40px]">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'FAQ', path: '/faq' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => {
              const isActive = pathname === link.path || (link.name === 'Home' && ['/usd', '/eur', '/gbp'].includes(pathname));
              return (
                <Link 
                  key={link.name} 
                  href={link.path} 
                  className={`font-poppins text-[18px] transition-all duration-200 ${
                    isActive 
                      ? 'text-white font-bold border-b-2 border-white pb-0.5' 
                      : 'text-white/80 hover:text-white font-normal'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="relative group flex items-center">
              <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
                <span className="font-poppins text-[18px]">Developer</span>
                <ChevronDown size={20} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[220px] bg-white rounded-[12px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden z-50 translate-y-2 group-hover:translate-y-0 before:content-[''] before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
                <Link 
                  href="/developer" 
                  className="px-5 py-3.5 text-gray-700 hover:bg-[#F4F4F4] hover:text-[#FF5E00] font-poppins text-[15px] transition-colors border-b border-gray-100"
                >
                  API Documentation
                </Link>
                <Link 
                  href="/developer/reference" 
                  className="px-5 py-3.5 text-gray-700 hover:bg-[#F4F4F4] hover:text-[#FF5E00] font-poppins text-[15px] transition-colors"
                >
                  API References
                </Link>
              </div>
            </div>
          </div>

          {/* Currency Selector */}
          <CurrencyDropdown />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-[20px]">
          <CurrencyDropdown isMobile />
          <button className="text-white p-1" onClick={() => setIsMobileMenuOpen(true)}>
            <Grid size={32} />
          </button>
        </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col animate-in fade-in slide-in-from-top-4 duration-300">
          
          {/* Header Inside Mobile Menu */}
          <div className="w-full h-[60px] flex items-center justify-between px-[20px] border-b border-gray-100/50 pt-2 pb-2 mt-2">
            <div className="relative w-[140px] h-[40px] flex items-center">
               <Image src="/images/logo-black.png" alt="ValarPay Logo" fill className="object-contain" priority />
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-gray-300 hover:text-gray-500 transition-colors p-2"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col px-[20px] pt-[30px] gap-[8px]">
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about' },
              { name: 'FAQs', path: '/faq' },
              { name: 'Contact Us', path: '/contact' },
              { name: 'Developer', path: '/developer' }
            ].map((link) => {
              // 'Home' is active if we are on any of the currency landing pages.
              const isActive = pathname === link.path || (link.name === 'Home' && ['/usd', '/eur', '/gbp', '/ghs'].includes(pathname));
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full py-[14px] px-[20px] rounded-[6px] font-poppins text-[15px] transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#FF5E00] text-white font-medium shadow-sm' 
                      : 'bg-transparent text-black font-medium hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

        </div>
      )}
    </>
  );
}
