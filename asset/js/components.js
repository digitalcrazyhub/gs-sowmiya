/**
 * ==========================================================================
 * GS SOWMIYA BUILDERS — CENTRALIZED GLOBAL COMPONENT LOADER
 * Single source of truth for:
 * 1. NAVBAR
 * 2. PAGE BANNER
 * 3. FOOTER
 * 4. FLOATING ACTIONS (WhatsApp, Phone, Scroll-to-Top)
 * ==========================================================================
 */

import { initNavbar } from './navbar.js';
import { initFloatingActions } from './floating-actions.js';

// Pre-compiled component templates as guaranteed zero-latency fallbacks
const COMPONENT_FALLBACKS = {
  navbar: `
<header class="site-header" id="site-header">
  <div class="site-container">
    <div class="nav-wrapper">
      <a href="/" class="brand-logo" aria-label="GS Sowmiya Builders Home">
        <div class="brand-mark">GS</div>
        <div class="brand-text">
          <span class="brand-name">GS SOWMIYA</span>
          <span class="brand-sub">BUILDERS</span>
        </div>
      </a>

      <nav class="nav-menu" aria-label="Primary Navigation">
        <a href="/" class="nav-link" data-nav="home">HOME</a>
        
        <!-- About Dropdown -->
        <div class="nav-item-dropdown" data-dropdown="about">
          <button class="nav-link nav-dropdown-trigger" type="button" aria-expanded="false" aria-haspopup="true" data-nav="about">
            <span>ABOUT</span>
            <svg class="nav-dropdown-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          <div class="nav-dropdown-menu" role="menu" aria-label="About Menu">
            <div class="nav-dropdown-inner">
              <a href="/about.html" class="nav-dropdown-link" role="menuitem" data-nav="about-us">
                <span class="nav-dropdown-num">01</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">ABOUT US</span>
                  <span class="nav-dropdown-desc">Learn about GS Sowmiya Builders</span>
                </div>
              </a>
              
              <a href="/team.html" class="nav-dropdown-link" role="menuitem" data-nav="team">
                <span class="nav-dropdown-num">02</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">TEAM</span>
                  <span class="nav-dropdown-desc">Meet the people behind our work</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <a href="/services.html" class="nav-link" data-nav="services">SERVICES</a>
        
        <!-- Individual Services Dropdown -->
        <div class="nav-item-dropdown" data-dropdown="individual-services">
          <button class="nav-link nav-dropdown-trigger" type="button" aria-expanded="false" aria-haspopup="true" data-nav="individual-services">
            <span>INDIVIDUAL SERVICES</span>
            <svg class="nav-dropdown-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          <div class="nav-dropdown-menu" role="menu" aria-label="Individual Services Menu">
            <div class="nav-dropdown-inner">
              <a href="/services/residential-construction.html" class="nav-dropdown-link" role="menuitem" data-nav="service-residential">
                <span class="nav-dropdown-num">01</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">RESIDENTIAL CONSTRUCTION</span>
                  <span class="nav-dropdown-desc">Homes designed around the way you live.</span>
                </div>
              </a>
              
              <a href="/services/commercial-construction.html" class="nav-dropdown-link" role="menuitem" data-nav="service-commercial">
                <span class="nav-dropdown-num">02</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">COMMERCIAL CONSTRUCTION</span>
                  <span class="nav-dropdown-desc">Spaces designed for business.</span>
                </div>
              </a>
              
              <a href="/services/industrial-construction.html" class="nav-dropdown-link" role="menuitem" data-nav="service-industrial">
                <span class="nav-dropdown-num">03</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">INDUSTRIAL CONSTRUCTION</span>
                  <span class="nav-dropdown-desc">Structures engineered for demanding environments.</span>
                </div>
              </a>
              
              <a href="/services/renovation-remodeling.html" class="nav-dropdown-link" role="menuitem" data-nav="service-renovation">
                <span class="nav-dropdown-num">04</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">RENOVATION &amp; REMODELING</span>
                  <span class="nav-dropdown-desc">Transforming existing spaces for new possibilities.</span>
                </div>
              </a>
            </div>
            <div class="nav-dropdown-footer">
              <a href="/services.html" class="nav-dropdown-footer-link">
                <span>View All Services &amp; Capabilities</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </div>
        </div>

        <a href="/projects.html" class="nav-link" data-nav="projects">PROJECTS</a>
        <a href="/industries.html" class="nav-link" data-nav="industries">INDUSTRIES</a>
        <a href="/contact.html" class="nav-link" data-nav="contact">CONTACT</a>
      </nav>

      <div class="nav-actions">
        <a href="/contact.html" class="btn btn-primary btn-quote-desktop">
          <span>GET A QUOTE</span>
          <span class="btn-icon-circle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </span>
        </a>
        
        <button class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-nav-drawer" type="button">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </div>
</header>

<div class="mobile-nav-overlay" id="mobile-nav-overlay"></div>
<aside class="mobile-nav-drawer" id="mobile-nav-drawer" aria-label="Mobile Navigation">
  <div class="mobile-nav-top">
    <div class="brand-logo" style="margin-bottom: 24px;">
      <div class="brand-mark">GS</div>
      <div class="brand-text">
        <span class="brand-name">GS SOWMIYA</span>
        <span class="brand-sub">BUILDERS</span>
      </div>
    </div>
    <nav class="mobile-nav-links">
      <a href="/" class="mobile-nav-link" data-nav="home">HOME <span>→</span></a>
      
      <!-- Mobile Submenu Accordion for About -->
      <div class="mobile-nav-accordion" id="mobile-about-accordion">
        <button type="button" class="mobile-nav-link mobile-accordion-btn" aria-expanded="false" aria-controls="mobile-about-sub" data-nav="about">
          <span>ABOUT</span>
          <span class="mobile-accordion-icon" aria-hidden="true">+</span>
        </button>
        <div class="mobile-nav-sublist" id="mobile-about-sub">
          <a href="/about.html" class="mobile-sublink" data-nav="about-us">
            <span class="mobile-sublink-num">01</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">About Us</span>
              <span class="mobile-sublink-desc">Learn about GS Sowmiya Builders</span>
            </div>
          </a>
          <a href="/team.html" class="mobile-sublink" data-nav="team">
            <span class="mobile-sublink-num">02</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Team</span>
              <span class="mobile-sublink-desc">Meet the people behind our work</span>
            </div>
          </a>
        </div>
      </div>

      <a href="/services.html" class="mobile-nav-link" data-nav="services">SERVICES <span>→</span></a>

      <!-- Mobile Submenu Accordion for Individual Services -->
      <div class="mobile-nav-accordion" id="mobile-services-accordion">
        <button type="button" class="mobile-nav-link mobile-accordion-btn" aria-expanded="false" aria-controls="mobile-services-sub">
          <span>INDIVIDUAL SERVICES</span>
          <span class="mobile-accordion-icon" aria-hidden="true">+</span>
        </button>
        <div class="mobile-nav-sublist" id="mobile-services-sub">
          <a href="/services/residential-construction.html" class="mobile-sublink" data-nav="service-residential">
            <span class="mobile-sublink-num">01</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Residential Construction</span>
              <span class="mobile-sublink-desc">Homes designed around the way you live.</span>
            </div>
          </a>
          <a href="/services/commercial-construction.html" class="mobile-sublink" data-nav="service-commercial">
            <span class="mobile-sublink-num">02</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Commercial Construction</span>
              <span class="mobile-sublink-desc">Spaces designed for business.</span>
            </div>
          </a>
          <a href="/services/industrial-construction.html" class="mobile-sublink" data-nav="service-industrial">
            <span class="mobile-sublink-num">03</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Industrial Construction</span>
              <span class="mobile-sublink-desc">Structures engineered for demanding environments.</span>
            </div>
          </a>
          <a href="/services/renovation-remodeling.html" class="mobile-sublink" data-nav="service-renovation">
            <span class="mobile-sublink-num">04</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Renovation &amp; Remodeling</span>
              <span class="mobile-sublink-desc">Transforming existing spaces for new possibilities.</span>
            </div>
          </a>
        </div>
      </div>

      <a href="/projects.html" class="mobile-nav-link" data-nav="projects">PROJECTS <span>→</span></a>
      <a href="/industries.html" class="mobile-nav-link" data-nav="industries">INDUSTRIES <span>→</span></a>
      <a href="/contact.html" class="mobile-nav-link" data-nav="contact">CONTACT <span>→</span></a>
    </nav>
  </div>
  <div class="mobile-nav-footer">
    <a href="/contact.html" class="btn btn-burgundy" style="width: 100%;">GET A QUOTE</a>
    <p style="font-size: 0.8125rem; color: var(--text-muted); text-align: center; margin-top: 14px;">
      Chennai &amp; Tamil Nadu • +91 98400 12345
    </p>
  </div>
</aside>
`,

  pageBanner: `
<section class="page-banner" id="global-page-banner" aria-label="Page Banner">
  <div class="page-banner-bg" id="page-banner-bg"></div>
  <div class="page-banner-overlay"></div>
  <div class="page-banner-accent-gold"></div>
  <div class="page-banner-accent-burgundy"></div>

  <div class="site-container page-banner-container">
    <nav class="page-banner-breadcrumb" aria-label="Breadcrumb">
      <ol class="breadcrumb-list">
        <li class="breadcrumb-item"><a href="/">HOME</a></li>
        <li class="breadcrumb-separator" aria-hidden="true">/</li>
        <li class="breadcrumb-item active" id="banner-breadcrumb-current" aria-current="page">ABOUT US</li>
      </ol>
    </nav>

    <div class="page-banner-eyebrow">
      <span class="eyebrow-accent-dot"></span>
      <span id="banner-eyebrow-text">CORPORATE HERITAGE &amp; ENGINEERING PHILOSOPHY</span>
    </div>

    <h1 class="page-banner-title" id="banner-title-text">
      ABOUT US
    </h1>

    <p class="page-banner-desc" id="banner-desc-text">
      For 15 years, GS Sowmiya Builders has translated complex structural challenges into timeless residential estates and Grade-A commercial landmarks across Tamil Nadu.
    </p>
  </div>
</section>
`,

  footer: `
<footer class="site-footer" id="site-footer">
  <div class="site-container">
    <div class="footer-top-grid">
      <div class="footer-brand-col">
        <a href="/" class="brand-logo" aria-label="GS Sowmiya Builders Home">
          <div class="brand-mark">GS</div>
          <div class="brand-text">
            <span class="brand-name">GS SOWMIYA</span>
            <span class="brand-sub">BUILDERS</span>
          </div>
        </a>
        <p class="footer-brand-desc">
          Premier architectural engineering and luxury construction studio in Chennai &amp; Tamil Nadu. 15+ years of delivering uncompromising residential estates, commercial towers, and turnkey precision.
        </p>
        <div class="footer-social-links" aria-label="Social Media">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="GS Sowmiya Builders on Instagram" class="social-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="GS Sowmiya Builders on LinkedIn" class="social-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="GS Sowmiya Builders on Facebook" class="social-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="GS Sowmiya Builders on YouTube" class="social-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </a>
        </div>
      </div>

      <div>
        <h4 class="footer-col-title">Quick Links</h4>
        <ul class="footer-links-list">
          <li><a href="/">Home</a></li>
          <li><a href="/about.html">About Us</a></li>
          <li><a href="/team.html">Our Team</a></li>
          <li><a href="/services.html">Services</a></li>
          <li><a href="/projects.html">Projects</a></li>
          <li><a href="/industries.html">Industries</a></li>
          <li><a href="/contact.html">Contact Us</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Services</h4>
        <ul class="footer-links-list">
          <li><a href="/services.html">Residential Construction</a></li>
          <li><a href="/services.html">Commercial Construction</a></li>
          <li><a href="/services.html">Industrial Construction</a></li>
          <li><a href="/services.html">Infrastructure Works</a></li>
          <li><a href="/services.html">Renovation &amp; Remodeling</a></li>
          <li><a href="/services.html">Turnkey Construction</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Contact</h4>
        <ul class="footer-links-list">
          <li><span style="color: #777; font-size: 0.8125rem;">Location:</span> Anna Nagar, Chennai, TN</li>
          <li><span style="color: #777; font-size: 0.8125rem;">Phone:</span> <a href="tel:+919840012345">+91 98400 12345</a></li>
          <li><span style="color: #777; font-size: 0.8125rem;">WhatsApp:</span> <a href="https://wa.me/919840012345" target="_blank" rel="noopener noreferrer">+91 98400 12345</a></li>
          <li><span style="color: #777; font-size: 0.8125rem;">Email:</span> <a href="mailto:contact@gssowmiyabuilders.com">contact@gssowmiyabuilders.com</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom-bar">
      <p>© <span class="dynamic-copyright-year">2026</span> GS Sowmiya Builders. All Rights Reserved.</p>
      <div class="footer-legal-links">
        <a href="/contact.html">Privacy Policy</a>
        <a href="/contact.html">Terms &amp; Conditions</a>
        <a href="/contact.html">Sitemap</a>
      </div>
    </div>
  </div>
</footer>
`,

  floatingActions: `
<div class="floating-actions-stack" aria-label="Quick Actions">
  <a href="https://wa.me/919840012345?text=Hello%20GS%20Sowmiya%20Builders,%20I%20would%20like%20to%20enquire%20about%20a%20construction%20project." 
     class="floating-btn floating-whatsapp" 
     aria-label="Chat on WhatsApp" 
     target="_blank" 
     rel="noopener noreferrer">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
    </svg>
    <span class="floating-btn-tooltip">Chat with us</span>
  </a>

  <a href="tel:+919840012345" 
     class="floating-btn floating-phone" 
     aria-label="Call GS Sowmiya Builders directly">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
    <span class="floating-btn-tooltip">Call Direct</span>
  </a>

  <button class="floating-btn floating-scroll-top" aria-label="Scroll to top of page" type="button">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
    <span class="floating-btn-tooltip">Top</span>
  </button>
</div>
`
};

