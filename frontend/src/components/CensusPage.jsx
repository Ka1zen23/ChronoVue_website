import { useEffect, useMemo, useState } from 'react';

const summedFields = new Set(['previous_male','previous_female','admissions_male','admissions_female','transfers_in_male','transfers_in_female','transfers_out_male','transfers_out_female','discharges_male','discharges_female','deaths_male','deaths_female','absconded_male','absconded_female','total_beds']);

const censusGroups = [
  { label: 'Previous', columns: [{ key: 'previous_total', label: 'Total', fullLabel: 'Previous Total' },{ key: 'previous_male', label: 'M', fullLabel: 'Previous Male' },{ key: 'previous_female', label: 'F', fullLabel: 'Previous Female' }] },
  { label: 'Admission', columns: [{ key: 'admissions_male', label: 'M', fullLabel: 'Admission Male' },{ key: 'admissions_female', label: 'F', fullLabel: 'Admission Female' }] },
  { label: 'Transfer In', columns: [{ key: 'transfers_in_male', label: 'M', fullLabel: 'Transfer In Male' },{ key: 'transfers_in_female', label: 'F', fullLabel: 'Transfer In Female' }] },
  { label: 'Total 1', columns: [{ key: 'movement_total_male', label: 'M', fullLabel: 'Admission Male + Transfer In Male' },{ key: 'movement_total_female', label: 'F', fullLabel: 'Admission Female + Transfer In Female' }] },
  { label: 'Transfer Out', columns: [{ key: 'transfers_out_male', label: 'M', fullLabel: 'Transfer Out Male' },{ key: 'transfers_out_female', label: 'F', fullLabel: 'Transfer Out Female' }] },
  { label: 'Discharge', columns: [{ key: 'discharges_male', label: 'M', fullLabel: 'Discharge Male' },{ key: 'discharges_female', label: 'F', fullLabel: 'Discharge Female' }] },
  { label: 'Death', columns: [{ key: 'deaths_male', label: 'M', fullLabel: 'Death Male' },{ key: 'deaths_female', label: 'F', fullLabel: 'Death Female' }] },
  { label: 'AMA', columns: [{ key: 'absconded_male', label: 'M', fullLabel: 'AMA Male' },{ key: 'absconded_female', label: 'F', fullLabel: 'AMA Female' }] },
  { label: 'Total 2', columns: [{ key: 'outflow_total_male', label: 'M', fullLabel: 'Transfer Out Male + Discharge Male + Death Male + AMA Male' },{ key: 'outflow_total_female', label: 'F', fullLabel: 'Transfer Out Female + Discharge Female + Death Female + AMA Female' }] },
  { label: 'Number Remaining', columns: [{ key: 'current_total', label: 'Total', fullLabel: 'Current Total' },{ key: 'current_male', label: 'M', fullLabel: 'Current Male' },{ key: 'current_female', label: 'F', fullLabel: 'Current Female' }] },
  { label: 'Total Beds', columns: [{ key: 'total_beds', label: '', fullLabel: 'Total Beds' }] }
];

const censusColumns = censusGroups.flatMap((g) => g.columns);

function formatDateInput(value) {
  if (!value) return '';
  return new Date(value).toISOString().split('T')[0];
}

function clampNumber(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0;
}

export function buildCensusRow(record) {
  const pm = clampNumber(record.previous_male), pf = clampNumber(record.previous_female);
  const am = clampNumber(record.admissions_male), af = clampNumber(record.admissions_female);
  const tim = clampNumber(record.transfers_in_male), tif = clampNumber(record.transfers_in_female);
  const tom = clampNumber(record.transfers_out_male), tof = clampNumber(record.transfers_out_female);
  const dm = clampNumber(record.discharges_male), df = clampNumber(record.discharges_female);
  const dtm = clampNumber(record.deaths_male), dtf = clampNumber(record.deaths_female);
  const abm = clampNumber(record.absconded_male), abf = clampNumber(record.absconded_female);
  const tb = clampNumber(record.total_beds);
  const previous_total = pm + pf;
  const movement_total_male = am + tim, movement_total_female = af + tif;
  const outflow_total_male = tom + dm + dtm + abm, outflow_total_female = tof + df + dtf + abf;
  const current_male = Math.max(0, pm + movement_total_male - outflow_total_male);
  const current_female = Math.max(0, pf + movement_total_female - outflow_total_female);
  const current_total = current_male + current_female;
  return { ...record, previous_total, previous_male: pm, previous_female: pf, admissions_male: am, admissions_female: af, transfers_in_male: tim, transfers_in_female: tif, movement_total_male, movement_total_female, transfers_out_male: tom, transfers_out_female: tof, discharges_male: dm, discharges_female: df, deaths_male: dtm, deaths_female: dtf, absconded_male: abm, absconded_female: abf, outflow_total: outflow_total_male + outflow_total_female, outflow_total_male, outflow_total_female, current_total, current_male, current_female, total_male: current_male, total_female: current_female, total_occupied: current_total, total_beds: tb, available_beds: Math.max(0, tb - current_total) };
}

