/**
 * Single source of truth for business details.
 * Update the values here and they propagate across the whole site,
 * including SEO meta tags, schema.org JSON-LD, sitemap and footer.
 */

// Extensions are explicit: scripts/prerender.js loads this module through
// Node's ESM resolver, which — unlike Vite — will not guess them.
import { fleet } from './fleet.js'
import { packages } from './packages.js'
import { vehicleTypes } from './vehicleTypes.js'

const FOUNDED = 2012

export const site = {
  name: 'Shekhawat Tours and Travels',
  shortName: 'Shekhawat Travels',
  legalName: 'Shekhawat Tour and Travels',
  tagline: 'Taxi, Tempo Traveller & Bus Hire in Delhi NCR',
  founded: String(FOUNDED),

  /** Live domain, matching the one listed on the Google Business Profile. */
  url: 'https://www.shekhawattoursandtravels.in',

  description:
    'Shekhawat Tours and Travels is a taxi service in Rangpuri, New Delhi — minutes from IGI Airport. Book 4 seater cars, 7 seater SUVs, tempo travellers and mini buses on rent with experienced drivers. Airport transfers, outstation trips, wedding and corporate hire at fixed, transparent rates. Open 24×7.',

  // Owner / primary point of contact
  owner: {
    name: 'Rupesh Singh',
    role: 'Owner & Booking Manager',
    phone: '+91 79824 71997',
    phoneRaw: '+917982471997',
    email: 'rupeshsingh7982471997@gmail.com',
  },

  // Contact
  phone: '+91 79824 71997',
  phoneRaw: '+917982471997',
  phoneDisplayAlt: '079824 71997',
  whatsapp: '917982471997',
  email: 'rupeshsingh7982471997@gmail.com',
  altEmail: 'abhayshekhawet@gmail.com',

  // Address — as listed on the Google Business Profile.
  address: {
    street: 'PKT-5, Gali No. 4, KH 1141, Ground Floor, Rangpuri Extension, B-Block, Pocket-4',
    area: 'Rangpuri',
    landmark: 'Near Mahipalpur, 3 km from IGI Airport Terminal 3',
    locality: 'New Delhi',
    region: 'Delhi',
    postalCode: '110037',
    country: 'IN',
    countryName: 'India',
  },
  // ⚠️ Approximate coordinates for Rangpuri Extension, New Delhi. Drop a pin on
  // the exact shopfront in Google Maps and paste the real lat/lng here — local
  // pack rankings lean on this.
  geo: { lat: 28.5432, lng: 77.1268 },
  geoRegion: 'IN-DL', // ISO 3166-2 code, used in the geo.region meta tag

  /**
   * Canonical Google Business Profile links, derived from the listing's CID.
   * These are stable — unlike a search-results URL — so they are safe to use
   * in `sameAs`, `hasMap` and the reviews link.
   */
  googleCid: '15553019199715657153',
  mapLink: 'https://www.google.com/maps?cid=15553019199715657153',
  reviewsLink: 'https://www.google.com/maps?cid=15553019199715657153',
  writeReviewLink:
    'https://search.google.com/local/writereview?placeid=&cid=15553019199715657153',
  mapEmbed:
    'https://www.google.com/maps?q=Shekhawat+Tour+and+Travels%2C+Rangpuri+Extension%2C+New+Delhi+110037&output=embed',

  hours: 'Open 24×7 · All days including public holidays',
  walkInHours: '7:00 AM – 10:00 PM',

  /**
   * ⚠️ Set this to the real GSTIN to display it. Left null, the site says
   * "GST registered — tax invoice on request" instead of printing a made-up
   * number, which would be worse than saying nothing.
   */
  gstin: null,

  /**
   * Only verified, live profiles belong here — `sameAs` pointing at pages that
   * 404 is a negative trust signal. Add the real handles as they go live.
   */
  social: {
    google: 'https://www.google.com/maps?cid=15553019199715657153',
    facebook: '',
    instagram: '',
    youtube: '',
  },

  // Primary service areas — used for local SEO copy and schema
  serviceAreas: [
    'New Delhi', 'Mahipalpur', 'Rangpuri', 'Vasant Kunj', 'Dwarka',
    'Gurugram', 'Noida', 'Ghaziabad', 'Faridabad', 'IGI Airport',
    'Agra', 'Jaipur', 'Mathura', 'Vrindavan', 'Haridwar', 'Rishikesh',
    'Chandigarh', 'Amritsar', 'Shimla', 'Manali', 'Dehradun', 'Nainital',
    'Sikar', 'Jhunjhunu', 'Bikaner', 'Jodhpur', 'Udaipur', 'Jaisalmer',
    'Pushkar', 'Ajmer',
  ],

  /** Headline numbers. `count` drives the animated counter; `suffix` follows it. */
  stats: [
    { value: 4.9, suffix: '★', label: 'Google rating', decimals: 1 },
    { value: 80, suffix: '+', label: 'Google reviews' },
    { value: 60, suffix: '+', label: 'Vehicles in fleet' },
    { value: 24, suffix: '×7', label: 'Booking desk open' },
  ],

  /** Verified from the Google Business Profile. Do not inflate these. */
  rating: { value: '4.9', count: '80' },
}

