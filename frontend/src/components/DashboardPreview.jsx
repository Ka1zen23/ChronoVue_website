import { useState, useEffect } from 'react';

const STATUSES = ['occupied', 'available', 'cleaning', 'reserved'];

const bedColor = {
  occupied: 'bg-[#243046]/15 border-[#243046]/30',
  available: 'bg-[#7a9680]/20 border-[#7a9680]/40',
  cleaning: 'bg-amber-100 border-amber-300',
  reserved: 'bg-[#538c97]/20 border-[#538c97]/40',
};

const WARDS = [
  {
    name: 'AMU · Acute Medical',
    beds: ['occupied','occupied','occupied','cleaning','available','available','occupied','occupied','occupied','available']
  },
  {
    name: 'Ward B · General Med',
    beds: ['occupied','available','occupied','occupied','cleaning','occupied','available','occupied','reserved','occupied']
  },
  {
    name: 'Ward C · Surgical',
    beds: ['available','available','occupied','occupied','available','occupied','cleaning','available','occupied','occupied']
  },
];

const QUEUE = [
  { name: 'Patient 1', wait: '1h 12m', priority: 'high' },
  { name: 'Patient 2', wait: '47m', priority: 'medium' },
  { name: 'Patient 3', wait: '23m', priority: 'low' },
];

const PRIORITY_STYLE = {
  high: 'bg-red-500/10 text-red-600 border-red-200',
  medium: 'bg-amber-500/10 text-amber-700 border-amber-200',
  low: 'bg-gray-500/10 text-gray-600 border-gray-200',
};

