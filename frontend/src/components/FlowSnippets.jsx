/* Static UI previews showing key FLOW screens */

const wardRows = [
  { ward: 'ICU',               occ: 14, vac: 2,  total: 16, pct: 88 },
  { ward: 'Internal Medicine', occ: 76, vac: 4,  total: 80, pct: 95 },
  { ward: 'Surgical',          occ: 58, vac: 14, total: 72, pct: 81 },
  { ward: 'O&G',               occ: 52, vac: 38, total: 90, pct: 58 },
  { ward: 'Paediatrics',       occ: 31, vac: 29, total: 60, pct: 52 },
];

function pctColor(pct) {
  if (pct >= 90) return '#ef4444';
  if (pct >= 80) return '#f59e0b';
  return '#538c97';
}

const queueItems = [
  { patient: 'Patient A', from: 'ED', to: 'Internal Med', priority: 'Urgent',  time: '09:14' },
  { patient: 'Patient B', from: 'ICU', to: 'Surgical',    priority: 'Ready',   time: '09:31' },
  { patient: 'Patient C', from: 'ED', to: 'O&G',          priority: 'Routine', time: '09:47' },
  { patient: 'Patient D', from: 'Annexes', to: 'CCU',     priority: 'Urgent',  time: '10:02' },
];

const priorityStyle = {
  Urgent:  'bg-red-50 text-red-600 border border-red-200',
  Ready:   'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Routine: 'bg-gray-100 text-gray-500 border border-gray-200',
};

function SnippetShell({ label, children }) {
  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white overflow-hidden shadow-sm">
      <div className="bg-[#243046] px-4 py-2.5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <span className="text-[11px] font-semibold text-white/40 ml-1">{label}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function BedCensusSnippet() {
  return (
    <SnippetShell label="FLOW · Bed Census">
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
        Live ward occupancy
      </div>
      <div className="flex flex-col gap-2.5">
        {wardRows.map(r => (
          <div key={r.ward}>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[12px] font-medium text-[#243046]">{r.ward}</span>
              <span className="text-[11px] font-semibold" style={{ color: pctColor(r.pct) }}>
                {r.occ}/{r.total}
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${r.pct}%`, backgroundColor: pctColor(r.pct) }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-black/[0.06] flex justify-between text-[11px]">
        <span className="text-gray-400">Grand total</span>
        <span className="font-bold text-[#243046]">207 vacant beds</span>
      </div>
    </SnippetShell>
  );
}

function HeatmapSnippet() {
  const cells = [
    { label: 'ICU',     pct: 88 }, { label: 'CCU',     pct: 75 },
    { label: 'Int Med', pct: 95 }, { label: 'Surgical', pct: 81 },
    { label: 'O&G',     pct: 58 }, { label: 'Paeds',    pct: 52 },
    { label: 'Annexes', pct: 90 }, { label: 'Neuro',    pct: 73 },
    { label: 'Endo',    pct: 70 }, { label: '150-Wk',  pct: 80 },
  ];

  function cellBg(pct) {
    if (pct >= 90) return 'rgba(239,68,68,0.15)';
    if (pct >= 80) return 'rgba(245,158,11,0.12)';
    return 'rgba(83,140,151,0.12)';
  }
  function cellText(pct) {
    if (pct >= 90) return '#ef4444';
    if (pct >= 80) return '#d97706';
    return '#538c97';
  }

  return (
    <SnippetShell label="FLOW · Capacity Heatmap">
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
        Hospital-wide occupancy
      </div>
      <div className="grid grid-cols-2 gap-1.5 mb-4">
        {cells.map(c => (
          <div
            key={c.label}
            className="rounded-lg p-2.5 flex justify-between items-center"
            style={{ background: cellBg(c.pct) }}
          >
            <span className="text-[11px] font-medium text-[#243046]">{c.label}</span>
            <span className="text-[12px] font-bold" style={{ color: cellText(c.pct) }}>{c.pct}%</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 text-[10px]">
        {[
          { dot: '#ef4444', label: '≥90% full' },
          { dot: '#d97706', label: '80–89%' },
          { dot: '#538c97', label: 'Available' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: l.dot, opacity: 0.6 }} />
            <span className="text-gray-400">{l.label}</span>
          </div>
        ))}
      </div>
    </SnippetShell>
  );
}

function AdmissionQueueSnippet() {
  return (
    <SnippetShell label="FLOW · Admission Queue">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Pending transfers
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-semibold text-emerald-700">Live</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {queueItems.map(q => (
          <div key={q.patient}
            className="rounded-lg border border-black/[0.06] p-2.5 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[12px] font-semibold text-[#243046] truncate">{q.patient}</div>
              <div className="text-[11px] text-gray-400 truncate">
                {q.from} → {q.to}
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-1.5">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priorityStyle[q.priority]}`}>
                {q.priority}
              </span>
              <span className="text-[10px] font-mono text-gray-400">{q.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-black/[0.06] text-center">
        <span className="text-[11px] text-gray-400">
          Nurse managers flag transfer readiness directly in FLOW, no WhatsApp needed.
        </span>
      </div>
    </SnippetShell>
  );
}

export default function FlowSnippets() {
  return (
    <section className="py-20 bg-gray-50 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <div data-reveal className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1
            rounded-full mb-4 bg-brand-blue/10 text-brand-blue border border-brand-blue/15">
            Platform Preview
          </span>
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-display font-extrabold
            tracking-tight text-brand-navy mb-3">
            What the shift coordinator sees
          </h2>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            A single screen replaces four manual data sources. Every view updates the moment a
            nurse changes anything on any ward.
          </p>
        </div>

        <div data-stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div data-reveal><BedCensusSnippet /></div>
          <div data-reveal><HeatmapSnippet /></div>
          <div data-reveal><AdmissionQueueSnippet /></div>
        </div>
      </div>
    </section>
  );
}
