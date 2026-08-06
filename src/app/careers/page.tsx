import React from 'react';
import CareersHero from '@/components/careers/CareersHero';
import ValuesSection from '@/components/careers/ValuesSection';
import OpenPositions from '@/components/careers/OpenPositions';
import ReadyToUnlockSection from '@/components/sections/ReadyToUnlockSection';
import DownloadAppSection from '@/components/sections/DownloadAppSection';

export default function CareersPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <CareersHero />
      <ValuesSection />
      <OpenPositions />
      <ReadyToUnlockSection />
      <DownloadAppSection />
    </div>
  );
}
