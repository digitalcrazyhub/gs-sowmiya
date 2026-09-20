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

import { loadGlobalComponents } from '/js/components.js';

// Respect system accessibility setting
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Verified GS Sowmiya Builders Project Data Repository
 * Only contains authentic project information derived directly from the master codebase.
 */
export const PROJECTS_DATA = [
  {
    id: "p1",
    name: "Vaibhavam Grande",
    location: "Thirukalukundram",
    category: "residential",
    categoryLabel: "Residential",
    type: "Flagship Estate",
    area: "55,000 Sq.Ft.",
    year: "2024",
    status: "Completed",
    featured: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
    description: "A contemporary gated residential enclave balancing climate-responsive ventilation, post-tensioned flat slabs, and private central green courtyards.",
    link: "#"
  },
  {
    id: "p2",
    name: "TVS Avenue",
    location: "Chennai",
    category: "commercial",
    categoryLabel: "Commercial",
    type: "Corporate Tower",
    area: "120,000 Sq.Ft.",
    year: "2023",
    status: "Completed",
    featured: false,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    description: "A modern glass-and-composite commercial landmark featuring a double-height atrium reception and expansive column-free office floor plates.",
    link: "#"
  },
  {
    id: "p3",
    name: "Nolumbur Green Woods",
    location: "Chennai",
    category: "residential",
    categoryLabel: "Residential",
    type: "Luxury Living",
    area: "42,000 Sq.Ft.",
    year: "2024",
    status: "Completed",
    featured: false,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
    description: "Harmonious biophilic apartment community engineered with rooftop solar-harvesting canopies and expansive perimeter landscaped gardens.",
    link: "#"
  },
  {
    id: "p4",
    name: "Perambur Bharath House",
    location: "Chennai",
    category: "residential",
    categoryLabel: "Residential",
    type: "Private Villa",
    area: "18,500 Sq.Ft.",
    year: "2023",
    status: "Completed",
    featured: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    description: "A private architectural masterpiece crafted with board-formed exposed architectural concrete, teakwood louvers, and reflecting pools.",
    link: "#"
  },
  {
    id: "p5",
    name: "OOTY Love Dale",
    location: "Ooty",
    category: "residential",
    categoryLabel: "Residential",
    type: "Hill Estate",
    area: "12,000 Sq.Ft.",
    year: "2024",
    status: "Completed",
    featured: true,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85",
    description: "Perched along the scenic slopes of the Nilgiris, built with reinforced soil nail mechanics, radiant underfloor heating, and panoramic glass facades.",
    link: "#"
  },
  {
    id: "p6",
    name: "Mogappair Skywood",
    location: "Chennai",
    category: "residential",
    categoryLabel: "Residential",
    type: "Premium High-Rise",
    area: "85,000 Sq.Ft.",
    year: "2025",
    status: "In Finishing",
    featured: false,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
    description: "Vertical living redefined with high-grade seismic dampening shear cores, cantilevered infinity sky decks, and thermal-barrier fenestration.",
    link: "#"
  },
  {
    id: "p7",
    name: "Anna Nagar Tech Square",
    location: "Chennai",
    category: "commercial",
    categoryLabel: "Commercial",
    type: "Grade-A IT Tower",
    area: "75,000 Sq.Ft.",
    year: "2024",
    status: "Completed",
    featured: false,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    description: "Multi-tenant Grade-A corporate workplace with energy-efficient insulated glazed envelope, VRV climate control, and high-speed core lifts.",
    link: "#"
  },
  {
    id: "p8",
    name: "OMR Retail Hub",
    location: "Chennai",
    category: "commercial",
    categoryLabel: "Commercial",
    type: "Retail Plaza",
    area: "45,000 Sq.Ft.",
    year: "2023",
    status: "Completed",
    featured: true,
    image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1400&q=85",
    description: "Boutique retail and culinary destination along the IT Corridor featuring double-height storefront glazing and seamless pedestrian courtyard flow.",
    link: "#"
  },
  {
    id: "p9",
    name: "Sriperumbudur Logistics Park",
    location: "Sriperumbudur",
    category: "industrial",
    categoryLabel: "Industrial",
    type: "High-Bay PEB Warehouse",
    area: "250,000 Sq.Ft.",
    year: "2024",
    status: "Completed",
    featured: true,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85",
    description: "State-of-the-art pre-engineered logistics facility with 12m clear heights, laser-screeded FM2 high-tolerance flooring, and automated docking bays.",
    link: "#"
  },
  {
    id: "p10",
    name: "Oragadam Auto Ancillary Plant",
    location: "Oragadam",
    category: "industrial",
    categoryLabel: "Industrial",
    type: "Manufacturing Plant",
    area: "180,000 Sq.Ft.",
    year: "2023",
    status: "Completed",
    featured: false,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    description: "Heavy precision manufacturing facility featuring isolated vibration machine foundation pads and 50T heavy gantry crane runway girders.",
    link: "#"
  },
  {
    id: "p11",
    name: "Gummidipoondi Heavy Fabrication Shed",
    location: "Gummidipoondi",
    category: "industrial",
    categoryLabel: "Industrial",
    type: "Heavy Industrial Facility",
    area: "95,000 Sq.Ft.",
    year: "2024",
    status: "Completed",
    featured: false,
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85",
    description: "Heavy structural steel fabrication plant equipped with continuous natural ridge ventilators, overhead cranes, and reinforced concrete apron slabs.",
    link: "#"
  },
  {
    id: "p12",
    name: "ECR Coastal Access Elevated Corridor",
    location: "Chennai ECR",
    category: "infrastructure",
    categoryLabel: "Infrastructure",
    type: "Elevated Road & Retaining Wall",
    area: "4.2 KM Corridor",
    year: "2024",
    status: "Completed",
    featured: true,
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?auto=format&fit=crop&w=1200&q=85",
    description: "Deep pile foundations, reinforced soil walls, and storm-surge civil containment engineered for severe marine atmospheric exposure.",
    link: "#"
  },
  {
    id: "p13",
    name: "Oragadam Industrial Drainage & Culvert Network",
    location: "Oragadam",
    category: "infrastructure",
    categoryLabel: "Infrastructure",
    type: "Heavy Civil Works",
    area: "12,500 R.Mtr.",
    year: "2023",
    status: "Completed",
    featured: false,
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=85",
    description: "Sub-surface industrial runoff culvert system and reinforced concrete retention reservoirs designed for 100-year flood resistance.",
    link: "#"
  },
  {
    id: "p14",
    name: "Madhavaram Technical & Training Academy Complex",
    location: "Chennai",
    category: "institutional",
    categoryLabel: "Institutional",
    type: "Educational Campus",
    area: "68,000 Sq.Ft.",
    year: "2024",
    status: "Completed",
    featured: true,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85",
    description: "Multi-tiered academic facility featuring vibration-dampened structural labs, acoustic lecture halls, and turnkey interior fit-outs.",
    link: "#"
  },
  {
    id: "p15",
    name: "Anna Nagar Civic Community Center & Cultural Annex",
    location: "Anna Nagar, Chennai",
    category: "institutional",
    categoryLabel: "Institutional",
    type: "Public Institution",
    area: "34,000 Sq.Ft.",
    year: "2023",
    status: "Completed",
    featured: false,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    description: "Column-free auditorium with spatial acoustic modeling, post-tensioned roofing spans, and sustainable greywater recycling.",
    link: "#"
  }
];

