/* ==========================================================================
   MAIN.JS
   Bootstraps navigation, the mobile menu, and wires each section's data
   (from projects.js) into the page. Runs after DOMContentLoaded.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothNav();
  initHeroLoad();
  initDesignSection();
  initProjectsSection();
  initCodeSection();
  initContactForm();
  initAboutPortrait();
  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
});

/* --- About portrait placeholder/image --- */
function initAboutPortrait() {
  const el = document.getElementById('about-portrait');
  if (!el || !window.PortfolioData) return;
  el.appendChild(window.PortfolioData.buildMedia('assets/images/design/portrait.jpg', 'Ana Duarte', 'Foto de perfil'));
}

/* --- Mobile hamburger menu --- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  function toggle(open) {
    const isOpen = open ?? !hamburger.classList.contains('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    navLinks.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggle());
  navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggle(false)));
  window.addEventListener('resize', () => { if (window.innerWidth > 860) toggle(false); });
}

/* --- Active link highlight while scrolling (index page only) --- */
function initSmoothNav() {
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(links)
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((s) => observer.observe(s));
}

/* --- Hero entrance --- */
function initHeroLoad() {
  requestAnimationFrame(() => document.body.classList.add('is-loaded'));
}

/* --- Design section: tabs + flyer-style cards + lightbox --- */
function initDesignSection() {
  const tabsEl = document.getElementById('design-tabs');
  const gridEl = document.getElementById('design-grid');
  if (!tabsEl || !gridEl || !window.PortfolioData) return;

  const { DESIGN_CATEGORIES, DESIGN_DATA, renderInBlocks, buildFlyerCard } = window.PortfolioData;

  tabsEl.innerHTML = '';
  DESIGN_CATEGORIES.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (i === 0 ? ' is-active' : '');
    btn.type = 'button';
    btn.textContent = cat.label;
    btn.dataset.cat = cat.id;
    btn.addEventListener('click', () => {
      tabsEl.querySelectorAll('.tab').forEach((t) => t.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderCategory(cat.id);
    });
    tabsEl.appendChild(btn);
  });

  function renderCategory(catId) {
    const data = DESIGN_DATA[catId] || [];
    renderInBlocks(gridEl, data, (item) => buildFlyerCard(item, (clicked) => {
      const index = data.findIndex((d) => d.id === clicked.id);
      window.PortfolioGallery.open(data, index);
    }));
  }

  renderCategory(DESIGN_CATEGORIES[0].id);
}

/* --- Projects section: 3D tilt cards, single 9-item set in 3 blocks --- */
function initProjectsSection() {
  const gridEl = document.getElementById('projects-grid');
  if (!gridEl || !window.PortfolioData) return;

  const { PROJECTS_DATA, renderInBlocks, buildProjectCard } = window.PortfolioData;
  renderInBlocks(gridEl, PROJECTS_DATA, buildProjectCard);
}

/* --- Code section: tabs + terminal-hover cards --- */
function initCodeSection() {
  const tabsEl = document.getElementById('code-tabs');
  const gridEl = document.getElementById('code-grid');
  if (!tabsEl || !gridEl || !window.PortfolioData) return;

  const { CODE_CATEGORIES, CODE_DATA, renderInBlocks, buildCodeCard } = window.PortfolioData;

  tabsEl.innerHTML = '';
  CODE_CATEGORIES.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (i === 0 ? ' is-active' : '');
    btn.type = 'button';
    btn.textContent = cat.label;
    btn.dataset.cat = cat.id;
    btn.addEventListener('click', () => {
      tabsEl.querySelectorAll('.tab').forEach((t) => t.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderCategory(cat.id);
    });
    tabsEl.appendChild(btn);
  });

  function renderCategory(catId) {
    renderInBlocks(gridEl, CODE_DATA[catId] || [], buildCodeCard);
  }

  renderCategory(CODE_CATEGORIES[0].id);
}

/* --- Contact form (front-end only demo submit) --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (status) status.textContent = 'A enviar…';
    setTimeout(() => {
      if (status) status.textContent = 'Mensagem enviada. Obrigado pelo contacto — respondo em breve.';
      form.reset();
    }, 900);
  });
}
