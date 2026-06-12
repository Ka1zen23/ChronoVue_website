import { useMemo } from 'react';

const LANES = [
  { id: 'doctor', label: 'Awaiting Clearance', sublabel: 'Doctor / Nurse', headerBg: 'bg-blue-50', headerBorder: 'border-blue-200', headerText: 'text-blue-700', countBg: 'bg-blue-100', countText: 'text-blue-700' },
  { id: 'pharmacy', label: 'Awaiting Pharmacy', sublabel: 'Avg 4–6h post-clearance', headerBg: 'bg-amber-50', headerBorder: 'border-amber-200', headerText: 'text-amber-800', countBg: 'bg-amber-100', countText: 'text-amber-700' },
  { id: 'transport', label: 'Awaiting Transport', sublabel: 'Coordination pending', headerBg: 'bg-violet-50', headerBorder: 'border-violet-200', headerText: 'text-violet-700', countBg: 'bg-violet-100', countText: 'text-violet-700' },
  { id: 'ready', label: 'Ready to Discharge', sublabel: 'All steps complete', headerBg: 'bg-green-50', headerBorder: 'border-green-200', headerText: 'text-green-700', countBg: 'bg-green-100', countText: 'text-green-700' },
];

const TL_META = {
  green: {
    color: '#16a34a',
    label: 'Ready to discharge',
    icon: <path fillRule="evenodd" d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm3.47 4.47a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 0 1 1.06-1.06L7 8.94l3.47-3.47a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />,
  },
  yellow: {
    color: '#d97706',
    label: 'Action needed',
    icon: <path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm.75 3.5a.75.75 0 0 0-1.5 0v3.25l-1.5 1.5a.75.75 0 1 0 1.06 1.06l1.72-1.72V4.5Z" />,
  },
  grey: {
    color: '#94a3b8',
    label: 'Not ready',
    icon: <path fillRule="evenodd" d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm-3 7a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 8Z" clipRule="evenodd" />,
  },
};

function getLaneId(patient) {
  const wf = patient.dischargeWorkflow || [];
  const done = (key) => wf.find((s) => s.key === key)?.completed ?? false;
  if (done('doctorClearance') && done('nurseClearance') && done('pharmacy') && done('transportLogistics')) return 'ready';
  if (done('doctorClearance') && done('nurseClearance') && done('pharmacy')) return 'transport';
  if (done('doctorClearance') && done('nurseClearance')) return 'pharmacy';
  return 'doctor';
}

function getTrafficLightColor(patient) {
  const wf = patient.dischargeWorkflow || [];
  const allDone = wf.length > 0 && wf.every((s) => s.completed);
  const hasDelay = patient.delay && !['none', ''].includes(patient.delay.toLowerCase().trim());
  if (allDone && !hasDelay) return 'green';
  if (patient.status === 'NOT READY') return 'grey';
  return 'yellow';
}

function getEddUrgencyClass(expected) {
  const s = String(expected || '').toLowerCase();
  if (s.includes('today')) return 'edd-today';
  if (s.includes('tomorrow')) return 'edd-tomorrow';
  return 'text-[#1F2937]';
}

function hasActiveDelay(patient) {
  return Boolean(patient.delay && !['none', ''].includes(patient.delay.toLowerCase().trim()));
}

function StatusIcon({ tlColor }) {
  const meta = TL_META[tlColor];
  return (
    <svg viewBox="0 0 16 16" fill={meta.color} className="h-3.5 w-3.5 shrink-0" role="img" aria-label={meta.label}>
      {meta.icon}
    </svg>
  );
}

function PatientCard({ patient }) {
  const tlColor = getTrafficLightColor(patient);
  const delayed = hasActiveDelay(patient);
  const losFlag = patient.signal === 'los';
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-[#E5E7EB] bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <StatusIcon tlColor={tlColor} />
          <span className="truncate text-sm font-semibold text-[#1F2937]">{patient.id}</span>
        </div>
        <span className={`shrink-0 text-xs font-semibold ${getEddUrgencyClass(patient.expected)}`}>{patient.expected}</span>
      </div>
      <p className="truncate text-xs text-[#1F2937]">{patient.diagnosis}</p>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#94A3B8]">
        <span>{patient.ward}</span><span>·</span><span>LOS {patient.los}d</span>
        {patient.assignedBed ? (<><span>·</span><span>{patient.assignedBed}</span></>) : (<><span>·</span><span className="font-semibold text-[#94A3B8]">No bed</span></>)}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {delayed && (
          <span className="inline-flex w-fit items-center rounded-full bg-[#fef3c7] px-2 py-0.5 text-xs font-semibold text-[#B45309]">{patient.delay}</span>
        )}
        {losFlag && (
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#ede9fe] px-2 py-0.5 text-xs font-semibold text-[#6d28d9]" title="Flagged by FLOW based on length of stay vs diagnosis median">
            <svg className="h-3 w-3 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm.75 3.5a.75.75 0 0 0-1.5 0v3.25l-1.5 1.5a.75.75 0 1 0 1.06 1.06l1.72-1.72V4.5Z"/></svg>
            Predicted: {patient.expected}
          </span>
        )}
      </div>
    </div>
  );
}

