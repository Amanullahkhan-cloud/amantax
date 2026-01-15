'use client';

import Image from 'next/image';

export default function ClientLogos() {
  const clients = [
    { name: 'Pakistan State Oil', logo: '/logos/pso.svg' },
    { name: 'Habib Bank', logo: '/logos/hbl.svg' },
    { name: 'Engro Corporation', logo: '/logos/engro.svg' },
    { name: 'Lucky Cement', logo: '/logos/lucky.svg' },
    { name: 'K-Electric', logo: '/logos/ke.svg' },
    { name: 'Fauji Foundation', logo: '/logos/fauji.svg' },
    { name: 'Packages Limited', logo: '/logos/packages.svg' },
    { name: 'Jazz Telecom', logo: '/logos/jazz.svg' },
    { name: 'National Bank', logo: '/logos/nbp.svg' },
    { name: 'PTCL', logo: '/logos/ptcl.svg' },
  ];

  return (
    <section className="py-16 border-y border-white/5 overflow-hidden bg-black/50">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <p className="text-center text-gray-500 text-sm uppercase tracking-widest">
          Trusted by Leading Pakistani Companies
        </p>
      </div>
      
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
        
        {/* Marquee Container */}
        <div className="flex animate-marquee">
          {/* First Set */}
          {clients.map((client, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-6 flex items-center justify-center"
            >
              <div className="group px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/30 hover:bg-white/10 transition-all duration-300">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={140}
                  height={50}
                  className="opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                />
              </div>
            </div>
          ))}
          {/* Duplicate Set for Seamless Loop */}
          {clients.map((client, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-6 flex items-center justify-center"
            >
              <div className="group px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/30 hover:bg-white/10 transition-all duration-300">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={140}
                  height={50}
                  className="opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
