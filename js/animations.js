/**
 * GS SOWMIYA BUILDERS - ARCHITECTURAL ANIMATION ENGINE
 * Handles:
 * 1. IntersectionObserver & GSAP scroll reveals
 * 2. High-precision numeric counter animations
 * 3. Subtle 3D card tilt effects
 * 4. Micro-interactions and parallax accents
 */

import gsap from 'gsap';

/**
 * Initializes scroll-triggered element reveals
 */
export function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal], .reveal-on-scroll');
  if (!revealElements.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    revealElements.forEach(el => {
      el.classList.add('is-revealed');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        
        // Optional subtle GSAP entrance
        if (window.gsap) {
          gsap.fromTo(entry.target, 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', clearProps: 'all' }
          );
        } else {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
        }
        
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Animates numerical figures when scrolled into the viewport
 */
export function initCounterAnimation() {
  const counterElements = document.querySelectorAll('[data-counter], .stat-number, .counter-value, .stat-item-num');
  if (!counterElements.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const numericMatch = text.match(/\d+/);
        
        if (numericMatch) {
          const targetValue = parseInt(numericMatch[0], 10);
          const prefix = text.split(numericMatch[0])[0] || '';
          const suffix = text.split(numericMatch[0])[1] || '';

          if (prefersReduced) {
            el.textContent = `${prefix}${targetValue}${suffix}`;
          } else {
            const duration = 1800;
            const startTime = performance.now();

            const updateNumber = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out expo curve
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(eased * targetValue);
              
              el.textContent = `${prefix}${current}${suffix}`;
              
              if (progress < 1) {
                requestAnimationFrame(updateNumber);
              } else {
                el.textContent = `${prefix}${targetValue}${suffix}`;
              }
            };
            requestAnimationFrame(updateNumber);
          }
        }
        obs.unobserve(el);
      }
    });
  }, {
    threshold: 0.2
  });

  counterElements.forEach(el => observer.observe(el));
}

/**
 * Adds dynamic 3D perspective tilt on interactive cards
 */
export function initCardTilt() {
  const cards = document.querySelectorAll('[data-tilt], .leader-card, .fleet-card, .pillar-card, .heritage-card');
  if (!cards.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || window.innerWidth < 1024) return;

  cards.forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/**
 * Optional Parallax effect
 */
export function initParallax() {
  const parallaxNodes = document.querySelectorAll('[data-parallax]');
  if (!parallaxNodes.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxNodes.forEach(node => {
      const speed = parseFloat(node.getAttribute('data-speed') || '0.15');
      node.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
}
