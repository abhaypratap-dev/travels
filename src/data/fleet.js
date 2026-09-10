/**
 * Fleet catalogue.
 * `image` is optional — drop a photo in /public/images and set the path
 * (e.g. '/images/innova-crysta.jpg'). Cards fall back to a styled
 * illustration when no photo is supplied, so the site never looks broken.
 */

export const fleetCategories = [
  { id: 'all', label: 'All Vehicles' },
  { id: 'hatchback', label: 'Hatchback' },
  { id: 'sedan', label: 'Sedan' },
  { id: 'suv', label: 'SUV / MUV' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'tempo', label: 'Tempo Traveller' },
  { id: 'bus', label: 'Mini Bus & Coach' },
]

export const fleet = [
  {
    slug: 'maruti-suzuki-swift-dzire',
    name: 'Maruti Suzuki Dzire',
    category: 'sedan',
    seats: 4,
    luggage: 2,
    ac: true,
    transmission: 'Manual',
    fuel: 'CNG / Petrol',
    ratePerKm: 12,
    ratePerDay: 2200,
    minKm: 250,
    driverAllowance: 300,
    image: '/images/vehicle-sedan.svg',
        parentType: '4-seater-car-rental',
        tagline: 'The default airport car in Delhi',
        detail:
      'If you have taken a taxi from IGI Airport in the last decade, it was probably a Dzire. There is a reason the whole industry standardised on it: the boot genuinely takes two large suitcases, the rear bench seats three adults without anyone volunteering to sit sideways, and the CNG variant keeps the running cost low enough that we can quote ₹12 a kilometre and still service the car properly. Ours are replaced every four years and run on CNG in the city, petrol on the highway.',
        useCases: [
      'IGI Airport pickup and drop at any hour',
      'Delhi to Agra or Jaipur one-way drops',
      'Full-day city sightseeing on 8 hr / 80 km',
      'Corporate guest and vendor transfers'
    ],
        faqs: [
      {
        q: 'How much luggage fits in a Swift Dzire?',
        a:
            'Two large suitcases in the boot plus one cabin bag on the front passenger footwell, with four passengers seated. If you are carrying three large suitcases, take the Ertiga or an Innova Crysta instead — we would rather tell you now than have you discover it at the kerb.'
      },
      {
        q: 'Is the Dzire available in CNG?',
        a:
            'Most of our Dzires are CNG-petrol dual fuel, which is what keeps the rate at ₹12 per kilometre. CNG cylinders sit under the boot floor, so boot space is slightly reduced compared with a petrol-only car — still enough for two large suitcases.'
      },
      {
        q: 'What does a Dzire cost for a Delhi to Jaipur drop?',
        a:
            'A one-way Delhi–Jaipur drop in a Dzire is roughly 280 km, so about ₹3,400 plus toll and state permit at actuals. A same-day return is charged as a round trip. Call us with your exact pickup point for a fixed written quote.'
      }
    ],
    badge: 'Most Booked',
    summary:
      'The workhorse of Indian city travel. Comfortable for a family of four with excellent mileage — the smart pick for airport runs and short outstation trips.',
    features: ['Push-button AC', 'Music system', 'Charging point', 'Clean interiors', 'First-aid kit'],
    bestFor: 'IGI airport transfers, city tours, Delhi–Jaipur runs',
  },
  {
    slug: 'honda-amaze',
    name: 'Honda Amaze',
    category: 'sedan',
    seats: 4,
    luggage: 2,
    ac: true,
    transmission: 'Automatic',
    fuel: 'Petrol',
    ratePerKm: 14,
    ratePerDay: 2600,
    minKm: 250,
    driverAllowance: 300,
    image: '/images/vehicle-sedan.svg',
        parentType: '4-seater-car-rental',
        tagline: 'The quiet one, and an automatic',
        detail:
      'The Amaze is what we send when the passenger is a client rather than a colleague. It is noticeably quieter than a Dzire at highway speed, the rear seat has more knee room, and ours are automatics — which matters more than people expect on a Delhi–Gurugram run in traffic, because a driver who is not working a clutch for ninety minutes arrives less tired. Rear AC vents mean the back seat cools as fast as the front.',
        useCases: [
      'Corporate guest pickups and client movement',
      'Airport transfers where comfort matters more than price',
      'Long city days in stop-start traffic',
      'Elderly passengers who find SUVs hard to climb into'
    ],
        faqs: [
      {
        q: 'Is the Honda Amaze automatic?',
        a:
            'Yes — the Amazes in our fleet are automatics. They are a smaller part of the fleet than the manual Dzires, so a day of notice helps us hold one for you.'
      },
      {
        q: 'How is the Amaze different from a Dzire?',
        a:
            'Same seating capacity and similar boot, but the Amaze is quieter at speed, has more rear knee room and rear AC vents, and is an automatic. It costs ₹14 per kilometre against the Dzire’s ₹12. For a short airport run the Dzire is the sensible choice; for a full day with a client in the back, the Amaze earns the difference.'
      },
      {
        q: 'Does the Amaze have rear AC vents?',
        a:
            'It does. On a June afternoon in Delhi that is the difference between a comfortable back seat and a passenger who arrives irritated.'
      }
    ],
    summary:
      'A step up in cabin quietness and ride comfort. Popular with corporate guests who want a sedan that feels a little more premium without the luxury price tag.',
    features: ['Automatic transmission', 'Rear AC vents', 'Spacious boot', 'Bluetooth audio'],
    bestFor: 'Corporate travel, guest pickups',
  },
  {
    slug: 'maruti-suzuki-swift',
    name: 'Maruti Suzuki Swift',
    category: 'hatchback',
    seats: 4,
    luggage: 1,
    ac: true,
    transmission: 'Manual',
    fuel: 'Petrol',
    ratePerKm: 11,
    ratePerDay: 1900,
    minKm: 250,
    driverAllowance: 300,
    image: '/images/vehicle-hatchback.svg',
        parentType: '4-seater-car-rental',
        tagline: 'Our most affordable car with a driver',
        detail:
      'The Swift is the answer when the trip is short, the group is two or three, and the priority is cost. It is small enough to get down the lanes of Old Delhi and Chandni Chowk where a sedan has to stop and let you walk, and its mileage is the best in our fleet, which is why it carries our lowest per-kilometre rate. The trade-off is honest: the boot takes one large suitcase, not two.',
        useCases: [
      'Couples and solo travellers on a budget',
      'Local sightseeing in congested old-city areas',
      'Short intercity hops under 200 km',
      'Day-long errands and hospital or station runs'
    ],
        faqs: [
      {
        q: 'What is the cheapest car you have with a driver?',
        a:
            'The Maruti Suzuki Swift at ₹11 per kilometre, or ₹1,900 per day with a 250 km daily minimum. It is the lowest rate in our fleet and includes fuel and the driver.'
      },
      {
        q: 'How much luggage fits in a Swift?',
        a:
            'One large suitcase in the boot plus two cabin bags in the cabin, with three passengers. With four passengers and luggage, step up to a Dzire — the extra ₹1 per kilometre buys you a boot that actually closes.'
      },
      {
        q: 'Is a Swift suitable for a long outstation trip?',
        a:
            'It is fine up to about 300 km in a day with two or three passengers. Beyond that, or with four adults, we would recommend a Dzire or an Ertiga for the extra room — you will feel the difference by hour four.'
      }
    ],
    badge: 'Budget Friendly',
    summary:
      'Nimble, economical and easy through narrow old-city lanes. Our most affordable option for couples and solo travellers.',
    features: ['Compact & agile', 'Best-in-class mileage', 'AC', 'Ideal for city runs'],
    bestFor: 'Local sightseeing, budget trips',
  },
  {
    slug: 'toyota-innova-crysta',
    name: 'Toyota Innova Crysta',
    category: 'suv',
    seats: 6,
    luggage: 4,
    ac: true,
    transmission: 'Manual',
    fuel: 'Diesel',
    ratePerKm: 19,
    ratePerDay: 4200,
    minKm: 250,
    driverAllowance: 400,
    image: '/images/vehicle-suv.svg',
        parentType: '7-seater-suv-on-rent',
        tagline: 'The gold standard for Indian highway travel',
        detail:
      'More multi-day tours leave our yard in an Innova Crysta than in anything else, and it is not close. The captain seats in the middle row mean two passengers can actually sleep on a 400 km day; the diesel engine pulls without protest fully loaded; and the suspension stays composed over the patched stretches that make lighter MUVs feel unsettled. It is the vehicle our own drivers ask for when they are given a choice of a week-long Rajasthan circuit.',
        useCases: [
      'Multi-day Rajasthan and Golden Triangle circuits',
      'Families of five or six with full luggage',
      'Hill routes to Shimla, Mussoorie and Nainital',
      'Executive travel where arrival matters'
    ],
        faqs: [
      {
        q: 'Does the Innova Crysta have captain seats?',
        a:
            'Yes — the middle row is two individual captain seats with armrests, which is what makes long days bearable. The third row is a bench for two.'
      },
      {
        q: 'Can six people travel comfortably in an Innova Crysta with luggage?',
        a:
            'Six passengers with four large suitcases, comfortably. Seven passengers with full luggage is a squeeze — the space behind the third row takes about two bags. For seven with luggage, take a tempo traveller.'
      },
      {
        q: 'What is the Innova Crysta rate per day?',
        a:
            '₹4,200 per day with a 250 km per day minimum, or ₹19 per kilometre on distance-based bookings. Driver night allowance of ₹400 applies on overnight trips. Toll, parking and state permits are billed at actuals.'
      }
    ],
    badge: 'Family Favourite',
    summary:
      'The gold standard for Indian highway travel. Captain seats, genuine luggage space and a ride that stays composed over long Rajasthan stretches.',
    features: ['Captain seats', 'Rear AC vents', 'Large boot', 'Reclining seats', 'Ample legroom'],
    bestFor: 'Family tours, multi-day Rajasthan circuits',
  },
  {
    slug: 'maruti-suzuki-ertiga',
    name: 'Maruti Suzuki Ertiga',
    category: 'suv',
    seats: 6,
    luggage: 3,
    ac: true,
    transmission: 'Manual',
    fuel: 'CNG / Petrol',
    ratePerKm: 15,
    ratePerDay: 3200,
    minKm: 250,
    driverAllowance: 350,
    image: '/images/vehicle-suv.svg',
        parentType: '7-seater-suv-on-rent',
        tagline: 'Seven seats without the Innova budget',
        detail:
      'The Ertiga solves a specific problem: you are six or seven people, the trip is two or three days, and an Innova would eat the budget. It runs on CNG, which is why we can quote ₹15 a kilometre for a seven-seater, and the third row genuinely folds flat when you would rather have luggage space than the last two seats. On city work and trips under 300 km a day it gives up very little to the Innova.',
        useCases: [
      'Extended families on temple and pilgrimage circuits',
      'Group airport transfers with moderate luggage',
      'Two- and three-day trips where budget matters',
      'City sightseeing for six or seven people'
    ],
        faqs: [
      {
        q: 'Is the Ertiga a genuine 7 seater?',
        a:
            'It is a 7+1 with the third row up, best suited to five adults and two children, or six adults on a shorter run. With all seven seats occupied the boot takes roughly two soft bags — fold one third-row seat down and you have proper luggage space for six.'
      },
      {
        q: 'Is the Ertiga CNG?',
        a:
            'Most of ours are CNG-petrol dual fuel. That is exactly why a seven-seater can be offered at ₹15 per kilometre. On long highway stretches the driver switches to petrol where CNG stations are sparse, at no extra charge to you.'
      },
      {
        q: 'Ertiga or Innova Crysta — which should I book?',
        a:
            'Under 300 km a day, or on a budget, take the Ertiga. Over four days on the highway, or with six adults and full luggage, the Innova Crysta’s captain seats and stronger engine are worth the extra ₹4 per kilometre. Tell us the route and we will say plainly which one fits.'
      }
    ],
    summary:
      'Seven-seater practicality at a sensible rate. A favourite for extended families who want space without stepping up to an Innova budget.',
    features: ['3-row seating', 'Rear AC', 'Foldable third row', 'Great mileage'],
    bestFor: 'Group of 5–6, temple tours',
  },
  {
    slug: 'mahindra-scorpio-n',
    name: 'Mahindra Scorpio-N',
    category: 'suv',
    seats: 6,
    luggage: 3,
    ac: true,
    transmission: 'Manual',
    fuel: 'Diesel',
    ratePerKm: 20,
    ratePerDay: 4500,
    minKm: 250,
    driverAllowance: 400,
    image: '/images/vehicle-suv.svg',
        parentType: '7-seater-suv-on-rent',
        tagline: 'For hill roads and rough approaches',
        detail:
      'Ground clearance is the entire argument for the Scorpio-N. On the gradients up to Manali, the broken approach roads into Shekhawati villages, and the last few kilometres to a desert camp, a low-slung MUV scrapes and struggles where the Scorpio simply goes. It is also the vehicle our hill drivers request by name, which is a recommendation worth more than any spec sheet.',
        useCases: [
      'Shimla, Manali, Mussoorie and Mount Abu hill routes',
      'Rural Shekhawati and village approach roads',
      'Monsoon travel on unpredictable surfaces',
      'Groups who want a commanding, high-set ride'
    ],
        faqs: [
      {
        q: 'Is the Scorpio-N good for hill stations?',
        a:
            'It is the vehicle we recommend for hills. High ground clearance and strong low-end torque make the climbs to Manali, Mussoorie and Mount Abu significantly less strained than in a low-slung MUV, and our hill drivers prefer it.'
      },
      {
        q: 'How many people fit in a Scorpio-N?',
        a:
            'Six passengers plus the driver in comfort, with three large suitcases. It is a 7-seater on paper, but for a multi-day hill trip we would book six and use the extra space for luggage.'
      },
      {
        q: 'Is the Scorpio-N a 4x4?',
        a:
            'Ours are rear-wheel-drive diesel variants with high ground clearance, which handles every route we run commercially. If you need genuine four-wheel drive for a specific expedition, tell us at enquiry and we will confirm what is available.'
      }
    ],
    summary:
      'Built for rough patches and desert approach roads. High ground clearance makes it the sensible choice for Shekhawati village routes and hill runs.',
    features: ['High ground clearance', 'Powerful diesel', 'Commanding view', 'Sturdy build'],
    bestFor: 'Rural Shekhawati, Mount Abu, rough terrain',
  },
  {
    slug: 'toyota-fortuner',
    name: 'Toyota Fortuner',
    category: 'luxury',
    seats: 6,
    luggage: 4,
    ac: true,
    transmission: 'Automatic',
    fuel: 'Diesel',
    ratePerKm: 32,
    ratePerDay: 8500,
    minKm: 250,
    driverAllowance: 600,
    image: '/images/vehicle-suv.svg',
        parentType: '7-seater-suv-on-rent',
        tagline: 'When arrival is part of the occasion',
        detail:
      'The Fortuner is booked for weddings, film shoots and VIP movement, and we keep it accordingly — showroom condition, replaced within three years, and never sent out without a wash and a cabin clean. It is an automatic with leather upholstery and a commanding ride height, and it photographs well, which for a wedding booking is not a trivial consideration.',
        useCases: [
      'Wedding cars for the couple and immediate family',
      'VIP and executive airport transfers',
      'Film and photo shoot vehicle hire',
      'Occasions where the vehicle is part of the impression'
    ],
        faqs: [
      {
        q: 'Can the Fortuner be decorated for a wedding?',
        a:
            'Yes. We arrange floral decoration at cost through our regular decorator, or your decorator can dress the car at the venue. Tell us at booking so the vehicle reaches early enough to be decorated without rushing.'
      },
      {
        q: 'What does a Fortuner cost per day?',
        a:
            '₹8,500 per day with a 250 km daily minimum, or ₹32 per kilometre. Driver night allowance is ₹600. For a full wedding function across two or three days we quote a package rate rather than a daily one — it usually works out lower.'
      },
      {
        q: 'Is the Fortuner automatic?',
        a:
            'Yes, all of ours are automatic diesel with leather upholstery, ambient lighting and a premium sound system. The driver is in uniform as standard on Fortuner bookings.'
      }
    ],
    badge: 'Premium',
    summary:
      'When arrival matters. A commanding full-size SUV kept in showroom condition — regularly booked for weddings, film shoots and VIP movement.',
    features: ['Leather upholstery', 'Automatic', '4×4 capable', 'Premium sound', 'Ambient lighting'],
    bestFor: 'Weddings, VIP transfers, executive travel',
  },
  {
    slug: 'mercedes-benz-e-class',
    name: 'Mercedes-Benz E-Class',
    category: 'luxury',
    seats: 3,
    luggage: 2,
    ac: true,
    transmission: 'Automatic',
    fuel: 'Petrol',
    ratePerKm: 55,
    ratePerDay: 16000,
    minKm: 200,
    driverAllowance: 800,
    image: '/images/vehicle-luxury.svg',
        parentType: '4-seater-car-rental',
        tagline: 'Our flagship chauffeur-driven saloon',
        detail:
      'The E-Class is the car we send when the guest list includes a chief executive or a bride. The rear seat reclines, the cabin is near-silent at highway speed, and the chauffeur is in uniform with a name placard as standard. It is a three-passenger car by design — the rear seat is genuinely comfortable for two, and the point of it is space rather than headcount.',
        useCases: [
      'Wedding car for the bride or groom',
      'Board-level and delegation airport pickups',
      'Hotel-to-venue movement for VIP guests',
      'Anniversary and milestone occasions'
    ],
        faqs: [
      {
        q: 'How many passengers does the Mercedes E-Class seat?',
        a:
            'Three passengers plus the chauffeur, and it is at its best with two in the rear. It is booked for comfort and presence, not capacity — if you need to move five or six people in luxury, take the Fortuner or two E-Class cars.'
      },
      {
        q: 'Is a uniformed chauffeur included?',
        a:
            'Yes, as standard on every E-Class booking, along with complimentary bottled water and a name placard for airport pickups. Wi-Fi on board can be arranged on request.'
      },
      {
        q: 'What is the minimum booking for the E-Class?',
        a:
            '₹16,000 per day with a 200 km minimum, or ₹55 per kilometre. For a wedding day we quote a function rate covering the full schedule rather than charging by the hour.'
      }
    ],
    badge: 'Luxury',
    summary:
      'Our flagship chauffeur-driven saloon. Rear-seat recline, near-silent cabin and a uniformed driver — the car we send when the guest list includes a CEO or a bride.',
    features: ['Chauffeur in uniform', 'Rear recline seats', 'Complimentary water', 'Wi-Fi on request', 'Burmester audio'],
    bestFor: 'Wedding car, corporate VIP, airport VIP pickup',
  },
  {
    slug: 'force-tempo-traveller-12',
    name: 'Force Tempo Traveller (12+1)',
    category: 'tempo',
    seats: 12,
    luggage: 8,
    ac: true,
    transmission: 'Manual',
    fuel: 'Diesel',
    ratePerKm: 26,
    ratePerDay: 6500,
    minKm: 250,
    driverAllowance: 500,
    image: '/images/vehicle-tempo.svg',
        parentType: 'tempo-traveller-on-rent',
        tagline: 'The most-booked group vehicle in our fleet',
        detail:
      'One 12-seater replaces three cars, and that single fact is why families and offices keep coming back to it. Nobody gets separated at a highway dhaba, the luggage rides with its owner, and the whole party arrives together. Ours have push-back seats with individual reading lights, dual AC blowers so the rear rows actually stay cool, and a roof carrier fitted free on request when the bags outnumber the boot.',
        useCases: [
      'Extended families travelling on one itinerary',
      'Office outings, offsites and conference transfers',
      'Khatu Shyam, Salasar and Char Dham temple yatras',
      'Wedding guest movement between hotel and venue'
    ],
        faqs: [
      {
        q: 'What is the price of a 12 seater tempo traveller in Delhi?',
        a:
            '₹26 per kilometre, or ₹6,500 per day with a 250 km daily minimum. A local 8 hr / 80 km package inside Delhi NCR is ₹5,500. Toll, parking and a ₹500 driver night allowance are additional, billed at actuals.'
      },
      {
        q: 'Does the 12 seater have push-back seats?',
        a:
            'Yes — twelve individually reclining push-back seats with reading lights, curtains and charging points. On a Delhi–Khatu Shyam overnight run that is the difference between passengers arriving rested and arriving stiff.'
      },
      {
        q: 'Is there space for luggage in a 12 seater tempo traveller?',
        a:
            'There is a luggage bay behind the last row that takes six to eight large suitcases. For a week-long trip with twelve passengers we fit a roof carrier free of charge — just mention it at booking.'
      }
    ],
    badge: 'Group Favourite',
    summary:
      'The default choice for a family gathering or an office outing. Push-back seats, generous headroom and a roof carrier for the luggage overflow.',
    features: ['Push-back seats', 'Roof carrier', 'LED lighting', 'Curtains', 'Music system'],
    bestFor: 'Family groups, office outings, temple yatra',
  },
  {
    slug: 'force-tempo-traveller-17',
    name: 'Force Tempo Traveller (17+1)',
    category: 'tempo',
    seats: 17,
    luggage: 12,
    ac: true,
    transmission: 'Manual',
    fuel: 'Diesel',
    ratePerKm: 30,
    ratePerDay: 7800,
    minKm: 250,
    driverAllowance: 500,
    image: '/images/vehicle-tempo.svg',
        parentType: 'tempo-traveller-on-rent',
        tagline: 'Five more seats and a bigger luggage bay',
        detail:
      'The 17-seater is the same vehicle stretched: a longer wheelbase, five more push-back seats and a noticeably larger luggage bay. It is the right call for a group of fourteen to seventeen on straight highway routes. It is the wrong call on hill roads and inside old-city lanes, where the extra length makes turns genuinely difficult — and we will tell you so rather than take the larger booking.',
        useCases: [
      'Groups of fourteen to seventeen on highway routes',
      'Pilgrimage groups with heavy luggage',
      'School and college trips with a teacher-in-charge',
      'Corporate transfers where one vehicle beats two'
    ],
        faqs: [
      {
        q: 'What is the difference between a 12 and 17 seater tempo traveller?',
        a:
            'Wheelbase. The 17+1 is a longer body with five more seats and a bigger luggage bay, at ₹30 per kilometre against ₹26. On narrow hill roads and in old-city lanes the 12 manoeuvres far better, so for Shimla, Manali or Rishikesh we usually recommend the 12 even for a group of fourteen.'
      },
      {
        q: 'Can 17 people fit with luggage?',
        a:
            'Seventeen passengers, yes. Seventeen large suitcases as well, no — that is what the roof carrier is for, and it is fitted free on request. For a week-long trip with heavy luggage, a mini bus with an under-floor bay is the better vehicle.'
      },
      {
        q: 'Is the 17 seater AC?',
        a:
            'Yes, with dual blowers — one servicing the front rows and one the rear. In a longer body that second blower matters; a single-blower vehicle leaves the back three rows warm on a June afternoon.'
      }
    ],
    summary:
      'A longer wheelbase for larger groups travelling together. Same comfort as the 12-seater with room for five more and a bigger luggage bay.',
    features: ['17 push-back seats', 'Extra luggage bay', 'Dual AC blowers', 'Reading lights'],
    bestFor: 'Extended families, pilgrimage groups',
  },
  {
    slug: 'luxury-tempo-traveller-maharaja',
    name: 'Maharaja Luxury Tempo Traveller (9+1)',
    category: 'tempo',
    seats: 9,
    luggage: 6,
    ac: true,
    transmission: 'Manual',
    fuel: 'Diesel',
    ratePerKm: 38,
    ratePerDay: 10500,
    minKm: 250,
    driverAllowance: 600,
    image: '/images/vehicle-tempo.svg',
        parentType: 'tempo-traveller-on-rent',
        tagline: 'Nine recliner sofa seats and a centre table',
        detail:
      'The Maharaja is built on the premise that on a long desert circuit the journey should be as comfortable as the hotel. Nine recliner sofa seats face a centre table, there is a mini fridge and an LED screen, and the ambient lighting makes an overnight leg feel civilised rather than endured. It is our most-requested vehicle for premium Rajasthan itineraries and corporate retreats.',
        useCases: [
      'Premium multi-day Rajasthan desert circuits',
      'Corporate retreats and leadership offsites',
      'Small groups who want space rather than seats',
      'Long overnight legs where comfort decides the trip'
    ],
        faqs: [
      {
        q: 'What is a luxury tempo traveller?',
        a:
            'A 9+1 with the seat count deliberately reduced to make room: nine recliner sofa seats around a centre table, a mini fridge, an LED screen, ambient lighting and charging sockets at every seat. It is ₹38 per kilometre — you are paying for space, not headcount.'
      },
      {
        q: 'Does the Maharaja have a fridge and TV?',
        a:
            'Both, plus a centre table and ambient lighting. On a Delhi–Jaisalmer run, a cold drink without stopping at a dhaba is worth more than it sounds.'
      },
      {
        q: 'How many people can travel in the Maharaja?',
        a:
            'Nine passengers plus the driver, with generous luggage space because the seat count is lower than the body would allow. For twelve passengers at a lower rate, take the standard 12-seater.'
      }
    ],
    badge: 'Luxury',
    summary:
      'Nine recliner sofa seats, a centre table and a mini fridge. Built for long desert circuits where the journey deserves to be as comfortable as the hotel.',
    features: ['Recliner sofa seats', 'Centre table', 'Mini fridge', 'LED TV', 'Ambient lighting', 'Charging sockets'],
    bestFor: 'Premium Rajasthan circuits, corporate retreats',
  },
  {
    slug: 'mini-bus-21-seater',
    name: 'Mini Bus (21 Seater)',
    category: 'bus',
    seats: 21,
    luggage: 15,
    ac: true,
    transmission: 'Manual',
    fuel: 'Diesel',
    ratePerKm: 36,
    ratePerDay: 11000,
    minKm: 250,
    driverAllowance: 600,
    image: '/images/vehicle-bus.svg',
        parentType: 'mini-bus-on-rent',
        tagline: 'Our most-requested bus size',
        detail:
      'Twenty-one seats is the sweet spot for Indian functions: it moves a baraat, a school section or a department in one trip, without the bulk of a full coach on roads that were never designed for one. Ours have cushioned two-by-two seating, a public address system with a microphone at the front for the guide or the teacher, and a luggage carrier. Available in both AC and non-AC.',
        useCases: [
      'Wedding baraat movement and guest shuttles',
      'School excursions with a teacher-in-charge',
      'Corporate offsites and staff transport',
      'Temple committee group yatras'
    ],
        faqs: [
      {
        q: 'How much does a 21 seater bus cost per day in Delhi?',
        a:
            '₹11,000 per day with a 250 km daily minimum, or ₹36 per kilometre. A local 8 hr / 80 km package is ₹8,500. Driver night allowance is ₹600. Toll, parking and state permits are billed at actuals with receipts.'
      },
      {
        q: 'Is the 21 seater available in non-AC?',
        a:
            'Yes, in both AC and non-AC. Non-AC is meaningfully cheaper and perfectly comfortable between November and February, which is when most Delhi functions happen anyway.'
      },
      {
        q: 'Does the mini bus have a microphone?',
        a:
            'Yes — a public address system with a microphone at the front, which matters more than people expect on a school trip or a guided group tour where one person needs to be heard by twenty.'
      }
    ],
    badge: 'Popular',
    summary:
      'Our most-requested bus size. Fits a wedding baraat, a school excursion or a corporate team without the bulk of a full coach on narrow roads.',
    features: ['21 cushioned seats', 'AC / Non-AC options', 'Public address system', 'Luggage carrier', 'Emergency exit'],
    bestFor: 'Weddings, school trips, corporate transfers',
  },
  {
    slug: 'mini-bus-32-seater',
    name: 'Mini Bus (32 Seater)',
    category: 'bus',
    seats: 32,
    luggage: 25,
    ac: true,
    transmission: 'Manual',
    fuel: 'Diesel',
    ratePerKm: 44,
    ratePerDay: 14500,
    minKm: 250,
    driverAllowance: 700,
    image: '/images/vehicle-bus.svg',
        parentType: 'mini-bus-on-rent',
        tagline: 'A full department, or a full wedding party',
        detail:
      'At thirty-two seats you get a proper under-floor luggage bay, which changes what the vehicle is good for. A group can travel with a week of luggage rather than an overnight bag, and nothing rides in the aisle. Two-by-two cushioned seating, reading lights and a PA system as standard, in AC and non-AC variants.',
        useCases: [
      'Large weddings moving guests between venues',
      'College and corporate group tours',
      'Conference and delegation transfers',
      'Multi-day trips where luggage volume matters'
    ],
        faqs: [
      {
        q: 'Does the 32 seater have a luggage compartment?',
        a:
            'Yes, a dedicated under-floor luggage bay taking around twenty-five large bags. That is the practical difference between the 32 and the 21 seater, and it is why we recommend it for anything longer than an overnight trip.'
      },
      {
        q: 'What does a 32 seater bus cost?',
        a:
            '₹14,500 per day with a 250 km daily minimum, or ₹44 per kilometre. Driver night allowance is ₹700. For a multi-day wedding function we quote a package rate rather than a daily one.'
      },
      {
        q: 'Can the 32 seater travel between states?',
        a:
            'Yes. Every bus in our fleet carries an all-India tourist permit, a current fitness certificate and comprehensive insurance. State entry permits are arranged by us and billed at exactly what the state levies, with the receipt attached to your invoice.'
      }
    ],
    summary:
      'A mid-size coach that handles a full department or an entire wedding party in one trip, with a proper under-floor luggage bay.',
    features: ['32 seats', 'Under-floor luggage bay', 'Two-by-two seating', 'Mic & speakers', 'Reading lights'],
    bestFor: 'Large weddings, corporate events, college tours',
  },
  {
    slug: 'volvo-luxury-coach-45',
    name: 'Volvo Luxury Coach (45 Seater)',
    category: 'bus',
    seats: 45,
    luggage: 40,
    ac: true,
    transmission: 'Automatic',
    fuel: 'Diesel',
    ratePerKm: 65,
    ratePerDay: 26000,
    minKm: 300,
    driverAllowance: 900,
    image: '/images/vehicle-coach.svg',
        parentType: 'mini-bus-on-rent',
        tagline: 'Air-suspension comfort for the long haul',
        detail:
      'Air suspension is what separates a Volvo coach from a standard bus, and you feel it within twenty kilometres — the road noise drops and the ride stops transmitting every joint in the highway. Reclining seats, onboard entertainment, and two drivers as standard on overnight journeys so nobody is at the wheel beyond a safe stretch. An onboard washroom can be arranged on request.',
        useCases: [
      'Long-distance group tours and pilgrimages',
      'Destination weddings moving large guest lists',
      'Conferences and corporate delegations',
      'Overnight routes where two drivers are essential'
    ],
        faqs: [
      {
        q: 'Does the Volvo coach have a washroom?',
        a:
            'It can be supplied with an onboard washroom on request, subject to availability. It is a specific configuration, so tell us at enquiry rather than at booking — we need notice to hold one.'
      },
      {
        q: 'Are two drivers included on overnight journeys?',
        a:
            'Yes, as standard on the 45-seater for continuous overnight routes. It is not an upsell — a single driver on a twelve-hour night run is unsafe, and we will not send one.'
      },
      {
        q: 'What is the rate for a 45 seater Volvo bus?',
        a:
            '₹26,000 per day with a 300 km daily minimum, or ₹65 per kilometre. Driver night allowance is ₹900. The larger minimum reflects the fact that a coach this size is rarely booked for short local work.'
      }
    ],
    badge: 'Luxury Coach',
    summary:
      'Air-suspension Volvo comfort for the long haul. Reclining seats, onboard washroom on request and two drivers on overnight routes as standard.',
    features: ['Air suspension', 'Reclining seats', 'Onboard entertainment', 'Two drivers on night trips', 'Washroom on request', 'Wi-Fi on request'],
    bestFor: 'Long-distance group tours, destination weddings, conferences',
  },
  {
    slug: 'traveller-non-ac-26',
    name: 'Deluxe Bus (26 Seater, Non-AC)',
    category: 'bus',
    seats: 26,
    luggage: 20,
    ac: false,
    transmission: 'Manual',
    fuel: 'Diesel',
    ratePerKm: 30,
    ratePerDay: 9000,
    minKm: 250,
    driverAllowance: 600,
    image: '/images/vehicle-bus.svg',
        parentType: 'mini-bus-on-rent',
        tagline: 'Well kept, no frills, sensibly priced',
        detail:
      'A non-AC bus is the right answer more often than people assume. Between November and February the AC would be off anyway, wide windows and moving air are pleasant, and the saving is real. We keep this 26-seater specifically for local functions and winter travel where the budget is better spent elsewhere. It is maintained to exactly the same standard as the AC fleet.',
        useCases: [
      'Local functions and community events',
      'Winter travel between November and February',
      'Budget-conscious group trips',
      'Short shuttle runs within Delhi NCR'
    ],
        faqs: [
      {
        q: 'Do you have non-AC buses on rent?',
        a:
            'Yes — this 26-seater deluxe is our dedicated non-AC bus, and our 21, 32 and 45 seaters are available in non-AC variants too. In Delhi winter it is the sensible choice, and it is meaningfully cheaper.'
      },
      {
        q: 'How much cheaper is a non-AC bus?',
        a:
            'This 26-seater is ₹9,000 per day against ₹11,000 for the 21-seater AC — more seats for less money, with climate control as the only trade-off. On a December function that is a straightforwardly better deal.'
      },
      {
        q: 'Is the non-AC bus in good condition?',
        a:
            'It is maintained on the same schedule as the rest of the fleet, with a current fitness certificate, comprehensive insurance and an all-India tourist permit. Non-AC means no air conditioning, not lower standards.'
      }
    ],
    badge: 'Value',
    summary:
      'A no-frills, well-kept non-AC bus for winter travel and local functions where budget matters more than climate control.',
    features: ['26 seats', 'Wide windows', 'Luggage carrier', 'Economical rates'],
    bestFor: 'Local functions, winter travel, budget groups',
  },
]

export const getFleetBySlug = (slug) => fleet.find((v) => v.slug === slug)
