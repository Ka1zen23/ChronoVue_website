/* ============================================
   CEKAP — Website Interactivity
   ============================================ */

// ---------- Navigation ----------
const nav = document.getElementById('nav');
const navBurger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

navBurger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  navBurger.classList.toggle('open');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navBurger.classList.remove('open');
  });
});

// ---------- Scroll Reveal ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.feature-card, .step, .testimonial-card, .pricing-card, .impact-stat, .trust-badge'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ---------- Stat Counter ----------
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.impact-stat__value[data-target]').forEach(el => {
  statObserver.observe(el);
});

// ---------- Bed Status Animation ----------
const beds = document.querySelectorAll('.bed');
const statusCycle = ['bed--occupied', 'bed--available', 'bed--cleaning', 'bed--reserved'];

function randomBedAnimation() {
  if (beds.length === 0) return;
  const bed = beds[Math.floor(Math.random() * beds.length)];
  const current = statusCycle.find(s => bed.classList.contains(s));
  const next = statusCycle[Math.floor(Math.random() * statusCycle.length)];
  if (current && current !== next) {
    bed.classList.remove(current);
    bed.classList.add(next);
    bed.style.transition = 'background .5s, border-color .5s';
  }
}

setInterval(randomBedAnimation, 2200);

// ---------- Contact Form ----------
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      contactForm.hidden = true;
      formSuccess.hidden = false;
    }, 900);
  });
}

// ---------- Smooth Active Nav Highlight ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.fontWeight = '';
      });
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active) {
        active.style.color = 'var(--blue)';
        active.style.fontWeight = '600';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
