const features = [
  {
    icon: '▦',
    color: 'bg-blue-100 text-brand-blue',
    title: 'Hospital-Wide Heatmap',
    body: 'Every ward visualised as a live capacity heatmap — like a car park display for beds. CSCs see the whole hospital at a glance without calling a single ward.',
    bullets: ['Colour-coded by occupancy status', 'Updates the moment a nurse changes a bed', 'No refresh. No phone calls.'],
    large: true,
  },
  {
    icon: '⏱',
    color: 'bg-cyan-100 text-cyan-700',
    title: 'Admission & Transfer Queue',
    body: 'Patients awaiting placement are visible to CSCs in real time. Nurse managers flag transfer readiness from their ward terminal the moment a bed is clear.',
  },
  {
    icon: '📋',
    color: 'bg-emerald-100 text-emerald-700',
    title: 'Automated Census Updates',
    body: 'Confirm a transfer in FLOW and census sheets update across the hospital automatically. Excel reports for process evaluation generated on demand — no manual compilation.',
  },
  {
    icon: '↕',
    color: 'bg-violet-100 text-violet-700',
    title: 'Patient Flow Phases',
    body: 'Track the phase-based patient journey: admission → in-stay → discharge decision → departure. Surface exactly where bottlenecks are building before they cause delays.',
  },
  {
    icon: '📱',
    color: 'bg-orange-100 text-orange-600',
    title: 'Mobile Companion',
    body: 'Nurse managers update bed counts and patient phases from a mobile app — no need to return to a desktop terminal. Wi-Fi only; wired ethernet for critical ward desktops.',
  },
  {
    icon: '🔒',
    color: 'bg-red-100 text-red-600',
    title: 'RBAC & Audit Trails',
    body: 'Nurse managers see only their assigned ward. CSCs see everything. Every action is logged with an immutable audit trail for clinical governance and compliance.',
  },
  {
    icon: '⊡',
    color: 'bg-teal-100 text-teal-700',
    title: 'EHR Integration Layer',
    body: 'FLOW sits on top of your existing EHR — it is a coordination layer, not a replacement. v1 uses manual input; v2 reads patient status events from the EHR automatically.',
  },
  {
    icon: '🖥️',
    color: 'bg-blue-100 text-brand-blue',
    title: 'On-Premise by Design',
    body: 'All data stays within your hospital network. No internet egress required. Deployed on your LAN with a hot-standby backup server for resilience — clinical-grade reliability.',
    bullets: ['No cloud dependency', 'Hot-standby failover', 'Runs on hospital LAN only'],
    large: true,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Platform Features"
          title="One platform. Two layers. Total visibility."
          sub="FLOW separates bed management (fast-changing, operationally critical) from patient flow (slower, strategically important) — both visible from the same dashboard."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title}
              className={`rounded-2xl border border-gray-200 p-7 bg-gray-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200
                ${f.large ? 'lg:col-span-2 bg-gradient-to-br from-gray-50 to-blue-50' : ''}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 ${f.color}`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.body}</p>
              {f.bullets && (
                <ul className="mt-4 flex flex-col gap-2">
                  {f.bullets.map(b => (
                    <li key={b} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
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
    <div className={`text-center max-w-2xl mx-auto mb-16 ${light ? 'text-white' : ''}`}>
      <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5
        ${light ? 'bg-brand-green/20 text-brand-green' : 'bg-brand-blue-lt text-brand-blue'}`}>
        {tag}
      </span>
      <h2 className={`text-3xl sm:text-4xl font-display font-bold mb-4 ${light ? 'text-white' : 'text-brand-navy'}`}>
        {title}
      </h2>
      {sub && <p className={`text-base leading-relaxed ${light ? 'text-white/70' : 'text-gray-500'}`}>{sub}</p>}
    </div>
  );
}
