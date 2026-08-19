import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import AboutIntroSection from '@/components/about/AboutIntroSection';
import AboutStorySection from '@/components/about/AboutStorySection';
import TestimonialSection from '@/components/about/TestimonialSection';
import ReadyToUnlockSection from '@/components/sections/ReadyToUnlockSection';
import DownloadAppSection from '@/components/sections/DownloadAppSection';

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9F9F9]">
      <AboutHero />
      <AboutIntroSection />
      <AboutStorySection />
      <TestimonialSection />
      <ReadyToUnlockSection />
      <DownloadAppSection />
    </div>
  );
}
