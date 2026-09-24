/**
 * Residential Building Construction Page Controller
 * GS Sowmiya Builders Private Limited
 */
import { loadGlobalComponents } from '../components.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadGlobalComponents({
      activeNav: 'service-residential',
      banner: {
        title: 'Residential Building Construction',
        eyebrow: '01 / Construction Services',
        breadcrumb: 'RESIDENTIAL BUILDING CONSTRUCTION',
        desc: 'Comprehensive planning, structural execution, and custom residential construction for independent houses, luxury villas, and multi-floor homes across Chennai.',
        bgImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85'
      }
    });

    initFaqAccordion();
    initScrollReveals();
  } catch (err) {
    console.error('Error initializing Residential Construction page:', err);
  }
});

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const panel = item.querySelector('.faq-answer-panel');
    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      // Close other items
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('is-open')) {
          other.classList.remove('is-open');
          const otherBtn = other.querySelector('.faq-question-btn');
          const otherPanel = other.querySelector('.faq-answer-panel');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

function initScrollReveals() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.build-card, .handle-card, .process-step-card, .suitability-card, .faq-item').forEach(el => {
    observer.observe(el);
  });
}
