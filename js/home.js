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
import { initScrollReveal, initCounterAnimation } from './animations.js';

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

  // 6. Scroll Reveals & Animated Metric Counters
  initScrollReveal();
  initCounterAnimation();

  // 7. Video Showreel Modal Controller
  initVideoModal();
});

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
