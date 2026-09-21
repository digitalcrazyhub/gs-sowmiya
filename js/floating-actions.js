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

    // Configure WhatsApp URL from central SITE_CONFIG
    if (whatsappBtn) {
        const cleanNumber = (SITE_CONFIG.contact.whatsapp || '+917010517729').replace(/[^0-9]/g, '');
        const encodedMsg = encodeURIComponent(
            SITE_CONFIG.contact.whatsappMessage || 
            "Hello GS Sowmiya Builders, I would like to enquire about construction / joint venture / apartment projects."
        );
        whatsappBtn.setAttribute('href', `https://wa.me/${cleanNumber}?text=${encodedMsg}`);
        whatsappBtn.setAttribute('target', '_blank');
        whatsappBtn.setAttribute('rel', 'noopener noreferrer');
    }

    // Configure phone URL sanitized without spaces
    if (phoneBtn) {
        const cleanPhone = (SITE_CONFIG.contact.phone || '+91 70105 17729').replace(/[^0-9+]/g, '');
        phoneBtn.setAttribute('href', `tel:${cleanPhone}`);
    }

    // Scroll-to-top button functionality with idempotent listeners
    if (scrollTopBtn && !scrollTopBtn.dataset.bound) {
        scrollTopBtn.dataset.bound = 'true';

        const handleScroll = () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('is-visible');
            } else {
                scrollTopBtn.classList.remove('is-visible');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Accessibility keyboard support
        scrollTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
}

