import React from 'react';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactMap from '@/components/contact/ContactMap';
import ReadyToUnlockSection from '@/components/sections/ReadyToUnlockSection';
import DownloadAppSection from '@/components/sections/DownloadAppSection';

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F4F4F4]">
      <ContactHero />
      <ContactForm />
      <ContactMap />
      <ReadyToUnlockSection />
      <DownloadAppSection />
    </div>
  );
}
