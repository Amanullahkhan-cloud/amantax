'use client';

import { useEffect, useRef } from 'react';

export default function FinanceNewsBanner() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const newsItems = [
    {
      title: 'SBP keeps policy rate unchanged at 22% amid stable inflation outlook',
      source: 'Dawn Business',
      time: '2 hours ago',
      url: '#',
    },
    {
      title: 'PKR strengthens to 278.50 against USD as remittances surge to $3.2B',
      source: 'The Express Tribune',
      time: '4 hours ago',
      url: '#',
    },
    {
      title: 'KSE-100 index hits new high of 78,450 points on strong investor sentiment',
      source: 'Business Recorder',
      time: '5 hours ago',
      url: '#',
    },
    {
      title: 'Pakistan\'s foreign reserves increase by $500M, now at $13.2 billion',
      source: 'Profit',
      time: '6 hours ago',
      url: '#',
    },
    {
      title: 'FBR announces new simplified tax filing system for SMEs',
      source: 'Dawn Business',
      time: '8 hours ago',
      url: '#',
    },
    {
      title: 'IT exports reach $3.2B, showing 24% year-on-year growth',
      source: 'The News',
      time: '10 hours ago',
      url: '#',
    },
    {
      title: 'IMF delegation arrives in Islamabad for ninth review of $3B program',
      source: 'Business Recorder',
      time: '12 hours ago',
      url: '#',
    },
    {
      title: 'Government announces Rs. 50B agriculture support package for farmers',
      source: 'Express Tribune',
      time: '14 hours ago',
      url: '#',
    },
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let isPaused = false;

    const handleMouseEnter = () => {
      isPaused = true;
      if (marquee) {
        marquee.style.animationPlayState = 'paused';
      }
    };

    const handleMouseLeave = () => {
      isPaused = false;
      if (marquee) {
        marquee.style.animationPlayState = 'running';
      }
    };

    marquee.addEventListener('mouseenter', handleMouseEnter);
    marquee.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      marquee.removeEventListener('mouseenter', handleMouseEnter);
      marquee.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-6 bg-gradient-to-r from-emerald-900/20 via-black to-emerald-900/20 border-y border-emerald-400/20 overflow-hidden">
      <div className="flex items-center gap-4 mb-2 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">
            Breaking News
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
      </div>

      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Scrolling News */}
        <div ref={marqueeRef} className="flex animate-marquee-slow hover:cursor-pointer">
          {/* First set */}
          {newsItems.map((item, index) => (
            <a
              key={`first-${index}`}
              href={item.url}
              className="flex-shrink-0 mx-8 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4 px-6 py-3 rounded-lg bg-white/5 hover:bg-emerald-400/10 transition-all duration-300 border border-white/10 hover:border-emerald-400/30">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  <span className="text-white font-medium group-hover:text-emerald-400 transition-colors whitespace-nowrap">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-emerald-400/70">{item.source}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">{item.time}</span>
                </div>
              </div>
            </a>
          ))}
          {/* Second set for seamless loop */}
          {newsItems.map((item, index) => (
            <a
              key={`second-${index}`}
              href={item.url}
              className="flex-shrink-0 mx-8 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4 px-6 py-3 rounded-lg bg-white/5 hover:bg-emerald-400/10 transition-all duration-300 border border-white/10 hover:border-emerald-400/30">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  <span className="text-white font-medium group-hover:text-emerald-400 transition-colors whitespace-nowrap">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-emerald-400/70">{item.source}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">{item.time}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
