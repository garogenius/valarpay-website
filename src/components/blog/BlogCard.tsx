import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { BlogPost } from '@/data/blog';

export default function BlogCard({ post, featured = false }: { post: BlogPost, featured?: boolean }) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block md:col-span-2 relative overflow-hidden rounded-[24px] bg-[#0A192F] border border-blue-900/30 hover:border-[#1D9BF0]/50 transition-all duration-300 shadow-xl">
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[400px]">
            <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 bg-[#FF5E00] text-white text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10">
              Featured
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-[13px] text-blue-300/70 mb-4 font-medium uppercase tracking-wide">
              <span>{post.category}</span>
              <span className="w-1 h-1 rounded-full bg-blue-500"></span>
              <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
            </div>
            <h2 className="text-white text-[28px] md:text-[36px] font-bold mb-4 leading-tight group-hover:text-[#1D9BF0] transition-colors">{post.title}</h2>
            <p className="text-blue-100/70 text-[16px] leading-relaxed mb-8">{post.excerpt}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-white font-medium text-[14px]">{post.author}</span>
              <span className="text-blue-400 text-[14px] font-medium flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                Read Article <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-[24px] bg-[#0A192F] border border-blue-900/30 hover:border-[#1D9BF0]/50 transition-all duration-300 shadow-lg hover:shadow-2xl">
      <div className="w-full relative h-[250px] overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex items-center justify-between text-[12px] text-blue-300/70 mb-4 font-medium uppercase tracking-wide">
          <span className="text-[#1D9BF0]">{post.category}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
        </div>
        <h3 className="text-white text-[20px] md:text-[24px] font-bold mb-3 leading-tight group-hover:text-[#1D9BF0] transition-colors line-clamp-2">{post.title}</h3>
        <p className="text-blue-100/70 text-[15px] leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-blue-900/30">
          <span className="text-white/60 text-[13px]">{post.date}</span>
          <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">
            <ArrowRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
