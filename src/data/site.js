/**
 * Single source of truth for business details.
 * Update the values here and they propagate across the whole site,
 * including SEO meta tags, schema.org JSON-LD, sitemap and footer.
 */

export const site = {
  name: 'Shekhawat Tours and Travels',
  shortName: 'Shekhawat Travels',
  legalName: 'Shekhawat Tours and Travels',
  tagline: 'Trusted Car Rental & Bus Hire Across India',
  founded: '2012',

  // ⚠️ Replace with your live domain before deploying (no trailing slash).
  url: 'https://www.shekhawattoursandtravels.com',

  description:
    'Shekhawat Tours and Travels offers well-maintained sedans, SUVs, tempo travellers, mini buses and luxury coaches on rent with experienced drivers. Outstation taxi, airport transfer, wedding car hire and Rajasthan tour packages at transparent rates. Based in Rangpuri, New Delhi.',

  // Owner / primary point of contact
  owner: {
    name: 'Rupesh Singh Shekhawat',
    role: 'Owner & Contact Person',
    phone: '+91 79824 71997',
    phoneRaw: '+917982471997',
    email: 'rupeshsingh7982471997@gmail.com',
  },

  // Contact
  phone: '+91 79824 71997',
  phoneRaw: '+917982471997',
  whatsapp: '917982471997',
  email: 'rupeshsingh7982471997@gmail.com',
  altEmail: 'abhayshekhawet@gmail.com',

  // Address
  address: {
    street: 'KH 1141, Ground Floor, Gali No. 4, Rangpuri',
    locality: 'New Delhi',
    region: 'Delhi',
    postalCode: '110037',
    country: 'IN',
    countryName: 'India',
  },
  // ⚠️ Approximate coordinates for Rangpuri, New Delhi. Drop a pin on your
  // exact shopfront in Google Maps and paste the real lat/lng here — local
  // search results lean on this.
  geo: { lat: 28.5432, lng: 77.1268 },
  geoRegion: 'IN-DL', // ISO 3166-2 code, used in the geo.region meta tag
  mapEmbed:
    'https://www.google.com/maps?q=Rangpuri,New+Delhi,110037&output=embed',
  mapLink: 'https://maps.google.com/?q=Rangpuri,New+Delhi,110037',

  hours: 'Open 24×7 · All days including public holidays',
  // ⚠️ Placeholder. 07 is the Delhi state code — replace with your real GSTIN.
  gstin: '07AAAAA0000A1Z5',

  social: {
    facebook: 'https://facebook.com/shekhawattoursandtravels',
    instagram: 'https://instagram.com/shekhawattoursandtravels',
    youtube: 'https://youtube.com/@shekhawattoursandtravels',
    twitter: 'https://x.com/shekhawattravel',
  },

  // Primary service areas — used for local SEO copy and schema
  serviceAreas: [
    'New Delhi', 'Gurugram', 'Noida', 'Ghaziabad', 'Faridabad',
    'IGI Airport', 'Agra', 'Jaipur', 'Sikar', 'Jhunjhunu',
    'Bikaner', 'Jodhpur', 'Udaipur', 'Jaisalmer', 'Pushkar', 'Ajmer',
    'Mathura', 'Vrindavan', 'Haridwar', 'Rishikesh', 'Shimla', 'Manali',
    'Chandigarh', 'Amritsar',
  ],

  stats: [
    { value: '13+', label: 'Years on the road' },
    { value: '60+', label: 'Vehicles in fleet' },
    { value: '25,000+', label: 'Trips completed' },
    { value: '4.8/5', label: 'Average rating' },
  ],

  rating: { value: '4.8', count: '1247' },
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Our Fleet', to: '/fleet' },
  { label: 'Tour Packages', to: '/tour-packages' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

/** Every crawlable route — consumed by the prerenderer and sitemap generator. */
export const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/fleet', priority: 0.9, changefreq: 'weekly' },
  { path: '/tour-packages', priority: 0.9, changefreq: 'weekly' },
  { path: '/services', priority: 0.8, changefreq: 'monthly' },
  { path: '/gallery', priority: 0.6, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
]

export const whatsappLink = (message = 'Hi, I would like to enquire about a booking.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, ${site.address.countryName}`
