import { SectionHeader } from './Features';

const steps = [
  {
    n: '01',
    title: 'Observe First',
    body: 'We study your ward\'s actual workflows before touching anything. Site walkthroughs, empathy mapping with nurse managers, and direct observation of existing processes. We understand before we automate.',
  },
  {
    n: '02',
    title: 'Configure FLOW',
    body: 'Your wards, your bed labels, your thresholds. We map the hospital layout, set occupancy alert rules, import user roles, and verify the LAN infrastructure is ready for deployment.',
  },
  {
    n: '03',
    title: 'Train Your Team',
    body: 'Hands-on training at the ward terminal for nurse managers and a separate CSC orientation for the central dashboard. Backed by quick-reference cards and on-call support throughout the pilot.',
  },
  {
    n: '04',
    title: 'Go Live Together',
    body: 'Team Cekap is on-site for go-live. We monitor the system, gather real usage data, and iterate rapidly. The AMU pilot is designed to validate and improve FLOW in a live clinical setting.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="How It Works"
          title="We understand your workflows before we automate them"
          sub="FLOW is deployed on your hospital LAN. Our team handles everything — from infrastructure setup to bedside training."
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

        {/* Architecture callout */}
        <div className="mt-16 bg-white rounded-2xl border border-gray-200 p-8">
          <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 text-center">Infrastructure at a glance</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { layer: 'Ward Terminals', desc: 'Wired ethernet · Desktop-first · Nurse manager input' },
              { layer: 'Hospital LAN',   desc: 'On-premise · No internet egress · All data stays in-hospital' },
              { layer: 'App Server',     desc: 'Primary + hot-standby · Separate rooms · Auto failover' },
              { layer: 'Dashboards',     desc: 'CSC central view · Ward view · Mobile companion (Wi-Fi)' },
            ].map(item => (
              <div key={item.layer} className="rounded-xl bg-brand-blue-lt/60 border border-brand-blue/10 p-4">
                <div className="text-sm font-bold text-brand-navy mb-1.5">{item.layer}</div>
                <div className="text-xs text-gray-500 leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
