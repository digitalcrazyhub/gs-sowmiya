import { loadGlobalComponents } from './components.js';
import { initScrollReveal, initCardTilt } from './animations.js';

document.addEventListener('DOMContentLoaded', async () => {
  await loadGlobalComponents({ activeNav: 'home' });
  initScrollReveal();
  initCardTilt();
});
