import React from 'react';
import BlogCard from './BlogCard';
import { BlogPost } from '@/data/blog';

// Utility to calculate read time and strip HTML for excerpt
const calculateReadTime = (content: string) => `${Math.max(1, Math.ceil((content?.length || 0) / 1000))} min read`;
const generateExcerpt = (content: string) => {
  if (!content) return '';
  const text = content.replace(/<[^>]*>?/gm, '');
  return text.length > 150 ? text.substring(0, 150) + '...' : text;
};

export default async function BlogGrid() {
  let blogPosts: BlogPost[] = [];
  
  try {
    const res = await fetch('https://amiable-unity-production-1554.up.railway.app/valarpay/news', {
      next: { revalidate: 60 }, // Revalidate every minute
    });
    
    if (res.ok) {
      const data = await res.json();
      blogPosts = data.map((item: any) => ({
        id: item.id,
        slug: item.id,
        title: item.title,
        excerpt: generateExcerpt(item.content),
        content: item.content,
        image: item.thumbnail,
        date: new Date(item.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        author: 'ValarPay Team',
        category: item.tags && item.tags.length > 0 ? item.tags[0] : 'News',
        readTime: calculateReadTime(item.content),
      }));
    }
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
  }

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <section className="w-full bg-[#081220] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-white text-lg">No news available at the moment.</p>
        </div>
      </section>
    );
  }

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
