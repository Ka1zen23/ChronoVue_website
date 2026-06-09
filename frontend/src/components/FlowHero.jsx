const sources = [
  { label: 'Paper census sheets', sub: 'Static. Out of date before the shift ends.' },
  { label: 'Excel files', sub: 'Manual entry. Version conflicts every shift.' },
  { label: 'Whiteboards', sub: 'Invisible to every ward except your own.' },
  { label: 'WhatsApp groups', sub: 'Informal, untracked, no audit trail.' },
];

export default function FlowHero() {
  return (
    <section className="relative overflow-hidden bg-brand-navy pt-[62px]">
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20">
        {/* Breadcrumb */}
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/60
            text-[13px] mb-10 transition-colors group"
        >
          <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 14 14"
            fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M9 2L4 7l5 5"/>
          </svg>
          ChronoVue
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <div>
            <div
              data-reveal
              className="inline-flex items-center gap-2.5 text-[13px] font-medium text-white/60
                bg-white/[0.07] border border-white/[0.12] px-4 py-1.5 rounded-full mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-badge-pulse" />
              Case Study · Brunei Darussalam
            </div>

            <h1
              data-reveal
              className="text-[clamp(2.4rem,5vw,4rem)] font-display font-extrabold text-white
                leading-[1.05] tracking-tightest mb-5"
            >
              FLOW<br />
              <span className="gradient-text">Hospital Operational Visibility</span>
            </h1>

            <p data-reveal className="text-[16px] text-white/55 leading-relaxed mb-8">
              Brunei's hospital teams were reconciling four separate data sources every shift
              to manage patient movement and bed availability. We built FLOW to replace all of
              them with a single real-time view.
            </p>

            <div data-reveal className="flex flex-wrap gap-5">
              {[
                { value: '4', label: 'Sources replaced' },
                { value: '0', label: 'Phone calls to check beds' },
                { value: '1', label: 'Live view for every CSC' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-[2rem] font-display font-extrabold text-white leading-none">
                    {s.value}
                  </div>
                  <div className="text-[12px] text-white/40 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — problem cards */}
          <div data-reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/25 mb-4">
              The four sources we replaced
            </p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {sources.map(s => (
                <div
                  key={s.label}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4
                    hover:bg-white/[0.07] transition-all"
                >
                  <div className="text-[13px] font-semibold text-white/80 mb-1">{s.label}</div>
                  <div className="text-[12px] text-white/35 leading-snug">{s.sub}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.12]" />
              <span className="text-[12px] font-semibold text-brand-green border border-brand-green/25
                bg-brand-green/10 px-4 py-1.5 rounded-full whitespace-nowrap">
                FLOW replaces all four
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.12]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
