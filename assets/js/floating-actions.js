/**
 * GS SOWMIYA BUILDERS - FLOATING ACTIONS COMPONENT
 * WhatsApp direct chat, Phone call, and Scroll-to-top with smooth animation.
 * Reusable across future inner pages.
 */

import { SITE_CONFIG } from './config.js';

export function initFloatingActions() {
    const whatsappBtn = document.querySelector('.floating-whatsapp');
    const phoneBtn = document.querySelector('.floating-phone');
    const scrollTopBtn = document.querySelector('.floating-scroll-top');

    // Configure URLs from central SITE_CONFIG
    if (whatsappBtn) {
        const cleanNumber = SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '');
        const encodedMsg = encodeURIComponent(SITE_CONFIG.contact.whatsappMessage);
        whatsappBtn.setAttribute('href', `https://wa.me/${cleanNumber}?text=${encodedMsg}`);
        whatsappBtn.setAttribute('target', '_blank');
        whatsappBtn.setAttribute('rel', 'noopener noreferrer');
    }

    if (phoneBtn) {
        phoneBtn.setAttribute('href', `tel:${SITE_CONFIG.contact.phone}`);
    }

    // Scroll to top visibility and click
    function handleScroll() {
        if (window.scrollY > 450) {
            scrollTopBtn?.classList.add('is-visible');
        } else {
            scrollTopBtn?.classList.remove('is-visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    scrollTopBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
