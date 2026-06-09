import { Fragment, useEffect, useMemo, useState } from 'react';

const censusSections = [
  {
    label: 'Main Block',
    rows: [
      { ward: 'Annexes', beds: 40, occupied: 36, vacant: 4, dirty: 0, blocked: 0 },
      { ward: '150-week', beds: 30, occupied: 24, vacant: 6, dirty: 1, blocked: 0 },
      { ward: 'Endoscopy', beds: 10, occupied: 7, vacant: 3, dirty: 0, blocked: 0 },
      { ward: 'Surgical', beds: 72, occupied: 58, vacant: 14, dirty: 2, blocked: 0 },
      { ward: 'ICU', beds: 16, occupied: 14, vacant: 2, dirty: 0, blocked: 0 },
      { ward: 'CCU', beds: 12, occupied: 9, vacant: 3, dirty: 0, blocked: 0 },
      { ward: 'Internal Medicine', beds: 80, occupied: 76, vacant: 4, dirty: 1, blocked: 0 },
      { ward: 'Neuro / PJC', beds: 30, occupied: 22, vacant: 8, dirty: 0, blocked: 0 }
    ],
    total: { ward: 'Total (Main Block)', beds: 461, occupied: 378, vacant: 67, dirty: '-', blocked: '-' }
  },
  {
    label: 'WCC',
    rows: [
      { ward: 'O&G', beds: 90, occupied: 52, vacant: 38, dirty: 2, blocked: 0 },
      { ward: 'Paediatrics', beds: 60, occupied: 31, vacant: 29, dirty: 0, blocked: 0 },
      { ward: 'Floors (WCC)', beds: 203, occupied: 140, vacant: 63, dirty: 3, blocked: 0 }
    ],
    total: { ward: 'Total (WCC)', beds: 353, occupied: 223, vacant: 130, dirty: '-', blocked: '-' }
  },
  {
    label: 'Old Building',
    rows: [{ ward: 'Old Bldg / Ward A', beds: '-', occupied: '-', vacant: '-', dirty: '-', blocked: '-' }]
  }
];

const occupancyRows = [
  { label: 'Main Block', beds: '461 beds', rate: '82%', tone: 'danger', value: 82 },
  { label: 'WCC', beds: '353 beds', rate: '60%', tone: 'success', value: 60 },
  { label: 'Old Building', beds: '— beds', rate: '—', tone: 'muted', value: 0 }
];

const vacantTotals = [
  { label: 'Main Block', value: 67, tone: 'danger' },
  { label: 'WCC', value: 130, tone: 'success' },
  { label: 'Old Building', value: '-', tone: 'warn' }
];

const vacantSpecialties = [
  { label: 'ICU', value: 2, tone: 'warn' },
  { label: 'CCU', value: 3, tone: 'warn' },
  { label: 'Int. Med', value: 4, tone: 'danger' },
  { label: 'Surgical', value: 14, tone: 'success' },
  { label: 'O&G', value: 38, tone: 'success' },
  { label: 'Paeds', value: 29, tone: 'success' }
];

const isolationRows = [
  { ward: 'Ward 3A', category: 'Urology', patients: 4, beds: 0 },
  { ward: 'Ward 5B', category: 'Plastic Surgery', patients: 6, beds: 1 },
  { ward: 'Ward 7', category: 'Neuro / PJC', patients: 8, beds: 2 },
  { ward: 'Ward 9', category: 'Psychiatric', patients: 5, beds: 1 },
  { ward: 'Ward 11', category: 'Maternity overflow', patients: 3, beds: 0 },
  { ward: 'Ward 12', category: 'Old Bldg patient', patients: 2, beds: 0 }
];

const pendingEdRows = [
  { zone: 'Adults', male: 4, female: 3, total: 7 },
  { zone: 'CEN', male: 1, female: 2, total: 3 }
];

const stepDownRows = [
  { unit: 'ICU 1', patients: 2, destination: 'ward' },
  { unit: 'ICU 2', patients: 1, destination: 'ward' },
  { unit: 'ICU 3', patients: 0, destination: 'ward' },
  { unit: 'CCL', patients: 1, destination: 'ward' }
];

