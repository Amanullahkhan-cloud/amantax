'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import Navbar from './components/Navbar';
import ShinyButton from './components/ShinyButton';
import { ServiceCard, StatCard, TestimonialCard } from './components/GlassCard';
import ClientLogos from './components/ClientLogos';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

// Dynamic import for Three.js component to avoid SSR issues
const HeroBackground = dynamic(() => import('./components/HeroBackground'), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

// Icons as components
const TaxIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const CorporateIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const WealthIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const NTNIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
  </svg>
);

const AuditIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const ComplianceIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const services = [
  {
    icon: <TaxIcon />,
    title: 'Tax Filing & Returns',
    description: 'Complete tax return preparation and filing for individuals and businesses. Maximize your refunds with expert guidance.',
  },
  {
    icon: <CorporateIcon />,
    title: 'Corporate Tax Planning',
    description: 'Strategic tax planning to minimize your corporate tax liability while ensuring full compliance with Pakistani tax laws.',
  },
  {
    icon: <WealthIcon />,
    title: 'Wealth Management',
    description: 'Comprehensive wealth advisory including inheritance tax planning, asset protection, and investment tax optimization.',
  },
  {
    icon: <NTNIcon />,
    title: 'NTN Registration',
    description: 'Fast and hassle-free National Tax Number registration for new taxpayers. Get registered within 24 hours.',
  },
  {
    icon: <AuditIcon />,
    title: 'Audit Support',
    description: 'Complete representation during FBR audits. We handle all documentation and communications on your behalf.',
  },
  {
    icon: <ComplianceIcon />,
    title: 'FBR Compliance',
    description: 'Ensure full compliance with Federal Board of Revenue regulations. We keep you updated on all tax law changes.',
  },
];

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '5,000+', label: 'Clients Served' },
  { value: 'PKR 500M+', label: 'Tax Saved' },
  { value: '99%', label: 'Client Satisfaction' },
];

const testimonials = [
  {
    quote: 'AmaanTax saved our company millions in taxes through their strategic planning. Their expertise in corporate tax law is unmatched.',
    author: 'Ahmed Khan',
    company: 'CEO, Tech Solutions Pvt Ltd',
    rating: 5,
  },
  {
    quote: 'Professional, reliable, and always available. They handled our FBR audit flawlessly and we had zero issues.',
    author: 'Fatima Malik',
    company: 'Director, Malik Industries',
    rating: 5,
  },
  {
    quote: 'Getting my NTN was a breeze with AmaanTax. They completed everything in less than 24 hours. Highly recommended!',
    author: 'Hassan Raza',
    company: 'Freelance Consultant',
    rating: 5,
  },
  {
    quote: 'Their wealth management advice helped us structure our assets efficiently. Truly invaluable partners for any business.',
    author: 'Sara Ahmed',
    company: 'CFO, Sunrise Enterprises',
    rating: 5,
  },
];

const whyChooseUs = [
  {
    title: 'Expert Team',
    description: 'Certified tax professionals with decades of combined experience in Pakistani tax law.',
    icon: '👨‍💼',
  },
  {
    title: 'FBR Registered',
    description: 'Officially registered with the Federal Board of Revenue as authorized tax consultants.',
    icon: '✓',
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock assistance for urgent tax matters and deadline compliance.',
    icon: '🕐',
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees. Clear pricing structure with detailed service breakdowns.',
    icon: '💰',
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const whyUsRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Hero animations
    gsap.fromTo(
      '.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    gsap.fromTo(
      '.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );
    gsap.fromTo(
      '.hero-cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
    );

    // Services section animations
    gsap.fromTo(
      '.service-card',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
        },
      }
    );

    // Stats section animations
    gsap.fromTo(
      '.stat-card',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
      }
    );

    // Why choose us animations
    gsap.fromTo(
      '.why-card',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: whyUsRef.current,
          start: 'top 80%',
        },
      }
    );

    // Testimonials animations
    gsap.fromTo(
      '.testimonial-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top 80%',
        },
      }
    );

    // Section headers animations
    gsap.utils.toArray('.section-header').forEach((el) => {
      gsap.fromTo(
        el as Element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el as Element,
            start: 'top 85%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <HeroBackground />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-400/10 text-emerald-400 text-sm font-medium mb-8 hero-title">
            PAKISTAN&apos;S TRUSTED TAX EXPERTS
          </span>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight hero-title">
            Professional Tax Solutions
            <br />
            <span className="emerald-gradient-text">For Pakistan</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 hero-subtitle">
            Simplify your taxes with Pakistan&apos;s leading tax consultancy. 
            From NTN registration to corporate tax planning, we handle it all.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center hero-cta">
            <ShinyButton href="#contact">
              Book Free Consultation
            </ShinyButton>
            <ShinyButton href="#services" variant="secondary">
              Explore Services
            </ShinyButton>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogos />

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 section-header">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-400/10 text-emerald-400 text-sm font-medium mb-4">
              OUR SERVICES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Tax
              <br />
              <span className="emerald-gradient-text">Solutions</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From individual tax filing to complex corporate tax strategies, 
              we provide end-to-end tax services tailored for Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                className="service-card"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="section-padding bg-gradient-to-b from-black via-emerald-950/10 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                className="stat-card"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" ref={whyUsRef} className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="section-header">
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-400/10 text-emerald-400 text-sm font-medium mb-4">
                WHY CHOOSE US
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Pakistan&apos;s Most Trusted
                <br />
                <span className="emerald-gradient-text">Tax Consultants</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                With over 15 years of experience, we&apos;ve helped thousands of individuals 
                and businesses navigate the complexities of Pakistani tax law. Our team 
                of certified professionals is committed to your financial success.
              </p>
              <ShinyButton href="#contact">
                Get Started Today
              </ShinyButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="glass-card p-6 why-card">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 section-header">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-400/10 text-emerald-400 text-sm font-medium mb-4">
              TESTIMONIALS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Clients
              <br />
              <span className="emerald-gradient-text">Say About Us</span>
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                company={testimonial.company}
                rating={testimonial.rating}
                className="testimonial-card"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
