/**
 * Tour itineraries. One entry = one prerendered page under /tour-packages/.
 *
 * `image` is the card photograph (with a `-sm` twin), `heroBg` the wide
 * header behind the detail page, `place` the caption on the card photo,
 * `route` the one-line itinerary under the title and `destination` the
 * label this package gets in the footer's destination list.
 */
export const packages = [
  {
    slug: 'golden-triangle-delhi-agra-jaipur',
    shortTitle: 'Golden Triangle Tour',
    image: '/images/places/taj-mahal.jpg',
    heroBg: '/images/hero/bg-amber.jpg',
    place: 'Taj Mahal',
    route: 'Delhi – Agra – Jaipur',
    destination: 'Agra & the Taj Mahal',
    tone: 'maroon',
    vehicle: 'Toyota Innova Crysta or Maruti Ertiga',
    vehicleSlug: 'toyota-innova-crysta',
    bestTime: 'October to March, when Agra and Jaipur are pleasant to walk all day',
    distance: 'Approximately 1,100 km over five days',
    detail:
      'This is the circuit every first-time visitor to North India does, and the reason it endures is that the three cities genuinely complement each other: Delhi\'s layered history, Agra\'s single overwhelming monument, and Jaipur\'s living old city. Where most operators rush it into four days, we build in a sunrise Taj slot and keep the Agra–Jaipur leg early, so you reach Amber Fort before the queues rather than in the middle of them.',
    inclusions: [
      'Air-conditioned vehicle with an experienced driver for all five days',
      'All fuel, driver allowance and inter-state permits',
      'Airport or hotel pickup and drop',
      'Driver who knows monument timings and parking realities',
      '24×7 phone support for the duration of the trip'
    ],
    exclusions: [
      'Hotels — we book at our negotiated rate with no markup if you want us to',
      'Monument entry tickets and guide fees',
      'Meals and personal expenses',
      'Toll and parking, billed at actuals with receipts'
    ],
    faqs: [
      {
        q:
          'How many days do you need for the Golden Triangle?',
        a:
          'Five days is the honest minimum for doing it without rushing. Four is possible but you lose either the sunrise Taj or a proper day in Jaipur. Six lets you add Fatehpur Sikri and the Abhaneri stepwell without compressing anything else.'
      },
      {
        q:
          'Can the Golden Triangle start and end in Jaipur instead of Delhi?',
        a:
          'Yes. We run it in either direction and from either city, and can drop you at Jaipur airport or bring you back to Delhi. Tell us where your flights land and we will rearrange the itinerary around them at no extra cost.'
      },
      {
        q:
          'Is the Taj Mahal closed on any day?',
        a:
          'The Taj Mahal is closed to visitors on Fridays. We plan every Golden Triangle itinerary around that, so if your dates include a Friday we simply shift the Agra day — you will not lose the visit.'
      }
    ],
    title: 'Golden Triangle — Delhi · Agra · Jaipur',
    duration: '5 Days / 4 Nights',
    from: 'Delhi',
    price: 18500,
    priceNote: 'per cab (up to 4 guests), excluding hotels',
    tag: 'Bestseller',
    highlights: [
      'Taj Mahal at sunrise & Agra Fort',
      'Amber Fort, Hawa Mahal & City Palace, Jaipur',
      'Fatehpur Sikri en route',
      'Qutub Minar & India Gate, Delhi',
    ],
    summary:
      'India\'s most travelled circuit, done unhurried. We build in a sunrise Taj slot and keep the Agra–Jaipur leg early so you reach Amber Fort before the queues.',
    itinerary: [
      { day: 1, title: 'Delhi arrival & city tour', detail: 'Airport pickup, Qutub Minar, India Gate, Lotus Temple, overnight Delhi.' },
      { day: 2, title: 'Delhi → Agra', detail: 'Drive via Yamuna Expressway, Agra Fort, Mehtab Bagh sunset, overnight Agra.' },
      { day: 3, title: 'Taj Mahal → Jaipur', detail: 'Sunrise Taj Mahal, drive to Jaipur via Fatehpur Sikri and Abhaneri stepwell.' },
      { day: 4, title: 'Jaipur sightseeing', detail: 'Amber Fort, Jal Mahal, City Palace, Jantar Mantar, Hawa Mahal, bazaar evening.' },
      { day: 5, title: 'Jaipur departure', detail: 'Drop at Jaipur airport / railway station or continue to Delhi.' },
    ],
  },
  {
    slug: 'royal-rajasthan-grand-tour',
    shortTitle: 'Royal Rajasthan Tour',
    image: '/images/places/jodhpur-blue-city.jpg',
    heroBg: '/images/hero/bg-jodhpur.jpg',
    place: 'Jodhpur, the Blue City',
    route: 'Jaipur – Jodhpur – Jaisalmer – Udaipur',
    destination: 'Jodhpur & Udaipur',
    tone: 'amber',
    vehicle: 'Toyota Innova Crysta or a 12-seat tempo traveller for larger groups',
    vehicleSlug: 'toyota-innova-crysta',
    bestTime: 'October to March; December and January nights are genuinely cold in the desert',
    distance: 'Approximately 2,400 km over ten days',
    detail:
      'Ten days is what Rajasthan actually needs. The state\'s cities are far apart — Jaisalmer to Udaipur is close to nine hours on the road — and the common mistake is trying to fit six of them into a week, which turns a holiday into a driving marathon. We cap most days at five hours behind the wheel so you arrive with enough afternoon left to see the place you came for.',
    inclusions: [
      'Air-conditioned vehicle and driver for all ten days',
      'Fuel, driver allowance and all state permits',
      'Route paced so no driving day exceeds about five hours',
      'Drivers with genuine local knowledge of each city',
      'Flexible daily start times — the itinerary bends to you'
    ],
    exclusions: [
      'Hotels and heritage properties, bookable at our negotiated rates',
      'Fort and palace entry tickets, guides, camel and boat rides',
      'Meals and personal expenses',
      'Toll, parking and desert camp charges at actuals'
    ],
    faqs: [
      {
        q:
          'Is ten days too long for Rajasthan?',
        a:
          'It is the right length for this route. The cities are genuinely far apart and a shorter version means either dropping a city or spending eight hours a day in the car. If you only have a week, we would cut Jaisalmer rather than compress everything.'
      },
      {
        q:
          'Which vehicle is best for a ten-day Rajasthan tour?',
        a:
          'For four to six people, the Toyota Innova Crysta — the captain seats and composure over long stretches matter far more on day seven than on day one. For groups of eight or more, a 12-seat tempo traveller with push-back seats.'
      },
      {
        q:
          'Do you include hotels in the Rajasthan tour package?',
        a:
          'The package price covers the vehicle, driver, fuel and permits. We have long-standing rates with hotels and heritage properties from budget to five-star and pass on the negotiated rate without markup — you pay the hotel what we pay. Many guests prefer to book their own, and that is entirely fine.'
      }
    ],
    title: 'Royal Rajasthan Grand Tour',
    duration: '10 Days / 9 Nights',
    from: 'Jaipur',
    price: 42000,
    priceNote: 'per cab (up to 4 guests), excluding hotels',
    tag: 'Signature',
    highlights: [
      'Jaipur, Jodhpur, Jaisalmer, Udaipur & Pushkar',
      'Sam sand dunes camel safari & desert camp',
      'Mehrangarh Fort and the blue city lanes',
      'Boat ride on Lake Pichola, Udaipur',
    ],
    summary:
      'The full sweep of Rajasthan across ten days — forts, dunes, lakes and havelis — paced so no day runs more than five hours on the road.',
    itinerary: [
      { day: 1, title: 'Arrive Jaipur', detail: 'Pickup and evening at Chokhi Dhani or Nahargarh sunset.' },
      { day: 2, title: 'Jaipur sightseeing', detail: 'Amber Fort, City Palace, Jantar Mantar, Hawa Mahal.' },
      { day: 3, title: 'Jaipur → Pushkar → Jodhpur', detail: 'Brahma Temple and Pushkar Lake, onward to Jodhpur.' },
      { day: 4, title: 'Jodhpur', detail: 'Mehrangarh Fort, Jaswant Thada, Umaid Bhawan, blue city walk.' },
      { day: 5, title: 'Jodhpur → Jaisalmer', detail: 'Drive via Osian, arrive golden city by evening.' },
      { day: 6, title: 'Jaisalmer & Sam dunes', detail: 'Jaisalmer Fort, Patwon Ki Haveli, camel safari and desert camp night.' },
      { day: 7, title: 'Jaisalmer → Udaipur', detail: 'Long scenic drive via Ranakpur Jain Temple.' },
      { day: 8, title: 'Udaipur', detail: 'City Palace, Lake Pichola boat ride, Saheliyon Ki Bari, Jagdish Temple.' },
      { day: 9, title: 'Udaipur → Jaipur', detail: 'Return via Chittorgarh Fort or Ajmer Sharif Dargah.' },
      { day: 10, title: 'Departure', detail: 'Drop at Jaipur airport or railway station.' },
    ],
  },
  {
    slug: 'shekhawati-haveli-heritage-trail',
    shortTitle: 'Shekhawati Haveli Trail',
    image: '/images/places/mandawa-haveli.jpg',
    heroBg: '/images/hero/bg-haveli.jpg',
    place: 'Mandawa',
    route: 'Nawalgarh – Mandawa – Fatehpur',
    destination: 'Shekhawati havelis',
    tone: 'rose',
    vehicle: 'Maruti Ertiga or Toyota Innova Crysta',
    vehicleSlug: 'maruti-suzuki-ertiga',
    bestTime: 'October to March; the painted facades photograph best in winter light',
    distance: 'Approximately 600 km over three days',
    detail:
      'Shekhawati is the region our family comes from, and this is the trip we are most particular about. The painted havelis of Nawalgarh, Mandawa and Fatehpur are among the largest concentrations of frescoes anywhere in the world, and almost nobody visits them. Several of our drivers grew up in these towns — when they take you through Nawalgarh they are showing you their own streets, which is a very different experience from following a route on a phone.',
    inclusions: [
      'Air-conditioned vehicle and driver for three days',
      'Drivers from the Shekhawati region itself',
      'Fuel, driver allowance and permits',
      'Route built around light for photography',
      'Khatu Shyam Ji darshan included on the return leg'
    ],
    exclusions: [
      'Hotels and heritage haveli stays',
      'Haveli museum entry fees where charged',
      'Meals and personal expenses',
      'Toll and parking at actuals'
    ],
    faqs: [
      {
        q:
          'What is the Shekhawati region known for?',
        a:
          'Painted havelis — merchant mansions whose walls, inside and out, are covered in frescoes painted between the 1830s and the 1930s. Nawalgarh, Mandawa, Fatehpur and Ramgarh have the densest concentrations. It is often called the world’s largest open-air art gallery, and it is remarkably uncrowded.'
      },
      {
        q:
          'Can the Shekhawati trail be done from Delhi?',
        a:
          'Yes. It is about five hours from Delhi to Nawalgarh, so we usually start early and reach in time for an afternoon of havelis. We can pick you up from Delhi, Jaipur or Sikar — tell us which is convenient.'
      },
      {
        q:
          'Is Khatu Shyam Ji included in this package?',
        a:
          'Yes, on the return leg on day three, along with the Ramgarh chhatris. If you want longer at the temple for a proper darshan, say so at booking and we will start day three earlier.'
      }
    ],
    title: 'Shekhawati Haveli Heritage Trail',
    duration: '3 Days / 2 Nights',
    from: 'New Delhi / Jaipur',
    price: 11500,
    priceNote: 'per cab (up to 4 guests), excluding hotels',
    tag: 'Our Home Turf',
    highlights: [
      'Painted havelis of Nawalgarh & Mandawa',
      'Fresco-covered chhatris and step wells',
      'Ramgarh, Fatehpur and Mahansar villages',
      'Local guide who grew up in these lanes',
    ],
    summary:
      'The open-air art gallery of Rajasthan, and the region we know best. Our drivers are from Shekhawati — they will take you to the frescoes tour buses skip.',
    itinerary: [
      { day: 1, title: 'Jaipur → Nawalgarh', detail: 'Poddar Haveli Museum, Morarka Haveli, evening village walk.' },
      { day: 2, title: 'Mandawa & Fatehpur', detail: 'Mandawa Fort, Goenka Double Haveli, Nadine Le Prince Haveli at Fatehpur.' },
      { day: 3, title: 'Ramgarh → Sikar → return', detail: 'Ramgarh chhatris, Khatu Shyam Ji darshan, drop at Jaipur or Sikar.' },
    ],
  },
  {
    slug: 'khatu-shyam-salasar-balaji-darshan',
    shortTitle: 'Khatu Shyam & Salasar Darshan',
    image: '/images/places/khatu-shyam-temple.jpg',
    heroBg: '/images/hero/bg-jaisalmer.jpg',
    place: 'Khatu Shyam Ji',
    route: 'Khatu – Salasar – Jhunjhunu',
    destination: 'Khatu Shyam Ji',
    tone: 'saffron',
    vehicle: 'Maruti Ertiga, Innova Crysta or a 12-seat tempo traveller',
    vehicleSlug: 'force-tempo-traveller-12',
    bestTime: 'All year; avoid Phalgun Mela in February–March unless you specifically want the festival',
    distance: 'Approximately 650 km over two days',
    detail:
      'This is the run we do more often than any other, and our drivers know it in a way that only repetition teaches: which approach road is quicker on a Sunday, where to park so the walk to the temple is short, and what time the aarti actually starts as opposed to what time it is listed. For a family travelling with elderly parents, that knowledge is the whole difference between a calm darshan and a stressful day.',
    inclusions: [
      'Vehicle and driver for both days',
      'Drivers who know aarti timings and parking at both temples',
      'Fuel, driver allowance and permits',
      'Rani Sati Temple at Jhunjhunu on the return',
      'Early-morning departures arranged at no extra charge'
    ],
    exclusions: [
      'Hotel at Sikar or Khatu for the overnight stay',
      'Prasad, offerings and personal expenses',
      'Meals',
      'Toll and parking at actuals'
    ],
    faqs: [
      {
        q:
          'Can Khatu Shyam and Salasar be covered in one day from Delhi?',
        a:
          'It is possible but long — roughly fourteen hours door to door with a very early start. We run it as a one-day trip regularly for those who want it. With elderly passengers or children, the two-day version with an overnight at Sikar is far more comfortable and lets you attend the evening aarti properly.'
      },
      {
        q:
          'What time should we leave Delhi for Khatu Shyam?',
        a:
          'Between 4 and 5 AM for a one-day trip, which puts you at Khatu by mid-morning ahead of the heaviest queues. We arrange pre-dawn departures at no extra charge — it is our most common booking and the drivers are used to it.'
      },
      {
        q:
          'Is this package suitable for elderly passengers?',
        a:
          'Yes, and it is who we design it for. The two-day format keeps each driving day short, our drivers park as close to the temple entrances as permitted, and we can arrange a vehicle with a lower step-in height if getting in and out is a concern. Mention it at booking.'
      }
    ],
    title: 'Khatu Shyam · Salasar Balaji · Rani Sati Darshan',
    duration: '2 Days / 1 Night',
    from: 'New Delhi / Jaipur',
    price: 7500,
    priceNote: 'per cab (up to 4 guests), excluding stay',
    tag: 'Pilgrimage',
    highlights: [
      'Khatu Shyam Ji temple darshan',
      'Salasar Balaji Dham',
      'Rani Sati Dadi Temple, Jhunjhunu',
      'Jeen Mata temple on request',
    ],
    summary:
      'The Shekhawati pilgrimage circuit, run daily. We schedule around aarti timings and know which entry gates move fastest on Ekadashi and weekends.',
    itinerary: [
      { day: 1, title: 'Departure → Khatu Shyam Ji', detail: 'Pickup, darshan at Khatu, evening aarti, overnight Sikar.' },
      { day: 2, title: 'Salasar → Jhunjhunu → return', detail: 'Salasar Balaji darshan, Rani Sati Temple, drop back.' },
    ],
  },
  {
    slug: 'jaipur-one-day-city-tour',
    shortTitle: 'Jaipur One Day Tour',
    image: '/images/places/hawa-mahal.jpg',
    heroBg: '/images/hero/bg-hawa-mahal.jpg',
    place: 'Hawa Mahal',
    route: 'Amber Fort – City Palace – Hawa Mahal',
    destination: 'Jaipur',
    tone: 'blue',
    vehicle: 'Maruti Suzuki Dzire or Ertiga',
    vehicleSlug: 'maruti-suzuki-swift-dzire',
    bestTime: 'October to March; start by 8:30 AM in any season to beat the Amber Fort queue',
    distance: 'Approximately 80 km within the city',
    detail:
      'A single well-ordered day covers Jaipur properly, and the order is the whole trick. Amber Fort first, before the coaches arrive and while the light is still soft on the ramparts; the city palace complex in the middle of the day when the courtyards give shade; and the bazaars in the evening when they come alive. Done in the wrong sequence the same list of sights becomes a day of queuing.',
    inclusions: [
      'Air-conditioned car and driver for the full day',
      '8 hr / 80 km within Jaipur city limits',
      'A route ordered to avoid the worst queues',
      'Pickup from your hotel, the airport or the railway station',
      'Clear per-hour and per-km rates if the day runs long'
    ],
    exclusions: [
      'Monument entry tickets and guide fees',
      'Elephant or jeep ride at Amber Fort',
      'Meals and personal expenses',
      'Parking, billed at actuals'
    ],
    faqs: [
      {
        q:
          'Can Jaipur be covered in one day?',
        a:
          'Comfortably, if the order is right. Amber Fort first thing, the City Palace and Jantar Mantar around midday, Hawa Mahal and the bazaars in the late afternoon. That sequence keeps you ahead of the queues all day.'
      },
      {
        q:
          'What is included in the 8 hr / 80 km Jaipur package?',
        a:
          'The vehicle, fuel and driver for eight hours and eighty kilometres within the city, at ₹2,800. Beyond that, extra hours and kilometres are charged at a clearly stated rate agreed before you start — so an extra stop never becomes a surprise on the bill.'
      },
      {
        q:
          'Does the Jaipur day tour include a guide?',
        a:
          'Not by default. Your driver knows the city and the practicalities well, but a licensed guide for inside the monuments can be arranged on request at additional cost — worth it at Amber Fort and the City Palace in particular.'
      }
    ],
    title: 'Jaipur One Day City Tour',
    duration: '1 Day',
    from: 'Jaipur',
    price: 2800,
    priceNote: 'per cab (up to 4 guests), 8 hrs / 80 km',
    tag: 'Day Trip',
    highlights: [
      'Amber Fort & Jal Mahal',
      'City Palace and Jantar Mantar',
      'Hawa Mahal photo stop',
      'Johari Bazaar shopping time',
    ],
    summary:
      'Everything the Pink City is known for in a single well-sequenced day, starting at Amber Fort before 9 AM to stay ahead of the crowds.',
    itinerary: [
      { day: 1, title: 'Full-day Jaipur', detail: 'Amber Fort → Jal Mahal → Gaitor → City Palace → Jantar Mantar → Hawa Mahal → Birla Mandir → bazaar.' },
    ],
  },
  {
    slug: 'rajasthan-desert-circuit',
    shortTitle: 'Rajasthan Desert Circuit',
    image: '/images/places/sam-sand-dunes.jpg',
    heroBg: '/images/hero/bg-dunes.jpg',
    place: 'Sam Sand Dunes',
    route: 'Bikaner – Jaisalmer – Jodhpur',
    destination: 'Jaisalmer & the Thar',
    tone: 'sand',
    vehicle: 'Toyota Innova Crysta or Mahindra Scorpio-N',
    vehicleSlug: 'mahindra-scorpio-n',
    bestTime: 'November to February; the Sam dunes are unpleasant from April to June',
    distance: 'Approximately 1,500 km over six days',
    detail:
      'The desert circuit is the Rajasthan people picture: Bikaner\'s fort, the golden sandstone of Jaisalmer, a night at the Sam dunes and Jodhpur\'s blue city under Mehrangarh. It is also the circuit where the vehicle matters most — the approach roads to desert camps are unsurfaced, and a low-slung car struggles where an SUV with clearance simply drives on. We route the long Jaisalmer legs in the morning so the afternoon heat is spent somewhere with shade.',
    inclusions: [
      'SUV with high ground clearance and an experienced desert driver',
      'Fuel, driver allowance and all permits',
      'Long legs scheduled for mornings, not afternoons',
      'Drivers who know the camp approach roads',
      'Osian and Pokhran stops built into the route'
    ],
    exclusions: [
      'Hotels and desert camp accommodation',
      'Camel safari and cultural evening at the dunes',
      'Fort and museum entry fees',
      'Meals, toll and parking at actuals'
    ],
    faqs: [
      {
        q:
          'When is the best time to visit the Thar desert?',
        a:
          'November to February. Days are warm and clear, nights at the dunes are cold enough to want a jacket, and everything is comfortable to walk. April to June is genuinely punishing in the desert — we will take the booking, but we will tell you honestly what you are in for.'
      },
      {
        q:
          'Which vehicle is best for the desert circuit?',
        a:
          'A Mahindra Scorpio-N or Toyota Innova Crysta. The approach roads to the Sam dunes camps are unsurfaced and the Scorpio’s ground clearance handles them without drama. For six or more people, a tempo traveller works on the main roads with a jeep transfer for the last stretch to camp.'
      },
      {
        q:
          'Is the desert camp night included?',
        a:
          'The camp stay is booked separately — we pass on our negotiated rate without markup if you would like us to arrange it. The package covers getting you there, and our drivers know which camps are where, which is less obvious than it sounds after dark.'
      }
    ],
    title: 'Desert Circuit — Bikaner · Jaisalmer · Jodhpur',
    duration: '6 Days / 5 Nights',
    from: 'Jaipur / Sikar',
    price: 26500,
    priceNote: 'per cab (up to 4 guests), excluding hotels',
    tag: 'Adventure',
    highlights: [
      'Junagarh Fort and Karni Mata Temple, Bikaner',
      'Overnight desert camp at Sam dunes',
      'Mehrangarh Fort, Jodhpur',
      'Longewara & Tanot on request',
    ],
    summary:
      'Straight into the Thar. Dunes, forts and desert camps, with the driving done early so afternoons stay free for sightseeing.',
    itinerary: [
      { day: 1, title: 'To Bikaner', detail: 'Drive via Fatehpur, evening Junagarh Fort.' },
      { day: 2, title: 'Bikaner → Jaisalmer', detail: 'Karni Mata Temple, camel breeding farm, onward to Jaisalmer.' },
      { day: 3, title: 'Jaisalmer', detail: 'Golden Fort, havelis, Gadisar Lake, Sam dunes camp.' },
      { day: 4, title: 'Jaisalmer → Jodhpur', detail: 'Via Pokhran and Osian temples.' },
      { day: 5, title: 'Jodhpur', detail: 'Mehrangarh, Jaswant Thada, blue city, Toorji Ka Jhalra.' },
      { day: 6, title: 'Return', detail: 'Drive back to Jaipur / Sikar with a Pushkar stop.' },
    ],
  },
]

export const getPackageBySlug = (slug) => packages.find((p) => p.slug === slug)
