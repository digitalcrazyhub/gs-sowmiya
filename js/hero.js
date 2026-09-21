/**
 * GS SOWMIYA BUILDERS - ONE PERSISTENT BACKGROUND VIDEO + 4-SLIDE ARCHITECTURAL HERO
 * Master Controller:
 * 1. ONE common full-screen background video (plays continuously, never reloaded)
 * 2. 4 content slides (Building the Future, Spaces Made for Living, Built for Business, From Vision to Reality)
 * 3. 3D Pointer Tilt & Dynamic Light Sheen on foreground content panel only (video never tilts)
 * 4. Staggered cinematic GSAP transitions for foreground content
 * 5. Autoplay (7s), progress bar, slide counter (01 / 04), previous/next buttons
 * 6. Touch swipe support (left/right) with zero vertical scroll interference
 * 7. Keyboard navigation (ArrowLeft / ArrowRight) & Reduced-motion compliance
 */

import { HERO_SLIDES } from './config.js';
import gsap from 'gsap';

export function initHeroSlider() {
    const heroSection = document.querySelector('.hero-section');
    const heroFrame = document.querySelector('.hero-frame');
    const contentCard = document.getElementById('hero-content-card');
    const titleEl = document.querySelector('.hero-title');
    const categoryEl = document.querySelector('.hero-category-label');
    const descEl = document.querySelector('.hero-description');
    const ctaGroup = document.querySelector('.hero-cta-group');
    const primaryCta = document.querySelector('.hero-primary-cta');
    const secondaryCta = document.querySelector('.hero-secondary-cta');
    const counterEl = document.querySelector('.hero-counter');
    const progressFill = document.querySelector('.hero-progress-fill');
    const prevBtn = document.querySelector('.hero-prev-btn');
    const nextBtn = document.querySelector('.hero-next-btn');
    const indicators = document.querySelectorAll('.hero-indicator');
    const pills = document.querySelectorAll('.pill-filter-item');
    
    // Featured Card Elements
    const featuredCard = document.getElementById('hero-featured-card');
    const featuredThumb = featuredCard?.querySelector('.featured-card-thumb');
    const featuredTag = featuredCard?.querySelector('.featured-card-tag');
    const featuredTitle = featuredCard?.querySelector('.featured-card-title');
    const featuredSpecs = featuredCard?.querySelector('.featured-card-specs');
    const featuredBtn = featuredCard?.querySelector('.featured-card-btn');

    if (!heroSection || !titleEl) return;

    let currentIndex = 0;
    const totalSlides = HERO_SLIDES.length;
    let isTransitioning = false;
    let isPaused = false;
    const AUTOPLAY_DURATION = 7000; // 7 seconds per slide

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- 1. Content Slide Transitions (Video stays playing continuously) ---
    function updateSlide(index, direction = 'next') {
        if (isTransitioning) return;
        isTransitioning = true;

        const data = HERO_SLIDES[index];

        // Update Counter Display (e.g. 01 / 04)
        if (counterEl) {
            counterEl.textContent = `${data.id} / 0${totalSlides}`;
        }

        // Update Slide Indicators (01, 02, 03, 04)
        indicators.forEach((ind, i) => {
            if (i === index) {
                ind.classList.add('is-active');
                ind.setAttribute('aria-current', 'true');
            } else {
                ind.classList.remove('is-active');
                ind.removeAttribute('aria-current');
            }
        });

        // Sync Bottom Architectural Pills
        pills.forEach(pill => {
            const cat = pill.dataset.category;
            if (cat === data.category || (cat === 'ALL' && index === 0)) {
                pill.classList.add('is-active');
                pill.setAttribute('aria-selected', 'true');
            } else {
                pill.classList.remove('is-active');
                pill.setAttribute('aria-selected', 'false');
            }
        });

        if (prefersReducedMotion) {
            // Simplified instant crossfade for reduced-motion accessibility
            categoryEl.textContent = data.category;
            titleEl.innerHTML = data.title;
            descEl.textContent = data.description;
            if (primaryCta && data.buttons[0]) {
                const textSpan = primaryCta.querySelector('span:first-child');
                if (textSpan) textSpan.textContent = data.buttons[0].text;
                primaryCta.setAttribute('href', data.buttons[0].href);
            }
            if (secondaryCta && data.buttons[1]) {
                const secSpan = secondaryCta.querySelector('span:first-child');
                if (secSpan) secSpan.textContent = data.buttons[1].text;
                secondaryCta.setAttribute('href', data.buttons[1].href);
            }
            if (featuredCard && data.featuredCard) {
                featuredThumb.src = data.featuredCard.image;
                featuredThumb.alt = data.featuredCard.title;
                featuredTag.textContent = data.featuredCard.tag;
                featuredTitle.textContent = data.featuredCard.title;
                featuredSpecs.textContent = data.featuredCard.specs;
            }
            currentIndex = index;
            isTransitioning = false;
            restartAutoplayProgress();
            return;
        }

        // Cinematic GSAP Transition: Exit current content
        const exitElements = [categoryEl, titleEl, descEl, ctaGroup, featuredCard].filter(Boolean);
        const yExit = direction === 'next' ? -18 : 18;

        gsap.to(exitElements, {
            y: yExit,
            opacity: 0,
            duration: 0.32,
            stagger: 0.03,
            ease: 'power2.in',
            onComplete: () => {
                // Update Foreground Data
                categoryEl.textContent = data.category;
                titleEl.innerHTML = data.title;
                descEl.textContent = data.description;

                // Update Primary & Secondary CTA
                if (primaryCta && data.buttons[0]) {
                    const textSpan = primaryCta.querySelector('span:first-child');
                    if (textSpan) {
                        textSpan.textContent = data.buttons[0].text;
                    }
                    primaryCta.setAttribute('href', data.buttons[0].href);
                }
                if (secondaryCta && data.buttons[1]) {
                    const secSpan = secondaryCta.querySelector('span:first-child');
                    if (secSpan) {
                        secSpan.textContent = data.buttons[1].text;
                    }
                    secondaryCta.setAttribute('href', data.buttons[1].href);
                }

                // Update Featured Card (Bottom Right)
                if (featuredCard && data.featuredCard) {
                    if (featuredThumb) {
                        featuredThumb.src = data.featuredCard.image;
                        featuredThumb.alt = data.featuredCard.title;
                    }
                    if (featuredTag) featuredTag.textContent = data.featuredCard.tag;
                    if (featuredTitle) featuredTitle.textContent = data.featuredCard.title;
                    if (featuredSpecs) featuredSpecs.textContent = data.featuredCard.specs;
                    if (featuredBtn && data.buttons[0]) {
                        featuredBtn.setAttribute('href', data.buttons[0].href);
                    }
                }

                // Staggered Cinematic Reveal In
                const yEnter = direction === 'next' ? 22 : -22;
                gsap.fromTo([categoryEl, titleEl, descEl, ctaGroup],
                    { y: yEnter, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
                );

                if (featuredCard) {
                    gsap.fromTo(featuredCard,
                        { y: 16, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.7, delay: 0.12, ease: 'power3.out' }
                    );
                }

                currentIndex = index;
                setTimeout(() => {
                    isTransitioning = false;
                }, 400);

                restartAutoplayProgress();
            }
        });
    }

    function nextSlide() {
        const nextIdx = (currentIndex + 1) % totalSlides;
        updateSlide(nextIdx, 'next');
    }

    function prevSlide() {
        const prevIdx = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide(prevIdx, 'prev');
    }

    // --- 2. Autoplay & Progress Bar ---
    function restartAutoplayProgress() {
        if (!progressFill) return;
        gsap.killTweensOf(progressFill);
        gsap.fromTo(progressFill, 
            { width: '0%' },
            { 
                width: '100%', 
                duration: AUTOPLAY_DURATION / 1000, 
                ease: 'none',
                onComplete: () => {
                    if (!isPaused) {
                        nextSlide();
                    }
                }
            }
        );
    }

    // --- 3. 3D Tilt & Light Response (Only on Foreground Content Card, NOT Video) ---
    function init3DCardTilt() {
        if (prefersReducedMotion) return;
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (isTouch || window.innerWidth < 1024) return;
        if (!contentCard || !heroFrame) return;

        let rafId = null;
        let targetRotateX = 0;
        let targetRotateY = 0;
        let pointerXPercent = 50;
        let pointerYPercent = 50;

        function onMouseMove(e) {
            const rect = heroFrame.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;
            const normX = Math.max(0, Math.min(1, relX / rect.width));
            const normY = Math.max(0, Math.min(1, relY / rect.height));

            // Restrained, subtle architectural angles (max ±3.5 degrees)
            targetRotateY = (normX - 0.5) * 6;
            targetRotateX = (0.5 - normY) * 5;

            pointerXPercent = (normX * 100).toFixed(1);
            pointerYPercent = (normY * 100).toFixed(1);

            if (!rafId) {
                rafId = requestAnimationFrame(updateCardTransform);
            }
        }

        function updateCardTransform() {
            // Apply 3D perspective and subtle depth rotation
            contentCard.style.transform = `perspective(1200px) rotateX(${targetRotateX.toFixed(2)}deg) rotateY(${targetRotateY.toFixed(2)}deg) translateZ(12px)`;
            
            // Update CSS custom properties for the subtle dynamic light sheen
            contentCard.style.setProperty('--pointer-x', `${pointerXPercent}%`);
            contentCard.style.setProperty('--pointer-y', `${pointerYPercent}%`);
            
            rafId = null;
        }

        function onMouseLeave() {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            // Silky smooth reset back to neutral
            gsap.to(contentCard, {
                rotateX: 0,
                rotateY: 0,
                z: 0,
                duration: 0.6,
                ease: 'power2.out',
                onUpdate: () => {
                    contentCard.style.setProperty('--pointer-x', '50%');
                    contentCard.style.setProperty('--pointer-y', '50%');
                }
            });
        }

        heroFrame.addEventListener('mousemove', onMouseMove, { passive: true });
        heroFrame.addEventListener('mouseleave', onMouseLeave);
    }

    // --- 4. Event Listeners ---
    nextBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
    });

    prevBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
    });

    // Indicator clicks (01, 02, 03, 04)
    indicators.forEach((indicator) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            const targetIdx = parseInt(indicator.dataset.index, 10);
            if (!isNaN(targetIdx) && targetIdx !== currentIndex) {
                updateSlide(targetIdx, targetIdx > currentIndex ? 'next' : 'prev');
            }
        });
    });

    // Bottom Filter Pills click
    pills.forEach((pill) => {
        pill.addEventListener('click', () => {
            const cat = pill.dataset.category;
            let targetIdx = 0;
            if (cat === 'RESIDENTIAL') targetIdx = 1;
            else if (cat === 'COMMERCIAL') targetIdx = 2;
            else if (cat === 'SOLUTIONS') targetIdx = 3;
            else targetIdx = 0;

            if (targetIdx !== currentIndex) {
                updateSlide(targetIdx, targetIdx > currentIndex ? 'next' : 'prev');
            }
        });
    });

    // Pause autoplay on hover over hero frame
    heroFrame?.addEventListener('mouseenter', () => {
        isPaused = true;
        gsap.getTweensOf(progressFill).forEach(t => t.pause());
    });

    heroFrame?.addEventListener('mouseleave', () => {
        isPaused = false;
        gsap.getTweensOf(progressFill).forEach(t => t.play());
    });

    // Keyboard navigation (ArrowLeft / ArrowRight when hero in view)
    document.addEventListener('keydown', (e) => {
        if (window.scrollY < window.innerHeight * 0.75) {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        }
    });

    // Touch Swipe Navigation for mobile devices
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
        // Require horizontal swipe to be distinct and significantly larger than vertical movement
        if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
            if (deltaX < 0) {
                // Swiped Left -> Next Slide
                nextSlide();
            } else {
                // Swiped Right -> Previous Slide
                prevSlide();
            }
        }
    }

    // Initialize 3D Card Tilt on foreground card
    init3DCardTilt();

    // Start Autoplay Progress
    restartAutoplayProgress();
}
