import React from 'react';
import { Target, Eye } from 'lucide-react';

export default function AboutIntroSection() {
  return (
    <section className="w-full relative flex flex-col">
      
      {/* Top White Section: Introduction Text */}
      <div className="w-full bg-[#F9F9F9] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto text-left text-[#333333] text-[15px] md:text-[18px] leading-relaxed space-y-6">
          <p>
            <span className="font-bold text-black">VALAR GLOBAL SERVICES LIMITED.</span> is a registered Fin Tech company in Nigeria, committed to revolutionizing local and global financial services by providing innovative, secure, and user-friendly solutions that cater to the diverse needs of our customers. Founded with the vision of enhancing financial inclusion and empowering individuals and businesses, Valarpay is designed to offer a seamless and comprehensive financial experience.
          </p>
          <p>
            We focus on simplifying everyday money management for people and businesses by enabling fast payments, reliable transfers, bill settlement, and access to card and wallet services. Our platforms are built on modern infrastructure with strong security, compliance, and customer support at the core—so users can transact with confidence across channels and devices.
          </p>
        </div>
      </div>

      {/* Bottom Orange Section: Mission & Vision Cards */}
      <div className="w-full bg-[#FF5E00] py-16 px-4 sm:px-6 lg:px-8 relative">
        
        {/* We use a negative margin on desktop to pull cards up slightly if desired, 
            but the design shows them fully inside the orange block. */}
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
          
          {/* Mission Card */}
          <div className="flex-1 bg-white rounded-2xl p-8 md:p-10 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-black" strokeWidth={2} />
              <h2 className="text-[#FF5E00] text-[24px] font-medium">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-[14px] leading-relaxed">
              Our mission at Valarpay is to deliver cutting-edge global financial services that improve the lives of Nigerians by offering unparalleled convenience, robust security, and financial freedom. We strive to bridge the gap between traditional banking and modern financial needs, ensuring that every individual, regardless of their location or socio-economic status, has access to reliable financial tools.
            </p>
          </div>

          {/* Vision Card */}
          <div className="flex-1 bg-white rounded-2xl p-8 md:p-10 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-8 h-8 text-black" strokeWidth={2} />
              <h2 className="text-[#FF5E00] text-[24px] font-medium">The Vision</h2>
            </div>
            <p className="text-gray-700 text-[14px] leading-relaxed">
              We envision becoming the most trusted and widely used financial service provider across the globe. Our goal is to transform the financial landscape by continually innovating and expanding our services to meet the evolving needs of our customers. We aim to be a catalyst for economic growth and prosperity, helping individuals and businesses thrive in the digital age.
            </p>
          </div>

        </div>
      </div>
      
    </section>
  );
}
