import React from 'react';

export default function BlogHero() {
  return (
    <section className="w-full bg-[#081220] py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-b border-[#1D9BF0]/10 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl mx-auto">
        <h4 className="text-[#FF5E00] font-bold text-[14px] tracking-widest uppercase mb-4">Newsroom</h4>
        <h1 className="text-[40px] md:text-[64px] font-bold text-white mb-6 leading-tight tracking-tight">
          ValarPay <span className="text-[#FF5E00]">Blog</span>
        </h1>
        <p className="text-blue-100/70 text-[16px] md:text-[20px] leading-relaxed max-w-2xl mx-auto">
          Stay updated with the latest company news, product releases, engineering deep-dives, and insights into the future of global finance.
        </p>
      </div>
    </section>
  );
}
