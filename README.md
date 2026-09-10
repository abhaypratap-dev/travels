# Shekhawat Tours and Travels

Marketing site for a taxi service in Rangpuri, New Delhi — cars, SUVs, tempo
travellers and mini buses on rent with driver, plus tour packages.

**Live:** https://www.shekhawattoursandtravels.in
**Google Business Profile:** https://www.google.com/maps?cid=15553019199715657153

---

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # client + SSR + prerender + SEO audit → dist/
npm run preview  # serve the built dist/ locally
```

`npm run build` runs three stages in order, and the third **fails the build** if
any of the 32 pages ships without a title, meta description, canonical,
JSON-LD that parses, exactly one `<h1>`, or an `og:image` that is both raster
and present on disk. It also refuses to emit a sitemap containing an unescaped
XML entity.

Those checks exist because SEO regressions are otherwise silent — a Helmet
change can drop every meta tag on the site, and nothing looks broken until
traffic disappears weeks later.

### If `npm run build` fails with `bad interpreter: Operation not permitted`

The project files carry macOS's quarantine flag, which blocks execution of
anything in `node_modules/.bin`. Clear it once:

```bash
xattr -dr com.apple.quarantine .
```

This only affects local macOS development. Linux CI and Vercel are unaffected.

---

## Where things live

```
src/data/site.js            Business details — the single source of truth.
                            Name, phone, address, rating, service areas and the
                            route table all flow from here into the meta tags,
                            JSON-LD, sitemap, footer and nav.
src/data/vehicleTypes.js    The four category landing pages (4 seater, 7 seater
                            SUV, tempo traveller, mini bus). One entry = one page.
src/data/fleet.js           15 vehicles: rates, specs, written copy, FAQs and
                            artwork. One entry = one page under /fleet/.
src/data/packages.js        6 tour itineraries: day-by-day plan, inclusions,
                            FAQs. One entry = one page under /tour-packages/.
src/data/services.js        Service descriptions.
src/data/content.js         Testimonials, site FAQs, milestones, gallery.

src/components/Seo.jsx      Per-page head tags plus the organisation and website
                            schema graph.
src/components/Motion.jsx   Animation primitives — scroll reveal, counters,
                            marquee, parallax, page transitions.
src/pages/VehicleType.jsx   Template for the 4 category pages.
src/pages/VehicleDetail.jsx Template for the 15 per-vehicle pages.
src/pages/PackageDetail.jsx Template for the 6 per-package pages.
src/styles/motion.css       The animation layer.
scripts/generate-images.mjs Regenerates the illustration set into public/images.
scripts/prerender.js        Static prerender, sitemap, robots.txt, SEO audit.
```

### The 32 routes

| Group | Count | Pattern |
| --- | --- | --- |
| Core pages | 7 | `/`, `/about`, `/fleet`, `/tour-packages`, `/services`, `/gallery`, `/contact` |
| Vehicle categories | 4 | `/4-seater-car-rental`, `/7-seater-suv-on-rent`, `/tempo-traveller-on-rent`, `/mini-bus-on-rent` |
| Individual vehicles | 15 | `/fleet/<slug>` — one per entry in `fleet.js` |
| Individual packages | 6 | `/tour-packages/<slug>` — one per entry in `packages.js` |

Adding a vehicle to `fleet.js` or an itinerary to `packages.js` gives it a
prerendered page, a sitemap entry, a nav link and footer links automatically —
the route table in `site.js` is derived from those files rather than written by
hand, so the three cannot drift apart.

### Editing business details

Almost everything is in `src/data/site.js`. Change it there and it propagates —
you should not need to touch a component to update the phone number, address or
service-area list.

### Images

The artwork in `public/images` is generated flat illustration, not photography.
The business has no photo library yet, and a page of empty grey boxes reads as
broken — these are on-brand, distinct per vehicle body type and destination, and
weigh two to four kilobytes each.

**They are meant to be replaced.** Drop a real photograph into `public/images`
and point the `image` field in `src/data/fleet.js`, `packages.js` or the `src`
field in `content.js` at it. Nothing else changes — the layouts, alt text and
schema all read from those fields.

`node scripts/generate-images.mjs` regenerates the illustration set. The header
of that file documents how the `public/images/og/*.jpg` Open Graph rasters are
produced, and why they exist: no social scraper renders an SVG `og:image`, so
`Seo.jsx` rewrites `/images/x.svg` to `/images/og/x.jpg` for the share card.

---

## How the SEO works

**Every route is real HTML on disk.** `scripts/prerender.js` renders each route
through React's server renderer at build time, so crawlers and social scrapers
receive fully-formed markup with the right `<title>`, meta tags and JSON-LD
without executing any JavaScript. React hydrates that same markup in the browser.

**One entity graph, not islands.** `organizationSchema` in `Seo.jsx` is typed as
`TaxiService` + `TravelAgency` + `LocalBusiness` with a stable `@id`, and every
page's `WebPage`, `Service`, `Product` and `BreadcrumbList` nodes reference it.
The `TaxiService` type matches the Google Business Profile category, which is
what ties the markup to the local listing.

**The four vehicle pages are the commercial core.** Someone searching "12 seater
tempo traveller price Delhi" wants a page about that vehicle, not a filterable
fleet grid. Each has its own title, rates, routes, FAQ block and `Service` schema.

### Two rules worth keeping

1. **`site.rating` must match the Google Business Profile exactly.** It feeds the
   `aggregateRating` in structured data. A rating a visitor can disprove in one
   click is a manual-action risk, not a trust win.

2. **`Review` schema stays off until the testimonials are real.** See the gate at
   the top of `src/data/content.js`. Copy genuine review text from the Business
   Profile, then set `testimonialsAreVerified = true`.

---

## How the animation works

Three properties are animated — `transform`, `opacity`, `filter` — because those
are the ones the compositor handles without re-laying-out the page.

**Nothing is ever hidden from a crawler.** The hidden "before" state of a scroll
reveal is scoped to `html.js`, a class set by an inline script in `index.html`.
With JavaScript off, blocked, or still loading, those rules do not match and the
prerendered content is fully visible. On top of that, `RevealObserver` force-
reveals anything still hidden after 2.5 seconds, so a crawler rendering at an
unusual viewport cannot end up with a blank page.

**`prefers-reduced-motion: reduce` turns everything off** — not "slightly less".
Every drift, sweep, loop and reveal is removed and all content resolves to its
final visible state.

---

## Before launch

- [ ] Point the domain at the deployment and confirm the apex → `www` redirect.
- [ ] Replace the approximate `site.geo` coordinates with a real pin from Google
      Maps — local pack rankings lean on this.
- [ ] Add the real GSTIN to `site.gstin` (it renders "Registered — invoice on
      request" while null, rather than printing a placeholder number).
- [ ] Add real social profile URLs to `site.social` as they go live. Empty
      strings are skipped; `sameAs` pointing at a 404 is a negative signal.
- [ ] Swap the illustrative testimonials for real Google reviews, then flip
      `testimonialsAreVerified`.
- [ ] Replace the generated illustrations with real photographs of the actual
      vehicles — see **Images** above. This is the single biggest remaining
      credibility win; everything else on the page is already true.
- [ ] Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.
