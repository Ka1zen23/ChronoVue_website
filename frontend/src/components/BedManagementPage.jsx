import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TransferPatientModal from './TransferPatientModal';
import { wardDefinitions } from '../data/wardCatalog';
import { bedStatusConfig, createInitialWardState, getStatusSummaryCounts, statusFilterOptions, summarizeBedBoard } from '../data/bedBoardData';

function formatLastUpdated(date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}
function formatRoleLabel(role = '') {
  return role.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
function isWardScopedRole(role) { return role === 'admin' || role === 'user'; }
function coerceDate(value) { if (!value) return null; return value instanceof Date ? value : new Date(value); }
function getMinutesSince(date) { if (!date) return null; return Math.floor((Date.now() - date.getTime()) / 60000); }
function formatRelativeUpdate(date) {
  const minutes = getMinutesSince(date);
  if (minutes === null) return 'Update time unknown';
  if (minutes < 1) return 'Just updated';
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}
function isRecentUpdate(date) { const m = getMinutesSince(date); return m !== null && m <= 15; }
function getBedUpdateMeta(bed) {
  const updatedAt = coerceDate(bed?.updatedAt);
  return { updatedAt, updatedBy: bed?.updatedBy ?? 'Bed board sync', relativeLabel: formatRelativeUpdate(updatedAt), isRecent: isRecentUpdate(updatedAt) };
}
function mapApiWardToBoardWard(ward) {
  return {
    id: ward.id, code: ward.ward_code, name: ward.ward_name,
    totalBeds: Number(ward.total_beds ?? ward.beds?.length ?? 0),
    beds: (ward.beds ?? []).map((bed) => ({
      id: bed.id, code: bed.code, label: bed.label ?? bed.code, room: bed.room ?? 'Unassigned room',
      status: bedStatusConfig[bed.status] ? bed.status : 'available',
      patient: bed.patient, updatedAt: bed.updatedAt, updatedBy: bed.updatedBy ?? 'PostgreSQL'
    }))
  };
}

function StatusBadge({ status }) {
  const tone = bedStatusConfig[status];
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tone.badgeClassName}`}>{tone.label}</span>;
}

function FilterPanel({ count, filterId, isActive, onClick }) {
  const statusTone = filterId === 'all' ? null : bedStatusConfig[filterId];
  const filterMeta = statusFilterOptions.find((o) => o.id === filterId);
  return (
    <button type="button" onClick={() => onClick(filterId)} className={['rounded-2xl border p-5 text-left shadow-sm transition-all duration-200 ease-out', 'hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CBD5E1] focus-visible:ring-offset-2', isActive ? 'border-[#CBD5E1] ring-2 ring-[#E2E8F0]' : 'border-[#E5E7EB] bg-white'].join(' ')}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">{filterMeta?.label ?? 'Beds'}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-[#1F2937]">{count}</p>
        </div>
        <span className={['mt-1 h-3 w-3 rounded-full', statusTone ? statusTone.dotClassName : 'bg-slate-400'].join(' ')} />
      </div>
      <p className="mt-3 text-sm text-[#1F2937]">{filterMeta?.summary}</p>
    </button>
  );
}

function BedCard({ bed, isSelected, onSelect }) {
  const tone = bedStatusConfig[bed.status];
  const updateMeta = getBedUpdateMeta(bed);
  return (
    <button type="button" onClick={() => onSelect(bed)} className={['group rounded-2xl border p-4 text-left shadow-sm transition-all duration-200 ease-out', 'hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CBD5E1] focus-visible:ring-offset-2', tone.cardClassName ?? 'border-[#E5E7EB] bg-white', isSelected ? 'border-[#CBD5E1] ring-2 ring-[#E2E8F0]' : ''].join(' ')}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-[#1F2937]">{bed.label}</p>
          <p className="mt-1 text-sm text-[#1F2937]">{bed.room}</p>
        </div>
        <div className="flex items-center gap-2">
          {updateMeta.isRecent ? <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">Updated</span> : null}
          <span className={`mt-1 h-3 w-3 rounded-full ${tone.dotClassName}`} />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <StatusBadge status={bed.status} />
        <span className="text-xs text-[#1F2937]">{bed.code ?? bed.id}</span>
      </div>
      <div className="mt-4 min-h-[48px]">
        <p className="text-sm font-medium text-[#1F2937]">{bed.patient?.id ?? tone.helperText}</p>
        <p className="mt-1 text-sm text-[#1F2937]">{bed.patient?.diagnosis ?? 'No patient details assigned'}</p>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#1F2937]">
        <span>Updated {updateMeta.relativeLabel}</span>
        <span>by {updateMeta.updatedBy}</span>
      </div>
    </button>
  );
}

function StatusActionButton({ disabled, isCurrent, onClick, status }) {
  const tone = bedStatusConfig[status];
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={['rounded-xl border px-4 py-3 text-left transition-all duration-200', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CBD5E1] focus-visible:ring-offset-2', tone.buttonClassName, isCurrent ? 'ring-2 ring-[#94a3b8] shadow-sm' : '', disabled ? 'cursor-not-allowed opacity-50' : ''].join(' ')}>
      <p className="text-sm font-semibold">{tone.label}</p>
      <p className="mt-1 text-xs opacity-80">{tone.helperText}</p>
    </button>
  );
}

function BedDetailModal({ bed, canManageWard, draftDiagnosis, draftPatientId, draftStatus, modalMessage, onClose, onDiagnosisChange, onPatientIdChange, onSave, onStatusChange, onDischarge, onOpenTransfer, wardName }) {
  useEffect(() => {
    if (!bed) return undefined;
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bed, onClose]);
  if (!bed) return null;
  const shouldCapturePatientDetails = draftStatus === 'occupied';
  const updateMeta = getBedUpdateMeta(bed);
  const updatedAtLabel = updateMeta.updatedAt ? formatLastUpdated(updateMeta.updatedAt) : 'Unknown';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 px-4 py-6 backdrop-blur-[2px]">
      <button type="button" aria-label="Close" className="absolute inset-0 cursor-pointer" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="bed-modal-title" className="relative z-10 w-full max-w-3xl rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_24px_48px_rgba(15,23,42,0.16)] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">Bed detail</p>
            <h2 id="bed-modal-title" className="mt-3 text-2xl font-semibold text-[#1F2937]">{bed.label}</h2>
            <p className="mt-1 text-sm text-[#1F2937]">{wardName} / {bed.room}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-[#E5E7EB] p-2 text-[#1F2937] transition hover:bg-[#F8FAFC]" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg>
          </button>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl bg-white p-4">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={draftStatus} />
              <span className="text-sm text-[#1F2937]">{bed.code ?? bed.id}</span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div><p className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Patient ID</p><p className="mt-2 text-sm font-medium text-[#1F2937]">{draftPatientId || 'No patient assigned'}</p></div>
              <div><p className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Status</p><p className="mt-2 text-sm font-medium text-[#1F2937]">{bedStatusConfig[draftStatus].label}</p></div>
            </div>
            <div className="mt-4"><p className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Diagnosis</p><p className="mt-2 text-sm text-[#1F2937]">{draftDiagnosis || 'No diagnosis recorded'}</p></div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#1F2937]"><span>Last updated {updatedAtLabel}</span><span>by {updateMeta.updatedBy}</span></div>
          </div>
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">Ward access</p>
            <p className="mt-3 text-sm text-[#1F2937]">{canManageWard ? 'You can update bed status and bed count in this ward.' : 'Read-only. You are not assigned to this ward.'}</p>
            <p className="mt-2 text-sm text-[#1F2937]">Editing is restricted to staff assigned to the selected ward.</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">Update status</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.keys(bedStatusConfig).map((status) => (
              <StatusActionButton key={status} status={status} isCurrent={draftStatus === status} disabled={!canManageWard} onClick={() => onStatusChange(status)} />
            ))}
          </div>
        </div>
        {shouldCapturePatientDetails ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Patient ID</span>
              <input type="text" value={draftPatientId} onChange={(e) => onPatientIdChange(e.target.value)} disabled={!canManageWard} placeholder="Enter patient ID" className="h-12 rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1F2937] outline-none transition placeholder:text-[#94A3B8] focus:border-[#CBD5E1] disabled:cursor-not-allowed disabled:opacity-60" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Diagnosis</span>
              <input type="text" value={draftDiagnosis} onChange={(e) => onDiagnosisChange(e.target.value)} disabled={!canManageWard} placeholder="Enter diagnosis" className="h-12 rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1F2937] outline-none transition placeholder:text-[#94A3B8] focus:border-[#CBD5E1] disabled:cursor-not-allowed disabled:opacity-60" />
            </label>
          </div>
        ) : null}
        {modalMessage ? <div className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm text-[#1F2937]">{modalMessage}</div> : null}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          {bed?.patient?.id && canManageWard ? (
            <button type="button" onClick={onOpenTransfer} className="inline-flex items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3 text-sm font-medium text-[#1F2937] transition hover:bg-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CBD5E1]">Transfer patient</button>
          ) : null}
          {bed?.patient?.id && canManageWard ? (
            <button type="button" onClick={onDischarge} className="inline-flex items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-medium text-rose-700 transition hover:bg-rose-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200">Discharge patient</button>
          ) : null}
          <button type="button" onClick={onClose} className="inline-flex items-center justify-center rounded-2xl border border-[#E5E7EB] px-5 py-3 text-sm font-medium text-[#1F2937] transition hover:bg-[#F8FAFC] focus:outline-none">Close</button>
          <button type="button" onClick={onSave} disabled={!canManageWard} className="inline-flex items-center justify-center rounded-2xl bg-[#1F2937] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#94A3B8] focus:outline-none disabled:cursor-not-allowed disabled:bg-[#94A3B8]">Save bed update</button>
        </div>
      </div>
    </div>
  );
}

function BedManagementPage() {
  const { user } = useAuth();
  const manageableWardIds = isWardScopedRole(user?.role) ? user.assignedWardIds : wardDefinitions.map((w) => w.id);
  const initialWardState = useMemo(() => createInitialWardState(), []);
  const initialSummary = useMemo(() => summarizeBedBoard(initialWardState), [initialWardState]);
  const [wards, setWards] = useState(initialWardState);
  const [selectedWardId, setSelectedWardId] = useState(() => manageableWardIds[0] ?? wardDefinitions[0]?.id);
  const [statusFilter, setStatusFilter] = useState('all');
  const [totalBedsInput, setTotalBedsInput] = useState('');
  const [bedCountMessage, setBedCountMessage] = useState('');
  const [selectedBedId, setSelectedBedId] = useState(null);
  const [draftStatus, setDraftStatus] = useState('available');
  const [draftPatientId, setDraftPatientId] = useState('');
  const [draftDiagnosis, setDraftDiagnosis] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [lastUpdatedAt, setLastUpdatedAt] = useState(initialSummary.lastUpdatedAt);
  const [lastUpdatedBy, setLastUpdatedBy] = useState(initialSummary.updatedBy);
  const [services, setServices] = useState([]);
  const [wardsMeta, setWardsMeta] = useState([]);
  const [patients, setPatients] = useState([]);
  const [censusRecords, setCensusRecords] = useState([]);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferStatusMessage, setTransferStatusMessage] = useState('');

  const selectedWard = useMemo(() => wards.find((w) => w.id === selectedWardId) ?? wards[0] ?? null, [selectedWardId, wards]);
  const selectedBed = useMemo(() => selectedWard?.beds.find((b) => b.id === selectedBedId) ?? null, [selectedBedId, selectedWard]);
  const canManageCurrentWard = !isWardScopedRole(user?.role) || user?.assignedWardIds.includes(selectedWardId);
  const statusCounts = useMemo(() => getStatusSummaryCounts(selectedWard?.beds ?? []), [selectedWard]);
  const filteredBeds = useMemo(() => {
    if (!selectedWard) return [];
    if (statusFilter === 'all') return selectedWard.beds;
    return selectedWard.beds.filter((b) => b.status === statusFilter);
  }, [selectedWard, statusFilter]);
  const assignedWardLabels = useMemo(() => isWardScopedRole(user?.role)
    ? user.assignedWardIds.map((id) => wards.find((w) => w.id === id)?.name ?? wardDefinitions.find((w) => w.id === id)?.name).filter(Boolean)
    : ['All wards'], [user, wards]);

  useEffect(() => {
    if (!selectedWard) return;
    setTotalBedsInput(String(selectedWard.totalBeds));
    setSelectedBedId(null); setBedCountMessage(''); setModalMessage('');
  }, [selectedWardId, selectedWard]);

  useEffect(() => {
    if (!manageableWardIds.includes(selectedWardId)) setSelectedWardId(manageableWardIds[0] ?? wardDefinitions[0]?.id ?? null);
  }, [manageableWardIds, selectedWardId]);

  useEffect(() => {
    if (!selectedBed) return;
    setDraftStatus(selectedBed.status);
    setDraftPatientId(selectedBed.patient?.id ?? '');
    setDraftDiagnosis(selectedBed.patient?.diagnosis ?? '');
    setModalMessage('');
  }, [selectedBed]);

  useEffect(() => { loadWardData(); }, []);

  async function loadWardData() {
    try {
      const [servicesRes, bedBoardRes, patientsRes, censusRes] = await Promise.all([
        fetch('/api/services'), fetch('/api/bed-board'), fetch('/api/patients/admitted'),
        fetch('/api/census/wards?date=' + new Date().toISOString().split('T')[0])
      ]);
      if (!servicesRes.ok || !bedBoardRes.ok || !patientsRes.ok || !censusRes.ok) throw new Error('Unable to load ward management data');
      const [serviceRows, bedBoardPayload, patientRows, censusRows] = await Promise.all([servicesRes.json(), bedBoardRes.json(), patientsRes.json(), censusRes.json()]);
      const liveWards = (bedBoardPayload.wards ?? []).map(mapApiWardToBoardWard);
      setServices(serviceRows);
      setWards(liveWards.length > 0 ? liveWards : initialWardState);
      setWardsMeta(bedBoardPayload.wards ?? []);
      setPatients(patientRows);
      setCensusRecords(censusRows);
      if (bedBoardPayload.summary?.lastUpdatedAt) setLastUpdatedAt(new Date(bedBoardPayload.summary.lastUpdatedAt));
      if (bedBoardPayload.summary?.updatedBy) setLastUpdatedBy(bedBoardPayload.summary.updatedBy);
      if (liveWards.length > 0 && !liveWards.some((w) => w.id === selectedWardId)) setSelectedWardId(liveWards[0].id);
    } catch (error) { console.error('BedManagement load error', error); }
  }

  const selectedBackendWard = useMemo(() => wardsMeta.find((w) => w.id === selectedWard?.id || w.ward_code === selectedWard?.code), [wardsMeta, selectedWard]);
  const selectedWardCensus = useMemo(() => selectedBackendWard ? censusRecords.find((r) => r.ward_id === selectedBackendWard.id) : null, [censusRecords, selectedBackendWard]);
  const summaryMetrics = useMemo(() => ({
    totalBeds: selectedWard?.totalBeds ?? 0,
    occupiedBeds: statusCounts.occupied,
    availableBeds: statusCounts.available,
    maleCount: selectedWardCensus?.total_male ?? 0,
    femaleCount: selectedWardCensus?.total_female ?? 0,
    transfersIn: selectedWardCensus ? (selectedWardCensus.transfers_in_male + selectedWardCensus.transfers_in_female) : 0,
    transfersOut: selectedWardCensus ? (selectedWardCensus.transfers_out_male + selectedWardCensus.transfers_out_female) : 0,
    admissions: selectedWardCensus ? (selectedWardCensus.admissions_male + selectedWardCensus.admissions_female) : 0,
    discharges: selectedWardCensus ? (selectedWardCensus.discharges_male + selectedWardCensus.discharges_female) : 0
  }), [selectedWard, statusCounts, selectedWardCensus]);

  const handleWardChange = (wardId) => { setSelectedWardId(wardId); setStatusFilter('all'); };
  const handleBedCountSubmit = async (event) => {
    event.preventDefault();
    if (!selectedWard) return;
    if (!canManageCurrentWard) { setBedCountMessage('Only users assigned to this ward can change the total bed count.'); return; }
    const parsed = Number.parseInt(totalBedsInput, 10);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > 40) { setBedCountMessage('Enter a total bed count between 1 and 40.'); return; }
    const current = selectedWard.beds.length;
    if (parsed === current) { setBedCountMessage('Bed count is already up to date for this ward.'); return; }
    if (parsed < current) {
      const toRemove = selectedWard.beds.slice(parsed);
      const blocked = toRemove.find((b) => b.status !== 'available');
      if (blocked) { setBedCountMessage(`Clear ${blocked.label} before reducing the total bed count.`); return; }
    }
    try {
      const res = await fetch(`/api/wards/${selectedWard.id}/beds`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ total_beds: parsed }) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Unable to update bed count.');
      await loadWardData();
      setSelectedBedId(null);
      setLastUpdatedAt(new Date());
      setLastUpdatedBy(user?.name ?? 'Bed board sync');
      setBedCountMessage(parsed > current ? `${parsed - current} beds added to ${selectedWard.name}.` : `${current - parsed} beds removed from ${selectedWard.name}.`);
    } catch (error) { setBedCountMessage(error.message); }
  };

  const handleModalSave = async () => {
    if (!selectedWard || !selectedBed) return;
    if (!canManageCurrentWard) { setModalMessage('Only users assigned to this ward can update bed status.'); return; }
    const needsPatient = draftStatus === 'occupied';
    const cleanId = draftPatientId.trim();
    if (needsPatient && !cleanId) { setModalMessage('Enter an existing patient ID before saving an occupied bed.'); return; }
    const updateMeta = { updatedAt: new Date(), updatedBy: user?.name ?? 'Bed board sync' };
    try {
      const res = await fetch(`/api/beds/${selectedBed.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: draftStatus, patient_code: cleanId, updated_by: updateMeta.updatedBy, notes: draftDiagnosis.trim() }) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Unable to save bed update');
      await loadWardData();
      setLastUpdatedAt(updateMeta.updatedAt); setLastUpdatedBy(updateMeta.updatedBy);
      setSelectedBedId(null); setModalMessage('');
    } catch (error) { setModalMessage(error.message); }
  };

  const handleDischargePatient = async () => {
    if (!selectedBed?.patient?.id || !canManageCurrentWard) return;
    const confirmed = window.confirm(`Discharge ${selectedBed.patient.id} from ${selectedBed.code ?? selectedBed.label}?`);
    if (!confirmed) return;
    try {
      const res = await fetch('/api/discharges', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ patient_id: selectedBed.patient.patient_id, patient_code: selectedBed.patient.id, bed_id: selectedBed.id, discharged_by: user?.name, notes: 'Discharged from bed management' }) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Unable to discharge patient');
      setTransferStatusMessage(`${selectedBed.patient.id} discharged successfully.`);
      setSelectedBedId(null);
      await loadWardData();
    } catch (error) { setModalMessage(error.message); }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-page-container">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">Bed management</p>
              <h1 className="mt-3 text-[1.75rem] font-semibold tracking-tight text-[#1F2937]">Ward-level bed control</h1>
              <p className="mt-2 text-sm leading-6 text-[#1F2937]">Switch wards, review capacity by status, and update bed availability with role-aware controls for real hospital operations.</p>
            </div>
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm xl:max-w-sm">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">Current user</p>
              <p className="mt-3 text-base font-semibold text-[#1F2937]">{user?.name}</p>
              <p className="mt-1 text-sm text-[#1F2937]">{formatRoleLabel(user?.role ?? 'user')}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {assignedWardLabels.map((wardName) => (
                  <span key={wardName} className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1F2937]">{wardName}</span>
                ))}
              </div>
            </div>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Total beds', value: summaryMetrics.totalBeds, tone: 'bg-slate-50 text-slate-700' },
              { label: 'Occupied', value: summaryMetrics.occupiedBeds, tone: 'bg-amber-50 text-amber-700' },
              { label: 'Available', value: summaryMetrics.availableBeds, tone: 'bg-emerald-50 text-emerald-700' },
              { label: 'Admissions today', value: summaryMetrics.admissions, tone: 'bg-indigo-50 text-indigo-700' },
            ].map((m) => (
              <div key={m.label} className={`rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm ${m.tone}`}>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#1F2937]">{m.label}</p>
                <p className="mt-3 text-3xl font-semibold text-[#1F2937]">{m.value}</p>
              </div>
            ))}
          </div>

          {transferStatusMessage ? <div className="rounded-2xl border border-[#E5E7EB] bg-emerald-50 p-4 text-sm text-emerald-700">{transferStatusMessage}</div> : null}

          <section className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <div className="grid gap-5 xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)] xl:items-end">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">Ward selector</span>
                <select value={selectedWardId} onChange={(e) => handleWardChange(e.target.value)} className="h-12 rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1F2937] outline-none transition focus:border-[#CBD5E1]">
                  {wards.map((ward) => <option key={ward.id} value={ward.id}>{ward.name}{isWardScopedRole(user?.role) && !user.assignedWardIds.includes(ward.id) ? ' (View only)' : ''}</option>)}
                </select>
              </label>
              <form onSubmit={handleBedCountSubmit} className="grid gap-4 sm:grid-cols-[minmax(0,160px)_auto] xl:justify-end">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">Total Beds</span>
                  <input type="number" min="1" max="40" value={totalBedsInput} onChange={(e) => setTotalBedsInput(e.target.value)} disabled={!canManageCurrentWard} className="h-12 rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1F2937] outline-none transition focus:border-[#CBD5E1] disabled:cursor-not-allowed disabled:opacity-60" />
                </label>
                <button type="submit" disabled={!canManageCurrentWard} className="h-12 self-end rounded-2xl bg-[#1F2937] px-5 text-sm font-medium text-white transition hover:bg-[#94A3B8] disabled:cursor-not-allowed disabled:bg-[#94A3B8]">Update bed count</button>
              </form>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#1F2937]">{canManageCurrentWard ? 'You can manage bed count and status updates in this ward.' : 'Read-only view. Select a ward assigned to you to make changes.'}</p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-[#1F2937]">
                <span className="flex items-center gap-2"><span className={['h-2 w-2 rounded-full', isRecentUpdate(lastUpdatedAt) ? 'bg-emerald-500' : 'bg-slate-400'].join(' ')} />{isRecentUpdate(lastUpdatedAt) ? 'Live' : 'Updated'}</span>
                <span>{formatLastUpdated(lastUpdatedAt)}</span>
                <span>by {lastUpdatedBy}</span>
              </div>
            </div>
            {bedCountMessage ? <div className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm text-[#1F2937]">{bedCountMessage}</div> : null}
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {statusFilterOptions.map((option) => (
              <FilterPanel key={option.id} filterId={option.id} count={statusCounts[option.id]} isActive={statusFilter === option.id} onClick={setStatusFilter} />
            ))}
          </section>

          <section className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 border-b border-[#E5E7EB] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">Bed grid</p>
                <h2 className="mt-2 text-xl font-semibold text-[#1F2937]">{selectedWard?.name}</h2>
              </div>
              <div className="text-sm text-[#1F2937]">{statusFilter === 'all' ? `${filteredBeds.length} beds in this ward` : `${filteredBeds.length} ${bedStatusConfig[statusFilter].label.toLowerCase()} beds shown`}</div>
            </div>
            {filteredBeds.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-[#CBD5E1] bg-white px-4 py-8 text-sm text-[#1F2937]">No beds match the current status filter in this ward.</div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
                {filteredBeds.map((bed) => <BedCard key={bed.id} bed={bed} isSelected={selectedBed?.id === bed.id} onSelect={(b) => setSelectedBedId(b.id)} />)}
              </div>
            )}
          </section>
        </div>
      </div>

      <BedDetailModal
        bed={selectedBed} wardName={selectedWard?.name ?? ''} canManageWard={canManageCurrentWard}
        draftStatus={draftStatus} draftPatientId={draftPatientId} draftDiagnosis={draftDiagnosis} modalMessage={modalMessage}
        onClose={() => setSelectedBedId(null)} onStatusChange={setDraftStatus}
        onPatientIdChange={setDraftPatientId} onDiagnosisChange={setDraftDiagnosis}
        onSave={handleModalSave} onDischarge={handleDischargePatient} onOpenTransfer={() => setShowTransferModal(true)}
      />

      <TransferPatientModal
        open={showTransferModal} onClose={() => setShowTransferModal(false)}
        patients={patients} services={services} wards={wardsMeta}
        initialPatientId={selectedBed?.patient?.patient_id ?? selectedBed?.patient?.id ?? ''}
        initialPatientBedId={selectedBed?.id ?? ''}
        onSuccess={async (message) => { setTransferStatusMessage(message); setShowTransferModal(false); await loadWardData(); }}
      />
    </main>
  );
}

export default BedManagementPage;
