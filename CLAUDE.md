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
npm run dev        # Astro dev server (hot reload, proxies /api → localhost:3000)
npm run build      # Static site generation via Astro → dist/
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

Astro proxies `/api` → `http://localhost:3000` during local development (configured in `astro.config.mjs` via `vite.server.proxy`), so `fetch('/api/...')` works without specifying a host.

---

## Core Architecture & Tech Stack

### Frontend

| Layer | Technology |
|---|---|
| Framework | Astro (SSG) + React 18 (JSX) |
| Routing | Astro file-based routing |
| Build / SSG | Astro → `dist/` |
| Styling | Tailwind CSS v3 (PostCSS plugin) |
| Animation | GSAP v3 + ScrollTrigger |
| Head management | Astro layout (`BaseLayout.astro`) |

**Pages** — file-based routes in `src/pages/`:

| File | Route | Notes |
|---|---|---|
| `index.astro` | `/` | Marketing homepage |
| `flow.astro` | `/flow` | FLOW product page |

**Hydration strategy** — Astro renders React components to static HTML by default. Client JS is only shipped for components that need it:

| Directive | Used for |
|---|---|
| `client:load` | `Navbar`, `Contact` (immediate interactivity) |
| `client:visible` | `Team` (hydrates when scrolled into view) |
| `client:only="react"` | `PullToRefresh` (DOM-only, no SSR) |
| _(none)_ | All other components — static HTML, zero JS |

**Animation setup** lives in `src/layouts/BaseLayout.astro` as a `<script>` tag. It imports from `src/utils/animations.js` and runs all four setup functions with a 60ms delay after every page load. React components do **not** call these — they only add `data-reveal`, `data-stagger`, `data-magnetic` attributes to their markup.

**Directory layout:**

```
frontend/src/
├── layouts/
│   └── BaseLayout.astro     HTML shell, head, global animation script
├── pages/
│   ├── index.astro          Homepage route
│   └── flow.astro           FLOW product route
├── App.jsx                  Homepage section composition (used by index.astro)
├── index.css                Global base styles + Tailwind directives
├── components/              All React UI components
├── context/                 React context providers
├── data/                    Static data / constants
├── demo/                    Demo / prototype components
├── hooks/                   Custom React hooks
└── utils/                   animations.js and helpers
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

All animation logic lives in `frontend/src/utils/animations.js` and uses GSAP + ScrollTrigger. Four functions are exported:

- `setupHeroEntrance()` — GSAP timeline for `[data-hero]` elements on page load.
- `setupScrollReveal()` — GSAP ScrollTrigger for `[data-reveal]` / `[data-stagger]` elements.
- `setupNavBehaviour()` — GSAP hide/show for `#main-nav` on scroll direction.
- `setupMagneticButtons()` — GSAP magnetic cursor effect for `[data-magnetic]` elements.

All four are called automatically by the `<script>` tag in `BaseLayout.astro` with a 60ms delay. **Do not call them from React `useEffect`.** React components only add the data attributes to their markup — the global script handles the rest.

For component-level GSAP animation (e.g. inside a `client:load` component), import directly:

```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
```

Do not use CSS `transition`/`animation` for anything GSAP already handles.

### SSG compatibility

- Never access `window`, `document`, or browser APIs at module scope in React components — guard with `if (typeof window === 'undefined') return;`.
- Head tags (`<title>`, `<meta>`) go in the `.astro` page file or `BaseLayout.astro` props — never use `react-helmet-async`.
- Animation setup runs in `BaseLayout.astro`'s `<script>` tag (client-only by definition).

### Routing

Add new top-level pages as `.astro` files in `src/pages/`. React components that compose a page go in `src/components/`. The Astro page imports them and applies `client:*` directives only where interactivity is needed.

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
