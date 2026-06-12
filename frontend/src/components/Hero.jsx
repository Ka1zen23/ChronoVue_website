const pillars = [
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="11" cy="8" r="4"/>
        <path d="M3 20c0-4.42 3.58-8 8-8s8 3.58 8 8"/>
        <path d="M8 8h2v-2M10 6v2h2" />
      </svg>
    ),
    label: 'Embed-first methodology',
    sub: 'We study real workflows before writing a line of code.',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="12" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="12" width="7" height="7" rx="1.5"/>
        <rect x="12" y="12" width="7" height="7" rx="1.5"/>
      </svg>
    ),
    label: 'Purpose-built platforms',
    sub: 'Not consulting, not generic tools. Products we own and evolve.',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5">
        <path d="M2 11h4l2-7 5 15 3-8 2-5 2 5"/>
      </svg>
    ),
    label: 'SaaS from day one',
    sub: 'Every product is built to license, scale, and expand nationally.',
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
          Product Studio · Brunei Darussalam
        </div>

        {/* Headline */}
        <h1
          data-reveal
          className="text-[clamp(2.6rem,6vw,5rem)] font-display font-extrabold text-white
            leading-[1.05] tracking-tightest mb-6 max-w-4xl mx-auto"
        >
          We build SaaS that replaces<br />
          <span className="gradient-text">fragmented operational workflows.</span>
        </h1>

        <p
          data-reveal
          className="max-w-xl mx-auto text-[17px] text-white/55 leading-relaxed mb-10"
        >
          ChronoVue is a product studio. We identify sectors where teams still rely on manual,
          fragmented processes to do critical work, then build the platform that replaces them.
        </p>

        {/* CTAs */}
        <div data-reveal className="flex flex-wrap justify-center gap-3 mb-20">
          <a
            href="#case-study"
            data-magnetic="0.2"
            className="btn-shimmer px-7 py-3.5 rounded-xl bg-brand-blue text-white
              font-semibold text-[15px] hover:bg-brand-blue-dk transition-colors
              shadow-lg shadow-brand-blue/25"
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

        {/* Three pillars */}
        <div id="problem">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30 mb-5"
          >
            How we work
          </p>
          <div data-stagger className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto mb-8">
            {pillars.map(p => (
              <div
                key={p.label}
                data-reveal
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-left
                  hover:bg-white/[0.07] hover:border-white/[0.15] transition-all"
              >
                <div className="text-white/40 mb-3">{p.icon}</div>
                <div className="text-[13px] font-semibold text-white/80 mb-1 leading-snug">{p.label}</div>
                <div className="text-[12px] text-white/35 leading-snug">{p.sub}</div>
              </div>
            ))}
          </div>

          <div data-reveal className="flex items-center gap-4 justify-center mb-0">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-white/[0.12]" />
            <span className="text-[12px] font-semibold text-brand-green border border-brand-green/25
              bg-brand-green/10 px-4 py-1.5 rounded-full">
              Healthcare SaaS · Operational Intelligence
            </span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-white/[0.12]" />
          </div>
        </div>
      </div>

    </section>
  );
}
