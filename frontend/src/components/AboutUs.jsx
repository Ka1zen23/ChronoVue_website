const principles = [
  {
    accent: 'text-brand-blue bg-brand-blue/8 border-brand-blue/15',
    icon: <EmbedIcon />,
    title: 'We embed before we build',
    body: 'Site walkthroughs, empathy mapping, direct observation. We study the real workflow before touching a line of code. This is what keeps our products from becoming shelfware.',
  },
  {
    accent: 'text-emerald-600 bg-emerald-500/8 border-emerald-500/15',
    icon: <PlatformIcon />,
    title: 'We build platforms, not features',
    body: "We don't consult. We own what we build. Each product is a purpose-built platform designed to eliminate a specific operational pain, not a feature bolted onto a generic tool.",
  },
  {
    accent: 'text-violet-600 bg-violet-500/8 border-violet-500/15',
    icon: <ScaleIcon />,
    title: 'We design for national scale',
    body: 'From day one, every product is architected as a SaaS business: licensable per organisation, expandable across regions, and built to grow beyond its first deployment.',
  },
];

const disciplines = [
  { label: 'Software Engineering', sub: 'Platform architecture, backend, EHR integration' },
  { label: 'Data Analytics', sub: 'Dashboard design, reporting, historical analysis' },
  { label: 'Nursing & Midwifery', sub: 'Clinical workflow expertise, user testing, adoption' },
  { label: 'Public Health', sub: 'System-level thinking, national expansion strategy' },
];

export default function AboutUs() {
  return (
    <section id="about" className="py-28 bg-white border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1
            rounded-full mb-5 bg-brand-blue/10 text-brand-blue border border-brand-blue/15">
            What We Are
          </span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.6rem)] font-display font-extrabold
            tracking-tight mb-4 leading-tight text-brand-navy">
            A product studio with clinical depth
          </h2>
          <p className="text-[15px] leading-relaxed text-gray-500">
            ChronoVue combines software engineers, data analysts, nurses, and public health
            researchers. We don't just build software; we embed with the teams doing the real
            work, map their actual workflows, and build the platform that eliminates the friction.
          </p>
        </div>

        {/* Principles */}
        <div data-stagger className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {principles.map(p => (
            <div
              key={p.title}
              data-reveal
              className="rounded-2xl border border-black/[0.07] p-7 bg-white
                hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 border ${p.accent}`}>
                {p.icon}
              </div>
              <h3 className="text-[16px] font-bold tracking-tight mb-2 text-brand-navy">{p.title}</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Disciplines + Mission */}
        <div data-stagger className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Disciplines */}
          <div data-reveal className="rounded-2xl border border-black/[0.07] p-8 bg-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400 mb-6">
              Team disciplines
            </p>
            <div className="flex flex-col gap-4">
              {disciplines.map(d => (
                <div key={d.label} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0 mt-[7px]" />
                  <div>
                    <div className="text-[14px] font-semibold text-brand-navy">{d.label}</div>
                    <div className="text-[13px] text-gray-400 leading-snug">{d.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission quote */}
          <div data-reveal className="rounded-2xl bg-brand-navy text-white p-8 flex flex-col justify-between">
            <div className="text-brand-green/30 font-display font-bold text-6xl leading-none mb-2 -mt-2">
              &ldquo;
            </div>
            <p className="text-[17px] font-semibold leading-relaxed text-white/90 -mt-4 mb-6">
              We exist to eliminate the synthesis cost: the hidden toll paid every shift by teams
              manually assembling critical information from too many disconnected sources.
            </p>
            <div>
              <div className="h-px bg-white/[0.1] mb-5" />
              <span className="text-[11px] text-white/35 uppercase tracking-[0.14em]">
                Team ChronoVue, Brunei Darussalam
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmbedIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="10" cy="6.5" r="3"/>
      <path d="M3 18c0-3.87 3.13-6 7-6s7 2.13 7 6"/>
      <path d="M10 3.5v1.5M10 8v1.5" strokeLinejoin="round"/>
    </svg>
  );
}
function PlatformIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="2" width="7" height="7" rx="1.5"/>
      <rect x="11" y="2" width="7" height="7" rx="1.5"/>
      <rect x="2" y="11" width="7" height="7" rx="1.5"/>
      <rect x="11" y="11" width="7" height="7" rx="1.5"/>
    </svg>
  );
}
function ScaleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M2 10h3l2-6 4 13 2-7h5"/>
    </svg>
  );
}
