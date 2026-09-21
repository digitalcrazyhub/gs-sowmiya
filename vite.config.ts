import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
          privacyPolicy: path.resolve(__dirname, 'privacy-policy.html'),
          termsAndConditions: path.resolve(__dirname, 'terms-and-conditions.html'),
          notFound: path.resolve(__dirname, '404.html'),
          residentialService: path.resolve(__dirname, 'services/residential-construction.html'),
          commercialService: path.resolve(__dirname, 'services/commercial-construction.html'),
          industrialService: path.resolve(__dirname, 'services/industrial-construction.html'),
          renovationService: path.resolve(__dirname, 'services/renovation-remodeling.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
