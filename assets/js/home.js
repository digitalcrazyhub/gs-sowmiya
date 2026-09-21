/**
 * ==========================================================================
 * GS SOWMIYA BUILDERS — HOMEPAGE CONTROLLER (home.js)
 * Dedicated JavaScript logic for index.html
 * ==========================================================================
 */

import { loadGlobalComponents } from './components.js';
import { initHeroSlider } from './hero.js';
import { initCostCalculator } from './calculator.js';
import { initTestimonials } from './testimonials.js';
import { initProjectModal } from './project-modal.js';
import { initScrollReveal, initCounterAnimation, initCardTilt, initHeroDepth } from './animations.js';
import { FEATURED_PROJECTS } from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Load Centralized Global Components (Navbar, Footer, Floating Actions)
  await loadGlobalComponents({ activeNav: 'home' });

  // 2. Cinematic Architectural 4-Slide Hero Slider
  initHeroSlider();

  // 3. Construction Cost & BOQ Estimator Tool
  initCostCalculator();

  // 4. Testimonials Carousel
  initTestimonials();

  // 5. Architectural Project Case Studies Modal
  initProjectModal();

  // 6. Featured Projects Slider & Filter
  initProjectsSlider();

  // 7. Scroll Reveals & Animated Metric Counters
  initScrollReveal();
  initCounterAnimation();

  // 8. 3D Architectural Depth & Pointer Tilts
  initHeroDepth();
  initCardTilt();

  // 9. Video Showreel Modal Controller
  initVideoModal();
});

/**
 * Controller for Homepage Featured Projects Slider & Filter
 */
