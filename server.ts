import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// In AI Studio / Cloud Run, Nginx runs on port 8080 (PORT / NGINX_PORT) and reverse-proxies to port 3000 (DEFAULT_APP_PORT).
// The Express server must listen on port 3000 so Nginx can connect to it.
const rawPort =
  process.env.DEFAULT_APP_PORT ||
  (process.env.NGINX_PORT && process.env.PORT === process.env.NGINX_PORT ? '3000' : null) ||
  (process.env.PORT === '8080' ? '3000' : process.env.PORT) ||
  '3000';
const PORT = parseInt(rawPort, 10);
const HOST = process.env.HOST || '0.0.0.0';

// Determine static root: prefer 'dist' if it exists, otherwise fall back to project root
const distPath = path.resolve(__dirname, 'dist');
const rootPath = path.resolve(__dirname);
const staticRoot = fs.existsSync(distPath) ? distPath : rootPath;

// Route aliases matching vite.config.ts
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
  '/services/': '/services.html',
  '/about': '/about.html',
  '/about/': '/about.html',
  '/about.html': '/about.html',
  '/projects': '/projects.html',
  '/projects/': '/projects.html',
  '/project': '/projects.html',
  '/project.html': '/projects.html',
  '/team': '/team.html',
  '/team/': '/team.html',
  '/team.html': '/team.html',
  '/contact': '/contact.html',
  '/contact/': '/contact.html',
  '/contact.html': '/contact.html',
  '/home': '/index.html',
  '/home.html': '/index.html',
  '/services/residential-construction': '/services/residential-construction.html',
  '/services/residential-construction/': '/services/residential-construction.html',
  '/services/residential-construction.html': '/services/residential-construction.html',
  '/services/residential-building-construction': '/services/residential-construction.html',
  '/services/residential-building-construction/': '/services/residential-construction.html',
  '/services/residential-building-construction.html': '/services/residential-construction.html',
  '/services/residential': '/services/residential-construction.html',
  '/services/joint-venture-development': '/services/joint-venture-development.html',
  '/services/joint-venture-development/': '/services/joint-venture-development.html',
  '/services/joint-venture-development.html': '/services/joint-venture-development.html',
  '/services/joint-venture': '/services/joint-venture-development.html',
  '/services/joint-venture/': '/services/joint-venture-development.html',
  '/services/joint-venture.html': '/services/joint-venture-development.html',
  '/services/living-spaces-homes': '/services/living-spaces-homes.html',
  '/services/living-spaces-homes/': '/services/living-spaces-homes.html',
  '/services/living-spaces-homes.html': '/services/living-spaces-homes.html',
  '/services/project-management': '/services/living-spaces-homes.html',
  '/services/project-management/': '/services/living-spaces-homes.html',
  '/services/project-management.html': '/services/living-spaces-homes.html',
  '/services/construction-consultancy-design': '/services/construction-consultancy-design.html',
  '/services/construction-consultancy-design/': '/services/construction-consultancy-design.html',
  '/services/construction-consultancy-design.html': '/services/construction-consultancy-design.html',
  '/services/consultancy-design': '/services/construction-consultancy-design.html',
  '/services/consultancy-design/': '/services/construction-consultancy-design.html',
  '/services/consultancy-design.html': '/services/construction-consultancy-design.html',
  '/services/interior-design-execution': '/services/interior-design-execution.html',
  '/services/interior-design-execution/': '/services/interior-design-execution.html',
  '/services/interior-design-execution.html': '/services/interior-design-execution.html',
  '/services/interiors': '/services/interior-design-execution.html',
  '/services/interiors/': '/services/interior-design-execution.html',
  '/services/interiors.html': '/services/interior-design-execution.html',
  '/services/architecture-design': '/services/architecture-design.html',
  '/services/architecture-design/': '/services/architecture-design.html',
  '/services/architecture-design.html': '/services/architecture-design.html',
  '/services/renovation-remodeling': '/services/interior-design-execution.html',
  '/services/renovation-remodeling.html': '/services/interior-design-execution.html',
  '/services/commercial-construction': '/services/living-spaces-homes.html',
  '/services/commercial-construction.html': '/services/living-spaces-homes.html',
  '/services/industrial-construction': '/services/living-spaces-homes.html',
  '/services/industrial-construction.html': '/services/living-spaces-homes.html',
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

// Health check endpoints for Cloud Run & container orchestration
app.get(['/health', '/_health', '/healthz'], (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

// Serve assets directory with caching
const assetsPath = path.join(staticRoot, 'assets');
if (fs.existsSync(assetsPath)) {
  app.use('/assets', express.static(assetsPath, { maxAge: '1y', immutable: true }));
}

// Serve public directory if present
const publicPath = path.join(rootPath, 'public');
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath, { maxAge: '1d', redirect: false }));
}

// Route resolution middleware for clean URLs and custom aliases (before static root to prevent directory redirects)
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET') {
    return next();
  }

  const urlPath = req.url ? req.url.split('?')[0] : '';
  let target = urlPath;
  if (target.endsWith('/') && target !== '/') {
    target = target.slice(0, -1);
  }
  const cleanTarget = target.startsWith('/') ? target : `/${target}`;

  // Check alias dictionary
  const resolvedTarget = ROUTE_ALIASES[cleanTarget] || ROUTE_ALIASES[urlPath] || cleanTarget;

  // 1. Root path
  if (resolvedTarget === '/' || resolvedTarget === '/index.html') {
    const indexPath = path.join(staticRoot, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
  }

  // 2. Exact HTML file corresponding to path
  const htmlPath = path.join(staticRoot, `${resolvedTarget}.html`);
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
    return res.sendFile(htmlPath);
  }

  // 3. Exact resolved target file (e.g. if it already has .html extension)
  const directPath = path.join(staticRoot, resolvedTarget);
  if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    return res.sendFile(directPath);
  }

  // 4. Index HTML within directory
  const nestedIndexPath = path.join(staticRoot, resolvedTarget, 'index.html');
  if (fs.existsSync(nestedIndexPath) && fs.statSync(nestedIndexPath).isFile()) {
    return res.sendFile(nestedIndexPath);
  }

  // Pass through to express.static for other files (images, fonts, etc.)
  next();
});

// Serve static files without directory redirect to avoid hijacking page routes
app.use(express.static(staticRoot, {
  extensions: ['html', 'htm'],
  index: 'index.html',
  redirect: false,
}));

// Fallback 404 handler
app.use((_req: Request, res: Response) => {
  const notFoundPath = path.join(staticRoot, '404.html');
  if (fs.existsSync(notFoundPath)) {
    return res.status(404).sendFile(notFoundPath);
  }
  res.status(404).send('Page not found');
});

// Start listening
const server = app.listen(PORT, HOST, () => {
  console.log(`Production server running on http://${HOST}:${PORT} (serving from ${staticRoot})`);
});

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});

// Graceful shutdown
const shutdown = (signal: string) => {
  console.log(`Received ${signal}, shutting down server gracefully...`);
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default app;
