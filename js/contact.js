/**
 * ==========================================================================
 * GS SOWMIYA BUILDERS — CONTACT PAGE LOGIC
 * File: asset/js/contact.js
 * Handles:
 * 1. Global Component Initialization (Navbar, Footer, Floating Actions)
 * 2. Real-time Form Validation (Accessible inline errors)
 * 3. Configurable Submission Handling (REST / Local / Formspree)
 * 4. Interactive Office Directions & WhatsApp Connect
 * ==========================================================================
 */

import { loadGlobalComponents } from '/js/components.js';
import { SITE_CONFIG } from '/js/config.js';
import { initScrollReveal, initCardTilt } from '/js/animations.js';
import { initContactFormHandler } from '/js/contact-form.js';

/**
 * Initialize page components and interactions
 */
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load Navbar, Page Banner, Footer, and Floating Action Buttons
    try {
        await loadGlobalComponents({
            activeNav: 'contact',
            banner: {
                breadcrumb: 'CONTACT US',
                title: "Contact Us",
                bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85'
            }
        });
    } catch (err) {
        console.warn('Component auto-loader notice:', err);
    }

    // 2. Initialize Enquiry Form System
    initContactFormHandler('#contact-enquiry-form', { source: 'contact' });

    // 3. Initialize Interactive Triggers & Smooth Scrolling
    initInteractionTriggers();

    // 4. Scroll Reveals & 3D Card Tilt
    initScrollReveal();
    initCardTilt();
});



/**
 * Interactive triggers: smooth scrolling to form, direct call/whatsapp shortcuts
 */
function initInteractionTriggers() {
    // Scroll to form trigger
    const scrollToFormBtns = document.querySelectorAll('[data-action="scroll-to-enquiry"]');
    const formSection = document.getElementById('enquiry-section');

    scrollToFormBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
                const nameInput = document.getElementById('contact-name');
                if (nameInput) {
                    setTimeout(() => nameInput.focus(), 600);
                }
            }
        });
    });

    // WhatsApp action links
    const waButtons = document.querySelectorAll('[data-action="open-whatsapp"]');
    waButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const phone = SITE_CONFIG.contact.whatsappRaw || "917010517729";
            const text = encodeURIComponent("Hello GS Sowmiya Builders, I would like to enquire about an upcoming construction / joint venture project in Chennai.");
            window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
        });
    });
}
