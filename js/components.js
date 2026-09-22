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
          <a href="/about.html" class="nav-link nav-dropdown-trigger" data-nav="about">
            <span>ABOUT US</span>
            <svg class="nav-dropdown-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </a>
          
          <div class="nav-dropdown-menu" role="menu" aria-label="About Menu">
            <div class="nav-dropdown-inner">
              <a href="/team.html" class="nav-dropdown-link" role="menuitem" data-nav="team">
                <span class="nav-dropdown-num">01</span>
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
          <a href="/services.html" class="nav-link nav-dropdown-trigger" data-nav="services">
            <span>SERVICE</span>
            <svg class="nav-dropdown-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </a>
          
          <div class="nav-dropdown-menu" role="menu" aria-label="Services Menu">
            <div class="nav-dropdown-inner">
              <a href="/services/residential-construction.html" class="nav-dropdown-link" role="menuitem" data-nav="service-residential">
                <span class="nav-dropdown-num">01</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">RESIDENTIAL BUILDING CONSTRUCTION</span>
                  <span class="nav-dropdown-desc">Custom luxury estates, villas &amp; residences</span>
                </div>
              </a>
              
              <a href="/services.html#service-joint-venture" class="nav-dropdown-link" role="menuitem" data-nav="service-joint-venture">
                <span class="nav-dropdown-num">02</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">JOINT VENTURE</span>
                  <span class="nav-dropdown-desc">Landowner partnerships &amp; equitable developments</span>
                </div>
              </a>
              
              <a href="/services.html#technical-services" class="nav-dropdown-link" role="menuitem" data-nav="service-project-management">
                <span class="nav-dropdown-num">03</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">PROJECT MANAGEMENT</span>
                  <span class="nav-dropdown-desc">Timeline coordination, quality audits &amp; site execution</span>
                </div>
              </a>
              
              <a href="/services.html#secondary-services" class="nav-dropdown-link" role="menuitem" data-nav="service-consultancy">
                <span class="nav-dropdown-num">04</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">CONSULTANCY &amp; DESIGN</span>
                  <span class="nav-dropdown-desc">Architectural planning, 2D/3D elevations &amp; approvals</span>
                </div>
              </a>

              <a href="/services/renovation-remodeling.html" class="nav-dropdown-link" role="menuitem" data-nav="service-interiors">
                <span class="nav-dropdown-num">05</span>
                <div class="nav-dropdown-info">
                  <span class="nav-dropdown-title">INTERIORS</span>
                  <span class="nav-dropdown-desc">Bespoke interior architecture, modular spaces &amp; styling</span>
                </div>
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
    <div class="mobile-drawer-header">
      <a href="/" class="brand-logo mobile-drawer-logo" aria-label="GS Sowmiya Builders Home">
        <img src="/Gssb_logo.jpg" alt="GS Sowmiya Builders Pvt. Ltd" class="brand-logo-img" width="160" height="42" />
      </a>
      <button class="mobile-drawer-close" id="mobile-drawer-close" aria-label="Close menu" type="button">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <nav class="mobile-nav-links" aria-label="Mobile Menu Links">
      <a href="/" class="mobile-nav-link" data-nav="home">
        <span>HOME</span>
        <span class="mobile-nav-arrow" aria-hidden="true">→</span>
      </a>
      
      <!-- Mobile Submenu Accordion for About Us -->
      <div class="mobile-nav-accordion" id="mobile-about-accordion">
        <div class="mobile-accordion-header">
          <a href="/about.html" class="mobile-nav-link" data-nav="about">
            <span>ABOUT US</span>
          </a>
          <button type="button" class="mobile-accordion-btn" aria-expanded="false" aria-controls="mobile-about-sub" aria-label="Toggle About Us submenu">
            <span class="mobile-accordion-icon" aria-hidden="true">+</span>
          </button>
        </div>
        <div class="mobile-nav-sublist" id="mobile-about-sub">
          <a href="/team.html" class="mobile-sublink" data-nav="team">
            <span class="mobile-sublink-num">01</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Our Team</span>
              <span class="mobile-sublink-desc">Meet the engineering directors</span>
            </div>
          </a>
        </div>
      </div>

      <!-- Mobile Submenu Accordion for Services -->
      <div class="mobile-nav-accordion" id="mobile-services-accordion">
        <div class="mobile-accordion-header">
          <a href="/services.html" class="mobile-nav-link" data-nav="services">
            <span>SERVICE</span>
          </a>
          <button type="button" class="mobile-accordion-btn" aria-expanded="false" aria-controls="mobile-services-sub" aria-label="Toggle Service submenu">
            <span class="mobile-accordion-icon" aria-hidden="true">+</span>
          </button>
        </div>
        <div class="mobile-nav-sublist" id="mobile-services-sub">
          <a href="/services/residential-construction.html" class="mobile-sublink" data-nav="service-residential">
            <span class="mobile-sublink-num">01</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Residential Building Construction</span>
              <span class="mobile-sublink-desc">Custom luxury homes &amp; villas</span>
            </div>
          </a>
          <a href="/services.html#service-joint-venture" class="mobile-sublink" data-nav="service-joint-venture">
            <span class="mobile-sublink-num">02</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Joint Venture</span>
              <span class="mobile-sublink-desc">Landowner partnerships &amp; developments</span>
            </div>
          </a>
          <a href="/services.html#technical-services" class="mobile-sublink" data-nav="service-project-management">
            <span class="mobile-sublink-num">03</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Project Management</span>
              <span class="mobile-sublink-desc">Timeline coordination &amp; site execution</span>
            </div>
          </a>
          <a href="/services.html#secondary-services" class="mobile-sublink" data-nav="service-consultancy">
            <span class="mobile-sublink-num">04</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Consultancy &amp; Design</span>
              <span class="mobile-sublink-desc">Architectural planning &amp; approvals</span>
            </div>
          </a>
          <a href="/services/renovation-remodeling.html" class="mobile-sublink" data-nav="service-interiors">
            <span class="mobile-sublink-num">05</span>
            <div class="mobile-sublink-text">
              <span class="mobile-sublink-title">Interiors</span>
              <span class="mobile-sublink-desc">Bespoke interior architecture &amp; styling</span>
            </div>
          </a>
        </div>
      </div>

      <a href="/projects.html" class="mobile-nav-link" data-nav="projects">
        <span>PROJECTS</span>
        <span class="mobile-nav-arrow" aria-hidden="true">→</span>
      </a>
      <a href="/contact.html" class="mobile-nav-link" data-nav="contact">
        <span>CONTACT US</span>
        <span class="mobile-nav-arrow" aria-hidden="true">→</span>
      </a>
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
    <a href="tel:+919043156670" style="display: block; text-align: center; color: var(--gold-light, #d9a24a); font-size: 0.875rem; margin-top: 10px; font-weight: 600; text-decoration: none;">
      CALL: +91 90431 56670
    </a>
    <p style="font-size: 0.8125rem; color: var(--text-muted); text-align: center; margin-top: 10px; line-height: 1.4;">
      No 106, Nallasamy Tower, Velachery Main Road, Pallikaranai, Chennai - 600 100.
    </p>
  </div>
