import { wardDefinitions } from '../data/wardCatalog';
import { createInitialWardState, summarizeBedBoard } from '../data/bedBoardData';

// --- static mock payload factories ---

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

// --- Mutable in-memory bed board state ---

let _bedBoard = null;

function getBedBoard() {
  if (!_bedBoard) {
    const wards = createInitialWardState();
    const summary = summarizeBedBoard(wards);
    _bedBoard = {
      wards: wards.map((w) => ({
        id: w.id,
        ward_code: w.code,
        ward_name: w.name,
        total_beds: w.totalBeds,
        service_id: wardDefinitions.find((d) => d.id === w.id)?.serviceId ?? null,
        beds: w.beds.map((b) => ({
          id: b.id, code: b.code, label: b.label, room: b.room,
          status: b.status, patient: b.patient,
          updatedAt: b.updatedAt, updatedBy: b.updatedBy
        }))
      })),
      summary: {
        lastUpdatedAt: summary.lastUpdatedAt.toISOString(),
        updatedBy: summary.updatedBy
      }
    };
  }
  return _bedBoard;
}

function findBed(bedId) {
  for (const ward of getBedBoard().wards) {
    const bed = ward.beds.find((b) => b.id === bedId);
    if (bed) return { ward, bed };
  }
  return null;
}

function handlePutBed(urlStr, body) {
  const bedId = urlStr.replace('/api/beds/', '');
  const found = findBed(bedId);
  if (!found) return { error: 'Bed not found' };
  const { bed } = found;
  const now = new Date().toISOString();
  const newStatus = body.status ?? bed.status;
  bed.status = newStatus;
  bed.updatedAt = now;
  bed.updatedBy = body.updated_by ?? 'Demo user';
  bed.patient = newStatus === 'occupied' ? { id: body.patient_code, diagnosis: body.notes ?? '' } : null;
  const bb = getBedBoard();
  bb.summary.lastUpdatedAt = now;
  bb.summary.updatedBy = bed.updatedBy;
  return { ok: true };
}

function handlePutWardBeds(urlStr, body) {
  const match = urlStr.match(/^\/api\/wards\/([^/]+)\/beds$/);
  if (!match) return { error: 'Invalid URL' };
  const wardId = match[1];
  const ward = getBedBoard().wards.find((w) => w.id === wardId);
  if (!ward) return { error: 'Ward not found' };
  const newTotal = Number(body.total_beds);
  const current = ward.beds.length;
  if (newTotal > current) {
    for (let i = current; i < newTotal; i++) {
      const code = `${ward.ward_code}-B${String(i + 1).padStart(2, '0')}`;
      ward.beds.push({
        id: `${ward.id}-bed-${i}`, code, label: code,
        room: `Room ${Math.floor(i / 2) + 1}`,
        status: 'available', patient: null,
        updatedAt: new Date().toISOString(), updatedBy: 'Bed board sync'
      });
    }
  } else if (newTotal < current) {
    ward.beds = ward.beds.slice(0, newTotal);
  }
  ward.total_beds = newTotal;
  return { ok: true };
}

function handlePostDischarge(body) {
  const found = findBed(body.bed_id);
  if (!found) return { error: 'Bed not found' };
  const { bed } = found;
  bed.status = 'available';
  bed.patient = null;
  bed.updatedAt = new Date().toISOString();
  bed.updatedBy = body.discharged_by ?? 'Demo user';
  return { ok: true };
}

function handlePostTransfer(body) {
  if (body.from_bed_id) {
    const src = findBed(body.from_bed_id);
    if (src) {
      src.bed.status = 'available';
      src.bed.patient = null;
      src.bed.updatedAt = new Date().toISOString();
      src.bed.updatedBy = 'Transfer coordinator';
    }
  }
  if (body.to_bed_id) {
    const dest = findBed(body.to_bed_id);
    if (dest) {
      dest.bed.status = 'occupied';
      dest.bed.patient = { id: body.patient_id ?? 'Unknown', diagnosis: body.notes ?? '' };
      dest.bed.updatedAt = new Date().toISOString();
      dest.bed.updatedBy = 'Transfer coordinator';
    }
  }
  return { ok: true };
}

function mockResponse(payload) {
  const body = JSON.stringify(payload);
  return { ok: true, status: 200, json: async () => payload, text: async () => body };
}

export function installMockFetch() {
  const realFetch = window.fetch;

  window.fetch = async (url, options = {}) => {
    const urlStr = typeof url === 'string' ? url : url.toString();
    const method = (options.method ?? 'GET').toUpperCase();

    let body = {};
    if (options.body) {
      try { body = JSON.parse(options.body); } catch { /* non-JSON body */ }
    }

    if (method === 'GET') {
      if (/^\/api\/services$/.test(urlStr)) return mockResponse(makeServices());
      if (/^\/api\/bed-board$/.test(urlStr)) return mockResponse(getBedBoard());
      if (/^\/api\/patients\/admitted$/.test(urlStr)) return mockResponse(makeDemoPatients());
      if (/^\/api\/patients$/.test(urlStr)) return mockResponse(makePatients());
      if (/^\/api\/admission-candidates$/.test(urlStr)) return mockResponse(makeAdmissionCandidates());
      if (/^\/api\/census\/categories/.test(urlStr)) return mockResponse(makeCensusCategories());
      if (/^\/api\/census\/wards/.test(urlStr)) return mockResponse(makeCensusCategories());
    }

    if (method === 'PUT') {
      if (/^\/api\/beds\//.test(urlStr)) return mockResponse(handlePutBed(urlStr, body));
      if (/^\/api\/wards\/.*\/beds$/.test(urlStr)) return mockResponse(handlePutWardBeds(urlStr, body));
    }

    if (method === 'POST') {
      if (/^\/api\/discharges$/.test(urlStr)) return mockResponse(handlePostDischarge(body));
      if (/^\/api\/transfers$/.test(urlStr)) return mockResponse(handlePostTransfer(body));
      if (/^\/api\/admissions$/.test(urlStr)) return mockResponse({ ok: true });
      if (/^\/api\/assignments$/.test(urlStr)) return mockResponse({ ok: true });
    }

    return realFetch(url, options);
  };
}

export function uninstallMockFetch() {
  // no-op in demo context; real fetch is captured in closure
}
