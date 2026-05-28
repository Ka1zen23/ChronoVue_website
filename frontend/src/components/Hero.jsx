import DashboardPreview from './DashboardPreview';

const sources = [
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M13 2H6a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7z"/>
        <polyline points="13 2 13 7 18 7"/>
        <line x1="14" y1="12" x2="8" y2="12"/>
        <line x1="14" y1="16" x2="8" y2="16"/>
      </svg>
    ),
    label: 'Paper census sheets',
    sub: 'Static. Out of date before the shift ends.',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="18" height="18" rx="2"/>
        <line x1="2" y1="8" x2="20" y2="8"/>
        <line x1="2" y1="14" x2="20" y2="14"/>
        <line x1="8" y1="2" x2="8" y2="20"/>
        <line x1="14" y1="2" x2="14" y2="20"/>
      </svg>
    ),
    label: 'Excel files',
    sub: 'Manual entry. Version conflicts every shift.',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="3" width="18" height="13" rx="2"/>
        <line x1="7" y1="19" x2="15" y2="19"/>
        <line x1="11" y1="16" x2="11" y2="19"/>
      </svg>
    ),
    label: 'Whiteboards',
    sub: 'Invisible to every ward except your own.',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M19 13a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z"/>
      </svg>
    ),
    label: 'WhatsApp groups',
    sub: 'Informal, untracked, no audit trail.',
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-navy pt-[62px]">
      {/* Animated grid background */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      {/* Animated glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 text-center pt-20 pb-16">
        {/* Status pill */}
        <div
          data-reveal
          className="inline-flex items-center gap-2.5 text-[13px] font-medium text-white/60
            bg-white/[0.07] border border-white/[0.12] px-4 py-1.5 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-badge-pulse" />
          AMU pilot in progress — ward-by-ward deployment
        </div>

        {/* Headline */}
        <h1
          data-reveal
          className="text-[clamp(2.6rem,6vw,5rem)] font-display font-extrabold text-white
            leading-[1.05] tracking-tightest mb-6 max-w-4xl mx-auto"
        >
          One live view of every ward.<br />
          <span className="gradient-text">No phone calls. No guesswork.</span>
        </h1>

        <p
          data-reveal
          className="max-w-xl mx-auto text-[17px] text-white/55 leading-relaxed mb-10"
        >
          Nurse managers and CSCs currently reconcile four separate data sources
          every shift. FLOW replaces all of them with a single real-time
          dashboard — updated the moment anything changes on any ward.
        </p>

        {/* CTAs */}
        <div data-reveal className="flex flex-wrap justify-center gap-3 mb-20">
          <a
            href="#contact"
            data-magnetic="0.2"
            className="btn-shimmer px-7 py-3.5 rounded-xl bg-brand-blue text-white
              font-semibold text-[15px] hover:bg-brand-blue-dk transition-colors
              shadow-lg shadow-brand-blue/25"
          >
            Apply for Ward Pilot
          </a>
          <a
            href="#features"
            className="px-7 py-3.5 rounded-xl border border-white/[0.15] text-white/80
              font-semibold text-[15px] hover:bg-white/[0.07] hover:border-white/25 transition-all"
          >
            See how it works
          </a>
        </div>

        {/* Four sources */}
        <div id="problem">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30 mb-5"
          >
            Four sources your team reconciles manually — every single shift
          </p>
          <div data-stagger className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8">
            {sources.map(s => (
              <div
                key={s.label}
                data-reveal
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-left
                  hover:bg-white/[0.07] hover:border-white/[0.15] transition-all"
              >
                <div className="text-white/40 mb-3">{s.icon}</div>
                <div className="text-[13px] font-semibold text-white/80 mb-1 leading-snug">{s.label}</div>
                <div className="text-[12px] text-white/35 leading-snug">{s.sub}</div>
              </div>
            ))}
          </div>

          <div data-reveal className="flex items-center gap-4 justify-center mb-0">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-white/[0.12]" />
            <span className="text-[12px] font-semibold text-brand-green border border-brand-green/25
              bg-brand-green/10 px-4 py-1.5 rounded-full">
              FLOW replaces all four
            </span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-white/[0.12]" />
          </div>
        </div>
      </div>

      {/* Dashboard preview — hidden on mobile */}
      <div data-reveal className="relative px-4 pb-16 hidden md:block">
        <DashboardPreview />
      </div>
    </section>
  );
}
