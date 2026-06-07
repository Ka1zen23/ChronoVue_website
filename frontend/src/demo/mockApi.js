import { wardDefinitions } from '../data/wardCatalog';
import { createInitialWardState, summarizeBedBoard } from '../data/bedBoardData';

// --- static mock payload factories ---

function makeBedBoard() {
  const wards = createInitialWardState();
  const summary = summarizeBedBoard(wards);
  return {
    wards: wards.map((w) => ({
      id: w.id,
      ward_code: w.code,
      ward_name: w.name,
      total_beds: w.totalBeds,
      service_id: wardDefinitions.find((d) => d.id === w.id)?.serviceId ?? null,
      beds: w.beds.map((b) => ({
        id: b.id,
        code: b.code,
        label: b.label,
        room: b.room,
        status: b.status,
        patient: b.patient,
        updatedAt: b.updatedAt,
        updatedBy: b.updatedBy
      }))
    })),
    summary: {
      lastUpdatedAt: summary.lastUpdatedAt.toISOString(),
      updatedBy: summary.updatedBy
    }
  };
}

export function makePatients() {
  return [
    { id: 'PT-0012', patient_id: 'PT-0012', name: 'Ahmad Razali', ward: 'AMU', diagnosis: 'Pneumonia', status: 'Admitted', los: 3, assignedBed: 'AMU-B01', bedId: 'ward-amu-bed-0' },
    { id: 'PT-0017', patient_id: 'PT-0017', name: 'Siti Nuraini', ward: 'AMU', diagnosis: 'Sepsis', status: 'Admitted', los: 5, assignedBed: 'AMU-B03', bedId: 'ward-amu-bed-2' },
    { id: 'PT-0023', patient_id: 'PT-0023', name: 'Mohd Fadzli', ward: 'AMU', diagnosis: 'COPD exacerbation', status: 'Nearly Ready', los: 7, assignedBed: 'AMU-B05', bedId: 'ward-amu-bed-4' },
    { id: 'PT-0031', patient_id: 'PT-0031', name: 'Noorhaini bte Hj Yusof', ward: 'AMU', diagnosis: 'ACS query', status: 'Admitted', los: 1, assignedBed: 'AMU-B07', bedId: 'ward-amu-bed-6' },
    { id: 'PT-0038', patient_id: 'PT-0038', name: 'Pg Abdul Muiz', ward: 'AMU', diagnosis: 'UTI with delirium', status: 'Admitted', los: 4, assignedBed: 'AMU-B09', bedId: 'ward-amu-bed-8' },
    { id: 'PT-0044', patient_id: 'PT-0044', name: 'Hajah Ramlah', ward: 'AMU', diagnosis: 'Cellulitis', status: 'Ready', los: 6, assignedBed: 'AMU-B11', bedId: 'ward-amu-bed-10' },
    { id: 'PT-0051', patient_id: 'PT-0051', name: 'Saifullah Hj Damit', ward: 'AMU', diagnosis: 'DVT', status: 'Admitted', los: 2, assignedBed: 'AMU-B13', bedId: 'ward-amu-bed-12' },
    { id: 'PT-0058', patient_id: 'PT-0058', name: 'Noraini bte Kassim', ward: 'AMU', diagnosis: 'Electrolyte imbalance', status: 'Nearly Ready', los: 3, assignedBed: 'AMU-B15', bedId: 'ward-amu-bed-14' },
    { id: 'PT-0061', patient_id: 'PT-0061', name: 'Yazid Hj Md Tahir', ward: 'Surgical Ward', diagnosis: 'Post-appendicectomy', status: 'Ready', los: 2, assignedBed: 'SURG-B01', bedId: 'ward-surgical-bed-0' },
    { id: 'PT-0062', patient_id: 'PT-0062', name: 'Dk Rashidah', ward: 'Surgical Ward', diagnosis: 'Colostomy reversal', status: 'Admitted', los: 4, assignedBed: 'SURG-B02', bedId: 'ward-surgical-bed-1' },
    { id: 'PT-0064', patient_id: 'PT-0064', name: 'Mohd Aiman', ward: 'Surgical Ward', diagnosis: 'Hernia repair', status: 'Nearly Ready', los: 1, assignedBed: 'SURG-B04', bedId: 'ward-surgical-bed-3' },
    { id: 'PT-0071', patient_id: 'PT-0071', name: 'Hj Roslan', ward: 'ICU', diagnosis: 'Respiratory failure', status: 'Admitted', los: 8, assignedBed: 'ICU-B01', bedId: 'ward-icu-bed-0' },
    { id: 'PT-0072', patient_id: 'PT-0072', name: 'Faridah bte Osman', ward: 'ICU', diagnosis: 'Multi-organ failure', status: 'Admitted', los: 12, assignedBed: 'ICU-B02', bedId: 'ward-icu-bed-1' },
    { id: 'PT-0081', patient_id: 'PT-0081', name: 'Hj Masri', ward: 'CCU', diagnosis: 'STEMI', status: 'Admitted', los: 2, assignedBed: 'CCU-B01', bedId: 'ward-ccu-bed-0' },
    { id: 'PT-0091', patient_id: 'PT-0091', name: 'Siti Hajar', ward: 'O&G Ward', diagnosis: 'Post-C-section', status: 'Nearly Ready', los: 2, assignedBed: 'OG-B01', bedId: 'ward-og-bed-0' },
    { id: 'PT-0101', patient_id: 'PT-0101', name: 'Muhamad Irfan (9y)', ward: 'Paediatrics', diagnosis: 'Febrile seizure', status: 'Ready', los: 1, assignedBed: 'PAEDS-B01', bedId: 'ward-paeds-bed-0' },
  ];
}

