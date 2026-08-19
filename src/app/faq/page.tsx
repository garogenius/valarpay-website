import React from 'react';
import FaqHero from '@/components/faq/FaqHero';
import FaqAccordion from '@/components/faq/FaqAccordion';
import ReadyToUnlockSection from '@/components/sections/ReadyToUnlockSection';
import DownloadAppSection from '@/components/sections/DownloadAppSection';
import NewsletterForm from '@/components/newsletter/NewsletterForm';

export default async function FaqPage() {
  let faqs = [];

  try {
    const res = await fetch('https://amiable-unity-production-1554.up.railway.app/valarpay/faqs', {
      next: { revalidate: 60 }
    });

    if (res.ok) {
      faqs = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F4F4F4]">
      <FaqHero />
      <FaqAccordion faqs={faqs} />
      <ReadyToUnlockSection />
      <NewsletterForm />
      <DownloadAppSection />
    </div>
  );
}
