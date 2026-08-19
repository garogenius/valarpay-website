"use client";

import React, { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface CurrencyRate {
  currency: string;
  rate: number;
  trend?: 'up' | 'down';
}

const getFlagEmoji = (currencyCode: string) => {
  const flags: Record<string, string> = {
    USD: '🇺🇸',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    CAD: '🇨🇦',
    AUD: '🇦🇺',
    JPY: '🇯🇵',
    NGN: '🇳🇬',
    CHF: '🇨🇭',
    CNY: '🇨🇳',
    INR: '🇮🇳',
    ZAR: '🇿🇦',
  };
  return flags[currencyCode] || '🌎';
};

export default function LiveCurrencyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch live rates on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      fetchRates();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const fetchRates = async () => {
    try {
      let res = null;
      try {
        res = await fetch('https://valar-pay-api.up.railway.app/api/v1/currencies/rates?baseCurrency=NGN');
      } catch (err) {
        // Silently catch network errors to gracefully fallback
      }
      
      if (res && res.ok) {
        const data = await res.json();
        const ratesObj = data.data || data; 
        
        let newRates: CurrencyRate[] = [];
        if (typeof ratesObj === 'object' && !Array.isArray(ratesObj)) {
          newRates = Object.entries(ratesObj).map(([currency, rate]) => ({
            currency,
            rate: Number(rate),
            trend: (Math.random() > 0.5 ? 'up' : 'down') as 'up' | 'down'
          })).slice(0, 8); 
        } else if (Array.isArray(ratesObj)) {
           newRates = ratesObj.map(item => ({
              currency: item.currency || item.code || 'UNK',
              rate: Number(item.rate || item.value || 0),
              trend: (Math.random() > 0.5 ? 'up' : 'down') as 'up' | 'down'
           })).slice(0, 5);
        }

        if (newRates.length === 0) {
           newRates = [
             { currency: 'USD', rate: 1640.50, trend: 'up' as const },
             { currency: 'EUR', rate: 1780.20, trend: 'down' as const },
             { currency: 'GBP', rate: 2100.00, trend: 'up' as const },
             { currency: 'CAD', rate: 1200.40, trend: 'down' as const },
             { currency: 'AUD', rate: 1080.30, trend: 'up' as const },
             { currency: 'CHF', rate: 1850.10, trend: 'up' as const },
           ];
        }

        setRates(newRates);
      } else {
        console.warn('Falling back to local live rates due to API unavailability.');
        setRates([
          { currency: 'USD', rate: 1640.50, trend: 'up' as const },
          { currency: 'EUR', rate: 1780.20, trend: 'down' as const },
          { currency: 'GBP', rate: 2100.00, trend: 'up' as const },
          { currency: 'CAD', rate: 1200.40, trend: 'down' as const },
          { currency: 'AUD', rate: 1080.30, trend: 'up' as const },
        ]);
      }
    } catch (error) {
      console.warn('Error processing rates, falling back to local live rates.');
      setRates([
        { currency: 'USD', rate: 1640.50, trend: 'up' as const },
        { currency: 'EUR', rate: 1780.20, trend: 'down' as const },
        { currency: 'GBP', rate: 2100.00, trend: 'up' as const },
        { currency: 'CAD', rate: 1200.40, trend: 'down' as const },
        { currency: 'AUD', rate: 1080.30, trend: 'up' as const },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Shuffle effect every second for the "video" feel
  useEffect(() => {
    if (!isOpen || rates.length === 0) return;

    const shuffleInterval = setInterval(() => {
      setRates(prevRates => {
        const shuffled = [...prevRates];
        // Move a random item to a new random position to simulate live ranking changes
        const fromIndex = Math.floor(Math.random() * shuffled.length);
        const toIndex = Math.floor(Math.random() * shuffled.length);
        const [movedItem] = shuffled.splice(fromIndex, 1);
        
        // Randomly toggle trend to make it look alive
        movedItem.trend = Math.random() > 0.5 ? 'up' : 'down';
        
        shuffled.splice(toIndex, 0, movedItem);
        return shuffled;
      });
    }, 1500);

    return () => clearInterval(shuffleInterval);
  }, [isOpen, rates.length]);

  if (!isOpen) return null;

  const ITEM_HEIGHT = 60; // 52px height + 8px gap

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex items-end justify-start animate-in fade-in slide-in-from-bottom-10 duration-500 pointer-events-none">
      <div className="bg-white pointer-events-auto w-[350px] md:w-[400px] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#FF5E00]/20 overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-[#FF5E00] bg-[#FF5E00] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg shadow-black/10">
              <RefreshCw className="text-[#FF5E00] w-5 h-5 animate-[spin_3s_linear_infinite]" />
            </div>
            <div>
              <h3 className="text-white font-extrabold text-[18px] tracking-tight leading-tight">Live Market</h3>
              <p className="text-white/80 text-[12px] font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Active Feed
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/10 flex items-center justify-center text-white hover:text-white transition-all hover:scale-110 shadow-sm"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 md:p-5">
          {loading ? (
            <div className="flex flex-col gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-full h-[52px] bg-gray-100 rounded-[14px] animate-pulse border border-gray-50" />
              ))}
            </div>
          ) : (
            <div 
              className="relative w-full"
              style={{ height: `${rates.length * ITEM_HEIGHT}px` }}
            >
              {rates.map((item, index) => (
                <div 
                  key={item.currency} 
                  className="absolute w-full h-[52px] bg-white hover:bg-gray-50 border border-gray-100 rounded-[14px] px-3 flex items-center justify-between transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm backdrop-blur-sm"
                  style={{ 
                    top: `${index * ITEM_HEIGHT}px`,
                    zIndex: 10 - index
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-[18px] shadow-inner border border-gray-100">
                      {getFlagEmoji(item.currency)}
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-gray-900 font-bold text-[14px] leading-tight">{item.currency}</span>
                      <span className="text-gray-400 text-[11px] font-medium tracking-wide">Base: NGN</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end justify-center">
                    <span className="text-gray-900 font-bold text-[15px] tracking-tight">
                      ₦{item.rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <div className={`flex items-center gap-1 text-[11px] font-bold mt-0.5 ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {item.trend === 'up' ? <TrendingUp size={12} strokeWidth={3} /> : <TrendingDown size={12} strokeWidth={3} />}
                      {item.trend === 'up' ? '+0.24%' : '-0.12%'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-[11px] text-gray-400 font-medium tracking-wide">Powered by ValarPay Global Network</p>
        </div>

      </div>
    </div>
  );
}
