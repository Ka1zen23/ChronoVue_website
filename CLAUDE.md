# ChronoVue

## Company Overview

ChronoVue is a technology company focused on building operational intelligence platforms that help organizations gain real-time visibility, improve coordination, and make faster, data-driven decisions.

We specialize in transforming fragmented operational processes into unified digital control towers, enabling organizations to move from reactive management to proactive operations.

Our solutions combine operational workflows, analytics, automation, and AI to create a single source of truth for complex environments.

---

## What We Do

ChronoVue designs and develops custom operational platforms that provide:

* Real-time operational visibility
* Workflow orchestration
* Resource management
* Capacity monitoring
* Process optimization
* Predictive analytics
* AI-assisted decision support
* Executive command centre dashboards

Rather than simply digitizing existing forms and spreadsheets, ChronoVue focuses on creating systems that allow organizations to understand, coordinate, and optimize their entire operation from a single platform.

---

## Core Capabilities

### Operational Control Towers

Command-centre style platforms that provide live situational awareness across multiple departments, teams, facilities, or business units.

### Workflow Digitization

Transforming manual and paper-based workflows into structured digital processes with auditability, accountability, and automation.

### Resource & Capacity Management

Monitoring and optimizing the utilization of critical resources such as beds, equipment, staff, rooms, vehicles, or operational assets.

### Process Intelligence

Identifying bottlenecks, delays, inefficiencies, and operational risks through analytics and real-time monitoring.

### Data Consolidation

Integrating information from multiple systems into a unified operational view that supports decision-making at every level of the organization.

### AI & Predictive Operations

Leveraging machine learning and local AI models to forecast demand, identify risks, recommend actions, and support operational planning.

---

## Industries

ChronoVue develops solutions across industries where operational visibility and coordination are critical, including:

### Healthcare

Hospital operations, patient flow, capacity management, discharge coordination, staffing visibility, and command-centre systems.

### Government & Public Sector

Operational dashboards, resource management, service delivery monitoring, and inter-department coordination platforms.

### Logistics & Transportation

Fleet visibility, asset utilization, operational monitoring, and control tower solutions.

### Facilities & Infrastructure

Asset tracking, maintenance coordination, occupancy monitoring, and operational performance management.

### Enterprise Operations

Workflow orchestration, operational intelligence, and executive visibility platforms for large organizations.

---

## Flagship Solution: FLOW

FLOW is ChronoVue's hospital operations control tower platform.

FLOW provides:

* Hospital-wide capacity management
* Bed management
* Patient flow visibility
* Transfer coordination
* Discharge management
* Staffing visibility
* Operational alerts
* Executive command-centre dashboards
* Future AI-powered forecasting and optimization

FLOW is designed to serve as the operational control tower for hospitals, providing a single source of truth for patient flow and capacity management.

---

## Vision

To build intelligent operational platforms that help organizations see the complete picture, coordinate effectively, and make better decisions in real time.

ChronoVue's goal is to become a leader in operational intelligence systems that connect people, processes, and data into actionable operational insight.

---

## Development & Build Commands

All commands run from within `frontend/` or `backend/` unless otherwise noted.

### Frontend

```bash
cd frontend
npm run dev        # Vite dev server (hot reload, proxies /api → localhost:3000)
npm run build      # Static site generation via vite-react-ssg → dist/
npm run preview    # Preview the SSG build locally
```

### Backend

```bash
cd backend
npm run dev        # Node.js with --watch (auto-restart on file change)
npm start          # Production start (node src/index.js)
```

### Docker (full stack)

```bash
docker compose up --build   # Build and start all services
docker compose up -d        # Start in background
docker compose down         # Stop and remove containers
```

Services: `nginx` (port 80) → `frontend` (static) + `backend` (port 3000) + `postgres` (16-alpine).

### Dev proxy

Vite proxies `/api` → `http://localhost:3000` during local development, so `fetch('/api/...')` works without specifying a host. No `VITE_API_URL` needed for local work.

---

## Core Architecture & Tech Stack

### Frontend

| Layer | Technology |
|---|---|
| Framework | React 18 (JSX) |
| Routing | React Router DOM v6 |
| Build / SSG | Vite + vite-react-ssg |
| Styling | Tailwind CSS v3 |
| Animation | Anime.js v4 |
| SEO | react-helmet-async |

**Entry point:** `frontend/src/main.jsx` — exports `createRoot` via `ViteReactSSG` with two routes:

| Path | Component |
|---|---|
| `/` | `App.jsx` (marketing homepage) |
| `/flow` | `pages/FlowPage.jsx` (FLOW product page) |

`HelmetProvider` wraps the entire route tree for SSG-compatible `<head>` management.

**Directory layout:**

```
frontend/src/
├── App.jsx              Homepage shell — composes marketing sections
├── main.jsx             SSG root + route definitions
├── index.css            Global base styles
├── components/          All UI components (marketing + FLOW demo)
├── pages/               Full-page route components
├── context/             React context providers
├── data/                Static data / constants
├── demo/                Demo / prototype components
├── hooks/               Custom React hooks
└── utils/               Animations, helpers
```

