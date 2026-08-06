import React from 'react';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { jobListings } from '@/data/careers';

export default function OpenPositions() {
  return (
    <section id="open-positions" className="w-full bg-[#F9FAFB] py-24 flex justify-center border-t border-gray-200 font-poppins">
      <div className="w-full max-w-[1000px] mx-auto px-[24px] md:px-[60px]">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold text-gray-900 mb-6">Open Positions</h2>
          <p className="text-gray-600 text-[18px] max-w-2xl mx-auto">
            Ready to make an impact? Explore our current openings and find where you fit best.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {jobListings.map((job) => (
            <Link href={`/careers/${job.slug}`} key={job.id} className="group bg-white rounded-[16px] p-6 md:p-8 border border-gray-200 hover:border-[#FF5E00]/50 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer">
              
              <div className="flex flex-col gap-2">
                <span className="text-[#1D9BF0] text-[13px] font-bold uppercase tracking-wider">
                  {job.department}
                </span>
                <h3 className="text-[16px] md:text-[24px] font-bold text-gray-900 group-hover:text-[#FF5E00] transition-colors">
                  {job.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-500 text-[14px] font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} /> {job.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={16} /> {job.type}
                  </div>
                </div>
              </div>

              <button className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-medium group-hover:border-[#FF5E00] group-hover:bg-[#FF5E00] group-hover:text-white transition-all">
                View Role <ArrowRight size={16} />
              </button>

              {/* Mobile button */}
              <button className="md:hidden flex items-center justify-center gap-2 w-full mt-4 px-6 py-3 rounded-full bg-gray-100 text-gray-900 font-medium group-hover:bg-[#FF5E00] group-hover:text-white transition-all">
                View Role <ArrowRight size={16} />
              </button>

            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-500">
          Don't see a role that fits? Send your resume to <a href="mailto:careers@valarpay.com" className="text-[#1D9BF0] font-medium hover:underline">careers@valarpay.com</a>.
        </div>

      </div>
    </section>
  );
}
