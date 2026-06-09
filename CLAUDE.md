# CLAUDE.md — FLOW Hospital Bed Management System

## Project Overview

FLOW is a hospital bed management and discharge coordination platform for RIPAS Hospital, Brunei. It consolidates ward census, patient transfers, discharge workflows, and bed allocation into a single real-time dashboard for nurse managers and Clinical Site Coordinators (CSC).

**Critical constraints — never violate:**
- 🔒 **PDPO Compliance**: Patient identifiers (names, IC numbers, DOB) are strictly prohibited. Use bed code as the primary patient reference.
- ⛔ **Read-Only HIS**: FLOW must never write back to BruHIMS or any external Hospital Information System.

---

## Team

| Person | Role | Notes |
|--------|------|-------|
| Wazien | CTO — full-stack, DevOps, infra | Masters in Cybersecurity from Jul 2026 |
| Amir | Co-founder, data analyst | Masters in Cybersecurity from Jul 2026 |
| Ezzah | Masters in Digital Public Health | Clinical logic, acuity standards, metadata |
| Syafiqah | Masters of Public Health | Clinical research, benchmarks, validation |
| Pg. Dr Khairol | Clinical advisor | Final sign-off on clinical accuracy |

---

## Current Workflow (Validated 6 Jun 2026)

Everything is manual end-to-end. No BruHIMS data is used at ward level.

| Role | Task | Time/shift |
|------|------|-----------|
| Staff Nurse (SN) | Paper census, 3x daily per ward | 20–30 min/ward |
| Shift Coordinator (SC) | Collects papers, transfers to Excel, validates with SN via WhatsApp | 30–45 min |
| CSC | Receives summaries from SC — minimal entry, reads only | Low |
| Matron | 8AM MMT review from whiteboard — data up to 8h old | 30–60 min |

**Total coordination overhead per shift: 2–3 hours.**

Key corrections from original assumptions:
- No BruHIMS records feed the ward-level workflow — paper and Excel only
- SC validates data with SN via WhatsApp (not SC → CSC file share)
- CSC is passive — receives summaries from SC, does not key-in data
- Whiteboard updated manually at midnight only — static between shifts

**FLOW v2.0** replaces paper entry and SC Excel transfer.
**FLOW v3.0** automates the full chain — eliminating manual entry entirely via RTLS (BLE/RFID).

---

## Product Roadmap

### FLOW v1.0 — Command Centre (current priority)
- Mirror the whiteboard-based ward census process
- Quick data entry for nurses on duty
- Ward census feature for data collectors
- 8AM meeting view: command centre feature
- Option for split view (men / women+children)
- Colour-coded occupancy:
  - Red: >90% occupancy
  - Amber: 60–89% occupancy
  - Green: <60% occupancy
- Display: total vacant beds, grand total, categorisation
- Update ward names and bed numbers to match actual RIPAS wards
- Use dummy data with a clear disclaimer in demos
- Include: transfer in/out, no. of wards, special flags (e.g. Neuro ward fire hazard)
- **Data privacy:** ward-level numbers only — no identifiable patient information
- Add WD 23 to ward catalog
- Add Bunga Table with per-bed status dropdown (Vacant / Occupied / Blocked / Maintenance)
- Intermediate Census Page — sits between Ward Census and CSC Census; captures manually-entered supplementary tables that feed CSC Census totals
- Transfer route tracking — show where a patient was admitted from (admission → transfer path)
- Isolation Wards table: support mixed input types (not all fields are numeric)
- Vacant Beds table (Table 5): fully separate structure from other census tables — rebuild accordingly
- Outliers table: dynamic row/card addition (total outlier count is variable)

