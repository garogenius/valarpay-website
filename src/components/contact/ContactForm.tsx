"use client";

import React, { useState } from 'react';
import { Mail, Home, Phone } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_VALARPAY_API_BASE_URL || 'https://valar-pay-api.up.railway.app/api/v1/';
      const apiKey = process.env.NEXT_PUBLIC_VALARPAY_API_KEY || '5821039487621507';

      const response = await fetch(`${baseUrl}contact-us`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          fullname: formData.name,
          email: formData.email,
          phone: "0000000000", // API requires phone, but form uses website
          title: `Contact Submission - Website: ${formData.website}`,
          message: formData.message
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      setStatusMessage({ type: 'success', text: 'Thank you for reaching out! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', website: '', message: '' }); // Reset form
    } catch (error) {
      console.error(error);
      setStatusMessage({ type: 'error', text: 'An error occurred while sending your message. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#F4F4F4] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* Left Side: Contact Info */}
        <div className="w-full flex flex-col pt-4">
          <h2 className="text-[40px] md:text-[56px] font-medium text-black mb-4 leading-tight">
            Contact Us
          </h2>
          <p className="text-gray-700 text-[15px] md:text-[18px] leading-relaxed font-light mb-12 max-w-[400px]">
            We are committed to processing the information in order to contact you and talk about your project.
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-6">
              <Mail className="text-[#FF5E00] w-6 h-6 flex-shrink-0" />
              <span className="text-gray-700 text-[15px] md:text-[16px]">support@valarpay.com</span>
            </div>
            
            <div className="flex items-start gap-6">
              <Home className="text-[#FF5E00] w-6 h-6 flex-shrink-0 mt-1" />
              <span className="text-gray-700 text-[15px] md:text-[16px] leading-relaxed max-w-[250px]">
                No.9a New Market Road Main Market,<br />
                Onitsha, Anambra State
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <Phone className="text-[#FF5E00] w-6 h-6 flex-shrink-0" />
              <span className="text-gray-700 text-[15px] md:text-[16px]">+2348134146906</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {statusMessage && (
              <div className={`p-4 rounded-lg text-[14px] ${statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {statusMessage.text}
              </div>
            )}

            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name *"
                required
                className="w-full p-4 border border-gray-200 rounded-[8px] bg-white text-gray-900 placeholder-gray-500 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF5E00]/20"
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *"
                required
                className="w-full p-4 border border-gray-200 rounded-[8px] bg-white text-gray-900 placeholder-gray-500 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF5E00]/20"
              />
            </div>
            
            <div>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Website *"
                required
                className="w-full p-4 border border-gray-200 rounded-[8px] bg-white text-gray-900 placeholder-gray-500 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF5E00]/20"
              />
            </div>
            
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                required
                rows={5}
                className="w-full p-4 border border-gray-200 rounded-[8px] bg-white text-gray-900 placeholder-gray-500 text-[15px] resize-none focus:outline-none focus:ring-2 focus:ring-[#FF5E00]/20"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF5E00] hover:bg-[#E05200] text-white font-medium py-4 rounded-[8px] transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
            
          </form>
        </div>

      </div>
    </section>
  );
}
