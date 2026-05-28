const features = [
  {
    icon: <HeatmapIcon />,
    accent: 'text-[#7fc5d3] bg-[#538c97]/10 border-[#538c97]/20',
    title: 'Hospital-Wide Heatmap',
    body: 'A live operational overview inspired by real hospital command centres. CSCs instantly see occupancy levels, bed readiness, and ward pressure across the hospital from a single screen.',
    bullets: [
      'Live occupancy visualisation across wards',
      'Colour-coded operational status indicators',
      'Designed for instant situational awareness',
    ],
    large: true,
  },
  {
    icon: <QueueIcon />,
    accent: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
    title: 'Admission Queue',
    body: 'A centralised queue view allows coordinators to monitor pending admissions, prioritise placements, and reduce delays during peak operational periods.',
  },
  {
    icon: <CensusIcon />,
    accent: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
    title: 'Automated Census',
    body: 'Generate ward census summaries and operational snapshots automatically, reducing reliance on fragmented spreadsheets and manual updates.',
  },
  {
    icon: <FlowIcon />,
    accent: 'text-violet-300 bg-violet-500/10 border-violet-500/20',
    title: 'Patient Flow Visibility',
    body: 'Track patient movement stages from admission to discharge, helping teams identify operational bottlenecks earlier and coordinate resources more effectively.',
  },
  {
    icon: <MobileIcon />,
    accent: 'text-orange-300 bg-orange-500/10 border-orange-500/20',
    title: 'Mobile-Friendly Updates',
    body: 'Ward teams can quickly update bed statuses and operational information from mobile devices without returning to a workstation.',
  },
  {
    icon: <LockIcon />,
    accent: 'text-red-300 bg-red-500/10 border-red-500/20',
    title: 'Role-Based Access',
    body: 'Different operational roles see only the information relevant to them, while command centre coordinators maintain a hospital-wide overview.',
  },
  {
    icon: <LinkIcon />,
    accent: 'text-teal-300 bg-teal-500/10 border-teal-500/20',
    title: 'Integration-Ready Design',
    body: 'Designed as a coordination layer that can sit alongside existing hospital systems, supporting future interoperability and workflow expansion.',
  },
  {
    icon: <ServerIcon />,
    accent: 'text-[#7fc5d3] bg-[#538c97]/10 border-[#538c97]/20',
    title: 'Operational Reliability',
    body: 'Built with resilience and continuity in mind for high-availability hospital environments, ensuring operational visibility remains accessible during critical workflows.',
    bullets: [
      'Designed for secure internal deployment',
      'Supports backup and redundancy strategies',
      'Focused on uninterrupted operational visibility',
    ],
    large: true,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#0f1722] py-28 text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(83,140,151,0.12),transparent_45%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          light
          tag="Platform Features"
          title={
            <>
              Operational visibility.
              <br className="sm:hidden" /> Designed for coordination.
            </>
          }
          sub="FLOW provides a centralised operational layer for hospital coordination teams, combining bed visibility, patient flow monitoring, and command-centre style situational awareness in one unified platform."
        />

        <div
          data-stagger
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <div
              key={f.title}
              data-reveal
              className={`
                group rounded-3xl border border-white/5
                bg-white/[0.03] p-7 backdrop-blur-sm
                transition-all duration-300
                hover:-translate-y-1 hover:border-[#538c97]/20 hover:bg-white/[0.05]
                ${f.large ? 'lg:col-span-2' : ''}
              `}
            >
              <div
                className={`mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border ${f.accent}`}
              >
                {f.icon}
              </div>

              <h3 className="mb-2 text-[17px] font-bold tracking-tight text-white">
                {f.title}
              </h3>

              <p className="text-[14px] leading-relaxed text-white/55">
                {f.body}
              </p>

              {f.bullets && (
                <ul className="mt-5 flex flex-col gap-2.5">
                  {f.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-[13px] text-white/55"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#7a9680]" />
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
    <div
      data-reveal
      className="mx-auto mb-16 max-w-3xl text-center"
    >
      <span
        className={`
          mb-5 inline-block rounded-full border px-3 py-1
          text-[11px] font-bold uppercase tracking-[0.16em]
          ${
            light
              ? 'border-[#538c97]/20 bg-[#538c97]/10 text-[#7fc5d3]'
              : 'border-[#538c97]/15 bg-[#538c97]/10 text-[#538c97]'
          }
        `}
      >
        {tag}
      </span>

      <h2
        className={`
          mb-4 font-display text-[clamp(1.9rem,4vw,3rem)]
          font-black leading-tight tracking-tight
          ${light ? 'text-white' : 'text-[#243046]'}
        `}
      >
        {title}
      </h2>

      {sub && (
        <p
          className={`text-[15px] leading-relaxed ${
            light ? 'text-white/55' : 'text-gray-500'
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/* ---- Icons ---- */

function HeatmapIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <rect x="2" y="2" width="7" height="7" rx="1.5" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" opacity=".5" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" opacity=".5" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" opacity=".75" />
    </svg>
  );
}

function QueueIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 6v4.5l3 1.5" />
    </svg>
  );
}

function CensusIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6z" />
      <polyline points="12 2 12 6 16 6" />
      <path d="M8 11h4M8 14h3" />
    </svg>
  );
}

function FlowIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="4" cy="10" r="2.5" />
      <circle cx="16" cy="10" r="2.5" />
      <path d="M6.5 10h7" />
      <path d="M11 7l3 3-3 3" strokeLinejoin="round" />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <rect x="5" y="1.5" width="10" height="17" rx="2" />
      <circle cx="10" cy="16" r=".75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <rect x="3" y="9" width="14" height="10" rx="2" />
      <path d="M7 9V6a3 3 0 016 0v3" />
      <circle cx="10" cy="14" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M8 12a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1.5 1.5" />
      <path d="M12 8a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1.5-1.5" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <rect x="2" y="3" width="16" height="5" rx="1.5" />
      <rect x="2" y="12" width="16" height="5" rx="1.5" />
      <circle cx="5.5" cy="5.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="5.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}