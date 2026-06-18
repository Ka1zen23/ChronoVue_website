import { SectionHeader } from './Features';

const steps = [
  {
    n: '01',
    icon: <EyeIcon />,
    title: 'Observe first',
    body: "We study your ward's actual workflows before touching anything. Site walkthroughs, empathy mapping with nurse managers, direct observation of how beds are managed today. We understand before we automate.",
  },
  {
    n: '02',
    icon: <SettingsIcon />,
    title: 'Configure the platform',
    body: "Your wards, your data, your thresholds. We map the operational layout, set alert rules, import user roles, and verify the infrastructure. No generic templates, built to your environment.",
  },
  {
    n: '03',
    icon: <UsersIcon />,
    title: 'Train your team',
    body: "Hands-on training at the ward terminal for nurse managers and a CSC orientation for the central dashboard. Quick-reference guides and on-call support throughout the pilot.",
  },
  {
    n: '04',
    icon: <LaunchIcon />,
    title: 'Go live together',
    body: "The ChronoVue team is on-site for go-live. We monitor, gather real usage data, and iterate rapidly. Each deployment informs the next; the platform gets better with every rollout.",
  },
];

const infraLayers = [
  { label: 'Ward Terminals',    desc: 'Wired ethernet · Desktop-first · Nurse manager input' },
  { label: 'Network Layer',     desc: 'On-premise or cloud · Your choice · Data sovereignty options' },
  { label: 'Application Server', desc: 'Primary + hot-standby · Separate rooms · Auto failover' },
  { label: 'Dashboards',        desc: 'CSC central view · Ward view · Mobile companion' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-gray-50 dark:bg-brand-navy border-t border-black/[0.06] dark:border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Our Approach"
          title="We understand your workflows before we automate them"
          sub="We deploy ward by ward, site by site, each rollout informed by the last. No big-bang launches."
        />

        <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {steps.map((step, i) => (
            <div
              key={step.n}
              data-reveal
              className="relative bg-white dark:bg-brand-navy-mid rounded-2xl border border-black/[0.07] dark:border-white/[0.09] p-6
                hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Step line connector — drawn by GSAP on scroll */}
              {i < steps.length - 1 && (
                <div data-connector className="hidden lg:block absolute top-[38px] left-[calc(100%+2px)]
                  w-5 h-px bg-gradient-to-r from-brand-teal/40 to-brand-teal/10 z-10" />
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-brand-navy flex items-center justify-center
                  text-white shrink-0">
                  {step.icon}
                </div>
                <span className="text-[11px] font-bold text-gray-300 dark:text-white/20 tracking-wider font-mono">
                  {step.n}
                </span>
              </div>
              <h3 className="text-[15px] font-bold text-brand-navy dark:text-white mb-2 tracking-tight">{step.title}</h3>
              <p className="text-[13.5px] text-gray-500 dark:text-white/50 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        {/* Infrastructure callout */}
        <div data-reveal className="bg-white dark:bg-brand-navy-mid rounded-2xl border border-black/[0.07] dark:border-white/[0.09] p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 dark:text-white/35 mb-6 text-center">
            Infrastructure at a glance, deployed to your environment
          </p>
          <div data-stagger className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {infraLayers.map(item => (
              <div
                key={item.label}
                data-reveal
                className="rounded-xl bg-brand-teal/[0.04] dark:bg-brand-teal/[0.08] border border-brand-teal/[0.1] dark:border-brand-teal/[0.2] p-4"
              >
                <div className="text-[13px] font-bold text-brand-navy dark:text-white mb-1.5">{item.label}</div>
                <div className="text-[12px] text-gray-400 dark:text-white/45 leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EyeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/>
      <circle cx="8" cy="8" r="2"/>
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="2.5"/>
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 12.95l1.42-1.42M11.53 4.47l1.42-1.42"/>
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="6" cy="5" r="2.5"/>
      <path d="M1 14c0-2.76 2.24-4 5-4s5 1.24 5 4"/>
      <path d="M11.5 3a2.5 2.5 0 010 5M15 14c0-2.76-1.5-4-3.5-4"/>
    </svg>
  );
}
function LaunchIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1s4 1 4 7c0 2.5-1 4.5-2 5.5"/>
      <path d="M8 1S4 2 4 8c0 2.5 1 4.5 2 5.5"/>
      <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none"/>
      <path d="M5 13L2 15M11 13l3 2"/>
    </svg>
  );
}
