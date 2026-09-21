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


function refreshLucideIcons(root = document) {
  if (typeof window === 'undefined' || !window.lucide?.createIcons) return;
  try {
    window.lucide.createIcons({
      attrs: {
        'stroke-width': 2
      }
    });
  } catch (err) {
    // Icons are progressive enhancement; keep the existing UI functional if CDN is unavailable.
  }
}

/**
 * Loads a component from its single source-of-truth file.
 */
async function fetchComponentHTML(componentName, filePath) {
  const response = await fetch(filePath, {
    headers: { Accept: 'text/html' },
    cache: 'no-cache'
  });

  if (!response.ok) {
    throw new Error(`${componentName} component request failed: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  if (!html.trim()) {
    throw new Error(`${componentName} component returned an empty response.`);
  }

  return html;
}

/**
 * Main function to load all common components onto the current page
 * @param {Object} options
 * @param {string} options.activeNav - 'home' | 'about' | 'services' | 'projects' | 'contact'
 * @param {Object} [options.banner] - { title, eyebrow, breadcrumb, desc, bgImage }
 */
async function loadComponentSafely(componentName, placeholder, options) {
  try {
    const html = await fetchComponentHTML(componentName, options.path);
    if (placeholder) placeholder.innerHTML = html;
    return html;
  } catch (error) {
    console.error(`[GSSB] Failed to load ${componentName} component from ${options.path}`, error);
    return '';
  }
}

export async function loadGlobalComponents(options = {}) {
  const activeNav = options.activeNav || 'home';

  // 1. NAVBAR
  const navbarEl = document.getElementById('navbar') || document.querySelector('[data-component="navbar"]');
  if (navbarEl) {
    await loadComponentSafely('navbar', navbarEl, { path: '/assets/components/navbar.html' });

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
    await loadComponentSafely('pageBanner', bannerEl, { path: '/assets/components/page-banner.html' });

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
    await loadComponentSafely('finalCta', finalCtaEl, { path: '/assets/components/final-cta.html' });
  }

  // 4. FOOTER
  const footerEl = document.getElementById('footer') || document.querySelector('[data-component="footer"]');
  if (footerEl) {
    await loadComponentSafely('footer', footerEl, { path: '/assets/components/footer.html' });

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
    await loadComponentSafely('floatingActions', floatingActionsEl, { path: '/assets/components/floating-actions.html' });

    // Initialize floating actions functionality
    initFloatingActions();
  }

  refreshLucideIcons(document);
  initPrivacyAndAnalytics();
}

function initPrivacyAndAnalytics() {
  if (window.__gssbAnalyticsInitialized) return;
  window.__gssbAnalyticsInitialized = true;

  const measurementId = window.GSSB_GA_MEASUREMENT_ID?.trim();
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
