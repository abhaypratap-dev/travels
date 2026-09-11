/**
 * Dedicated landing pages for the four vehicle categories customers actually
 * search for: "4 seater car rental", "7 seater suv on rent", "tempo traveller
 * on rent", "mini bus on rent". Each entry drives one prerendered route with
 * its own title, description, schema, rate card and FAQ block.
 *
 * `fleetSlugs` cross-references src/data/fleet.js so a vehicle's specs and
 * rates are never duplicated — the page pulls them live.
 */

export const vehicleTypes = [
  {
    slug: '4-seater-car-rental',
    key: 'sedan4',
    icon: 'fleet',
    tone: 'indigo',
    navLabel: '4 Seater Car',
    image: '/images/fleet/maruti-suzuki-swift-dzire.jpg',
    eyebrow: '4 + 1 seater · Sedan & hatchback',
    h1: '4 Seater Car Rental in Delhi',
    heroTitle: '4 Seater Car on Rent',
    heroAccent: 'with Driver in Delhi NCR',
    metaTitle: '4 Seater Car Rental in Delhi with Driver',
    metaDescription:
      'Book a 4 seater car on rent in Delhi NCR with driver — Dzire, Amaze and Swift from ₹11/km. IGI airport transfers and outstation drops at fixed rates.',
    keywords:
      '4 seater car rental Delhi, dzire on rent Delhi, swift car rental with driver, 4 seater taxi Delhi NCR, sedan car hire Rangpuri, airport taxi 4 seater Delhi, car on rent Mahipalpur',
    summary:
      'The everyday workhorse. A 4 seater sedan or hatchback with a driver is the most economical way for a couple, a small family or a pair of colleagues to move around Delhi NCR — and the sensible pick for an airport run at 4 AM.',
    seats: '4 passengers + driver',
    luggage: '2 medium suitcases + 1 cabin bag',
    fromRatePerKm: 11,
    fromRatePerDay: 1900,
    localPackage: '₹1,800 for 8 hrs / 80 km',
    airportRate: '₹1,100 onwards from IGI to Delhi NCR',
    fleetSlugs: ['maruti-suzuki-swift-dzire', 'honda-amaze', 'maruti-suzuki-swift'],
    bestFor: [
      'IGI Airport pickup and drop, day or night',
      'Delhi → Agra or Delhi → Jaipur one-way drops',
      'Full-day city sightseeing on an 8 hr / 80 km package',
      'Corporate guest transfers and office visits',
      'Hospital visits and station runs for elderly parents',
    ],
    included: [
      'Fuel and an experienced, police-verified driver',
      'Comprehensive insurance and current fitness certificate',
      'Working AC, charging point and clean interiors',
      'Bottled water on airport pickups',
      '60 minutes of free waiting on flight arrivals',
    ],
    excluded: [
      'Toll tax, state permits and parking — billed at actuals with receipts',
      'Driver night allowance of ₹300 when a trip runs past 10 PM',
      'Any interstate entry tax, charged exactly as levied',
    ],
    routes: [
      { to: 'IGI Airport T1 / T2 / T3', note: 'From ₹1,100 · 30–45 min from our Rangpuri office' },
      { to: 'Agra (Taj Mahal)', note: 'Same-day return · Yamuna Expressway' },
      { to: 'Jaipur', note: '5½ hrs via NH-48 · one-way drop available' },
      { to: 'Haridwar & Rishikesh', note: 'Popular weekend run from Delhi' },
      { to: 'Mathura & Vrindavan', note: 'Day trip with darshan timings planned in' },
      { to: 'Chandigarh', note: 'One-way drop on the Delhi–Chandigarh corridor' },
    ],
    faqs: [
      {
        q: 'How many people can actually sit in a 4 seater car?',
        a: 'Four passengers plus the driver, comfortably. Two adults in front is not permitted, so the honest capacity is one passenger in front and three across the back seat. If three adults in the back sounds tight for a long highway run, step up to a 7 seater SUV — the extra cost per kilometre is small.',
      },
      {
        q: 'What is the cheapest 4 seater car you have?',
        a: 'The Maruti Suzuki Swift at ₹11 per kilometre, or ₹1,900 per day with a 250 km minimum. The Swift Dzire at ₹12 per kilometre is the more common choice because the boot takes two full-size suitcases instead of one.',
      },
      {
        q: 'Can I get a 4 seater car for an IGI Airport pickup at night?',
        a: 'Yes — our office is in Rangpuri, roughly 3 km from Terminal 3, so night airport pickups are our most frequent booking. We track your flight number and adjust the pickup for delays automatically, and the driver waits at the arrival gate with a name placard.',
      },
      {
        q: 'Is the 4 seater available with automatic transmission?',
        a: 'The Honda Amaze in our fleet is automatic. Tell us at the time of booking and we will hold one for you — automatics are a smaller part of the fleet, so a day of notice helps.',
      },
      {
        q: 'Do you charge extra for luggage in a 4 seater?',
        a: 'No. Two medium suitcases and a cabin bag fit in the boot at no extra charge. If you are carrying more than that, we will suggest an SUV rather than let you arrive at the pickup and discover it does not fit.',
      },
    ],
  },

  {
    slug: '7-seater-suv-on-rent',
    key: 'suv7',
    icon: 'fleet',
    tone: 'forest',
    navLabel: 'SUV 7 Seater',
    image: '/images/fleet/toyota-innova-crysta.jpg',
    eyebrow: '6 + 1 / 7 seater · SUV & MUV',
    h1: 'SUV 7 Seater on Rent in Delhi',
    heroTitle: '7 Seater SUV on Rent',
    heroAccent: 'Innova, Ertiga & Scorpio with Driver',
    metaTitle: 'SUV 7 Seater on Rent in Delhi — Innova Crysta',
    metaDescription:
      'Hire a 7 seater SUV in Delhi with driver — Innova Crysta, Ertiga, Scorpio-N and Fortuner from ₹15/km. Captain seats, rear AC and real luggage space.',
    keywords:
      '7 seater SUV on rent Delhi, innova crysta rental Delhi, ertiga on rent with driver, scorpio car rental Delhi NCR, 7 seater taxi Delhi, MUV hire New Delhi, fortuner on rent Delhi',
    summary:
      'When four seats stop being enough. A 7 seater SUV gives a family three rows, a boot that swallows real luggage and a ride that stays composed over 500 km of highway — which is why it is the vehicle most often booked for a multi-day tour.',
    seats: '6–7 passengers + driver',
    luggage: '3–4 large suitcases',
    fromRatePerKm: 15,
    fromRatePerDay: 3200,
    localPackage: '₹2,800 for 8 hrs / 80 km',
    airportRate: '₹1,600 onwards from IGI to Delhi NCR',
    fleetSlugs: [
      'toyota-innova-crysta',
      'maruti-suzuki-ertiga',
      'mahindra-scorpio-n',
      'toyota-fortuner',
    ],
    bestFor: [
      'Family holidays of five to seven people with full luggage',
      'Golden Triangle and multi-day Rajasthan circuits',
      'Airport transfers where the group has four or more suitcases',
      'Hill routes to Shimla, Manali, Mussoorie and Nainital',
      'Executive travel and wedding guest movement',
    ],
    included: [
      'Fuel, driver and highway-experienced route knowledge',
      'Rear AC vents so the third row is not an afterthought',
      'Comprehensive insurance and all-India tourist permit',
      'Roof carrier fitted free on request for extra luggage',
      'Bottled water and phone charging for every row',
    ],
    excluded: [
      'Toll tax, state permits and parking — billed at actuals',
      'Driver night allowance of ₹350–₹600 depending on the vehicle',
      'Hill-station permits where the state levies them',
    ],
    routes: [
      { to: 'Golden Triangle — Delhi · Agra · Jaipur', note: '5 days, the most-booked SUV itinerary' },
      { to: 'Shimla & Manali', note: '7 seater with high clearance for hill roads' },
      { to: 'Jaipur & Pushkar', note: 'Weekend circuit with an Ajmer stop' },
      { to: 'Rishikesh & Haridwar', note: 'Family darshan trip with luggage space' },
      { to: 'Khatu Shyam Ji & Salasar Balaji', note: 'Overnight darshan run into Shekhawati' },
      { to: 'Jim Corbett & Nainital', note: 'Uttarakhand routes where clearance matters' },
    ],
    faqs: [
      {
        q: 'Is an Innova Crysta really a 7 seater?',
        a: 'The Innova Crysta is registered as a 7+1. In practice we recommend it for six passengers plus luggage on a long trip — with seven adults on board, the boot space behind the third row takes about two bags. For seven passengers with full luggage, a tempo traveller is the more honest answer.',
      },
      {
        q: 'What is the difference between the Ertiga and the Innova Crysta?',
        a: 'The Ertiga is lighter, runs on CNG and costs ₹15 per kilometre — excellent for city work and short outstation trips. The Innova Crysta at ₹19 per kilometre has captain seats, a stronger diesel engine and far more composure over 400+ km days. For anything beyond two days on the highway, the Innova earns the difference.',
      },
      {
        q: 'Which 7 seater is best for hill stations?',
        a: 'The Mahindra Scorpio-N. Its ground clearance and torque handle the gradients to Manali, Mussoorie and Mount Abu far better than a low-slung MUV, and our hill drivers request it by name.',
      },
      {
        q: 'Do you have a luxury 7 seater SUV?',
        a: 'Yes — the Toyota Fortuner, kept in showroom condition and booked most often for weddings, film shoots and VIP movement. It is an automatic with leather upholstery and seats six comfortably.',
      },
      {
        q: 'How much does a 7 seater SUV cost per day in Delhi?',
        a: 'From ₹3,200 per day for the Ertiga, ₹4,200 for the Innova Crysta and ₹8,500 for the Fortuner, each with a 250 km per day minimum. Local city use is ₹2,800 for an 8 hr / 80 km package. Every rate is confirmed in writing before you travel.',
      },
    ],
  },

  {
    slug: 'tempo-traveller-on-rent',
    key: 'tempo',
    icon: 'bus',
    tone: 'plum',
    navLabel: 'Tempo Traveller',
    image: '/images/fleet/force-tempo-traveller-12.jpg',
    eyebrow: '9 · 12 · 17 seater · Force Traveller',
    h1: 'Tempo Traveller on Rent in Delhi',
    heroTitle: 'Tempo Traveller on Rent',
    heroAccent: '9, 12 & 17 Seater with Driver',
    metaTitle: 'Tempo Traveller on Rent in Delhi — 12 Seater',
    metaDescription:
      'Tempo traveller on rent in Delhi from ₹26/km — 9, 12 and 17 seaters with push-back seats, dual AC and roof carrier. Ideal for groups and yatras.',
    keywords:
      'tempo traveller on rent Delhi, 12 seater tempo traveller price Delhi, 17 seater tempo traveller hire, luxury tempo traveller Delhi NCR, force traveller rental New Delhi, tempo traveller Mahipalpur, group travel vehicle Delhi',
    summary:
      'The vehicle that keeps a group together. One tempo traveller replaces three cars, so nobody gets separated at a highway dhaba, the luggage rides with its owner, and the whole party arrives at the same time.',
    seats: '9, 12 or 17 passengers + driver',
    luggage: '6–12 large suitcases plus roof carrier',
    fromRatePerKm: 26,
    fromRatePerDay: 6500,
    localPackage: '₹5,500 for 8 hrs / 80 km (12 seater)',
    airportRate: '₹3,200 onwards from IGI to Delhi NCR',
    fleetSlugs: [
      'force-tempo-traveller-12',
      'force-tempo-traveller-17',
      'luxury-tempo-traveller-maharaja',
    ],
    bestFor: [
      'Extended families travelling together on one itinerary',
      'Office outings, team offsites and conference transfers',
      'Temple yatras — Khatu Shyam, Salasar, Char Dham, Vaishno Devi',
      'Wedding guest movement between hotel and venue',
      'School and college educational trips',
    ],
    included: [
      'Push-back reclining seats with individual reading lights',
      'Dual AC blowers so the rear rows actually stay cool',
      'Roof carrier and a separate luggage bay',
      'Music system, curtains and LED cabin lighting',
      'Driver holding a valid heavy-vehicle licence and route experience',
    ],
    excluded: [
      'Toll tax, state permits and parking — billed at actuals',
      'Driver night allowance of ₹500 per night',
      'A second driver on continuous overnight journeys, if you want one',
    ],
    routes: [
      { to: 'Khatu Shyam Ji & Salasar Balaji', note: 'Our most-booked tempo traveller yatra' },
      { to: 'Vaishno Devi (Katra)', note: 'Overnight run with two drivers on request' },
      { to: 'Char Dham & Haridwar circuit', note: 'Multi-day, hill-experienced drivers' },
      { to: 'Jaipur, Pushkar & Ajmer', note: 'Classic Rajasthan group circuit' },
      { to: 'Agra & Mathura', note: 'Same-day group trip on the Expressway' },
      { to: 'Shimla, Manali & Dharamshala', note: '12 seater recommended over 17 on hill roads' },
    ],
    faqs: [
      {
        q: 'What is the price of a 12 seater tempo traveller in Delhi?',
        a: 'From ₹26 per kilometre, or ₹6,500 per day with a 250 km per day minimum. A local 8 hr / 80 km package inside Delhi NCR is ₹5,500. Toll, parking and a ₹500 driver night allowance are additional and billed at actuals.',
      },
      {
        q: 'What is the difference between a 12 seater and a 17 seater tempo traveller?',
        a: 'The wheelbase. A 17+1 is a longer body with five more push-back seats and a bigger luggage bay, at ₹30 per kilometre. On narrow hill roads and inside old-city lanes the 12 seater manoeuvres noticeably better, so for Shimla, Manali or Rishikesh we usually recommend the 12 even for a group of fourteen.',
      },
      {
        q: 'Do you have a luxury tempo traveller?',
        a: 'Yes — the 9+1 Maharaja, with nine recliner sofa seats, a centre table, a mini fridge, an LED TV and ambient lighting, at ₹38 per kilometre. It is built for long desert circuits where the journey should be as comfortable as the hotel.',
      },
      {
        q: 'Is the tempo traveller AC and does it work in summer?',
        a: 'All our tempo travellers are AC with dual blowers — one servicing the front rows, one the rear. This matters in June on the Delhi–Jaisalmer stretch, where a single-blower vehicle leaves the back three rows warm. AC is serviced before every summer outstation booking.',
      },
      {
        q: 'Can 17 people plus luggage really fit in a 17 seater?',
        a: 'Seventeen passengers, yes. Seventeen passengers with seventeen large suitcases, no — that is what the roof carrier is for, and it is fitted free on request. If the group is carrying heavy luggage for a week-long trip, we will tell you honestly that a mini bus is the better vehicle.',
      },
    ],
  },

  {
    slug: 'mini-bus-on-rent',
    key: 'minibus',
    icon: 'bus',
    tone: 'rose',
    navLabel: 'Mini Bus',
    image: '/images/fleet/mini-bus-21-seater.jpg',
    eyebrow: '21 · 26 · 32 · 45 seater · Bus & coach',
    h1: 'Mini Bus on Rent in Delhi',
    heroTitle: 'Mini Bus on Rent',
    heroAccent: '21, 32 & 45 Seater Coaches',
    metaTitle: 'Mini Bus on Rent in Delhi — 21 to 45 Seater',
    metaDescription:
      'Mini bus on rent in Delhi from ₹30/km — 21, 26, 32 and 45 seater buses, AC and non-AC, with luggage bays. Weddings, school and corporate trips.',
    keywords:
      'mini bus on rent Delhi, 21 seater bus hire Delhi NCR, 32 seater mini bus rental, 45 seater volvo bus rental Delhi, bus hire for wedding Delhi, school bus rental New Delhi, coach hire Mahipalpur',
    summary:
      'For when the whole party moves at once. A single mini bus carries a baraat, a school excursion or an entire department in one trip, with a proper luggage bay underneath and a microphone at the front for the guide.',
    seats: '21, 26, 32 or 45 passengers + driver',
    luggage: '15–40 bags in a dedicated luggage bay',
    fromRatePerKm: 30,
    fromRatePerDay: 9000,
    localPackage: '₹8,500 for 8 hrs / 80 km (21 seater)',
    airportRate: '₹5,500 onwards from IGI to Delhi NCR',
    fleetSlugs: [
      'mini-bus-21-seater',
      'traveller-non-ac-26',
      'mini-bus-32-seater',
      'volvo-luxury-coach-45',
    ],
    bestFor: [
      'Weddings — baraat movement and guest shuttles between venues',
      'School and college excursions with a teacher-in-charge',
      'Corporate offsites, conferences and staff transport contracts',
      'Temple committee and pilgrimage group yatras',
      'Airport shuttles for large arriving delegations',
    ],
    included: [
      'Cushioned seats in two-by-two configuration',
      'Public address system with a microphone at the front',
      'Under-floor luggage bay on 32 and 45 seaters',
      'Emergency exit, first-aid kit and fire extinguisher',
      'Two drivers as standard on overnight coach journeys',
    ],
    excluded: [
      'Toll tax, state permits and parking — billed at actuals',
      'Driver night allowance of ₹600–₹900 depending on the vehicle',
      'Decoration for wedding vehicles, arranged at cost on request',
    ],
    routes: [
      { to: 'Delhi NCR wedding venues', note: 'Multi-day guest shuttles, one coordinator on call' },
      { to: 'Agra & Mathura', note: 'School excursion favourite on the Expressway' },
      { to: 'Haridwar & Rishikesh', note: 'Temple committee group yatras' },
      { to: 'Jaipur & Ajmer', note: '45 seater Volvo for large tour groups' },
      { to: 'Chandigarh & Amritsar', note: 'Overnight coach with two drivers' },
      { to: 'Corporate offsites in NCR', note: 'Monthly rate contracts with GST invoicing' },
    ],
    faqs: [
      {
        q: 'How much does a mini bus cost per day in Delhi?',
        a: 'From ₹9,000 per day for a 26 seater non-AC, ₹11,000 for a 21 seater AC, ₹14,500 for a 32 seater and ₹26,000 for a 45 seater Volvo coach. Each carries a 250 km per day minimum, or 300 km for the large coaches. Local 8 hr / 80 km packages start at ₹8,500.',
      },
      {
        q: 'Do you have non-AC buses?',
        a: 'Yes. Our 21, 32 and 45 seaters are available in AC and non-AC variants, and we keep a dedicated 26 seat non-AC deluxe bus for winter travel and local functions where budget matters more than climate control.',
      },
      {
        q: 'Can you handle a full wedding — several buses across two days?',
        a: 'That is a routine booking for us. We regularly run three to five vehicles across a two-day function, with one coordinator reachable on a single number for the entire event so you are not calling five drivers individually.',
      },
      {
        q: 'Are your buses permitted for interstate travel?',
        a: 'Every bus in our fleet carries an all-India tourist permit, a current fitness certificate and comprehensive insurance. State entry permits for the specific route are arranged by us and billed at exactly what the state levies, with the receipt attached to your invoice.',
      },
      {
        q: 'Is there a bus with a washroom on board?',
        a: 'Our 45 seater Volvo coach can be supplied with an onboard washroom on request, subject to availability. Tell us at the time of enquiry — it is a specific configuration and we need notice to hold one.',
      },
    ],
  },
]

export const getVehicleType = (slug) => vehicleTypes.find((v) => v.slug === slug)
