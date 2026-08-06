import React from 'react';
import DeleteAccountHero from '@/components/delete-account/DeleteAccountHero';
import DeleteAccountForm from '@/components/delete-account/DeleteAccountForm';
import ReadyToUnlockSection from '@/components/sections/ReadyToUnlockSection';
import DownloadAppSection from '@/components/sections/DownloadAppSection';

export default function DeleteAccountPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#081220]">
      <DeleteAccountHero />
      <DeleteAccountForm />
      <ReadyToUnlockSection />
      <DownloadAppSection />
    </div>
  );
}
