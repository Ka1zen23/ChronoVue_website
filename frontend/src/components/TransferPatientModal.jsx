import { useEffect, useMemo, useState } from 'react';

function buildBedOptions(ward) {
  if (Array.isArray(ward?.beds) && ward.beds.length > 0) {
    return ward.beds.filter((bed) => bed.status === 'available').map((bed) => ({
      id: bed.id,
      label: bed.code ? `${bed.code} / ${bed.label}` : bed.label,
      code: bed.code,
      status: bed.status
    }));
  }
  if (!ward || !ward.total_beds) return [];
  return Array.from({ length: ward.total_beds }, (_, index) => {
    const bedCode = `${ward.ward_code}-B${String(index + 1).padStart(2, '0')}`;
    return { id: bedCode, label: bedCode, code: bedCode, status: 'available' };
  });
}

export default function TransferPatientModal({ open, onClose, patients = [], services = [], wards = [], onSuccess, initialPatientId = '', initialPatientBedId = '' }) {
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedWardId, setSelectedWardId] = useState('');
  const [selectedBedId, setSelectedBedId] = useState('');
  const [transferReason, setTransferReason] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const selectedPatient = useMemo(() => {
    if (selectedPatientId) return patients.find((p) => String(p.patient_id ?? p.id) === String(selectedPatientId)) ?? null;
    if (initialPatientBedId) return patients.find((p) => String(p.current_bed_id) === String(initialPatientBedId)) ?? null;
    return null;
  }, [patients, selectedPatientId, initialPatientBedId]);

  const destinationWards = useMemo(
    () => (selectedServiceId ? wards.filter((w) => String(w.service_id) === String(selectedServiceId)) : wards),
    [wards, selectedServiceId]
  );
  const selectedWard = useMemo(() => destinationWards.find((w) => String(w.id) === String(selectedWardId)) ?? null, [destinationWards, selectedWardId]);
  const occupiedBedIds = useMemo(() => new Set(patients.filter((p) => selectedWard && String(p.current_ward_id) === String(selectedWard.id)).map((p) => p.current_bed_id).filter(Boolean)), [patients, selectedWard]);
  const bedOptions = useMemo(() => {
    if (!selectedWard) return [];
    return buildBedOptions(selectedWard).filter((bed) => {
      if (!selectedPatient) return true;
      if (String(bed.id) === String(selectedPatient.current_bed_id)) return false;
      return !occupiedBedIds.has(bed.id);
    });
  }, [selectedWard, selectedPatient, occupiedBedIds]);

  useEffect(() => {
    if (!open) return;
    setSelectedPatientId(initialPatientId || '');
    setSelectedServiceId(''); setSelectedWardId(''); setSelectedBedId('');
    setTransferReason(''); setNotes(''); setErrorMessage(''); setSaving(false);
  }, [open, initialPatientId]);

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    if (!selectedPatient) { setErrorMessage('Select a patient to transfer.'); return; }
    if (!selectedWardId || !selectedBedId) { setErrorMessage('Select a destination ward and bed.'); return; }
    if (!selectedPatient.current_ward_id || !selectedPatient.current_bed_id) { setErrorMessage('Selected patient is not currently admitted.'); return; }
    if (String(selectedPatient.current_bed_id) === String(selectedBedId) && String(selectedPatient.current_ward_id) === String(selectedWardId)) { setErrorMessage('Cannot transfer patient to the same bed.'); return; }
    const payload = { patient_id: selectedPatient.patient_id, admission_id: selectedPatient.admission_id, from_ward_id: selectedPatient.current_ward_id, to_ward_id: selectedWard.id, from_bed_id: selectedPatient.current_bed_id, to_bed_id: selectedBedId, transfer_reason: transferReason, transfer_status: 'completed', requested_by: 'Shift coordinator', approved_by: 'Operations lead', completed_by: 'Bed coordinator', notes };
    setSaving(true);
    try {
      const response = await fetch('/api/transfers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to complete transfer');
      onSuccess('Patient transfer completed successfully.');
      setSaving(false);
    } catch (error) {
      setErrorMessage(error.message);
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-sm">
      <button type="button" aria-label="Close" className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl rounded-3xl bg-white p-6 shadow-[0_24px_48px_rgba(15,23,42,0.16)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1F2937]">Patient transfer</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#1F2937]">Transfer Patient Between Wards</h2>
            <p className="mt-2 text-sm text-[#1F2937]">Select a patient, destination service, ward, and available bed.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-[#E5E7EB] p-2 text-[#1F2937] transition hover:bg-[#F8FAFC]">×</button>
        </div>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            {selectedPatient ? (
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Selected patient</p>
                <p className="mt-3 text-sm font-semibold text-[#1F2937]">{selectedPatient.patient_name || selectedPatient.patient_id || selectedPatient.id}</p>
                <p className="mt-2 text-sm text-[#1F2937]">MRN: {selectedPatient.mrn || 'Unknown'}</p>
                <p className="mt-2 text-sm text-[#1F2937]">Current ward: {selectedPatient.current_ward_name || 'Unknown'}</p>
                <p className="mt-2 text-sm text-[#1F2937]">Current bed: {selectedPatient.current_bed_code || selectedPatient.current_bed_id || 'Unknown'}</p>
              </div>
            ) : (
              <label className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Patient</span>
                <select value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)} className="h-12 rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1F2937] outline-none transition focus:border-[#CBD5E1]">
                  <option value="">Select patient</option>
                  {patients.map((p) => <option key={p.patient_id ?? p.id} value={p.patient_id ?? p.id}>{p.patient_name || p.patient_id || p.id}{p.current_ward_name ? ` · ${p.current_ward_name}` : ''}{p.current_bed_code ? ` · ${p.current_bed_code}` : ''}</option>)}
                </select>
              </label>
            )}
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Current location</p>
              <p className="mt-3 text-sm font-semibold text-[#1F2937]">{selectedPatient?.current_ward_name || 'Not admitted'}</p>
              <p className="mt-2 text-sm text-[#1F2937]">Bed: {selectedPatient?.current_bed_code || selectedPatient?.current_bed_id || 'None'}</p>
              <p className="mt-2 text-sm text-[#1F2937]">Service: {selectedPatient?.service_name || 'Unknown'}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Service filter</span>
              <select value={selectedServiceId} onChange={(e) => { setSelectedServiceId(e.target.value); setSelectedWardId(''); setSelectedBedId(''); }} className="h-12 rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1F2937] outline-none transition focus:border-[#CBD5E1]">
                <option value="">All services</option>
                {services.map((s) => <option key={s.id} value={s.id}>{s.service_name}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Destination ward</span>
              <select value={selectedWardId} onChange={(e) => { setSelectedWardId(e.target.value); setSelectedBedId(''); }} className="h-12 rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1F2937] outline-none transition focus:border-[#CBD5E1]">
                <option value="">Select ward</option>
                {destinationWards.map((w) => <option key={w.id} value={w.id}>{w.ward_name}{String(selectedPatient?.current_ward_id) === String(w.id) ? ' (current)' : ''}</option>)}
              </select>
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Available destination bed</span>
            <select value={selectedBedId} onChange={(e) => setSelectedBedId(e.target.value)} disabled={!selectedWard} className="h-12 rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1F2937] outline-none transition focus:border-[#CBD5E1] disabled:cursor-not-allowed disabled:opacity-60">
              <option value="">Select bed</option>
              {bedOptions.map((bed) => <option key={bed.id} value={bed.id}>{bed.label}</option>)}
            </select>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Transfer reason</span>
              <input type="text" value={transferReason} onChange={(e) => setTransferReason(e.target.value)} placeholder="Reason for transfer" className="h-12 rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1F2937] outline-none transition focus:border-[#CBD5E1]" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">Notes</span>
              <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes" className="h-12 rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1F2937] outline-none transition focus:border-[#CBD5E1]" />
            </label>
          </div>
          {errorMessage ? <div className="rounded-2xl bg-[#FEF3C7] p-4 text-sm text-[#92400E]">{errorMessage}</div> : null}
          <div className="mt-4 flex flex-wrap gap-3 justify-end">
            <button type="button" onClick={onClose} className="rounded-2xl border border-[#E5E7EB] px-5 py-3 text-sm font-medium text-[#1F2937] transition hover:bg-[#F8FAFC]">Cancel</button>
            <button type="submit" disabled={saving} className="rounded-2xl bg-[#1F2937] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#94A3B8] disabled:cursor-not-allowed disabled:opacity-60">{saving ? 'Saving…' : 'Confirm transfer'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
