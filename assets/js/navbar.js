/**
 * GS SOWMIYA BUILDERS - GLOBAL NAVIGATION CONTROLLER
 * Handles:
 * 1. Sticky Header & Scroll Elevation
 * 2. Mobile Drawer Open / Close / Overlay State
 * 3. Mobile Navigation Accordion Submenus (About & Individual Services)
 * 4. Desktop Navigation Dropdown Accessibility
 */

export function initNavbar() {
  const header = document.getElementById('site-header') || document.querySelector('.site-header');
  const navToggleBtn = document.getElementById('nav-toggle-btn') || document.querySelector('.nav-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer') || document.querySelector('.mobile-nav-drawer');
  const mobileOverlay = document.getElementById('mobile-nav-overlay') || document.querySelector('.mobile-nav-overlay');
  const mobileAccordions = document.querySelectorAll('.mobile-nav-accordion');
  const dropdownContainers = document.querySelectorAll('.nav-item-dropdown');

  // --- 1. Sticky Header on Scroll (Transparent Glass -> Solid Background) ---
  let isScrolled = false;
  let previousBodyOverflow = '';
  let lastFocusedElement = null;
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

  // --- 2. Mobile Drawer State Management ---
  function openMobileNav() {
    if (!mobileDrawer) return;
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : navToggleBtn;
    previousBodyOverflow = document.body.style.overflow;
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (mobileOverlay) {
      mobileOverlay.classList.add('is-open');
      mobileOverlay.setAttribute('aria-hidden', 'false');
    }
    if (navToggleBtn) {
      navToggleBtn.setAttribute('aria-expanded', 'true');
      navToggleBtn.classList.add('is-active');
    }
    document.body.style.overflow = 'hidden';

    const firstFocusable = mobileDrawer.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();
  }

  function closeMobileNav() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (mobileOverlay) {
      mobileOverlay.classList.remove('is-open');
      mobileOverlay.setAttribute('aria-hidden', 'true');
    }
    if (navToggleBtn) {
      navToggleBtn.setAttribute('aria-expanded', 'false');
      navToggleBtn.classList.remove('is-active');
    }
    document.body.style.overflow = previousBodyOverflow;
    if (lastFocusedElement instanceof HTMLElement && document.contains(lastFocusedElement)) {
      lastFocusedElement.focus();
    }
    lastFocusedElement = null;
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

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileNav);
  }

  // Close drawer on link click (unless clicking an accordion trigger button)
  if (mobileDrawer) {
    const regularLinks = mobileDrawer.querySelectorAll('a');
    regularLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });
  }

  // Keyboard navigation - Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      dropdownContainers.forEach(container => {
        container.classList.remove('is-active');
        const trigger = container.querySelector('.nav-dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Keep keyboard focus inside the open mobile drawer.
  if (mobileDrawer) {
    mobileDrawer.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !mobileDrawer.classList.contains('is-open')) return;
      const focusable = [...mobileDrawer.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')]
        .filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // --- 3. Mobile Submenu Accordions ---
  mobileAccordions.forEach(accordion => {
    const accordionBtn = accordion.querySelector('.mobile-accordion-btn');
    if (accordionBtn) {
      accordionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isCurrentlyExpanded = accordion.classList.contains('is-expanded');
        
        // Optionally close sibling accordions
        mobileAccordions.forEach(sibling => {
          if (sibling !== accordion) {
            sibling.classList.remove('is-expanded');
            const siblingBtn = sibling.querySelector('.mobile-accordion-btn');
            if (siblingBtn) siblingBtn.setAttribute('aria-expanded', 'false');
            const siblingIcon = sibling.querySelector('.mobile-accordion-icon');
            if (siblingIcon) { siblingIcon.innerHTML = '<i data-lucide="plus"></i>'; window.lucide?.createIcons(); }
          }
        });

        if (isCurrentlyExpanded) {
          accordion.classList.remove('is-expanded');
          accordionBtn.setAttribute('aria-expanded', 'false');
          const icon = accordion.querySelector('.mobile-accordion-icon');
          if (icon) { icon.innerHTML = '<i data-lucide="plus"></i>'; window.lucide?.createIcons(); }
        } else {
          accordion.classList.add('is-expanded');
          accordionBtn.setAttribute('aria-expanded', 'true');
          const icon = accordion.querySelector('.mobile-accordion-icon');
          if (icon) { icon.innerHTML = '<i data-lucide="minus"></i>'; window.lucide?.createIcons(); }
        }
      });
    }
  });

  // --- 4. Desktop Dropdown Accessibility & Click Support ---
  dropdownContainers.forEach(container => {
    const trigger = container.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      
      // Close other dropdowns
      dropdownContainers.forEach(other => {
        if (other !== container) {
          other.classList.remove('is-active');
          const otherTrigger = other.querySelector('.nav-dropdown-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isExpanded) {
        container.classList.remove('is-active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        container.classList.add('is-active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    container.addEventListener('mouseenter', () => {
      trigger.setAttribute('aria-expanded', 'true');
    });

    container.addEventListener('mouseleave', () => {
      trigger.setAttribute('aria-expanded', 'false');
      container.classList.remove('is-active');
    });
  });

  // Click outside closes desktop dropdowns
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      dropdownContainers.forEach(container => {
        container.classList.remove('is-active');
        const trigger = container.querySelector('.nav-dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });
}
