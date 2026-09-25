/**
 * ==========================================================================
 * GS SOWMIYA BUILDERS — HOMEPAGE CONTROLLER (home.js)
 * Dedicated JavaScript logic for index.html
 * ==========================================================================
 */

import { loadGlobalComponents } from './components.js';
import { initHeroSlider } from './hero.js';
import { initTestimonials } from './testimonials.js';
import { initProjectModal } from './project-modal.js';
import { initScrollReveal, initCounterAnimation, initCardTilt, initHeroDepth } from './animations.js';
import { FEATURED_PROJECTS } from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Load Centralized Global Components (Navbar, Footer, Floating Actions)
  await loadGlobalComponents({ activeNav: 'home' });

  // 2. Cinematic Architectural 4-Slide Hero Slider
  initHeroSlider();

  // 3. Testimonials Carousel
  initTestimonials();

  // 4. Architectural Project Case Studies Modal
  initProjectModal();

  // 5. Featured Projects Slider & Filter
  initProjectsSlider();

  // 7. Scroll Reveals & Animated Metric Counters
  initScrollReveal();
  initCounterAnimation();

  // 8. 3D Architectural Depth & Pointer Tilts
  initHeroDepth();
  initCardTilt();

  // 9. Video Showreel Modal Controller
  initVideoModal();

  // 10. Built For Every Environment Industries Expandable Accordion
  initIndustryAccordion();

  // 11. FAQ Accordion Controller
  initFAQAccordion();
});

/**
 * Controller for Homepage Featured Projects Infinite Loop Carousel & Filter
 */
