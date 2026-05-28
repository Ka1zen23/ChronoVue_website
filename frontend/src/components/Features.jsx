const features = [
  {
    icon: '▦',
    color: 'bg-blue-100 text-brand-blue',
    title: 'Live Bed Map',
    body: 'See every bed in every ward at a glance — occupied, available, under cleaning, or reserved. Updated the moment status changes, no refresh needed.',
    bullets: ['Floor-plan or grid view', 'Colour-coded by status', 'Drill-down to patient details'],
    large: true,
  },
  {
    icon: '⏱',
    color: 'bg-cyan-100 text-cyan-700',
    title: 'Smart Queue Management',
    body: 'Auto-match waiting patients to the next available bed based on department, priority, and expected length of stay.',
  },
  {
    icon: '↗',
    color: 'bg-emerald-100 text-emerald-700',
    title: 'Predictive Analytics',
    body: 'Forecast bed demand by ward, day, and shift. Plan staffing and discharges before capacity becomes critical.',
  },
  {
    icon: '◷',
    color: 'bg-violet-100 text-violet-700',
    title: 'Discharge Planner',
    body: 'Track expected discharge dates, generate reminders for clinical teams, and cut average discharge time by up to 40%.',
  },
  {
    icon: '→',
    color: 'bg-orange-100 text-orange-600',
    title: 'Transfer Coordination',
    body: 'Request and approve inter-ward or inter-hospital transfers with full audit trail, notifications, and transport scheduling.',
  },
  {
    icon: '◎',
    color: 'bg-red-100 text-red-600',
    title: 'Alerts & Escalations',
    body: 'Automatic SMS, WhatsApp, or in-app alerts when occupancy thresholds are breached or patient wait exceeds SLA limits.',
  },
  {
    icon: '⊡',
    color: 'bg-teal-100 text-teal-700',
    title: 'HIS / EMR Integration',
    body: 'Native connectors for MySejahtera, iCare, Oracle Health, and all major HL7/FHIR-compliant systems. No rip-and-replace.',
  },
  {
    icon: '▣',
    color: 'bg-blue-100 text-brand-blue',
    title: 'Executive Reporting',
    body: 'One-click PDF and Excel reports for MOH submissions, board meetings, and accreditation audits. Slice by ward, speciality, date range, or doctor.',
    bullets: ['Bed occupancy rate trends', 'ALOS (Average Length of Stay)', 'Turnover interval analytics'],
    large: true,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Platform Features"
          title="Everything your hospital needs in one dashboard"
          sub="Cekap unifies bed status, patient flow, staff coordination, and analytics into a single real-time command center."
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
