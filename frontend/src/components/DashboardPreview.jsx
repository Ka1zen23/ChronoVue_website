import { useState, useEffect } from 'react';

const STATUSES = ['occupied', 'available', 'cleaning', 'reserved'];

const bedColor = {
  occupied:  'bg-blue-100 border-blue-300',
  available: 'bg-emerald-100 border-emerald-300',
  cleaning:  'bg-amber-100 border-amber-300',
  reserved:  'bg-violet-100 border-violet-300',
};

const WARDS = [
  { name: 'AMU · Acute Medical',   beds: ['occupied','occupied','occupied','cleaning','available','available','occupied','occupied','occupied','available'] },
  { name: 'Ward B · General Med',  beds: ['occupied','available','occupied','occupied','cleaning','occupied','available','occupied','reserved','occupied'] },
  { name: 'Ward C · Surgical',     beds: ['available','available','occupied','occupied','available','occupied','cleaning','available','occupied','occupied'] },
];

const QUEUE = [
  { initials: 'PT', name: 'Patient 1', wait: '1h 12m', priority: 'high' },
  { initials: 'PT', name: 'Patient 2', wait: '47m',    priority: 'med' },
  { initials: 'PT', name: 'Patient 3', wait: '23m',    priority: 'low' },
];

const PRIORITY_STYLE = {
  high:   'bg-red-500/15 text-red-400 border-red-400/25',
  medium: 'bg-amber-500/15 text-amber-400 border-amber-400/25',
  low:    'bg-gray-500/15 text-gray-400 border-gray-400/25',
};

export default function DashboardPreview() {
  const [wards, setWards] = useState(WARDS);

  useEffect(() => {
    const id = setInterval(() => {
      setWards(prev => prev.map(ward => {
        const beds = [...ward.beds];
        const idx = Math.floor(Math.random() * beds.length);
        beds[idx] = STATUSES[Math.floor(Math.random() * STATUSES.length)];
        return { ...ward, beds };
      }));
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
    <div className="rounded-2xl border border-gray-200 shadow-2xl overflow-hidden bg-white">
      {/* Title bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="flex-1 text-center text-xs font-medium text-gray-400">FLOW — CSC Central Dashboard</span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-green">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-badge-pulse" />
          Live
        </div>
      </div>

      <div className="flex min-h-80">
        {/* Sidebar */}
        <div className="w-32 shrink-0 border-r border-gray-100 bg-gray-50/60 p-3 flex flex-col gap-1 hidden sm:flex">
          {[
            { icon: '▦', label: 'Overview',   active: true },
            { icon: '⊞', label: 'Bed Map' },
            { icon: '⏱', label: 'Queue' },
            { icon: '→', label: 'Transfers' },
            { icon: '↗', label: 'Flow Phases' },
          ].map(item => (
            <div key={item.label}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors
                ${item.active ? 'bg-brand-blue-lt text-brand-blue' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}>
              <span>{item.icon}</span>{item.label}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-4 overflow-hidden">
          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
            {[
              { label: 'Total Beds',    value: totalBeds,  sub: `${wards.length} wards`, cls: 'bg-blue-50 border-blue-100 text-blue-800' },
              { label: 'Available',     value: available,  sub: `${((available/totalBeds)*100).toFixed(0)}% free`, cls: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
              { label: 'Pending Clean', value: cleaning,   sub: 'avg 12 min', cls: 'bg-amber-50 border-amber-100 text-amber-700' },
              { label: 'Queue',         value: QUEUE.length, sub: 'awaiting beds', cls: 'bg-red-50 border-red-100 text-red-700' },
            ].map(s => (
              <div key={s.label} className={`rounded-xl border p-3 ${s.cls}`}>
                <div className="text-xs font-medium opacity-70 mb-1">{s.label}</div>
                <div className="text-2xl font-extrabold leading-none font-display">{s.value}</div>
                <div className="text-xs opacity-60 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Bed Map */}
            <div className="lg:col-span-2">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Bed Occupancy — Live Heatmap
              </div>
              <div className="flex flex-col gap-3 mb-4">
                {wards.map(ward => (
                  <div key={ward.name}>
                    <div className="text-xs font-semibold text-gray-600 mb-1.5">{ward.name}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {ward.beds.map((status, i) => (
                        <div key={i}
                          className={`w-6 h-5 rounded border transition-colors duration-500 cursor-pointer hover:scale-125 ${bedColor[status]}`}
                          title={status} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                {Object.entries(bedColor).map(([status, cls]) => (
                  <span key={status} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className={`w-3 h-2.5 rounded border ${cls}`} />
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                ))}
              </div>
            </div>

            {/* Admission Queue */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Admission Queue
              </div>

              <div className="space-y-3">
                {QUEUE.map((p, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                    <div className="w-7 h-7 rounded-full bg-brand-blue-lt border border-brand-blue/20 flex items-center justify-center text-xs font-bold text-brand-blue shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-brand-navy truncate">{p.name}</div>
                      <div className="text-xs text-gray-400">Wait: {p.wait}</div>
                    </div>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded
                      ${p.priority === 'high' ? 'bg-red-100 text-red-600' :
                        p.priority === 'med'  ? 'bg-amber-100 text-amber-600' :
                                                'bg-gray-100 text-gray-500'}`}>
                      {p.priority}
                    </span>
                  </div>
                ))}
                <div className="mt-1 text-center">
                  <span className="text-xs text-brand-blue font-semibold cursor-pointer hover:underline">
                    Flag transfer readiness →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const GridIcon  = () => <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="currentColor"><rect x="1" y="1" width="5" height="5" rx="1"/><rect x="8" y="1" width="5" height="5" rx="1"/><rect x="1" y="8" width="5" height="5" rx="1"/><rect x="8" y="8" width="5" height="5" rx="1"/></svg>;
const BedIcon   = () => <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 10V5a2 2 0 012-2h8a2 2 0 012 2v5"/><path d="M1 7h12"/></svg>;
const ClockIcon = () => <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="5.5"/><path d="M7 4v3.5l2.5 1.5" strokeLinecap="round"/></svg>;
const ArrowIcon = () => <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 7h10M8 4l4 3-4 3"/></svg>;
const FlowIcon  = () => <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="3" cy="7" r="2"/><circle cx="11" cy="7" r="2"/><path d="M5 7h4"/></svg>;
const ChartIcon = () => <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 11l3-4 3 2 4-6"/></svg>;
