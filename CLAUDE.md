# FLOW — CLAUDE.md
**Real-Time Operational Visibility Platform**
Version 1.0 | AMU Pilot
Team ChronoVue

---

## 1. Project Overview

FLOW is a real-time operational visibility platform developed by Team ChronoVue. It is designed specifically for nurse managers and Clinical Site Coordinators (CSCs) to replace the manual, fragmented process of managing patient movement and bed availability with a single centralised digital solution.

| Field | Detail |
|---|---|
| Platform name | FLOW |
| Developed by | Team ChronoVue |
| Primary users | Nurse managers, Clinical Site Coordinators (CSCs) |
| Pilot site | Acute Medical Unit (AMU) |
| Pilot status | Greenlit — championed by hospital CEO and Matron |
| Infrastructure | On-premise, hospital LAN (desktop-first) |
| Future model | SaaS licensing per hospital |
| Long-term goal | National expansion across Brunei's hospital network |

---

## 2. The Core Problem: Synthesis Cost

Nurse managers currently consolidate critical hospital data manually from four separate sources. This fragmentation creates a high "synthesis cost" — the information exists, but is not accessible in one place at the right time.

### The Four Manual Sources

| Source | What it contains | Problem |
|---|---|---|
| Paper census sheets | Patient headcount and ward occupancy | Static, not updated in real time |
| Excel files | Bed data, sometimes shift summaries | Manual entry, version conflicts |
| Whiteboards | Bed status, patient names, flags | Local to one ward, invisible to others |
| WhatsApp | Urgent transfer requests, coordination messages | Informal, untracked, no audit trail |

### Consequences

- **Delayed patient transfers and discharges** — no single view of where beds are available means transfer decisions are slow
- **Coordination bottlenecks** — CSCs cannot see cross-ward status without calling each ward individually
- **Cognitive overload and burnout** — nursing staff spend significant time assembling information rather than acting on it

---

## 3. The Platform Solution

FLOW provides a single live view of hospital operations, eliminating the manual assembly of data across the four sources.

### Core Features

**Real-time visualisation**
A desktop-based dashboard showing bed occupancy across all hospital wards. Ward status is represented visually as a capacity heatmap — analogous to a car park occupancy display — so CSCs can assess the whole hospital at a glance without calling individual wards.

**Admission and transfer tracking**
An admission queue for specific wards surfaces patients awaiting placement. Instant flags for transfer readiness allow CSCs to act immediately when a bed becomes available rather than waiting for a nurse manager to call.

**Automated census updates**
When a transfer is confirmed in FLOW, census sheets across the hospital update automatically. The system can also generate Excel reports for process evaluation and audit purposes, removing the manual reporting burden from nursing staff.

**EHR integration layer**
FLOW is designed to sit on top of existing Electronic Health Records (EHR) as a coordination layer, not a replacement.

- **Current state (v1):** Manual input by nurse managers and CSCs
- **Future state:** Automatic updates whenever a patient's status changes in the EHR (admitted, discharged, transferred) — FLOW reads EHR events and propagates them to the live dashboard with no manual action required

### What FLOW Is Not

- Not a replacement for the EHR — it is a coordination layer on top of it
- Not a clinical decision support tool — it surfaces operational state, not clinical recommendations
- Not a patient-facing product in its first version

---

## 4. System Architecture

FLOW is deployed on-premise on the hospital's internal LAN. All data stays within the hospital network. No internet egress is required for core operations.

### Architecture Layers

| Layer | Components | Notes |
|---|---|---|
| Ward input | Nurse manager terminals (desktop); mobile companion | Wired ethernet for critical terminals; Wi-Fi for mobile only |
| Hospital LAN | Internal network switch; wired ethernet backbone | All traffic on-premises; no cloud dependency |
| Application server | FLOW app; bed state engine; patient flow logic; auth + RBAC; audit log service | Primary + hot-standby backup in separate room |
| Database | Bed status; patient flow events; shift logs; user accounts; historical data | Automated scheduled backups; tested restore procedure required |
| Dashboard layer | Central dashboard (CSC); ward dashboard (nurse manager); mobile companion | Desktop-first; mobile is input companion, not full replica |
| EHR integration | Integration adapter reading patient status change events from EHR | Manual input in v1; automated EHR sync in future version |
| Governance | IT administration; manual fallback protocol; clinical governance + audit trails | All three domains require explicit ownership before go-live |

### Two-Layer Platform Design

A foundational architecture decision: bed management and patient flow are separated into two distinct functional layers sharing the same data infrastructure.

| Layer | Scope |
|---|---|
| Bed management | Real-time occupancy — beds available, occupied, blocked. Updated by nurse managers. Visualised as capacity heatmap. |
| Patient flow | Phase-based patient journey — admission, in-stay, discharge decision, actual departure. Surfaces bottlenecks between phases. |

**Rationale:** Bed management data is fast-changing and operationally critical. Patient flow data is slower but strategically important. Coupling them tightly creates design conflicts and deployment risk.

---

## 5. Users and Roles

| Role | Primary interface | Key capability |
|---|---|---|
| Nurse manager | Ward dashboard (desktop) | Update bed count and patient status for their ward; view admission queue; flag transfer readiness |
| Clinical Site Coordinator (CSC) | Central dashboard (desktop) | Full hospital bed state across all wards; act on transfer flags; oversee admission queue |
| Clinical staff (on the go) | Mobile companion app | On-the-go bed count input and phase updates without returning to a desktop terminal |
| IT administrator | Server admin console | Maintain server, manage backups, apply patches, monitor uptime |

