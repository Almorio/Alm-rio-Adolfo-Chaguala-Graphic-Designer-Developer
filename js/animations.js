/* ==========================================================================
   ANIMATIONS.JS
   Scroll-reveal observer + the 3D tilt interaction on project cards.
   Disabled on touch devices (see isTouchDevice below / responsive.css).
   ========================================================================== */

(function () {
  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Scroll reveal --- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  function observeReveals(nodeList) {
    nodeList.forEach((el) => revealObserver.observe(el));
  }

  /* Observe anything already in the DOM at load time (static sections). */
  document.addEventListener('DOMContentLoaded', () => {
    observeReveals(document.querySelectorAll('.reveal'));
  });

  /* --- 3D tilt effect for .project-card --- */
  function applyTilt(cards) {
    if (isTouchDevice || prefersReducedMotion) return;

    cards.forEach((card) => {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = 'true';

      const maxTilt = 8; // degrees — kept subtle per brief

      function onMove(e) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;  // 0 -> 1
        const y = (e.clientY - rect.top) / rect.height;  // 0 -> 1

        const rotateY = (x - 0.5) * maxTilt * 2;
        const rotateX = (0.5 - y) * maxTilt * 2;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

        const media = card.querySelector('.project-media img, .project-media .placeholder-img');
        if (media) {
          const shiftX = (x - 0.5) * 10;
          const shiftY = (y - 0.5) * 10;
          media.style.transform = `translate(${shiftX}px, ${shiftY}px) scale(1.05)`;
        }
      }

      function onLeave() {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
        const media = card.querySelector('.project-media img, .project-media .placeholder-img');
        if (media) media.style.transform = '';
      }

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  /* --- Header scroll state --- */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', initHeaderScroll);
function initPreloader() {
  const preloader = document.getElementById('preloader');

  // Se a página não tiver o preloader no HTML, dispara logo a animação do hero.
  if (!preloader) {
    requestAnimationFrame(() => document.body.classList.add('is-loaded'));
    return;
  }

  const fill = document.getElementById('preloader-fill');
  const count = document.getElementById('preloader-count');
  let progress = 0;

  document.body.style.overflow = 'hidden';

  function finish() {
    preloader.classList.add('is-hidden');
    document.body.style.overflow = '';
    document.body.classList.add('is-loaded'); // liga a animação do hero (já existe em animations.css)
    preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
  }

  const timer = setInterval(() => {
    progress += Math.random() * 18 + 7;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      setTimeout(finish, 280);
    }
    if (fill) fill.style.width = progress + '%';
    if (count) count.textContent = Math.floor(progress) + '%';
  }, 130);
}

document.addEventListener('DOMContentLoaded', initPreloader);
  window.PortfolioAnimations = { observeReveals, applyTilt };
})();
