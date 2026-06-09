import { animate, stagger, cubicBezier, spring } from 'animejs';

const REVEAL_EASE = cubicBezier(0.22, 1, 0.36, 1);

export function setupScrollReveal() {
  if (typeof window === 'undefined') return;

  const animated = new WeakSet();

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (animated.has(el)) return;

        const staggerParent = el.closest('[data-stagger]');

        if (staggerParent && !animated.has(staggerParent)) {
          animated.add(staggerParent);
          const children = Array.from(staggerParent.querySelectorAll('[data-reveal]'));
          children.forEach(child => {
            animated.add(child);
            io.unobserve(child);
          });
          animate(children, {
            opacity: { from: 0, to: 1 },
            translateY: { from: 22, to: 0 },
            duration: 700,
            delay: stagger(80),
            ease: REVEAL_EASE,
          });
        } else if (!staggerParent) {
          animated.add(el);
          io.unobserve(el);
          animate(el, {
            opacity: { from: 0, to: 1 },
            translateY: { from: 22, to: 0 },
            duration: 700,
            ease: REVEAL_EASE,
          });
        }
      });
    },
    { threshold: 0.07, rootMargin: '0px 0px -48px 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

  return () => io.disconnect();
}

export function setupNavBehaviour() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    if (y > 12) nav.setAttribute('data-scrolled', '');
    else nav.removeAttribute('data-scrolled');
    if (y > lastY && y > 120) nav.setAttribute('data-hidden', '');
    else nav.removeAttribute('data-hidden');
    lastY = y;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}

export function setupMagneticButtons() {
  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    const strength = parseFloat(btn.dataset.magnetic) || 0.3;
    const springEase = spring({ bounce: 0.4, duration: 500 });

    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      animate(btn, { translateX: x, translateY: y, ease: springEase, duration: 400 });
    });

    btn.addEventListener('mouseleave', () => {
      animate(btn, { translateX: 0, translateY: 0, ease: spring({ bounce: 0.3, duration: 600 }), duration: 600 });
    });
  });
}
