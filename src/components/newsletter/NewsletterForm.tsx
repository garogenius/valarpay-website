"use client";

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://amiable-unity-production-1554.up.railway.app/valarpay/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe. Please try again.');
      }

      setStatus('success');
      setEmail('');
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'An error occurred.');
    }
  };

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-50 p-8 md:p-12 rounded-[24px] border border-gray-200 shadow-xl">
        <div className="max-w-xl">
          <h2 className="text-gray-900 text-[28px] md:text-[36px] font-bold mb-4">Stay in the loop</h2>
          <p className="text-gray-600 text-[16px] leading-relaxed">
            Join our newsletter to get the latest news, product updates, and exclusive insights from ValarPay directly in your inbox.
          </p>
        </div>

        <div className="w-full md:w-auto flex-1 max-w-md">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-2xl border border-green-200 text-center animate-fade-in">
              <CheckCircle className="text-green-500 w-12 h-12 mb-3" />
              <h3 className="text-gray-900 font-bold text-[20px] mb-1">Subscribed Successfully!</h3>
              <p className="text-gray-600 text-[14px]">Thank you for joining our newsletter.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-4 text-[#FF5E00] hover:underline text-[14px] font-medium"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={status === 'loading'}
                  className="w-full px-6 py-4 bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF5E00] focus:ring-1 focus:ring-[#FF5E00] transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  className="sm:absolute sm:right-2 sm:top-2 w-full sm:w-auto px-8 py-2 bg-[#FF5E00] hover:bg-[#E05200] text-white rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      Subscribe <Send size={16} />
                    </>
                  )}
                </button>
              </div>
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-[14px] ml-2 animate-fade-in mt-1">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
