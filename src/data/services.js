export const services = [
  {
    slug: 'outstation-taxi',
    icon: 'road',
    guide: '/outstation-taxi-service-delhi',
    title: 'Outstation Taxi Service',
    short: 'One-way and round-trip cabs to any city in India, billed transparently.',
    body:
      'Book a cab from New Delhi, Gurugram, Noida or anywhere in NCR to any destination in India. Choose one-way drop or a round trip with the vehicle staying with you. Toll, parking and state permits are itemised on your bill — never bundled into a vague "extra".',
    points: [
      'One-way drop rates with no return fare',
      'Round trip with vehicle at your disposal',
      'Transparent toll, parking and permit billing',
      'Night driving allowance stated upfront',
    ],
  },
  {
    slug: 'airport-railway-transfer',
    icon: 'plane',
    guide: '/airport-taxi-igi-mahipalpur',
    title: 'Airport & Railway Transfers',
    short: 'Flight-tracked pickups at IGI Delhi, Jaipur and Jodhpur airports.',
    body:
      'We track your flight or train number and adjust the pickup automatically for delays. The driver waits at the arrival gate with a name placard, and 60 minutes of complimentary waiting is included on every airport pickup.',
    points: [
      'Live flight and train tracking',
      'Meet-and-greet with name placard',
      '60 minutes free waiting on arrivals',
      'Fixed fare, no surge pricing ever',
    ],
  },
  {
    slug: 'wedding-car-rental',
    icon: 'heart',
    title: 'Wedding Car & Baraat Bus Hire',
    short: 'Decorated luxury cars for the couple, buses for the whole baraat.',
    body:
      'From a flower-decorated Fortuner or Mercedes for the couple to a fleet of mini buses moving 200 guests between venue and hotel, we handle wedding logistics end to end. One coordinator stays reachable through the entire function.',
    points: [
      'Decorated luxury cars for the couple',
      'Mini buses and coaches for guest movement',
      'Dedicated coordinator for the full function',
      'Multi-day packages for destination weddings',
    ],
  },
  {
    slug: 'corporate-car-rental',
    icon: 'briefcase',
    guide: '/corporate-travel-delhi',
    title: 'Corporate Car Rental',
    short: 'Monthly contracts, employee shuttles and executive chauffeur service.',
    body:
      'Monthly and annual contracts for company transport — employee pickup and drop shuttles, executive cars on retainer and event transfers. Consolidated GST invoicing, duty slips for every trip and a named account manager.',
    points: [
      'Monthly & annual rate contracts',
      'Employee shuttle routes on mini buses',
      'GST invoicing with duty slips',
      'Background-verified, uniformed drivers',
    ],
  },
  {
    slug: 'tempo-traveller-bus-hire',
    icon: 'bus',
    guide: '/tempo-traveller-on-rent',
    title: 'Tempo Traveller & Bus Hire',
    short: '9 to 45 seaters for groups, tours, schools and pilgrimages.',
    body:
      'Our group fleet runs from a 9-seat luxury tempo traveller up to a 45-seat Volvo coach. All commercially permitted, fitness-certified and fully insured, with drivers holding valid heavy-vehicle licences and route experience.',
    points: [
      '9, 12, 17, 21, 26, 32 and 45 seat options',
      'AC and non-AC variants',
      'All-India tourist permits',
      'Two drivers on overnight journeys',
    ],
  },
  {
    slug: 'pilgrimage-tours',
    icon: 'temple',
    title: 'Pilgrimage & Yatra Tours',
    short: 'Khatu Shyam, Salasar, Char Dham, Vaishno Devi and more.',
    body:
      'We run the Shekhawati temple circuit daily and take groups on longer yatras to Char Dham, Vaishno Devi, Haridwar and the Jyotirlingas. Drivers know the aarti timings, parking realities and shortest darshan queues.',
    points: [
      'Daily Khatu Shyam & Salasar Balaji trips',
      'Char Dham and Vaishno Devi yatra packages',
      'Group buses for temple committees',
      'Itineraries built around aarti timings',
    ],
  },
  {
    slug: 'self-drive-and-monthly-rental',
    icon: 'key',
    title: 'Monthly & Long-Term Rental',
    short: 'Cars and vans on monthly hire for families and businesses.',
    body:
      'Need a vehicle for a month or a season? Long-term rental with driver included, servicing and insurance handled by us. Popular with visiting families, project teams and film units shooting across Rajasthan.',
    points: [
      'Monthly packages with driver included',
      'Maintenance and insurance on us',
      'Replacement vehicle if yours goes in for service',
      'Discounted rates beyond 30 days',
    ],
  },
  {
    slug: 'sightseeing-local-tours',
    icon: 'camera',
    title: 'Local Sightseeing Packages',
    short: '8 hr / 80 km city packages with a driver who knows the route.',
    body:
      'Fixed-price local packages in Jaipur, Jodhpur, Udaipur, Bikaner and Jaisalmer. The standard slab is 8 hours and 80 km, with clear per-hour and per-km rates beyond that — so an extra stop never turns into a surprise.',
    points: [
      '8 hr / 80 km standard city package',
      '4 hr / 40 km half-day option',
      'Clear extra-hour and extra-km rates',
      'Guide arranged on request',
    ],
  },
]

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug)
