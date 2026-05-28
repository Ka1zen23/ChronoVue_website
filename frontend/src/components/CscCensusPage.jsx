import { useEffect, useMemo, useState } from 'react';
import { buildCensusRow, buildDisplayRows, CensusTable, sumRows } from './CensusPage';

function formatDateInput(value) {
  if (!value) return '';
  return new Date(value).toISOString().split('T')[0];
}
async function readJsonResponse(response) {
  const text = await response.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { throw new Error('Invalid JSON response'); }
}

const wccServiceRows = [
  buildCensusRow({ id: 'wcc-obs-gya', service_name: 'OBS & GYA', ward_name: 'OBS & GYA', total_beds: 154 }),
  buildCensusRow({ id: 'wcc-paeds', service_name: 'PAEDS', ward_name: 'PAEDS', total_beds: 199 })
];

const edPriorityRows = [
  { id: 'priority-1', label: 'Priority 1' },
  { id: 'priority-2', label: 'Priority 2' },
  { id: 'priority-3', label: 'Priority 3' }
];

function clampNumber(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0;
}
function formatOccupancyRate(occupied, beds) {
  if (!beds) return '0%';
  return `${Math.round((occupied / beds) * 100)}%`;
}
function getEdNumber(value) { return value === '' ? null : clampNumber(value); }
function getEdTotal(row) {
  const a = getEdNumber(row.adult), c = getEdNumber(row.ce);
  if (a === null && c === null) return '';
  return (a ?? 0) + (c ?? 0);
}

