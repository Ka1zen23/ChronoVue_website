import { useEffect, useState } from 'react';

const STATUSES = ['occupied', 'available', 'cleaning', 'reserved'];

const bedColor = {
  occupied: 'bg-red-500/25 border-red-400/30',
  available: 'bg-emerald-500/20 border-emerald-400/30',
  cleaning: 'bg-amber-500/20 border-amber-400/30',
  reserved: 'bg-[#538c97]/20 border-[#538c97]/30',
};

const WARDS = [
  {
    name: 'Main Block',
    occupancy: 82,
    beds: ['occupied','occupied','occupied','cleaning','available','available','occupied','occupied','occupied','available']
  },
  {
    name: 'WCC',
    occupancy: 60,
    beds: ['occupied','available','occupied','occupied','cleaning','occupied','available','occupied','reserved','occupied']
  },
  {
    name: 'Old Building',
    occupancy: 24,
    beds: ['available','available','occupied','occupied','available','occupied','cleaning','available','occupied','occupied']
  },
];

const ISOLATION = [
  { ward: 'Ward 3A', category: 'Urology', patients: 4 },
  { ward: 'Ward 5B', category: 'Plastic Surgery', patients: 6 },
  { ward: 'Ward 7', category: 'Neuro / PJC', patients: 8 },
];

export default function CommandCentrePreview() {
  const [wards, setWards] = useState(WARDS);

  useEffect(() => {
    const id = setInterval(() => {
      setWards(prev =>
        prev.map(ward => {
          const beds = [...ward.beds];
          const idx = Math.floor(Math.random() * beds.length);

          beds[idx] =
            STATUSES[Math.floor(Math.random() * STATUSES.length)];

          return {
            ...ward,
            beds,
          };
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

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/5 bg-[#0f1722] text-white shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
      
      {/* Header */}
      <div className="border-b border-white/5 bg-[#131d2b] px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#538c97]">
              Command Centre
            </div>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">
              RIPAS Hospital Command Centre
            </h1>

            <p className="mt-1 text-sm text-white/45">
              Bed management, patient flow, and operational visibility.
            </p>
          </div>

          <div className="flex items-center gap-3">
            
            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              ● Live
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60">
              Browse-only
            </div>

            <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60 md:block">
              Operational visibility
            </div>

            <div className="ml-2 text-right">
              <div className="text-2xl font-bold tracking-tight text-[#7a9680]">
                12:00:58
              </div>

              <div className="text-[11px] text-white/40">
                Brunei Standard Time
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[700px]">
        
        {/* Sidebar */}
        <div className="hidden w-[82px] shrink-0 border-r border-white/5 bg-[#131d2b] sm:flex sm:flex-col sm:justify-between">
          
          <div className="flex flex-col items-center gap-3 p-4">
            
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 font-bold text-white">
              FL
            </div>

            {[
              { icon: <GridIcon />, active: true },
              { icon: <ChartIcon /> },
              { icon: <UsersIcon /> },
              { icon: <BedIcon /> },
              { icon: <AlertIcon /> },
              { icon: <SettingsIcon /> },
            ].map((item, i) => (
              <button
                key={i}
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all
                ${
                  item.active
                    ? 'bg-[#538c97]/20 text-[#7fc5d3] border border-[#538c97]/20'
                    : 'text-white/35 hover:bg-white/5 hover:text-white/70'
                }`}
              >
                {item.icon}
              </button>
            ))}
          </div>

          <div className="p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 font-semibold text-white/70">
              SA
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 bg-[#0f1722] p-5">
          
          {/* Top Metrics */}
          <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            
            <MetricCard
              label="Total Beds"
              value={totalBeds}
              sub="3 active wards"
            />

            <MetricCard
              label="Available"
              value={available}
              sub={`${((available / totalBeds) * 100).toFixed(0)}% free`}
            />

            <MetricCard
              label="Occupancy Rate"
              value="71%"
              sub="Current hospital usage"
            />

            <MetricCard
              label="Isolation Wards"
              value="6"
              sub="Active monitored wards"
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            
            {/* Census */}
            <div className="xl:col-span-2 rounded-2xl border border-white/5 bg-[#131d2b] p-5">
              
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#538c97]">
                    Occupancy Rate
                  </div>

                  <div className="mt-1 text-lg font-bold text-white">
                    Live Bed Monitoring
                  </div>
                </div>

                <div className="rounded-full bg-[#7a9680]/15 px-3 py-1 text-xs font-semibold text-[#9fbea6]">
                  Midnight extract updates
                </div>
              </div>

              <div className="space-y-5">
                {wards.map(ward => (
                  <div key={ward.name}>
                    
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-white/80">
                        {ward.name}
                      </span>

                      <span className="text-sm font-bold text-white/50">
                        {ward.occupancy}%
                      </span>
                    </div>

                    <div className="mb-3 h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-[#538c97]"
                        style={{
                          width: `${ward.occupancy}%`,
                        }}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {ward.beds.map((status, i) => (
                        <div
                          key={i}
                          className={`h-5 w-7 rounded-md border transition-all duration-500 hover:scale-110 ${bedColor[status]}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                {Object.entries(bedColor).map(([status, cls]) => (
                  <div
                    key={status}
                    className="flex items-center gap-2 text-xs text-white/45"
                  >
                    <span className={`h-3 w-4 rounded border ${cls}`} />
                    {status}
                  </div>
                ))}
              </div>
            </div>

            {/* Isolation */}
            <div className="rounded-2xl border border-white/5 bg-[#131d2b] p-5">
              
              <div className="mb-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#538c97]">
                  Isolation Wards
                </div>

                <div className="mt-1 text-lg font-bold text-white">
                  Active Monitoring
                </div>
              </div>

              <div className="space-y-3">
                {ISOLATION.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/5 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-start justify-between">
                      
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {item.ward}
                        </div>

                        <div className="mt-1 text-xs text-white/45">
                          {item.category}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-[#7a9680]">
                          {item.patients}
                        </div>

                        <div className="text-[10px] uppercase tracking-wider text-white/35">
                          patients
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#538c97]/10 bg-[#538c97]/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#7fc5d3]">
                  Preview Mode
                </div>

                <div className="mt-1 text-sm text-white/50">
                  Simulated operational dashboard for showcase and presentation purposes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131d2b] p-4">
      <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#538c97]">
        {label}
      </div>

      <div className="mt-2 text-3xl font-black tracking-tight text-white">
        {value}
      </div>

      <div className="mt-1 text-xs text-white/40">
        {sub}
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

const ChartIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 11l3-4 3 2 4-6" strokeLinecap="round" />
  </svg>
);

const UsersIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="5" cy="5" r="2.2" />
    <circle cx="10" cy="6" r="1.8" />
    <path d="M1.5 11c.8-2 2.3-3 4.5-3s3.7 1 4.5 3" />
  </svg>
);

const BedIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 10V5a2 2 0 012-2h8a2 2 0 012 2v5" />
    <path d="M1 7h12" />
  </svg>
);

const AlertIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 2l5 9H2l5-9z" />
    <path d="M7 5v3" strokeLinecap="round" />
    <circle cx="7" cy="9.5" r=".5" fill="currentColor" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="7" r="2.5" />
    <path d="M7 1v2M7 11v2M1 7h2M11 7h2" />
  </svg>
);

