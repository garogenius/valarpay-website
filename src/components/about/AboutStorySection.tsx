import React from 'react';

export default function AboutStorySection() {
  const coreValues = [
    {
      id: "01",
      title: "Customer-Centricity",
      desc: "At the heart of everything we do is our commitment to our customers. We listen to their needs, understand their challenges, and tailor our services to provide the best possible solutions."
    },
    {
      id: "02",
      title: "Innovation",
      desc: "We believe in the power of technology to transform lives. ValarPay is built on a foundation of continuous innovation, leveraging the latest advancements in fintech to offer cutting-edge services."
    },
    {
      id: "03",
      title: "Integrity",
      desc: "Trust is the cornerstone of our business. We operate with the highest standards of honesty, transparency, and ethical behavior."
    },
    {
      id: "04",
      title: "Inclusivity",
      desc: "We are dedicated to making financial services accessible to all Nigerians, regardless of their location or economic status."
    }
  ];

  return (
    <section className="w-full relative flex flex-col">
      
      {/* Top White Section: The Story */}
      <div className="w-full bg-[#F9F9F9] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto text-[#333333]">
          <h2 className="text-[32px] md:text-[40px] font-bold text-black mb-8">The Story</h2>
          <div className="text-[15px] md:text-[18px] leading-relaxed space-y-6">
            <p>
              At VALAR GLOBAL SERVICES LIMITED, the Story is passionate and determined, driven by the desire to bring high-quality and standard financial services to individuals locally and globally. As VGSL flourished in Onitsha, its influence expanded beyond. Branches sprouted in Asaba, Delta State, and the legacy continued to thrive in Asaba Delta State, all of the country and worldwide.
            </p>
            <p>
              As we continue to expand, we remain unwavering in upholding our commitment to high-quality standards, delivering financial service that positively impact digital lives and desires in individuals on their journey toward
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Orange Section: Core Values */}
      <div className="w-full bg-[#FF5E00] pt-16 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 relative">
        
        <div className="max-w-[1200px] mx-auto mb-10 p-4 inline-block md:block w-full">
          <h2 className="text-white text-[32px] md:text-[40px] font-bold mb-2">Our Core Values</h2>
          <p className="text-white text-[18px] md:text-[20px] font-medium">The principles that guide how we build and serve every customer.</p>
        </div>

        {/* Core Values Container */}
        <div className="max-w-[1200px] mx-auto bg-white rounded-[24px] p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-x-0 lg:divide-x lg:divide-gray-100">
            {coreValues.map((value, idx) => (
              <div key={idx} className="flex flex-col px-0 lg:px-6 first:pl-0 last:pr-0">
                <span className="text-[48px] md:text-[64px] font-black text-[#FFF0E5] leading-none mb-4 tracking-tighter">
                  {value.id}
                </span>
                <h3 className="text-[#FF5E00] text-[16px] md:text-[18px] font-bold mb-3">{value.title}</h3>
                <p className="text-[12px] md:text-[13px] text-gray-700 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      
    </section>
  );
}
