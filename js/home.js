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

  function renderCards() {
    const list = getFilteredProjects();
    track.innerHTML = list.map((proj, idx) => `
      <div class="project-card" data-project-id="${proj.id}" style="cursor: pointer;">
        <div class="project-card-visual">
          <img src="${proj.image}" alt="${proj.name}" loading="lazy">
          <span class="project-badge-tag">${proj.tag || proj.category}</span>
        </div>
        <div class="project-card-content">
          <div>
            <div class="project-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
    `).join('');

    // Attach click handlers to open modal
    track.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        if (typeof window.openProjectDetails === 'function') {
          window.openProjectDetails(id);
        }
      });
    });

    updateCarousel();
    initCardTilt();
  }

  function updateCarousel() {
    const list = getFilteredProjects();
    const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 24 : 340;
    const maxIndex = Math.max(0, list.length - 1);
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    if (counterEl) {
      const currentFormatted = String(currentIndex + 1).padStart(2, '0');
      const totalFormatted = String(list.length).padStart(2, '0');
      counterEl.textContent = `${currentFormatted} / ${totalFormatted}`;
    }
  }

  prevBtn?.addEventListener('click', () => {
    const list = getFilteredProjects();
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn?.addEventListener('click', () => {
    const list = getFilteredProjects();
    if (currentIndex < list.length - 1) {
      currentIndex++;
      updateCarousel();
    }
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
      currentIndex = 0;
      renderCards();
    });
  });

  renderCards();
  window.addEventListener('resize', updateCarousel);
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
