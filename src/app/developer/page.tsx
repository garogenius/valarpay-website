import React from 'react';
import DeveloperHero from '@/components/developer/DeveloperHero';
import DeveloperPortal from '@/components/developer/DeveloperPortal';
import ReadyToUnlockSection from '@/components/sections/ReadyToUnlockSection';
import DownloadAppSection from '@/components/sections/DownloadAppSection';

export default function DeveloperPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <DeveloperHero />
      <DeveloperPortal />
      <ReadyToUnlockSection />
      <DownloadAppSection />
    </div>
  );
}
