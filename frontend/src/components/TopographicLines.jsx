// Animated topographic lines — web port of the React Native original.
// Two line bundles (hourglass river left + sweeping fan right) running on a
// 28-second GSAP loop. Scrolling pans a viewBox window through a 1800px-tall
// virtual canvas, giving a genuine "flowing landscape" parallax effect.
// Direct SVG attribute mutation — zero React re-renders per frame.

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const N_LEFT   = 12;
const N_RIGHT  = 10;
const CYCLE_MS = 28000;
const TWO_PI   = Math.PI * 2;
const W        = 1440;
const H        = 1800;   // tall virtual canvas — viewBox pans through this
const VIEW_H   = 900;    // visible window height (one viewport)
const MAX_PAN  = H - VIEW_H; // 900 — total vertical pan range

// ── path builders ─────────────────────────────────────────────────────────────

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

// Hourglass river — pinches at centre, fans at top/bottom
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

// Sweeping fan — enters from off-screen upper-right
function buildRight(idx, t) {
  const frac = idx / 9;
  const xs = [], ys = [];
  for (let j = 0; j <= 10; j++) {
    const ns     = j / 10;
    const startX = W * (0.62 + frac * 0.26);
    const startY = H * (-0.04 + frac * 0.03);
    const dx     = -ns * W * (0.07 + frac * 0.04 + 0.012 * Math.sin(t));
    const dy     =  ns * H * 0.56;
    const curve  = W * 0.025 * Math.sin(ns * Math.PI * 1.6 + t * 0.5 + idx * 0.38);
    xs.push(startX + dx + curve);
    ys.push(startY + dy);
  }
  return makePath(xs, ys, 10);
}

// ── component ─────────────────────────────────────────────────────────────────
export default function TopographicLines({ className = '' }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const leftPaths  = Array.from(svg.querySelectorAll('[data-topo="left"]'));
    const rightPaths = Array.from(svg.querySelectorAll('[data-topo="right"]'));
    const t0 = performance.now();

    // Render frame 0 immediately — no blank flash
    for (let i = 0; i < leftPaths.length;  i++) leftPaths[i].setAttribute('d',  buildLeft(i,  0));
    for (let i = 0; i < rightPaths.length; i++) rightPaths[i].setAttribute('d', buildRight(i, 0));

    const tick = () => {
      // 28-second continuous animation loop
      const t = ((performance.now() - t0) / CYCLE_MS) * TWO_PI % TWO_PI;

      // Scroll → pan viewBox directly (0.4× scroll speed feels responsive)
      const viewBoxY = Math.min(window.scrollY * 0.4, MAX_PAN);
      svg.setAttribute('viewBox', `0 ${viewBoxY.toFixed(1)} ${W} ${VIEW_H}`);

      for (let i = 0; i < leftPaths.length;  i++) leftPaths[i].setAttribute('d',  buildLeft(i,  t));
      for (let i = 0; i < rightPaths.length; i++) rightPaths[i].setAttribute('d', buildRight(i, t));
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`topo-svg absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox={`0 0 ${W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {Array.from({ length: N_LEFT }, (_, i) => (
        <path
          key={`l${i}`}
          data-topo="left"
          fill="none"
          stroke="#8AA68D"
          strokeWidth="1.25"
          strokeOpacity="0.7"
        />
      ))}
      {Array.from({ length: N_RIGHT }, (_, i) => (
        <path
          key={`r${i}`}
          data-topo="right"
          fill="none"
          stroke="#8AA68D"
          strokeWidth="1.25"
          strokeOpacity="0.7"
        />
      ))}
    </svg>
  );
}
