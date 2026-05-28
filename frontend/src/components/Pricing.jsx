import { SectionHeader } from './Features';

const stages = [
  {
    stage: 'Phase 1',
    title: 'Paid Pilot',
    status: 'now',
    statusLabel: 'Now Open',
    sub: 'AMU-scale deployment · Single site',
    description: 'Run FLOW in your Acute Medical Unit or equivalent high-throughput ward. Team Cekap provides full on-site deployment, training, and support throughout the pilot period.',
    includes: [
      'Full FLOW platform — bed map, queue, flow phases',
      'On-site deployment by Team Cekap',
      'Ward terminal + CSC central dashboard + mobile companion',
      'Dedicated support throughout pilot period',
      'Pilot evaluation report at conclusion',
    ],
    cta: 'Apply for a Pilot',
    ctaHref: '#contact',
    ctaStyle: 'bg-brand-blue text-white hover:bg-brand-blue-dk shadow-md',
    featured: true,
  },
  {
    stage: 'Phase 2',
    title: 'Per-Hospital License',
    status: 'next',
    statusLabel: 'After Pilot',
    sub: 'Full hospital · Recurring SaaS license',
    description: 'Following a successful pilot, expand FLOW across all wards on a recurring per-hospital license. Scales with the number of wards and beds.',
    includes: [
      'All wards on a single license',
      'EHR integration (automated status sync)',
      'Multi-ward expansion support',
      'Priority support SLA',
      'Custom reporting for MOH submissions',
    ],
    cta: 'Talk to Us',
    ctaHref: '#contact',
    ctaStyle: 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue-lt',
  },
  {
    stage: 'Phase 3',
    title: 'National Network',
    status: 'future',
    statusLabel: 'Roadmap',
    sub: 'Multi-hospital · National expansion',
    description: 'FLOW licensed across Brunei\'s hospital network. A shared operational visibility layer for the national healthcare system — from AMU to every ward in every facility.',
    includes: [
      'Cross-hospital visibility layer',
      'National bed availability dashboard',
      'Inter-hospital transfer coordination',
      'Centralised reporting for Ministry of Health',
      'Long-term partnership model',
    ],
    cta: 'Express Interest',
    ctaHref: '#contact',
    ctaStyle: 'border-2 border-gray-300 text-gray-500 hover:border-brand-blue hover:text-brand-blue',
  },
];

const statusStyle = {
  now:    'bg-brand-green/15 text-brand-green border-brand-green/30',
  next:   'bg-amber-50 text-amber-600 border-amber-200',
  future: 'bg-gray-100 text-gray-400 border-gray-200',
};

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Business Model"
          title="From paid pilot to national platform"
          sub="FLOW is currently accepting pilot applications. Pricing is structured to grow with your hospital — from a single ward to the national network."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {stages.map(plan => (
            <div key={plan.stage}
              className={`rounded-2xl p-8 relative transition-all duration-200 hover:-translate-y-1
                ${plan.featured
                  ? 'bg-white border-2 border-brand-blue shadow-xl shadow-brand-blue/10 scale-[1.02]'
                  : 'bg-white border border-gray-200 hover:shadow-lg'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{plan.stage}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusStyle[plan.status]}`}>
                  {plan.statusLabel}
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-brand-navy mb-1">{plan.title}</h3>
              <div className="text-xs text-gray-400 mb-4">{plan.sub}</div>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">{plan.description}</p>
              <ul className="flex flex-col gap-3 mb-8">
                {plan.includes.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="text-brand-green font-bold mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={plan.ctaHref}
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${plan.ctaStyle}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">
          Team Cekap is also seeking EHR integration partners and healthcare IT procurement mentors.{' '}
          <a href="#contact" className="text-brand-blue hover:underline">Get in touch →</a>
        </p>
      </div>
    </section>
  );
}
