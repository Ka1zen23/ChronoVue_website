import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FROM    = { opacity: 0, y: 22 };
const TO_BASE = { opacity: 1, y: 0, ease: 'power3.out' };

// ─── Hero entrance ──────────────────────────────────────────────────────────
// Runs on page load (not scroll-triggered). Sequences all [data-reveal] and
// [data-stagger] children inside [data-hero] in DOM order.
export function setupHeroEntrance() {
  if (typeof window === 'undefined') return () => {};

  const hero = document.querySelector('[data-hero]');
  if (!hero) return () => {};

  // Collect all hero items in DOM order, expanding stagger containers
  const items = [];
  hero
    .querySelectorAll('[data-reveal]:not([data-stagger] [data-reveal]), [data-stagger]')
    .forEach((el) => {
      if (el.hasAttribute('data-stagger')) {
        items.push(...Array.from(el.querySelectorAll('[data-reveal]')));
      } else {
        items.push(el);
      }
    });

  const tl = gsap.timeline({ delay: 0.15 });
  items.forEach((el, i) => {
    tl.fromTo(el, FROM, { ...TO_BASE, duration: 0.7 }, i * 0.08);
  });

  return () => tl.kill();
}

// ─── Scroll reveal ───────────────────────────────────────────────────────────
// Handles all [data-reveal] / [data-stagger] elements outside [data-hero],
// connector line draw animations, and blob parallax.
export function setupScrollReveal() {
  if (typeof window === 'undefined') return () => {};

  const hero = document.querySelector('[data-hero]');
  const triggers = [];

  // Stagger containers
  document.querySelectorAll('[data-stagger]').forEach((container) => {
    if (hero && hero.contains(container)) return;

    const children = Array.from(container.querySelectorAll('[data-reveal]'));
    if (!children.length) return;

    const anim = gsap.fromTo(children, FROM, {
      ...TO_BASE,
      duration: 0.65,
      stagger: 0.075,
      scrollTrigger: { trigger: container, start: 'top 93%' },
    });
    if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);

    // Connector line draw (HowItWorks step connectors)
    const connectors = Array.from(container.querySelectorAll('[data-connector]'));
    if (connectors.length) {
      gsap.set(connectors, { scaleX: 0, transformOrigin: 'left center' });
      const connAnim = gsap.to(connectors, {
        scaleX: 1,
        duration: 0.45,
        ease: 'power2.inOut',
        stagger: 0.12,
        scrollTrigger: { trigger: container, start: 'top 88%' },
      });
      if (connAnim.scrollTrigger) triggers.push(connAnim.scrollTrigger);
    }
  });

  // Solo reveal elements
  document.querySelectorAll('[data-reveal]:not([data-stagger] [data-reveal])').forEach((el) => {
    if (hero && hero.contains(el)) return;

    const anim = gsap.fromTo(el, FROM, {
      ...TO_BASE,
      duration: 0.65,
      scrollTrigger: { trigger: el, start: 'top 93%' },
    });
    if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
  });

  // Blob parallax — opposite-direction drift as section scrolls through viewport
  document.querySelectorAll('[data-parallax-blob]').forEach((blob) => {
    const anim = gsap.to(blob, {
      y: blob.dataset.parallaxBlob === 'reverse' ? 80 : -80,
      ease: 'none',
      scrollTrigger: {
        trigger: blob.closest('section') || blob.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
  });

  return () => triggers.forEach((st) => st?.kill());
}

// ─── Nav behaviour ───────────────────────────────────────────────────────────
export function setupNavBehaviour() {
  if (typeof window === 'undefined') return () => {};

  const nav = document.getElementById('main-nav');
  if (!nav) return () => {};

  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;

    if (y > 12) nav.setAttribute('data-scrolled', '');
    else nav.removeAttribute('data-scrolled');

    if (y > 120 && y > lastY) {
      gsap.to(nav, { yPercent: -100, duration: 0.35, ease: 'power2.inOut', overwrite: true });
    } else {
      gsap.to(nav, { yPercent: 0, duration: 0.35, ease: 'power2.inOut', overwrite: true });
    }

    lastY = y;
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', onScroll);
    gsap.killTweensOf(nav);
  };
}

// ─── Magnetic buttons ────────────────────────────────────────────────────────
export function setupMagneticButtons() {
  if (typeof window === 'undefined') return () => {};

  const cleanups = [];

  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    const strength = parseFloat(btn.dataset.magnetic) || 0.3;

    const onMove = (e) => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - r.left - r.width / 2) * strength,
        y: (e.clientY - r.top - r.height / 2) * strength,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)', overwrite: true });
    };

    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);

    cleanups.push(() => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(btn);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
