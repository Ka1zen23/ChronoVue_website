import { wardDefinitions } from './wardCatalog';

export const bedStatusConfig = {
  available: {
    label: 'Available',
    badgeClassName: 'bg-emerald-100 text-emerald-700',
    dotClassName: 'bg-emerald-500',
    cardClassName: 'border-[#E5E7EB] bg-white',
    buttonClassName: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    helperText: 'Ready for admission'
  },
  occupied: {
    label: 'Occupied',
    badgeClassName: 'bg-amber-100 text-amber-700',
    dotClassName: 'bg-amber-500',
    cardClassName: 'border-amber-200 bg-amber-50/40',
    buttonClassName: 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100',
    helperText: 'Patient admitted'
  },
  maintenance: {
    label: 'Maintenance',
    badgeClassName: 'bg-slate-100 text-slate-600',
    dotClassName: 'bg-slate-400',
    cardClassName: 'border-[#E5E7EB] bg-slate-50/60',
    buttonClassName: 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100',
    helperText: 'Under maintenance'
  },
  blocked: {
    label: 'Blocked',
    badgeClassName: 'bg-rose-100 text-rose-700',
    dotClassName: 'bg-rose-500',
    cardClassName: 'border-rose-200 bg-rose-50/40',
    buttonClassName: 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100',
    helperText: 'Blocked / isolation'
  }
};

export const statusFilterOptions = [
  { id: 'all',         label: 'All Beds',    summary: 'All beds in this ward' },
  { id: 'available',   label: 'Available',   summary: 'Ready for admission' },
  { id: 'occupied',    label: 'Occupied',    summary: 'Patient currently admitted' },
  { id: 'maintenance', label: 'Maintenance', summary: 'Under maintenance' },
  { id: 'blocked',     label: 'Blocked',     summary: 'Blocked or isolation' }
];

const DEMO_OCCUPIED = {
  'ward-amu': [
    { bedIndex: 0, patientId: 'PT-0012', diagnosis: 'Pneumonia', updatedBy: 'Nurse Amirah' },
    { bedIndex: 2, patientId: 'PT-0017', diagnosis: 'Sepsis', updatedBy: 'Nurse Haziq' },
    { bedIndex: 4, patientId: 'PT-0023', diagnosis: 'COPD exacerbation', updatedBy: 'Nurse Amirah' },
    { bedIndex: 6, patientId: 'PT-0031', diagnosis: 'Chest pain, ACS query', updatedBy: 'Nurse Siti' },
    { bedIndex: 8, patientId: 'PT-0038', diagnosis: 'UTI with delirium', updatedBy: 'Nurse Haziq' },
    { bedIndex: 10, patientId: 'PT-0044', diagnosis: 'Cellulitis', updatedBy: 'Nurse Amirah' },
    { bedIndex: 12, patientId: 'PT-0051', diagnosis: 'DVT', updatedBy: 'Nurse Siti' },
    { bedIndex: 14, patientId: 'PT-0058', diagnosis: 'Electrolyte imbalance', updatedBy: 'Nurse Haziq' },
  ],
  'ward-surgical': [
    { bedIndex: 0, patientId: 'PT-0061', diagnosis: 'Post-appendicectomy', updatedBy: 'Nurse Rania' },
    { bedIndex: 1, patientId: 'PT-0062', diagnosis: 'Colostomy reversal', updatedBy: 'Nurse Rania' },
    { bedIndex: 3, patientId: 'PT-0064', diagnosis: 'Hernia repair', updatedBy: 'Nurse Lina' },
    { bedIndex: 5, patientId: 'PT-0066', diagnosis: 'Cholecystectomy', updatedBy: 'Nurse Rania' },
    { bedIndex: 7, patientId: 'PT-0068', diagnosis: 'Wound debridement', updatedBy: 'Nurse Lina' },
  ],
  'ward-icu': [
    { bedIndex: 0, patientId: 'PT-0071', diagnosis: 'Respiratory failure', updatedBy: 'Nurse Khairul' },
    { bedIndex: 1, patientId: 'PT-0072', diagnosis: 'Multi-organ failure', updatedBy: 'Nurse Khairul' },
    { bedIndex: 2, patientId: 'PT-0073', diagnosis: 'Septic shock', updatedBy: 'Nurse Nadia' },
    { bedIndex: 3, patientId: 'PT-0074', diagnosis: 'Post-cardiac arrest', updatedBy: 'Nurse Khairul' },
    { bedIndex: 4, patientId: 'PT-0075', diagnosis: 'Severe TBI', updatedBy: 'Nurse Nadia' },
  ],
  'ward-ccu': [
    { bedIndex: 0, patientId: 'PT-0081', diagnosis: 'STEMI', updatedBy: 'Nurse Farah' },
    { bedIndex: 1, patientId: 'PT-0082', diagnosis: 'NSTEMI', updatedBy: 'Nurse Farah' },
    { bedIndex: 2, patientId: 'PT-0083', diagnosis: 'Arrhythmia', updatedBy: 'Nurse Farah' },
  ],
  'ward-og': [
    { bedIndex: 0, patientId: 'PT-0091', diagnosis: 'Post-C-section', updatedBy: 'Nurse Hafsah' },
    { bedIndex: 2, patientId: 'PT-0093', diagnosis: 'Pre-eclampsia', updatedBy: 'Nurse Hafsah' },
    { bedIndex: 4, patientId: 'PT-0095', diagnosis: 'Hyperemesis gravidarum', updatedBy: 'Nurse Zu' },
    { bedIndex: 6, patientId: 'PT-0097', diagnosis: 'Labour (active)', updatedBy: 'Nurse Hafsah' },
  ],
  'ward-paeds': [
    { bedIndex: 0, patientId: 'PT-0101', diagnosis: 'Febrile seizure', updatedBy: 'Nurse Azlina' },
    { bedIndex: 1, patientId: 'PT-0102', diagnosis: 'Bronchiolitis', updatedBy: 'Nurse Azlina' },
    { bedIndex: 3, patientId: 'PT-0104', diagnosis: 'Acute gastroenteritis', updatedBy: 'Nurse Dani' },
  ]
};

