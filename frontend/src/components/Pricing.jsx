import { SectionHeader } from './Features';

const phases = [
  {
    phase: 'Phase 1',
    title: 'Ward Pilot',
    status: 'active',
    statusLabel: 'AMU live now',
    sub: 'One ward at a time',
    description: 'FLOW is deployed one ward at a time — starting with the AMU. Each ward pilot runs as a paid engagement. We deploy, train, observe, and refine before moving to the next ward.',
    includes: [
      'Full FLOW deployment — bed map, queue, flow phases',
      'On-site setup and LAN configuration by Team Cekap',
      'Ward terminal, CSC dashboard, and mobile companion',
      'Dedicated support throughout the pilot period',
      'Pilot evaluation report with usage data and findings',
    ],
    cta: 'Apply for Your Ward',
    ctaStyle: 'bg-brand-navy text-white hover:bg-brand-navy-mid',
    featured: true,
  },
  {
    phase: 'Phase 2',
    title: 'Hospital License',
    status: 'next',
    statusLabel: 'After pilot',
    sub: 'All wards · Recurring license',
    description: 'After successful ward pilots, expand FLOW to the entire hospital on a recurring per-hospital license. EHR integration layer activates in this phase — removing the manual input burden entirely.',
    includes: [
      'All wards on a single annual license',
      'EHR integration — automated patient status sync',
      'Multi-ward expansion and configuration support',
      'Priority support SLA',
      'MOH reporting automation',
    ],
    cta: 'Talk to Us',
    ctaStyle: 'border border-brand-navy/20 text-brand-navy hover:bg-brand-navy/[0.04]',
  },
  {
    phase: 'Phase 3',
    title: 'National Network',
    status: 'future',
    statusLabel: 'Roadmap',
    sub: 'Cross-hospital visibility',
    description: 'FLOW licensed as a national operational visibility layer across Brunei\'s hospital network. A single dashboard for the Ministry of Health to see bed availability and patient flow nationally.',
    includes: [
      'Cross-hospital bed availability view',
      'Inter-hospital transfer coordination',
      'Centralised MOH reporting',
      'National patient flow analytics',
      'Long-term institutional partnership',
    ],
    cta: 'Express Interest',
    ctaStyle: 'border border-black/[0.1] text-gray-500 hover:border-brand-navy/20 hover:text-brand-navy',
  },
];

const STATUS_STYLE = {
  active: 'bg-brand-green/10 text-brand-green border-brand-green/25',
  next:   'bg-amber-500/10 text-amber-600 border-amber-400/25',
  future: 'bg-gray-100 text-gray-400 border-gray-200',
};

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 bg-gray-50 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Deployment Model"
          title="Ward by ward. Then hospital-wide. Then national."
          sub="FLOW doesn't do big-bang rollouts. Every ward gets its own dedicated pilot before we expand. This is how you build something that actually sticks in a clinical environment."
        />

        <div data-stagger className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {phases.map((plan) => (
            <div
              key={plan.phase}
              data-reveal
              className={`feature-card rounded-2xl p-8 relative
                ${plan.featured
                  ? 'bg-white border-2 border-brand-navy shadow-xl shadow-brand-navy/[0.08] scale-[1.02]'
                  : 'bg-white border border-black/[0.07]'}`}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400">
                  {plan.phase}
                </span>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLE[plan.status]}`}>
                  {plan.statusLabel}
                </span>
              </div>

              <h3 className="text-[22px] font-display font-bold text-brand-navy tracking-tight mb-1">
                {plan.title}
              </h3>
              <p className="text-[12px] text-gray-400 mb-4">{plan.sub}</p>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-6">{plan.description}</p>

              <ul className="flex flex-col gap-2.5 mb-8">
                {plan.includes.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-gray-600">
                    <svg className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" opacity=".4"/>
                      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#contact"
                className={`block text-center py-3 rounded-xl font-semibold text-[14px] transition-all ${plan.ctaStyle}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p data-reveal className="text-center text-[13px] text-gray-400 mt-10">
          Team Cekap is also seeking EHR integration partners and healthcare IT procurement mentors.{' '}
          <a href="#contact" className="text-brand-blue hover:underline font-medium">Get in touch</a>
        </p>
      </div>
    </section>
  );
}
