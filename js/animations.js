/**
 * GS SOWMIYA BUILDERS — ARCHITECTURAL MOTION & 3D SYSTEM (animations.js)
 * Master animation engine powering subtle, luxury, architectural motion.
 * Features:
 * 1. Global GSAP & ScrollTrigger registration and window exposure
 * 2. High-performance, GPU-accelerated Scroll Reveals (with prefers-reduced-motion fallback)
 * 3. Architectural 3D Pointer Tilt System (RAF-driven, subtle perspective, no gaming gimmicks)
 * 4. Hero Cinematic Depth Parallax
 * 5. High-precision Numeric Counter Animations
 * 6. Smooth Architectural Parallax Accents
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Expose globally so every page script (projects.js, team.js, hero.js, etc.) has instant access
if (typeof window !== 'undefined') {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
}

// System motion preference check
const prefersReducedMotion = typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 01. SCROLL REVEAL SYSTEM
 * Smoothly reveals section headings, text blocks, cards, and images as they enter viewport
 */
export function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '[data-reveal], .reveal-on-scroll, [data-scroll-reveal], .section-eyebrow, .section-title, .section-subtitle'
  );
  
  if (!revealElements.length) return;

  if (prefersReducedMotion) {
    revealElements.forEach(el => {
      el.classList.add('is-revealed');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Use ScrollTrigger for high-precision, buttery-smooth GPU reveals
  revealElements.forEach((el) => {
    if (el.dataset.revealBound === 'true') return;
    el.dataset.revealBound = 'true';

    // If already in initial viewport, reveal immediately with subtle fade
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        onComplete: () => el.classList.add('is-revealed')
      });
      return;
    }

    // Otherwise trigger on scroll
    gsap.fromTo(el,
      { opacity: 0, y: 28 },
      {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        onComplete: () => el.classList.add('is-revealed')
      }
    );
  });
}

/**
 * 02. ARCHITECTURAL 3D CARD TILT INTERACTION
 * Subtle, luxury pointer-based 3D rotation on interactive cards.
 * Philosophy: Restrained (max ±4.5°), cinematic, responsive, disabled on touch/mobile.
 */
export function initCardTilt() {
  if (prefersReducedMotion) return;
  if (typeof window === 'undefined') return;

  // Disable on narrow viewports or touch devices for optimal touch performance
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (isTouch || window.innerWidth < 1024) return;

  const cardSelectors = [
    '[data-tilt]',
    '.project-card',
    '.projects-catalog-card',
    '.hero-featured-card',
    '.primary-service-item',
    '.technical-service-card',
    '.service-card',
    '.scope-card',
    '.application-card',
    '.related-service-card',
    '.why-services-point-item',
    '.team-card',
    '.team-card-site',
    '.team-card-engineering',
    '.team-pm-row-card',
    '.team-culture-card',
    '.contact-card',
    '.contact-info-card',
    '.contact-office-card',
    '.contact-social-card',
    '.about-metric-card',
    '.about-pillar-card',
    '.pillar-card',
    '.fleet-card',
    '.heritage-card',
    '.leader-card',
    '.why-us-card',
    '.milestone-card',
    '.equipment-card'
  ];

  const cards = document.querySelectorAll(cardSelectors.join(', '));
  if (!cards.length) return;

  cards.forEach(card => {
    if (card.dataset.tiltActive === 'true') return;
    card.dataset.tiltActive = 'true';

    // Enable 3D transform rendering
    card.style.transformStyle = 'preserve-3d';
    card.style.willChange = 'transform, box-shadow';

    let rafId = null;
    let targetX = 0;
    let targetY = 0;

    function onMouseMove(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Restrained luxury angles (max 4.5 degrees)
      const rotateX = ((centerY - y) / centerY) * 4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      targetX = rotateX;
      targetY = rotateY;

      if (!rafId) {
        rafId = requestAnimationFrame(updateTransform);
      }
    }

    function updateTransform() {
      // Immediate responsive tilt while cursor is over card
      card.style.transition = 'transform 0.08s ease-out, box-shadow 0.25s ease';
      card.style.transform = `perspective(1100px) rotateX(${targetX.toFixed(2)}deg) rotateY(${targetY.toFixed(2)}deg) translateY(-5px)`;
      rafId = null;
    }

    function onMouseLeave() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      // Silky smooth reset with cubic-bezier easing
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }

    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave);
  });
}

/**
 * 03. HERO CINEMATIC DEPTH & PARALLAX
 * Imparts layered architectural depth across the grand hero frame & inner page banners
 */
