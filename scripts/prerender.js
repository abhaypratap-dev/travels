/**
 * Static prerenderer.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server). Renders
 * every route in src/data/site.js to real HTML on disk, so crawlers and social
 * scrapers receive fully-formed markup with the correct <title>, meta tags and
 * JSON-LD — no JavaScript execution required. React then hydrates that markup
 * in the browser.
 *
 * Also emits sitemap.xml (with real lastmod dates) and a 404.html fallback.
 */

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const { render } = await import(url.pathToFileURL(ssrEntry).href)
const { site, routes } = await import(url.pathToFileURL(path.join(root, 'src', 'data', 'site.js')).href)

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')

if (!template.includes('<!--app-html-->')) {
  console.error('✗ index.html is missing the <!--app-html--> placeholder.')
  process.exit(1)
}

const write = (filePath, contents) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, contents, 'utf-8')
}

// Strip the fallback <title>/<meta description> — Helmet supplies the real
// ones per route, and a document with two <title> elements resolves to the
// first, which would be the generic fallback.
const FALLBACK_SEO = /<!--fallback-seo-start-->[\s\S]*?<!--fallback-seo-end-->/

if (!FALLBACK_SEO.test(template)) {
  console.error('✗ index.html is missing the fallback-seo delimiter comments.')
  process.exit(1)
}

const renderRoute = (routePath) => {
  const { html, head, htmlAttributes } = render(routePath)
  return template
    .replace('<html lang="en-IN">', `<html ${htmlAttributes}>`)
    .replace(FALLBACK_SEO, '')
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html)
}

console.log('\n▸ Prerendering routes\n')

// Each route is written twice, as `<route>/index.html` and `<route>.html`.
// Static hosts disagree on how to resolve an extensionless URL: Apache and
// nginx (`try_files $uri/`) look for the directory index, while Vercel's
// cleanUrls and sirv-based servers look for the sibling `.html` file. Emitting
// both means /about resolves to the prerendered page everywhere, instead of
// silently falling through to the SPA fallback and serving the homepage HTML.
for (const route of routes) {
  const page = renderRoute(route.path)

  if (route.path === '/') {
    write(path.join(distDir, 'index.html'), page)
    console.log(`  ✓ ${route.path.padEnd(18)} → dist/index.html`)
    continue
  }

  write(path.join(distDir, route.path, 'index.html'), page)
  write(path.join(distDir, `${route.path}.html`), page)
  console.log(`  ✓ ${route.path.padEnd(18)} → dist${route.path}/index.html + dist${route.path}.html`)
}

// SPA fallback for unknown URLs (Netlify, GitHub Pages, S3 static hosting).
write(path.join(distDir, '404.html'), renderRoute('/404'))
console.log(`  ✓ ${'/404'.padEnd(18)} → dist/404.html`)

// ── sitemap.xml ────────────────────────────────────────────────────────────
const today = new Date().toISOString().split('T')[0]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${site.url}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

write(path.join(distDir, 'sitemap.xml'), sitemap)
console.log('  ✓ sitemap.xml')

// ── robots.txt ─────────────────────────────────────────────────────────────
const robots = `User-agent: *
Allow: /

# Block nothing — this is a small marketing site.
Disallow: /404.html

Sitemap: ${site.url}/sitemap.xml
`
write(path.join(distDir, 'robots.txt'), robots)
console.log('  ✓ robots.txt')

console.log(`\n✓ Prerendered ${routes.length} routes into dist/\n`)
