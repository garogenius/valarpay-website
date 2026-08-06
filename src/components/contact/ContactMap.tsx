import React from 'react';
import Image from 'next/image';

export default function ContactMap() {
  return (
    <section className="w-full bg-[#F4F4F4] pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto relative rounded-3xl overflow-hidden h-[400px] md:h-[500px] shadow-sm bg-white">
        
        {/* Interactive Google Map */}
        <div className="absolute inset-0 z-0">
          <iframe 
            src="https://maps.google.com/maps?q=23%20Ogagifo%20Street,%20Asaba,%20Delta,%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ValarPay Office Location"
          ></iframe>
        </div>

        {/* Office Address Card */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 z-10 w-[280px] md:w-[340px] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
          {/* Orange Header */}
          <div className="bg-[#FF5E00] w-full py-6 md:py-8 flex items-center justify-center">
            <h3 className="text-white text-[20px] md:text-[24px] font-bold tracking-wide">
              OFFICE ADDRESS
            </h3>
          </div>
          
          {/* Address Content */}
          <div className="p-8 md:p-10 flex items-center justify-center text-center">
            <p className="text-black font-semibold text-[14px] md:text-[16px] leading-loose">
              23, OGAGIFO STREET OFF DBS ROAD BEFORE GQ SUITES, ASABA, DELTA STATE
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
