// ── SCROLL REVEAL ────────────────────────────────────────────────────
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger each element slightly
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

revealEls.forEach((el) => revealObserver.observe(el));

// ── CONTACT FORM ─────────────────────────────────────────────────────
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const success = document.getElementById("formSuccess");

    // Simple required field check
    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const message = form.querySelector("#message").value.trim();

    if (!name || !email || !message) return;

    // Simulate send (no backend needed for internship task)
    btn.textContent = "Sending...";
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.textContent = "Send Message";
      btn.disabled = false;
      if (success) {
        success.style.display = "block";
        setTimeout(() => (success.style.display = "none"), 4000);
      }
    }, 1200);
  });
}