function createTotalsSeed(overrides = {}) {
  return buildCensusRow({ previous_male: 0, previous_female: 0, admissions_male: 0, admissions_female: 0, transfers_in_male: 0, transfers_in_female: 0, transfers_out_male: 0, transfers_out_female: 0, discharges_male: 0, discharges_female: 0, deaths_male: 0, deaths_female: 0, absconded_male: 0, absconded_female: 0, total_beds: 0, ...overrides });
}

export function sumRows(rows, overrides = {}) {
  const totals = createTotalsSeed(overrides);
  rows.forEach((row) => { summedFields.forEach((field) => { totals[field] += clampNumber(row[field]); }); });
  return buildCensusRow(totals);
}

export function buildDisplayRows(records, displayMode = 'service') {
  return records.map((record) => ({ ...record, rowType: 'category', display_name: displayMode === 'ward' ? (record.ward_name ?? record.service_name ?? 'Unknown') : (record.service_name ?? record.ward_name ?? 'Unknown') }));
}

function buildCsv(rows) {
  const headers = ['Services', ...censusColumns.map((c) => c.label)];
  const csvRows = rows.map((row) => [row.display_name ?? row.service_name ?? row.ward_name ?? 'Unknown', ...censusColumns.map((c) => row[c.key] ?? 0)]);
  return [headers, ...csvRows].map((row) => row.map((cell) => JSON.stringify(cell ?? '')).join(',')).join('\n');
}

async function readJsonResponse(response) {
  const text = await response.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { throw new Error(response.ok ? 'Server returned an invalid JSON response.' : 'Server returned a non-JSON error response.'); }
}

function buildRequestUrl(endpoint, date) {
  const sep = endpoint.includes('?') ? '&' : '?';
  return `${endpoint}${sep}date=${date}`;
}

export function CensusTable({ emptyMessage = 'No matching census records for this selection.', footerRows = [], loading = false, rows = [], title = null }) {
  const totalColumnSpan = censusColumns.length + 1;
  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
      {title ? <div className="border-b border-[#E5E7EB] px-2 py-2"><h2 className="text-sm font-semibold text-[#1F2937]">{title}</h2></div> : null}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-xl text-left text-[10px] leading-tight text-[#1F2937]" style={{ minWidth: '900px' }}>
          <colgroup>
            <col style={{ width: '10%' }} />
            {censusColumns.map((c) => <col key={c.key} style={{ width: `${90 / censusColumns.length}%` }} />)}
          </colgroup>
          <thead className="text-[9px] text-[#1F2937]">
            <tr>
              <th rowSpan={2} className="border-b border-r border-[#E5E7EB] bg-white px-2 py-2 text-left align-middle font-bold">Services</th>
              {censusGroups.map((group) => (
                <th key={group.label} colSpan={group.columns.length} className="border-b border-r border-[#E5E7EB] bg-white px-1 py-1.5 text-center align-middle font-bold">{group.label}</th>
              ))}
            </tr>
            <tr>
              {censusGroups.flatMap((group) => group.columns.map((col, i) => (
                <th key={col.key} title={col.fullLabel} className={`border-b px-1 py-1 text-right font-semibold text-[#1F2937] bg-white ${i === group.columns.length - 1 ? 'border-r border-[#E5E7EB]' : 'border-r border-[#EEF2F7]'}`}>{col.label}</th>
              )))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={totalColumnSpan} className="px-2 py-4 text-center text-xs text-[#1F2937]">Loading census records...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={totalColumnSpan} className="px-2 py-4 text-center text-xs text-[#1F2937]">{emptyMessage}</td></tr>
            ) : rows.map((row) => (
              <tr key={row.id || `${row.ward_id}-${row.service_name}`} className="bg-white">
                <td className="break-words border-b border-r border-[#E5E7EB] px-2 py-2 font-semibold text-[#1F2937]">{row.display_name}</td>
                {censusGroups.flatMap((group) => group.columns.map((col, i) => (
                  <td key={col.key} className={`border-b px-1 py-2 text-right font-medium tabular-nums bg-[#F8FAFC]/70 ${i === group.columns.length - 1 ? 'border-r border-[#E5E7EB]' : 'border-r border-[#EEF2F7]'}`}>{row[col.key] ?? 0}</td>
                )))}
              </tr>
            ))}
          </tbody>
          {footerRows.length > 0 ? (
            <tfoot className="text-[10px] text-[#1F2937]">
              {footerRows.map((footerRow, fi) => (
                <tr key={footerRow.id ?? footerRow.display_name ?? fi} className="font-semibold">
                  <td className="break-words border-r border-t border-[#CBD5E1] bg-[#E2E8F0] px-2 py-2 font-bold">{footerRow.display_name}</td>
                  {censusGroups.flatMap((group) => group.columns.map((col, i) => (
                    <td key={col.key} className={`border-t border-[#CBD5E1] bg-[#E2E8F0] px-1 py-2 text-right font-bold tabular-nums ${i === group.columns.length - 1 ? 'border-r border-[#CBD5E1]' : 'border-r border-[#E5E7EB]'}`}>{footerRow[col.key]}</td>
                  )))}
                </tr>
              ))}
            </tfoot>
          ) : null}
        </table>
      </div>
    </section>
  );
}

