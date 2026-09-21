/**
 * ==========================================================================
 * GS SOWMIYA BUILDERS — CENTRALIZED GLOBAL COMPONENT LOADER
 * Single source of truth for:
 * 1. NAVBAR (navbar.html)
 * 2. PAGE BANNER (page-banner.html)
 * 3. FINAL CTA (final-cta.html)
 * 4. FOOTER (footer.html)
 * 5. FLOATING ACTIONS (floating-actions.html)
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
        <img src="/gssb-logo.svg" alt="GS Sowmiya Builders Pvt. Ltd" class="brand-logo-img" width="180" height="48" />
      </a>

      <nav class="nav-menu" aria-label="Primary Navigation">
        <a href="/" class="nav-link" data-nav="home">HOME</a>
        
        <!-- About Us Dropdown -->
        <div class="nav-item-dropdown" data-dropdown="about">
          <button class="nav-link nav-dropdown-trigger" type="button" aria-expanded="false" aria-haspopup="true" data-nav="about">
            <span>ABOUT US</span>
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
                  <span class="nav-dropdown-desc">15+ years of engineering mastery &amp; values</span>
                </div>
              </a>
              
              <a href="/team.html" class="nav-dropdown-link" role="menuitem" data-nav="team">
                <span class="nav-dropdown-num">02</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">OUR TEAM</span>
                  <span class="nav-dropdown-desc">Meet our senior engineering directors</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Services Dropdown -->
        <div class="nav-item-dropdown" data-dropdown="services">
          <button class="nav-link nav-dropdown-trigger" type="button" aria-expanded="false" aria-haspopup="true" data-nav="services">
            <span>SERVICES</span>
            <svg class="nav-dropdown-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          <div class="nav-dropdown-menu" role="menu" aria-label="Services Menu">
            <div class="nav-dropdown-inner">
              <a href="/services.html" class="nav-dropdown-link" role="menuitem" data-nav="all-services">
                <span class="nav-dropdown-num">00</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">ALL SERVICES</span>
                  <span class="nav-dropdown-desc">Comprehensive architectural &amp; structural spectrum</span>
                </div>
              </a>

              <a href="/services/residential-construction.html" class="nav-dropdown-link" role="menuitem" data-nav="service-residential">
                <span class="nav-dropdown-num">01</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">RESIDENTIAL CONSTRUCTION</span>
                  <span class="nav-dropdown-desc">Custom luxury estates, villas &amp; residences</span>
                </div>
              </a>
              
              <a href="/services/commercial-construction.html" class="nav-dropdown-link" role="menuitem" data-nav="service-commercial">
                <span class="nav-dropdown-num">02</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">COMMERCIAL CONSTRUCTION</span>
                  <span class="nav-dropdown-desc">Grade-A corporate towers &amp; business complexes</span>
                </div>
              </a>
              
              <a href="/services/industrial-construction.html" class="nav-dropdown-link" role="menuitem" data-nav="service-industrial">
                <span class="nav-dropdown-num">03</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">INDUSTRIAL CONSTRUCTION</span>
                  <span class="nav-dropdown-desc">Heavy industrial parks &amp; logistical facilities</span>
                </div>
              </a>
              
              <a href="/services/renovation-remodeling.html" class="nav-dropdown-link" role="menuitem" data-nav="service-renovation">
                <span class="nav-dropdown-num">04</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">RENOVATION &amp; REMODELING</span>
                  <span class="nav-dropdown-desc">Structural transformation &amp; interior renewal</span>
                </div>
              </a>
            </div>
            <div class="nav-dropdown-footer">
              <a href="/services.html" class="nav-dropdown-footer-link">
                <span>View Full Capabilities Spectrum</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </div>
        </div>

        <a href="/projects.html" class="nav-link" data-nav="projects">PROJECTS</a>
        <a href="/contact.html" class="nav-link" data-nav="contact">CONTACT US</a>
      </nav>

      <div class="nav-actions">
        <a href="https://wa.me/917010517729?text=Hello%20GS%20Sowmiya%20Builders%2C%20I%20would%20like%20to%20discuss%20an%20upcoming%20construction%20project." 
           class="btn btn-whatsapp-nav btn-quote-desktop" 
           target="_blank" 
           rel="noopener noreferrer" 
           aria-label="Contact GS Sowmiya Builders via WhatsApp on +91 70105 17729">
          <span class="whatsapp-icon-wrap" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
            </svg>
          </span>
          <span class="whatsapp-nav-text">+91 70105 17729</span>
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
    <a href="/" class="brand-logo" style="margin-bottom: 24px;" aria-label="GS Sowmiya Builders Home">
      <img src="/gssb-logo.svg" alt="GS Sowmiya Builders Pvt. Ltd" class="brand-logo-img" width="180" height="48" />
    </a>
    <nav class="mobile-nav-links">
      <a href="/" class="mobile-nav-link" data-nav="home">HOME <span>→</span></a>
      
      <!-- Mobile Submenu Accordion for About Us -->
      <div class="mobile-nav-accordion" id="mobile-about-accordion">
        <button type="button" class="mobile-nav-link mobile-accordion-btn" aria-expanded="false" aria-controls="mobile-about-sub" data-nav="about">
          <span>ABOUT US</span>
          <span class="mobile-accordion-icon" aria-hidden="true">+</span>
        </button>
        <div class="mobile-nav-sublist" id="mobile-about-sub">
          <a href="/about.html" class="mobile-sublink" data-nav="about-us">
            <span class="mobile-sublink-num">01</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">About Us</span>
              <span class="mobile-sublink-desc">15+ years of architectural excellence</span>
            </div>
          </a>
          <a href="/team.html" class="mobile-sublink" data-nav="team">
            <span class="mobile-sublink-num">02</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Our Team</span>
              <span class="mobile-sublink-desc">Meet the engineering directors</span>
            </div>
          </a>
        </div>
      </div>

      <!-- Mobile Submenu Accordion for Services -->
      <div class="mobile-nav-accordion" id="mobile-services-accordion">
        <button type="button" class="mobile-nav-link mobile-accordion-btn" aria-expanded="false" aria-controls="mobile-services-sub" data-nav="services">
          <span>SERVICES</span>
          <span class="mobile-accordion-icon" aria-hidden="true">+</span>
        </button>
        <div class="mobile-nav-sublist" id="mobile-services-sub">
          <a href="/services.html" class="mobile-sublink" data-nav="all-services">
            <span class="mobile-sublink-num">00</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">All Services</span>
              <span class="mobile-sublink-desc">Full construction capabilities</span>
            </div>
          </a>
          <a href="/services/residential-construction.html" class="mobile-sublink" data-nav="service-residential">
            <span class="mobile-sublink-num">01</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Residential Construction</span>
              <span class="mobile-sublink-desc">Custom luxury homes &amp; villas</span>
            </div>
          </a>
          <a href="/services/commercial-construction.html" class="mobile-sublink" data-nav="service-commercial">
            <span class="mobile-sublink-num">02</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Commercial Construction</span>
              <span class="mobile-sublink-desc">Towers, hubs &amp; offices</span>
            </div>
          </a>
          <a href="/services/industrial-construction.html" class="mobile-sublink" data-nav="service-industrial">
            <span class="mobile-sublink-num">03</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Industrial Construction</span>
              <span class="mobile-sublink-desc">Industrial plants &amp; logistics</span>
            </div>
          </a>
          <a href="/services/renovation-remodeling.html" class="mobile-sublink" data-nav="service-renovation">
            <span class="mobile-sublink-num">04</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Renovation &amp; Remodeling</span>
              <span class="mobile-sublink-desc">Restoration &amp; renewal</span>
            </div>
          </a>
        </div>
      </div>

      <a href="/projects.html" class="mobile-nav-link" data-nav="projects">PROJECTS <span>→</span></a>
      <a href="/contact.html" class="mobile-nav-link" data-nav="contact">CONTACT US <span>→</span></a>
    </nav>
  </div>
  <div class="mobile-nav-footer">
    <a href="https://wa.me/917010517729?text=Hello%20GS%20Sowmiya%20Builders%2C%20I%20would%20like%20to%20discuss%20an%20upcoming%20construction%20project." 
       class="btn btn-whatsapp-drawer" 
       target="_blank" 
       rel="noopener noreferrer" 
       style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
      </svg>
      <span>WHATSAPP: +91 70105 17729</span>
    </a>
    <p style="font-size: 0.8125rem; color: var(--text-muted); text-align: center; margin-top: 14px;">
      Vengaivasal, Chennai • Tamil Nadu
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
      <span id="banner-eyebrow-text">CORPORATE HERITAGE &amp; ENGINEERING INTEGRITY</span>
    </div>

    <h1 class="page-banner-title" id="banner-title-text">
      ABOUT US
    </h1>

    <p class="page-banner-desc" id="banner-desc-text">
      Second-generation Chennai builder dedicated to making dream homes accessible to all classes of people, backed by over 30 years of family construction mastery.
    </p>
  </div>
</section>
`,

  finalCta: `
<section class="final-cta-section" id="final-cta-block" aria-label="Initiate Your Project Call to Action">
  <div class="cta-backdrop-image" aria-hidden="true"></div>
  <div class="cta-gold-accent-line" aria-hidden="true"></div>
  
  <div class="site-container">
    <div class="cta-content-box" data-reveal>
      <div class="section-eyebrow eyebrow-dark">
        <span>HAVE A PROJECT IN MIND?</span>
      </div>
      <h2 class="cta-title">
        LET'S BUILD<br>SOMETHING<br>EXCEPTIONAL.
      </h2>
      <p class="cta-desc">
        Planning an independent home, villa, apartment, joint venture, or renovation in Chennai? Consult directly with our engineering team for transparent pricing and dependable delivery.
      </p>
      <div class="cta-actions">
        <a href="/contact.html" class="btn btn-gold" id="final-cta-start-btn">
          <span>START YOUR PROJECT</span>
          <span class="btn-icon-circle" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="7" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </span>
        </a>
        <a href="/contact.html" class="btn btn-outline-white" id="final-cta-contact-btn">
          <span>CONTACT US</span>
          <span aria-hidden="true">→</span>
        </a>
        <a href="https://wa.me/917010517729?text=Hello%20GS%20Sowmiya%20Builders%2C%20I%20would%20like%20to%20discuss%20an%20upcoming%20construction%20project." 
           class="btn btn-whatsapp-cta" 
           id="final-cta-whatsapp-btn"
           target="_blank" 
           rel="noopener noreferrer" 
           aria-label="WhatsApp GS Sowmiya Builders directly">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
          </svg>
          <span>WHATSAPP US</span>
        </a>
      </div>
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
          <img src="/gssb-logo-dark.svg" alt="GS Sowmiya Builders Pvt. Ltd" class="footer-logo-img" width="220" height="68" />
        </a>
        <p class="footer-brand-desc">
          GS Sowmiya Builders Private Limited is a second-generation Chennai builder dedicated to making quality homes accessible to all classes of people, backed by a 30+ year family construction legacy.
        </p>
        <div class="footer-social-links" aria-label="Social Media">
          <a href="https://www.facebook.com/people/GS-Sowmiya-Builders-Pvt-Ltd/" target="_blank" rel="noopener noreferrer" aria-label="GS Sowmiya Builders on Facebook" class="social-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="https://wa.me/917010517729" target="_blank" rel="noopener noreferrer" aria-label="GS Sowmiya Builders on WhatsApp" class="social-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
            </svg>
          </a>
          <a href="mailto:info@gssowmiyabuilders.com" aria-label="Email GS Sowmiya Builders" class="social-icon-btn">
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
          <li><a href="/services.html#joint-ventures">Joint Venture Development</a></li>
          <li><a href="/services.html#turnkey-contracts">Turnkey Building Contracts</a></li>
          <li><a href="/services/renovation-remodeling.html">Renovation &amp; Remodeling</a></li>
          <li><a href="/services.html#interior-design">Interior Design &amp; Modular Woodwork</a></li>
          <li><a href="/services/commercial-construction.html">Commercial Construction</a></li>
          <li><a href="/services.html#faq">Frequently Asked Questions</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Registered Office</h4>
        <ul class="footer-links-list">
          <li><span style="color: #777; font-size: 0.8125rem;">Address:</span> New No: 10/517, Old No: 1/425A, Front Portion, Ponni Amman Koil Street, Vengaivasal, Chennai 600126</li>
          <li><span style="color: #777; font-size: 0.8125rem;">Phone:</span> <a href="tel:+917010517729">+91 70105 17729</a></li>
          <li><span style="color: #777; font-size: 0.8125rem;">WhatsApp:</span> <a href="https://wa.me/917010517729" target="_blank" rel="noopener noreferrer">+91 70105 17729</a></li>
          <li><span style="color: #777; font-size: 0.8125rem;">Email:</span> <a href="mailto:info@gssowmiyabuilders.com">info@gssowmiyabuilders.com</a></li>
          <li><span style="color: #777; font-size: 0.8125rem;">CIN:</span> U43299TN2023PTC161774</li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom-bar">
      <p>© <span class="dynamic-copyright-year">2026</span> GS Sowmiya Builders Private Limited. All Rights Reserved.</p>
      <div class="footer-legal-links">
        <a href="/privacy-policy.html">Privacy Policy</a>
        <a href="/terms-and-conditions.html">Terms &amp; Conditions</a>
      </div>
    </div>
  </div>
</footer>
`,

  floatingActions: `
<div class="floating-actions-stack" aria-label="Quick Actions">
  <a href="https://wa.me/917010517729?text=Hello%20GS%20Sowmiya%20Builders,%20I%20would%20like%20to%20enquire%20about%20a%20construction%20project." 
     class="floating-btn floating-whatsapp" 
     aria-label="Chat on WhatsApp" 
     target="_blank" 
     rel="noopener noreferrer">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
    </svg>
    <span class="floating-btn-tooltip">Chat with us</span>
  </a>

  <a href="tel:+917010517729" 
     class="floating-btn floating-phone" 
     aria-label="Call GS Sowmiya Builders directly">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
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
 * @param {string} options.activeNav - 'home' | 'about' | 'services' | 'projects' | 'contact'
 * @param {Object} [options.banner] - { title, eyebrow, breadcrumb, desc, bgImage }
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
    const bannerHTML = await fetchComponentHTML('pageBanner', '/components/page-banner.html');
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

  // 3. FINAL CTA COMPONENT (reusable global conversion block)
  const finalCtaEl = document.getElementById('final-cta') || document.querySelector('[data-component="final-cta"]');
  if (finalCtaEl) {
    const finalCtaHTML = await fetchComponentHTML('finalCta', '/components/final-cta.html');
    if (finalCtaHTML) {
      finalCtaEl.innerHTML = finalCtaHTML;
    }
  }

  // 4. FOOTER
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

  // 5. FLOATING ACTIONS (WhatsApp, Phone, Scroll-To-Top)
  const floatingActionsEl = document.getElementById('floating-actions') || document.querySelector('[data-component="floating-actions"]');
  if (floatingActionsEl) {
    const floatingHTML = await fetchComponentHTML('floatingActions', '/components/floating-actions.html');
    floatingActionsEl.innerHTML = floatingHTML;

    // Initialize floating actions functionality
    initFloatingActions();
  }

  initPrivacyAndAnalytics();
}

function initPrivacyAndAnalytics() {
  if (window.__gssbAnalyticsInitialized) return;
  window.__gssbAnalyticsInitialized = true;

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
  if (!measurementId) return;

  const consentKey = 'gssb-analytics-consent';
  const loadAnalytics = () => {
    if (window.gtag) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { anonymize_ip: true });
  };

  window.gssbTrack = (eventName, params = {}) => {
    if (window.gtag) window.gtag('event', eventName, params);
  };

  const consent = localStorage.getItem(consentKey);
  if (consent === 'accepted') {
    loadAnalytics();
  } else if (consent !== 'rejected') {
    const banner = document.createElement('aside');
    banner.className = 'cookie-consent';
    banner.setAttribute('aria-label', 'Analytics consent');
    banner.innerHTML = `
      <p>We use optional analytics to understand website usage. Read our <a href="/privacy-policy.html">Privacy Policy</a>.</p>
      <div class="cookie-consent-actions">
        <button type="button" class="btn btn-outline-white cookie-reject">Necessary only</button>
        <button type="button" class="btn btn-gold cookie-accept">Accept analytics</button>
      </div>`;
    document.body.appendChild(banner);

    const close = (choice) => {
      localStorage.setItem(consentKey, choice);
      banner.remove();
      if (choice === 'accepted') loadAnalytics();
    };
    banner.querySelector('.cookie-accept')?.addEventListener('click', () => close('accepted'));
    banner.querySelector('.cookie-reject')?.addEventListener('click', () => close('rejected'));
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (href.startsWith('https://wa.me/')) window.gssbTrack('whatsapp_click');
    if (href.startsWith('tel:')) window.gssbTrack('phone_click');
    if (link.matches('.btn, [data-action="scroll-to-enquiry"]')) window.gssbTrack('cta_click', { destination: href });
  });
}
