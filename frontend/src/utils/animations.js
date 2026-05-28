export function setupScrollReveal() {
  if (typeof window === 'undefined') return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-visible', '');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.07, rootMargin: '0px 0px -48px 0px' }
  );

  // Auto-stagger children in stagger containers before observing
  document.querySelectorAll('[data-stagger]').forEach((container) => {
    container.querySelectorAll('[data-reveal]').forEach((el, i) => {
      el.style.transitionDelay = `${i * 75}ms`;
    });
  });

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

    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}
