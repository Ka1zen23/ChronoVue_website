import { SectionHeader } from './Features';

const steps = [
  {
    n: '01',
    title: 'Connect',
    body: 'We map your wards, beds, and departments. Cekap integrates with your existing HIS via secure HL7/FHIR APIs or direct database connectors — no data migration needed.',
  },
  {
    n: '02',
    title: 'Configure',
    body: 'Set your occupancy thresholds, SLA targets, escalation rules, and user roles. Customise the dashboard to match your hospital\'s workflows and terminology.',
  },
  {
    n: '03',
    title: 'Train',
    body: 'Live onboarding sessions for nurses, bed managers, and administrators. Backed by video tutorials, a knowledge base, and 24/7 local support.',
  },
  {
    n: '04',
    title: 'Optimise',
    body: 'From day one, your team gets live visibility. Monthly reviews with our Customer Success team keep you improving occupancy rates and patient flow continuously.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="How It Works"
          title="Up and running in under 2 weeks"
          sub="Our dedicated implementation team handles everything from configuration to staff training."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => (
            <div key={step.n} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-gradient-to-r from-brand-blue to-brand-teal" />
              )}
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-blue to-brand-teal text-white font-display font-bold text-base flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-blue/25 relative z-10">
                  {step.n}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
