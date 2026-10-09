/**
 * GS SOWMIYA BUILDERS - ABOUT PAGE APPLICATION SCRIPT
 * Utilizes the centralized global component architecture:
 * Reuses COMMON NAVBAR, PAGE BANNER, FOOTER, and FLOATING ACTIONS.
 */

import { loadGlobalComponents } from './components.js';
import { resolveAssetPath } from './site-paths.js';
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
            title: 'About Us',
            breadcrumb: 'ABOUT US',
            desc: 'Backed by 30+ years of on-site building contracting wisdom, GS Sowmiya Builders Private Limited delivers residential homes, modern apartments, and fair joint ventures across Chennai.',
            bgImage: resolveAssetPath('/image/page-banner.png')
        }
    });

    // 2. Page Specific GSAP Scroll Reveals & Animations
    initScrollReveal();
    initCounterAnimation();
    initCardTilt();

    // 3. Testimonials (if present)
    initTestimonials();
});

