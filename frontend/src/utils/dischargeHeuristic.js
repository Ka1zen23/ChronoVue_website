const DIAGNOSIS_MEDIAN_LOS_DAYS = {
  'Pneumonia':             5.0,
  'Sepsis':                7.0,
  'COPD exacerbation':     4.5,
  'ACS query':             3.0,
  'UTI with delirium':     5.0,
  'Cellulitis':            4.0,
  'DVT':                   3.0,
  'Electrolyte imbalance': 3.5,
  'Post-appendicectomy':   2.5,
  'Hernia repair':         1.5,
  'Febrile seizure':       1.5,
  'Post-C-section':        3.0,
  'STEMI':                 5.0,
  'Respiratory failure':  10.0,
  'Multi-organ failure':  14.0,
};

function estimateDaysRemaining(diagnosis, losDays) {
  const median = DIAGNOSIS_MEDIAN_LOS_DAYS[diagnosis] ?? 4.0;
  return Math.max(0, median - losDays);
}

function expectedLabel(daysRemaining) {
  if (daysRemaining <= 0) return 'Today';
  if (daysRemaining <= 1) return 'Tomorrow';
  return `~${Math.round(daysRemaining)}d`;
}

function workflowFromStatus(status) {
  if (status === 'Ready') {
    return [
      { key: 'doctorClearance', completed: true },
      { key: 'nurseClearance', completed: true },
      { key: 'pharmacy', completed: true },
      { key: 'transportLogistics', completed: true },
    ];
  }
  if (status === 'Nearly Ready') {
    return [
      { key: 'doctorClearance', completed: true },
      { key: 'nurseClearance', completed: true },
      { key: 'pharmacy', completed: false },
      { key: 'transportLogistics', completed: false },
    ];
  }
  // Status-based flag not triggered — LOS heuristic caught this patient
  return [
    { key: 'doctorClearance', completed: false },
    { key: 'nurseClearance', completed: false },
    { key: 'pharmacy', completed: false },
    { key: 'transportLogistics', completed: false },
  ];
}

/**
 * Flag patients likely to discharge within `thresholdDays`.
 * Returns them sorted by estimated days remaining (soonest first).
 *
 * signal values:
 *   'status'  — nurse already marked Ready / Nearly Ready
 *   'los'     — near or past median LOS for this diagnosis (system-flagged)
 */
export function flagDischargeCandidates(patients, thresholdDays = 1.0) {
  return patients
    .filter((p) => {
      const daysRemaining = estimateDaysRemaining(p.diagnosis, p.los);
      return (
        p.status === 'Ready' ||
        p.status === 'Nearly Ready' ||
        daysRemaining <= thresholdDays
      );
    })
    .map((p) => {
      const daysRemaining = estimateDaysRemaining(p.diagnosis, p.los);
      const statusTriggered = p.status === 'Ready' || p.status === 'Nearly Ready';
      return {
        id: p.patient_id ?? p.id,
        diagnosis: p.diagnosis,
        ward: p.ward,
        los: p.los,
        assignedBed: p.assignedBed,
        delay: '',
        status: p.status === 'Ready' ? 'READY' : 'NOT READY',
        expected: expectedLabel(daysRemaining),
        daysRemainingEstimate: Math.round(daysRemaining * 10) / 10,
        signal: statusTriggered ? 'status' : 'los',
        dischargeWorkflow: workflowFromStatus(p.status),
      };
    })
    .sort((a, b) => a.daysRemainingEstimate - b.daysRemainingEstimate);
}
