const features = [
  {
    icon: <HeatmapIcon />,
    accent: 'text-brand-blue bg-brand-blue/8 border-brand-blue/15',
    title: 'Hospital-Wide Heatmap',
    body: 'Every ward visualised as a live capacity heatmap. CSCs see the whole hospital at a glance, like a car park display for beds, without calling a single ward.',
    bullets: ['Updates the moment a nurse changes a bed status', 'Colour-coded by occupancy: available, occupied, cleaning, reserved', 'No refresh button. No phone calls.'],
    large: true,
  },
  {
    icon: <QueueIcon />,
    accent: 'text-cyan-600 bg-cyan-500/8 border-cyan-500/15',
    title: 'Admission Queue',
    body: 'Patients awaiting placement are visible to CSCs in real time. Nurse managers flag transfer readiness instantly, no WhatsApp message required.',
  },
  {
    icon: <CensusIcon />,
    accent: 'text-emerald-600 bg-emerald-500/8 border-emerald-500/15',
    title: 'Automated Census',
    body: 'Confirm a transfer in FLOW and census sheets update across the hospital automatically. Excel reports generated on demand, zero manual compilation.',
  },
  {
    icon: <FlowIcon />,
    accent: 'text-violet-600 bg-violet-500/8 border-violet-500/15',
    title: 'Patient Flow Phases',
    body: 'Track the full patient journey from admission to discharge. Surface exactly where bottlenecks are building before they cause delays.',
  },
  {
    icon: <MobileIcon />,
    accent: 'text-orange-600 bg-orange-500/8 border-orange-500/15',
    title: 'Mobile Companion',
    body: 'Nurse managers update bed counts from a mobile app on the go, no need to return to a desktop terminal. Wi-Fi only; wired ethernet for critical ward desktops.',
  },
  {
    icon: <LockIcon />,
    accent: 'text-red-600 bg-red-500/8 border-red-500/15',
    title: 'RBAC & Audit Trail',
    body: 'Nurse managers see only their assigned ward. CSCs see everything. Every action is logged with an immutable audit trail for clinical governance.',
  },
  {
    icon: <LinkIcon />,
    accent: 'text-teal-600 bg-teal-500/8 border-teal-500/15',
    title: 'EHR Integration Layer',
    body: 'FLOW sits on top of your existing EHR: a coordination layer, not a replacement. v1 uses manual input; v2 reads patient status events from the EHR automatically.',
  },
  {
    icon: <ServerIcon />,
    accent: 'text-brand-blue bg-brand-blue/8 border-brand-blue/15',
    title: 'Flexible Deployment',
    body: 'Deploy on your hospital LAN for full data sovereignty, or opt for secure cloud hosting. FLOW adapts to your infrastructure and compliance requirements.',
    bullets: ['On-premise or cloud: your infrastructure, your choice', 'Hot-standby failover server for clinical-grade resilience', 'Automated scheduled backups with tested restore'],
    large: true,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 bg-white dark:bg-brand-navy">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="FLOW · Feature Set"
          title={<>One platform.<br className="sm:hidden" /> Two layers. Total visibility.</>}
          sub="FLOW separates bed management (fast-changing, operationally critical) from patient flow (slower, strategically important). Both visible from the same dashboard."
        />
        <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              data-reveal
              className={`feature-card rounded-2xl border border-black/[0.07] dark:border-white/[0.09] p-7
                bg-white dark:bg-brand-navy-mid
                ${f.large ? 'lg:col-span-2' : ''}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 border ${f.accent}`}>
                {f.icon}
              </div>
              <h3 className="text-[16px] font-bold tracking-tight mb-2 text-brand-navy dark:text-white">{f.title}</h3>
              <p className="text-gray-500 dark:text-white/50 text-[14px] leading-relaxed">{f.body}</p>
              {f.bullets && (
                <ul className="mt-4 flex flex-col gap-2">
                  {f.bullets.map(b => (
                    <li key={b} className="flex items-start gap-2 text-[13px] text-gray-500 dark:text-white/50">
                      <span className="w-1 h-1 rounded-full bg-brand-green flex-shrink-0 mt-[7px]" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ tag, title, sub, light }) {
  return (
    <div data-reveal className={`text-center max-w-2xl mx-auto mb-16`}>
      <span className={`inline-block text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1
        rounded-full mb-5 ${light
          ? 'bg-brand-green/20 text-brand-green'
          : 'bg-brand-blue/10 text-brand-blue border border-brand-blue/15'}`}>
        {tag}
      </span>
      <h2 className={`text-[clamp(1.75rem,3.5vw,2.6rem)] font-display font-extrabold
        tracking-tight mb-4 leading-tight ${light ? 'text-white' : 'text-brand-navy dark:text-white'}`}>
        {title}
      </h2>
      {sub && (
        <p className={`text-[15px] leading-relaxed ${light ? 'text-white/60' : 'text-gray-500 dark:text-white/55'}`}>{sub}</p>
      )}
    </div>
  );
}

/* ---- Icons ---- */
function HeatmapIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="2" width="7" height="7" rx="1.5"/>
      <rect x="11" y="2" width="7" height="7" rx="1.5" opacity=".5"/>
      <rect x="2" y="11" width="7" height="7" rx="1.5" opacity=".5"/>
      <rect x="11" y="11" width="7" height="7" rx="1.5" opacity=".75"/>
    </svg>
  );
}
function QueueIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="10" cy="10" r="7.5"/>
      <path d="M10 6v4.5l3 1.5"/>
    </svg>
  );
}
function CensusIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6z"/>
      <polyline points="12 2 12 6 16 6"/>
      <path d="M8 11h4M8 14h3"/>
    </svg>
  );
}
function FlowIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="4" cy="10" r="2.5"/>
      <circle cx="16" cy="10" r="2.5"/>
      <path d="M6.5 10h7"/>
      <path d="M11 7l3 3-3 3" strokeLinejoin="round"/>
    </svg>
  );
}
function MobileIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="5" y="1.5" width="10" height="17" rx="2"/>
      <circle cx="10" cy="16" r=".75" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function LockIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="9" width="14" height="10" rx="2"/>
      <path d="M7 9V6a3 3 0 016 0v3"/>
      <circle cx="10" cy="14" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M8 12a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1.5 1.5"/>
      <path d="M12 8a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1.5-1.5"/>
    </svg>
  );
}
function ServerIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="3" width="16" height="5" rx="1.5"/>
      <rect x="2" y="12" width="16" height="5" rx="1.5"/>
      <circle cx="5.5" cy="5.5" r="1" fill="currentColor" stroke="none"/>
      <circle cx="5.5" cy="14.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
