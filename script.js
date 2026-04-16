/* ══════════════════════════════════════════════
   BalakrishnanS Portfolio — JavaScript
   ══════════════════════════════════════════════ */

/* ─── Custom Cursor ──────────────────────────── */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let curX   = 0, curY   = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Smooth lag for the outer ring
function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top  = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Scale cursor on hoverable elements
document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

/* ─── Sticky Header ──────────────────────────── */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ─── Mobile Menu ────────────────────────────── */
const menuToggle = document.getElementById('menuToggle');
const nav        = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Close menu on nav link click
nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

/* ─── Theme Toggle ───────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const html        = document.documentElement;

// Persist theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ─── Typing Animation ───────────────────────── */
const phrases = [
  'fast web apps.',
  'elegant UIs.',
  'REST APIs.',
  'scalable backends.',
  'delightful products.',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const typingEl  = document.getElementById('typingText');

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);
  } else {
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 300;
  }

  setTimeout(type, delay);
}

type();

/* ─── Scroll Reveal ──────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Math.min(delay, 320));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── Skill Bar Animation ────────────────────── */
const skillFills = document.querySelectorAll('.skill-fill');

const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.dataset.w;
      // Small delay so the user sees the animation
      setTimeout(() => {
        entry.target.style.width = target + '%';
      }, 200);
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => barObserver.observe(fill));

/* ─── Back to Top ────────────────────────────── */
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Contact Form ───────────────────────────── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const btnText     = document.getElementById('btnText');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  // Basic validation
  const name    = contactForm.name.value.trim();
  const email   = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) return;

  // Simulate sending
  btnText.textContent = 'Sending…';
  contactForm.querySelector('.btn-primary').disabled = true;

  setTimeout(() => {
    formSuccess.style.display = 'block';
    contactForm.reset();
    btnText.textContent = 'Send Message';
    contactForm.querySelector('.btn-primary').disabled = false;

    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1200);
});

/* ─── Smooth Active Nav on Scroll ───────────────*/
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));
