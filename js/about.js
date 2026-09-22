/**
 * GS SOWMIYA BUILDERS - ABOUT PAGE APPLICATION SCRIPT
 * Utilizes the centralized global component architecture:
 * Reuses COMMON NAVBAR, PAGE BANNER, FOOTER, and FLOATING ACTIONS.
 */

import { loadGlobalComponents } from './components.js';
import { 
    initScrollReveal, 
    initCounterAnimation, 
    initCardTilt 
} from './animations.js';
import { initTestimonials } from './testimonials.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Centralized Global Components Initialization
    await loadGlobalComponents({
        activeNav: 'about',
        banner: {
            title: 'Second-Generation Craftsmanship.<br>Engineering Rigor.',
            eyebrow: 'Corporate Heritage & Engineering Integrity',
            breadcrumb: 'ABOUT US',
            desc: 'Backed by 30+ years of on-site building contracting wisdom, GS Sowmiya Builders Private Limited delivers residential homes, modern apartments, and fair joint ventures across Chennai.',
            bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80'
        }
    });

    // 2. Page Specific GSAP Scroll Reveals & Animations
    initScrollReveal();
    initCounterAnimation();
    initCardTilt();

    // 3. Testimonials (if present)
    initTestimonials();
});

