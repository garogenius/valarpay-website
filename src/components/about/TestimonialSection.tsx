import React from 'react';
import TestimonialSlider, { Testimonial } from './TestimonialSlider';

export default async function TestimonialSection() {
  let testimonials: Testimonial[] = [];

  try {
    const res = await fetch('https://amiable-unity-production-1554.up.railway.app/valarpay/testimonials', {
      next: { revalidate: 60 }
    });

    if (res.ok) {
      const data = await res.json();
      testimonials = data.map((item: any) => ({
        id: item.id,
        profileImage: item.profileImage,
        name: item.name,
        review: item.review,
        rating: item.rating,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#F9F9F9] py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <span className="text-[#FF5E00] font-bold text-[13px] tracking-widest uppercase mb-3">
            Real Stories
          </span>
          <h2 className="text-[#0A192F] text-[32px] sm:text-[40px] md:text-[48px] font-bold leading-tight mb-4">
            Loved by Our Customers
          </h2>
          <p className="text-gray-600 text-[16px] md:text-[18px] max-w-2xl leading-relaxed">
            See what our community has to say about their experience with ValarPay and how it has transformed their financial journey.
          </p>
        </div>

        {/* Slider Component */}
        <TestimonialSlider testimonials={testimonials} />

      </div>
    </section>
  );
}
