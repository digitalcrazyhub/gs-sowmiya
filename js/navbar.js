/**
 * GS SOWMIYA BUILDERS - GLOBAL NAVIGATION CONTROLLER
 * Handles:
 * 1. Sticky Header & Scroll Elevation
 * 2. Desktop Dropdowns (Hover + Keyboard + Click-outside)
 * 3. Mobile Drawer Open/Close/Overlay & Touch Accessibility
 * 4. Mobile Drawer Accordions (+/- Submenu expand)
 */

export function initNavbar() {
  const header = document.getElementById('site-header') || document.querySelector('.site-header');
  const navToggleBtn = document.getElementById('nav-toggle-btn') || document.querySelector('.nav-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer') || document.querySelector('.mobile-nav-drawer');
  const mobileOverlay = document.getElementById('mobile-nav-overlay') || document.querySelector('.mobile-nav-overlay');
  const mobileCloseBtn = document.getElementById('mobile-drawer-close') || (mobileDrawer ? mobileDrawer.querySelector('.mobile-drawer-close') : null);

  // --- 1. Sticky Header on Scroll (Transparent Glass -> Solid Elevated Background) ---
  let isScrolled = false;
  const handleScroll = () => {
    const shouldScroll = window.scrollY > 20;
    if (shouldScroll !== isScrolled) {
      isScrolled = shouldScroll;
      if (header) {
        if (isScrolled) {
          header.classList.add('scrolled', 'is-scrolled');
        } else {
          header.classList.remove('scrolled', 'is-scrolled');
        }
      }
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. Desktop Dropdown Accessibility & Click-Toggle ---
  const dropdownWrappers = document.querySelectorAll('.nav-item-dropdown');
  dropdownWrappers.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;

    // Hover is handled by CSS, but we support click/touch & keyboard focus
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      closeAllDropdowns();
      if (!isExpanded) {
        dropdown.classList.add('is-active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    // Handle Escape key to close
    dropdown.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('is-active');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });
  });

  function closeAllDropdowns() {
    dropdownWrappers.forEach(drop => {
      drop.classList.remove('is-active');
      const trigger = drop.querySelector('.nav-dropdown-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  // Close desktop dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      closeAllDropdowns();
    }
  });

  // --- 3. Mobile Drawer State Management ---
  function openMobileNav() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('is-open');
    if (mobileOverlay) mobileOverlay.classList.add('is-open');
    if (navToggleBtn) {
      navToggleBtn.setAttribute('aria-expanded', 'true');
      navToggleBtn.classList.add('is-active');
    }
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('is-open');
    if (mobileOverlay) mobileOverlay.classList.remove('is-open');
    if (navToggleBtn) {
      navToggleBtn.setAttribute('aria-expanded', 'false');
      navToggleBtn.classList.remove('is-active');
    }
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  if (navToggleBtn) {
    navToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileNav();
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileNav);
  }

  // Close drawer on link click (unless it's an accordion toggle button)
  if (mobileDrawer) {
    const navLinks = mobileDrawer.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });
  }

  // Keyboard navigation - Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      closeAllDropdowns();
    }
  });

  // --- 4. Mobile Drawer Accordion Submenus ---
  const accordionButtons = document.querySelectorAll('.mobile-accordion-btn');
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const accordionParent = btn.closest('.mobile-nav-accordion');
      if (!accordionParent) return;

      const isExpanded = accordionParent.classList.contains('is-expanded');
      
      // Toggle current accordion
      if (isExpanded) {
        accordionParent.classList.remove('is-expanded');
        btn.setAttribute('aria-expanded', 'false');
        const icon = btn.querySelector('.mobile-accordion-icon');
        if (icon) icon.textContent = '+';
      } else {
        // Close other accordions
        document.querySelectorAll('.mobile-nav-accordion').forEach(acc => {
          acc.classList.remove('is-expanded');
          const accBtn = acc.querySelector('.mobile-accordion-btn');
          if (accBtn) accBtn.setAttribute('aria-expanded', 'false');
          const accIcon = acc.querySelector('.mobile-accordion-icon');
          if (accIcon) accIcon.textContent = '+';
        });

        accordionParent.classList.add('is-expanded');
        btn.setAttribute('aria-expanded', 'true');
        const icon = btn.querySelector('.mobile-accordion-icon');
        if (icon) icon.textContent = '−';
      }
    });
  });

  // Optional swipe-to-close on mobile drawer
  if (mobileDrawer) {
    let touchStartX = 0;
    let touchCurrentX = 0;

    mobileDrawer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    mobileDrawer.addEventListener('touchmove', (e) => {
      touchCurrentX = e.changedTouches[0].clientX;
    }, { passive: true });

    mobileDrawer.addEventListener('touchend', () => {
      // Swiping right by 60px or more closes the right-aligned drawer
      if (touchCurrentX - touchStartX > 60 && touchStartX > 0) {
        closeMobileNav();
      }
      touchStartX = 0;
      touchCurrentX = 0;
    }, { passive: true });
  }

  // Auto-close mobile nav if viewport is resized to desktop (>= 1081px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080 && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      closeMobileNav();
    }
  }, { passive: true });
}
