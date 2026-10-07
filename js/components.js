/**
 * ==========================================================================
 * GS SOWMIYA BUILDERS — CENTRALIZED GLOBAL COMPONENT LOADER
 * Single source of truth for:
 * 1. NAVBAR (navbar.html)
 * 2. PAGE BANNER (page-banner.html)
 * 3. FOOTER (footer.html)
 * 4. FLOATING ACTIONS (floating-actions.html)
 * ==========================================================================
 */

import { initNavbar } from './navbar.js';
import { initFloatingActions } from './floating-actions.js';

// Pre-compiled component templates as guaranteed zero-latency fallbacks
const COMPONENT_FALLBACKS = {
  pageBanner: `
<section class="page-hero" id="global-page-banner" aria-label="Hero Banner">
  <div class="page-hero-bg" id="page-banner-bg" style="background-image: url('/image/page-banner.png');" aria-hidden="true"></div>
  <div class="page-hero-overlay" aria-hidden="true"></div>
  <div class="page-hero-grid-pattern" aria-hidden="true"></div>

  <div class="site-container">
    <div class="page-hero-content">
      <nav class="page-breadcrumb" aria-label="Breadcrumb Navigation">
        <a href="/">HOME</a>
        <span class="page-breadcrumb-sep">/</span>
        <span class="page-breadcrumb-current" id="banner-breadcrumb-current">ABOUT US</span>
      </nav>

      <h1 class="page-hero-title" id="banner-title-text">
        About Us
      </h1>

      <p class="page-hero-desc" id="banner-desc-text">
        Backed by 15+ years of on-site building contracting wisdom, GS Sowmiya Builders Private Limited delivers residential homes, modern apartments, and fair joint ventures across Chennai.
      </p>
    </div>
  </div>
</section>
`,

  footer: `
<footer class="site-footer" id="site-footer">
  <div class="site-container">
    <div class="footer-top-grid">
      <div class="footer-brand-col">
        <a href="/" class="brand-logo footer-brand-logo" aria-label="GS Sowmiya Builders Home">
          <img src="/image/Gssb_home_logo.png" alt="GS Sowmiya Builders Pvt. Ltd" class="footer-logo-img" width="220" height="68" />
        </a>
        <p class="footer-brand-desc">
          GS Sowmiya Builders Private Limited is a second-generation builder in Chennai dedicated to making dream homes accessible to all classes of people, backed by 15+ years of building contracting excellence.
        </p>
        <div class="footer-social-links" aria-label="Social Media">
          <a href="https://www.facebook.com/share/1A3vYczzvJ/" target="_blank" rel="noopener noreferrer" aria-label="GS Sowmiya Builders on Facebook" class="social-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="https://www.instagram.com/gs_sowmiya_builders?igsi=eG1oNDJhcjAxN2hq" target="_blank" rel="noopener noreferrer" aria-label="GS Sowmiya Builders on Instagram" class="social-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="https://youtube.com/@sowmiyaconstruction6689?si=HtmzhtXbHHGSQuVm" target="_blank" rel="noopener noreferrer" aria-label="GS Sowmiya Builders on YouTube" class="social-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </a>
          <a href="https://wa.me/917010517729" target="_blank" rel="noopener noreferrer" aria-label="GS Sowmiya Builders on WhatsApp" class="social-icon-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="22" height="22" fill="#fff">
                    <path
                      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18.1-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18.1-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.6 66.4 14 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
          </a>
          <a href="mailto:md@sowmiyabuilders.com" aria-label="Email GS Sowmiya Builders" class="social-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
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
          <li><a href="/contact.html">Contact Us</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Services</h4>
        <ul class="footer-links-list">
          <li><a href="/services/residential-construction.html">Residential Construction</a></li>
          <li><a href="/services/joint-venture-development.html">Joint Venture Development</a></li>
          <li><a href="/services/living-spaces-homes.html">Living Spaces &amp; Homes</a></li>
          <li><a href="/services/construction-consultancy-design.html">Construction Consultancy &amp; Design</a></li>
          <li><a href="/services/interior-design-execution.html">Interior Design &amp; Execution</a></li>
          <li><a href="/services/architecture-design.html">Architecture &amp; Design</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Registered Office</h4>
        <ul class="footer-links-list">
          <li>
            <span style=" font-size: 0.8125rem; display: block; margin-bottom: 2px;">Address:</span>
            No 106, Nallasamy Tower, Velachery Main Road, Pallikaranai, Chennai - 600 100.
            <a href="https://maps.app.goo.gl/HmbHVh8q1EZVrsqi7" target="_blank" rel="noopener noreferrer" style="color: #d9a24a; display: block; margin-top: 4px; font-size: 0.8125rem;">View on Google Maps →</a>
          </li>
          <li><span style=" font-size: 0.8125rem;">Phone:</span> <a href="tel:+919043156670">+91 90431 56670</a></li>
          <li><span style=" font-size: 0.8125rem;">WhatsApp:</span> <a href="https://wa.me/917010517729" target="_blank" rel="noopener noreferrer">+91 70105 17729</a></li>
          <li><span style=" font-size: 0.8125rem;">Email:</span> <a href="mailto:md@sowmiyabuilders.com">md@sowmiyabuilders.com</a></li>
          <li><span style=" font-size: 0.8125rem;">Website:</span> <a href="https://gssowmiyabuilders.com" target="_blank" rel="noopener noreferrer">gssowmiyabuilders.com</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom-bar">
      <p>© <span class="dynamic-copyright-year">2026</span> GS Sowmiya Builders Private Limited. All Rights Reserved.</p>
      <div class="footer-legal-links">
        <a href="/privacy-policy.html">Privacy Policy</a>
        <a href="/terms-of-service.html">Terms of Service</a>
        <a href="/contact.html">RERA Compliance</a>
      </div>
    </div>
  </div>
</footer>
`,

  floatingActions: `
<div class="floating-actions-stack" aria-label="Quick Actions">
  <a href="https://wa.me/917010517729?text=Hello%20GS%20Sowmiya%20Builders%2C%20I%20would%20like%20to%20enquire%20about%20a%20construction%20project." 
     class="floating-btn floating-whatsapp" 
     aria-label="Chat on WhatsApp" 
     target="_blank" 
     rel="noopener noreferrer">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
    </svg>
    <span class="floating-btn-tooltip">WhatsApp</span>
  </a>

  <a href="tel:+919043156670" 
     class="floating-btn floating-phone" 
     aria-label="Call GS Sowmiya Builders directly on +91 90431 56670">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
    <span class="floating-btn-tooltip">Call +91 90431 56670</span>
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
  let lastError;

  for (const p of candidatePaths) {
    try {
      const res = await fetch(p);
      if (res.ok) {
        const html = await res.text();
        if (html && html.trim().length > 0) {
          if (componentName === 'footer') {
            const footerDocument = new DOMParser().parseFromString(html, 'text/html');
            const footerGrid = footerDocument.querySelector('.footer-top-grid');
            const hasAllFooterColumns =
              footerGrid?.querySelector('.footer-brand-col') &&
              footerGrid.querySelectorAll('.footer-col-title').length >= 3;

            if (!hasAllFooterColumns) {
              continue;
            }
          }

          return html;
        }
        lastError = new Error(`Empty component response from ${p}`);
      } else {
        lastError = new Error(`Component request failed with status ${res.status}: ${p}`);
      }
    } catch (err) {
      lastError = err;
    }
  }

  if (componentName === 'navbar') {
    console.error('Unable to load the shared navbar component.', lastError);
  }

  return COMPONENT_FALLBACKS[componentName] || '';
}

/**
 * Main function to load all common components onto the current page
 * @param {Object} options
 * @param {string} options.activeNav - 'home' | 'about' | 'services' | 'projects' | 'contact'
 * @param {Object} [options.banner] - { title, breadcrumb, desc, bgImage }
 */
export async function loadGlobalComponents(options = {}) {
  const activeNav = options.activeNav || 'home';

  // 1. NAVBAR
  const navbarEl = document.getElementById('navbar') || document.querySelector('[data-component="navbar"]');
  if (navbarEl) {
    const navbarHTML = await fetchComponentHTML('navbar', '/components/navbar.html');
    navbarEl.innerHTML = navbarHTML;

    // Set active link in desktop & mobile navs
    const activeLinks = navbarEl.querySelectorAll(`[data-nav="${activeNav}"]`);
    activeLinks.forEach(link => {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    });
    if (activeNav === 'about-us' || activeNav === 'about') {
      navbarEl.querySelectorAll('[data-nav="about"]').forEach(link => {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      });
    }
    if (activeNav.startsWith('service-') || activeNav === 'services') {
      navbarEl.querySelectorAll('[data-nav="services"]').forEach(link => {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      });
    }

    // Initialize navbar interactions (scroll state, mobile drawer)
    initNavbar();
  }

  // 2. PAGE BANNER (Inner pages)
  const bannerEl = document.getElementById('page-banner') || document.querySelector('[data-component="page-banner"]');
  if (bannerEl) {
    const bannerHTML = await fetchComponentHTML('pageBanner', '/components/page-banner.html');
    bannerEl.innerHTML = bannerHTML;

    // Populate dynamic inner content
    const bannerConfig = options.banner || {};
    
    const breadcrumbEl = bannerEl.querySelector('#banner-breadcrumb-current');
    if (breadcrumbEl && bannerConfig.breadcrumb) {
      breadcrumbEl.textContent = bannerConfig.breadcrumb;
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
    if (bgEl) {
      const bgImg = bannerConfig.bgImage || '/image/page-banner.png';
      bgEl.style.backgroundImage = `url('${bgImg}')`;
    }
  }

  // 3. FOOTER
  const footerEl = document.getElementById('footer') || document.querySelector('[data-component="footer"]');
  if (footerEl) {
    const footerHTML = await fetchComponentHTML('footer', '/components/footer.html');
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
    const floatingHTML = await fetchComponentHTML('floatingActions', '/components/floating-actions.html');
    floatingActionsEl.innerHTML = floatingHTML;

    // Initialize floating actions functionality
    initFloatingActions();
  }
}
