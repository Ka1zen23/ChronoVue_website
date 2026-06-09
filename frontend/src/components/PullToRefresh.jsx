import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

const THRESHOLD = 80; // px of pull needed to trigger refresh

export default function PullToRefresh() {
  const containerRef = useRef(null);
  const logoWrapRef = useRef(null);
  const pull = useRef({ startY: 0, active: false, triggered: false, rotation: 0, progress: 0 });

  useEffect(() => {
    const el = containerRef.current;
    const wrap = logoWrapRef.current;

    function onTouchStart(e) {
      if (window.scrollY > 0) return;
      const p = pull.current;
      p.startY = e.touches[0].clientY;
      p.active = true;
      p.triggered = false;
      p.rotation = 0;
      p.progress = 0;
    }

    function onTouchMove(e) {
      const p = pull.current;
      if (!p.active) return;
      if (window.scrollY > 0) { p.active = false; return; }

      const dy = e.touches[0].clientY - p.startY;
      if (dy <= 0) return;

      // Prevent native PTR and rubber-band scroll
      if (e.cancelable) e.preventDefault();

      p.progress = Math.min(dy / THRESHOLD, 1);
      p.rotation = -360 * p.progress; // anti-clockwise

      // Indicator slides in from top as user pulls
      const translateY = -68 + 68 * p.progress;
      el.style.opacity = String(p.progress);
      el.style.transform = `translateY(${translateY}px)`;
      wrap.style.transform = `rotate(${p.rotation}deg)`;

      if (p.progress >= 1 && !p.triggered) {
        p.triggered = true;
        // Brief pulse on logo to signal "release to refresh"
        wrap.style.transform = `rotate(${p.rotation}deg) scale(1.15)`;
        setTimeout(() => {
          if (!p.active) return; // already released
          wrap.style.transform = `rotate(${p.rotation}deg) scale(1)`;
        }, 150);
      }
    }

    function onRelease() {
      const p = pull.current;
      if (!p.active) return;
      p.active = false;

      if (p.triggered) {
        // Two extra full anti-clockwise spins then reload
        animate(wrap, {
          rotate: { from: p.rotation, to: p.rotation - 720 },
          duration: 600,
          ease: 'inOutCubic',
          onComplete: () => window.location.reload(),
        });
      } else {
        // Spring back
        animate(el, {
          translateY: { from: -68 + 68 * p.progress, to: -68 },
          opacity: { from: p.progress, to: 0 },
          duration: 350,
          ease: 'outCubic',
        });
        animate(wrap, {
          rotate: { from: p.rotation, to: 0 },
          duration: 350,
          ease: 'outCubic',
        });
      }
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onRelease, { passive: true });
    document.addEventListener('touchcancel', onRelease, { passive: true });

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onRelease);
      document.removeEventListener('touchcancel', onRelease);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: 68,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0,
        transform: 'translateY(-68px)',
        pointerEvents: 'none',
      }}
    >
      {/* Frosted pill */}
      <div
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '50%',
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
        }}
      >
        <div ref={logoWrapRef} style={{ width: 26, height: 26, display: 'flex' }}>
          <img
            src="/assets/logo.svg"
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