### FLOW v2.0 — Enhanced Prototype (confirmed features)

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Command Centre — Summary / Full View Toggle** | Switch between high-level summary and full ward breakdown |
| 2 | **Dashboard Occupancy Indicators** | Colour-coded per ward: Red >90%, Amber 60–89%, Green <60% |
| 3 | **Excel Upload** | Upload SC shift Excel file → auto-parse into FLOW with table, filter, sort, and graph display. BruHIMS CSV removed — no BruHIMS data exists in current workflow. |
| 4 | **Nurse Staffing Allocation** | Staffing ratio overlay per ward using nurse acuity standards: general ward 1:4–1:5; critical care 1:1–1:2 (max 1:6) |
| 5 | **Vacant Beds Grand Total & Categorisation** | Aggregate vacant bed count with breakdown by category |
| 6 | **Command Centre Split View** | Toggle between Male / Female / Children cohort views |
| 7 | **Cross-Navigation: Command Centre ↔ CSC Census** | Seamless navigation between Command Centre and CSC census view |

**Also carry forward from v1.0 scope:**
- Metadata definitions page (linked from relevant UI elements)
- Benchmark staffing ratios against international best practices
- Dummy data with disclaimer for demos

### FLOW v3.0 — Full Automation (post-v2.0)
Replaces the manual paper/Excel/WhatsApp chain entirely via RTLS hardware layer:
- BLE anchors fixed to ward walls (~4–6 per ward)
- Patient BLE wristbands (unique ID per patient)
- Bed BLE tags (one per bed)
- Ward gateway (Raspberry Pi / NUC) — BLE to LAN bridge
- RTLS middleware: location engine (trilateration), event processor (admit/transfer/discharge), AI inference (occupancy prediction)
- Target: under 3 seconds from physical movement to dashboard update
- AI layer requires 3+ months of real movement data from v2.0 pilot before training

### Future / Under Exploration (post-v3.0)

**Biomed Integration (surfaced 9 Jun 2026 — Dr. Amal, UTB)**
- Dr. Amal's system: real-time sensor-based predictive maintenance for hospital equipment; uses a scoring system to prioritise repairs
- RIPAS has ~2,000 beds in scope
- Proposed additions to FLOW:
  - `biomed` role with dedicated Biomed Dashboard (maintenance alerts, equipment/bed status, scoring queue)
  - Nurse → Biomed alert flow: nurses flag equipment issues from within FLOW; biomed team receives structured alert
- **Open architecture question:** three-way integration between FLOW (coordination), Upside (RFID occupancy), and Dr. Amal (predictive maintenance) — relationship between Upside and Dr. Amal systems is unresolved (complementary or competing?) ⚠️

---

## Milestones

