/**
 * GS SOWMIYA BUILDERS - TESTIMONIALS CAROUSEL
 * Clean cinematic reviews with quote presentation, prev/next controls, counter,
 * and high-performance mobile touch/pointer swipe navigation.
 */

import { TESTIMONIALS } from './config.js';
import gsap from 'https://esm.sh/gsap@3.13.0?bundle';

export function initTestimonials() {
    const sliderContainer = document.querySelector('.testimonial-slider');
    const imageContainer = document.querySelector('.testimonial-images-slider');
    const prevBtn = document.querySelector('.testi-prev-btn');
    const nextBtn = document.querySelector('.testi-next-btn');
    const counterEl = document.querySelector('.testi-counter');
    const stage = document.querySelector('.testimonial-stage');

    if (!sliderContainer || !imageContainer) return;

    // Render left project image slides
    imageContainer.innerHTML = TESTIMONIALS.map((item, idx) => `
        <div class="testimonial-img-slide ${idx === 0 ? 'is-active' : ''}" data-index="${idx}">
            <img src="${item.image}" alt="${item.author} - ${item.project}" loading="lazy">
        </div>
    `).join('');

    // Render testimonial review content slides
    sliderContainer.innerHTML = TESTIMONIALS.map((item, idx) => `
        <div class="testimonial-slide ${idx === 0 ? 'is-active' : ''}" data-index="${idx}">
            <div>
                <div class="testimonial-quote-icon" aria-hidden="true">“</div>
                <p class="testimonial-text">"${item.quote}"</p>
            </div>
            <div class="testimonial-author-meta">
                <div class="author-details">
                    <h4>${item.author}</h4>
                    <p>${item.role}, ${item.company}</p>
                </div>
                <span class="author-project-tag">${item.project}</span>
            </div>
        </div>
    `).join('');

    const slides = sliderContainer.querySelectorAll('.testimonial-slide');
    const imgSlides = imageContainer.querySelectorAll('.testimonial-img-slide');
    let currentIndex = 0;
    let isAnimating = false;
    let isSwiping = false;
    const total = TESTIMONIALS.length;

    function updateCounter(idx) {
        if (counterEl) {
            counterEl.textContent = `0${idx + 1} / 0${total}`;
        }
    }

    function showSlide(index) {
        if (index === currentIndex || isAnimating) return;
        isAnimating = true;

        const current = slides[currentIndex];
        const next = slides[index];
        const currentImg = imgSlides[currentIndex];
        const nextImg = imgSlides[index];

        gsap.to(current, {
            opacity: 0,
            y: -15,
            duration: 0.3,
            onComplete: () => {
                current.classList.remove('is-active');
                next.classList.add('is-active');
                gsap.fromTo(next, 
                    { opacity: 0, y: 15 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.45, 
                        ease: 'power2.out',
                        onComplete: () => {
                            isAnimating = false;
                            isSwiping = false;
                        }
                    }
                );
            }
        });

        if (currentImg && nextImg && currentImg !== nextImg) {
            currentImg.classList.remove('is-active');
            nextImg.classList.add('is-active');
        }

        currentIndex = index;
        updateCounter(currentIndex);
    }

    prevBtn?.addEventListener('click', () => {
        if (isAnimating) return;
        const prevIdx = (currentIndex - 1 + total) % total;
        showSlide(prevIdx);
    });

    nextBtn?.addEventListener('click', () => {
        if (isAnimating) return;
        const nextIdx = (currentIndex + 1) % total;
        showSlide(nextIdx);
    });

    // =========================================================================
    // MOBILE TOUCH/POINTER SWIPE GESTURE HANDLING
    // =========================================================================
    if (stage) {
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        let isPointerDown = false;
        let isHorizontalSwipe = false;
        let activePointerId = null;
        const SWIPE_THRESHOLD = 50; // Threshold: 50px

        // Pointer Events (primary implementation for modern mobile browsers)
        stage.addEventListener('pointerdown', (e) => {
            // Ignore if gesture starts on navigation buttons or links
            if (e.target.closest('button, a, .testi-prev-btn, .testi-next-btn')) {
                return;
            }

            // Only respond to touch/pen or mobile screen widths (keep desktop mouse behavior untouched)
            const isTouchOrMobile = e.pointerType === 'touch' || e.pointerType === 'pen' || window.innerWidth <= 1024;
            if (!isTouchOrMobile) {
                return;
            }

            if (isAnimating || isSwiping) return;

            startX = e.clientX;
            startY = e.clientY;
            currentX = startX;
            currentY = startY;
            isPointerDown = true;
            isHorizontalSwipe = false;
            activePointerId = e.pointerId;
        });

        stage.addEventListener('pointermove', (e) => {
            if (!isPointerDown || isSwiping || isAnimating) return;
            if (activePointerId !== null && e.pointerId !== activePointerId) return;

            currentX = e.clientX;
            currentY = e.clientY;
            const deltaX = currentX - startX;
            const deltaY = currentY - startY;

            // Only classify as a carousel gesture when horizontal movement is clearly greater than vertical
            if (!isHorizontalSwipe) {
                if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
                    if (Math.abs(deltaX) > Math.abs(deltaY)) {
                        isHorizontalSwipe = true;
                        // Capture pointer once horizontal intent is confirmed
                        try {
                            if (typeof stage.setPointerCapture === 'function') {
                                stage.setPointerCapture(e.pointerId);
                            }
                        } catch (_) {}
                    } else {
                        // Vertical scroll detected: allow normal page scrolling
                        isPointerDown = false;
                        return;
                    }
                }
            }

            if (isHorizontalSwipe) {
                if (e.cancelable) {
                    e.preventDefault();
                }

                // Check swipe threshold
                if (deltaX <= -SWIPE_THRESHOLD) {
                    isSwiping = true;
                    const nextIdx = (currentIndex + 1) % total;
                    showSlide(nextIdx);
                } else if (deltaX >= SWIPE_THRESHOLD) {
                    isSwiping = true;
                    const prevIdx = (currentIndex - 1 + total) % total;
                    showSlide(prevIdx);
                }
            }
        });

        const handlePointerEnd = (e) => {
            if (!isPointerDown) return;
            if (activePointerId !== null && e.pointerId !== undefined && e.pointerId !== activePointerId) return;

            // Release pointer capture safely
            if (activePointerId !== null) {
                try {
                    if (typeof stage.releasePointerCapture === 'function' && stage.hasPointerCapture && stage.hasPointerCapture(activePointerId)) {
                        stage.releasePointerCapture(activePointerId);
                    }
                } catch (_) {}
            }

            // Check swipe threshold on release if horizontal gesture didn't trigger during move
            if (isHorizontalSwipe && !isSwiping && !isAnimating) {
                const endX = e.clientX || currentX;
                const deltaX = endX - startX;
                if (deltaX <= -SWIPE_THRESHOLD) {
                    isSwiping = true;
                    const nextIdx = (currentIndex + 1) % total;
                    showSlide(nextIdx);
                } else if (deltaX >= SWIPE_THRESHOLD) {
                    isSwiping = true;
                    const prevIdx = (currentIndex - 1 + total) % total;
                    showSlide(prevIdx);
                }
            }

            isPointerDown = false;
            isHorizontalSwipe = false;
            activePointerId = null;
        };

        stage.addEventListener('pointerup', handlePointerEnd);
        stage.addEventListener('pointercancel', handlePointerEnd);

        // Fallback for legacy environments where PointerEvent is unavailable
        if (!window.PointerEvent) {
            stage.addEventListener('touchstart', (e) => {
                if (e.target.closest('button, a, .testi-prev-btn, .testi-next-btn')) return;
                if (isAnimating || isSwiping || !e.touches || e.touches.length === 0) return;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                currentX = startX;
                currentY = startY;
                isPointerDown = true;
                isHorizontalSwipe = false;
            }, { passive: true });

            stage.addEventListener('touchmove', (e) => {
                if (!isPointerDown || isSwiping || isAnimating || !e.touches || e.touches.length === 0) return;
                currentX = e.touches[0].clientX;
                currentY = e.touches[0].clientY;
                const deltaX = currentX - startX;
                const deltaY = currentY - startY;

                if (!isHorizontalSwipe) {
                    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
                        if (Math.abs(deltaX) > Math.abs(deltaY)) {
                            isHorizontalSwipe = true;
                        } else {
                            isPointerDown = false;
                            return;
                        }
                    }
                }

                if (isHorizontalSwipe) {
                    if (e.cancelable) e.preventDefault();
                    if (deltaX <= -SWIPE_THRESHOLD) {
                        isSwiping = true;
                        const nextIdx = (currentIndex + 1) % total;
                        showSlide(nextIdx);
                    } else if (deltaX >= SWIPE_THRESHOLD) {
                        isSwiping = true;
                        const prevIdx = (currentIndex - 1 + total) % total;
                        showSlide(prevIdx);
                    }
                }
            }, { passive: false });

            const handleTouchEnd = (e) => {
                if (!isPointerDown) return;
                if (isHorizontalSwipe && !isSwiping && !isAnimating) {
                    const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : currentX;
                    const deltaX = endX - startX;
                    if (deltaX <= -SWIPE_THRESHOLD) {
                        isSwiping = true;
                        const nextIdx = (currentIndex + 1) % total;
                        showSlide(nextIdx);
                    } else if (deltaX >= SWIPE_THRESHOLD) {
                        isSwiping = true;
                        const prevIdx = (currentIndex - 1 + total) % total;
                        showSlide(prevIdx);
                    }
                }
                isPointerDown = false;
                isHorizontalSwipe = false;
            };

            stage.addEventListener('touchend', handleTouchEnd, { passive: true });
            stage.addEventListener('touchcancel', handleTouchEnd, { passive: true });
        }
    }

    updateCounter(0);
}

/**
 * Kept for home.js modular integration
 */
export function initTestimonialsTouchSwipe() {
    // Handled seamlessly within initTestimonials
}