function initProjectsSlider() {
  const track = document.querySelector('.projects-track');
  if (!track) return;

  const prevBtn = document.querySelector('.projects-prev-btn');
  const nextBtn = document.querySelector('.projects-next-btn');
  const counterEl = document.querySelector('.slider-pagination-count');
  const filterTabs = document.querySelectorAll('.project-filter-tab');

  let currentCategory = 'ALL';
  let currentIndex = 0;
  let activeListLength = 0;
  let autoplayTimer = null;
  let isPaused = false;
  let isTransitioning = false;

  const AUTOPLAY_DELAY = 3500;

  function getFilteredProjects() {
    if (currentCategory === 'ALL') return FEATURED_PROJECTS;
    if (currentCategory.toLowerCase() === 'residential') {
      return FEATURED_PROJECTS.filter(p =>
        p.category.toLowerCase().includes('residential') ||
        p.category.toLowerCase().includes('living')
      );
    }
    if (currentCategory.toLowerCase() === 'commercial') {
      return FEATURED_PROJECTS.filter(p =>
        p.category.toLowerCase().includes('commercial') ||
        p.category.toLowerCase().includes('joint')
      );
    }
    return FEATURED_PROJECTS;
  }

  function renderCard(proj) {
    return `
      <div class="project-card" data-project-id="${proj.id}" style="cursor: pointer;">
        <div class="project-card-visual">
          <img src="${proj.image}" alt="${proj.name}" loading="lazy">
          <span class="project-badge-tag">${proj.tag || proj.category}</span>
        </div>
        <div class="project-card-content">
          <div>
            <div class="project-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${proj.location}</span>
            </div>
            <h3 class="project-title">${proj.name}</h3>
            <div class="project-specs-row">
              <span><strong>Area:</strong> ${proj.area}</span>
              <span>•</span>
              <span><strong>Year:</strong> ${proj.year}</span>
            </div>
          </div>
          <div class="project-card-footer">
            <span class="project-status-tag" style="color: var(--brand-burgundy); font-weight: 600; font-size: 0.8125rem;">
              ${proj.status}
            </span>
            <button type="button" class="btn-text" style="font-size: 0.8125rem; font-weight: 700; color: var(--brand-gold); display: flex; align-items: center; gap: 4px;" aria-label="View details of ${proj.name}">
              Specs ↗
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function getCardWidth() {
    const card = track.firstElementChild;
    if (!card) return 340;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '24') || 24;
    return card.getBoundingClientRect().width + gap;
  }

  function updateCounter(listLength) {
    if (!counterEl || !listLength) return;
    const logicalIndex = ((currentIndex - listLength) % listLength + listLength) % listLength;
    counterEl.textContent =
      `${String(logicalIndex + 1).padStart(2, '0')} / ${String(listLength).padStart(2, '0')}`;
  }

  function updateCarousel(animate = true) {
    const list = getFilteredProjects();
    if (!list.length) return;

    const cardWidth = getCardWidth();
    track.style.transitionDuration = animate ? '' : '0ms';
    track.style.transform = `translate3d(-${currentIndex * cardWidth}px, 0, 0)`;
    updateCounter(list.length);

    if (!animate) {
      // Force the browser to apply the no-transition position before restoring it.
      track.offsetHeight;
      track.style.transitionDuration = '';
    }
  }

  function resetAutoplay() {
    window.clearInterval(autoplayTimer);
    autoplayTimer = window.setInterval(() => {
      if (!isPaused && !document.hidden) moveNext();
    }, AUTOPLAY_DELAY);
  }

  function moveNext() {
    const list = getFilteredProjects();
    if (list.length <= 1 || isTransitioning) return;

    isTransitioning = true;
    currentIndex += 1;
    updateCarousel(true);
  }

  function movePrevious() {
    const list = getFilteredProjects();
    if (list.length <= 1 || isTransitioning) return;

    isTransitioning = true;
    currentIndex -= 1;
    updateCarousel(true);
  }

  function renderCards() {
    const list = getFilteredProjects();
    activeListLength = list.length;

    if (!list.length) {
      track.innerHTML = '';
      if (counterEl) counterEl.textContent = '00 / 00';
      return;
    }

    // Three copies make the carousel appear continuous in both directions.
    // We start on the middle copy so the user can loop indefinitely.
    track.innerHTML = [...list, ...list, ...list].map(renderCard).join('');
    currentIndex = list.length;
    isTransitioning = false;

    track.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        if (typeof window.openProjectDetails === 'function') {
          window.openProjectDetails(id);
        }
      });
    });

    updateCarousel(false);
    initCardTilt();
  }

  track.addEventListener('transitionend', (event) => {
    if (event.propertyName !== 'transform') return;

    const list = getFilteredProjects();
    if (!list.length) return;

    // When we leave the middle copy, silently jump back to its equivalent
    // card in the middle copy. The visible content stays exactly the same.
    if (currentIndex >= list.length * 2) {
      currentIndex -= list.length;
      updateCarousel(false);
    } else if (currentIndex < list.length) {
      currentIndex += list.length;
      updateCarousel(false);
    }

    isTransitioning = false;
  });

  prevBtn?.addEventListener('click', () => {
    movePrevious();
    resetAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    moveNext();
    resetAutoplay();
  });

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      currentCategory = tab.getAttribute('data-category') || 'ALL';

      renderCards();
      resetAutoplay();
    });
  });

  // Pause automatic movement while the user is interacting with the cards.
  const pause = () => { isPaused = true; };
  const resume = () => { isPaused = false; };

  track.addEventListener('mouseenter', pause);
  track.addEventListener('mouseleave', resume);
  track.addEventListener('focusin', pause);
  track.addEventListener('focusout', resume);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) resetAutoplay();
  });

  window.addEventListener('resize', () => {
    updateCarousel(false);
  });

  renderCards();
  resetAutoplay();
}

/**
 * Controller for Showreel Video Modal
 */
function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const openBtns = document.querySelectorAll('.trigger-video-modal');
  const closeBtn = modal?.querySelector('.modal-close-btn');
  const iframe = document.getElementById('modal-video-player');

  if (!modal) return;

  const originalSrc = iframe ? iframe.getAttribute('src') : '';

  function openModal() {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    if (iframe && originalSrc) {
      const separator = originalSrc.includes('?') ? '&' : '?';
      iframe.src = `${originalSrc}${separator}autoplay=1`;
    }
  }

  function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
    if (iframe) {
      iframe.src = originalSrc;
    }
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}