export default function DashboardPreview() {
  const [wards, setWards] = useState(WARDS);

  useEffect(() => {
    const id = setInterval(() => {
      setWards(prev =>
        prev.map(ward => {
          const beds = [...ward.beds];
          const idx = Math.floor(Math.random() * beds.length);

          beds[idx] =
            STATUSES[Math.floor(Math.random() * STATUSES.length)];

          return { ...ward, beds };
        })
      );
    }, 2400);

    return () => clearInterval(id);
  }, []);

  const totalBeds = wards.reduce(
    (s, w) => s + w.beds.length,
    0
  );

  const available = wards.reduce(
    (s, w) =>
      s + w.beds.filter(b => b === 'available').length,
    0
  );

  const cleaning = wards.reduce(
    (s, w) =>
      s + w.beds.filter(b => b === 'cleaning').length,
    0
  );

  return (
    <div className="overflow-hidden rounded-[28px] border border-black/5 bg-[#e6e5df] shadow-[0_30px_80px_rgba(36,48,70,0.12)]">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-black/5 bg-white/70 px-5 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </div>

        <div className="flex-1">
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#538c97]">
            Command Centre
          </div>

          <div className="text-sm font-semibold text-[#243046]">
            RIPAS Hospital Dashboard Preview
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Live
        </div>
      </div>

      <div className="flex min-h-[520px]">
        
        {/* Sidebar */}
        <div className="hidden w-[84px] shrink-0 border-r border-black/5 bg-white/60 p-3 sm:flex sm:flex-col sm:justify-between">
          
          <div className="space-y-2">
            {[
              { icon: <GridIcon />, active: true },
              { icon: <BedIcon /> },
              { icon: <ClockIcon /> },
              { icon: <ArrowIcon /> },
              { icon: <FlowIcon /> },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all
                ${
                  item.active
                    ? 'bg-[#243046] text-white shadow-lg'
                    : 'bg-white text-[#243046]/50 hover:bg-[#243046]/5'
                }`}
              >
                {item.icon}
              </div>
            ))}
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#538c97]/15 font-bold text-[#243046]">
            FL
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 p-5">
          
          {/* Top Row */}
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#538c97]">
                Operational Overview
              </div>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#243046]">
                Central Shift Coordination
              </h1>
            </div>

            <div className="hidden md:flex gap-2">
              {['Operational Visibility', 'Bed Flow', 'Preview'].map(tag => (
                <span
                  key={tag}
                  className="rounded-full border border-black/5 bg-white px-3 py-1 text-[11px] font-semibold text-[#243046]/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              {
                label: 'Total Beds',
                value: totalBeds,
                sub: `${wards.length} wards`,
              },
              {
                label: 'Available',
                value: available,
                sub: `${((available / totalBeds) * 100).toFixed(0)}% free`,
              },
              {
                label: 'Pending Clean',
                value: cleaning,
                sub: 'avg 12 mins',
              },
              {
                label: 'Queue',
                value: QUEUE.length,
                sub: 'awaiting beds',
              },
            ].map(stat => (
              <div
                key={stat.label}
                className="rounded-2xl border border-black/5 bg-white p-4"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#538c97]">
                  {stat.label}
                </div>

                <div className="mt-2 text-3xl font-black tracking-tight text-[#243046]">
                  {stat.value}
                </div>

                <div className="mt-1 text-xs text-[#243046]/50">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            
            {/* Heatmap */}
            <div className="xl:col-span-2 rounded-2xl border border-black/5 bg-white p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#538c97]">
                    Live Occupancy
                  </div>

                  <div className="mt-1 text-lg font-bold text-[#243046]">
                    Bed Availability Heatmap
                  </div>
                </div>

                <div className="rounded-full bg-[#7a9680]/15 px-3 py-1 text-xs font-semibold text-[#7a9680]">
                  Real-time Preview
                </div>
              </div>

              <div className="space-y-5">
                {wards.map(ward => (
                  <div key={ward.name}>
                    <div className="mb-2 text-sm font-semibold text-[#243046]/75">
                      {ward.name}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {ward.beds.map((status, i) => (
                        <div
                          key={i}
                          title={status}
                          className={`h-6 w-8 rounded-md border transition-all duration-500 hover:scale-110 ${bedColor[status]}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-4">
                {Object.entries(bedColor).map(([status, cls]) => (
                  <div
                    key={status}
                    className="flex items-center gap-2 text-xs text-[#243046]/60"
                  >
                    <span className={`h-3 w-4 rounded border ${cls}`} />
                    {status}
                  </div>
                ))}
              </div>
            </div>

            {/* Queue */}
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <div className="mb-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#538c97]">
                  Patient Flow
                </div>

                <div className="mt-1 text-lg font-bold text-[#243046]">
                  Admission Queue
                </div>
              </div>

              <div className="space-y-3">
                {QUEUE.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl border border-black/5 bg-[#f8f8f6] p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#243046] text-sm font-bold text-white">
                      {i + 1}
                    </div>

                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#243046]">
                        {p.name}
                      </div>

                      <div className="text-xs text-[#243046]/50">
                        Wait · {p.wait}
                      </div>
                    </div>

                    <span
                      className={`rounded-full border px-2 py-1 text-[10px] font-bold uppercase ${PRIORITY_STYLE[p.priority]}`}
                    >
                      {p.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Icons */

const GridIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 14 14" fill="currentColor">
    <rect x="1" y="1" width="5" height="5" rx="1" />
    <rect x="8" y="1" width="5" height="5" rx="1" />
    <rect x="1" y="8" width="5" height="5" rx="1" />
    <rect x="8" y="8" width="5" height="5" rx="1" />
  </svg>
);

const BedIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 10V5a2 2 0 012-2h8a2 2 0 012 2v5" />
    <path d="M1 7h12" />
  </svg>
);

const ClockIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="7" r="5.5" />
    <path d="M7 4v3.5l2.5 1.5" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M2 7h10M8 4l4 3-4 3" />
  </svg>
);

const FlowIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="3" cy="7" r="2" />
    <circle cx="11" cy="7" r="2" />
    <path d="M5 7h4" />
  </svg>
);

