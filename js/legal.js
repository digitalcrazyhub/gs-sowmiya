/**
 * GS SOWMIYA BUILDERS — LEGAL PAGES JAVASCRIPT
 * File: /js/legal.js
 * Handles:
 * 1. Global Component Initialization (Navbar, Footer, Floating Actions)
 * 2. Active Table of Contents Spy & Smooth Anchor Scrolling
 * 3. Print Functionality
 */

import { loadGlobalComponents } from './components.js';
import { initScrollReveal } from './animations.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load Navbar, Footer, and Floating Action Buttons
    try {
        await loadGlobalComponents({ activeNav: '' });
    } catch (err) {
        console.warn('Component auto-loader notice:', err);
    }

    // 2. Initialize Table of Contents Spy
    initTocSpy();

    // 3. Initialize Print Button
    initPrintButton();

    // 4. Subtle scroll reveals
    try {
        initScrollReveal();
    } catch {
        // Fallback gracefully
    }
});

function initTocSpy() {
    const tocLinks = document.querySelectorAll('.legal-toc-link');
    const articles = document.querySelectorAll('.legal-article');

    if (!tocLinks.length || !articles.length) return;

    // Smooth scroll on click
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                    history.pushState(null, '', targetId);
                }
            }
        });
    });

    // IntersectionObserver to highlight current active article in Table of Contents
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                tocLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('is-active');
                    } else {
                        link.classList.remove('is-active');
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0
    });

    articles.forEach(article => observer.observe(article));
}

function initPrintButton() {
    const printBtns = document.querySelectorAll('[data-action="print-legal"]');
    printBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.print();
        });
    });
}