/** Years in operation, computed so the copy never goes stale. */
export const yearsActive = new Date().getFullYear() - FOUNDED

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  {
    label: 'Vehicles',
    to: '/fleet',
    children: [
      { label: '4 Seater Car', to: '/4-seater-car-rental' },
      { label: 'SUV 7 Seater', to: '/7-seater-suv-on-rent' },
      { label: 'Tempo Traveller', to: '/tempo-traveller-on-rent' },
      { label: 'Mini Bus', to: '/mini-bus-on-rent' },
      { label: 'Full Fleet', to: '/fleet' },
    ],
  },
  {
    label: 'Tour Packages',
    to: '/tour-packages',
    // Built from the itinerary list so a new package appears in the menu on
    // its own, the same way it appears in the sitemap.
    children: [
      ...packages.map((p) => ({ label: p.shortTitle, to: `/tour-packages/${p.slug}` })),
      { label: 'All Packages', to: '/tour-packages' },
    ],
  },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact Us', to: '/contact' },
]

/**
 * Every crawlable route — consumed by the router, the prerenderer and the
 * sitemap generator.
 *
 * The per-vehicle and per-package routes are derived from their data files
 * rather than listed by hand: adding a vehicle to fleet.js gives it a
 * prerendered page, a sitemap entry and a nav link with no further edits, and
 * the three can never drift out of sync.
 */
export const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/4-seater-car-rental', priority: 0.9, changefreq: 'weekly' },
  { path: '/7-seater-suv-on-rent', priority: 0.9, changefreq: 'weekly' },
  { path: '/tempo-traveller-on-rent', priority: 0.9, changefreq: 'weekly' },
  { path: '/mini-bus-on-rent', priority: 0.9, changefreq: 'weekly' },
  { path: '/fleet', priority: 0.9, changefreq: 'weekly' },
  { path: '/tour-packages', priority: 0.8, changefreq: 'weekly' },
  { path: '/services', priority: 0.8, changefreq: 'monthly' },
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  { path: '/gallery', priority: 0.5, changefreq: 'monthly' },

  // One page per vehicle — /fleet/toyota-innova-crysta and siblings.
  ...fleet.map((v) => ({ path: `/fleet/${v.slug}`, priority: 0.7, changefreq: 'monthly' })),

  // One page per itinerary — /tour-packages/golden-triangle-delhi-agra-jaipur etc.
  ...packages.map((p) => ({ path: `/tour-packages/${p.slug}`, priority: 0.7, changefreq: 'monthly' })),
]

/** Vehicle-category slugs, re-exported so consumers need one import, not two. */
export const vehicleTypeSlugs = vehicleTypes.map((v) => v.slug)

export const whatsappLink = (message = 'Hi, I would like to enquire about a booking.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`

export const fullAddress = `${site.address.street}, ${site.address.area}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, ${site.address.countryName}`

/** Shorter form for cards and meta descriptions where the full string is unwieldy. */
export const shortAddress = `${site.address.area}, ${site.address.locality} ${site.address.postalCode}`
