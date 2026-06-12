import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { hasMinimumRole } from '../utils/roleAccess';

const allWardsLabel = 'All Wards';

function mapApiPatient(p) {
  return { id: p.id, patient_id: p.patient_id, name: p.name, ward: p.ward, diagnosis: p.diagnosis, status: p.status, los: p.los, assignedBed: p.assignedBed, bedId: p.bedId };
}
function mapApiAdmissionCandidate(p) {
  return { id: p.id, patient_id: p.patient_id, name: p.name, gender: p.gender, age: p.age, contactNumber: p.contactNumber, address: p.address, nextOfKin: p.nextOfKin, ward: '', diagnosis: '', status: '', los: 0, assignedBed: null, bedId: null, isAdmissionCandidate: true };
}
function mapApiBeds(payload) {
  return (payload.wards ?? []).flatMap((ward) => (ward.beds ?? []).map((bed) => ({ id: bed.id, code: bed.code, ward: ward.ward_name, room: bed.room, status: bed.status, patient: bed.patient })));
}
function getPatientStatusTone(status = '') {
  const s = status.toLowerCase();
  if (s === 'ready') return 'bg-green-100 text-green-700';
  if (s === 'nearly ready' || s.includes('pharmacy')) return 'bg-yellow-100 text-yellow-700';
  return 'bg-slate-100 text-slate-600';
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><circle cx="11" cy="11" r="6.5" /><path d="M16 16L21 21" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function StatusPill({ status }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getPatientStatusTone(status)}`}>{status}</span>;
}

function AssignBedModal({ availableBeds, patient, onAssign, onClose }) {
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedBedId, setSelectedBedId] = useState('');

  useEffect(() => {
    if (!patient) return undefined;
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, patient]);

  const wardOptions = useMemo(() => [...new Set(availableBeds.map((b) => b.ward))].sort((a, b) => a.localeCompare(b)), [availableBeds]);

  useEffect(() => {
    if (!patient) return;
    const preferred = patient.ward && wardOptions.includes(patient.ward) ? patient.ward : wardOptions[0] ?? '';
    setSelectedWard(preferred); setSelectedBedId('');
  }, [patient, wardOptions]);

  const sortedBeds = useMemo(() => {
    if (!patient) return [];
    return [...availableBeds].sort((a, b) => {
      const ap = a.ward === patient.ward ? 0 : 1, bp = b.ward === patient.ward ? 0 : 1;
      if (ap !== bp) return ap - bp;
      return (a.code ?? a.id).localeCompare(b.code ?? b.id);
    });
  }, [availableBeds, patient]);

  const wardBeds = useMemo(() => sortedBeds.filter((b) => selectedWard === '' || b.ward === selectedWard), [selectedWard, sortedBeds]);
  const selectedBed = useMemo(() => availableBeds.find((b) => String(b.id) === String(selectedBedId)) ?? null, [availableBeds, selectedBedId]);

  if (!patient) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 px-4 py-6 backdrop-blur-[2px]">
      <button type="button" aria-label="Close" className="absolute inset-0 cursor-pointer" onClick={onClose} />
      <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-2xl rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_24px_48px_rgba(15,23,42,0.16)] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">Bed Assignment</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#1F2937]">{patient.id}</h2>
            <p className="mt-1 text-sm text-[#1F2937]">{patient.name}{patient.ward ? ` / ${patient.ward}` : ''}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-[#E5E7EB] p-2 text-[#1F2937] transition hover:bg-[#F8FAFC]" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg>
          </button>
        </div>
        <div className="mt-6 grid gap-4 rounded-2xl bg-white p-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#1F2937]">Ward</span>
            <select value={selectedWard} onChange={(e) => { setSelectedWard(e.target.value); setSelectedBedId(''); }} className="h-12 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#1F2937] outline-none transition focus:border-[#CBD5E1]">
              {wardOptions.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#1F2937]">Bed</span>
            <select value={selectedBedId} onChange={(e) => setSelectedBedId(e.target.value)} disabled={wardBeds.length === 0} className="h-12 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#1F2937] outline-none transition focus:border-[#CBD5E1] disabled:text-[#94A3B8]">
              <option value="">Select bed</option>
              {wardBeds.map((b) => <option key={b.id} value={b.id}>{b.code ?? b.id} - {b.room}</option>)}
            </select>
          </label>
        </div>
        {availableBeds.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-[#CBD5E1] bg-white px-4 py-6 text-sm text-[#1F2937]">No available beds right now.</div>
        ) : (
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#1F2937]">{selectedBed ? `${selectedBed.code ?? selectedBed.id} selected` : 'Select a ward and bed'}</p>
              <p className="mt-1 text-sm text-[#1F2937]">{selectedBed ? `${selectedBed.ward} / ${selectedBed.room}` : 'Only available beds are shown.'}</p>
            </div>
            <button type="button" onClick={() => selectedBed && onAssign(selectedBed)} disabled={!selectedBed} className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1F2937] px-5 text-sm font-medium text-white transition hover:bg-[#94A3B8] disabled:cursor-not-allowed disabled:bg-[#94A3B8]">
              {patient.isAdmissionCandidate ? 'Admit' : 'Assign Bed'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PatientManagementPage() {
  const { user } = useAuth();
  const canManagePatients = hasMinimumRole(user?.role, 'admin');
  const [patients, setPatients] = useState([]);
  const [admissionCandidates, setAdmissionCandidates] = useState([]);
  const [beds, setBeds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [wardFilter, setWardFilter] = useState(allWardsLabel);
  const [modalTarget, setModalTarget] = useState(null); // { type: 'patient'|'candidate', id }
  const [assignmentMessage, setAssignmentMessage] = useState('');

  const selectedPersonForBed = useMemo(() => {
    if (!modalTarget) return null;
    const list = modalTarget.type === 'patient' ? patients : admissionCandidates;
    return list.find((p) => p.id === modalTarget.id) ?? null;
  }, [modalTarget, patients, admissionCandidates]);
  const wardOptions = useMemo(() => [allWardsLabel, ...new Set(patients.map((p) => p.ward))], [patients]);
  const availableBeds = useMemo(() => beds.filter((b) => b.status === 'available'), [beds]);
  const filteredPatients = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return patients.filter((p) => {
      const matchWard = wardFilter === allWardsLabel || p.ward === wardFilter;
      const matchQ = q === '' || p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q);
      return matchWard && matchQ;
    });
  }, [patients, searchQuery, wardFilter]);

  async function loadData() {
    try {
      const [patientsRes, bedBoardRes, admissionRes] = await Promise.all([fetch('/api/patients'), fetch('/api/bed-board'), fetch('/api/admission-candidates')]);
      if (!patientsRes.ok || !bedBoardRes.ok || !admissionRes.ok) throw new Error('Unable to load patient management data');
      const [patientRows, bedBoardPayload, admissionRows] = await Promise.all([patientsRes.json(), bedBoardRes.json(), admissionRes.json()]);
      setPatients(patientRows.map(mapApiPatient));
      setBeds(mapApiBeds(bedBoardPayload));
      setAdmissionCandidates(admissionRows.map(mapApiAdmissionCandidate));
    } catch (error) { console.error('PatientManagement load error', error); }
  }

  useEffect(() => { loadData(); }, []);

  const handleAssignBed = async (bed) => {
    if (!selectedPersonForBed || !canManagePatients) return;
    try {
      const endpoint = modalTarget?.type === 'candidate' ? '/api/admissions' : '/api/assignments';
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ patient_id: selectedPersonForBed.patient_id, patient_code: selectedPersonForBed.id, bed_id: bed.id, admitted_by: user?.name }) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Unable to assign bed');
      await loadData();
      setAssignmentMessage(`${selectedPersonForBed.id} ${modalTarget?.type === 'candidate' ? 'admitted to' : 'assigned to'} ${bed.code ?? bed.id}.`);
      setModalTarget(null);
    } catch (error) { setAssignmentMessage(error.message); }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-page-container">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">Patient management</p>
              <h1 className="mt-3 text-[1.75rem] font-semibold tracking-tight text-[#1F2937]">Assign patients and manage bed placement</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#1F2937]">Search across the current roster, review ward placement, and assign open beds.</p>
              <p className="mt-2 text-sm text-[#94A3B8]">Signed in as {user?.name} ({user?.role?.replace('_', ' ')}).</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[{ label: 'Total patients', value: patients.length }, { label: 'Admission list', value: admissionCandidates.length }, { label: 'Available beds', value: availableBeds.length }].map((m) => (
                <article key={m.label} className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">{m.label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-[#1F2937]">{m.value}</p>
                </article>
              ))}
            </div>
          </header>

          <section className="rounded-3xl border border-[#E5E7EB] bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-[#EEF2F7] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">Admission</p>
                <h2 className="mt-2 text-xl font-semibold text-[#1F2937]">Patients outside the hospital</h2>
              </div>
              <p className="text-sm text-[#1F2937]">{admissionCandidates.length} people listed</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="text-left">
                    {['Patient ID', 'Biography', 'Ward', 'Diagnosis', 'Assigned Bed', ''].map((h) => (
                      <th key={h || 'actions'} className="border-b border-[#EEF2F7] px-5 py-4 text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8] sm:px-6">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {admissionCandidates.map((patient) => (
                    <tr key={patient.id} className="transition-colors hover:bg-[#F8FAFC]">
                      <td className="border-b border-[#EEF2F7] px-5 py-4 align-top sm:px-6"><p className="text-sm font-semibold text-[#1F2937]">{patient.id}</p><p className="mt-1 text-sm text-[#1F2937]">{patient.name}</p></td>
                      <td className="border-b border-[#EEF2F7] px-5 py-4 text-sm text-[#1F2937] sm:px-6">
                        <div className="space-y-1">
                          <p>{patient.gender ? `${patient.gender}${patient.age ? `, ${patient.age}` : ''}` : patient.age ?? ''}</p>
                          <p>{patient.contactNumber}</p><p>{patient.address}</p>
                          <p>{patient.nextOfKin ? `Next of kin: ${patient.nextOfKin}` : ''}</p>
                        </div>
                      </td>
                      <td className="border-b border-[#EEF2F7] px-5 py-4 text-sm text-[#94A3B8] sm:px-6" />
                      <td className="border-b border-[#EEF2F7] px-5 py-4 text-sm text-[#94A3B8] sm:px-6" />
                      <td className="border-b border-[#EEF2F7] px-5 py-4 text-sm text-[#94A3B8] sm:px-6" />
                      <td className="border-b border-[#EEF2F7] px-5 py-4 text-right sm:px-6">
                        <button type="button" onClick={() => setModalTarget({ type: 'candidate', id: patient.id })} disabled={!canManagePatients} className="inline-flex items-center justify-center rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-medium text-[#1F2937] transition hover:bg-[#F8FAFC]">Admit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {admissionCandidates.length === 0 && <div className="px-5 py-8 text-sm text-[#1F2937] sm:px-6">No patients are waiting for admission.</div>}
            </div>
          </section>

          <section className="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
              <label className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#1F2937] focus-within:border-[#CBD5E1]">
                <SearchIcon />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by patient ID or name" className="w-full border-none bg-transparent text-sm text-[#1F2937] outline-none placeholder:text-[#94A3B8]" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">Ward filter</span>
                <select value={wardFilter} onChange={(e) => setWardFilter(e.target.value)} className="h-[52px] rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1F2937] outline-none transition focus:border-[#CBD5E1]">
                  {wardOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </label>
            </div>
          </section>

          {assignmentMessage && <div className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#1F2937]">{assignmentMessage}</div>}

          <section className="rounded-3xl border border-[#E5E7EB] bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-[#EEF2F7] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
              <div><p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">Patient table</p><h2 className="mt-2 text-xl font-semibold text-[#1F2937]">Current patient roster</h2></div>
              <p className="text-sm text-[#1F2937]">{filteredPatients.length} patients shown</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="text-left">
                    {['Patient ID', 'Ward', 'Diagnosis', 'Status', 'LOS', 'Assigned Bed', ''].map((h) => (
                      <th key={h || 'actions'} className="border-b border-[#EEF2F7] px-5 py-4 text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8] sm:px-6">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="transition-colors hover:bg-[#F8FAFC]">
                      <td className="border-b border-[#EEF2F7] px-5 py-4 align-top sm:px-6"><p className="text-sm font-semibold text-[#1F2937]">{patient.id}</p><p className="mt-1 text-sm text-[#1F2937]">{patient.name}</p></td>
                      <td className="border-b border-[#EEF2F7] px-5 py-4 text-sm text-[#1F2937] sm:px-6">{patient.ward}</td>
                      <td className="border-b border-[#EEF2F7] px-5 py-4 text-sm text-[#1F2937] sm:px-6">{patient.diagnosis}</td>
                      <td className="border-b border-[#EEF2F7] px-5 py-4 sm:px-6"><StatusPill status={patient.status} /></td>
                      <td className="border-b border-[#EEF2F7] px-5 py-4 text-sm text-[#1F2937] sm:px-6">{patient.los} days</td>
                      <td className="border-b border-[#EEF2F7] px-5 py-4 sm:px-6">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${patient.assignedBed ? 'bg-slate-100 text-slate-700' : 'bg-[#F8FAFC] text-[#94A3B8]'}`}>{patient.assignedBed ?? 'Unassigned'}</span>
                      </td>
                      <td className="border-b border-[#EEF2F7] px-5 py-4 text-right sm:px-6">
                        <button type="button" onClick={() => setModalTarget({ type: 'patient', id: patient.id })} disabled={!canManagePatients} className="inline-flex items-center justify-center rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-medium text-[#1F2937] transition hover:bg-[#F8FAFC]">Assign Bed</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPatients.length === 0 && <div className="px-5 py-8 text-sm text-[#1F2937] sm:px-6">No patients match the current search or ward filter.</div>}
            </div>
          </section>
        </div>
      </div>

      <AssignBedModal patient={selectedPersonForBed} availableBeds={availableBeds} onAssign={handleAssignBed} onClose={() => setModalTarget(null)} />
    </main>
  );
}

export default PatientManagementPage;