### Backend

Node.js + Express on port 3000. Source lives entirely in `backend/src/index.js`. Uses `pg` driver against PostgreSQL 16. `helmet` and `cors` are applied at the top level.

### Infrastructure

Docker Compose orchestrates four containers: `nginx`, `frontend`, `backend`, `postgres`. Nginx is the only public entry point (port 80) — it serves the static frontend build and proxies `/api/` to the backend container. The database is internal-only.

---

## Code Style & Standards

### General

- All frontend source is `.jsx` (not `.tsx`). No TypeScript in this repo.
- ES modules throughout (`"type": "module"` in both `package.json` files).
- No linter or formatter is configured — keep code clean by convention.
- No comments unless the WHY is genuinely non-obvious.

### Tailwind

Use the custom brand tokens defined in `tailwind.config.js` — do not use raw hex values inline:

| Token | Value | Use |
|---|---|---|
| `brand-blue` | `#0066CC` | Primary CTA, links, highlights |
| `brand-blue-dk` | `#004FA3` | Hover states, dark accents |
| `brand-blue-lt` | `#E8F2FF` | Subtle backgrounds |
| `brand-teal` | `#00B4D8` | Secondary accent |
| `brand-green` | `#06D6A0` | Success, positive indicators |
| `brand-navy` | `#0A1628` | Dark backgrounds, hero sections |
| `brand-navy-mid` | `#1A2B4B` | Mid-dark surfaces |

Font families: `font-sans` (Inter), `font-display` (Sora), `font-mono` (JetBrains Mono). Use `font-display` for hero headlines and section titles.

### Animations

All animation logic lives in `frontend/src/utils/animations.js`. Three utilities are exported:

- `setupScrollReveal()` — IntersectionObserver that animates any element with `data-reveal`. Group elements with `data-stagger` on a parent for staggered entrance.
- `setupNavBehaviour()` — hides/shows `#main-nav` on scroll direction.
- `setupMagneticButtons()` — applies magnetic cursor effect to `[data-magnetic]` elements.

Call all three from a `useEffect` with a 60ms `setTimeout` (SSG hydration guard), and return their cleanup functions. See `App.jsx` for the canonical pattern.

For component-level animation, import directly from `animejs`:

```javascript
import { animate, stagger, cubicBezier, spring } from 'animejs';
```

Do not use CSS `transition`/`animation` for anything Anime.js already handles.

### SSG compatibility

- Never access `window`, `document`, or browser APIs at module scope — guard with `if (typeof window === 'undefined') return;`.
- All animation setup must happen inside `useEffect` (client-only).
- `react-helmet-async` (not `react-helmet`) is required for SSG-safe `<head>` injection.

### Routing

Add new top-level pages to the `routes` array in `main.jsx`. Components go in `src/pages/`. Marketing sections that compose into a page go in `src/components/`.

---

## Narrative & Visual Focus (ChronoVue Context)

This repository is ChronoVue's **marketing and product website** — not the FLOW application itself. The design language and copy must reflect ChronoVue's positioning as a high-calibre operational intelligence company.

### Tone

- Confident and precise. No filler phrases ("harness the power of", "leverage synergies").
- Speak to decision-makers in complex operational environments — hospital matrons, operations directors, CSCs.
- Lead with outcomes: time saved, decisions improved, coordination unblocked.
- Brunei-aware: the first market is RIPAS Hospital, Brunei. Avoid language that implies a generic global SaaS.

### Visual Language

- Dark navy (`brand-navy`) backgrounds for hero and command-centre sections — conveys control and trust.
- Teal and green accents for live/active indicators and positive metrics.
- `font-display` (Sora) for all headlines. Tight letter-spacing (`tracking-tightest` or `tracking-tighter`) on large display text.
- Scroll-reveal animations on every content section via `data-reveal` / `data-stagger` — nothing appears static on load.
- Dashboard previews and product screenshots should look real, not illustrative. Use live-coded React components (see `DashboardPreview.jsx`, `FlowSnippets.jsx`) rather than mockup images.

### Key Sections (homepage)

| Component | Purpose |
|---|---|
| `Hero` | Primary headline + CTA — ChronoVue value proposition |
| `AboutUs` | Company story and mission |
| `FlowTeaser` | FLOW product introduction — leads to `/flow` |
| `Team` | Founders and advisors |
| `Contact` | Lead capture / get in touch |

The `/flow` route (`FlowPage.jsx`) is a dedicated product page for FLOW. It can include live demo components, feature breakdowns, and social proof.

### What to avoid

- Do not use placeholder copy ("Lorem ipsum", "Coming soon") in committed code.
- Do not add decorative illustrations or stock photography — the visual story is told through real product UI and data.
- Do not introduce new colour values outside the brand token set without updating `tailwind.config.js`.
- Do not add page sections that have no direct connection to ChronoVue's positioning or FLOW's features.