function LaneColumn({ lane, patients }) {
  return (
    <div className="flex min-w-[220px] flex-1 flex-col gap-3">
      <div className={['flex items-center justify-between rounded-xl border px-3 py-2.5', lane.headerBg, lane.headerBorder, lane.headerText].join(' ')}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em]">{lane.label}</p>
          <p className="mt-0.5 text-xs opacity-70">{lane.sublabel}</p>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-sm font-bold ${lane.countBg} ${lane.countText}`}>{patients.length}</span>
      </div>
      {patients.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#E5E7EB] px-3 py-5 text-center text-xs text-[#94A3B8]">No patients in this lane</p>
      ) : (
        <div className="flex flex-col gap-2">
          {patients.map((patient) => <PatientCard key={patient.id} patient={patient} />)}
        </div>
      )}
    </div>
  );
}

export default function DischargeWorkflowPage({ patients = [] }) {
  const isWeekend = [0, 6].includes(new Date().getDay());
  const grouped = useMemo(() => {
    const map = { doctor: [], pharmacy: [], transport: [], ready: [] };
    [...patients].sort((a, b) => {
      const urgency = (p) => { const s = String(p.expected || '').toLowerCase(); if (s.includes('today')) return 0; if (s.includes('tomorrow')) return 1; return 2; };
      return urgency(a) - urgency(b);
    }).forEach((patient) => { map[getLaneId(patient)].push(patient); });
    return map;
  }, [patients]);
  const pharmacyCount = grouped.pharmacy.length;
  const readyCount = grouped.ready.length;
  const delayedCount = patients.filter(hasActiveDelay).length;
  const predictedCount = patients.filter((p) => p.signal === 'los').length;
  return (
    <main className="dashboard-page">
      <div className="dashboard-page-container dashboard-stack">
        <header className="flex flex-col gap-1.5">
          <p className="section-label">ChronoVue · Discharge Workflow</p>
          <h1 className="text-[1.25rem] font-semibold tracking-tight text-[#1F2937]">Live discharge pipeline</h1>
          <p className="text-sm text-[#1F2937]">
            Patients grouped by next bottleneck.{' '}
            <strong className="text-[#16a34a]">{readyCount} ready</strong>{' '}·{' '}
            <strong className="text-[#B45309]">{delayedCount} delayed</strong>{' '}·{' '}
            {predictedCount > 0 && (<><strong className="text-[#6d28d9]">{predictedCount} predicted by FLOW</strong>{' '}·{' '}</>)}
            {patients.length} total
          </p>
        </header>
        <div className="flex items-start gap-4 rounded-xl border border-[#fde68a] border-l-4 border-l-[#d97706] bg-[#fffbeb] p-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d97706]">Pharmacy delay: key bottleneck</p>
            <p className="text-sm text-[#1F2937]">
              Even after clinical clearance, patients wait an average of <strong>4–6 hours</strong> for medication dispensing.
              {pharmacyCount > 0 ? ` Currently: ${pharmacyCount} patient${pharmacyCount > 1 ? 's' : ''} in the pharmacy queue.` : ' No patients currently awaiting pharmacy.'}
            </p>
            <p className="mt-0.5 text-xs text-[#94A3B8]">Source: Awang Husaini et al. (2022), AMU discharge delay study, Brunei</p>
          </div>
        </div>
        {isWeekend && (
          <div className="flex items-start gap-4 rounded-xl border border-[#fecaca] border-l-4 border-l-[#dc2626] bg-[#fef2f2] p-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#dc2626]">Weekend service limitation</p>
              <p className="text-sm text-[#1F2937]">Reduced specialist, pharmacy, and radiology availability today. Consider <strong>nursing-led discharge</strong> for patients awaiting transport only.</p>
              <p className="mt-0.5 text-xs text-[#94A3B8]">Weekend limitations account for 10.6% of AMU discharge delays (Awang Husaini et al., 2022)</p>
            </div>
          </div>
        )}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {LANES.map((lane) => <LaneColumn key={lane.id} lane={lane} patients={grouped[lane.id]} />)}
        </div>
      </div>
    </main>
  );
}
