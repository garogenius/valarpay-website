import React from 'react';
import BusinessHero from '@/components/business/BusinessHero';
import BusinessFeaturesBento from '@/components/business/BusinessFeaturesBento';
import BusinessAnalyticsSection from '@/components/business/BusinessAnalyticsSection';
import ReadyToUnlockSection from '@/components/sections/ReadyToUnlockSection';
import DownloadAppSection from '@/components/sections/DownloadAppSection';

export default function BusinessPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#081220]">
      <BusinessHero />
      <BusinessFeaturesBento />
      <BusinessAnalyticsSection />
      <ReadyToUnlockSection />
      <DownloadAppSection />
    </div>
  );
}
