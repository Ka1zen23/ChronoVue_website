import { useState, useEffect } from 'react';

const STATUSES = ['occupied', 'available', 'cleaning', 'reserved'];

const BED_STYLE = {
  occupied:  { bg: 'bg-blue-500/20 border-blue-400/40',  dot: 'bg-blue-400' },
  available: { bg: 'bg-emerald-500/20 border-emerald-400/40', dot: 'bg-emerald-400' },
  cleaning:  { bg: 'bg-amber-500/20 border-amber-400/40',   dot: 'bg-amber-400' },
  reserved:  { bg: 'bg-violet-500/20 border-violet-400/40',  dot: 'bg-violet-400' },
};

const WARDS = [
  { name: 'AMU · Acute Medical',  beds: ['occupied','occupied','occupied','cleaning','available','available','occupied','occupied','occupied','available'], tag: 'ACTIVE PILOT' },
  { name: 'Ward B · General Med', beds: ['occupied','available','occupied','occupied','cleaning','occupied','available','occupied','reserved','occupied'], tag: null },
  { name: 'Ward C · Surgical',    beds: ['available','available','occupied','occupied','available','occupied','cleaning','available','occupied','occupied'], tag: null },
];

const QUEUE = [
  { id: 1, wait: '1h 12m', priority: 'high',   ward: 'AMU' },
  { id: 2, wait: '47m',    priority: 'medium',  ward: 'AMU' },
  { id: 3, wait: '23m',    priority: 'low',     ward: 'Ward B' },
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
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const totalBeds = wards.reduce((s, w) => s + w.beds.length, 0);
  const available = wards.reduce((s, w) => s + w.beds.filter(b => b === 'available').length, 0);
  const cleaning  = wards.reduce((s, w) => s + w.beds.filter(b => b === 'cleaning').length, 0);

  return (
    <div className="rounded-2xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.35)] overflow-hidden bg-[#111827]">

      {/* Title bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#0d1117] border-b border-white/[0.07]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="flex-1 text-center text-[12px] font-medium text-white/25">
          FLOW — CSC Central Dashboard
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-green">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-live-ring" />
          Live
        </span>
      </div>

      <div className="flex" style={{ minHeight: '340px' }}>
        {/* Sidebar */}
        <div className="w-[130px] shrink-0 border-r border-white/[0.06] bg-[#0d1117]/60 p-3
          flex-col gap-0.5 hidden sm:flex">
          {[
            { icon: <GridIcon />,     label: 'Overview',    active: true },
            { icon: <BedIcon />,      label: 'Bed Map' },
            { icon: <ClockIcon />,    label: 'Queue' },
            { icon: <ArrowIcon />,    label: 'Transfers' },
            { icon: <FlowIcon />,     label: 'Flow' },
            { icon: <ChartIcon />,    label: 'Analytics' },
          ].map(item => (
            <div key={item.label}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] font-medium cursor-pointer transition-colors
                ${item.active
                  ? 'bg-brand-blue/20 text-brand-blue border border-brand-blue/20'
                  : 'text-white/30 hover:text-white/60 hover:bg-white/[0.04]'}`}>
              <span className="opacity-80">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 overflow-hidden">
          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Total Beds',    value: totalBeds, sub: `${wards.length} wards active`,    accent: 'border-white/10 text-white/80' },
              { label: 'Available',     value: available, sub: `${((available/totalBeds)*100).toFixed(0)}% occupancy free`, accent: 'border-emerald-500/20 text-emerald-400' },
              { label: 'Pending Clean', value: cleaning,  sub: 'avg. 12 min turnover', accent: 'border-amber-500/20 text-amber-400' },
              { label: 'Queue',         value: QUEUE.length, sub: 'patients awaiting',   accent: 'border-red-500/20 text-red-400' },
            ].map(s => (
              <div key={s.label}
                className={`rounded-xl border bg-white/[0.03] p-3.5 ${s.accent}`}>
                <div className="text-[11px] font-medium text-white/40 mb-1.5">{s.label}</div>
                <div className={`text-2xl font-display font-extrabold leading-none mb-1 ${s.accent.split(' ')[1]}`}>{s.value}</div>
                <div className="text-[10px] text-white/25">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Bed heatmap */}
            <div className="lg:col-span-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/30 mb-3">
                Bed Occupancy — Live Heatmap
              </div>
              <div className="flex flex-col gap-4">
                {wards.map(ward => (
                  <div key={ward.name}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[12px] font-semibold text-white/60">{ward.name}</span>
                      {ward.tag && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5
                          rounded bg-brand-green/15 text-brand-green border border-brand-green/25">
                          {ward.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {ward.beds.map((status, i) => (
                        <div
                          key={i}
                          title={status}
                          className={`bed-cell w-6 h-5 rounded border cursor-pointer hover:scale-125 transition-transform ${BED_STYLE[status].bg}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                {Object.entries(BED_STYLE).map(([status, style]) => (
                  <span key={status} className="flex items-center gap-1.5 text-[11px] text-white/35">
                    <span className={`w-2 h-2 rounded-sm ${style.dot}`} />
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                ))}
              </div>
            </div>

            {/* Queue */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/30 mb-3">
                Admission Queue
              </div>
              <div className="flex flex-col gap-2">
                {QUEUE.map((p, i) => (
                  <div key={p.id}
                    className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.07]
                      rounded-xl px-3 py-2.5 hover:bg-white/[0.06] transition-colors cursor-pointer">
                    <div className="w-6 h-6 rounded-lg bg-brand-blue/20 border border-brand-blue/25
                      flex items-center justify-center text-[11px] font-bold text-brand-blue shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold text-white/70 mb-0.5">Patient {p.id}</div>
                      <div className="text-[11px] text-white/30">Wait {p.wait} · {p.ward}</div>
                    </div>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${PRIORITY_STYLE[p.priority]}`}>
                      {p.priority}
                    </span>
                  </div>
                ))}
                <button className="mt-1 text-[12px] text-brand-blue font-semibold text-center
                  hover:text-brand-blue-dk transition-colors">
                  Flag transfer readiness
                </button>
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
