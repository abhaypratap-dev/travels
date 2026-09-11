import { Helmet } from 'react-helmet-async'
import { site, fullAddress, yearsActive } from '../data/site'

/**
 * Per-page SEO head. Emits title, description, canonical, robots,
 * Open Graph, Twitter cards and any page-specific JSON-LD.
 */
export default function Seo({
  title,
  description,
  path = '/',
  keywords,
  image = '/images/og-cover.jpg',
  imageAlt,
  type = 'website',
  noindex = false,
  schema,
  breadcrumbs,
  article,
}) {
  // Root keeps its trailing slash so the canonical matches the sitemap's <loc>.
  const canonical = `${site.url}${path === '/' ? '/' : path}`
  /**
   * Brand suffix, but only when it fits.
   *
   * Titles are held to 60 characters, inside the width Google renders before
   * truncating. Appending the brand unconditionally pushed the longer vehicle
   * and itinerary pages past that, and the half that got cut was the half that
   * distinguishes them. So the suffix is added when the result stays inside
   * the budget and dropped when it would not — the page's own name always
   * wins over the brand. The prerender audit fails the build past 60.
   */
  const TITLE_BUDGET = 60
  const suffixed = `${title} | ${site.shortName}`
  const fullTitle =
    path === '/' ? title : suffixed.length <= TITLE_BUDGET ? suffixed : title
  /**
   * Open Graph needs a raster image. Facebook, WhatsApp, LinkedIn and X all
   * decline to render an SVG `og:image`, so a page whose on-page artwork is
   * `/images/vehicle-suv.svg` shares with a pre-rendered JPEG twin at
   * `/images/og/vehicle-suv.jpg`. `scripts/generate-images.mjs` documents how
   * those are produced; on-page display keeps the sharp, tiny SVG.
   */
  const rasterised = image.replace(/^\/images\/(.+)\.svg$/, '/images/og/$1.jpg')
  const ogImage = rasterised.startsWith('http') ? rasterised : `${site.url}${rasterised}`
  // Page photographs are 3:2 at 1200×800; the default share card is 1200×630.
  const [ogWidth, ogHeight] = /\/images\/(fleet|places|blog)\//.test(rasterised) ? [1200, 800] : [1200, 630]
  const ogAlt = imageAlt || `${site.name} — ${site.tagline}`

  const breadcrumbSchema = breadcrumbs && {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      ...breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: b.name,
        item: `${site.url}${b.path}`,
      })),
    ],
  }

  /**
   * A WebPage node on every route, tied back to the organisation and the
   * website. Without it each page's JSON-LD is a set of orphan islands;
   * with it, Google can resolve one entity graph for the whole site.
   */
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: fullTitle,
    description,
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#organization` },
    primaryImageOfPage: { '@type': 'ImageObject', url: ogImage },
    inLanguage: 'en-IN',
    ...(breadcrumbs ? { breadcrumb: { '@id': `${canonical}#breadcrumb` } } : {}),
  }

  const schemas = [webPageSchema, schema, breadcrumbSchema].filter(Boolean).flat()

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-IN" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />
      <meta
        name="googlebot"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={String(ogWidth)} />
      <meta property="og:image:height" content={String(ogHeight)} />
      <meta property="og:image:alt" content={ogAlt} />
      <meta property="og:locale" content="en_IN" />
      {article?.published && <meta property="article:published_time" content={article.published} />}
      {article?.modified && <meta property="article:modified_time" content={article.modified} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogAlt} />

      {/* Local / geo signals */}
      <meta name="geo.region" content={site.geoRegion} />
      <meta name="geo.placename" content={`${site.address.area}, ${site.address.locality}`} />
      <meta name="geo.position" content={`${site.geo.lat};${site.geo.lng}`} />
      <meta name="ICBM" content={`${site.geo.lat}, ${site.geo.lng}`} />
      <meta name="author" content={site.name} />
      <meta name="publisher" content={site.name} />
      <meta name="coverage" content="India" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {schemas.map((s, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  )
}

/** Only profiles that actually exist — a `sameAs` pointing at a 404 hurts. */
const liveProfiles = Object.values(site.social).filter(Boolean)

/**
 * Organisation-level schema, rendered once on every page from App.
 *
 * Typed as both TaxiService and TravelAgency: the Google Business Profile
 * category is "Taxi service in New Delhi", and matching that category is what
 * ties this markup to the local listing. TravelAgency is kept alongside it
 * because the tour packages are genuinely a second line of business.
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['TaxiService', 'TravelAgency', 'LocalBusiness'],
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  alternateName: site.legalName,
  url: site.url,
  logo: {
    '@type': 'ImageObject',
    '@id': `${site.url}/#logo`,
    url: `${site.url}/images/logo.png`,
    width: 512,
    height: 512,
    caption: site.name,
  },
  image: [`${site.url}/images/og-cover.jpg`, `${site.url}/images/logo.png`],
  description: site.description,
  slogan: site.tagline,
  telephone: site.phoneRaw,
  email: site.email,
  founder: {
    '@type': 'Person',
    name: site.owner.name,
    jobTitle: site.owner.role,
    telephone: site.owner.phoneRaw,
    email: site.owner.email,
    worksFor: { '@id': `${site.url}/#organization` },
  },
  employee: {
    '@type': 'Person',
    name: site.owner.name,
    jobTitle: site.owner.role,
  },
  foundingDate: site.founded,
  knowsLanguage: ['en-IN', 'hi-IN'],
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Bank Transfer',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.street}, ${site.address.area}`,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  /** 60 km covers Delhi NCR end to end; outstation work is in `areaServed`. */
  areaServed: site.serviceAreas.map((a) => ({ '@type': 'City', name: a })),
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    geoRadius: '60000',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  sameAs: liveProfiles,
  /**
   * These figures mirror the Google Business Profile exactly. If the profile
   * moves, update `site.rating` — never inflate them. A rating in structured
   * data that a visitor can disprove in one click invites a manual action.
   */
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
    bestRating: '5',
    worstRating: '1',
  },
  hasMap: site.mapLink,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      name: site.owner.name,
      telephone: site.owner.phoneRaw,
      email: site.owner.email,
      contactType: 'Reservations',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
    {
      '@type': 'ContactPoint',
      email: site.altEmail,
      contactType: 'Customer Support',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  ],
  /** Surfaces the four commercial pages as a catalogue Google can read. */
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Vehicles available for rent with driver',
    itemListElement: [
      { name: '4 Seater Car Rental', url: `${site.url}/4-seater-car-rental` },
      { name: 'SUV 7 Seater on Rent', url: `${site.url}/7-seater-suv-on-rent` },
      { name: 'Tempo Traveller on Rent', url: `${site.url}/tempo-traveller-on-rent` },
      { name: 'Mini Bus on Rent', url: `${site.url}/mini-bus-on-rent` },
    ].map((item) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: item.name, url: item.url },
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    })),
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  alternateName: site.shortName,
  description: site.description,
  publisher: { '@id': `${site.url}/#organization` },
  inLanguage: 'en-IN',
}

export const addressLine = fullAddress
export const yearsInBusiness = yearsActive
