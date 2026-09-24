/**
 * Joint Venture Page Controller
 * GS Sowmiya Builders Private Limited
 */
import { loadGlobalComponents } from '../components.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadGlobalComponents({
      activeNav: 'service-joint-venture',
      banner: {
        title: 'Joint Venture Property Development',
        eyebrow: '02 / Development Partnerships',
        breadcrumb: 'JOINT VENTURE',
        desc: 'Partnering with landowners in Chennai for transparent property development, clear legal structuring, maximum FSI utilization, and high-quality construction execution.',
        bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85'
      }
    });

    initFaqAccordion();
    initScrollReveals();
  } catch (err) {
    console.error('Error initializing Joint Venture page:', err);
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
