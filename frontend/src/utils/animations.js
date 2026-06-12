import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function setupScrollReveal() {
  if (typeof window === 'undefined') return () => {};

  const triggers = [];

  // Stagger containers — animate children together as a group
  document.querySelectorAll('[data-stagger]').forEach((container) => {
    const children = Array.from(container.querySelectorAll('[data-reveal]'));
    if (!children.length) return;

    const anim = gsap.from(children, {
      opacity: 0,
      y: 22,
      duration: 0.65,
      ease: 'power3.out',
      stagger: 0.075,
      scrollTrigger: {
        trigger: container,
        start: 'top 93%',
      },
    });
    if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
  });

  // Solo reveal elements (not inside a stagger container)
  document.querySelectorAll('[data-reveal]:not([data-stagger] [data-reveal])').forEach((el) => {
    const anim = gsap.from(el, {
      opacity: 0,
      y: 22,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 93%',
      },
    });
    if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
  });

  return () => triggers.forEach((st) => st?.kill());
}

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
