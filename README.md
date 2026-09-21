# GS Sowmiya Builders

Production website for **GS Sowmiya Builders Private Limited**.

## Stack

- Vite
- Vanilla HTML/CSS/JavaScript
- GSAP animations
- Static multi-page build

## Requirements

- Node.js 20.19+ (or the version required by the installed Vite release)
- npm

## Development

```bash
npm ci
npm run dev
```

The development server runs on port `3000`.

## Production build

```bash
npm ci
npm run build
npm run preview
```

The production output is generated in `dist/`.

Do **not** commit `node_modules/` or `dist/`.

## Contact form

The contact form reads `VITE_CONTACT_FORM_ENDPOINT`.

```env
VITE_CONTACT_FORM_ENDPOINT=https://your-domain.example/api/contact
```

The endpoint must validate and sanitize submissions server-side and include rate limiting/spam protection.

## Project structure

```text
components/    Shared HTML components
css/           Site and page styles
js/            Page and feature JavaScript
public/        Images, videos, favicon, sitemap and robots.txt
*.html         Multi-page website entries
vite.config.ts Vite configuration
```

## Deployment

```bash
npm ci
npm run build
```

Deploy the contents of `dist/` to your static host/CDN.

## Notes

- Keep API keys and private credentials out of source control.
- Analytics loads only after user consent.
- Verify all business/project claims and portfolio imagery before publication.