/**
 * Loads an external HTML component file, falling back to alternative root path or template
 */
async function fetchComponentHTML(componentName, filePath) {
  const candidatePaths = [
    filePath,
    filePath.replace('/asset/components/', '/components/'),
    filePath.replace('/components/', '/asset/components/')
  ];

  for (const p of candidatePaths) {
    try {
      const res = await fetch(p);
      if (res.ok) {
        const html = await res.text();
        if (html && html.trim().length > 0) {
          return html;
        }
      }
    } catch (err) {
      // try next path
    }
  }

  return COMPONENT_FALLBACKS[componentName] || '';
}

/**
 * Main function to load all common components onto the current page
 * @param {Object} options
 * @param {string} options.activeNav - 'home' | 'about' | 'services' | 'projects' | 'industries' | 'contact'
 * @param {Object} [options.banner] - { title, eyebrow, breadcrumb, desc, bgImage }
 */
export async function loadGlobalComponents(options = {}) {
  const activeNav = options.activeNav || 'home';

  // 1. NAVBAR
  const navbarEl = document.getElementById('navbar') || document.querySelector('[data-component="navbar"]');
  if (navbarEl) {
    const navbarHTML = await fetchComponentHTML('navbar', '/asset/components/navbar.html');
    navbarEl.innerHTML = navbarHTML;

    // Set active link in desktop & mobile navs
    const activeLinks = navbarEl.querySelectorAll(`[data-nav="${activeNav}"]`);
    activeLinks.forEach(link => {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    });
    if (activeNav === 'team' || activeNav === 'about-us') {
      navbarEl.querySelectorAll('[data-nav="about"]').forEach(link => {
        link.classList.add('active');
      });
    }

    // Initialize navbar interactions (scroll state, mobile drawer)
    initNavbar();
  }

  // 2. PAGE BANNER (Inner pages)
  const bannerEl = document.getElementById('page-banner') || document.querySelector('[data-component="page-banner"]');
  if (bannerEl) {
    const bannerHTML = await fetchComponentHTML('pageBanner', '/asset/components/page-banner.html');
    bannerEl.innerHTML = bannerHTML;

    // Populate dynamic inner content
    const bannerConfig = options.banner || {};
    
    const breadcrumbEl = bannerEl.querySelector('#banner-breadcrumb-current');
    if (breadcrumbEl && bannerConfig.breadcrumb) {
      breadcrumbEl.textContent = bannerConfig.breadcrumb;
    }

    const eyebrowEl = bannerEl.querySelector('#banner-eyebrow-text');
    if (eyebrowEl && bannerConfig.eyebrow) {
      eyebrowEl.textContent = bannerConfig.eyebrow;
    }

    const titleEl = bannerEl.querySelector('#banner-title-text');
    if (titleEl && bannerConfig.title) {
      titleEl.innerHTML = bannerConfig.title;
    }

    const descEl = bannerEl.querySelector('#banner-desc-text');
    if (descEl && bannerConfig.desc) {
      descEl.textContent = bannerConfig.desc;
    }

    const bgEl = bannerEl.querySelector('#page-banner-bg');
    if (bgEl && bannerConfig.bgImage) {
      bgEl.style.backgroundImage = `url('${bannerConfig.bgImage}')`;
    }
  }

  // 3. FOOTER
  const footerEl = document.getElementById('footer') || document.querySelector('[data-component="footer"]');
  if (footerEl) {
    const footerHTML = await fetchComponentHTML('footer', '/asset/components/footer.html');
    footerEl.innerHTML = footerHTML;

    // Dynamic Copyright Year calculation
    const currentYear = new Date().getFullYear().toString();
    const yearElements = footerEl.querySelectorAll('.dynamic-copyright-year, #current-year');
    yearElements.forEach(el => {
      el.textContent = currentYear;
    });
  }

  // 4. FLOATING ACTIONS (WhatsApp, Phone, Scroll-To-Top)
  const floatingActionsEl = document.getElementById('floating-actions') || document.querySelector('[data-component="floating-actions"]');
  if (floatingActionsEl) {
    const floatingHTML = await fetchComponentHTML('floatingActions', '/asset/components/floating-actions.html');
    floatingActionsEl.innerHTML = floatingHTML;

    // Initialize floating actions functionality
    initFloatingActions();
  }

  // 5. FINAL CTA COMPONENT (reusable global conversion block)
  const finalCtaEl = document.getElementById('final-cta') || document.querySelector('[data-component="final-cta"]');
  if (finalCtaEl) {
    const finalCtaHTML = await fetchComponentHTML('finalCta', '/asset/components/final-cta.html');
    if (finalCtaHTML) {
      finalCtaEl.innerHTML = finalCtaHTML;
    }
  }
}
