/**
 * Interiors Page Controller
 * GS Sowmiya Builders Private Limited
 */
import { loadGlobalComponents } from '../components.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadGlobalComponents({
      activeNav: 'service-interiors',
      banner: {
        title: 'Residential Interiors & Woodwork',
        eyebrow: '05 / Interior Execution',
        breadcrumb: 'INTERIORS',
        desc: 'Custom modular kitchens, wardrobe systems, false ceilings, lighting design, and precision woodwork integrated seamlessly with residential building construction in Chennai.',
        bgImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85'
      }
    });

    initFaqAccordion();
    initScrollReveals();
  } catch (err) {
    console.error('Error initializing Interiors page:', err);
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
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('is-open')) {
          other.classList.remove('is-open');
          const otherBtn = other.querySelector('.faq-question-btn');
          const otherPanel = other.querySelector('.faq-answer-panel');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

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
