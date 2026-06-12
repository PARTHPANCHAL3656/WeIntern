// ── Navigation ───────────────────────────────────────
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.nav__mobile');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('.nav__mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}
document.addEventListener('click', (e) => {
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

// ── Scroll Reveal ────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ── Active nav link ──────────────────────────────────
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── Contact form validation ───────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const fields = contactForm.querySelectorAll('[required]');
  function showError(el, msg) {
    clearError(el);
    el.classList.add('input--error');
    const err = document.createElement('span');
    err.className = 'input-error-msg';
    err.textContent = msg;
    el.parentNode.appendChild(err);
  }
  function clearError(el) {
    el.classList.remove('input--error');
    const existing = el.parentNode.querySelector('.input-error-msg');
    if (existing) existing.remove();
  }
  fields.forEach(field => field.addEventListener('input', () => clearError(field)));
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    fields.forEach(field => {
      clearError(field);
      if (!field.value.trim()) { showError(field, 'This field is required.'); valid = false; }
      else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        showError(field, 'Please enter a valid email address.'); valid = false;
      }
    });
    if (valid) {
      const btn = contactForm.querySelector('[type="submit"]');
      btn.textContent = 'Message sent ✓';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      contactForm.reset();
      setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; btn.style.opacity = ''; }, 4000);
    }
  });
}