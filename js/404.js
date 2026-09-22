/**
 * GS SOWMIYA BUILDERS - 404 ERROR PAGE SCRIPT
 */

import { loadGlobalComponents } from './components.js';
import { initScrollReveal } from './animations.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Display the requested invalid URL if available
  const urlEl = document.getElementById('requested-path');
  if (urlEl) {
    const path = window.location.pathname + window.location.search;
    urlEl.textContent = path || '/';
  }

  // Load global navbar, footer, floating actions
  await loadGlobalComponents({
    activeNav: '',
  });

  // Optional subtle scroll reveal animations
  try {
    initScrollReveal();
  } catch {
    // Ignore if not applicable
  }
});