function initProjectsSlider() {
  const container = document.querySelector('.projects-slider-container');
  const track = document.querySelector('.projects-track');
  if (!track || !container) return;

  const prevBtn = document.querySelector('.projects-prev-btn');
  const nextBtn = document.querySelector('.projects-next-btn');
  const counterEl = document.querySelector('.slider-pagination-count');
  const filterTabs = document.querySelectorAll('.project-filter-tab');
  const indicatorsWrap = document.querySelector('.projects-loop-indicators');

  let currentCategory = 'ALL';
  let currentIndex = 0; // Index in the expanded 3x loop list
  let isTransitioning = false;
  let autoplayTimer = null;
  let isHovered = false;
  let isDragging = false;
  let startX = 0;
  let currentDragDelta = 0;
  let hasDragged = false;
  let resizeDebounce = null;

  function getFilteredProjects() {
    if (currentCategory === 'ALL') return FEATURED_PROJECTS;
    if (currentCategory.toLowerCase() === 'residential') {
      return FEATURED_PROJECTS.filter(p => 
        p.category.toLowerCase().includes('residential') || 
        p.category.toLowerCase().includes('living') ||
        p.category.toLowerCase().includes('individual') ||
        p.category.toLowerCase().includes('apartment') ||
        p.category.toLowerCase().includes('custom')
      );
    }
    if (currentCategory.toLowerCase() === 'commercial') {
      return FEATURED_PROJECTS.filter(p => 
        p.category.toLowerCase().includes('commercial') || 
        p.category.toLowerCase().includes('joint') ||
        p.category.toLowerCase().includes('turnkey')
      );
    }
    return FEATURED_PROJECTS;
  }

  function getStepWidth() {
    const card = track.querySelector('.project-card');
    if (!card) return 344;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap) || 24;
    return card.offsetWidth + gap;
  }

  function renderIndicators(count, activeRealIdx) {
    if (!indicatorsWrap) return;
    if (count <= 1) {
      indicatorsWrap.innerHTML = '';
      return;
    }
    indicatorsWrap.innerHTML = Array.from({ length: count }, (_, i) => `
      <button type="button" class="project-loop-dot ${i === activeRealIdx ? 'is-active' : ''}" data-index="${i}" aria-label="Go to project ${i + 1}" role="tab" aria-selected="${i === activeRealIdx}"></button>
    `).join('');

    indicatorsWrap.querySelectorAll('.project-loop-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
        goToRealIndex(targetIdx);
      });
    });
  }

  function updateIndicators(activeRealIdx) {
    if (!indicatorsWrap) return;
    const dots = indicatorsWrap.querySelectorAll('.project-loop-dot');
    dots.forEach((dot, i) => {
      const isActive = i === activeRealIdx;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
  }

  function updateCounter(N, realIdx) {
    if (counterEl) {
      const currentFormatted = String(realIdx + 1).padStart(2, '0');
      const totalFormatted = String(N).padStart(2, '0');
      counterEl.textContent = `${currentFormatted} / ${totalFormatted}`;
    }
    updateIndicators(realIdx);
  }

  function applyPosition(extraOffset = 0) {
    const step = getStepWidth();
    const x = -(currentIndex * step) + extraOffset;
    track.style.transform = `translateX(${x}px)`;
  }

  function renderCards() {
    stopAutoplay();
    const list = getFilteredProjects();
    const N = list.length;

    if (N === 0) {
      track.innerHTML = `<div style="padding: 40px; text-align: center; color: var(--text-secondary); width: 100%;">No projects found in this category.</div>`;
      if (counterEl) counterEl.textContent = '00 / 00';
      if (indicatorsWrap) indicatorsWrap.innerHTML = '';
      return;
    }

    // Build 3 sets: [Set 0 (clones), Set 1 (original/middle), Set 2 (clones)] for seamless loop
    const loopList = [...list, ...list, ...list];

    track.innerHTML = loopList.map((proj, idx) => {
      const realIdx = idx % N;
      const categoryText = (proj.category || proj.tag || 'RESIDENTIAL').toUpperCase();
      return `
        <div class="project-card" data-project-id="${proj.id}" data-real-index="${realIdx}" style="cursor: pointer;">
          <div class="project-card__image-wrap">
            <img src="${proj.image}" alt="${proj.name}" class="project-card__image" loading="lazy">
            <div class="project-card__overlay"></div>
            <span class="project-card__badge-tag">${categoryText}</span>
            <div class="project-card__bottom-info">
              <h3 class="project-card__title">${proj.name}</h3>
              <p class="project-card__subtitle">${proj.area} | ${proj.tag || proj.status}</p>
              <div class="project-card__meta-row">
                <div class="project-card__location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>${proj.location.split(',')[0]}</span>
                </div>
                <span class="project-card__code">GSB-${proj.id.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click handlers to open project modal (guarded against drag)
    track.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (hasDragged) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        const id = card.getAttribute('data-project-id');
        if (typeof window.openProjectDetails === 'function') {
          window.openProjectDetails(id);
        }
      });
    });

    // Start in the middle set (Set 1)
    currentIndex = N;
    isTransitioning = false;

    // Apply initial position instantly without transition animation
    track.style.transition = 'none';
    applyPosition(0);
    void track.offsetHeight; // Force reflow

    renderIndicators(N, 0);
    updateCounter(N, 0);
    initCardTilt();
    startAutoplay();
  }

  let transitionSafetyTimeout = null;

  function handleLoopBoundary() {
    const list = getFilteredProjects();
    const N = list.length;
    if (N <= 1) {
      isTransitioning = false;
      return;
    }

    // If we scrolled past the middle set into Set 2
    if (currentIndex >= 2 * N) {
      currentIndex = currentIndex - N;
      track.style.transition = 'none';
      applyPosition(0);
      void track.offsetHeight; // Force reflow
    } 
    // If we scrolled before the middle set into Set 0
    else if (currentIndex < N) {
      currentIndex = currentIndex + N;
      track.style.transition = 'none';
      applyPosition(0);
      void track.offsetHeight; // Force reflow
    }

    isTransitioning = false;
  }

  function next() {
    const list = getFilteredProjects();
    const N = list.length;
    if (N <= 1) return;
    if (isTransitioning) {
      handleLoopBoundary();
    }

    isTransitioning = true;
    currentIndex++;

    track.style.transition = 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)';
    applyPosition(0);

    const realIdx = ((currentIndex - N) % N + N) % N;
    updateCounter(N, realIdx);

    clearTimeout(transitionSafetyTimeout);
    transitionSafetyTimeout = setTimeout(() => {
      if (isTransitioning) {
        handleLoopBoundary();
      }
    }, 600);
  }

  function prev() {
    const list = getFilteredProjects();
    const N = list.length;
    if (N <= 1) return;
    if (isTransitioning) {
      handleLoopBoundary();
    }

    isTransitioning = true;
    currentIndex--;

    track.style.transition = 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)';
    applyPosition(0);

    const realIdx = ((currentIndex - N) % N + N) % N;
    updateCounter(N, realIdx);

    clearTimeout(transitionSafetyTimeout);
    transitionSafetyTimeout = setTimeout(() => {
      if (isTransitioning) {
        handleLoopBoundary();
      }
    }, 600);
  }

  function goToRealIndex(targetRealIdx) {
    const list = getFilteredProjects();
    const N = list.length;
    if (N <= 1) return;
    if (isTransitioning) {
      handleLoopBoundary();
    }

    const currentRealIdx = ((currentIndex - N) % N + N) % N;
    const diff = targetRealIdx - currentRealIdx;
    if (diff === 0) return;

    isTransitioning = true;
    currentIndex += diff;

    track.style.transition = 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)';
    applyPosition(0);
    updateCounter(N, targetRealIdx);

    clearTimeout(transitionSafetyTimeout);
    transitionSafetyTimeout = setTimeout(() => {
      if (isTransitioning) {
        handleLoopBoundary();
      }
    }, 600);
  }

  // Seamless Infinite Loop Reset on Transition End
  track.addEventListener('transitionend', (e) => {
    if (e.target !== track || (e.propertyName && e.propertyName !== 'transform')) return;
    clearTimeout(transitionSafetyTimeout);
    handleLoopBoundary();
  });

  // Autoplay functionality
  function startAutoplay() {
    stopAutoplay();
    const list = getFilteredProjects();
    if (list.length <= 1) return;
    autoplayTimer = setInterval(() => {
      if (!isHovered && !isDragging) {
        next();
      }
    }, 4200);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Pointer Drag & Touch Handling
  container.addEventListener('pointerenter', () => { isHovered = true; stopAutoplay(); });
  container.addEventListener('pointerleave', () => { 
    isHovered = false; 
    if (!isDragging) startAutoplay(); 
  });

  track.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    isDragging = true;
    hasDragged = false;
    startX = e.clientX;
    currentDragDelta = 0;
    stopAutoplay();
    track.style.transition = 'none';
    track.style.cursor = 'grabbing';
    try {
      track.setPointerCapture(e.pointerId);
    } catch (_) {}
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    currentDragDelta = e.clientX - startX;
    if (Math.abs(currentDragDelta) > 6) {
      hasDragged = true;
    }
    applyPosition(currentDragDelta);
  });

  const endDrag = (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = 'grab';
    try {
      track.releasePointerCapture(e.pointerId);
    } catch (_) {}

    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    const threshold = 45;

    if (currentDragDelta < -threshold) {
      next();
    } else if (currentDragDelta > threshold) {
      prev();
    } else {
      // Snap back to current
      applyPosition(0);
    }

    setTimeout(() => {
      hasDragged = false;
    }, 50);

    if (!isHovered) {
      startAutoplay();
    }
  };

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  // Keyboard navigation
  container.setAttribute('tabindex', '0');
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  });

  // Buttons
  prevBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    prev();
    stopAutoplay();
    setTimeout(() => { if (!isHovered) startAutoplay(); }, 2500);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    next();
    stopAutoplay();
    setTimeout(() => { if (!isHovered) startAutoplay(); }, 2500);
  });

  // Filter Tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      currentCategory = tab.getAttribute('data-category') || 'ALL';
      renderCards();
    });
  });

  // Resize handling
  window.addEventListener('resize', () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(() => {
      track.style.transition = 'none';
      applyPosition(0);
      track.offsetHeight;
      track.style.transition = '';
    }, 100);
  });

  // Initial render
  renderCards();
}

/**
 * Controller for Showreel Video Modal
 */
function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const openBtns = document.querySelectorAll('.trigger-video-modal');
  const closeBtn = modal?.querySelector('.modal-close-btn');
  const iframe = document.getElementById('modal-video-player');

  if (!modal) return;

  const originalSrc = iframe ? iframe.getAttribute('src') : '';

  function openModal() {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    if (iframe && originalSrc) {
      const separator = originalSrc.includes('?') ? '&' : '?';
      iframe.src = `${originalSrc}${separator}autoplay=1`;
    }
  }

  function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
    if (iframe) {
      iframe.src = originalSrc;
    }
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/**
 * Controller for Built For Every Environment (Industries Accordion)
 * Enables smooth architectural expansion animation for interactive panels
 * supporting hover on desktop, click/tap on touch devices, and keyboard navigation.
 */
function initIndustryAccordion() {
  const wrap = document.querySelector('.industries-accordion-wrap');
  if (!wrap) return;

  const panels = wrap.querySelectorAll('.industry-panel');
  if (!panels.length) return;

  function setActivePanel(targetPanel) {
    if (!targetPanel) return;
    panels.forEach(panel => {
      const isTarget = panel === targetPanel;
      panel.classList.toggle('is-expanded', isTarget);
      panel.setAttribute('aria-expanded', isTarget ? 'true' : 'false');
    });
  }

  panels.forEach((panel, idx) => {
    panel.setAttribute('tabindex', '0');
    panel.setAttribute('role', 'button');
    panel.setAttribute('aria-expanded', panel.classList.contains('is-expanded') ? 'true' : 'false');

    // Click / Tap expands panel
    panel.addEventListener('click', (e) => {
      e.stopPropagation();
      setActivePanel(panel);
    });

    // Hover expands panel smoothly
    panel.addEventListener('mouseenter', () => {
      setActivePanel(panel);
    });

    // Touch feedback
    panel.addEventListener('touchstart', () => {
      setActivePanel(panel);
    }, { passive: true });

    // Keyboard navigation (Enter, Space, Left, Right, Up, Down)
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActivePanel(panel);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = (idx + 1) % panels.length;
        panels[nextIdx]?.focus();
        setActivePanel(panels[nextIdx]);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = (idx - 1 + panels.length) % panels.length;
        panels[prevIdx]?.focus();
        setActivePanel(panels[prevIdx]);
      }
    });
  });

  // Ensure an initial panel is expanded (defaults to first panel)
  const hasExpanded = Array.from(panels).some(p => p.classList.contains('is-expanded'));
  if (!hasExpanded && panels[0]) {
    setActivePanel(panels[0]);
  }
}

/**
 * Controller for Homepage FAQ Accordion
 */
function initFAQAccordion() {
  const wrap = document.querySelector('.faq-accordion-wrap');
  if (!wrap) return;

  const items = wrap.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active');

      items.forEach(other => {
        other.classList.remove('is-active');
        const otherBtn = other.querySelector('.faq-question-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('is-active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
