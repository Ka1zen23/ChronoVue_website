// Company Profile section — visual language from the 2026 ChronoVue covers.
// Light variant: cream #F5F4EF bg, animated topographic lines (TopographicLines),
// teal diamond outlines, solid navy/teal accent diamonds.

import TopographicLines from './TopographicLines';

export default function CompanyProfile() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#F5F4EF' }}>

      {/* === Animated topographic lines (light variant) === */}
      <TopographicLines />

      {/* === Large diamond outline — top-left (matches cover's big hollow diamond) === */}
      <div
        className="absolute pointer-events-none"
        style={{ top: '-120px', left: '-120px', width: '380px', height: '380px',
          border: '1.5px solid rgba(0,180,216,0.28)', transform: 'rotate(45deg)' }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ top: '-60px', left: '-60px', width: '260px', height: '260px',
          border: '1px solid rgba(0,180,216,0.14)', transform: 'rotate(45deg)' }}
      />

      {/* === Small solid diamonds — bottom-right (matches cover accent) === */}
      <div
        className="absolute pointer-events-none"
        style={{ bottom: '-30px', right: '-30px', width: '96px', height: '96px',
          background: 'rgba(10,22,40,0.80)', transform: 'rotate(45deg)' }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ bottom: '40px', right: '80px', width: '36px', height: '36px',
          background: 'rgba(0,180,216,0.22)', transform: 'rotate(45deg)' }}
      />

      {/* === Content === */}
      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* Left: editorial text */}
          <div data-reveal className="max-w-lg">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-brand-navy/40 mb-5">
              2026 · Brunei Darussalam
            </p>
            <h2
              className="font-display font-black uppercase text-brand-navy leading-[0.88] mb-6"
              style={{ fontSize: 'clamp(3rem,6.5vw,5.2rem)', letterSpacing: '-0.03em' }}
            >
              Company<br />Profile
            </h2>
            <p className="text-[15px] text-brand-navy/55 leading-relaxed mb-8 max-w-sm">
              Our studio, our team, our first product FLOW, and our roadmap
              for digital transformation in Brunei&rsquo;s healthcare sector.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:support@chronovue.co?subject=Company Profile Request"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl
                  bg-brand-navy text-white font-semibold text-[14px]
                  hover:bg-brand-navy-mid transition-colors shadow-md shadow-brand-navy/20"
              >
                <EnvelopeIcon />
                Request a Copy
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                  border border-brand-navy/20 text-brand-navy font-semibold text-[14px]
                  hover:bg-brand-navy/[0.06] transition-colors"
              >
                Talk to Us
              </a>
            </div>
          </div>

          {/* Right: stacked cover preview cards */}
          <div data-reveal className="relative shrink-0 self-center" style={{ width: '260px', height: '340px' }}>

            {/* Dark cover — behind, offset bottom-right */}
            <div
              className="absolute overflow-hidden rounded-2xl bg-brand-navy shadow-2xl"
              style={{ bottom: 0, right: 0, width: '220px', height: '285px' }}
            >
              {/* Dark cover: animated topo lines */}
              <TopographicLines dark />
              <div
                className="absolute pointer-events-none border border-brand-teal/25"
                style={{ top: '-24px', right: '-24px', width: '80px', height: '80px', transform: 'rotate(45deg)' }}
              />
              <div
                className="absolute pointer-events-none bg-brand-green/30"
                style={{ bottom: '18px', left: '18px', width: '22px', height: '22px', transform: 'rotate(45deg)' }}
              />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-[6.5px] font-bold uppercase tracking-[0.18em] text-white/35 mb-0.5">
                  ChronoVue
                </div>
                <div className="text-[11px] font-black uppercase tracking-tight text-white leading-[1.1]">
                  Company<br />Profile
                </div>
                <div className="text-[5.5px] font-medium uppercase tracking-widest text-white/25 mt-1.5">
                  2026 · Brunei Darussalam
                </div>
              </div>
            </div>

            {/* Light cover — front, offset top-left */}
            <div
              className="absolute overflow-hidden rounded-2xl border border-brand-navy/10 shadow-xl"
              style={{ top: 0, left: 0, width: '220px', height: '285px', background: '#F5F4EF' }}
            >
              {/* Light cover: animated topo lines */}
              <TopographicLines />
              <div
                className="absolute pointer-events-none border border-brand-teal/35"
                style={{ top: '-28px', left: '-28px', width: '90px', height: '90px', transform: 'rotate(45deg)' }}
              />
              <div
                className="absolute pointer-events-none bg-brand-navy/75"
                style={{ bottom: '16px', right: '16px', width: '20px', height: '20px', transform: 'rotate(45deg)' }}
              />
              {/* Mini logo mark */}
              <div className="absolute top-5 right-5">
                <div className="w-6 h-6 rounded bg-brand-navy/10 flex items-center justify-center">
                  <div className="w-3 h-3 border border-brand-navy/40" style={{ transform: 'rotate(45deg)' }} />
                </div>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-[6.5px] font-bold uppercase tracking-[0.18em] text-brand-navy/40 mb-0.5">
                  ChronoVue
                </div>
                <div className="text-[11px] font-black uppercase tracking-tight text-brand-navy leading-[1.1]">
                  Company<br />Profile
                </div>
                <div className="text-[5.5px] font-medium uppercase tracking-widest text-brand-navy/35 mt-1.5">
                  2026 · Brunei Darussalam
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom label strip */}
      <div className="relative border-t border-brand-navy/[0.08]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-navy/35">
            2026 ChronoVue Company Profile
          </p>
          <p className="text-[10px] font-medium text-brand-navy/30 tracking-wide">
            Brunei Darussalam
          </p>
        </div>
      </div>
    </section>
  );
}

function EnvelopeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="14" height="10" rx="1.5" />
      <path d="M1 4l7 5 7-5" />
    </svg>
  );
}