// Current active filter state
let currentCategory = "ALL";
let currentFilteredProjects = [...PROJECTS_DATA];
let currentLightboxIndex = 0;

/**
 * Initialize Projects Page on DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Load Global Common Components (Navbar, Footer, Floating Actions)
  await loadGlobalComponents({
    activeNav: 'projects'
  });

  // 2. Initialize Category Badges with dynamic counts
  updateCategoryBadges();

  // 3. Render Initial Project Grid (All Projects)
  renderProjectsGrid(currentFilteredProjects);

  // 4. Attach Category Filter Event Listeners
  initCategoryFilters();

  // 5. Initialize Lightbox Modal System
  initProjectLightbox();

  // 6. Scroll Trigger Animations
  initScrollEffects();
});

/**
 * Computes and updates dynamic category counts
 */
function updateCategoryBadges() {
  const counts = {
    ALL: PROJECTS_DATA.length,
    residential: PROJECTS_DATA.filter(p => p.category === 'residential').length,
    commercial: PROJECTS_DATA.filter(p => p.category === 'commercial').length,
    industrial: PROJECTS_DATA.filter(p => p.category === 'industrial').length,
    infrastructure: PROJECTS_DATA.filter(p => p.category === 'infrastructure').length,
    institutional: PROJECTS_DATA.filter(p => p.category === 'institutional').length
  };

  document.querySelectorAll('[data-category-badge]').forEach(badge => {
    const cat = badge.getAttribute('data-category-badge');
    if (counts[cat] !== undefined) {
      badge.textContent = counts[cat];
    }
  });
}

/**
 * Renders project cards into the architectural grid
 */
