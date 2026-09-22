import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function custom404Plugin(): Plugin {
  return {
    name: 'custom-404-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET') return next();
        const urlPath = req.url ? req.url.split('?')[0] : '';

        // Skip Vite internal paths and module requests
        if (
          urlPath.startsWith('/@') ||
          urlPath.startsWith('/__') ||
          urlPath.startsWith('/node_modules') ||
          urlPath.includes('?import')
        ) {
          return next();
        }

        // Skip static asset requests with non-html extensions
        if (/\.(css|js|ts|tsx|jsx|json|svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|mp4|webm)$/i.test(urlPath)) {
          return next();
        }

        // Normalize requested path
        let target = urlPath;
        if (target.endsWith('/') && target !== '/') {
          target = target.slice(0, -1);
        }

        // Direct aliases for privacy policy and terms of service paths
        const ROUTE_ALIASES: Record<string, string> = {
          '/privacy': '/privacy-policy.html',
          '/privacy-policy': '/privacy-policy.html',
          '/privacy.html': '/privacy-policy.html',
          '/terms': '/terms-of-service.html',
          '/terms.html': '/terms-of-service.html',
          '/terms-of-service': '/terms-of-service.html',
          '/terms-and-conditions': '/terms-of-service.html',
          '/terms-and-conditions.html': '/terms-of-service.html',
          '/terms-conditions': '/terms-of-service.html',
          '/terms-service': '/terms-of-service.html',
        };

        const cleanTarget = target.startsWith('/') ? target : `/${target}`;
        if (ROUTE_ALIASES[cleanTarget]) {
          req.url = ROUTE_ALIASES[cleanTarget];
          return next();
        }

        // Check root-level or nested HTML / file existence
        const rootPath = path.resolve(__dirname);
        const directFile = path.join(rootPath, target);
        const htmlFile = path.join(rootPath, `${target}.html`);
        const indexFile = path.join(rootPath, target, 'index.html');
        const publicFile = path.join(rootPath, 'public', target);

        const exists =
          target === '' ||
          target === '/' ||
          (fs.existsSync(directFile) && fs.statSync(directFile).isFile()) ||
          (fs.existsSync(htmlFile) && fs.statSync(htmlFile).isFile()) ||
          (fs.existsSync(indexFile) && fs.statSync(indexFile).isFile()) ||
          (fs.existsSync(publicFile) && fs.statSync(publicFile).isFile());

        if (!exists) {
          req.url = '/404.html';
        }

        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET') return next();
        const urlPath = req.url ? req.url.split('?')[0] : '';
        if (/\.(css|js|ts|tsx|jsx|json|svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|mp4|webm)$/i.test(urlPath)) {
          return next();
        }
        const distPath = path.resolve(__dirname, 'dist');
        let target = urlPath.endsWith('/') && urlPath !== '/' ? urlPath.slice(0, -1) : urlPath;

        const ROUTE_ALIASES: Record<string, string> = {
          '/privacy': '/privacy-policy.html',
          '/privacy-policy': '/privacy-policy.html',
          '/privacy.html': '/privacy-policy.html',
          '/terms': '/terms-of-service.html',
          '/terms.html': '/terms-of-service.html',
          '/terms-of-service': '/terms-of-service.html',
          '/terms-and-conditions': '/terms-of-service.html',
          '/terms-and-conditions.html': '/terms-of-service.html',
          '/terms-conditions': '/terms-of-service.html',
          '/terms-service': '/terms-of-service.html',
        };

        const cleanTarget = target.startsWith('/') ? target : `/${target}`;
        if (ROUTE_ALIASES[cleanTarget]) {
          req.url = ROUTE_ALIASES[cleanTarget];
          return next();
        }

        const directFile = path.join(distPath, target);
        const htmlFile = path.join(distPath, `${target}.html`);
        const indexFile = path.join(distPath, target, 'index.html');

        const exists =
          target === '' ||
          target === '/' ||
          (fs.existsSync(directFile) && fs.statSync(directFile).isFile()) ||
          (fs.existsSync(htmlFile) && fs.statSync(htmlFile).isFile()) ||
          (fs.existsSync(indexFile) && fs.statSync(indexFile).isFile());

        if (!exists) {
          req.url = '/404.html';
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [custom404Plugin()],
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
          notFound: path.resolve(__dirname, '404.html'),
          privacy: path.resolve(__dirname, 'privacy-policy.html'),
          privacyAlias: path.resolve(__dirname, 'privacy.html'),
          privacyDir: path.resolve(__dirname, 'privacy-policy/index.html'),
          terms: path.resolve(__dirname, 'terms-of-service.html'),
          termsAlias: path.resolve(__dirname, 'terms.html'),
          termsConditionsAlias: path.resolve(__dirname, 'terms-and-conditions.html'),
          termsDir: path.resolve(__dirname, 'terms-of-service/index.html'),
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
