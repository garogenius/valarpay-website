import React from 'react';
import Image from 'next/image';

const partners = [
  { name: 'NattyPay', src: '/images/partners/nattypay.png' },
  { name: 'Payaza', src: '/images/partners/payaza.png' },
  { name: 'PalmPay', src: '/images/partners/palmpay.png' },
  { name: 'NIBSS', src: '/images/partners/nibss.png' },
  { name: 'The Kingdom Bank', src: '/images/partners/kindom.png' },
  { name: 'Safe Haven', src: '/images/partners/safe.png' },
  { name: 'Flutterwave', src: '/images/partners/flutterwave.png' },
  { name: 'Providus Bank', src: '/images/partners/providus.png' },
  { name: 'Kuda', src: '/images/partners/kuda.png' },
  { name: 'Remita', src: '/images/partners/remita.png' },
  { name: 'Visa', src: '/images/partners/visa.png' },
  { name: 'Verve', src: '/images/partners/verve.png' },
];

export default function TrustedPartners() {
  return (
    <section className="w-full py-12 md:py-20 bg-white flex flex-col items-center justify-center overflow-hidden">
      <div className="w-6 h-[2px] bg-[#ff007f] mb-4" />
      <h2 className="text-[20px] md:text-3xl font-bold text-[#111827] mb-8 md:mb-16 text-center px-4">
        Trusted By Leading Organization
      </h2>
      
      {/* Desktop Layout - flex container with space-between */}
      <div className="hidden lg:flex w-full max-w-[1400px] mx-auto px-6 items-center justify-between gap-4">
        {partners.map((partner) => (
          <div key={partner.name} className="relative flex items-center justify-center h-8 xl:h-10">
            <Image
              src={partner.src}
              alt={partner.name}
              width={120}
              height={40}
              className="object-contain w-auto h-full"
            />
          </div>
        ))}
      </div>

      {/* Mobile/Tablet Layout - grid center */}
      <div className="grid lg:hidden grid-cols-3 md:grid-cols-4 w-full max-w-3xl mx-auto px-4 gap-x-4 gap-y-10">
        {partners.map((partner) => (
          <div key={partner.name} className="relative flex items-center justify-center w-full h-8 sm:h-10">
            <Image
              src={partner.src}
              alt={partner.name}
              width={100}
              height={40}
              className="object-contain w-auto h-full max-w-[100px]"
            />
          </div>
        ))}
      </div>

      <div className="w-6 h-[2px] bg-[#ff007f] mt-10 md:mt-16" />
    </section>
  );
}