export default function CensusPage({ title, fixedServiceName = null, endpoint = '/api/census/categories', allowedWardIds = null, serviceFilter = null, enableWardPicker = false, displayMode = 'service', combineRows = false, combinedDisplayName = 'Total Main Block', totalDisplayName = 'Total Main Block' }) {
  const [date, setDate] = useState(formatDateInput(new Date()));
  const [records, setRecords] = useState([]);
  const [selectedWardId, setSelectedWardId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const loadedServiceLabel = fixedServiceName || 'All services';
  const allowedWardKey = Array.isArray(allowedWardIds) ? allowedWardIds.join('|') : '';

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(buildRequestUrl(endpoint, date));
        if (!res.ok) throw new Error('Unable to load census data');
        const data = await readJsonResponse(res);
        const allowedSet = Array.isArray(allowedWardIds) ? new Set(allowedWardIds) : null;
        const filtered = (data ?? [])
          .filter((r) => !serviceFilter || String(r.service_id) === String(serviceFilter))
          .filter((r) => !allowedSet || allowedSet.has(r.ward_id))
          .map(buildCensusRow);
        setRecords(filtered);
        setSelectedWardId((cur) => {
          if (!enableWardPicker) return '';
          if (cur && filtered.some((r) => r.ward_id === cur)) return cur;
          return filtered[0]?.ward_id ?? '';
        });
        setStatusMessage('');
      } catch (error) {
        console.error('Census page load error', error);
        setStatusMessage('Unable to load census records.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [allowedWardKey, date, enableWardPicker, endpoint, serviceFilter]);

  const visibleRecords = useMemo(() => enableWardPicker && selectedWardId ? records.filter((r) => r.ward_id === selectedWardId) : records, [enableWardPicker, records, selectedWardId]);
  const wardOptions = useMemo(() => records.map((r) => ({ id: r.ward_id, name: r.ward_name ?? r.service_name ?? 'Unknown' })), [records]);
  const displayRecords = useMemo(() => combineRows ? [sumRows(visibleRecords, { id: 'combined-total', rowType: 'combined', display_name: combinedDisplayName, service_name: combinedDisplayName, ward_name: combinedDisplayName })] : visibleRecords, [combineRows, combinedDisplayName, visibleRecords]);
  const tableRows = useMemo(() => buildDisplayRows(displayRecords, displayMode), [displayMode, displayRecords]);
  const grandTotals = useMemo(() => sumRows(visibleRecords, { id: 'grand-total', rowType: 'total', display_name: totalDisplayName }), [totalDisplayName, visibleRecords]);

  const exportCsv = () => {
    const csv = buildCsv(tableRows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${title.replace(/\s+/g, '_').toLowerCase()}_${date}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-page-container">
        <div className="flex flex-col gap-4">
          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">{title}</p>
                <h1 className="mt-2 text-xl font-semibold text-[#1F2937]">{loadedServiceLabel}</h1>
                <p className="mt-1 text-xs text-[#1F2937]">Review the 24-hour census counts calculated from bed management, patient admissions, transfers, and discharges.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {enableWardPicker && wardOptions.length > 1 ? (
                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Ward</span>
                    <select value={selectedWardId} onChange={(e) => setSelectedWardId(e.target.value)} className="h-10 min-w-[180px] rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#1F2937] outline-none transition focus:border-[#CBD5E1]">
                      {wardOptions.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
                    </select>
                  </label>
                ) : null}
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Date</span>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#1F2937] outline-none transition focus:border-[#CBD5E1]" />
                </label>
                <button type="button" onClick={exportCsv} className="h-10 rounded-xl bg-[#1F2937] px-4 text-sm font-medium text-white transition hover:bg-[#94A3B8]">Export CSV</button>
              </div>
            </div>
          </section>
          {statusMessage ? <div className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#1F2937]">{statusMessage}</div> : null}
          <CensusTable footerRows={[grandTotals]} loading={loading} rows={tableRows} />
        </div>
      </div>
    </main>
  );
}
