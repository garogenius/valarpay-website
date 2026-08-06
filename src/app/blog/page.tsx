import React from 'react';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';

export default function BlogListingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#081220]">
      <BlogHero />
      <BlogGrid />
    </div>
  );
}