const attendanceRows = [
  { priority: 'Priority 1', adult: 8, ce: 2, total: 10 },
  { priority: 'Priority 2', adult: 34, ce: 11, total: 45 },
  { priority: 'Priority 3', adult: 57, ce: 15, total: 72 }
];

const outlierRows = [
  { service: 'Internal Medicine', value: 5 },
  { service: 'Surgical', value: 3 },
  { service: 'Orthopaedics', value: 2 },
  { service: 'Old Building', value: '-' }
];

const anaesthesiaRows = [
  { type: 'Inpatient', ip: 12, day: 4, pn: 2, me: 1, total: 19 },
  { type: 'Emergency', ip: 5, day: 0, pn: 1, me: 0, total: 6 },
  { type: 'Elective', ip: 7, day: 4, pn: 1, me: 1, total: 13 }
];

const psychiatricRows = [
  { label: 'Psychiatric admissions', value: 3 },
  { label: 'Police escort cases', value: 1 },
  { label: 'Mission / foreign national', value: 2 },
  { label: 'First class (private)', value: 4 },
  { label: 'Nationwide panel', value: 1 }
];

const maintenanceRows = [
  { date: '27-5', issue: 'Bed sensor fault, Ward 3A' },
  { date: '26-5', issue: 'AC unit, Room 11B' }
];

function formatClock(date) {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Brunei' }).format(date);
}
function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Brunei' }).format(date);
}

function PanelHeader({ number, title }) {
  return (
    <div className="cc-panel-header">
      <span className="cc-panel-number">{number}</span>
      <h2>{title}</h2>
    </div>
  );
}

function ToneValue({ children, tone = 'neutral' }) {
  return <span className={`cc-tone-value cc-tone-${tone}`}>{children}</span>;
}

