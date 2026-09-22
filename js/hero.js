/**
 * GS SOWMIYA BUILDERS - FULL-SCREEN CAROUSEL HERO CONTROLLER
 * Matching User's Reference Layout:
 * 1. 4 Full-Screen High-Resolution Carousel Background Images with Ken Burns scale & smooth crossfade
 * 2. Left-aligned content: Red Brand Icon badge, bold white heading, clean description, red CTA button
 * 3. Bottom-Left Target Dots (◎ • • •) with click navigation
 * 4. Bottom-Right Service Tabs with active white underline indicator and click navigation
 * 5. Lightbox modal viewer for high-res architectural viewing
 * 6. Touch-swipe gestures and keyboard navigation
 */

import { HERO_SLIDES } from './config.js';
import gsap from 'gsap';

export function initHeroSlider() {
    const heroSection = document.querySelector('.hero-section');
    const bgSlides = document.querySelectorAll('.hero-bg-slide');
    const contentWrap = document.querySelector('.hero-content-wrap');
    const titleEl = document.querySelector('.hero-title');
    const descEl = document.querySelector('.hero-description');
    const ctaBtn = document.getElementById('hero-cta-btn') || document.querySelector('.hero-primary-cta');
    const dots = document.querySelectorAll('.hero-dot');
    const tabItems = document.querySelectorAll('.hero-tab-item');

    // Lightbox Elements
    const lightboxTrigger = document.getElementById('hero-lightbox-btn');
    const lightboxEl = document.getElementById('hero-lightbox');
    const lightboxBackdrop = document.getElementById('hero-lightbox-backdrop');
    const lightboxClose = document.getElementById('hero-lightbox-close');
    const lightboxImg = document.getElementById('hero-lightbox-img');
    const lightboxTitle = document.getElementById('hero-lightbox-title');
    const lightboxDesc = document.getElementById('hero-lightbox-desc');
    const lightboxCounter = document.getElementById('hero-lightbox-counter');
    const lightboxPrev = document.getElementById('hero-lightbox-prev');
    const lightboxNext = document.getElementById('hero-lightbox-next');

    if (!heroSection || !titleEl) return;

    let currentIndex = 0;
    const totalSlides = HERO_SLIDES.length;
    let isTransitioning = false;
    let isPaused = false;
    let isLightboxOpen = false;
    let autoplayTimer = null;
    const AUTOPLAY_INTERVAL = 6000; // 6 seconds

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- 1. Update Slide Transition ---
    function updateSlide(index, direction = 'next') {
        if (isTransitioning) return;
        isTransitioning = true;

        const data = HERO_SLIDES[index];

        // A. Background Slides Crossfade & Scale
        bgSlides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('is-active');
                slide.setAttribute('aria-hidden', 'false');
                const img = slide.querySelector('.hero-bg-img');
                if (img && !prefersReducedMotion) {
                    gsap.fromTo(img, 
                        { scale: 1.05 }, 
                        { scale: 1.0, duration: AUTOPLAY_INTERVAL / 1000, ease: 'power1.out' }
                    );
                }
            } else {
                slide.classList.remove('is-active');
                slide.setAttribute('aria-hidden', 'true');
            }
        });

        // B. Update Bottom Left Dots (◎ • • •)
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('is-active');
                dot.setAttribute('aria-selected', 'true');
            } else {
                dot.classList.remove('is-active');
                dot.setAttribute('aria-selected', 'false');
            }
        });

        // C. Update Bottom Right Service Tabs (with underline indicator)
        tabItems.forEach((tab, i) => {
            if (i === index) {
                tab.classList.add('is-active');
                tab.setAttribute('aria-selected', 'true');
            } else {
                tab.classList.remove('is-active');
                tab.setAttribute('aria-selected', 'false');
            }
        });

        // D. Update Lightbox if open
        if (isLightboxOpen) {
            updateLightboxContent(index);
        }

        // E. Text Content Transition
        if (prefersReducedMotion) {
            titleEl.innerHTML = data.title;
            descEl.textContent = data.description;
            if (ctaBtn && data.buttons[0]) {
                const span = ctaBtn.querySelector('span');
                if (span) span.textContent = data.buttons[0].text;
                ctaBtn.setAttribute('href', data.buttons[0].href);
            }
            currentIndex = index;
            isTransitioning = false;
            resetAutoplay();
            return;
        }

        // Smooth GSAP text entrance & exit
        const exitElements = [titleEl, descEl, ctaBtn].filter(Boolean);
        const yExit = direction === 'next' ? -14 : 14;

        gsap.to(exitElements, {
            y: yExit,
            opacity: 0,
            duration: 0.24,
            stagger: 0.03,
            ease: 'power2.in',
            onComplete: () => {
                titleEl.innerHTML = data.title;
                descEl.textContent = data.description;

                if (ctaBtn && data.buttons[0]) {
                    const span = ctaBtn.querySelector('span');
                    if (span) span.textContent = data.buttons[0].text;
                    ctaBtn.setAttribute('href', data.buttons[0].href);
                }

                const yEnter = direction === 'next' ? 18 : -18;
                gsap.fromTo([titleEl, descEl, ctaBtn].filter(Boolean),
                    { y: yEnter, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out' }
                );

                currentIndex = index;
                setTimeout(() => {
                    isTransitioning = false;
                }, 300);
            }
        });

        resetAutoplay();
    }

    function nextSlide() {
        const nextIdx = (currentIndex + 1) % totalSlides;
        updateSlide(nextIdx, 'next');
    }

    function prevSlide() {
        const prevIdx = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide(prevIdx, 'prev');
    }

    // --- 2. Autoplay Loop ---
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
            if (!isPaused && !isLightboxOpen) {
                nextSlide();
            }
        }, AUTOPLAY_INTERVAL);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // --- 3. Lightbox Functionality ---
    function openLightbox(idx = currentIndex) {
        if (!lightboxEl) return;
        isLightboxOpen = true;
        stopAutoplay();

        updateLightboxContent(idx);

        lightboxEl.classList.add('is-open');
        lightboxEl.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            lightboxClose?.focus();
        }, 100);
    }

    function closeLightbox() {
        if (!lightboxEl) return;
        isLightboxOpen = false;
        lightboxEl.classList.remove('is-open');
        lightboxEl.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (!isPaused) {
            startAutoplay();
        }
        lightboxTrigger?.focus();
    }

    function updateLightboxContent(idx) {
        const data = HERO_SLIDES[idx];
        if (!data) return;

        if (lightboxImg) {
            lightboxImg.src = data.image;
            lightboxImg.alt = `${data.title.replace(/<br>/g, ' ')} - Architectural Detail`;
        }
        if (lightboxTitle) {
            lightboxTitle.innerHTML = data.title;
        }
        if (lightboxDesc) {
            lightboxDesc.textContent = data.description;
        }
        if (lightboxCounter) {
            lightboxCounter.textContent = `${data.id} / 0${totalSlides}`;
        }
    }

    function nextLightboxImage() {
        const nextIdx = (currentIndex + 1) % totalSlides;
        updateSlide(nextIdx, 'next');
    }

    function prevLightboxImage() {
        const prevIdx = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide(prevIdx, 'prev');
    }

    // --- 4. Event Listeners ---

    // Click Dots Navigation (◎ • • •)
    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetIdx = parseInt(dot.dataset.index, 10);
            if (!isNaN(targetIdx) && targetIdx !== currentIndex) {
                updateSlide(targetIdx, targetIdx > currentIndex ? 'next' : 'prev');
            }
        });
    });

    // Click Service Tabs Navigation
    tabItems.forEach((tab) => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetIdx = parseInt(tab.dataset.index, 10);
            if (!isNaN(targetIdx) && targetIdx !== currentIndex) {
                updateSlide(targetIdx, targetIdx > currentIndex ? 'next' : 'prev');
            }
        });
    });

    // Lightbox Controls
    lightboxTrigger?.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(currentIndex);
    });

    lightboxClose?.addEventListener('click', (e) => {
        e.preventDefault();
        closeLightbox();
    });

    lightboxBackdrop?.addEventListener('click', (e) => {
        e.preventDefault();
        closeLightbox();
    });

    lightboxPrev?.addEventListener('click', (e) => {
        e.preventDefault();
        prevLightboxImage();
    });

    lightboxNext?.addEventListener('click', (e) => {
        e.preventDefault();
        nextLightboxImage();
    });

    // Pause Autoplay on Hover over Hero Content
    contentWrap?.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    contentWrap?.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (isLightboxOpen) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                nextLightboxImage();
            } else if (e.key === 'ArrowLeft') {
                prevLightboxImage();
            }
            return;
        }

        if (window.scrollY < window.innerHeight * 0.75) {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        }
    });

    // Touch Swipe Navigation for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
            if (deltaX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Start Autoplay
    startAutoplay();
}
