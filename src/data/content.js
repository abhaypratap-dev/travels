import { site, yearsActive } from './site.js'

/**
 * ⚠️ REVIEW SCHEMA GATE
 *
 * The testimonials below are illustrative placeholders written to show the
 * layout. They are NOT marked up as schema.org `Review` nodes while this flag
 * is false, because Google's review-snippet policy requires marked-up reviews
 * to be genuine and independently verifiable.
 *
 * Action for launch: open the Google Business Profile
 * (https://www.google.com/maps?cid=15553019199715657153), copy real review
 * text and reviewer first names into the array below, then flip this to true.
 * Star snippets start appearing on their own after the next crawl.
 */
export const testimonialsAreVerified = false

export const testimonials = [
  {
    name: 'Rajesh Agarwal',
    place: 'Delhi',
    trip: 'Golden Triangle, 5 days',
    rating: 5,
    text:
      'We booked an Innova Crysta for the Delhi–Agra–Jaipur circuit. The driver, Mahesh ji, was punctual every single morning and knew exactly when to reach the Taj to avoid the queue. Billing matched the quote to the rupee.',
  },
  {
    name: 'Priya Sharma',
    place: 'Mumbai',
    trip: 'Rajasthan family tour, 10 days',
    rating: 5,
    text:
      'Travelling with elderly parents and a toddler is not easy. The tempo traveller was spotless, the AC worked through the desert stretch, and they never rushed us at any stop. Genuinely a stress-free trip.',
  },
  {
    name: 'Vikram Singh Rathore',
    place: 'Jaipur',
    trip: 'Wedding — 3 buses + 2 luxury cars',
    rating: 5,
    text:
      'Handled the entire baraat movement for my sister\'s wedding — three mini buses and two decorated cars across two days. Their coordinator stayed on call the whole time. Not one guest was left waiting.',
  },
  {
    name: 'Anita Gupta',
    place: 'Kolkata',
    trip: 'Khatu Shyam & Salasar darshan',
    rating: 5,
    text:
      'Booked at 10 PM for a 5 AM departure and they still arranged the car. The driver knew the aarti timings and got us darshan at both temples comfortably in one day.',
  },
  {
    name: 'Suresh Kumar',
    place: 'Bengaluru',
    trip: 'Corporate monthly contract',
    rating: 5,
    text:
      'We run a monthly contract with them for our Jaipur office shuttle. Invoices come with GST and duty slips, drivers are in uniform, and in eight months there has not been a single no-show.',
  },
  {
    name: 'Meenakshi Joshi',
    place: 'Pune',
    trip: 'Shekhawati heritage trail',
    rating: 5,
    text:
      'Our driver was from Nawalgarh himself and showed us frescoes that were not in any guidebook. That local knowledge made the whole trip. Fair pricing, no last-minute additions.',
  },
]

export const faqs = [
  {
    q: 'How do I book a car or bus with Shekhawat Tours and Travels?',
    a: 'Call or WhatsApp us on our booking number, or send the enquiry form on this site. Share your travel dates, pickup city, destination and passenger count — we confirm the vehicle and a fixed quote within 15 minutes during working hours.',
  },
  {
    q: 'What is included in the rental rate?',
    a: 'The per-kilometre rate covers the vehicle, fuel and driver. Toll tax, state permits, parking charges and driver night allowance are billed separately at actuals and always shown to you before the trip. There are no hidden charges.',
  },
  {
    q: 'Is there a minimum kilometre limit for outstation trips?',
    a: 'Yes. Most outstation bookings carry a 250 km per day minimum (300 km for large coaches). If you travel less, the minimum applies; if you travel more, you are billed only for the actual distance covered.',
  },
  {
    q: 'Do you provide one-way drop taxi service?',
    a: 'We do, on most major routes such as Delhi–Jaipur, Delhi–Agra, Delhi–Chandigarh, Delhi–Haridwar and Jodhpur–Udaipur. One-way rates are lower than round trips since you are not charged for the return leg on these routes.',
  },
  {
    q: 'Are your drivers verified and experienced?',
    a: 'Every driver holds a valid commercial licence, is police-verified, and has at least five years of highway experience. They are in uniform, speak Hindi and functional English, and know the routes and stopping points across Rajasthan.',
  },
  {
    q: 'Can I cancel or reschedule my booking?',
    a: 'Cancellations made more than 24 hours before departure are free of charge. Within 24 hours, a nominal charge may apply depending on the vehicle. Rescheduling is free subject to availability — just tell us as early as you can.',
  },
  {
    q: 'Do you offer GST invoices for corporate bookings?',
    a: 'Yes. We are GST registered and issue proper tax invoices with duty slips for every trip, which makes reimbursement and corporate accounting straightforward.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Cash, UPI, bank transfer and all major credit and debit cards. Corporate clients can be set up on a monthly credit cycle after the first booking.',
  },
  {
    q: 'Are the vehicles insured and permitted for all-India travel?',
    a: 'All vehicles carry valid all-India tourist permits, comprehensive insurance, current fitness certificates and pollution certificates. Documents are available in the vehicle for inspection at any time.',
  },
  {
    q: 'Which cities and states do you cover?',
    a: 'We are based in Rangpuri, New Delhi and cover all of Delhi NCR — Gurugram, Noida, Ghaziabad and Faridabad — plus the whole of Rajasthan including Jaipur, Jodhpur, Udaipur, Jaisalmer, Bikaner, Pushkar and the Shekhawati belt. We also run outstation trips to Agra, Mathura, Haridwar, Rishikesh, Shimla, Manali, Chandigarh, Amritsar and beyond.',
  },
]

