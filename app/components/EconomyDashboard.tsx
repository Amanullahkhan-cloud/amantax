'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function EconomyDashboard() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const indicators = [
    {
      title: 'GDP Growth',
      value: '5.8',
      unit: '%',
      change: '+0.3',
      trend: 'up',
      icon: '📈',
      color: 'emerald',
    },
    {
      title: 'Inflation Rate',
      value: '28.3',
      unit: '%',
      change: '-1.2',
      trend: 'down',
      icon: '💹',
      color: 'red',
    },
    {
      title: 'PKR/USD',
      value: '278.50',
      unit: 'PKR',
      change: '+2.50',
      trend: 'up',
      icon: '💱',
      color: 'red',
    },
    {
      title: 'Policy Rate',
      value: '22.0',
      unit: '%',
      change: '0.0',
      trend: 'neutral',
      icon: '🏦',
      color: 'gray',
    },
    {
      title: 'KSE-100',
      value: '78,450',
      unit: 'pts',
      change: '+850',
      trend: 'up',
      icon: '📊',
      color: 'emerald',
    },
    {
      title: 'Forex Reserves',
      value: '13.2',
      unit: 'B USD',
      change: '+0.5',
      trend: 'up',
      icon: '💰',
      color: 'emerald',
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.indicator-card');
    const values = sectionRef.current.querySelectorAll('.indicator-value');

    // Animate cards on scroll
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    // Animate counter values
    values.forEach((valueEl) => {
      const target = valueEl.getAttribute('data-value');
      if (!target) return;

      const numericValue = parseFloat(target.replace(/,/g, ''));
      if (isNaN(numericValue)) return;

      gsap.fromTo(
        valueEl,
        { textContent: 0 },
        {
          textContent: numericValue,
          duration: 2,
          snap: { textContent: numericValue > 1000 ? 1 : 0.1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          onUpdate: function () {
            const current = parseFloat(this.targets()[0].textContent);
            if (numericValue > 1000) {
              valueEl.textContent = current.toLocaleString('en-US');
            } else {
              valueEl.textContent = current.toFixed(1);
            }
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-400/10 text-emerald-400 text-sm font-medium mb-4">
            LIVE INDICATORS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Pakistan Economy
            <span className="emerald-gradient-text"> Dashboard</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real-time economic indicators and key metrics from Pakistan's financial landscape
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indicators.map((indicator, index) => (
            <div
              key={index}
              className="indicator-card glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{indicator.icon}</span>
                  <h3 className="text-gray-400 text-sm font-medium">{indicator.title}</h3>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    indicator.trend === 'up'
                      ? 'bg-emerald-400/10 text-emerald-400'
                      : indicator.trend === 'down'
                      ? 'bg-red-400/10 text-red-400'
                      : 'bg-gray-400/10 text-gray-400'
                  }`}
                >
                  {indicator.change}
                </div>
              </div>

              {/* Value */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`indicator-value text-4xl font-bold ${
                      indicator.color === 'emerald'
                        ? 'text-emerald-400'
                        : indicator.color === 'red'
                        ? 'text-red-400'
                        : 'text-white'
                    }`}
                    data-value={indicator.value}
                  >
                    {indicator.value}
                  </span>
                  <span className="text-gray-500 text-lg">{indicator.unit}</span>
                </div>
              </div>

              {/* Mini Chart SVG */}
              <div className="h-12 opacity-60 group-hover:opacity-100 transition-opacity">
                <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path
                    d={
                      indicator.trend === 'up'
                        ? 'M 0 25 Q 25 20 50 15 T 100 5'
                        : indicator.trend === 'down'
                        ? 'M 0 5 Q 25 10 50 15 T 100 25'
                        : 'M 0 15 Q 25 12 50 15 T 100 15'
                    }
                    fill="none"
                    stroke={
                      indicator.color === 'emerald'
                        ? '#34D399'
                        : indicator.color === 'red'
                        ? '#EF4444'
                        : '#9CA3AF'
                    }
                    strokeWidth="2"
                    className="opacity-50"
                  />
                  <path
                    d={
                      indicator.trend === 'up'
                        ? 'M 0 25 Q 25 20 50 15 T 100 5 L 100 30 L 0 30 Z'
                        : indicator.trend === 'down'
                        ? 'M 0 5 Q 25 10 50 15 T 100 25 L 100 30 L 0 30 Z'
                        : 'M 0 15 Q 25 12 50 15 T 100 15 L 100 30 L 0 30 Z'
                    }
                    fill={
                      indicator.color === 'emerald'
                        ? 'url(#emerald-gradient)'
                        : indicator.color === 'red'
                        ? 'url(#red-gradient)'
                        : 'url(#gray-gradient)'
                    }
                    className="opacity-20"
                  />
                  <defs>
                    <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#34D399" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="red-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gray-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-gray-600 text-sm mt-8">
          * Indicative values for demonstration purposes. For official data, please refer to SBP and PBS.
        </p>
      </div>
    </section>
  );
}
