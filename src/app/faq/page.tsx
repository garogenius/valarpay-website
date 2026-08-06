import React from 'react';
import FaqHero from '@/components/faq/FaqHero';
import FaqAccordion from '@/components/faq/FaqAccordion';
import ReadyToUnlockSection from '@/components/sections/ReadyToUnlockSection';
import DownloadAppSection from '@/components/sections/DownloadAppSection';

export default function FaqPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F4F4F4]">
      <FaqHero />
      <FaqAccordion />
      <ReadyToUnlockSection />
      <DownloadAppSection />
    </div>
  );
}
