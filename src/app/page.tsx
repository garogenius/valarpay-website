import React from 'react';
import HeroSlider from '@/components/sections/HeroSlider';
import NgnHeroSection from '@/components/sections/ngn/NgnHeroSection';
import UsdHeroSection from '@/components/sections/usd/UsdHeroSection';
import EurHeroSection from '@/components/sections/eur/EurHeroSection';
import GbpHeroSection from '@/components/sections/gbp/GbpHeroSection';
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
import LiveCurrencyModal from '@/components/modals/LiveCurrencyModal';

export default function Home() {
  const heroSlides = [
    <NgnHeroSection key="ngn" />,
    <UsdHeroSection key="usd" />,
    <EurHeroSection key="eur" />,
    <GbpHeroSection key="gbp" />
  ];

  return (
    <div className="flex flex-col w-full min-h-screen">
      <HeroSlider slides={heroSlides} />
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
      <LiveCurrencyModal />
    </div>
  );
}
