/**
 * GS SOWMIYA BUILDERS — RESIDENTIAL CONSTRUCTION
 * Page-specific logic: global component loader, FAQ accordion, scroll reveals
 */

import { loadGlobalComponents } from '/js/components.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialize global components (Navbar with dropdown, Footer, Floating Actions)
    await loadGlobalComponents();

    // 2. Initialize FAQ Accordion with accessible single-open and keyboard support
    initFaqAccordion();

    // 3. Scroll Reveal observer
    initScrollReveals();
});

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach((item, index) => {
        const btn = item.querySelector('.faq-question-btn');
        const panel = item.querySelector('.faq-answer-panel');

        if (!btn || !panel) return;

        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');

            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('is-open');
                const otherBtn = otherItem.querySelector('.faq-question-btn');
                const otherPanel = otherItem.querySelector('.faq-answer-panel');
                if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                if (otherPanel) otherPanel.style.maxHeight = '0px';
            });

            // Open target if was not open
            if (!isOpen) {
                item.classList.add('is-open');
                btn.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = `${panel.scrollHeight + 30}px`;
            }
        });

        // Keyboard navigation across FAQ items
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextItem = faqItems[index + 1] || faqItems[0];
                nextItem.querySelector('.faq-question-btn')?.focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevItem = faqItems[index - 1] || faqItems[faqItems.length - 1];
                prevItem.querySelector('.faq-question-btn')?.focus();
            }
        });
    });

    // Open first question by default for immediate engagement
    if (faqItems[0]) {
        const firstBtn = faqItems[0].querySelector('.faq-question-btn');
        const firstPanel = faqItems[0].querySelector('.faq-answer-panel');
        if (firstBtn && firstPanel) {
            faqItems[0].classList.add('is-open');
            firstBtn.setAttribute('aria-expanded', 'true');
            firstPanel.style.maxHeight = `${firstPanel.scrollHeight + 30}px`;
        }
    }
}

function initScrollReveals() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}
