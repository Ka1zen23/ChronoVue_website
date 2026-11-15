const pillars = [
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="11" cy="8" r="4" />
        <path d="M3 20c0-4.42 3.58-8 8-8s8 3.58 8 8" />
        <path d="M8 8h2v-2M10 6v2h2" />
      </svg>
    ),
    label: 'Embed-first methodology',
    sub: 'We study real workflows before writing a line of code.',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="12" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="12" width="7" height="7" rx="1.5" />
        <rect x="12" y="12" width="7" height="7" rx="1.5" />
      </svg>
    ),
    label: 'Software built for real work',
    sub: 'From web platforms and mobile apps to sensor-connected systems.',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5">
        <path d="M2 11h4l2-7 5 15 3-8 2-5 2 5" />
      </svg>
    ),
    label: 'SaaS from day one',
    sub: 'Every product is built to license, scale, and expand nationally.',
  },
];

export default function HowWeWork() {
  return (
    <section id="problem" className="section-light border-t border-black/[0.06] py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div data-reveal className="text-center mb-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-teal">
            How we work
          </span>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2rem)] font-display font-bold tracking-tight text-brand-navy dark:text-white">
            Built around the work that matters
          </h2>
        </div>

        <div data-stagger className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.label}
              data-reveal
              className="rounded-xl border border-black/[0.07] dark:border-white/[0.09] bg-white dark:bg-brand-navy-mid p-5
                hover:shadow-md transition-all"
            >
              <div className="text-brand-teal mb-3">{pillar.icon}</div>
              <h3 className="text-[14px] font-semibold text-brand-navy dark:text-white mb-1 leading-snug">
                {pillar.label}
              </h3>
              <p className="text-[13px] text-gray-500 dark:text-white/50 leading-snug">
                {pillar.sub}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
