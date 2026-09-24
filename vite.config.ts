import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function custom404Plugin(): Plugin {
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
    '/service': '/services.html',
    '/service.html': '/services.html',
    '/services': '/services.html',
    '/about': '/about.html',
    '/projects': '/projects.html',
    '/project': '/projects.html',
    '/project.html': '/projects.html',
    '/team': '/team.html',
    '/contact': '/contact.html',
    '/home': '/index.html',
    '/home.html': '/index.html',
    '/services/residential-building-construction': '/services/residential-building-construction.html',
    '/services/residential-building-construction.html': '/services/residential-building-construction.html',
    '/services/joint-venture': '/services/joint-venture.html',
    '/services/joint-venture.html': '/services/joint-venture.html',
    '/services/project-management': '/services/project-management.html',
    '/services/project-management.html': '/services/project-management.html',
    '/services/consultancy-design': '/services/consultancy-design.html',
    '/services/consultancy-design.html': '/services/consultancy-design.html',
    '/services/interiors': '/services/interiors.html',
    '/services/interiors.html': '/services/interiors.html',
    '/services/residential-construction': '/services/residential-building-construction.html',
    '/services/residential-construction.html': '/services/residential-building-construction.html',
    '/services/residential': '/services/residential-building-construction.html',
    '/services/renovation-remodeling': '/services/interiors.html',
    '/services/renovation-remodeling.html': '/services/interiors.html',
    '/services/commercial-construction': '/services/project-management.html',
    '/services/commercial-construction.html': '/services/project-management.html',
    '/services/industrial-construction': '/services/project-management.html',
    '/services/industrial-construction.html': '/services/project-management.html',
    '/page/about.html': '/about.html',
    '/page/about': '/about.html',
    '/page/services.html': '/services.html',
    '/page/services': '/services.html',
    '/page/projects.html': '/projects.html',
    '/page/projects': '/projects.html',
    '/page/team.html': '/team.html',
    '/page/team': '/team.html',
    '/page/contact.html': '/contact.html',
    '/page/contact': '/contact.html',
    '/page/privacy-policy.html': '/privacy-policy.html',
    '/page/privacy-policy': '/privacy-policy.html',
    '/page/terms-of-service.html': '/terms-of-service.html',
    '/page/terms-of-service': '/terms-of-service.html',
    '/page/404.html': '/404.html',
    '/page/404': '/404.html',
  };

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

        if (target === '' || target === '/') {
          return next();
        }

        if (fs.existsSync(htmlFile) && fs.statSync(htmlFile).isFile()) {
          req.url = `${cleanTarget}.html`;
          return next();
        }

        if (fs.existsSync(indexFile) && fs.statSync(indexFile).isFile()) {
          return next();
        }

        if (fs.existsSync(directFile) && fs.statSync(directFile).isFile()) {
          return next();
        }

        if (fs.existsSync(publicFile) && fs.statSync(publicFile).isFile()) {
          return next();
        }

        // Route not found -> fallback to 404.html
        req.url = '/404.html';
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

        const cleanTarget = target.startsWith('/') ? target : `/${target}`;
        if (ROUTE_ALIASES[cleanTarget]) {
          req.url = ROUTE_ALIASES[cleanTarget];
          return next();
        }

        const directFile = path.join(distPath, target);
        const htmlFile = path.join(distPath, `${target}.html`);
        const indexFile = path.join(distPath, target, 'index.html');

        if (target === '' || target === '/') {
          return next();
        }

        if (fs.existsSync(htmlFile) && fs.statSync(htmlFile).isFile()) {
          req.url = `${cleanTarget}.html`;
          return next();
        }

        if (fs.existsSync(indexFile) && fs.statSync(indexFile).isFile()) {
          return next();
        }

        if (fs.existsSync(directFile) && fs.statSync(directFile).isFile()) {
          return next();
        }

        req.url = '/404.html';
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
          terms: path.resolve(__dirname, 'terms-of-service.html'),
          residentialBuildingService: path.resolve(__dirname, 'services/residential-building-construction.html'),
          jointVentureService: path.resolve(__dirname, 'services/joint-venture.html'),
          projectManagementService: path.resolve(__dirname, 'services/project-management.html'),
          consultancyDesignService: path.resolve(__dirname, 'services/consultancy-design.html'),
          interiorsService: path.resolve(__dirname, 'services/interiors.html'),
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