export const whyUs = [
  {
    icon: 'shield',
    title: 'Fixed Price, Written Upfront',
    text: 'You get a written quote before departure and the final bill matches it. Tolls and parking are itemised at actuals — never marked up, never bundled.',
  },
  {
    icon: 'clock',
    title: 'Available 24×7',
    text: 'Bookings, changes and support round the clock, including festivals. A 4 AM airport run gets the same attention as a ten-day tour.',
  },
  {
    icon: 'sparkle',
    title: 'Genuinely Clean Vehicles',
    text: 'Every vehicle is washed, vacuumed and sanitised before handover, and serviced on schedule. No worn seats, no lingering smell, no surprises.',
  },
  {
    icon: 'user',
    title: 'Local Drivers Who Know Rajasthan',
    text: 'Our drivers are from the region, police-verified, in uniform, and know which gate, which timing and which route actually works.',
  },
  {
    icon: 'fleet',
    title: '60+ Vehicles, One Call',
    text: 'Hatchback to 45-seat Volvo coach in a single fleet. Whatever the group size changes to, we can cover it without sending you elsewhere.',
  },
  {
    icon: 'star',
    title: `${yearsActive} Years, 25,000+ Trips`,
    // Read from `site.rating`, never typed in: this must match the Google
    // Business Profile, and a hand-written figure here had drifted from it.
    text: `Operating since ${site.founded} with a ${site.rating.value}-star Google rating. Most of our work now comes from repeat customers and referrals.`,
  },
]

/**
 * Gallery. Freely licensed photographs of the places we drive to and the
 * vehicle models we run, credited on /image-credits — not yet pictures from
 * our own trips, and the gallery page says so. Add the business's own
 * photographs here as they come in.
 */
export const galleryItems = [
  { title: 'Amber Fort, Jaipur', category: 'Destinations', src: '/images/places/amber-fort-hill.jpg' },
  { title: 'Taj Mahal, Agra', category: 'Destinations', src: '/images/places/taj-mahal.jpg' },
  { title: 'Sam Sand Dunes, Jaisalmer', category: 'Destinations', src: '/images/places/sam-sand-dunes.jpg' },
  { title: 'Lake Pichola, Udaipur', category: 'Destinations', src: '/images/places/lake-pichola.jpg' },
  { title: 'The Blue City, Jodhpur', category: 'Destinations', src: '/images/places/jodhpur-blue-city.jpg' },
  { title: 'Painted Havelis, Mandawa', category: 'Destinations', src: '/images/places/mandawa-painted-gate.jpg' },
  { title: 'Hawa Mahal, Jaipur', category: 'Destinations', src: '/images/places/hawa-mahal.jpg' },
  { title: 'Jaisalmer Fort', category: 'Destinations', src: '/images/places/jaisalmer-fort.jpg' },
  { title: 'Khatu Shyam Ji Temple', category: 'Destinations', src: '/images/places/khatu-shyam-temple.jpg' },
  { title: 'India Gate, New Delhi', category: 'Destinations', src: '/images/places/india-gate.jpg' },
  { title: 'Toyota Innova Crysta', category: 'Fleet', src: '/images/fleet/toyota-innova-crysta.jpg' },
  { title: 'Force Tempo Traveller', category: 'Fleet', src: '/images/fleet/force-tempo-traveller-12.jpg' },
  { title: 'Luxury Tempo Traveller', category: 'Fleet', src: '/images/fleet/luxury-tempo-traveller-maharaja.jpg' },
  { title: '21-Seater Mini Bus', category: 'Fleet', src: '/images/fleet/mini-bus-21-seater.jpg' },
  { title: 'Volvo 45-Seater Coach', category: 'Fleet', src: '/images/fleet/volvo-luxury-coach-45.jpg' },
  { title: 'Mercedes-Benz E-Class', category: 'Fleet', src: '/images/fleet/mercedes-benz-e-class.jpg' },
  { title: 'Toyota Fortuner', category: 'Fleet', src: '/images/fleet/toyota-fortuner.jpg' },
  { title: 'Maruti Suzuki Dzire', category: 'Fleet', src: '/images/fleet/maruti-suzuki-swift-dzire.jpg' },
]

export const milestones = [
  { year: '2012', title: 'Started with two cars', text: 'Rupesh Singh began with a single Indica and a borrowed Sumo, running Delhi–Jaipur drops.' },
  { year: '2015', title: 'First tempo travellers', text: 'Added two 12-seat tempo travellers as families started asking for group vehicles for temple circuits.' },
  { year: '2018', title: 'Buses and corporate contracts', text: 'Signed our first monthly corporate shuttle contract and put three mini buses on the road.' },
  { year: '2021', title: 'Luxury fleet added', text: 'Introduced the Fortuner, Mercedes E-Class and Maharaja luxury tempo traveller for weddings and VIP movement.' },
  { year: '2026', title: '60+ vehicles, all-India permits', text: 'Today we run a 60-vehicle fleet with all-India tourist permits and a 24×7 booking desk.' },
]
