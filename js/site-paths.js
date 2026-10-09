function getSiteRootPath() {
  if (typeof window === 'undefined' || !window.location) {
    return '/';
  }

  try {
    const scriptTag = document && document.currentScript ? document.currentScript : null;
    const fallbackScript = scriptTag || Array.from(document?.scripts || []).find((script) => /site-paths\.js(?:\?|$)/i.test(script.src));

    if (fallbackScript && fallbackScript.src) {
      const scriptUrl = new URL(fallbackScript.src, window.location.href);
      const rootUrl = new URL('..', scriptUrl);
      const rootPath = rootUrl.pathname.replace(/\\/g, '/');
      if (rootPath && rootPath !== '/') {
        return rootPath.endsWith('/') ? rootPath : `${rootPath}/`;
      }
    }
  } catch (error) {
    // Fall through to the pathname-based fallback below.
  }

  const currentPath = (window.location.pathname || '/').replace(/\\/g, '/');
  const normalizedPath = currentPath.endsWith('/') ? currentPath : `${currentPath.substring(0, currentPath.lastIndexOf('/') + 1)}`;
  return normalizedPath || '/';
}

export function getSiteBasePath() {
  if (typeof window === 'undefined' || !window.location) {
    return './';
  }

  const currentPath = (window.location.pathname || '/').replace(/\\/g, '/');
  const siteRootPath = getSiteRootPath().replace(/\\/g, '/');
  const relativePath = currentPath.startsWith(siteRootPath)
    ? currentPath.slice(siteRootPath.length)
    : currentPath;
  const cleanedRelativePath = relativePath.replace(/^\/+/, '').replace(/\/+$/, '');

  if (!cleanedRelativePath) {
    return './';
  }

  const segments = cleanedRelativePath.split('/').filter(Boolean);
  const hasFileName = segments.length > 0 && segments[segments.length - 1].includes('.');
  const depth = Math.max(0, segments.length - (hasFileName ? 1 : 0));

  return depth === 0 ? './' : '../'.repeat(depth);
}

export function normalizeSitePath(targetPath) {
  if (typeof targetPath !== 'string' || !targetPath.trim()) {
    return targetPath;
  }

  const trimmed = targetPath.trim();
  if (trimmed === '/' || trimmed === './' || trimmed === '../') {
    return getSiteBasePath();
  }

  if (/^(?:[a-z]+:)?\/\//i.test(trimmed) || trimmed.startsWith('data:') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:') || trimmed.startsWith('#') || trimmed.startsWith('?')) {
    return trimmed;
  }

  const normalized = trimmed.replace(/^\/+/, '');
  if (!normalized) {
    return getSiteBasePath();
  }

  return `${getSiteBasePath()}${normalized}`;
}

export function resolveSitePath(targetPath) {
  return normalizeSitePath(targetPath);
}

export function resolveAssetPath(targetPath) {
  return normalizeSitePath(targetPath);
}

export function applySitePathFixes(rootNode = document) {
  if (!rootNode || typeof rootNode.querySelectorAll !== 'function') return;

  const rewriteAttributes = ['href', 'src', 'action', 'poster', 'data-src'];
  rootNode.querySelectorAll('[href], [src], [action], [poster], [data-src], [style]').forEach((element) => {
    rewriteAttributes.forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (!value || value.startsWith('#') || value.startsWith('mailto:') || value.startsWith('tel:') || value.startsWith('data:') || value.startsWith('javascript:') || value.startsWith('//') || /^([a-z]+:)?\/\//i.test(value)) {
        return;
      }

      if (value.startsWith('/')) {
        element.setAttribute(attribute, resolveSitePath(value));
      }
    });

    if (element.hasAttribute('style')) {
      const originalStyle = element.getAttribute('style') || '';
      const fixedStyle = originalStyle.replace(/url\((['"]?)(\/[^'"\)]+)\1\)/gi, (_, quote, path) => {
        return `url(${quote || ''}${resolveSitePath(path)}${quote || ''})`;
      });
      if (fixedStyle !== originalStyle) {
        element.setAttribute('style', fixedStyle);
      }
    }
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    applySitePathFixes(document);
  }, { once: true });
}