function makeAdmissionCandidates() {
  return [
    { id: 'AC-001', patient_id: 'AC-001', name: 'Rosnani bte Hj Ahmad', gender: 'F', age: 62, contactNumber: '+673 8XX-XXXX', address: 'Kampung Manggis, Tutong', nextOfKin: 'Hj Ahmad (husband)' },
    { id: 'AC-002', patient_id: 'AC-002', name: 'Awang Suffian', gender: 'M', age: 45, contactNumber: '+673 8XX-XXXX', address: 'Gadong, BSB', nextOfKin: 'Noraini (wife)' },
    { id: 'AC-003', patient_id: 'AC-003', name: 'Hajah Norlin', gender: 'F', age: 71, contactNumber: '+673 7XX-XXXX', address: 'Seria, Belait', nextOfKin: 'Khairul (son)' },
  ];
}

function makeServices() {
  return [
    { id: 'svc-med',  service_name: 'Internal Medicine' },
    { id: 'svc-surg', service_name: 'Surgery' },
    { id: 'svc-crit', service_name: 'Critical Care' },
    { id: 'svc-og',   service_name: 'Obstetrics & Gynaecology' },
    { id: 'svc-paed', service_name: 'Paediatrics' }
  ];
}

function makeCensusCategories() {
  return [
    { id: 'cat-amu', ward_id: 'ward-amu', ward_name: 'AMU', service_id: 'svc-med', service_name: 'Internal Medicine', previous_male: 8, previous_female: 6, admissions_male: 2, admissions_female: 1, transfers_in_male: 1, transfers_in_female: 0, transfers_out_male: 1, transfers_out_female: 0, discharges_male: 1, discharges_female: 1, deaths_male: 0, deaths_female: 0, absconded_male: 0, absconded_female: 0, total_beds: 20 },
    { id: 'cat-surg', ward_id: 'ward-surgical', ward_name: 'Surgical Ward', service_id: 'svc-surg', service_name: 'Surgery', previous_male: 5, previous_female: 3, admissions_male: 1, admissions_female: 1, transfers_in_male: 0, transfers_in_female: 0, transfers_out_male: 0, transfers_out_female: 1, discharges_male: 1, discharges_female: 0, deaths_male: 0, deaths_female: 0, absconded_male: 0, absconded_female: 0, total_beds: 18 },
    { id: 'cat-icu', ward_id: 'ward-icu', ward_name: 'ICU', service_id: 'svc-crit', service_name: 'Critical Care', previous_male: 3, previous_female: 2, admissions_male: 1, admissions_female: 0, transfers_in_male: 0, transfers_in_female: 1, transfers_out_male: 0, transfers_out_female: 0, discharges_male: 0, discharges_female: 0, deaths_male: 0, deaths_female: 0, absconded_male: 0, absconded_female: 0, total_beds: 8 },
    { id: 'cat-ccu', ward_id: 'ward-ccu', ward_name: 'CCU', service_id: 'svc-crit', service_name: 'Critical Care', previous_male: 2, previous_female: 1, admissions_male: 0, admissions_female: 0, transfers_in_male: 1, transfers_in_female: 0, transfers_out_male: 0, transfers_out_female: 0, discharges_male: 0, discharges_female: 0, deaths_male: 0, deaths_female: 0, absconded_male: 0, absconded_female: 0, total_beds: 6 },
    { id: 'cat-og', ward_id: 'ward-og', ward_name: 'O&G Ward', service_id: 'svc-og', service_name: 'Obstetrics & Gynaecology', previous_male: 0, previous_female: 5, admissions_male: 0, admissions_female: 2, transfers_in_male: 0, transfers_in_female: 0, transfers_out_male: 0, transfers_out_female: 1, discharges_male: 0, discharges_female: 1, deaths_male: 0, deaths_female: 0, absconded_male: 0, absconded_female: 0, total_beds: 15 },
    { id: 'cat-paeds', ward_id: 'ward-paeds', ward_name: 'Paediatrics', service_id: 'svc-paed', service_name: 'Paediatrics', previous_male: 2, previous_female: 2, admissions_male: 1, admissions_female: 0, transfers_in_male: 0, transfers_in_female: 0, transfers_out_male: 0, transfers_out_female: 0, discharges_male: 0, discharges_female: 1, deaths_male: 0, deaths_female: 0, absconded_male: 0, absconded_female: 0, total_beds: 12 },
  ];
}

