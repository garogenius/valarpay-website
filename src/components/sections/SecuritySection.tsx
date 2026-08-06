import React from 'react';

const features = [
  {
    title: 'Two-factor authentication',
    description: 'Two-factor authentication ensures added protection by using verification steps.',
    dotColor: 'bg-blue-500',
    ringColor: 'bg-blue-100/50',
  },
  {
    title: 'Fraud detection and alerts',
    description: 'Fraud detection safeguards your money, sending instant alerts for any activity.',
    dotColor: 'bg-red-500',
    ringColor: 'bg-red-100/50',
  },
  {
    title: 'Transaction notifications',
    description: 'Instant notifications for transaction keep you informed to manage your finances.',
    dotColor: 'bg-green-500',
    ringColor: 'bg-green-100/50',
  },
  {
    title: 'Biometric access',
    description: 'Easily and securely log in with biometric features, and facial recognition.',
    dotColor: 'bg-slate-600',
    ringColor: 'bg-slate-200/50',
  },
  {
    title: 'End-to-end encryption',
    description: 'By encryption, protecting your data from unauthorized access.',
    dotColor: 'bg-orange-400',
    ringColor: 'bg-orange-100/50',
  },
  {
    title: '24/7 Protection support',
    description: 'Our dedicated team is available around the clock to help you.',
    dotColor: 'bg-purple-500',
    ringColor: 'bg-purple-100/50',
  }
];

export default function SecuritySection() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-10 md:gap-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 w-full">
          <div className="flex flex-col items-start w-full md:w-7/12">
            <span className="text-[#FF5E00] text-[12px] md:text-[14px] font-bold uppercase tracking-wider mb-2">
              SECURITY
            </span>
            <h2 className="text-[#111827] text-[28px] sm:text-[36px] md:text-[48px] font-bold leading-tight">
              We protect your money at every step with ValarPay
            </h2>
          </div>
          <div className="w-full md:w-5/12 flex md:justify-end">
            <p className="text-[#4B5563] text-[14px] md:text-[15px] leading-relaxed max-w-[400px] md:text-right">
              ValarPay ensures your money is protected at every step with advanced encryption, real-time monitoring, and multi-factor authentication.
            </p>
          </div>
        </div>

        {/* Features Container */}
        <div className="w-full bg-gradient-to-br from-[#FDFCFE] to-[#F3F1F7] rounded-[24px] md:rounded-[40px] p-8 md:p-12 lg:p-16 border border-[#F3F1F7]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 w-full">
            
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-start gap-3 w-full
                  ${index % 2 !== 0 ? 'md:border-l md:border-gray-200 md:pl-8' : 'md:border-l-0 md:pl-0'}
                  ${index % 3 !== 0 ? 'lg:border-l lg:border-gray-200 lg:pl-10' : 'lg:border-l-0 lg:pl-0'}
                `}
              >
                {/* Dot Icon */}
                <div className={`w-8 h-8 rounded-full ${feature.ringColor} flex items-center justify-center mb-1`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${feature.dotColor}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-[#111827] text-[16px] md:text-[18px] font-bold leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[#6B7280] text-[13px] md:text-[14px] leading-relaxed pr-4">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
