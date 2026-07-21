# Shekhawat Tours and Travels — Website

A complete, SEO-ready marketing site for an Indian car rental and bus hire business.
React 18 + Vite, with every route **prerendered to static HTML** at build time so
search engines and social scrapers get fully-formed markup without running JavaScript.

---

## Prerequisites

Node.js 20.19+ or 22.12+ (required by Vite 8). **Node v24.18.0 LTS is already
installed** at `~/.local/node`, and `~/.zshrc` puts it on your `PATH`.

If a terminal cannot find `node`, either open a new one or run:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
```

## Getting started

```bash
npm install     # install dependencies
npm run dev     # dev server at http://localhost:5173
npm run build   # production build + prerender + sitemap
npm run preview # serve the production build at http://localhost:4173
```

`npm run build` does three things in sequence:

1. `vite build` — bundles the client app into `dist/`
2. `vite build --ssr` — bundles the server renderer into `dist-ssr/`
3. `node scripts/prerender.js` — renders every route to real HTML, then writes
   `sitemap.xml`, `robots.txt` and the `404.html` page

Each route is written **twice**, as `about.html` and `about/index.html`. Static
hosts disagree about how to resolve an extensionless URL — Apache and nginx look
for the directory index, Vercel's `cleanUrls` and sirv-based servers look for the
sibling `.html`. Emitting both means `/about` serves the real prerendered page
everywhere instead of quietly falling back to the homepage HTML.

If you ever want a plain single-page build with no prerendering, use `npm run build:spa`.

---

## Make it yours — the short list

Everything business-specific lives in **`src/data/`**. You should not need to touch
any component to launch this site.

| What to change | File |
| --- | --- |
| Owner name, phone, WhatsApp, emails, address, GSTIN, social links, **live domain** | `src/data/site.js` |
| Vehicles, seats, per-km and per-day rates | `src/data/fleet.js` |
| Tour packages and day-by-day itineraries | `src/data/packages.js` |
| Services offered | `src/data/services.js` |
| Testimonials, FAQs, gallery captions, company milestones | `src/data/content.js` |
| Colours and fonts | `src/styles/global.css` (the `:root` block) |

### Before you deploy — do these four things

1. **Set the real domain.** Change `site.url` in `src/data/site.js`, and the
   `Sitemap:` line in `public/robots.txt`. Canonical URLs, Open Graph tags and
   the generated sitemap all derive from this one value.
2. **Set the real phone number.** Update `phone`, `phoneRaw` and `whatsapp` in
   `src/data/site.js`. `whatsapp` is the number in international format with no
   `+` or spaces (e.g. `917982471997`).
3. **Add images.** Drop photos into `public/images/` and reference them:
   - `og-cover.jpg` (1200×630) — the social sharing preview
   - `logo.png` — used in the organisation schema
   - Vehicle photos — set the `image` field on each entry in `src/data/fleet.js`
   - Gallery photos — add a `src` field to entries in `src/data/content.js`
   Cards fall back to styled illustrations when no photo is set, so nothing breaks
   if you launch before the photos are ready.
4. **Check the remaining placeholders.** Owner name, phone, both emails and the
   Rangpuri address are real. Still placeholders: the **GSTIN**, the **founding year
   (2012)**, the **4.8 / 1247 review figures**, and the **map coordinates** in
   `site.geo` (approximate for Rangpuri — drop a pin on your exact shopfront in
   Google Maps and paste the real lat/lng, since local search leans on it).

---

## What makes this SEO-ready

**Crawlable HTML.** Every route is prerendered to static HTML with its own
`<title>`, meta description, canonical link and JSON-LD already in the markup.
React hydrates that markup in the browser rather than replacing it.

**Structured data (schema.org).** Emitted as JSON-LD:

- `TravelAgency` + `LocalBusiness` with address, geo coordinates, opening hours,
  service areas, payment methods and aggregate rating — sitewide
- `WebSite`, `BreadcrumbList` — sitewide and per page
- `Product` + `Offer` for every vehicle, wrapped in an `ItemList` on the fleet page
- `TouristTrip` with a full itinerary for each tour package
- `Service` for each service offered
- `FAQPage` on the home, fleet, packages, services and contact pages
- `Review` + `AggregateRating` from the testimonials

**Local SEO.** Geo meta tags (`geo.region`, `geo.position`, `ICBM`), city-level
service-area markup, and long-form location copy on the home page targeting the
searches this business actually competes for.

**Technical.** Auto-generated `sitemap.xml` with per-route priority and changefreq,
`robots.txt`, canonical URLs on every page, Open Graph and Twitter card tags,
`en-IN` locale, a web manifest, and semantic heading structure with exactly one
`<h1>` per page.

**Performance and accessibility.** No UI framework or icon library — icons are
inline SVG, styling is hand-written CSS, so the JS bundle stays small. Skip link,
visible focus rings, ARIA on all disclosure widgets, `prefers-reduced-motion`
support, and a fully responsive layout down to 320px.

### After launch

- Verify the domain in [Google Search Console](https://search.google.com/search-console)
  and submit `https://yourdomain.com/sitemap.xml`
- Create a **Google Business Profile** — for a local travel business this drives
  more enquiries than the website itself. Keep the name, address and phone
  character-for-character identical to `src/data/site.js`.
- Test your structured data at [validator.schema.org](https://validator.schema.org)
  and the [Rich Results Test](https://search.google.com/test/rich-results)

---

## Enquiry form

With no backend configured, the booking form opens WhatsApp with the enquiry
pre-filled — the fastest path to a reply for most Indian travel businesses, and it
needs no server.

To post to your own API instead, pass an endpoint:

```jsx
<BookingForm endpoint="https://api.example.com/enquiries" />
```

The form then `POST`s the form object as JSON and shows a success or error state.

---

## Deploying

The build output in `dist/` is fully static — any host works.

- **Netlify** — build `npm run build`, publish `dist`. `public/_redirects` is included.
- **Vercel** — `vercel.json` is included with caching and security headers set.
- **Any static host / cPanel** — upload the contents of `dist/`. Point the server's
  "not found" handler at `404.html`.

Note that `_redirects` deliberately does **not** contain the usual
`/*  /index.html  200` SPA fallback. Every real route is a static file already, and
that rule would answer every unknown URL with the homepage under a `200` — which
Google treats as a soft 404. Unknown URLs get `404.html` with a real 404 status instead.

---

## Project structure

```
├── index.html                 # shell, with prerender placeholders
├── scripts/prerender.js       # static HTML + sitemap generation
├── public/                    # robots.txt, favicon, manifest, images
└── src/
    ├── main.jsx               # client entry (hydrates prerendered HTML)
    ├── entry-server.jsx       # SSR entry used at build time
    ├── App.jsx                # routes + sitewide schema
    ├── components/            # Header, Footer, Seo, BookingForm, cards, icons
    ├── pages/                 # Home, About, Fleet, Packages, Services, Gallery, Contact, 404
    ├── data/                  # ← all business content lives here
    └── styles/global.css
```
