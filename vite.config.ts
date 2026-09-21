import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          services: path.resolve(__dirname, 'services.html'),
          projects: path.resolve(__dirname, 'projects.html'),
          team: path.resolve(__dirname, 'team.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          residentialService: path.resolve(__dirname, 'services/residential-construction.html'),
          commercialService: path.resolve(__dirname, 'services/commercial-construction.html'),
          industrialService: path.resolve(__dirname, 'services/industrial-construction.html'),
          renovationService: path.resolve(__dirname, 'services/renovation-remodeling.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