</aside>
`,

  pageBanner: `
<section class="page-hero" id="global-page-banner" aria-label="Hero Banner">
  <div class="page-hero-bg" id="page-banner-bg" aria-hidden="true"></div>
  <div class="page-hero-overlay" aria-hidden="true"></div>
  <div class="page-hero-grid-pattern" aria-hidden="true"></div>

  <div class="site-container">
    <div class="page-hero-content">
      <nav class="page-breadcrumb" aria-label="Breadcrumb Navigation">
        <a href="/">HOME</a>
        <span class="page-breadcrumb-sep">/</span>
        <span class="page-breadcrumb-current" id="banner-breadcrumb-current">ABOUT US</span>
      </nav>

      // <div class="page-hero-eyebrow">
      //   <span id="banner-eyebrow-text">CORPORATE HERITAGE &amp; ENGINEERING INTEGRITY</span>
      // </div>

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

  finalCta: `
<section class="final-cta-section" id="cta" aria-label="Call to Action">
  <div class="cta-backdrop-image" aria-hidden="true"></div>
  <div class="cta-gold-accent-line" aria-hidden="true"></div>
  
  <div class="site-container">
    <div class="cta-content-box" data-reveal>
      <div class="section-eyebrow eyebrow-dark">
        <span>Initiate Your Project</span>
      </div>
      <h2 class="cta-title">Let’s Build Something Exceptional.</h2>
      <p class="cta-desc">
        Have an architectural villa, commercial hub, or turnkey development in mind? Discuss your vision with our senior engineering directors.
      </p>
      <div class="cta-actions">
        <a href="/contact.html" class="btn btn-gold" id="final-cta-start-btn">
          <span>TALK TO OUR TEAM</span>
          <span class="btn-icon-circle" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </span>
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
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
          <li><a href="/services.html#joint-ventures">Joint Venture Development</a></li>
          <li><a href="/services.html#turnkey-contracts">Turnkey Building Contracts</a></li>
          <li><a href="/services/renovation-remodeling.html">Renovation &amp; Remodeling</a></li>
          <li><a href="/services.html#interior-design">Interior Design &amp; Modular Woodwork</a></li>
          <li><a href="/services/commercial-construction.html">Commercial Construction</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Registered Office</h4>
        <ul class="footer-links-list">
          <li>
            <span style="color: #777; font-size: 0.8125rem; display: block; margin-bottom: 2px;">Address:</span>
            No 106, Nallasamy Tower, Velachery Main Road, Pallikaranai, Chennai - 600 100.
            <a href="https://maps.app.goo.gl/HmbHVh8q1EZVrsqi7" target="_blank" rel="noopener noreferrer" style="color: #d9a24a; display: block; margin-top: 4px; font-size: 0.8125rem;">View on Google Maps →</a>
          </li>
          <li><span style="color: #777; font-size: 0.8125rem;">Phone:</span> <a href="tel:+919043156670">+91 90431 56670</a></li>
          <li><span style="color: #777; font-size: 0.8125rem;">WhatsApp:</span> <a href="https://wa.me/917010517729" target="_blank" rel="noopener noreferrer">+91 70105 17729</a></li>
          <li><span style="color: #777; font-size: 0.8125rem;">Email:</span> <a href="mailto:md@sowmiyabuilders.com">md@sowmiyabuilders.com</a></li>
          <li><span style="color: #777; font-size: 0.8125rem;">Website:</span> <a href="https://gssowmiyabuilders.com" target="_blank" rel="noopener noreferrer">gssowmiyabuilders.com</a></li>
          <li><span style="color: #777; font-size: 0.8125rem;">CIN:</span> U43299TN2023PTC161774</li>
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
      if (finalCtaEl.tagName.toLowerCase() === 'div') {
        finalCtaEl.outerHTML = finalCtaHTML;
      } else {
        finalCtaEl.innerHTML = finalCtaHTML;
      }
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
}
