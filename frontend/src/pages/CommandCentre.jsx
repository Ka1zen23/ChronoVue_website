import { useState, useEffect } from 'react';

/* ─── Live clock ─── */
function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function pad(n) { return String(n).padStart(2, '0'); }

/* ─── Card primitives ─── */
function Card({ children, className = '', style }) {
  return (
    <div
      className={`bg-white rounded-lg border border-black/[0.06] p-3 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function CardHeader({ num, title }) {
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#538c97]/15 text-[#538c97] text-[10px] font-bold shrink-0">
        {num}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-[#243046]/60">
        {title}
      </span>
    </div>
  );
}

/* ─── Sidebar icons ─── */
const DashIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 14 14" fill="currentColor">
    <rect x="1" y="1" width="5" height="5" rx="1" />
    <rect x="8" y="1" width="5" height="5" rx="1" />
    <rect x="1" y="8" width="5" height="5" rx="1" />
    <rect x="8" y="8" width="5" height="5" rx="1" />
  </svg>
);
const AnalyticsIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 11l3-4 3 2 4-6" strokeLinecap="round" />
  </svg>
);
const PersonIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="5" r="2.5" />
    <path d="M2 12c.8-2.5 2.5-4 5-4s4.2 1.5 5 4" strokeLinecap="round" />
  </svg>
);
const BedIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 10V5a2 2 0 012-2h8a2 2 0 012 2v5" />
    <path d="M1 7h12" />
    <path d="M1 10h12" />
  </svg>
);
const ChartBarIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="5" width="2.5" height="7" rx=".5" />
    <rect x="5.75" y="2" width="2.5" height="10" rx=".5" />
    <rect x="9.5" y="7" width="2.5" height="5" rx=".5" />
  </svg>
);
const SettingsIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="7" r="2.5" />
    <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.93 2.93l1.41 1.41M9.66 9.66l1.41 1.41M2.93 11.07l1.41-1.41M9.66 4.34l1.41-1.41" strokeLinecap="round" />
  </svg>
);
const LinkIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5.5 8.5l3-3M8 4l.7-.7a2.5 2.5 0 013.5 3.5L11.5 7.5M6 9.5l-.7.7a2.5 2.5 0 01-3.5-3.5L2.5 5.9" strokeLinecap="round" />
  </svg>
);

/* ─── Census table data ─── */
const mainBlock = [
  { ward: 'Annexes',           total: 40,  occ: 36, vac: 4,  dirty: 0, blocked: 0 },
  { ward: '150-week',          total: 30,  occ: 24, vac: 6,  dirty: 1, blocked: 0 },
  { ward: 'Endoscopy',         total: 10,  occ: 7,  vac: 3,  dirty: 0, blocked: 0 },
  { ward: 'Surgical',          total: 72,  occ: 58, vac: 14, dirty: 2, blocked: 0 },
  { ward: 'ICU',               total: 16,  occ: 14, vac: 2,  dirty: 0, blocked: 0 },
  { ward: 'CCU',               total: 12,  occ: 9,  vac: 3,  dirty: 0, blocked: 0 },
  { ward: 'Internal Medicine', total: 80,  occ: 76, vac: 4,  dirty: 1, blocked: 0 },
  { ward: 'Neuro / PJC',       total: 30,  occ: 22, vac: 8,  dirty: 0, blocked: 0 },
];
const wcc = [
  { ward: 'O&G',         total: 90,  occ: 52,  vac: 38, dirty: 2, blocked: 0 },
  { ward: 'Paediatrics', total: 60,  occ: 31,  vac: 29, dirty: 0, blocked: 0 },
  { ward: 'Floors (WCC)',total: 203, occ: 140, vac: 63, dirty: 3, blocked: 0 },
];

const CensusRow = ({ ward, total, occ, vac, dirty, blocked, bold }) => (
  <tr className={bold ? 'bg-gray-50/60 font-semibold' : 'hover:bg-gray-50/40'}>
    <td className={`py-0.5 pr-2 ${bold ? 'text-[11px]' : 'text-[11px]'} text-[#243046]`}>{ward}</td>
    <td className="py-0.5 px-2 text-center text-[11px] text-[#243046]">{total === null ? '—' : total}</td>
    <td className={`py-0.5 px-2 text-center text-[11px] font-semibold ${bold ? 'text-[#E57A1F]' : 'text-[#E57A1F]'}`}>
      {occ === null ? '—' : occ}
    </td>
    <td className={`py-0.5 px-2 text-center text-[11px] font-semibold ${bold ? 'text-[#538c97]' : 'text-[#538c97]'}`}>
      {vac === null ? '—' : vac}
    </td>
    <td className="py-0.5 px-2 text-center text-[11px] text-gray-400">{dirty === null ? '—' : dirty}</td>
    <td className="py-0.5 px-2 text-center text-[11px] text-gray-400">{blocked === null ? '—' : blocked}</td>
  </tr>
);

/* ─── Main component ─── */
export default function CommandCentre() {
  const now = useClock();
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  return (
    <div className="flex h-screen overflow-hidden font-sans text-sm bg-[#e6e5df]">

      {/* ── Sidebar ── */}
      <div className="w-[52px] shrink-0 bg-[#243046] flex flex-col items-center py-3 gap-3">
        {/* Logo */}
        <div className="w-8 h-8 rounded-lg bg-[#538c97]/30 flex items-center justify-center text-white text-[11px] font-bold mb-1">
          FL
        </div>

        {/* Nav icons */}
        {[
          { icon: <DashIcon />,      idx: 0 },
          { icon: <AnalyticsIcon />, idx: 1 },
          { icon: <PersonIcon />,    idx: 2 },
          { icon: <BedIcon />,       idx: 3 },
          { icon: <ChartBarIcon />,  idx: 4 },
          { icon: <SettingsIcon />,  idx: 5 },
        ].map(({ icon, idx }) => (
          <button
            key={idx}
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all
              ${idx === 3
                ? 'bg-[#538c97]/25 text-[#538c97] border border-[#538c97]/30'
                : 'text-white/30 hover:text-white/60 hover:bg-white/5'}`}
          >
            {icon}
          </button>
        ))}

        <div className="flex-1" />

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 text-[10px] font-semibold">
          SA
        </div>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5">
          <LinkIcon />
        </button>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* ── Header ── */}
        <div className="bg-white border-b border-black/[0.06] px-5 py-3 flex items-start justify-between shrink-0">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#538c97] mb-0.5">
              Command Centre
            </div>
            <h1 className="text-[17px] font-bold text-[#243046] leading-tight">
              Hospital Command Centre
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Bed management, patient flow, and operational visibility for the current shift.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Live indicator */}
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-700">Live</span>
            </div>
            <button className="text-[11px] font-medium text-gray-500 border border-black/10 rounded-full px-2.5 py-1 hover:bg-gray-50">
              Browser-only
            </button>
            <button className="text-[11px] font-medium text-gray-500 border border-black/10 rounded-full px-2.5 py-1 hover:bg-gray-50">
              Operational visibility
            </button>
            <div className="ml-1 text-right">
              <div className="font-mono font-bold text-[#243046] text-[15px] leading-none">
                {timeStr}
              </div>
              <div className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-wide">
                Brunei Standard Time
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="bg-white border-b border-black/[0.06] px-5 py-2.5 flex gap-8 shrink-0">
          {[
            { label: 'DATE',                  value: 'Wednesday, 27 May 2026' },
            { label: 'TIME OF UPDATE',         value: '00:02 BST' },
            { label: 'TOTAL POSITIVE (COVID)', value: '0' },
            { label: 'PREVIOUS TOTAL',         value: '0' },
            { label: 'COVID RTD DEATHS',       value: '0' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">{label}</div>
              <div className="text-[13px] font-semibold text-[#243046]">{value}</div>
            </div>
          ))}
        </div>

        {/* ── Dashboard grid ── */}
        <div className="flex-1 overflow-auto p-3 space-y-3">

          {/* TOP SECTION */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '25fr 15fr 13fr 47fr',
            gridTemplateRows: 'auto auto',
            gap: '0.75rem',
          }}>

            {/* Card 1 — 24-Hour Total Census */}
            <Card style={{ gridColumn: '1', gridRow: '1 / 3' }}>
              <CardHeader num="1" title="24-Hour Total Census" />

              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-[10px] text-gray-400 font-medium pb-1 pr-2">Ward/area</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1 px-2">Total</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1 px-2">Occ.</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1 px-2">Vac.</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1 px-2">Dirty</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1 px-2">Blk.</th>
                  </tr>
                </thead>
                <tbody>
                  {/* MAIN BLOCK section */}
                  <tr>
                    <td colSpan={6} className="pt-1.5 pb-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Main Block</span>
                    </td>
                  </tr>
                  {mainBlock.map(r => (
                    <CensusRow key={r.ward} {...r} />
                  ))}
                  <CensusRow
                    ward="Total – Main Block"
                    total={461} occ={378} vac={67}
                    dirty={null} blocked={null}
                    bold
                  />

                  {/* WCC section */}
                  <tr>
                    <td colSpan={6} className="pt-2 pb-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">WCC</span>
                    </td>
                  </tr>
                  {wcc.map(r => (
                    <CensusRow key={r.ward} {...r} />
                  ))}
                  <CensusRow
                    ward="Total – WCC"
                    total={353} occ={223} vac={130}
                    dirty={null} blocked={null}
                    bold
                  />

                  {/* OLD BUILDING section */}
                  <tr>
                    <td colSpan={6} className="pt-2 pb-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Old Building</span>
                    </td>
                  </tr>
                  <CensusRow
                    ward="Old Bldg – Ward A"
                    total={null} occ={null} vac={null}
                    dirty={null} blocked={null}
                  />
                </tbody>
              </table>
            </Card>

            {/* Card 2 — Occupancy Rate */}
            <Card style={{ gridColumn: '2', gridRow: '1' }}>
              <CardHeader num="2" title="Occupancy Rate" />

              <div className="space-y-3">
                {[
                  { label: 'Main Block', beds: 461, pct: 82, color: '#E57A1F' },
                  { label: 'WCC',        beds: 353, pct: 60, color: '#538c97' },
                  { label: 'Old Building', beds: null, pct: null, color: '#d1d5db' },
                ].map(({ label, beds, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-[11px] font-medium text-[#243046]">{label}</span>
                      <span className="text-[10px] text-gray-400">{beds !== null ? `${beds} beds` : '—'}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      {pct !== null && (
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: color }}
                        />
                      )}
                    </div>
                    <div className="text-right text-[10px] font-semibold mt-0.5" style={{ color: pct !== null ? color : '#9ca3af' }}>
                      {pct !== null ? `${pct}%` : '—'}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[9px] text-gray-400 mt-3 leading-snug">
                Midnight extract. Updates daily at 00:02.
              </p>
            </Card>

            {/* Card 3 — Total Vacant Beds */}
            <Card style={{ gridColumn: '3', gridRow: '1' }}>
              <CardHeader num="3" title="Total Vacant Beds" />

              <div className="space-y-1.5 mb-3">
                {[
                  { label: 'Main Block',   val: 67 },
                  { label: 'WCC',          val: 130 },
                  { label: 'Old Building', val: null },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-[11px] text-gray-500">{label}</span>
                    <span className="text-[11px] font-semibold text-[#243046]">{val !== null ? val : '—'}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-black/[0.06] pt-2 text-center">
                <div className="text-[32px] font-bold text-[#243046] leading-none">207</div>
                <div className="text-[9px] text-gray-400 uppercase tracking-wide mt-1">Grand Total</div>
              </div>
            </Card>

            {/* Card 4 — Isolation Wards */}
            <Card style={{ gridColumn: '4', gridRow: '1 / 3' }}>
              <CardHeader num="4" title="Isolation Wards" />

              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-[10px] text-gray-400 font-medium pb-1 pr-2">Ward</th>
                    <th className="text-left text-[10px] text-gray-400 font-medium pb-1 pr-2">Occupant category</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1 px-2">Pts</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1 px-2">Avail.</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { ward: 'Ward 3A',  cat: 'Urology',              pts: 4, avail: 0 },
                    { ward: 'Ward 5B',  cat: 'Plastic Surgery',       pts: 6, avail: 1 },
                    { ward: 'Ward 7',   cat: 'Neuro / PJC',           pts: 8, avail: 2 },
                    { ward: 'Ward 9',   cat: 'Psychiatric',           pts: 5, avail: 1 },
                    { ward: 'Ward 11',  cat: 'Maternity overflow',    pts: 3, avail: 0 },
                    { ward: 'Ward 12',  cat: 'Old Bldg patient',      pts: 2, avail: 0 },
                  ].map(({ ward, cat, pts, avail }) => (
                    <tr key={ward} className="hover:bg-gray-50/40">
                      <td className="py-1 pr-2 text-[11px] font-medium text-[#243046]">{ward}</td>
                      <td className="py-1 pr-2 text-[11px] text-gray-500">{cat}</td>
                      <td className="py-1 px-2 text-center text-[11px] text-[#243046]">{pts}</td>
                      <td className={`py-1 px-2 text-center text-[11px] font-semibold ${avail === 0 ? 'text-red-500' : 'text-[#7a9680]'}`}>
                        {avail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* Card 5 — Vacant Beds by Specialty */}
            <Card style={{ gridColumn: '2 / 4', gridRow: '2' }}>
              <CardHeader num="5" title="Vacant Beds by Specialty" />

              <div className="grid grid-cols-3 gap-2 mb-2">
                {[
                  { label: 'ICU',      val: 2,  status: 'critical', color: 'text-red-600' },
                  { label: 'CCU',      val: 3,  status: 'tight',    color: 'text-amber-500' },
                  { label: 'Int. Med', val: 4,  status: 'available',color: 'text-[#7a9680]' },
                  { label: 'Surgical', val: 14, status: 'available',color: 'text-[#7a9680]' },
                  { label: 'O&G',      val: 38, status: 'available',color: 'text-[#7a9680]' },
                  { label: 'Paeds',    val: 29, status: 'available',color: 'text-[#7a9680]' },
                ].map(({ label, val, color }) => (
                  <div key={label} className="bg-gray-50/60 rounded-md p-2 text-center">
                    <div className="text-[10px] text-gray-400 mb-0.5">{label}</div>
                    <div className={`text-[18px] font-bold leading-none ${color}`}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex gap-3">
                {[
                  { dot: 'bg-red-600',   label: 'critical' },
                  { dot: 'bg-amber-500', label: 'tight' },
                  { dot: 'bg-[#7a9680]', label: 'available' },
                ].map(({ dot, label }) => (
                  <div key={label} className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                    <span className="text-[9px] text-gray-400 capitalize">{label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* MID SECTION */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr 1.5fr 1.3fr 2.4fr',
            gap: '0.75rem',
          }}>

            {/* Card 6 — Pending ED */}
            <Card>
              <CardHeader num="6" title="Pending ED" />
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-[10px] text-gray-400 font-medium pb-1">Zone</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1">M</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1">F</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { zone: 'Adults', m: 4, f: 3, total: 7 },
                    { zone: 'CEN',    m: 1, f: 2, total: 3 },
                  ].map(r => (
                    <tr key={r.zone} className="hover:bg-gray-50/40">
                      <td className="py-0.5 text-[11px] text-[#243046]">{r.zone}</td>
                      <td className="py-0.5 text-center text-[11px] text-[#243046]">{r.m}</td>
                      <td className="py-0.5 text-center text-[11px] text-[#243046]">{r.f}</td>
                      <td className="py-0.5 text-center text-[11px] text-[#243046]">{r.total}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50/60 font-semibold">
                    <td className="py-0.5 text-[11px] text-[#243046]">Total</td>
                    <td className="py-0.5 text-center text-[11px] text-[#538c97]">5</td>
                    <td className="py-0.5 text-center text-[11px] text-[#538c97]">5</td>
                    <td className="py-0.5 text-center text-[11px] text-[#538c97]">10</td>
                  </tr>
                </tbody>
              </table>
            </Card>

            {/* Card 7 — CCS Step-Down */}
            <Card>
              <CardHeader num="7" title="CCS Step-Down" />
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-[10px] text-gray-400 font-medium pb-1">Unit</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1">Pts</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1">Dest.</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { unit: 'ICU 1', pts: 2,    },
                    { unit: 'ICU 2', pts: 1,    },
                    { unit: 'ICU 3', pts: 0,    },
                    { unit: 'CCL',   pts: 1,    },
                  ].map(r => (
                    <tr key={r.unit} className="hover:bg-gray-50/40">
                      <td className="py-0.5 text-[11px] text-[#243046]">{r.unit}</td>
                      <td className={`py-0.5 text-center text-[11px] font-semibold ${r.pts > 0 ? 'text-[#7a9680]' : 'text-gray-300'}`}>
                        {r.pts}
                      </td>
                      <td className="py-0.5 text-center text-[11px] text-gray-400">ward</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* Card 8 — 24HR ED Attendance */}
            <Card>
              <CardHeader num="8" title="24HR ED Attendance" />
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-[10px] text-gray-400 font-medium pb-1">Priority</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1">Adult</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1">CF</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Priority 1', adult: 8,  cf: 2,  total: 10 },
                    { label: 'Priority 2', adult: 34, cf: 11, total: 45 },
                    { label: 'Priority 3', adult: 57, cf: 15, total: 72 },
                  ].map(r => (
                    <tr key={r.label} className="hover:bg-gray-50/40">
                      <td className="py-0.5 text-[11px] text-[#243046]">{r.label}</td>
                      <td className="py-0.5 text-center text-[11px] text-[#243046]">{r.adult}</td>
                      <td className="py-0.5 text-center text-[11px] text-[#243046]">{r.cf}</td>
                      <td className="py-0.5 text-center text-[11px] text-[#243046]">{r.total}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50/60 font-semibold">
                    <td className="py-0.5 text-[11px] text-[#243046]">Total</td>
                    <td className="py-0.5 text-center text-[11px] text-[#538c97]">99</td>
                    <td className="py-0.5 text-center text-[11px] text-[#538c97]">28</td>
                    <td className="py-0.5 text-center text-[11px] text-[#538c97]">127</td>
                  </tr>
                </tbody>
              </table>
            </Card>

            {/* Card 9 — Total Outlier */}
            <Card>
              <CardHeader num="9" title="Total Outlier" />
              <div className="space-y-1">
                {[
                  { label: 'Internal Medicine', val: 5 },
                  { label: 'Surgical',          val: 3 },
                  { label: 'Orthopaedics',      val: 2 },
                  { label: 'Old Building',      val: null },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-[11px] text-gray-500">{label}</span>
                    <span className={`text-[11px] font-semibold ${val !== null ? 'text-[#E57A1F]' : 'text-gray-300'}`}>
                      {val !== null ? val : '—'}
                    </span>
                  </div>
                ))}
                <div className="border-t border-black/[0.06] pt-1.5 flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-[#243046]">Total</span>
                  <span className="text-[15px] font-bold text-[#E57A1F]">10</span>
                </div>
              </div>
            </Card>

            {/* Card 10 — IN/Cases – Anaesthesiology */}
            <Card>
              <CardHeader num="10" title="IN/Cases – Anaesthesiology" />
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-[10px] text-gray-400 font-medium pb-1">Type</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1">IP</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1">Day</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1">PN</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1">ME</th>
                    <th className="text-center text-[10px] text-gray-400 font-medium pb-1">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: 'Inpatient',  ip: 12, day: 4, pn: 2, me: 1, total: 19 },
                    { type: 'Emergency',  ip: 5,  day: 0, pn: 1, me: 0, total: 6  },
                    { type: 'Elective',   ip: 7,  day: 4, pn: 1, me: 1, total: 13 },
                  ].map(r => (
                    <tr key={r.type} className="hover:bg-gray-50/40">
                      <td className="py-0.5 text-[11px] text-[#243046]">{r.type}</td>
                      <td className="py-0.5 text-center text-[11px] text-[#243046]">{r.ip}</td>
                      <td className="py-0.5 text-center text-[11px] text-[#243046]">{r.day}</td>
                      <td className="py-0.5 text-center text-[11px] text-[#243046]">{r.pn}</td>
                      <td className="py-0.5 text-center text-[11px] text-[#243046]">{r.me}</td>
                      <td className="py-0.5 text-center text-[11px] text-[#243046]">{r.total}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50/60 font-semibold">
                    <td className="py-0.5 text-[11px] text-[#243046]">Total</td>
                    <td className="py-0.5 text-center text-[11px] text-[#538c97]">24</td>
                    <td className="py-0.5 text-center text-[11px] text-[#538c97]">8</td>
                    <td className="py-0.5 text-center text-[11px] text-[#538c97]">4</td>
                    <td className="py-0.5 text-center text-[11px] text-[#538c97]">2</td>
                    <td className="py-0.5 text-center text-[11px] text-[#538c97]">38</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>

          {/* BOTTOM SECTION */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 3fr',
            gap: '0.75rem',
          }}>

            {/* Card 11 — Psychiatric – Police Case – Mission */}
            <Card>
              <CardHeader num="11" title="Psychiatric – Police Case – Mission" />
              <div className="space-y-1">
                {[
                  { label: 'Psychiatric admissions',    val: 3 },
                  { label: 'Police escort cases',       val: 1 },
                  { label: 'Mission / foreign national',val: 2 },
                  { label: 'First class (private)',     val: 4 },
                  { label: 'Nationwide panel',          val: 1 },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-[11px] text-gray-500">{label}</span>
                    <span className="text-[11px] font-semibold text-[#243046]">{val}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Card 12 — Maintenance Issues */}
            <Card>
              <CardHeader num="12" title="Maintenance Issues" />
              <div className="space-y-1.5">
                {[
                  { date: '27-5', issue: 'Bed sensor fault — Ward 3A' },
                  { date: '26-5', issue: 'AC unit — Room 11B' },
                ].map(({ date, issue }) => (
                  <div key={date + issue} className="flex gap-2.5 items-start">
                    <span className="font-mono text-[10px] text-gray-400 shrink-0 pt-px">{date}</span>
                    <span className="text-[11px] text-[#243046]">{issue}</span>
                  </div>
                ))}
                <button className="text-[11px] font-medium text-[#538c97] hover:underline mt-1">
                  + Add issue
                </button>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
