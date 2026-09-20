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

  // --- 1. Sticky Header on Scroll ---
  let isScrolled = false;
  const handleScroll = () => {
    const shouldScroll = window.scrollY > 20;
    if (shouldScroll !== isScrolled) {
      isScrolled = shouldScroll;
      if (header) {
        if (isScrolled) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. Mobile Drawer State Management ---
  function openMobileNav() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('is-open');
    if (mobileOverlay) mobileOverlay.classList.add('is-open');
    if (navToggleBtn) {
      navToggleBtn.setAttribute('aria-expanded', 'true');
      navToggleBtn.classList.add('is-active');
    }
    document.body.style.overflow = 'hidden';
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
            if (siblingIcon) siblingIcon.textContent = '+';
          }
        });

        if (isCurrentlyExpanded) {
          accordion.classList.remove('is-expanded');
          accordionBtn.setAttribute('aria-expanded', 'false');
          const icon = accordion.querySelector('.mobile-accordion-icon');
          if (icon) icon.textContent = '+';
        } else {
          accordion.classList.add('is-expanded');
          accordionBtn.setAttribute('aria-expanded', 'true');
          const icon = accordion.querySelector('.mobile-accordion-icon');
          if (icon) icon.textContent = '−';
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
