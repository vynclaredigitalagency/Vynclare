// ── Fade on scroll ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), parseInt(e.target.dataset.delay) || 0);
      obs.unobserve(e.target);
    }
  });
}, { threshold: .1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.hero .fade').forEach((el, i) => { el.dataset.delay = i * 160 + 100; });
document.querySelectorAll('.fade').forEach(el => {
  if (!el.dataset.delay) el.dataset.delay = 0;
  obs.observe(el);
});

// ── Nav scroll ──
const nav = document.getElementById('nav');
if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));

// ── Active nav ──
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ── Mobile menu ──
const ham = document.getElementById('ham');
const mob = document.getElementById('mob');
const mobClose = document.getElementById('mobClose');
if (ham && mob) ham.addEventListener('click', () => mob.classList.add('open'));
if (mobClose && mob) mobClose.addEventListener('click', () => mob.classList.remove('open'));
function closeMob() { if (mob) mob.classList.remove('open'); }

// ── Portfolio filter ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(c => {
      c.classList.toggle('hidden', f !== 'all' && c.dataset.category !== f);
    });
  });
});

// ── FAQ Accordion ──
document.querySelectorAll('.pw-faq-item').forEach(item => {
  const q = item.querySelector('.pw-faq-q');
  if (q) q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.pw-faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Contact form ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#3ecf8e';
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; }, 3000);
  });
}
