"use client";

import React, { useState } from 'react';

export default function DeleteAccountForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

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
          phone: formData.phone || "0000000000",
          title: "Account Deletion Request",
          message: formData.reason
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      setMessage({ type: 'success', text: 'Your account deletion request has been submitted successfully.' });
      setFormData({ name: '', email: '', phone: '', reason: '' }); // Reset form
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'An error occurred while submitting your request. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#081220] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* Left Side: Form */}
        <div className="w-full order-2 md:order-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {message && (
              <div className={`p-4 rounded-lg text-[14px] ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message.text}
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
                className="w-full p-4 border border-blue-900/40 rounded-[8px] bg-[#0A192F] text-white placeholder-blue-100/50 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/50"
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (Linked to your account) *"
                required
                className="w-full p-4 border border-blue-900/40 rounded-[8px] bg-[#0A192F] text-white placeholder-blue-100/50 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/50"
              />
            </div>
            
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full p-4 border border-blue-900/40 rounded-[8px] bg-[#0A192F] text-white placeholder-blue-100/50 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/50"
              />
            </div>
            
            <div>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Reason for deletion *"
                required
                rows={5}
                className="w-full p-4 border border-blue-900/40 rounded-[8px] bg-[#0A192F] text-white placeholder-blue-100/50 text-[15px] resize-none focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF5E00] hover:bg-[#E05200] text-white font-medium py-4 rounded-[8px] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(255,94,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,94,0,0.23)]"
            >
              {isLoading ? 'Submitting...' : 'Request Account Deletion'}
            </button>
            
          </form>
        </div>

        {/* Right Side: Text Context */}
        <div className="w-full flex flex-col order-1 md:order-2">
          <h2 className="text-[32px] md:text-[48px] font-medium text-white mb-6 leading-tight">
            Account Deletion
          </h2>
          <p className="text-blue-100/70 text-[15px] md:text-[18px] leading-[1.8] font-light">
            You may request to permanently delete your NattyPay account at any time. Once your deletion request is processed, you will no longer be able to log in, and all non-essential personal data associated with your account will be permanently removed from our systems.
          </p>
        </div>

      </div>
    </section>
  );
}