| Date | Event |
|------|-------|
| 6 Jun 2026 | Validation session with RIPAS nursing team @ WCC building ✅ |
| 8 Jun 2026 | Data validation and formats meeting @ RIPAS Bilik Muafakat ✅ |
| 9 Jun 2026 | Engineering layer meeting @ RIPAS with Dr. Amal & Fadzlyn (UTB) — predictive maintenance presentation + FLOW demo ✅ |
| 10 Jun 2026 | Post-NatHack biz dev consultation (Syu'aib, Azimin, Adib) — incubation discussion |
| ~20 Jun 2026 | Follow-up check-in with nursing team — get SC Excel sample |
| Jul 2026 | Wazien + Amir begin Masters in Cybersecurity (reduced capacity) |
| Q3–Q4 2026 | FLOW v2.0 delivery target |
| Post-v2.0 | RIPAS paid contract — pilot at BND 3,000/month |

---

## v2.0 Build Plan (16 weeks)

| Sprint | Features | Owner |
|--------|----------|-------|
| 1 (wk 1–3) | Occupancy indicators, vacant beds total | Wazien + Amir |
| 2 (wk 4–6) | Summary/full toggle, split view | Wazien |
| 3 (wk 7–10) | Excel upload, parse, table/graph display | Wazien + Amir |
| 4 (wk 11–13) | Nurse staffing overlay, cross-navigation | Wazien + Ezzah |
| 5 (wk 14–16) | Metadata page, dummy data, QA | Full team |

**Critical dependency:** Get SC Excel file sample at ~20 Jun nursing team follow-up. Sprint 3 cannot start without it.

Sprints 1–3 must be completed before Masters starts (Jul 2026).

---

## Repository Structure

```
FLOW/
├── frontend/          React + Vite SPA
├── backend/           Express.js API server
├── client/            Legacy directory (do not modify)
├── docker-compose.yml Multi-container deployment
├── .env.example       Environment template
├── OPENAI.md          v2.0 feature specs and image generation prompts
└── CLAUDE.md          This file
```

Working directories are `frontend/` and `backend/`. Do not touch `client/`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v7, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express.js, PostgreSQL (`pg` driver) |
| Styling | Tailwind CSS + custom CSS in `frontend/src/App.css` |
| Build | Vite (frontend), Docker multi-stage (production) |
| Deployment | Docker Compose + Nginx, Tailscale VPN isolation |

---

## Frontend (`frontend/src/`)

### Structure

```
src/
├── App.jsx                    Main router + dashboard state
├── main.jsx                   React entry point with AuthProvider
├── App.css                    Global stylesheet (~83KB)
├── components/
│   ├── AppLayout.jsx          Shell: Sidebar + page outlet
│   ├── Sidebar.jsx            Role-gated navigation
│   ├── LoginPage.jsx
│   ├── ProtectedRoute.jsx     Auth + role guard for routes
│   ├── CensusEntryTables.jsx  CSC canvas with 11 editable tables
│   ├── WardCensusPage.jsx     Ward-specific census form
│   ├── CscCensusPage.jsx      CSC census page (date + shift picker)
│   ├── CommandCentrePage.jsx  Live command centre canvas
│   ├── BedManagementPage.jsx  Bed board and status editor
│   ├── PatientManagementPage.jsx
│   ├── DischargeWorkflowPage.jsx
│   ├── AccountsPage.jsx       User management (super_admin only)
│   ├── SettingsPage.jsx
│   ├── SystemLogsPage.jsx
│   └── ZoomableCanvas.jsx     Figma-like zoomable canvas component
├── context/
│   ├── AuthContext.jsx        Auth state, roles, localStorage session
│   └── ViewModeContext.jsx    kiosk / mobile / print modes
├── hooks/
│   ├── useAutoRefresh.js      Polling with visibility pause
│   ├── useCommandCentreData.js
│   ├── useMobileMenu.js
│   └── usePersistedState.js   localStorage-backed useState
├── data/
│   ├── wardCatalog.js
│   ├── careOperationsData.js  Static operational data
│   └── dischargePrediction.js Discharge prediction logic
└── utils/
    ├── roleAccess.js          Page access rules per role
    ├── csvImport.js           CSV parser + validator
    ├── zoneMapping.js         Hot/cold zone classification
    └── pdpo.js                PDPO-safe display helpers
```

### Routing

All routes are in `App.jsx`, wrapped in `ProtectedRoute` with role checks:

| Path | Component | Minimum Role |
|---|---|---|
| `/` | Dashboard | ward_nurse |
| `/ward-census` | WardCensusPage | ward_nurse |
| `/csc-census` | CscCensusPage | csc_sc |
| `/bed-management` | BedManagementPage | ward_nurse |
| `/command-centre` | CommandCentrePage | matron |
| `/discharge-workflow` | DischargeWorkflowPage | ward_nurse |
| `/patients` | PatientManagementPage | admin |
| `/accounts` | AccountsPage | super_admin |
| `/reports` / `/system-logs` | SystemLogsPage | super_admin |
| `/biomed` | BiomedDashboardPage (planned) | biomed |

### Authentication

Authentication is **client-side only** (localStorage). There is no backend auth endpoint.

- Session stored in `flow.session` (localStorage)
- Accounts stored in `flow.accounts` (localStorage)
- Audit log in `flow.auditLog` (max 500 entries)
- Token format: `btoa(accountId:timestamp:mock-jwt)`

**Roles (highest to lowest):**
1. `super_admin` — full access including accounts, reports, and system logs (ChronoVue only)
2. `admin` — full access except accounts/system logs (ChronoVue members)
3. `matron` — view only: Command Centre, Ward Census, CSC Census (no edit)
4. `csc_sc` — view + edit: Command Centre, CSC Census, Summary
5. `ward_nurse` — view + edit: Ward Census only
6. `biomed` — planned: view Biomed Dashboard (maintenance alerts, bed/equipment status, scoring queue); receive nurse-triggered alerts (scope TBD — 9 Jun 2026)

### Account Lifecycle

Staff accounts scale per ward over multi-year operation:
- Accounts inactive for **1 year** are flagged for deletion
- Super admin reviews and confirms deletion (no auto-delete)
- Designed to handle ~10+ years of staff turnover per ward
- Deletion is soft-delete initially (retain audit log entries); hard-delete on explicit confirmation

**Default test accounts:**

| Email | Password | Role |
|---|---|---|
| `superadmin@flow.hospital` | `SuperAdmin123!` | super_admin |
| `admin@flow.hospital` | `Admin123!` | admin |
| `matron@flow.hospital` | `Matron123!` | matron |
| `csc@flow.hospital` | `Csc123!` | csc_sc |
| `staffa@flow.hospital` | `Ward123!` | ward_nurse |
| `staffb@flow.hospital` | `Ward123!` | ward_nurse |
| `biomed@flow.hospital` | `Biomed123!` | biomed (planned) |

### Environment Variables (Frontend)

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend API base URL (baked in at build time) |

All API calls use: `const API = import.meta.env.VITE_API_URL ?? '';`

---

## Backend (`backend/src/`)

### Structure

```
src/
├── index.js   Main Express app — all routes + DB migrations
├── db.js      PostgreSQL connection pool
└── seed.js    Database seeding
```

All routes, schema migrations, and business logic live in `index.js`.

### Environment Variables (Backend)

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `4000` | Express port |
| `DATABASE_URL` | — | PostgreSQL connection string |
| `DB_SSL` | — | Enable SSL (set to `true` in production) |
| `NODE_ENV` | — | `production` disables verbose logging |

### Database Schema

Tables are created/migrated in `ensureCompatibilitySchema()` on startup (idempotent — uses `CREATE TABLE IF NOT EXISTS` and `ADD COLUMN IF NOT EXISTS`).

**Core tables:**
- `wards` — ward definitions (id, ward_code, ward_name, sort_order, active)
- `beds` — individual beds (id, ward_id, bed_code, active)
- `patients` — PDPO-compliant patient records (no names/IC stored in UI flows)
- `bed_assignments` — links patients to beds with timestamps

**Census tables:**
- `ward_census_records` — daily per-ward census (admissions, discharges, transfers, deaths, DCU, SCBU, on_leave, nursing staff counts)
- `ward_census_history` — append-only save history for audit trail
- `ed_attendance_records` — ED priority attendance counts
- `isolation_census_records` — isolation ward-specific fields (PCR, PTB, TRO, etc.)
- `vacant_beds_records` — vacant bed counts by category
- `pending_ed_records` — patients pending ED admission (with remarks)
- `ward9_records` — Ward 9 shift-based occupancy
- `ccs_stepdown_records` — CCS stepdown unit tracking
- `psych_police_prisoner_records` — special category patients
- `outliers_records` — outlier patients by specialty (dynamic rows — variable count)
- `day_cases_records` — day case procedures
- `flow_table_remarks` — table-level annotation (table_id, census_date)

**Ward census module tables (per-ward form):**
- `ward_staffing` — per-ward/date/shift staff count and nurse-in-charge
- `ward_bed_patients` — anonymised bed records (bed_number, diagnosis, AM/PM/Night reports — no PII)

**Other:**
- `patient_transfers` — transfer log (from/to ward and bed, including admission source for transfer route tracking)

### Key Constants in `index.js`

**`censusCategoryCatalog`** (lines 29–39) — the 9 high-level ward groups used by CSC Census:

```javascript
[
  { id: '22000000-0000-0000-0000-000000000001', ward_code: 'INT_MED',  ward_name: 'INT-MEDICINE', total_beds: 225 },
  { id: '22000000-0000-0000-0000-000000000010', ward_code: 'ISO_15',   ward_name: 'ISO-WARD 15',  total_beds: 12  },
  { id: '22000000-0000-0000-0000-000000000011', ward_code: 'ISO_16',   ward_name: 'ISO-WARD 16',  total_beds: 13  },
  { id: '22000000-0000-0000-0000-000000000002', ward_code: 'ISO_10',   ward_name: 'ISO-WARD 10',  total_beds: 0   },
  { id: '22000000-0000-0000-0000-000000000004', ward_code: 'SURGICAL', ward_name: 'SURGICAL',     total_beds: 151 },
  { id: '22000000-0000-0000-0000-000000000005', ward_code: 'CCS',      ward_name: 'CCS',          total_beds: 38  },
  { id: '22000000-0000-0000-0000-000000000006', ward_code: 'CCU',      ward_name: 'CCU',          total_beds: 22  },
  { id: '22000000-0000-0000-0000-000000000007', ward_code: 'OBS_GYN',  ward_name: 'OBS & GYN',   total_beds: 154 },
  { id: '22000000-0000-0000-0000-000000000008', ward_code: 'PAEDS',    ward_name: 'PAEDS',        total_beds: 199 },
]
```

**`SPECIFIC_WARDS_CATALOG`** (lines 41–63) — 20 individual wards with fixed UUIDs (`33000000-…`) that roll up into the category catalog above. Each entry has `ward_code`, `ward_name`, `category`, `capacity`, `census_category_id`, `ward_id`.

Ward-to-category mapping:
- WD 10 → ISO_10 | WD 15 → ISO_15 | WD 16 → ISO_16
- WD 2, 6, 7, 11, 12, 14, 23, BURN → SURGICAL
- WD 1, 3, 4, 17, 18, 19, 20, 21, 22 → INT_MED
- WD 17, 18: M/F split wards | Renal Ward: M/F split — verify exact bed counts with BMT ⚠️
- Bunga Table: separate entry with per-bed status dropdown — bed count TBC ⚠️

### API Routes

**Census — CSC (high-level):**
```
GET  /api/census/categories   → buildComputedCensusCategoryRows (aggregates individual wards)
GET  /api/census/history      → ward_census_history JOIN wards
POST /api/census              → upsert ward_census_records by ward_id or ward_code
PUT  /api/census/:id          → update census record
```

**Census — Ward Form (individual wards):**
```
GET  /api/ward-list           → SPECIFIC_WARDS_CATALOG (20 wards)
GET  /api/ward-census-form    → census + staffing + bed_patients for ward+date
POST /api/ward-census-form    → saves all three + upserts category rollup for CSC Census
```

**Census — Supplementary tables:**
```
GET/POST /api/ed-attendance
GET/POST /api/isolation-census
GET/POST /api/vacant-beds
GET/POST /api/pending-ed
GET/POST /api/ward9
GET/POST /api/ccs-stepdown
GET/POST /api/psych-police-prisoner
GET/POST /api/outliers
GET/POST /api/day-cases
GET/POST /api/table-remarks
```

**Bed & patient management:**
```
GET  /api/wards
GET  /api/bed-board
GET  /api/patients
PUT  /api/beds/:id
POST /api/assignments
POST /api/transfers
POST /api/import/csv
```

### CSC Census ↔ Ward Census Integration

When `POST /api/ward-census-form` is called for an individual ward (e.g., WD 15):
1. Saves the ward's record to `ward_census_records` with the ward's specific UUID (`33000000-…`)
2. Immediately aggregates all wards in the same census category (ISO_15 siblings in this case)
3. Upserts the aggregated totals to `ward_census_records` using the **category UUID** (`22000000-…`)
4. `GET /api/census/categories` then reads this category-level record via the manual-override path in `buildComputedCensusCategoryRows`, showing correct totals in CSC Census

### `buildComputedCensusCategoryRows` (line 949)

The main aggregation function for CSC Census. For each date it:
1. Counts beds per ward from the `beds` table
2. Counts active patients from `bed_assignments`
3. Aggregates movement fields from `ward_census_records` (individual wards)
4. **Overrides** computed values with any manually-saved record at the category UUID level (the ward census rollup)

---

## CensusEntryTables Component

`frontend/src/components/CensusEntryTables.jsx` is the largest component. It renders all 11 editable tables for CSC Census as a Figma-like zoomable canvas.

**Props:**
- `date` (string YYYY-MM-DD) — controls which records to fetch/save
- `readOnly` (bool) — disables all inputs
- `zoomable` (bool) — enables the canvas mode vs. stacked mode
- `canvasHeight` (string CSS) — height of the zoomable canvas
- `wardFilter` (string | null) — if set, filters main census rows to this `ward_code`

**Canvas positions** — stored in `localStorage` under key `flow.cc.tablePositions` with version `v4`. Bumping `POSITIONS_VERSION` forces all users to reset to `DEFAULT_POSITIONS`.

**11 tables on the canvas:**

| Key | Component | Data source |
|---|---|---|
| `census-main` | CensusTable1 | `/api/census/categories` |
| `isolation` | IsolationCensusTable | `/api/isolation-census` |
| `occupancy` | OccupancyRateTable | derived from census rows |
| `stats` | VacantBedsTable + EdAttendanceTable | derived + `/api/ed-attendance` |
| `vacant` | VacantBedsEntryTable | `/api/vacant-beds` |
| `pending-ed` | PendingEdTable | `/api/pending-ed` |
| `ward9` | Ward9Table | `/api/ward9` |
| `ccs-stepdown` | CcsStepdownTable | `/api/ccs-stepdown` |
| `psych-police-prisoner` | PsychPolicePrisonerTable | `/api/psych-police-prisoner` |
| `outliers` | OutliersTable | `/api/outliers` |
| `day-cases` | DayCasesTable | `/api/day-cases` |

**Sticky notes** — persisted in `localStorage` under `flow.cc.canvasNotes`, date-independent. Created by right-click (desktop) or 600ms long-press (touch).

---

## WardCensusPage

`frontend/src/components/WardCensusPage.jsx` — the per-ward digitized census form.

**Features:**
- Ward picker (grouped by category: Isolation / Surgical / Internal Medicine)
- Date picker
- Census summary cards: Previous Total, Admissions, Discharges, Transfers In/Out, Deaths, DCU, SCBU, On Leave
- Auto-computed current census display with occupancy % and colour coding (red ≥90%, amber 60–89%, green <60%)
- Staffing card per shift (AM/PM/Night): staff count + Nurse In Charge
- Patient bed table (PDPO-compliant — bed number, diagnosis, AM/PM/Night reports only)
- **Ctrl+S / Cmd+S** keyboard shortcut to save
- Save calls `POST /api/ward-census-form` which also rolls up to CSC Census

---

## ZoomableCanvas Component

`frontend/src/components/ZoomableCanvas.jsx` — reusable Figma-like canvas.

**Props:**
- `heightCss` — CSS string for canvas height (default `calc(100vh - 220px)`)
- `onCanvasRightClick(pos)` — callback for right-click / long-press, receives canvas-space `{x, y}`
- `initialFit` — if true, calls `fitAll` 60ms after mount (used when no saved layout exists)

**Controls:**
- Wheel: zoom toward cursor
- Drag: pan
- Two-finger pinch: zoom (touch)
- Ctrl/Cmd +/-/0: zoom in/out/fit
- Escape: exit focused table, return to fit-all
- Bottom-right controls: +, zoom%, −, Fit, ← All

---

## Deployment

### Docker Compose

```yaml
services:
  db:        PostgreSQL 16, internal-only port, Tailscale IP-bound
  backend:   Node.js Express, port 4000, Tailscale IP-bound
  frontend:  Nginx serving Vite build, port 80, Tailscale IP-bound
  pgadmin:   pgAdmin4, port 9090, Tailscale IP-bound
```

The `VITE_API_URL` build arg is baked into the Nginx-served static bundle at Docker build time.

### nginx.conf

- `/api/` — proxied to `http://backend:4000`
- `/assets/` — `immutable` 1-year cache (content-hashed filenames)
- `/index.html` — `no-cache, no-store, must-revalidate` (prevents stale-bundle 404s across deploys)
- All other paths — SPA fallback to `/index.html`

### Git branch

Active development branch: `claude/cc-and-census-redesign`

---

## Common Patterns

**API calls in components:**
```javascript
const API = import.meta.env.VITE_API_URL ?? '';
fetch(`${API}/api/some-endpoint?date=${date}`)
```

**Date-reset pattern in sub-table `useEffect`:**
```javascript
useEffect(() => {
  setRows(DEFAULT_ROWS);     // always reset first — prevents stale data
  setLastUpdated(null);
  fetch(`${API}/api/endpoint?date=${date}`)
    .then(r => r.json())
    .then(data => { if (data.length) setRows(data); })
}, [date]);
```

**Backend replace-all transaction (for ordered tables):**
```javascript
await client.query('BEGIN');
await client.query('DELETE FROM table WHERE census_date = $1', [date]);
for (const row of rows) { await client.query('INSERT INTO table ...', [...]) }
await client.query('COMMIT');
```

**Canvas position persistence with versioning:**
```javascript
const POSITIONS_VERSION = 'v4'; // bump to force all users to reset layout
```

---

## Open Research Items

- [ ] Nurse acuity ratio standards — international benchmarks (Ezzah + Syafiqah)
- [ ] Metadata definitions for all dashboard fields (Ezzah leads)
- [ ] SC Excel file column schema — get sample at ~20 Jun nursing team follow-up
- [ ] How BruHIMS 2.0 staffing is updated — digital copy needed (for future reference only — not used in current workflow)
- [ ] Ward list verification (female/male breakdown, general bed counts, ISO bed counts) — confirm with Sister Fakirah / Noraimah
- [ ] Intermediate Census Page design — review session photos for supplementary table structures
- [ ] Bunga Table bed count — confirm total with BMT
- [ ] Account lifecycle policy — confirm 1-year inactivity threshold with Matron / admin stakeholders
- [ ] Three-way integration architecture: FLOW ↔ Upside RFID ↔ Dr. Amal predictive maintenance — define data ownership, API boundaries, and dashboard separation (9 Jun 2026)
- [ ] Upside vs. Dr. Amal overlap — clarify whether systems are complementary or competing before committing to integration design
- [ ] Biomed Dashboard UX — what does the biomed screen show? (alerts, bed/equipment status, maintenance scoring queue) — validate with Dr. Amal / Fadzlyn
- [ ] Bed brands in use at RIPAS — any hardware constraints relevant to RFID sticker or sensor attachment?
- [ ] Nurse → Biomed alert flow design — scope and implementation approach

---

## What FLOW Does NOT Do

- Does not write to BruHIMS or any external HIS
- Does not store patient names, IC numbers, or dates of birth
- Does not have server-side authentication (auth is client-side localStorage only)
- Does not send emails or push notifications
- Does not have a mobile-native app (web responsive only)
- Does not use BruHIMS CSV exports — workflow is paper and Excel only (BruHIMS data exploration is future-only, not current workflow)
- Does not auto-delete accounts — account deletion requires explicit super_admin confirmation
