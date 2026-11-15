import { useEffect, useState } from 'react';

const heroTerms = ['SaaS', 'Mobile Apps', 'E-commerce', 'AI CRM', 'Sensor Systems'];

export default function Hero() {
  const [term, setTerm] = useState('SaaS');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let wordIndex = 0;
    let deleting = false;
    let currentTerm = 'SaaS';
    let timer;

    const animate = () => {
      const word = heroTerms[wordIndex];
      if (!deleting) {
        currentTerm = word.slice(0, currentTerm.length + 1);
        setTerm(currentTerm);
        if (currentTerm.length === word.length) {
          deleting = true;
          timer = window.setTimeout(animate, 1150);
          return;
        }
      } else {
        currentTerm = word.slice(0, Math.max(0, currentTerm.length - 1));
        setTerm(currentTerm);
        if (currentTerm.length === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % heroTerms.length;
        }
      }
      timer = window.setTimeout(animate, deleting ? 48 : 92);
    };

    timer = window.setTimeout(animate, 1300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section data-hero className="relative overflow-hidden bg-brand-navy pt-[62px]">
      {/* Animated grid background */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      {/* Animated glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      {/* Diamond accent decorations — from company profile cover visual language */}
      <div
        className="absolute pointer-events-none"
        style={{ top: '-80px', right: '-80px', width: '320px', height: '320px',
          border: '1px solid rgba(0,180,216,0.12)', transform: 'rotate(45deg)' }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ top: '-30px', right: '-30px', width: '180px', height: '180px',
          border: '1px solid rgba(6,214,160,0.09)', transform: 'rotate(45deg)' }}
      />
      <div
        className="absolute pointer-events-none bg-brand-teal/[0.06]"
        style={{ bottom: '60px', left: '4%', width: '48px', height: '48px', transform: 'rotate(45deg)' }}
      />

      <div className="relative max-w-6xl mx-auto px-6 text-center pt-20 pb-16">
        {/* Status pill */}
        <div
          data-reveal
          className="inline-flex items-center gap-2.5 text-[13px] font-medium text-white/60
            bg-white/[0.07] border border-white/[0.12] px-4 py-1.5 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-badge-pulse" />
          Software Company from Brunei Darussalam
        </div>

        {/* Headline */}
        <h1
          data-reveal
          className="text-[clamp(2.6rem,6vw,5rem)] font-display font-extrabold text-white
            leading-[1.05] tracking-tightest mb-6 max-w-4xl mx-auto"
        >
          We build{' '}
          <span
            className="inline-block w-[10ch] sm:w-[14ch] whitespace-nowrap text-center gradient-text"
            aria-label="SaaS, mobile apps, e-commerce, AI CRM, and sensor systems"
          >
            <span aria-hidden="true">{term}</span>
            <span className="ml-0.5 inline-block h-[0.82em] w-[2px] translate-y-[0.08em] bg-brand-teal animate-pulse" aria-hidden="true" />
          </span>
          <br />
          <span className="gradient-text">for real-world work.</span>
        </h1>

        <p
          data-reveal
          className="max-w-xl mx-auto text-[17px] text-white/55 leading-relaxed mb-10"
        >
          ChronoVue is a software company building SaaS, mobile apps, e-commerce, AI-powered
          WhatsApp CRM, and sensor-connected systems for real-world needs.
        </p>

        {/* CTAs */}
        <div data-reveal className="flex flex-wrap justify-center gap-3">
          <a
            href="#case-study"
            data-magnetic="0.2"
            className="btn-shimmer px-7 py-3.5 rounded-xl bg-brand-navy text-white
              font-semibold text-[15px] hover:bg-brand-navy-mid transition-colors
              shadow-lg shadow-brand-navy/20"
          >
            See Our Work
          </a>
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-xl border border-white/[0.15] text-white/80
              font-semibold text-[15px] hover:bg-white/[0.07] hover:border-white/25 transition-all"
          >
            Talk to Us
          </a>
        </div>

      </div>

    </section>
  );
}
