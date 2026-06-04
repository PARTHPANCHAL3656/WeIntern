// ── NAVBAR ──────────────────────────────────────────────
const navHTML = `
<header>
  <nav class="navbar">
    <div>
    <img src="assets/PFP.jpg" class="nav-pfp" />
    <a href="index.html" class="nav-logo">Parth Panchal</a>
    </div>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="projects.html">Projects</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
  </nav>
</header>`;

// ── FOOTER ──────────────────────────────────────────────
const footerHTML = `
<footer>
      <div class="f-left">
        <div class="f-name">Parth Panchal</div>
        <div class="f-quote">If it ships, it counts.™</div>
        <p class="footer-copy">© 2026 Parth Panchal. All rights reserved.</p>
      </div>
      <div class="f-icons">
        <a
          href="https://www.linkedin.com/in/parth-panchal-a3a309366/"
          target="_blank"
          title="LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </a>
        <a
          href="https://github.com/PARTHPANCHAL3656"
          target="_blank"
          title="GitHub"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
        </a>
        <a href="mailto:parthpanchal.10000@gmail.com" title="Email">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </a>
      </div>
    </footer>`;

// ── INJECT ──────────────────────────────────────────────
document.body.insertAdjacentHTML('afterbegin', navHTML);
document.body.insertAdjacentHTML('beforeend', footerHTML);

// ── HAMBURGER ───────────────────────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// ── ACTIVE NAV LINK ─────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});
// ── SCROLL REVEAL ────────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger each element slightly
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── CONTACT FORM ─────────────────────────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const success = document.getElementById('formSuccess');

    // Simple required field check
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) return;

    // Simulate send (no backend needed for internship task)
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      if (success) {
        success.style.display = 'block';
        setTimeout(() => success.style.display = 'none', 4000);
      }
    }, 1200);
  });
}