const DEMO_BLOCKED = {
  'ward-amu': [16],
  'ward-surgical': [9, 10],
  'ward-icu': [],
  'ward-ccu': [],
  'ward-og': [11, 12],
  'ward-paeds': [7]
};

const DEMO_MAINTENANCE = {
  'ward-amu': [18],
  'ward-surgical': [15],
  'ward-icu': [],
  'ward-ccu': [],
  'ward-og': [],
  'ward-paeds': [10]
};

function makeBeds(ward) {
  const occupied = DEMO_OCCUPIED[ward.id] ?? [];
  const blocked = new Set(DEMO_BLOCKED[ward.id] ?? []);
  const maintenance = new Set(DEMO_MAINTENANCE[ward.id] ?? []);
  const occupiedMap = new Map(occupied.map((o) => [o.bedIndex, o]));
  const now = new Date();

  return Array.from({ length: ward.totalBeds }, (_, i) => {
    const code = `${ward.code}-B${String(i + 1).padStart(2, '0')}`;
    const occupiedInfo = occupiedMap.get(i);
    const status = occupiedInfo ? 'occupied'
      : blocked.has(i) ? 'blocked'
      : maintenance.has(i) ? 'maintenance'
      : 'available';

    return {
      id: `${ward.id}-bed-${i}`,
      code,
      label: code,
      room: `Room ${Math.floor(i / 2) + 1}`,
      status,
      patient: occupiedInfo ? { id: occupiedInfo.patientId, diagnosis: occupiedInfo.diagnosis } : null,
      updatedAt: new Date(now.getTime() - Math.random() * 3600000).toISOString(),
      updatedBy: occupiedInfo?.updatedBy ?? 'Bed board sync'
    };
  });
}

export function createInitialWardState() {
  return wardDefinitions.map((ward) => ({
    id: ward.id,
    code: ward.code,
    name: ward.name,
    totalBeds: ward.totalBeds,
    beds: makeBeds(ward)
  }));
}

export function getStatusSummaryCounts(beds) {
  const counts = { all: beds.length, available: 0, occupied: 0, maintenance: 0, blocked: 0 };
  beds.forEach((bed) => { if (counts[bed.status] !== undefined) counts[bed.status]++; });
  return counts;
}

export function summarizeBedBoard(wards) {
  let lastUpdatedAt = new Date(0);
  let updatedBy = 'Bed board sync';
  wards.forEach((ward) => {
    ward.beds.forEach((bed) => {
      const d = bed.updatedAt ? new Date(bed.updatedAt) : null;
      if (d && d > lastUpdatedAt) { lastUpdatedAt = d; updatedBy = bed.updatedBy ?? updatedBy; }
    });
  });
  return { lastUpdatedAt, updatedBy };
}
