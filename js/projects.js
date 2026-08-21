/* ==========================================================================
   PROJECTS.JS
   Data source for every card in the site + the rendering / "ver mais"
   logic that turns that data into DOM. Add a new job by pushing a new
   object into the arrays below — no HTML editing required.
   ========================================================================== */

/* --------------------------------------------------------------------
   1. DATA
   Real assets go in assets/images/... — until they exist, cards fall
   back to a generated placeholder (see helpers.js -> buildMedia()).
   -------------------------------------------------------------------- */

const DESIGN_CATEGORIES = [
  { id: 'flyers', label: 'Flyers' },
 /* { id: 'branding', label: 'Branding' },*/
  { id: 'social-media', label: 'Social Media' },
  { id: 'posters', label: 'Logos' },
  { id: 'identidade-visual', label: 'Identidade Visual' },
];

const CODE_CATEGORIES = [
  { id: 'websites', label: 'Websites' },
  { id: 'frontend', label: 'Front-end' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'sistemas', label: 'Sistemas' },
  { id: 'aplicacoes', label: 'Aplicações' },
  { id: 'experimentos', label: 'Experimentos' },
];

const DESIGN_SUMMARIES = [
  'Composição desenvolvida com foco em hierarquia visual e contraste tipográfico.',
  'Peça criada para reforçar a identidade da marca em suporte digital e impresso.',
  'Exploração de cor e grelha para comunicar a mensagem de forma imediata.',
  'Trabalho com atenção ao espaçamento, alinhamento e legibilidade.',
  'Conceito visual construído a partir do briefing do cliente e do público-alvo.',
];

function buildDesignItems(category, count = 9) {
  const items = [];
  for (let i = 1; i <= count; i++) {
    items.push({
      id: `${category.id}-${i}`,
      title: `${category.label} 0${i > 9 ? i : '' + i}`.replace('00', '0'),
      category: category.label,
      categoryId: category.id,
      summary: DESIGN_SUMMARIES[i % DESIGN_SUMMARIES.length],
      image: `assets/images/design/${category.id}/${category.id}-${i}.jpg`,
      accent: i % 3,
      /* Link de onde a peça pode ser vista/visitada (Instagram, Behance, site do cliente...).
         Deixa em '' para não mostrar botão "Visitar", ou preenche com a URL real. */
      link: ' ',
    });
  }
  return items;
}

const DESIGN_DATA = {};
DESIGN_CATEGORIES.forEach((cat) => { DESIGN_DATA[cat.id] = buildDesignItems(cat); });

const PROJECT_TYPES = ['Website', 'Landing Page', 'Aplicação', 'Sistema', 'Branding Digital', 'Experimental'];
const PROJECT_TECHS = [
  ['HTML5', 'CSS3', 'JavaScript'],
  ['JavaScript', 'Node.js', 'MongoDB'],
  ['HTML5', 'CSS3', 'GSAP'],
  ['JavaScript', 'Express', 'REST API'],
  ['Figma', 'HTML5', 'CSS3'],
  ['Canvas', 'JavaScript', 'WebGL'],
];

const PROJECTS_DATA = Array.from({ length: 9 }, (_, i) => {
  const n = i + 1;
  const typeIndex = i % PROJECT_TYPES.length;
  return {
    id: `project-${n}`,
    title: `Projeto ${n < 10 ? '0' + n : n}`,
    category: PROJECT_TYPES[typeIndex],
    description: 'Desenvolvimento completo, do conceito visual à implementação funcional, com foco em performance e experiência de utilização.',
    tech: PROJECT_TECHS[typeIndex],
    image: `assets/images/projects/project-${n}.jpg`,
    link: '#',
  };
});

const CODE_SNIPPET_LINES = [
  { k: 'const', s: 'app', c: ' = init();' },
  { k: 'function', s: 'render()', c: ' { ... }' },
  { k: 'status:', s: '"running"', c: '' },
  { k: 'build:', s: '"success"', c: ' ✓' },
];

function buildCodeItems(category, count = 9) {
  const items = [];
  for (let i = 1; i <= count; i++) {
    items.push({
      id: `${category.id}-${i}`,
      title: `${category.label} 0${i}`,
      category: category.label,
      categoryId: category.id,
      description: 'Projeto de programação construído com foco em código limpo, modular e de fácil manutenção.',
      tech: PROJECT_TECHS[i % PROJECT_TECHS.length],
      image: `assets/images/code/${category.id}-${i}.jpg`,
      demoLink: '#',
      codeLink: '#',
    });
  }
  return items;
}

const CODE_DATA = {};
CODE_CATEGORIES.forEach((cat) => { CODE_DATA[cat.id] = buildCodeItems(cat); });

/* --------------------------------------------------------------------
   2. SHARED HELPERS
   -------------------------------------------------------------------- */

/** Builds a media element: real <img> if it loads, otherwise a
 *  generated placeholder block so the layout always looks intentional. */
function buildMedia(src, label, sublabel) {
  const wrap = document.createElement('div');
  wrap.className = 'placeholder-img';
  const mark = document.createElement('span');
  mark.className = 'mark';
  mark.textContent = (label || '?').slice(0, 2).toUpperCase();
  const sub = document.createElement('span');
  sub.textContent = sublabel || label || '';
  wrap.appendChild(mark);
  wrap.appendChild(sub);

  const img = new Image();
  img.alt = label || '';
  img.loading = 'lazy';
  img.onload = () => wrap.replaceWith(img);
  img.onerror = () => { /* keep placeholder */ };
  img.src = src;

  return wrap;
}

