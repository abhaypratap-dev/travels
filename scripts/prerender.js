/**
 * Static prerenderer.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server). Renders
 * every route in src/data/site.js to real HTML on disk, so crawlers and social
 * scrapers receive fully-formed markup with the correct <title>, meta tags and
 * JSON-LD — no JavaScript execution required. React then hydrates that markup
 * in the browser.
 *
 * Also emits sitemap.xml (with real lastmod dates and image entries),
 * robots.txt, a 404.html fallback, and runs a build-time SEO audit that fails
 * the build if a page ships without a title, canonical, description or H1.
 */

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const { render } = await import(url.pathToFileURL(ssrEntry).href)
const { site, routes } = await import(
  url.pathToFileURL(path.join(root, 'src', 'data', 'site.js')).href
)

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
    // `head` and `html` are passed as replacer functions rather than strings:
    // a plain string replacement would treat any `$&`, `$'` or `$\`` inside the
    // rendered markup as a substitution pattern and silently corrupt the page.
    .replace('<!--app-head-->', () => head)
    .replace('<!--app-html-->', () => html)
}

console.log('\n▸ Prerendering routes\n')

const pages = []

// Each route is written twice, as `<route>/index.html` and `<route>.html`.
// Static hosts disagree on how to resolve an extensionless URL: Apache and
// nginx (`try_files $uri/`) look for the directory index, while Vercel's
// cleanUrls and sirv-based servers look for the sibling `.html` file. Emitting
// both means /about resolves to the prerendered page everywhere, instead of
// silently falling through to the SPA fallback and serving the homepage HTML.
for (const route of routes) {
  const page = renderRoute(route.path)
  pages.push({ route: route.path, html: page })

  if (route.path === '/') {
    write(path.join(distDir, 'index.html'), page)
    console.log(`  ✓ ${route.path.padEnd(26)} → dist/index.html`)
    continue
  }

  write(path.join(distDir, route.path, 'index.html'), page)
  write(path.join(distDir, `${route.path}.html`), page)
  console.log(`  ✓ ${route.path.padEnd(26)} → dist${route.path}/index.html + .html`)
}

// SPA fallback for unknown URLs (Netlify, GitHub Pages, S3 static hosting).
write(path.join(distDir, '404.html'), renderRoute('/404'))
console.log(`  ✓ ${'/404'.padEnd(26)} → dist/404.html`)

/* ── Build-time SEO audit ────────────────────────────────────────────────
   Cheap to run and it catches the failure mode that matters most: a page
   quietly shipping without its head tags because a Helmet change broke the
   priority bucket. Silent SEO regressions are expensive; a red build is not. */

console.log('\n▸ Auditing prerendered SEO\n')

const problems = []

for (const { route, html } of pages) {
  const head = html.slice(0, html.indexOf('</head>'))
  const check = (label, ok) => { if (!ok) problems.push(`${route} — missing ${label}`) }

  check('<title>', /<title[^>]*>[^<]{10,}<\/title>/.test(head))
  check('meta description', /<meta[^>]*name="description"[^>]*content="[^"]{50,}"/.test(head))
  check('canonical', head.includes(`href="${site.url}${route === '/' ? '/' : route}"`))
  /**
   * og:image must exist on disk and be a raster format. Social scrapers
   * decline SVG, and a 404 image means the card renders blank — both failures
   * are invisible until someone shares the link, which is exactly the kind of
   * bug worth catching at build time.
   */
  const og = (head.match(/property="og:image"[^>]*content="([^"]+)"/) || [, ''])[1]
  check('og:image', Boolean(og))
  if (og) {
    const rel = og.replace(site.url, '')
    if (/\.svg$/i.test(rel)) problems.push(`${route} — og:image is an SVG (${rel}); scrapers will not render it`)
    else if (!fs.existsSync(path.join(distDir, rel))) problems.push(`${route} — og:image file is missing from the build: ${rel}`)
  }
  check('JSON-LD', /application\/ld\+json/.test(head))

  const h1s = html.match(/<h1[\s>]/g) || []
  if (h1s.length !== 1) problems.push(`${route} — expected exactly 1 <h1>, found ${h1s.length}`)

  // Every JSON-LD block must parse. A single malformed one makes Google
  // discard the whole block, so this is worth failing the build over.
  const blocks = head.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g) || []
  blocks.forEach((block, i) => {
    const json = block.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '')
    try { JSON.parse(json) } catch { problems.push(`${route} — JSON-LD block ${i} does not parse`) }
  })

  const titleLength = (head.match(/<title[^>]*>([^<]*)<\/title>/) || [, ''])[1].length
  // Google truncates on rendered width, not character count; ~65 characters
  // of mixed-case Latin is where the cut usually lands.
  if (titleLength > 65) console.log(`  ⚠ ${route} — title is ${titleLength} chars, likely truncated in results`)

  // Snippets get cut near 160. Anything past that is written for nobody.
  const descLength = (head.match(/name="description"[^>]*content="([^"]*)"/) || [, ''])[1].length
  if (descLength > 165) console.log(`  ⚠ ${route} — description is ${descLength} chars, snippet cuts near 160`)
}

if (problems.length) {
  console.error('\n✗ SEO audit failed:\n')
  problems.forEach((p) => console.error(`   · ${p}`))
  process.exit(1)
}
console.log(`  ✓ ${pages.length} pages pass title / description / canonical / og:image / JSON-LD / single-H1`)

/* ── sitemap.xml ──────────────────────────────────────────────────────── */

const today = new Date().toISOString().split('T')[0]
const OG = `${site.url}/images/og-cover.jpg`

/**
 * Sitemap values come from editable copy, and copy contains ampersands —
 * "Taxi, Tempo Traveller & Bus Hire". A bare `&` makes the document
 * ill-formed, and Google rejects an ill-formed sitemap whole rather than
 * skipping the offending line. Everything interpolated below goes through this.
 */
const xml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .map(
    (r) => `  <url>
    <loc>${xml(site.url + (r.path === '/' ? '/' : r.path))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
    <image:image>
      <image:loc>${xml(OG)}</image:loc>
      <image:title>${xml(`${site.name} — ${site.tagline}`)}</image:title>
    </image:image>
  </url>`
  )
  .join('\n')}
</urlset>
`

// Guard the escaping above. An unescaped character here costs every URL in the
// file, so it is worth a few lines to fail the build instead of the crawl.
const unescaped = sitemap
  .split('\n')
  .map((line, i) => [i + 1, line])
  .filter(([, line]) => /&(?!(amp|lt|gt|quot|apos|#\d+);)/.test(line))

if (unescaped.length) {
  console.error('\n✗ sitemap.xml contains unescaped XML entities:\n')
  unescaped.forEach(([n, line]) => console.error(`   line ${n}: ${line.trim()}`))
  process.exit(1)
}

write(path.join(distDir, 'sitemap.xml'), sitemap)
console.log('\n  ✓ sitemap.xml (well-formed, ' + routes.length + ' URLs)')

/* ── robots.txt ───────────────────────────────────────────────────────── */

const robots = `# ${site.name} — ${site.url}
# Taxi service in Rangpuri, New Delhi. Booking: ${site.phone}

User-agent: *
Allow: /
Disallow: /404.html
Disallow: /*?utm_

# Explicitly welcome the crawlers that drive local discovery and AI answers.
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

# Aggressive SEO scrapers add crawl load and return nothing.
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

Sitemap: ${site.url}/sitemap.xml
`
write(path.join(distDir, 'robots.txt'), robots)
console.log('  ✓ robots.txt')

console.log(`\n✓ Prerendered ${routes.length} routes into dist/\n`)
