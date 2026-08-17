// Loader
const loader = document.getElementById('loader');
const loaderCount = document.getElementById('loaderCount');
const loaderBar = document.getElementById('loaderBar');
let lp = 0;
const loadTick = setInterval(() => {
  lp += Math.random() * 12 + 4;
  if (lp >= 100) { lp = 100; clearInterval(loadTick); setTimeout(hideLoader, 400); }
  loaderCount.textContent = Math.floor(lp);
  loaderBar.style.width = lp + '%';
}, 90);
function hideLoader() {
  loader.classList.add('done');
  setTimeout(() => loader.remove(), 700);
}

// Custom cursor
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
function cursorLoop() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
  if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
  requestAnimationFrame(cursorLoop);
}
cursorLoop();
document.querySelectorAll('a, button, .magnetic, .work-row, .project-card, .stat-card').forEach((el) => {
  el.addEventListener('mouseenter', () => ring && ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring && ring.classList.remove('hover'));
});

// Intersection Observer reveals
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('revealed'), i * 60);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => io.observe(el));

// Navbar scroll state + progress bar
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('progressBar');
function onScroll() {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 40);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (y / h * 100) + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    }
  });
}, { threshold: 0.5 });
sections.forEach((s) => navObserver.observe(s));

// Counter animation
const counters = document.querySelectorAll('[data-count]');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.count, 10);
    let cur = 0;
    const step = () => {
      cur += Math.max(1, target / 40);
      if (cur >= target) { el.textContent = String(target).padStart(2, '0'); return; }
      el.textContent = String(Math.floor(cur)).padStart(2, '0');
      requestAnimationFrame(step);
    };
    step();
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach((c) => counterObs.observe(c));

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.m-link').forEach((l) => l.addEventListener('click', () => {
  menuToggle.classList.remove('open');
  mobileMenu.classList.remove('open');
}));

// Magnetic buttons
document.querySelectorAll('.magnetic').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = 'translate(' + (x * 0.25) + 'px,' + (y * 0.25) + 'px)';
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// Hero image scroll parallax
const heroWrap = document.querySelector('.hero-image-wrap');
window.addEventListener('scroll', () => {
  if (heroWrap) {
    const y = window.scrollY;
    if (y < 800) heroWrap.style.transform = 'translateY(' + (y * 0.12) + 'px)';
  }
}, { passive: true });

// Project card 3D tilt
document.querySelectorAll('.project-card').forEach((card) => {
  const visual = card.querySelector('.project-visual');
  if (!visual || window.matchMedia('(max-width: 900px)').matches) return;
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const yy = (e.clientY - r.top) / r.height - 0.5;
    visual.style.transform = 'translateY(-8px) rotateX(' + (-yy * 10) + 'deg) rotateY(' + (x * 10) + 'deg)';
  });
  card.addEventListener('mouseleave', () => { visual.style.transform = ''; });
});

// Hero parallax (mouse)
const heroBg = document.getElementById('heroBg');
const hero = document.getElementById('hero');
if (hero && window.matchMedia('(min-width: 900px)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroBg.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  });
}

// Back to top
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Live clock
const clock = document.getElementById('clock');
function tick() {
  if (!clock) return;
  const d = new Date();
  const t = [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':');
  clock.textContent = t + ' BD';
}
tick(); setInterval(tick, 1000);