function renderProjectsGrid(projectsList) {
  const gridContainer = document.getElementById('projects-grid');
  const countDisplay = document.getElementById('projects-count-display');
  if (!gridContainer) return;

  // Update counter text
  if (countDisplay) {
    if (projectsList.length > 0) {
      const categoryTitle = currentCategory === 'ALL' 
        ? 'All Categories' 
        : currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
      countDisplay.innerHTML = `Showing <span class="projects-count-highlight">${projectsList.length}</span> of ${PROJECTS_DATA.length} Projects (${categoryTitle})`;
    } else {
      countDisplay.innerHTML = `Showing <span class="projects-count-highlight">0</span> Projects`;
    }
  }

  // Handle Empty State Gracefully
  if (projectsList.length === 0) {
    const emptyCategoryName = currentCategory.toUpperCase();
    gridContainer.innerHTML = `
      <div class="projects-empty-state" role="region" aria-label="No projects available in this category">
        <div class="projects-empty-icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <h3 class="projects-empty-title">PROJECT DETAILS WILL BE UPDATED SOON</h3>
        <p class="projects-empty-desc">
          Our ${emptyCategoryName} commissions are currently undergoing structural documentation and client confidentiality clearance. Detailed engineering qualifications, architectural plans, and comprehensive project dossiers are available upon direct confidential consultation.
        </p>
        <div class="projects-empty-actions">
          <a href="/contact.html" class="btn btn-gold">
            <span>REQUEST PROJECT DOSSIER</span>
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

  // Build Project Cards HTML with an asymmetric architectural rhythm
  const cardsHTML = projectsList.map((project, index) => {
    // Large feature styling for designated projects or first card in filtered views
    const isLarge = project.featured && (index % 3 === 0 || projectsList.length <= 4);
    const cardClass = isLarge ? "project-card project-card--large" : "project-card";

    return `
      <article class="${cardClass}" data-id="${project.id}" data-category="${project.category}" id="project-${project.id}">
        <div class="project-card__image-wrap" data-lightbox-trigger="${index}" role="button" tabindex="0" aria-label="View enlarged image for ${project.name}">
          <img 
            src="${project.image}" 
            alt="${project.name} – ${project.type} in ${project.location}" 
            class="project-card__image" 
            loading="${index < 3 ? 'eager' : 'lazy'}" 
            decoding="async"
            width="800"
            height="500"
          >
          <div class="project-card__overlay" aria-hidden="true"></div>
          <div class="project-card__gold-edge" aria-hidden="true"></div>
          <span class="project-card__badge-tag">${project.categoryLabel}</span>
          
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
          <div>
            <div class="project-card__header-meta">
              <div class="project-card__location">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${project.location}</span>
              </div>
              <span class="project-card__year">${project.year}</span>
            </div>

            <h3 class="project-card__title">
              <a href="${project.link}" class="project-card__link" style="color: inherit; text-decoration: none;">
                ${project.name}
              </a>
            </h3>

            <p class="project-card__desc">${project.description}</p>
          </div>

          <div class="project-card__footer">
            <div class="project-card__specs">
              <span class="project-card__type">${project.type}</span>
              <span class="project-card__specs-dot">•</span>
              <span>${project.area}</span>
            </div>

            <a href="${project.link}" class="project-card__btn" aria-label="View architectural details for ${project.name}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
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
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" }
    );
  }
}

/**
 * Initializes category filtering interactions
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

      // Filter projects array
      if (selectedCategory === 'ALL') {
        currentFilteredProjects = [...PROJECTS_DATA];
      } else {
        currentFilteredProjects = PROJECTS_DATA.filter(p => p.category === selectedCategory);
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
    metaEl.textContent = `${project.type} • ${project.location} • ${project.area} • Completed ${project.year}`;
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

  // Intro section reveal
  window.gsap.from('.projects-intro-visual', {
    scrollTrigger: {
      trigger: '.projects-intro-section',
      start: 'top 80%',
      once: true
    },
    opacity: 0,
    x: -30,
    duration: 0.8,
    ease: 'power2.out'
  });

  window.gsap.from('.projects-intro-content', {
    scrollTrigger: {
      trigger: '.projects-intro-section',
      start: 'top 80%',
      once: true
    },
    opacity: 0,
    x: 30,
    duration: 0.8,
    ease: 'power2.out'
  });

  // CTA Section reveal
  window.gsap.from('.projects-cta-content', {
    scrollTrigger: {
      trigger: '.projects-cta-section',
      start: 'top 85%',
      once: true
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out'
  });
}
