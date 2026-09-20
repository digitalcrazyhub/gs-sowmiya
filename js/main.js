/**
 * ==========================================================================
 * GS SOWMIYA BUILDERS — GLOBAL CORE APPLICATION SCRIPT (main.js)
 * Global initialization helpers, component loader re-export, and shared utilities.
 * Page-specific controllers reside in home.js, about.js, contact.js, projects.js,
 * services.js, team.js, and services/*.js.
 * ==========================================================================
 */

import { loadGlobalComponents } from './components.js';
import { initScrollReveal, initCounterAnimation, initCardTilt } from './animations.js';

export {
  loadGlobalComponents,
  initScrollReveal,
  initCounterAnimation,
  initCardTilt
};

// Global polyfills or safety checks
if (typeof window !== 'undefined') {
  window.GS_BUILDERS = window.GS_BUILDERS || {
    version: '2.0.0',
    company: 'GS Sowmiya Builders',
    contact: '+91 98400 12345'
  };
}