function SummaryTable({ title, columns, rows }) {
  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
      <div className="border-b border-[#E5E7EB] px-2 py-2"><h2 className="text-sm font-semibold text-[#1F2937]">{title}</h2></div>
      <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-xl text-left text-xs text-[#1F2937]">
        <thead>
          <tr>
            <th className="border-b border-r border-[#E5E7EB] bg-white px-3 py-2 text-left font-bold"> </th>
            {columns.map((c) => <th key={c.key} className="border-b border-r border-[#E5E7EB] bg-white px-3 py-2 text-right font-bold">{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="bg-white">
              <td className="border-b border-r border-[#E5E7EB] px-3 py-2 font-semibold">{row.label}</td>
              {columns.map((c) => <td key={c.key} className="border-b border-r border-[#E5E7EB] px-3 py-2 text-right font-medium tabular-nums">{row[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function EdAttendanceTable({ rows, onChange }) {
  const totals = rows.reduce((t, row) => {
    const a = getEdNumber(row.adult) ?? 0, c = getEdNumber(row.ce) ?? 0;
    return { adult: t.adult + a, ce: t.ce + c, total: t.total + a + c };
  }, { adult: 0, ce: 0, total: 0 });
  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
      <div className="border-b border-[#E5E7EB] px-2 py-2"><h2 className="text-sm font-semibold text-[#1F2937]">24-hour Total ED Attendance</h2></div>
      <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-xl text-left text-xs text-[#1F2937]">
        <thead>
          <tr>
            <th className="border-b border-r border-[#E5E7EB] bg-white px-3 py-2 text-left font-bold">Priority</th>
            <th className="border-b border-r border-[#E5E7EB] bg-white px-3 py-2 text-right font-bold">Adult</th>
            <th className="border-b border-r border-[#E5E7EB] bg-white px-3 py-2 text-right font-bold">CE</th>
            <th className="border-b border-r border-[#E5E7EB] bg-white px-3 py-2 text-right font-bold">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="bg-white">
              <td className="border-b border-r border-[#E5E7EB] px-3 py-2 font-semibold">{row.label}</td>
              {['adult', 'ce'].map((field) => (
                <td key={field} className="border-b border-r border-[#E5E7EB] px-3 py-2">
                  <input type="number" min="0" value={row[field]} onChange={(e) => onChange(row.id, field, e.target.value)} className="h-9 w-full rounded-lg border border-[#E5E7EB] bg-white px-2 text-right text-xs text-[#1F2937] outline-none focus:border-[#CBD5E1]" />
                </td>
              ))}
              <td className="border-b border-r border-[#E5E7EB] px-3 py-2 text-right font-semibold tabular-nums">{getEdTotal(row)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="border-r border-t border-[#CBD5E1] bg-[#E2E8F0] px-3 py-2 font-bold">Total</td>
            <td className="border-r border-t border-[#CBD5E1] bg-[#E2E8F0] px-3 py-2 text-right font-bold tabular-nums">{totals.adult || ''}</td>
            <td className="border-r border-t border-[#CBD5E1] bg-[#E2E8F0] px-3 py-2 text-right font-bold tabular-nums">{totals.ce || ''}</td>
            <td className="border-r border-t border-[#CBD5E1] bg-[#E2E8F0] px-3 py-2 text-right font-bold tabular-nums">{totals.total || ''}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}

export default function CscCensusPage() {
  const [date, setDate] = useState(formatDateInput(new Date()));
  const [mainBlockRecords, setMainBlockRecords] = useState([]);
  const [edRows, setEdRows] = useState(() => edPriorityRows.map((r) => ({ ...r, adult: '', ce: '' })));
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/census/categories?date=${date}`);
        if (!res.ok) throw new Error('Unable to load CSC census data');
        const data = await readJsonResponse(res);
        setMainBlockRecords((data ?? []).map(buildCensusRow));
        setStatusMessage('');
      } catch (error) {
        console.error('CSC census load error', error);
        setStatusMessage('Unable to load CSC census records.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [date]);

  const mainBlockRows = useMemo(() => buildDisplayRows(mainBlockRecords), [mainBlockRecords]);
  const mainBlockTotal = useMemo(() => sumRows(mainBlockRecords, { id: 'main-block-total', display_name: 'Total Main Block' }), [mainBlockRecords]);
  const wccRows = useMemo(() => buildDisplayRows(wccServiceRows), []);
  const wccTotal = useMemo(() => sumRows(wccServiceRows, { id: 'wcc-total', display_name: 'Total WCC' }), []);
  const grandTotal = useMemo(() => sumRows([mainBlockTotal, wccTotal], { id: 'grand-total', display_name: 'Grand Total' }), [mainBlockTotal, wccTotal]);
  const occupancyRows = useMemo(() => [
    { label: 'Main Block', occupied: mainBlockTotal.current_total, beds: mainBlockTotal.total_beds, rate: formatOccupancyRate(mainBlockTotal.current_total, mainBlockTotal.total_beds) },
    { label: 'WCC', occupied: wccTotal.current_total, beds: wccTotal.total_beds, rate: formatOccupancyRate(wccTotal.current_total, wccTotal.total_beds) }
  ], [mainBlockTotal, wccTotal]);
  const vacantRows = useMemo(() => {
    const mv = Math.max(0, mainBlockTotal.total_beds - mainBlockTotal.current_total);
    const wv = Math.max(0, wccTotal.total_beds - wccTotal.current_total);
    return [{ label: 'Main Block', beds: mv }, { label: 'WCC', beds: wv }, { label: 'Grand Total', beds: mv + wv }];
  }, [mainBlockTotal, wccTotal]);

  const handleEdChange = (rowId, field, value) => {
    const clean = value === '' ? '' : String(Math.max(0, Number.parseInt(value, 10) || 0));
    setEdRows((rows) => rows.map((r) => r.id === rowId ? { ...r, [field]: clean } : r));
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-page-container">
        <div className="flex flex-col gap-4">
          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">CSC Census</p>
                <h1 className="mt-2 text-xl font-semibold text-[#1F2937]">All services</h1>
                <p className="mt-1 text-xs text-[#1F2937]">Main Block and WCC census tables for the 24-hour service census.</p>
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Date</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#1F2937] outline-none transition focus:border-[#CBD5E1]" />
              </label>
            </div>
          </section>
          {statusMessage ? <div className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#1F2937]">{statusMessage}</div> : null}
          <section className="rounded-3xl border border-[#E5E7EB] bg-white p-3 shadow-sm">
            <div className="border-b border-[#E5E7EB] px-2 pb-3"><h2 className="text-base font-semibold text-[#1F2937]">Building Census</h2></div>
            <div className="mt-3 flex flex-col gap-4">
              <CensusTable footerRows={[mainBlockTotal]} loading={loading} rows={mainBlockRows} title="Main Block" />
              <CensusTable footerRows={[wccTotal, grandTotal]} rows={wccRows} title="WCC" />
            </div>
          </section>
          <section className="rounded-3xl border border-[#E5E7EB] bg-white p-3 shadow-sm">
            <div className="border-b border-[#E5E7EB] px-2 pb-3"><h2 className="text-base font-semibold text-[#1F2937]">Bed Summary</h2></div>
            <div className="mt-3 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <SummaryTable title="Occupancy Rate" columns={[{ key: 'occupied', label: 'Overall Total' }, { key: 'beds', label: 'Total Beds' }, { key: 'rate', label: 'Occupancy Rate' }]} rows={occupancyRows} />
              <SummaryTable title="Total Vacant Beds" columns={[{ key: 'beds', label: 'Beds' }]} rows={vacantRows} />
            </div>
          </section>
          <EdAttendanceTable rows={edRows} onChange={handleEdChange} />
        </div>
      </div>
    </main>
  );
}
