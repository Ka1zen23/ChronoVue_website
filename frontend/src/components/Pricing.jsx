import { SectionHeader } from './Features';

const plans = [
  {
    tier: 'Starter',
    price: '2,499',
    sub: 'Up to 100 beds · 1 facility',
    features: [
      'Live Bed Map',
      'Queue Management',
      'Basic Analytics',
      'Email & SMS Alerts',
      'Standard HIS Integrations',
      'Business Hours Support',
    ],
    cta: 'Get Started',
    ctaStyle: 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue-lt',
  },
  {
    tier: 'Professional',
    price: '5,999',
    sub: 'Up to 400 beds · 3 facilities',
    featured: true,
    features: [
      'Everything in Starter',
      'Predictive Analytics',
      'Discharge Planner',
      'Transfer Coordination',
      'Executive Reporting Suite',
      'WhatsApp Alerts',
      '24/7 Priority Support',
    ],
    cta: 'Request Demo',
    ctaStyle: 'bg-brand-blue text-white hover:bg-brand-blue-dk shadow-md',
  },
  {
    tier: 'Enterprise',
    price: null,
    sub: 'Unlimited beds · Unlimited facilities',
    features: [
      'Everything in Professional',
      'Multi-hospital Network View',
      'Custom Integrations',
      'On-premise Deployment Option',
      'Dedicated Customer Success Manager',
      'SLA Guarantee',
      'MOH Reporting Automation',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue-lt',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Pricing"
          title="Simple, transparent pricing"
          sub="All plans include unlimited users, dedicated onboarding, and 24/7 local support. No hidden fees."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map(plan => (
            <div key={plan.tier}
              className={`rounded-2xl p-8 relative transition-all duration-200 hover:-translate-y-1
                ${plan.featured
                  ? 'bg-white border-2 border-brand-blue shadow-xl shadow-brand-blue/10 scale-[1.02]'
                  : 'bg-white border border-gray-200 hover:shadow-lg'}`}>
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{plan.tier}</div>
              <div className="flex items-baseline gap-1 mb-1">
                {plan.price ? (
                  <>
                    <span className="text-lg font-bold text-brand-navy">RM</span>
                    <span className="text-4xl font-display font-extrabold text-brand-navy">{plan.price}</span>
                    <span className="text-sm text-gray-400">/month</span>
                  </>
                ) : (
                  <span className="text-4xl font-display font-extrabold text-brand-navy">Custom</span>
                )}
              </div>
              <div className="text-xs text-gray-400 mb-6">{plan.sub}</div>
              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="text-brand-green font-bold mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${plan.ctaStyle}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
