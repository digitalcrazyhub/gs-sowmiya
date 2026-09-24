/**
 * ==========================================================================
 * GS SOWMIYA BUILDERS — SERVICES PAGE JAVASCRIPT
 * File: asset/js/services.js
 * Scoped strictly to the Services page.
 * Handles:
 * 1. Global Component Loading (Navbar, Page Banner, Footer, Floating Actions)
 * 2. Process Timeline Progress & Node States
 * 3. Accessible FAQ Accordion (Single-open, Keyboard Nav)
 * 4. Interactive Industry Category Panels
 * 5. Subtle Scroll Reveals & Reduced Motion Support
 * ==========================================================================
 */

import { loadGlobalComponents } from '/js/components.js';
import { initCardTilt, initScrollReveal, initCounterAnimation } from '/js/animations.js';

// Respect system accessibility setting
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Initialize Services Page on DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Load Common Components with active state set to 'services'
  await loadGlobalComponents({
    activeNav: 'services',
    banner: {
      eyebrow: 'OUR SERVICES',
      title: 'Construction Services<br>For Tamil Nadu.',
      breadcrumb: 'SERVICES',
      desc: 'GS Sowmiya Builders Private Limited provides construction, project management, consultancy, joint venture and interior solutions for residential and development projects.',
      bgImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?auto=format&fit=crop&w=1800&q=80'
    }
  });

  // 2. Initialize Page-Specific Systems
  initFaqAccordion();
  initProcessTimeline();
  initIndustryPanels();
  initScrollAnimations();
  initScrollReveal();
  initCounterAnimation();
  initCardTilt();
});

/**
 * --------------------------------------------------------------------------
 * FAQ ACCORDION SYSTEM
 * Accessible, keyboard friendly, single-item open at a time
 * --------------------------------------------------------------------------
 */
function initFaqAccordion() {
  const accordion = document.querySelector('.services-faq-accordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.services-faq-item');

  items.forEach((item, index) => {
    const button = item.querySelector('.services-faq-button');
    const content = item.querySelector('.services-faq-content');

    if (!button || !content) return;

    // Accessibility attributes setup
    const panelId = `faq-panel-${index + 1}`;
    button.setAttribute('id', `faq-btn-${index + 1}`);
    button.setAttribute('aria-controls', panelId);
    content.setAttribute('id', panelId);
    content.setAttribute('role', 'region');
    content.setAttribute('aria-labelledby', `faq-btn-${index + 1}`);

    // Click handler
    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other accordion items
      items.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          const otherBtn = otherItem.querySelector('.services-faq-button');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard navigation (Arrow keys up/down)
    button.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextItem = items[index + 1] || items[0];
        const nextBtn = nextItem.querySelector('.services-faq-button');
        if (nextBtn) nextBtn.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevItem = items[index - 1] || items[items.length - 1];
        const prevBtn = prevItem.querySelector('.services-faq-button');
        if (prevBtn) prevBtn.focus();
      }
    });
  });
}

/**
 * --------------------------------------------------------------------------
 * PROCESS TIMELINE PROGRESSION
 * Animates the connecting line and highlights steps when scrolled into view
 * --------------------------------------------------------------------------
 */
function initProcessTimeline() {
  const section = document.querySelector('.process-section');
  const progressBar = document.querySelector('.process-timeline-progress');
  const steps = document.querySelectorAll('.process-step');

  if (!section || !progressBar || steps.length === 0) return;

  if (prefersReducedMotion) {
    progressBar.style.transform = 'scaleX(1)';
    steps.forEach(step => step.classList.add('is-active'));
    return;
  }

  // IntersectionObserver to activate steps dynamically as user scrolls
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBar.style.transform = 'scaleX(1)';
        steps.forEach((step, idx) => {
          setTimeout(() => {
            step.classList.add('is-active');
          }, idx * 180);
        });
      }
    });
  }, { threshold: 0.25 });

  observer.observe(section);
}

/**
 * --------------------------------------------------------------------------
 * INDUSTRY PANELS INTERACTION
 * Allows touch users and mobile devices to toggle active category details
 * --------------------------------------------------------------------------
 */
function initIndustryPanels() {
  const panels = document.querySelectorAll('.industry-panel');
  if (!panels.length) return;

  panels.forEach(panel => {
    panel.addEventListener('click', () => {
      // Toggle current panel's active state
      const wasActive = panel.classList.contains('is-active');
      panels.forEach(p => p.classList.remove('is-active'));
      if (!wasActive) {
        panel.classList.add('is-active');
      }
    });
  });
}

/**
 * --------------------------------------------------------------------------
 * SUBTLE SCROLL REVEALS
 * Lightweight, GPU-accelerated entrance effects for editorial sections
 * --------------------------------------------------------------------------
 */
function initScrollAnimations() {
  if (prefersReducedMotion) return;

  const animatables = document.querySelectorAll(
    '.primary-service-item, .secondary-service-row, .technical-service-card, .why-services-point-item'
  );

  if (!window.IntersectionObserver) return;

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatables.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${((index % 3) * 0.1)}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${((index % 3) * 0.1)}s`;
    revealObserver.observe(el);
  });
}