/** Renders `data` into `gridEl` in blocks of 3, each with its own
 *  "Ver mais" trigger, per the required layout. `cardBuilder(item)`
 *  must return a DOM node for a single card. */
function renderInBlocks(gridEl, data, cardBuilder, { perBlock = 3, initialBlocks = 1 } = {}) {
  gridEl.innerHTML = '';
  const totalBlocks = Math.ceil(data.length / perBlock);
  let revealedBlocks = 0;

  function renderBlock(blockIndex) {
    const start = blockIndex * perBlock;
    const items = data.slice(start, start + perBlock);

    const blockWrap = document.createElement('div');
    blockWrap.className = 'block';

    const grid = document.createElement('div');
    grid.className = 'card-grid';
    items.forEach((item) => {
      const card = cardBuilder(item);
      card.classList.add('reveal');
      grid.appendChild(card);
    });
    blockWrap.appendChild(grid);
    gridEl.appendChild(blockWrap);

    if (blockIndex < totalBlocks - 1) {
      const moreWrap = document.createElement('div');
      moreWrap.className = 'load-more-wrap';
      const btn = document.createElement('button');
      btn.className = 'btn-more';
      btn.type = 'button';
      btn.textContent = '[ Ver mais ]';
      btn.addEventListener('click', () => {
        moreWrap.remove();
        revealedBlocks++;
        renderBlock(revealedBlocks);
      }, { once: true });
      moreWrap.appendChild(btn);
      gridEl.appendChild(moreWrap);
    }

    if (window.PortfolioAnimations && window.PortfolioAnimations.observeReveals) {
      window.PortfolioAnimations.observeReveals(grid.querySelectorAll('.reveal'));
    }
    if (window.PortfolioAnimations && window.PortfolioAnimations.applyTilt) {
      window.PortfolioAnimations.applyTilt(grid.querySelectorAll('.project-card'));
    }
  }

  renderBlock(0);
}

/* --------------------------------------------------------------------
   3. CARD BUILDERS
   -------------------------------------------------------------------- */

function buildFlyerCard(item, onOpen) {
  const card = document.createElement('article');
  card.className = 'flyer-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Abrir ${item.title}`);

  const media = document.createElement('div');
  media.className = 'flyer-media';
  media.appendChild(buildMedia(item.image, item.title, item.category));
  card.appendChild(media);

  const info = document.createElement('div');
  info.className = 'flyer-info';
  info.innerHTML = `
    <div class="flyer-cat">${item.category}</div>
    <h3 class="flyer-title">${item.title}</h3>
    <p class="flyer-summary">${item.summary}</p>
  `;
  card.appendChild(info);

  const open = () => onOpen(item);
  card.addEventListener('click', open);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });

  return card;
}

function buildProjectCard(item) {
  const card = document.createElement('article');
  card.className = 'project-card';

  const media = document.createElement('div');
  media.className = 'project-media';
  media.appendChild(buildMedia(item.image, item.title, item.category));
  card.appendChild(media);

  const body = document.createElement('div');
  body.className = 'project-body';
  body.innerHTML = `
    <div class="project-cat">${item.category}</div>
    <h3 class="project-title">${item.title}</h3>
    <p class="project-desc">${item.description}</p>
    <div class="project-tech">${item.tech.map((t) => `<span class="tech-tag">${t}</span>`).join('')}</div>
    <div class="project-actions">
      <a href="${item.link}">Ver projeto →</a>
    </div>
  `;
  card.appendChild(body);
  return card;
}

function buildCodeCard(item) {
  const card = document.createElement('article');
  card.className = 'code-card';

  const term = document.createElement('div');
  term.className = 'code-terminal';

  const dots = document.createElement('div');
  dots.className = 'term-dots';
  dots.innerHTML = '<span></span><span></span><span></span>';
  term.appendChild(dots);

  const visual = document.createElement('div');
  visual.className = 'code-preview-visual';
  visual.appendChild(buildMedia(item.image, item.title, item.category));
  term.appendChild(visual);

  const lines = document.createElement('div');
  lines.className = 'term-lines';
  lines.innerHTML = CODE_SNIPPET_LINES.map((l) =>
    `<div><span class="k">${l.k}</span> <span class="s">${l.s}</span><span class="c">${l.c}</span></div>`
  ).join('') + '<div><span class="k">$</span> <span class="term-caret"></span></div>';
  term.appendChild(lines);

  card.appendChild(term);

  const body = document.createElement('div');
  body.className = 'code-body';
  body.innerHTML = `
    <div class="project-cat">${item.category}</div>
    <h3 class="project-title">${item.title}</h3>
    <p class="project-desc">${item.description}</p>
    <div class="project-tech">${item.tech.map((t) => `<span class="tech-tag">${t}</span>`).join('')}</div>
    <div class="project-actions">
      <a href="${item.demoLink}">Ver projeto →</a>
      <a href="${item.codeLink}">Código</a>
    </div>
  `;
  card.appendChild(body);
  return card;
}

window.PortfolioData = {
  DESIGN_CATEGORIES, CODE_CATEGORIES, DESIGN_DATA, CODE_DATA, PROJECTS_DATA,
  buildMedia, renderInBlocks, buildFlyerCard, buildProjectCard, buildCodeCard,
};
