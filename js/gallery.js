/* ==========================================================================
   GALLERY.JS
   Full-screen lightbox for the Design section: open / next / prev / close,
   keyboard support, and a soft scale-in animation.
   ========================================================================== */

(function () {
  let currentList = [];
  let currentIndex = 0;
  let lightboxEl = null;
  let lastFocused = null;

  function buildLightboxDOM() {
    const el = document.createElement('div');
    el.className = 'lightbox';
        el.innerHTML = `
      <button class="lightbox-close" aria-label="Fechar">✕</button>
      <button class="lightbox-prev" aria-label="Anterior">‹</button>
      <div class="lightbox-stage">
        <div class="lightbox-media"></div>
        <div class="lightbox-caption">
          <div class="lightbox-caption-text">
            <h3></h3>
            <span></span>
          </div>
          <a class="lightbox-visit" href="#" target="_blank" rel="noopener">Visitar ↗</a>
        </div>
      </div>
      <button class="lightbox-next" aria-label="Próximo">›</button>
    `;
    document.body.appendChild(el);

    el.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    el.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); showRelative(-1); });
    el.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); showRelative(1); });
    el.addEventListener('click', (e) => { if (e.target === el) closeLightbox(); });

    return el;
  }

  function renderCurrent() {
    const item = currentList[currentIndex];
    if (!item || !lightboxEl) return;

    const mediaWrap = lightboxEl.querySelector('.lightbox-media');
    mediaWrap.innerHTML = '';
    mediaWrap.appendChild(window.PortfolioData.buildMedia(item.image, item.title, item.category));

    lightboxEl.querySelector('.lightbox-caption h3').textContent = item.title;
    lightboxEl.querySelector('.lightbox-caption span').textContent = item.category;
  }

  function openLightbox(list, index) {
    currentList = list;
    currentIndex = index;
    lastFocused = document.activeElement;

    if (!lightboxEl) lightboxEl = buildLightboxDOM();
    renderCurrent();

    lightboxEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightboxEl.querySelector('.lightbox-close').focus();

    document.addEventListener('keydown', onKeydown);
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function showRelative(delta) {
    currentIndex = (currentIndex + delta + currentList.length) % currentList.length;
    renderCurrent();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showRelative(-1);
    if (e.key === 'ArrowRight') showRelative(1);
  }

  window.PortfolioGallery = { open: openLightbox };
})();
