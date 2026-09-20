/**
 * GS SOWMIYA BUILDERS - MAIN APPLICATION ENTRY POINT (HOMEPAGE)
 * Initializes:
 * 1. Global Components (Navbar, Footer, Floating Actions)
 * 2. 4-Slide Cinematic Hero Slider
 * 3. Construction Cost & BOQ Calculator
 * 4. Testimonials Slider
 * 5. Architectural Project Case Studies Modal
 * 6. Showreel Video Modal
 * 7. Scroll Reveals & Animated Numerical Counters
 */

import { loadGlobalComponents } from './components.js';
import { initHeroSlider } from './hero.js';
import { initCostCalculator } from './calculator.js';
import { initTestimonials } from './testimonials.js';
import { initProjectModal } from './project-modal.js';
import { initScrollReveal, initCounterAnimation } from './animations.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Load Centralized Global Components
  await loadGlobalComponents({ activeNav: 'home' });

  // 2. Cinematic Architectural Hero Slider
  initHeroSlider();

  // 3. Construction Cost & BOQ Estimator
  initCostCalculator();

  // 4. Testimonials Slider
  initTestimonials();

  // 5. Architectural Project Modal
  initProjectModal();

  // 6. Scroll Reveals & Counters
  initScrollReveal();
  initCounterAnimation();

  // 7. Video Showreel Modal Controller
  initVideoModal();
});

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
      // Auto-play on open
      const separator = originalSrc.includes('?') ? '&' : '?';
      iframe.src = `${originalSrc}${separator}autoplay=1`;
    }
  }

  function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
    if (iframe) {
      // Stop playback on close
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
