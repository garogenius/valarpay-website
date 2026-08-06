import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Briefcase, Mail, Send } from 'lucide-react';
import { getJobBySlug } from '@/data/careers';
import ReadyToUnlockSection from '@/components/sections/ReadyToUnlockSection';
import DownloadAppSection from '@/components/sections/DownloadAppSection';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function JobDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const job = getJobBySlug(resolvedParams.slug);

  if (!job) {
    notFound();
  }

  const subjectLine = encodeURIComponent(`Application for ${job.title}`);
  const mailtoLink = `mailto:careers@valarpay.com?subject=${subjectLine}`;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white font-poppins">
      
      {/* Top Navigation */}
      <div className="w-full bg-[#F9FAFB] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-[24px] md:px-[60px] py-6 flex items-center">
          <Link href="/careers" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF5E00] transition-colors text-[14px] font-medium">
            <ArrowLeft size={16} /> Back to All Roles
          </Link>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-[24px] md:px-[60px] py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* Main Job Details (Left) */}
        <article className="lg:col-span-8 w-full flex flex-col">
          
          <div className="mb-12 border-b border-gray-200 pb-10">
            <span className="bg-[#1D9BF0]/10 text-[#1D9BF0] px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-wider mb-6 inline-block">
              {job.department}
            </span>
            <h1 className="text-[28px] md:text-[52px] font-bold text-gray-900 leading-tight mb-6">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-600 text-[16px] font-medium">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-[#FF5E00]" /> {job.location}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={20} className="text-[#1D9BF0]" /> {job.type}
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-4">About the Role</h2>
            <p className="text-gray-700 text-[16px] md:text-[18px] leading-relaxed">
              {job.aboutRole}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-6">Key Responsibilities</h2>
            <ul className="space-y-4">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="w-2 h-2 mt-2.5 rounded-full bg-[#1D9BF0] shrink-0"></span>
                  <span className="text-gray-700 text-[16px] md:text-[18px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-6">Requirements</h2>
            <ul className="space-y-4">
              {job.requirements.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="w-2 h-2 mt-2.5 rounded-full bg-[#FF5E00] shrink-0"></span>
                  <span className="text-gray-700 text-[16px] md:text-[18px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
          
        </article>

        {/* Sidebar: Apply Box (Right) */}
        <aside className="lg:col-span-4 w-full flex flex-col gap-8 lg:sticky lg:top-24">
          <div className="bg-[#F9FAFB] rounded-[24px] border border-gray-200 p-8 shadow-xl">
            <h3 className="text-gray-900 text-[22px] font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-[#FF5E00] rounded-full"></span>
              How to Apply
            </h3>
            
            <p className="text-gray-600 text-[15px] mb-8 leading-relaxed">
              To apply for the <strong>{job.title}</strong> position, please send us an email with your updated CV and a cover letter explaining why you are the best fit for this role at ValarPay.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[14px] font-medium text-gray-700 bg-white p-4 rounded-xl border border-gray-100">
                <Mail size={18} className="text-[#1D9BF0]" />
                careers@valarpay.com
              </div>

              <a 
                href={mailtoLink}
                className="flex items-center justify-center gap-2 w-full bg-[#FF5E00] hover:bg-[#E05200] text-white font-medium py-4 rounded-xl transition-all shadow-lg hover:shadow-xl mt-4"
              >
                <Send size={18} /> Apply via Email
              </a>
            </div>
            
            <div className="mt-6 text-[12px] text-gray-500 text-center">
              * Please ensure your email subject matches the role you are applying for.
            </div>
          </div>
        </aside>

      </div>

      <ReadyToUnlockSection />
      <DownloadAppSection />
    </div>
  );
}
