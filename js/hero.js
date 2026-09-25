/**
 * GS SOWMIYA BUILDERS - PURE IMAGE CAROUSEL HERO CONTROLLER (1920x500)
 * 4 Carousel images with navigation arrows only. No text, no lightbox, no gradient.
 */
import gsap from 'gsap';

export function initHeroSlider() {
    const heroSection = document.querySelector('.hero-section');
    const bgSlides = document.querySelectorAll('.hero-bg-slide');
    const prevBtn = document.getElementById('hero-arrow-prev');
    const nextBtn = document.getElementById('hero-arrow-next');

    if (!heroSection || bgSlides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = bgSlides.length;
    let isTransitioning = false;
    let autoplayTimer = null;
    const AUTOPLAY_INTERVAL = 6000; // 6 seconds

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function updateSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        bgSlides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('is-active');
                slide.setAttribute('aria-hidden', 'false');
                const img = slide.querySelector('.hero-bg-img');
                if (img && !prefersReducedMotion) {
                    gsap.fromTo(img, 
                        { scale: 1.04 }, 
                        { scale: 1.0, duration: AUTOPLAY_INTERVAL / 1000, ease: 'power1.out' }
                    );
                }
            } else {
                slide.classList.remove('is-active');
                slide.setAttribute('aria-hidden', 'true');
            }
        });

        currentIndex = index;
        setTimeout(() => {
            isTransitioning = false;
        }, 400);

        resetAutoplay();
    }

    function nextSlide() {
        const nextIdx = (currentIndex + 1) % totalSlides;
        updateSlide(nextIdx);
    }

    function prevSlide() {
        const prevIdx = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide(prevIdx);
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
            nextSlide();
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

    // Event Listeners for Arrows
    nextBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
    });

    prevBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
    });

    // Pause on hover
    heroSection.addEventListener('mouseenter', stopAutoplay);
    heroSection.addEventListener('mouseleave', startAutoplay);

    // Touch Swipe Navigation for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;
        if (Math.abs(deltaX) > 40) {
            if (deltaX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }, { passive: true });

    // Start
    startAutoplay();
}
