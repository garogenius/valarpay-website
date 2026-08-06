import React from 'react';
import { Globe, Users, Code, Zap } from 'lucide-react';
import Link from 'next/link';

export default function BusinessFeaturesBento() {
  return (
    <section className="w-full bg-[#0A192F] py-24 flex justify-center font-poppins relative">
      <div className="w-full max-w-[1440px] mx-auto px-[24px] md:px-[60px]">
        
        <div className="text-left md:text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[32px] md:text-[48px] font-bold text-white mb-6">
            Everything your business needs to scale globally.
          </h2>
          <p className="text-blue-100/70 text-[18px]">
            Say goodbye to fragmented financial tools. ValarPay Business consolidates cross-border payments, payroll, and API integrations into one powerful platform.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
          
          {/* Feature 1: Large Box */}
          <div className="md:col-span-2 bg-[#112240] rounded-[24px] p-8 md:p-12 border border-blue-900/30 flex flex-col justify-between group hover:border-[#1D9BF0]/50 transition-colors">
            <div className="mb-8">
              <div className="w-14 h-14 rounded-full bg-[#1D9BF0]/10 flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-[#1D9BF0]" />
              </div>
              <h3 className="text-[24px] md:text-[28px] font-bold text-white mb-3">Multi-Currency Corporate Accounts</h3>
              <p className="text-blue-100/60 leading-relaxed max-w-md">
                Open business accounts in NGN, USD, EUR, and GBP instantly. Receive payments from global clients and manage your treasury without outrageous conversion fees.
              </p>
            </div>
          </div>

          {/* Feature 2: Small Box */}
          <div className="md:col-span-1 bg-[#112240] rounded-[24px] p-8 border border-blue-900/30 flex flex-col group hover:border-[#FF5E00]/50 transition-colors">
            <div className="w-14 h-14 rounded-full bg-[#FF5E00]/10 flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-[#FF5E00]" />
            </div>
            <h3 className="text-[22px] font-bold text-white mb-3">Bulk Payouts</h3>
            <p className="text-blue-100/60 leading-relaxed">
              Pay 1,000 vendors or employees in a single click with our robust bulk disbursement engine.
            </p>
          </div>

          {/* Feature 3: Small Box */}
          <div className="md:col-span-1 bg-[#112240] rounded-[24px] p-8 border border-blue-900/30 flex flex-col group hover:border-[#FF5E00]/50 transition-colors">
            <div className="w-14 h-14 rounded-full bg-[#FF5E00]/10 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-[#FF5E00]" />
            </div>
            <h3 className="text-[22px] font-bold text-white mb-3">Team Access</h3>
            <p className="text-blue-100/60 leading-relaxed">
              Granular role-based access control. Give your accountant view-only access and require multi-signature approvals for large transfers.
            </p>
          </div>

          {/* Feature 4: Large Box */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#112240] to-[#0A192F] rounded-[24px] p-8 md:p-12 border border-[#1D9BF0]/20 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-[#1D9BF0]/50 transition-colors">
            <div className="flex-1">
              <div className="w-14 h-14 rounded-full bg-[#1D9BF0]/10 flex items-center justify-center mb-6">
                <Code className="w-7 h-7 text-[#1D9BF0]" />
              </div>
              <h3 className="text-[24px] md:text-[28px] font-bold text-white mb-3">Developer-First API</h3>
              <p className="text-blue-100/60 leading-relaxed">
                Automate your financial operations. Embed our payment gateways, issue virtual cards programmatically, and build custom financial workflows in minutes.
              </p>
              <Link href="/developer" className="mt-6 inline-flex text-[#1D9BF0] font-medium items-center gap-2 hover:gap-3 transition-all">
                Read API Docs &rarr;
              </Link>
            </div>
            <div className="w-full md:w-[250px] bg-[#081220] rounded-xl p-4 border border-blue-900/50 font-mono text-[12px] text-blue-300/80 overflow-hidden shadow-inner hidden md:block">
              <pre><code>
{`fetch('/v1/payouts', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sec_...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 50000,
    currency: "USD",
    destination: "wa_..."
  })
});`}
              </code></pre>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
