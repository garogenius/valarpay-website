import React from 'react';
import { Heart, Globe2, TrendingUp, ShieldCheck, Zap, Users } from 'lucide-react';

export default function ValuesSection() {
  const values = [
    {
      icon: <Globe2 className="w-8 h-8 text-[#1D9BF0]" />,
      title: "Remote-First & Global",
      description: "Work from anywhere. We believe great talent isn't restricted by geography. We offer a flexible, remote-first environment."
    },
    {
      icon: <Heart className="w-8 h-8 text-[#FF5E00]" />,
      title: "Comprehensive Health",
      description: "Your well-being matters. We provide premium medical, dental, and vision insurance for you and your dependents."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#1D9BF0]" />,
      title: "Continuous Growth",
      description: "We invest in your development with an annual learning stipend for courses, conferences, and certifications."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#FF5E00]" />,
      title: "Trust & Autonomy",
      description: "We hire smart people and get out of their way. You will have the autonomy to make impactful decisions."
    },
    {
      icon: <Zap className="w-8 h-8 text-[#1D9BF0]" />,
      title: "Fast-Paced Innovation",
      description: "We move fast and build things that matter. Experience the thrill of shipping products used by millions."
    },
    {
      icon: <Users className="w-8 h-8 text-[#FF5E00]" />,
      title: "Inclusive Culture",
      description: "Diversity is our strength. We foster an inclusive environment where every voice is heard and valued."
    }
  ];

  return (
    <section className="w-full bg-white py-24 flex justify-center font-poppins">
      <div className="w-full max-w-[1440px] mx-auto px-[24px] md:px-[60px] text-center">
        <h2 className="text-[32px] md:text-[48px] font-bold text-gray-900 mb-6">Why Work With Us?</h2>
        <p className="text-gray-600 text-[18px] max-w-2xl mx-auto mb-16">
          We don't just offer jobs; we offer the opportunity to do the best work of your life in an environment designed to support you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col items-start text-left p-8 rounded-[24px] bg-[#F9FAFB] border border-gray-100 hover:border-[#1D9BF0]/30 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                {value.icon}
              </div>
              <h3 className="text-[20px] font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