export default function CommandCentrePage() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const pendingTotals = useMemo(
    () => pendingEdRows.reduce((t, r) => ({ male: t.male + r.male, female: t.female + r.female, total: t.total + r.total }), { male: 0, female: 0, total: 0 }),
    []
  );
  const attendanceTotals = useMemo(
    () => attendanceRows.reduce((t, r) => ({ adult: t.adult + r.adult, ce: t.ce + r.ce, total: t.total + r.total }), { adult: 0, ce: 0, total: 0 }),
    []
  );
  const anaesthesiaTotals = useMemo(
    () => anaesthesiaRows.reduce((t, r) => ({ ip: t.ip + r.ip, day: t.day + r.day, pn: t.pn + r.pn, me: t.me + r.me, total: t.total + r.total }), { ip: 0, day: 0, pn: 0, me: 0, total: 0 }),
    []
  );

  return (
    <main className="dashboard-page command-centre-page">
      <div className="command-centre-container">
        <header className="cc-hero">
          <div>
            <p className="section-label">Command Centre</p>
            <h1>Hospital Command Centre</h1>
            <p className="cc-hero-copy">Bed management, patient flow, and operational visibility for the current shift.</p>
          </div>
          <div className="cc-hero-status">
            <span className="cc-status-pill cc-status-live"><span className="cc-live-dot" />Live</span>
            <span className="cc-status-pill">Demo mode</span>
            <span className="cc-status-pill">Operational visibility</span>
          </div>
          <div className="cc-clock">
            <p>{formatClock(now)}</p>
            <span>Brunei Standard Time</span>
          </div>
        </header>

        <section className="cc-meta-grid" aria-label="Metadata">
          <article><span>Date</span><strong>{formatDate(now)}</strong></article>
          <article><span>Time of update</span><strong>00:02 BST</strong></article>
          <article><span>Total positive (COVID)</span><strong>0</strong></article>
          <article><span>Previous total</span><strong>0</strong></article>
          <article><span>COVID RTD deaths</span><strong>0</strong></article>
        </section>

        <section className="cc-grid">
          <article className="cc-card cc-card-census">
            <PanelHeader number="1" title="24-hour total census" />
            <table className="cc-table cc-census-table">
              <thead>
                <tr><th>Ward / area</th><th>Total beds</th><th>Occupied</th><th>Vacant</th><th>Dirty</th><th>Blocked</th></tr>
              </thead>
              <tbody>
                {censusSections.map((section) => (
                  <Fragment key={section.label}>
                    <tr className="cc-section-row"><td colSpan={6}>{section.label}</td></tr>
                    {section.rows.map((row) => (
                      <tr key={`${section.label}-${row.ward}`}>
                        <td>{row.ward}</td><td>{row.beds}</td><td>{row.occupied}</td>
                        <td>{row.vacant}</td><td>{row.dirty}</td><td>{row.blocked}</td>
                      </tr>
                    ))}
                    {section.total ? (
                      <tr className="cc-total-row">
                        <td>{section.total.ward}</td><td>{section.total.beds}</td>
                        <td><ToneValue tone="danger">{section.total.occupied}</ToneValue></td>
                        <td><ToneValue tone="warn">{section.total.vacant}</ToneValue></td>
                        <td>{section.total.dirty}</td><td>{section.total.blocked}</td>
                      </tr>
                    ) : null}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </article>

          <article className="cc-card cc-card-occupancy">
            <PanelHeader number="2" title="Occupancy rate" />
            <div className="cc-occupancy-list">
              {occupancyRows.map((row) => (
                <div key={row.label} className="cc-occupancy-item">
                  <div className="cc-occupancy-label">
                    <span>{row.label}</span><strong>{row.beds}</strong>
                    <ToneValue tone={row.tone}>{row.rate}</ToneValue>
                  </div>
                  <div className="cc-progress-track">
                    <span className={`cc-progress-fill cc-progress-${row.tone}`} style={{ width: `${row.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="cc-panel-note">Midnight extract. Updates daily at 00:02.</p>
          </article>

          <article className="cc-card cc-card-vacant">
            <PanelHeader number="3" title="Total vacant beds" />
            <div className="cc-total-list">
              {vacantTotals.map((item) => (
                <div key={item.label}><span>{item.label}</span><ToneValue tone={item.tone}>{item.value}</ToneValue></div>
              ))}
              <div className="cc-grand-total"><span>Grand total</span><strong>207</strong></div>
            </div>
            <p className="cc-panel-note">Updated midnight from bed board extract.</p>
          </article>

          <article className="cc-card cc-card-isolation">
            <PanelHeader number="4" title="Isolation wards" />
            <table className="cc-table">
              <thead><tr><th>Ward</th><th>Occupant category</th><th>No. patients</th><th>Avail. beds</th></tr></thead>
              <tbody>
                {isolationRows.map((row) => (
                  <tr key={row.ward}><td>{row.ward}</td><td>{row.category}</td><td>{row.patients}</td><td>{row.beds}</td></tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className="cc-card cc-card-specialty">
            <PanelHeader number="5" title="Vacant beds by specialty" />
            <div className="cc-specialty-grid">
              {vacantSpecialties.map((item) => (
                <div key={item.label} className="cc-specialty-tile">
                  <span>{item.label}</span><ToneValue tone={item.tone}>{item.value}</ToneValue>
                </div>
              ))}
            </div>
            <p className="cc-legend">
              <span className="cc-legend-dot cc-danger-dot" /> critical
              <span className="cc-legend-dot cc-warn-dot" /> tight
              <span className="cc-legend-dot cc-success-dot" /> available
            </p>
          </article>

          <article className="cc-card cc-card-small cc-card-pending">
            <PanelHeader number="6" title="Pending ED" />
            <table className="cc-table cc-mini-table">
              <thead><tr><th>Zone</th><th>M</th><th>F</th><th>Total</th></tr></thead>
              <tbody>
                {pendingEdRows.map((row) => (
                  <tr key={row.zone}><td>{row.zone}</td><td>{row.male}</td><td>{row.female}</td><td>{row.total}</td></tr>
                ))}
                <tr className="cc-total-row"><td>Total</td><td>{pendingTotals.male}</td><td>{pendingTotals.female}</td><td>{pendingTotals.total}</td></tr>
              </tbody>
            </table>
          </article>

          <article className="cc-card cc-card-small cc-card-stepdown">
            <PanelHeader number="7" title="CCS step-down" />
            <table className="cc-table cc-mini-table">
              <thead><tr><th>Unit</th><th>Patients</th><th>Destination</th></tr></thead>
              <tbody>
                {stepDownRows.map((row) => (
                  <tr key={row.unit}><td>{row.unit}</td><td><ToneValue tone="success">{row.patients}</ToneValue></td><td>{row.destination}</td></tr>
                ))}
                <tr className="cc-total-row"><td colSpan={2}>Total step-down</td><td><ToneValue tone="success">4</ToneValue></td></tr>
              </tbody>
            </table>
          </article>

          <article className="cc-card cc-card-small cc-card-attendance">
            <PanelHeader number="8" title="24hr ED attendance" />
            <table className="cc-table cc-mini-table">
              <thead><tr><th>Priority</th><th>Adult</th><th>CE</th><th>Total</th></tr></thead>
              <tbody>
                {attendanceRows.map((row) => (
                  <tr key={row.priority}><td>{row.priority}</td><td>{row.adult}</td><td>{row.ce}</td><td>{row.total}</td></tr>
                ))}
                <tr className="cc-total-row"><td>Total</td><td>{attendanceTotals.adult}</td><td>{attendanceTotals.ce}</td><td>{attendanceTotals.total}</td></tr>
              </tbody>
            </table>
          </article>

          <article className="cc-card cc-card-small cc-card-outlier">
            <PanelHeader number="9" title="Total outlier" />
            <table className="cc-table cc-mini-table">
              <tbody>
                {outlierRows.map((row) => (
                  <tr key={row.service}><td>{row.service}</td><td><ToneValue tone={row.value === '-' ? 'muted' : 'warn'}>{row.value}</ToneValue></td></tr>
                ))}
                <tr className="cc-total-row"><td>Total</td><td><ToneValue tone="warn">10</ToneValue></td></tr>
              </tbody>
            </table>
          </article>

          <article className="cc-card cc-card-wide cc-card-anaesthesia">
            <PanelHeader number="10" title="In/cases · Anaesthesiology" />
            <table className="cc-table cc-mini-table">
              <thead><tr><th>Type</th><th>IP</th><th>Day</th><th>PN</th><th>ME</th><th>Total</th></tr></thead>
              <tbody>
                {anaesthesiaRows.map((row) => (
                  <tr key={row.type}><td>{row.type}</td><td>{row.ip}</td><td>{row.day}</td><td>{row.pn}</td><td>{row.me}</td><td>{row.total}</td></tr>
                ))}
                <tr className="cc-total-row"><td>Total</td><td>{anaesthesiaTotals.ip}</td><td>{anaesthesiaTotals.day}</td><td>{anaesthesiaTotals.pn}</td><td>{anaesthesiaTotals.me}</td><td>{anaesthesiaTotals.total}</td></tr>
              </tbody>
            </table>
          </article>

          <article className="cc-card cc-card-wide cc-card-psych">
            <PanelHeader number="11" title="Psychiatric / police case / mission" />
            <table className="cc-table cc-mini-table">
              <tbody>
                {psychiatricRows.map((row) => (
                  <tr key={row.label}><td>{row.label}</td><td><ToneValue tone="info">{row.value}</ToneValue></td></tr>
                ))}
              </tbody>
            </table>
            <p className="cc-panel-note">Values are illustrative for prototype review.</p>
          </article>

          <article className="cc-card cc-card-small cc-card-maintenance">
            <PanelHeader number="12" title="Maintenance issues" />
            <div className="cc-maintenance-list">
              {maintenanceRows.map((row) => (
                <div key={`${row.date}-${row.issue}`}><span>{row.date}</span><p>{row.issue}</p></div>
              ))}
              <button type="button" className="cc-link-button">+ Add issue</button>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
