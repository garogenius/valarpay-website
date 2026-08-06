import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, UserCircle, Calendar, Share2, ArrowRight } from 'lucide-react';
import { getPostBySlug, blogPosts } from '@/data/blog';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Get up to 3 recent posts excluding the current one
  const recentPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#081220] text-blue-50 pb-24">
      
      {/* Top Navigation */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 pb-6 flex items-center justify-between">
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-[14px] font-medium">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        <button className="inline-flex items-center gap-2 text-blue-300 hover:text-[#1D9BF0] transition-colors text-[14px] font-medium">
          <Share2 size={16} /> Share
        </button>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Main Article Content (Left Side) */}
        <article className="lg:col-span-8 w-full">
          <div className="mb-8 flex flex-col items-start gap-4">
            <span className="bg-[#1D9BF0]/10 text-[#1D9BF0] border border-[#1D9BF0]/30 px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="text-[32px] md:text-[48px] font-bold leading-[1.2] text-white">
              {post.title}
            </h1>
            
            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-6 mt-4 pt-6 border-t border-blue-900/40 text-[14px] text-blue-300/80 font-medium w-full">
              <div className="flex items-center gap-2">
                <UserCircle size={18} className="text-[#1D9BF0]" /> {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#FF5E00]" /> {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-blue-500" /> {post.readTime}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full relative h-[250px] md:h-[450px] rounded-[24px] overflow-hidden mb-12 shadow-2xl border border-blue-900/30">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>

          {/* Markdown/HTML Content */}
          <div 
            className="
              w-full prose prose-invert max-w-none
              [&>h2]:text-[24px] [&>h2]:md:text-[32px] [&>h2]:font-bold [&>h2]:text-white [&>h2]:mb-6 [&>h2]:mt-12 [&>h2:first-child]:mt-0
              [&>h3]:text-[20px] [&>h3]:md:text-[24px] [&>h3]:font-bold [&>h3]:text-white [&>h3]:mb-4 [&>h3]:mt-10
              [&>p]:text-blue-100/80 [&>p]:leading-[1.9] [&>p]:text-[16px] [&>p]:md:text-[18px] [&>p]:mb-8
              [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-8 [&>ul>li]:text-blue-100/80 [&>ul>li]:mb-3 [&>ul>li]:leading-[1.9] [&>ul>li]:text-[16px] [&>ul>li]:md:text-[18px]
              [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-8 [&>ol>li]:text-blue-100/80 [&>ol>li]:mb-3 [&>ol>li]:leading-[1.9] [&>ol>li]:text-[16px] [&>ol>li]:md:text-[18px]
              [&>strong]:text-blue-50
              [&>a]:text-[#1D9BF0] [&>a]:hover:underline
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-blue-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-[#0A192F] rounded-full border border-blue-900/50 flex items-center justify-center">
                 <UserCircle className="w-6 h-6 text-[#1D9BF0]" />
               </div>
               <div>
                 <p className="text-white font-bold text-[16px]">Written by {post.author}</p>
                 <p className="text-blue-300/70 text-[13px]">ValarPay Official Communications</p>
               </div>
            </div>
            
            <Link href="/blog" className="px-6 py-3 bg-[#0A192F] text-white rounded-full border border-blue-900/50 hover:border-[#1D9BF0] transition-colors text-[14px] font-medium shadow-lg">
               Read more articles
            </Link>
          </div>
        </article>

        {/* Sidebar: Recent News (Right Side) */}
        <aside className="lg:col-span-4 w-full flex flex-col gap-8 lg:sticky lg:top-24">
          <div className="bg-[#0A192F] rounded-[24px] border border-blue-900/30 p-6 md:p-8 shadow-xl">
            <h3 className="text-white text-[20px] font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-[#1D9BF0] rounded-full"></span>
              Recent News
            </h3>
            
            <div className="flex flex-col gap-6">
              {recentPosts.map((recentPost) => (
                <Link href={`/blog/${recentPost.slug}`} key={recentPost.id} className="group flex items-start gap-4 pb-6 border-b border-blue-900/30 last:border-0 last:pb-0">
                  {/* Thumbnail Image */}
                  <div className="relative w-20 h-20 shrink-0 rounded-[12px] overflow-hidden border border-blue-900/40">
                    <Image src={recentPost.image} alt={recentPost.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold text-blue-300/70 uppercase tracking-wide mb-1">
                      <span className="text-[#FF5E00]">{recentPost.category}</span>
                    </div>
                    <h4 className="text-white text-[14px] md:text-[15px] font-bold leading-snug group-hover:text-[#1D9BF0] transition-colors line-clamp-2">
                      {recentPost.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
