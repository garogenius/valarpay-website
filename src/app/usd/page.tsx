import React from 'react';
import UsdHeroSection from '@/components/sections/usd/UsdHeroSection';
import TrustedPartners from '@/components/sections/TrustedPartners';
import GrowthSection from '@/components/sections/GrowthSection';
import TopFeatures from '@/components/sections/TopFeatures';
import SupportSection from '@/components/sections/SupportSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import ProviderListSection from '@/components/sections/ProviderListSection';
import SecuritySection from '@/components/sections/SecuritySection';
import AppScreenshotsSection from '@/components/sections/AppScreenshotsSection';
import ReadyToUnlockSection from '@/components/sections/ReadyToUnlockSection';
import DownloadAppSection from '@/components/sections/DownloadAppSection';

export default function UsdPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <UsdHeroSection />
      <TrustedPartners />
      <GrowthSection />
      <TopFeatures />
      <SupportSection />
      <WhyChooseUsSection />
      <ProviderListSection />
      <SecuritySection />
      <AppScreenshotsSection />
      <ReadyToUnlockSection />
      <DownloadAppSection />
    </div>
  );
}
