import { Helmet } from 'react-helmet-async'
import { site, fullAddress } from '../data/site'

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
  type = 'website',
  noindex = false,
  schema,
  breadcrumbs,
}) {
  // Root keeps its trailing slash so the canonical matches the sitemap's <loc>.
  const canonical = `${site.url}${path === '/' ? '/' : path}`
  const fullTitle =
    path === '/' ? title : `${title} | ${site.name}`
  const ogImage = image.startsWith('http') ? image : `${site.url}${image}`

  const breadcrumbSchema = breadcrumbs && {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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

  const schemas = [schema, breadcrumbSchema].filter(Boolean).flat()

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

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Local / geo signals */}
      <meta name="geo.region" content={site.geoRegion} />
      <meta name="geo.placename" content={site.address.locality} />
      <meta name="geo.position" content={`${site.geo.lat};${site.geo.lng}`} />
      <meta name="ICBM" content={`${site.geo.lat}, ${site.geo.lng}`} />
      <meta name="author" content={site.name} />
      <meta name="publisher" content={site.name} />
      <meta name="contact" content={site.email} />
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

/** Organisation-level schema, rendered once on every page from App. */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['TravelAgency', 'LocalBusiness'],
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/images/logo.png`,
  image: `${site.url}/images/og-cover.jpg`,
  description: site.description,
  telephone: site.phoneRaw,
  email: site.email,
  founder: {
    '@type': 'Person',
    name: site.owner.name,
    jobTitle: site.owner.role,
    telephone: site.owner.phoneRaw,
    email: site.owner.email,
  },
  employee: {
    '@type': 'Person',
    name: site.owner.name,
    jobTitle: site.owner.role,
  },
  foundingDate: site.founded,
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Bank Transfer',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
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
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  areaServed: site.serviceAreas.map((a) => ({ '@type': 'City', name: a })),
  sameAs: Object.values(site.social),
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
    },
    {
      '@type': 'ContactPoint',
      email: site.altEmail,
      contactType: 'Customer Support',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { '@id': `${site.url}/#organization` },
  inLanguage: 'en-IN',
}

export const addressLine = fullAddress
