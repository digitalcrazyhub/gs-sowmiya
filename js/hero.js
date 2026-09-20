/**
 * GS SOWMIYA BUILDERS - 4-SLIDE CINEMATIC HERO COMPONENT
 * Full-screen architectural slider with GSAP transitions, slide counter,
 * progress indicator, bottom filter pills sync, and interactive controls.
 */

import { HERO_SLIDES } from './config.js';
import gsap from 'gsap';

export function initHeroSlider() {
    const slidesContainer = document.querySelector('.hero-slider');
    const heroFrame = document.querySelector('.hero-frame');
    const titleEl = document.querySelector('.hero-title');
    const categoryEl = document.querySelector('.hero-category-label');
    const descEl = document.querySelector('.hero-description');
    const counterEl = document.querySelector('.hero-counter');
    const progressFill = document.querySelector('.hero-progress-fill');
    const prevBtn = document.querySelector('.hero-prev-btn');
    const nextBtn = document.querySelector('.hero-next-btn');
    const pills = document.querySelectorAll('.pill-filter-item');
    
    // Featured Card Elements
    const featuredCard = document.querySelector('.hero-featured-card');
    const featuredThumb = document.querySelector('.featured-card-thumb');
    const featuredTag = document.querySelector('.featured-card-tag');
    const featuredTitle = document.querySelector('.featured-card-title');
    const featuredSpecs = document.querySelector('.featured-card-specs');

    // Buttons in hero body
    const primaryCta = document.querySelector('.hero-primary-cta');
    const secondaryCta = document.querySelector('.hero-secondary-cta');

    if (!slidesContainer || !titleEl) return;

    let currentIndex = 0;
    const totalSlides = HERO_SLIDES.length;
    let autoplayTimer = null;
    let isTransitioning = false;
    let isPaused = false;
    const AUTOPLAY_DURATION = 7000; // 7 seconds

    // Render background slides
    slidesContainer.innerHTML = HERO_SLIDES.map((slide, idx) => `
        <div class="hero-slide ${idx === 0 ? 'is-active' : ''}" data-index="${idx}">
            <div class="hero-slide-bg" style="background-image: url('${slide.image}');"></div>
        </div>
    `).join('');

    const slideElements = document.querySelectorAll('.hero-slide');

    function updateSlide(index, direction = 'next') {
        if (isTransitioning) return;
        isTransitioning = true;

        const currentSlide = slideElements[currentIndex];
        const nextSlide = slideElements[index];
        const data = HERO_SLIDES[index];

        // Animate counter and progress
        if (counterEl) {
            counterEl.textContent = `${data.id} / 0${totalSlides}`;
        }

        // Animate Text out
        gsap.to([categoryEl, titleEl, descEl, primaryCta, secondaryCta], {
            y: direction === 'next' ? -20 : 20,
            opacity: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: 'power2.in',
            onComplete: () => {
                // Update text content
                categoryEl.textContent = data.category;
                titleEl.innerHTML = data.title;
                descEl.textContent = data.description;
                
                if (primaryCta) {
                    const textSpan = primaryCta.querySelector('span:first-child');
                    if (textSpan) {
                        textSpan.textContent = data.buttons[0].text;
                    } else {
                        primaryCta.innerHTML = `<span>${data.buttons[0].text}</span><span class="btn-icon-circle"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></span>`;
                    }
                    primaryCta.setAttribute('href', data.buttons[0].href);
                }

                // Update featured card
                if (featuredCard && data.featuredCard) {
                    featuredThumb.src = data.featuredCard.image;
                    featuredThumb.alt = data.featuredCard.title;
                    featuredTag.textContent = data.featuredCard.tag;
                    featuredTitle.textContent = data.featuredCard.title;
                    featuredSpecs.textContent = data.featuredCard.specs;
                }

                // Animate Text in
                gsap.fromTo([categoryEl, titleEl, descEl, primaryCta, secondaryCta], 
                    { y: direction === 'next' ? 24 : -24, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
                );
            }
        });

        // Transition background slides
        currentSlide.classList.remove('is-active');
        nextSlide.classList.add('is-active');

        // Sync pills
        pills.forEach(pill => {
            const cat = pill.dataset.category;
            if (cat === data.category || (cat === 'ALL' && index === 0)) {
                pill.classList.add('is-active');
            } else {
                pill.classList.remove('is-active');
            }
        });

        currentIndex = index;

        setTimeout(() => {
            isTransitioning = false;
        }, 600);

        restartAutoplayProgress();
    }

    function nextSlide() {
        const nextIdx = (currentIndex + 1) % totalSlides;
        updateSlide(nextIdx, 'next');
    }

    function prevSlide() {
        const prevIdx = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide(prevIdx, 'prev');
    }

    // Progress bar animation
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

    // Event listeners
    nextBtn?.addEventListener('click', () => {
        nextSlide();
    });

    prevBtn?.addEventListener('click', () => {
        prevSlide();
    });

    // Pill category triggers
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

    // Pause on hover
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
        if (window.scrollY < window.innerHeight * 0.7) {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        }
    });

    // Start progress
    restartAutoplayProgress();
}
