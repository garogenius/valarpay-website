import React from 'react';
import BlogCard from './BlogCard';
import { blogPosts } from '@/data/blog';

export default function BlogGrid() {
  if (!blogPosts || blogPosts.length === 0) return null;

  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <section className="w-full bg-[#081220] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Featured Post (Spans 2 columns on desktop) */}
          <BlogCard post={featuredPost} featured={true} />

          {/* Standard Posts */}
          {remainingPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}

        </div>
      </div>
    </section>
  );
}
