// Web port of the React Native animated topographic background.
// Renders two bundles of smooth bezier lines driven by a 28-second GSAP loop.
// Scroll-based time offset makes lines subtly morph as the page is scrolled.
// Uses direct SVG attribute mutation — zero React re-renders per frame.
//
// LEFT  bundle (N_LEFT=12)  — hourglass river, left ~35% of viewport
// RIGHT bundle (N_RIGHT=10) — sweeping fan from upper-right corner
//
// Intended use: one instance with `position:fixed; inset:0; z-index:-1` in App.jsx
// behind all page content.  Pass dark=true for navy-bg sections.
//
//   <TopographicLines />        ← light (cream bg context)
//   <TopographicLines dark />   ← dark (navy bg context)

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// ── config ────────────────────────────────────────────────────────────────────
const N_LEFT   = 12;
const N_RIGHT  = 10;
const CYCLE_MS = 28000;
const TWO_PI   = Math.PI * 2;
// Reference viewport — SVG viewBox; slice-fills whatever container it's in
const W = 1440;
const H = 900;

// ── helpers ───────────────────────────────────────────────────────────────────

function makePath(xs, ys, n) {
  let d = `M ${xs[0].toFixed(1)} ${ys[0].toFixed(1)}`;
  for (let i = 0; i <= n - 2; i++) {
    const mx = (xs[i + 1] + xs[i + 2]) * 0.5;
    const my = (ys[i + 1] + ys[i + 2]) * 0.5;
    d += ` Q ${xs[i + 1].toFixed(1)} ${ys[i + 1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  d += ` L ${xs[n].toFixed(1)} ${ys[n].toFixed(1)}`;
  return d;
}

// Hourglass river — pinches at vertical centre, fans at top/bottom edges
function buildLeft(idx, t) {
  const frac = idx / 11 - 0.5;
  const xs = [], ys = [];
  for (let j = 0; j <= 10; j++) {
    const ny   = j / 10;
    const dist = Math.abs(ny - 0.5) * 2;
    const wf   = 0.28 + 0.72 * (dist * dist);
    const cx   = W * (
      0.14
      + 0.065 * Math.sin(ny * Math.PI * 1.7 + t)
      + 0.020 * Math.sin(ny * Math.PI * 3.1 + 2 * t)
    );
    xs.push(cx + frac * 2 * W * 0.195 * wf);
    ys.push(ny * H);
  }
  return makePath(xs, ys, 10);
}

// Sweeping fan — enters from off-screen upper-right, arcs downward
function buildRight(idx, t) {
  const frac = idx / 9;
  const xs = [], ys = [];
  for (let j = 0; j <= 10; j++) {
    const ns     = j / 10;
    const startX = W * (0.57 + frac * 0.47);
    const startY = H * (-0.07 + frac * 0.05);
    const dx     = -ns * W * (0.07 + frac * 0.04 + 0.012 * Math.sin(t));
    const dy     =  ns * H * 0.56;
    const curve  = W * 0.025 * Math.sin(ns * Math.PI * 1.6 + t * 0.5 + idx * 0.38);
    xs.push(startX + dx + curve);
    ys.push(startY + dy);
  }
  return makePath(xs, ys, 10);
}

// ── component ─────────────────────────────────────────────────────────────────
export default function TopographicLines({ dark = false, className = '' }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const leftPaths  = Array.from(svg.querySelectorAll('[data-topo="left"]'));
    const rightPaths = Array.from(svg.querySelectorAll('[data-topo="right"]'));
    const t0 = performance.now();

    // Render initial frame immediately (avoids blank-frame flash)
    for (let i = 0; i < leftPaths.length;  i++) leftPaths[i].setAttribute('d',  buildLeft(i,  0));
    for (let i = 0; i < rightPaths.length; i++) rightPaths[i].setAttribute('d', buildRight(i, 0));

    const tick = () => {
      // Base 28-second animation loop
      const loopT  = ((performance.now() - t0) / CYCLE_MS) * TWO_PI;
      // Scroll adds a slow time offset — scrolling 8000px = one full morphing cycle
      const scrollT = (window.scrollY / 8000) * TWO_PI;
      const t = (loopT + scrollT) % TWO_PI;

      for (let i = 0; i < leftPaths.length;  i++) leftPaths[i].setAttribute('d',  buildLeft(i,  t));
      for (let i = 0; i < rightPaths.length; i++) rightPaths[i].setAttribute('d', buildRight(i, t));
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  const stroke  = '#8AA68D';
  const opacity = dark ? 0.28 : 0.42;

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {Array.from({ length: N_LEFT }, (_, i) => (
        <path key={`l${i}`} data-topo="left"  fill="none" stroke={stroke} strokeWidth="1" strokeOpacity={opacity} />
      ))}
      {Array.from({ length: N_RIGHT }, (_, i) => (
        <path key={`r${i}`} data-topo="right" fill="none" stroke={stroke} strokeWidth="1" strokeOpacity={opacity} />
      ))}
    </svg>
  );
}
