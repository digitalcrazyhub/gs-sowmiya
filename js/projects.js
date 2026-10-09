/**
 * ==========================================================================
 * GS SOWMIYA BUILDERS — PROJECTS PAGE JAVASCRIPT
 * File: asset/js/projects.js
 * Scoped strictly to the Projects Page.
 * Handles:
 * 1. Global Component Loading (Navbar, Page Banner, Footer, Floating Actions)
 * 2. Dynamic Project Data Rendering & Layout Rhythm
 * 3. Category Filtering with Smooth Animations
 * 4. Graceful Empty Category Handling for Infrastructure & Institutional
 * 5. Fullscreen Architectural Image Lightbox (Keyboard & Touch Accessible)
 * 6. GSAP / ScrollTrigger Reveal Enhancements
 * ==========================================================================
 */

import { loadGlobalComponents } from './components.js';
import { initCardTilt, initScrollReveal, initCounterAnimation } from './animations.js';
import { initProjectsMasonryGallery } from './projects-masonry-gallery.js';
import { PROJECTS_DATA } from './projects-data.js';

// Respect system accessibility setting
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Current active filter state
let currentCategory = "ALL";
let currentFilteredProjects = [...PROJECTS_DATA];
let currentLightboxIndex = 0;
let masonryInstance = null;

/**
 * Initialize Projects Page on DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Load Global Common Components (Navbar, Page Banner, Footer, Floating Actions)
  await loadGlobalComponents({
    activeNav: 'projects',
    banner: {
      breadcrumb: 'PROJECTS',
      title: 'Our Successful Projects',
      bgImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85'
    }
  });

  // 2. Initialize BHK Category Badges with dynamic counts
  updateCategoryBadges();

  // 3. Render Initial Project Grid (All Projects)
  renderProjectsGrid(currentFilteredProjects);

  // 4. Initialize Masonry Gallery Manager
  masonryInstance = initProjectsMasonryGallery('#projects-grid');

  // 5. Attach Category Filter Event Listeners
  initCategoryFilters();

  // 6. Initialize Lightbox Modal System
  initProjectLightbox();

  // 7. Scroll Trigger Animations & Numeric Counters
  initScrollReveal();
  initCounterAnimation();
  initScrollEffects();
  initCardTilt();
});

/**
 * Computes and updates dynamic category counts for BHK filter tabs
 */
function updateCategoryBadges() {
  const counts = {
    ALL: PROJECTS_DATA.length,
    "2bhk": PROJECTS_DATA.filter(p => p.bhkFilter.includes('2bhk')).length,
    "3bhk": PROJECTS_DATA.filter(p => p.bhkFilter.includes('3bhk')).length,
    "4bhk": PROJECTS_DATA.filter(p => p.bhkFilter.includes('4bhk')).length,
    "5bhk": PROJECTS_DATA.filter(p => p.bhkFilter.includes('5bhk')).length
  };

  document.querySelectorAll('[data-category-badge]').forEach(badge => {
    const cat = badge.getAttribute('data-category-badge');
    if (counts[cat] !== undefined) {
      badge.textContent = counts[cat];
    }
  });
}

/**
 * Renders project cards into the masonry architectural gallery
 */
