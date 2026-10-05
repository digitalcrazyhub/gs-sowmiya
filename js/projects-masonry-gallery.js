/**
 * GS SOWMIYA BUILDERS — PROJECTS MASONRY GALLERY MODULE
 * File: js/projects-masonry-gallery.js
 *
 * Implements a high-performance, image-first CSS Columns-based Masonry Gallery layout.
 * Features:
 * - Natural image aspect ratio preservation (no forced heights or awkward cropping)
 * - Automatic image load detection and ResizeObserver recalculation
 * - Smooth integration with BHK category filters & GSAP reveals
 * - Preserves 3D interactive card tilt and .project-card__zoom-btn lightbox interaction
 */

import { initCardTilt } from '/js/animations.js';

export class ProjectsMasonryGallery {
  constructor(gridSelector = '#projects-grid') {
    this.gridSelector = gridSelector;
    this.gridContainer = document.querySelector(gridSelector);
    this.resizeObserver = null;
    this.isInitialized = false;
  }

  /**
   * Initializes or refreshes the masonry layout
   */
  init() {
    if (!this.gridContainer) {
      this.gridContainer = document.querySelector(this.gridSelector);
    }
    if (!this.gridContainer) return;

    this.ensureMasonryClasses();
    this.observeImageLoads();
    this.setupResizeObserver();
    this.isInitialized = true;
  }

  /**
   * Enforces CSS Columns masonry styling on grid container
   */
  ensureMasonryClasses() {
    if (this.gridContainer && !this.gridContainer.classList.contains('projects-masonry')) {
      this.gridContainer.classList.add('projects-masonry');
    }
  }

  /**
   * Detects image loads and triggers smooth layout recalculations
   */
  observeImageLoads() {
    if (!this.gridContainer) return;

    const images = this.gridContainer.querySelectorAll('.project-card__image');
    images.forEach((img) => {
      if (img.complete) {
        this.onImageReady(img);
      } else {
        img.addEventListener('load', () => this.onImageReady(img), { once: true });
        img.addEventListener('error', () => this.onImageReady(img), { once: true });
      }
    });
  }

  /**
   * Fired when an individual image finishes loading
   */
  onImageReady(img) {
    if (!img) return;
    const card = img.closest('.project-card');
    if (card) {
      card.classList.add('is-loaded');
    }
    this.recalculateLayout();
  }

  /**
   * ResizeObserver to handle fluid container width changes
   */
  setupResizeObserver() {
    if (typeof ResizeObserver === 'undefined' || !this.gridContainer) return;

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    let rafId = null;
    this.resizeObserver = new ResizeObserver(() => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        this.recalculateLayout();
      });
    });

    this.resizeObserver.observe(this.gridContainer);
  }

  /**
   * Recalculates masonry positioning and refreshes interactions
   */
  recalculateLayout() {
    if (!this.gridContainer) return;

    // Re-initialize 3D Card Tilt for desktop
    initCardTilt();
  }

  /**
   * Called when filtering changes to refresh masonry state
   */
  onFilterChange() {
    this.ensureMasonryClasses();
    this.observeImageLoads();
    requestAnimationFrame(() => {
      this.recalculateLayout();
    });
  }

  /**
   * Cleans up observers
   */
  destroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.isInitialized = false;
  }
}

/**
 * Singleton instance initializer helper
 */
export function initProjectsMasonryGallery(gridSelector = '#projects-grid') {
  const masonry = new ProjectsMasonryGallery(gridSelector);
  masonry.init();
  return masonry;
}