export function initHeroDepth() {
  if (prefersReducedMotion) return;
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) return;

  const heroFrames = document.querySelectorAll('.hero-frame, .projects-hero-banner, .contact-hero, .page-banner');
  if (!heroFrames.length) return;

  heroFrames.forEach(frame => {
    if (frame.dataset.depthActive === 'true') return;
    frame.dataset.depthActive = 'true';

    const bgLayer = frame.querySelector('.hero-slider, .hero-slide.is-active .hero-slide-bg, .projects-hero-bg, .contact-hero-bg, .page-banner-bg');
    const badge = frame.querySelector('.hero-badge-pill, .hero-counter, .projects-hero-eyebrow, .page-banner-eyebrow');
    const featuredCard = frame.querySelector('.hero-featured-card');

    if (!bgLayer) return;

    let rafId = null;
    let offsetX = 0;
    let offsetY = 0;

    frame.addEventListener('mousemove', (e) => {
      const rect = frame.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      offsetX = relX * 16;
      offsetY = relY * 12;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          // Subtle inverse background drift
          bgLayer.style.transform = `scale(1.04) translate3d(${-offsetX.toFixed(1)}px, ${-offsetY.toFixed(1)}px, 0)`;
          
          // Foreground floating elements drift slightly forward
          if (badge) {
            badge.style.transform = `translate3d(${(offsetX * 0.4).toFixed(1)}px, ${(offsetY * 0.4).toFixed(1)}px, 0)`;
          }
          if (featuredCard) {
            featuredCard.style.transform = `translate3d(${(offsetX * 0.6).toFixed(1)}px, ${(offsetY * 0.6).toFixed(1)}px, 0)`;
          }

          rafId = null;
        });
      }
    }, { passive: true });

    frame.addEventListener('mouseleave', () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      bgLayer.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      bgLayer.style.transform = 'scale(1) translate3d(0, 0, 0)';

      if (badge) {
        badge.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        badge.style.transform = 'translate3d(0, 0, 0)';
      }
      if (featuredCard) {
        featuredCard.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        featuredCard.style.transform = 'translate3d(0, 0, 0)';
      }

      setTimeout(() => {
        bgLayer.style.transition = '';
        if (badge) badge.style.transition = '';
        if (featuredCard) featuredCard.style.transition = '';
      }, 800);
    });
  });
}

/**
 * 04. NUMERIC COUNTER ANIMATIONS
 * Smoothly interpolates metric figures with easing when scrolled into view
 */
export function initCounterAnimation() {
  const counterElements = document.querySelectorAll(
    '[data-counter], .stat-number, .counter-value, .stat-item-num, .about-metric-number, .projects-metric-value'
  );
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.dataset.counterDone === 'true') return;
        el.dataset.counterDone = 'true';

        const originalText = el.textContent.trim();
        const numericMatch = originalText.match(/[\d\.]+/);
        
        if (numericMatch) {
          const rawNum = numericMatch[0];
          const isDecimal = rawNum.includes('.');
          const targetValue = parseFloat(rawNum);
          const prefix = originalText.split(rawNum)[0] || '';
          const suffix = originalText.split(rawNum)[1] || '';

          if (prefersReducedMotion) {
            el.textContent = `${prefix}${rawNum}${suffix}`;
          } else {
            const duration = 1800;
            const startTime = performance.now();

            const updateNumber = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic curve
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = eased * targetValue;
              
              el.textContent = isDecimal 
                ? `${prefix}${current.toFixed(1)}${suffix}`
                : `${prefix}${Math.floor(current)}${suffix}`;
              
              if (progress < 1) {
                requestAnimationFrame(updateNumber);
              } else {
                el.textContent = `${prefix}${rawNum}${suffix}`;
              }
            };
            requestAnimationFrame(updateNumber);
          }
        }
        obs.unobserve(el);
      }
    });
  }, {
    threshold: 0.15
  });

  counterElements.forEach(el => observer.observe(el));
}

/**
 * 05. OPTIONAL SMOOTH PARALLAX ACCENTS
 */
export function initParallax() {
  if (prefersReducedMotion || typeof window === 'undefined') return;

  const parallaxNodes = document.querySelectorAll('[data-parallax]');
  if (!parallaxNodes.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxNodes.forEach(node => {
      const speed = parseFloat(node.getAttribute('data-speed') || '0.12');
      node.style.transform = `translate3d(0, ${(scrollY * speed).toFixed(1)}px, 0)`;
    });
  }, { passive: true });
}

/**
 * 06. CONVENIENCE ORCHESTRATOR
 * Bootstraps the full architectural motion system on any page
 */
export function initGlobalAnimations() {
  initScrollReveal();
  initCardTilt();
  initHeroDepth();
  initCounterAnimation();
  initParallax();
}
