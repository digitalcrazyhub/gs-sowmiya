/**
 * GS SOWMIYA BUILDERS - TESTIMONIALS CAROUSEL
 * Clean cinematic reviews with quote presentation, prev/next controls, and counter
 */

import { TESTIMONIALS } from './config.js';
import gsap from 'gsap';

export function initTestimonials() {
    const sliderContainer = document.querySelector('.testimonial-slider');
    const prevBtn = document.querySelector('.testi-prev-btn');
    const nextBtn = document.querySelector('.testi-next-btn');
    const counterEl = document.querySelector('.testi-counter');

    if (!sliderContainer) return;

    sliderContainer.innerHTML = TESTIMONIALS.map((item, idx) => `
        <div class="testimonial-slide ${idx === 0 ? 'is-active' : ''}" data-index="${idx}">
            <p class="testimonial-text">"${item.quote}"</p>
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
    let currentIndex = 0;
    const total = TESTIMONIALS.length;

    function updateCounter(idx) {
        if (counterEl) {
            counterEl.textContent = `0${idx + 1} / 0${total}`;
        }
    }

    function showSlide(index) {
        const current = slides[currentIndex];
        const next = slides[index];

        gsap.to(current, {
            opacity: 0,
            y: -15,
            duration: 0.3,
            onComplete: () => {
                current.classList.remove('is-active');
                next.classList.add('is-active');
                gsap.fromTo(next, 
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
                );
            }
        });

        currentIndex = index;
        updateCounter(currentIndex);
    }

    prevBtn?.addEventListener('click', () => {
        const prevIdx = (currentIndex - 1 + total) % total;
        showSlide(prevIdx);
    });

    nextBtn?.addEventListener('click', () => {
        const nextIdx = (currentIndex + 1) % total;
        showSlide(nextIdx);
    });

    updateCounter(0);
}