function makeDemoPatients() {
  return makePatients().map((p) => ({
    patient_id: p.patient_id,
    patient_name: p.name,
    mrn: `MRN-${p.patient_id}`,
    current_ward_id: wardDefinitions.find((w) => w.name === p.ward || w.code === p.ward)?.id ?? null,
    current_ward_name: p.ward,
    current_bed_id: p.bedId,
    current_bed_code: p.assignedBed,
    service_name: 'Internal Medicine',
    admission_id: `ADM-${p.patient_id}`,
    id: p.id
  }));
}

// Canonical mock routes
const MOCK_ROUTES = [
  { pattern: /^\/api\/services$/, data: () => makeServices() },
  { pattern: /^\/api\/bed-board$/, data: () => makeBedBoard() },
  { pattern: /^\/api\/patients\/admitted$/, data: () => makeDemoPatients() },
  { pattern: /^\/api\/patients$/, data: () => makePatients() },
  { pattern: /^\/api\/admission-candidates$/, data: () => makeAdmissionCandidates() },
  { pattern: /^\/api\/census\/categories/, data: () => makeCensusCategories() },
  { pattern: /^\/api\/census\/wards/, data: () => makeCensusCategories() },
  // Write operations — always succeed
  { pattern: /^\/api\/beds\//, data: () => ({ ok: true }), status: 200, method: 'PUT' },
  { pattern: /^\/api\/wards\/.*\/beds$/, data: () => ({ ok: true }), method: 'PUT' },
  { pattern: /^\/api\/discharges$/, data: () => ({ ok: true }), method: 'POST' },
  { pattern: /^\/api\/transfers$/, data: () => ({ ok: true }), method: 'POST' },
  { pattern: /^\/api\/admissions$/, data: () => ({ ok: true }), method: 'POST' },
  { pattern: /^\/api\/assignments$/, data: () => ({ ok: true }), method: 'POST' },
];

export function installMockFetch() {
  const realFetch = window.fetch;

  window.fetch = async (url, options = {}) => {
    const urlStr = typeof url === 'string' ? url : url.toString();
    const route = MOCK_ROUTES.find((r) => r.pattern.test(urlStr));

    if (route) {
      const payload = route.data();
      const body = JSON.stringify(payload);
      return {
        ok: true,
        status: route.status ?? 200,
        json: async () => payload,
        text: async () => body,
      };
    }

    return realFetch(url, options);
  };
}

export function uninstallMockFetch() {
  // no-op in demo context; real fetch is captured in closure
}