Role-based access control (RBAC) is enforced at the application layer. Nurse managers see only their assigned ward by default. CSCs have hospital-wide read access. No role has write access outside their assigned scope.

---

## 6. Validation and Traction

### Validation Methods

- **Empathy mapping** — structured sessions with nurse managers to surface pain points in current workflows
- **Direct observation** — site walkabouts at AMU observing real bed management and coordination processes
- **Prototype testing** — nurse managers who tested the FLOW prototype preferred its visual clarity and user experience over incoming EHR system updates

### Institutional Support

- **Hospital CEO** — project champion at executive level
- **Matron** — clinical champion; critical for nursing staff adoption
- **AMU pilot** — formally greenlit; FLOW has institutional approval to run a paid pilot in the AMU

### User Preference Evidence

During prototype testing, nurse managers expressed a preference for FLOW's visual approach over the interface of incoming EHR updates. This is a significant signal: FLOW's value is not just in the data it shows, but in how it presents that data for fast operational decisions.

---

## 7. Business Model and Market Strategy

| Stage | Model | Description |
|---|---|---|
| Current | Paid pilot | AMU pilot — generates revenue and validates product-market fit in a live clinical setting |
| Next | SaaS licensing per hospital | Recurring license fee per hospital; scales with number of wards or beds |
| Long-term | National expansion | Rollout across Brunei's hospital network; potential regional expansion |

### Current Needs

Team ChronoVue is actively seeking:

- **Pilot partnerships** — additional hospital sites willing to run a paid pilot alongside or after the AMU deployment
- **EHR integration support** — technical partners or advisors with experience integrating with hospital EHR systems in the regional healthcare context
- **Healthcare IT procurement mentorship** — guidance on navigating hospital procurement pathways to reach the next milestone

---

## 8. Team ChronoVue

Team ChronoVue combines clinical credibility with technical execution — a rare combination in healthcare technology teams.

| Discipline | Role in FLOW |
|---|---|
| Computing | Platform architecture, backend development, EHR integration |
| Data analytics | Dashboard design, reporting, historical analysis |
| Nursing | Clinical workflow expertise, user testing, adoption |
| Public health | System-level thinking, population health context, national expansion strategy |

---

## 9. On-Premise Risk Register

| Risk | Impact | Mitigation |
|---|---|---|
| Primary server failure with no failover | Full system outage | Hot-standby backup server with auto failover in separate room |
| No manual fallback protocol | Nurses freeze when system is down | Document and drill manual fallback protocol before go-live |
| Data loss from no backup | Loss of patient flow history and audit trail | Automated scheduled backups; tested restore procedure |
| Network switch failure | All wards lose connectivity | Monitor switch health proactively; document fallback |
| Wi-Fi dead zones | Mobile companion unusable in parts of AMU | Wi-Fi coverage audit before deploying mobile app |
| No assigned IT owner | Server becomes unmaintained; reliability risk | Assign IT admin owner and SLA before deployment |
| Physical server room hazards | Hardware damage, unauthorised access | Locked room, UPS, fire suppression, access log |
| Unauthorised LAN access | Internal data breach | RBAC, strong authentication, immutable audit logs |

---

## 10. Open Decisions

> **ACTION REQUIRED — resolve before go-live**

- **IT ownership** — who owns server administration, hospital IT or Team ChronoVue? Define SLA and escalation path.
- **Server room** — confirm physical location, locked access, UPS, and fire suppression.
- **Maintenance windows** — when can the system go down for patching without disrupting shift handover?
- **Hardware specification** — overprovision from day one for eventual multi-ward load. Define spec before procurement.
- **Manual fallback protocol** — what do nurses do when FLOW is offline? Must be documented and drilled before go-live.
- **EHR integration scope for pilot** — clarify whether v1 is manual-input only or includes a partial EHR read integration.
- **RFID bed sensing** — confirm whether RFID-based occupancy detection is in scope for AMU pilot or a later phase.
- **Wi-Fi coverage audit** — conduct before deploying mobile companion to identify dead zones in AMU.

---

## 11. Expansion Roadmap

| Phase | Scope | Prerequisite |
|---|---|---|
| Phase 1 — AMU pilot | Full FLOW deployment: ward terminal, ward dashboard, central dashboard, mobile companion. Manual input. Paid pilot. | Site observation synthesis; sign-off from stakeholders and Matron |
| Phase 2 — EHR integration | Automated updates from EHR patient status events. Removes manual input burden. | AMU pilot live and stable (min. 1 month); EHR API access confirmed |
| Phase 3 — Ward expansion | Expand to ICU and general wards. Reuse server infrastructure. | Successful AMU deployment; server capacity review |
| Phase 4 — SaaS rollout | License FLOW to additional hospitals. Per-hospital SaaS model. National expansion. | Validated AMU and ward expansion; procurement pathway established |
| Phase 5 — Patient-facing app | Separate patient/carer app showing phase transparency, reducing carer uncertainty. | Phase 1 complete; patient flow data validated in production |

---

*FLOW — CLAUDE.md v1.0*
*Living document — update after each stakeholder session*