function renderProjectsGrid(projectsList) {
  const gridContainer = document.getElementById('projects-grid');
  const countDisplay = document.getElementById('projects-count-display');
  if (!gridContainer) return;

  // Update counter text
  if (countDisplay) {
    if (projectsList.length > 0) {
      const categoryTitle = currentCategory === 'ALL' 
        ? 'All Configurations' 
        : currentCategory.toUpperCase();
      countDisplay.innerHTML = `Showing <span class="projects-count-highlight">${projectsList.length}</span> of ${PROJECTS_DATA.length} Projects (${categoryTitle})`;
    } else {
      countDisplay.innerHTML = `Showing <span class="projects-count-highlight">0</span> Projects`;
    }
  }

  // Handle Empty State Gracefully
  if (projectsList.length === 0) {
    const emptyCategoryName = currentCategory.toUpperCase();
    gridContainer.innerHTML = `
      <div class="projects-empty-state" role="region" aria-label="No projects available in this configuration">
        <div class="projects-empty-icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <h3 class="projects-empty-title">NO ${emptyCategoryName} PROJECTS CURRENTLY LISTED</h3>
        <p class="projects-empty-desc">
          New residential developments in this configuration are currently in engineering review or land acquisition stage. Detailed architectural plans and floor layouts are available upon direct consultation.
        </p>
        <div class="projects-empty-actions">
          <a href="./contact.html" class="btn btn-gold">
            <span>SCHEDULE CONSULTATION</span>
            <span class="btn-icon-circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
          </a>
          <button type="button" class="btn btn-outline" id="empty-state-reset-btn">
            <span>VIEW ALL PROJECTS</span>
          </button>
        </div>
      </div>
    `;

    const resetBtn = document.getElementById('empty-state-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const allBtn = document.querySelector('[data-category="ALL"]');
        if (allBtn) allBtn.click();
      });
    }
    return;
  }

  // Build Masonry Project Cards HTML with image content below
  const cardsHTML = projectsList.map((project, index) => {
    const bhkBadges = project.bhk.join(' • ');

    return `
      <article class="project-card" data-id="${project.id}" data-category="${project.bhkFilter.join(' ')}" id="project-${project.id}">
        <div class="project-card__image-wrap" data-lightbox-trigger="${index}" role="button" tabindex="0" aria-label="View enlarged photo for ${project.name}">
          <img 
            src="${project.image}" 
            alt="${project.name} – ${project.bhk.join(', ')} in ${project.location}" 
            class="project-card__image" 
            loading="${index < 3 ? 'eager' : 'lazy'}" 
            decoding="async"
          >
          <div class="project-card__gold-edge" aria-hidden="true"></div>
          
          <span class="project-card__badge-tag">${bhkBadges}</span>

          <button type="button" class="project-card__zoom-btn" data-lightbox-trigger="${index}" aria-label="Enlarge ${project.name} photo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </button>
        </div>

        <div class="project-card__content">
          <h3 class="project-card__title">${project.name}</h3>
          <div class="project-card__meta">
            <div class="project-card__location">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${project.location}</span>
            </div>
            <div class="project-card__specs">
              <span>Land Area: ${project.landArea}</span>
              <span class="project-card__specs-dot">•</span>
              <span>Built-up Area: ${project.builtUpArea}</span>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  gridContainer.innerHTML = cardsHTML;

  // Attach Lightbox triggers to cards
  attachLightboxTriggers();

  // GSAP Stagger Animation for new cards
  if (window.gsap && !prefersReducedMotion) {
    window.gsap.fromTo(
      gridContainer.querySelectorAll('.project-card'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
  }

  // Attach 3D architectural card tilt
  initCardTilt();
}

/**
 * Initializes category filtering interactions for BHK tabs
 */
function initCategoryFilters() {
  const filterButtons = document.querySelectorAll('.projects-tab-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedCategory = button.getAttribute('data-category');
      if (!selectedCategory || selectedCategory === currentCategory) return;

      // Update active states
      filterButtons.forEach(btn => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('is-active');
      button.setAttribute('aria-pressed', 'true');

      currentCategory = selectedCategory;

      // Filter projects array based on BHK filter
      if (selectedCategory === 'ALL') {
        currentFilteredProjects = [...PROJECTS_DATA];
      } else {
        currentFilteredProjects = PROJECTS_DATA.filter(p => p.bhkFilter.includes(selectedCategory));
      }

      // Smooth transition
      const grid = document.getElementById('projects-grid');
      if (grid && window.gsap && !prefersReducedMotion) {
        window.gsap.to(grid, {
          opacity: 0,
          duration: 0.18,
          ease: "power1.in",
          onComplete: () => {
            renderProjectsGrid(currentFilteredProjects);
            window.gsap.to(grid, { opacity: 1, duration: 0.25, ease: "power1.out" });
          }
        });
      } else {
        renderProjectsGrid(currentFilteredProjects);
      }
    });
  });
}

/**
 * Project Lightbox System (Vanilla JS)
 */
function initProjectLightbox() {
  const lightbox = document.getElementById('project-lightbox');
  if (!lightbox) return;

  const closeBtn = lightbox.querySelector('.project-lightbox__close-btn');
  const prevBtn = lightbox.querySelector('.project-lightbox__arrow--prev');
  const nextBtn = lightbox.querySelector('.project-lightbox__arrow--next');

  // Close when clicking close button
  closeBtn?.addEventListener('click', closeLightbox);

  // Close when clicking outer backdrop
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Next & Prev arrows
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(-1);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(1);
  });

  // Keyboard navigation (ESC, Left, Right)
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
      navigateLightbox(1);
    }
  });
}

function attachLightboxTriggers() {
  const triggers = document.querySelectorAll('[data-lightbox-trigger]');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const index = parseInt(trigger.getAttribute('data-lightbox-trigger'), 10);
      if (!isNaN(index)) {
        openLightbox(index);
      }
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const index = parseInt(trigger.getAttribute('data-lightbox-trigger'), 10);
        if (!isNaN(index)) {
          openLightbox(index);
        }
      }
    });
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById('project-lightbox');
  if (!lightbox || currentFilteredProjects.length === 0) return;

  currentLightboxIndex = (index >= 0 && index < currentFilteredProjects.length) ? index : 0;
  updateLightboxContent();

  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const closeBtn = lightbox.querySelector('.project-lightbox__close-btn');
  closeBtn?.focus();
}

function closeLightbox() {
  const lightbox = document.getElementById('project-lightbox');
  if (!lightbox) return;

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  if (currentFilteredProjects.length <= 1) return;

  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) {
    currentLightboxIndex = currentFilteredProjects.length - 1;
  } else if (currentLightboxIndex >= currentFilteredProjects.length) {
    currentLightboxIndex = 0;
  }

  updateLightboxContent();
}

function updateLightboxContent() {
  const lightbox = document.getElementById('project-lightbox');
  if (!lightbox) return;

  const project = currentFilteredProjects[currentLightboxIndex];
  if (!project) return;

  const imgEl = lightbox.querySelector('.project-lightbox__img');
  const titleEl = lightbox.querySelector('.project-lightbox__caption-title');
  const metaEl = lightbox.querySelector('.project-lightbox__caption-meta');
  const counterEl = lightbox.querySelector('.project-lightbox__caption-counter');

  if (imgEl) {
    imgEl.src = project.image;
    imgEl.alt = `${project.name} – ${project.location}`;
  }

  if (titleEl) {
    titleEl.textContent = project.name;
  }

  if (metaEl) {
    const unitsStr = project.units && project.units > 1 ? ` • ${project.units} Units` : '';
    metaEl.textContent = `${project.bhk.join(' • ')} • ${project.location} • Land: ${project.landArea} • Built-up: ${project.builtUpArea}${unitsStr}`;
  }

  if (counterEl) {
    const current = String(currentLightboxIndex + 1).padStart(2, '0');
    const total = String(currentFilteredProjects.length).padStart(2, '0');
    counterEl.textContent = `${current} / ${total}`;
  }
}

/**
 * Scroll effects and GSAP ScrollTrigger reveals
 */
function initScrollEffects() {
  if (prefersReducedMotion || !window.gsap || !window.ScrollTrigger) return;

  window.gsap.registerPlugin(window.ScrollTrigger);

  const filterSection = document.querySelector('.projects-filter-section');
  if (filterSection) {
    window.gsap.from(filterSection, {
      scrollTrigger: {
        trigger: filterSection,
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out'
    });
  }

  const gallerySection = document.querySelector('.projects-gallery-section');
  if (gallerySection) {
    window.gsap.from(gallerySection, {
      scrollTrigger: {
        trigger: gallerySection,
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out'
    });
  }
}
