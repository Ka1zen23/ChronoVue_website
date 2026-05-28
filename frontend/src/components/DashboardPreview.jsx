import { useState, useEffect } from 'react';

const STATUSES = ['occupied', 'available', 'cleaning', 'reserved'];

const bedColor = {
  occupied:
    'bg-[#243046]/15 border-[#243046]/30',
  available:
    'bg-[#7a9680]/20 border-[#7a9680]/40',
  cleaning:
    'bg-amber-100 border-amber-300',
  reserved:
    'bg-[#538c97]/20 border-[#538c97]/40',
};

const WARDS = [
  {
    name: 'Main Block · Acute Medical',
    beds: ['occupied','occupied','occupied','cleaning','available','available','occupied','occupied','occupied','available']
  },
  {
    name: 'Ward B · General Medicine',
    beds: ['occupied','available','occupied','occupied','cleaning','occupied','available','occupied','reserved','occupied']
  },
  {
    name: 'Ward C · Surgical',
    beds: ['available','available','occupied','occupied','available','occupied','cleaning','available','occupied','occupied']
  },
];

const QUEUE = [
  { name: 'Patient Transfer', wait: '1h 12m', priority: 'high' },
  { name: 'ED Admission', wait: '47m', priority: 'med' },
  { name: 'Ward Placement', wait: '23m', priority: 'low' },
];

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
    }, 2600);

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
    <div className="overflow-hidden rounded-[26px] border border-black/5 bg-[#e6e5df] shadow-[0_25px_80px_rgba(36,48,70,0.12)]">
      
      {/* Top Bar */}
      <div className="flex items-center gap-3 border-b border-black/5 bg-white/70 px-5 py-3 backdrop-blur">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </div>

        <div className="flex-1">
          <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#538c97]">
            Command Centre
          </div>

          <div className="text-sm font-semibold text-[#243046]">
            RIPAS Hospital Operational Visibility Dashboard
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Live
        </div>
      </div>

      <div className="flex min-h-[540px]">
        
        {/* Sidebar */}
        <div className="hidden w-[84px] shrink-0 border-r border-black/5 bg-white/60 p-3 sm:flex sm:flex-col sm:justify-between">
          
          <div className="space-y-2">
            {[
              { icon: '◫', active: true },
              { icon: '⌂' },
              { icon: '⇄' },
              { icon: '⏱' },
              { icon: '☰' },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold transition-all
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

        {/* Main Content */}
        <div className="flex-1 p-5">

          {/* Header Row */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#538c97]">
                Operational Overview
              </div>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#243046]">
                Central Shift Coordination
              </h1>
            </div>

            <div className="flex gap-2">
              {['Operational Visibility', 'Bed Flow', 'Browse Preview'].map(tag => (
                <span
                  key={tag}
                  className="rounded-full border border-black/5 bg-white px-3 py-1 text-[11px] font-semibold text-[#243046]/70"
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
                sub: '3 active wards',
              },
              {
                label: 'Available',
                value: available,
                sub: `${((available / totalBeds) * 100).toFixed(0)}% capacity free`,
              },
              {
                label: 'Pending Cleaning',
                value: cleaning,
                sub: 'avg 12 mins',
              },
              {
                label: 'Admission Queue',
                value: QUEUE.length,
                sub: 'awaiting placement',
              },
            ].map(stat => (
              <div
                key={stat.label}
                className="rounded-2xl border border-black/5 bg-white p-4"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#538c97]">
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
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#538c97]">
                    Live Occupancy
                  </div>

                  <div className="mt-1 text-lg font-bold text-[#243046]">
                    Bed Availability Heatmap
                  </div>
                </div>

                <span className="rounded-full bg-[#7a9680]/15 px-3 py-1 text-xs font-semibold text-[#7a9680]">
                  Real-time Preview
                </span>
              </div>

              <div className="space-y-5">
                {wards.map(ward => (
                  <div key={ward.name}>
                    <div className="mb-2 text-sm font-semibold text-[#243046]/80">
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
                    <span
                      className={`h-3 w-4 rounded border ${cls}`}
                    />
                    {status}
                  </div>
                ))}
              </div>
            </div>

            {/* Queue */}
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <div className="mb-4">
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
                        Wait time · {p.wait}
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase
                      ${
                        p.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : p.priority === 'med'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {p.priority}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-dashed border-[#538c97]/30 bg-[#538c97]/5 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.15em] text-[#538c97]">
                  System Preview
                </div>

                <div className="mt-1 text-sm text-[#243046]/70">
                  Simulated operational visibility for showcasing patient flow coordination.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
