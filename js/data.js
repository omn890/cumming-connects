/* Cumming Connects: site data.
   Stored as JavaScript (not JSON) so the site works when opened directly from a laptop with no server or internet.
   Every resource and event lists the page it was checked against (sourceUrl); see sources.html.
   "verified": false means the team still needs to confirm the details. The site labels these "Call to confirm".
   Map coordinates (lat/lng) are approximate. */

/* Date the listings were last checked. Update it after each re-check (the home page reads it). */
window.DATA_CHECKED = "2026-10-22";

window.CATEGORIES = [
  {
    "id": "food",
    "label": "Food & basic needs",
    "short": "Food",
    "blurb": "Pantries and help with SNAP"
  },
  {
    "id": "health",
    "label": "Health & wellness",
    "short": "Health",
    "blurb": "Clinics, the hospital, and mental health care"
  },
  {
    "id": "education",
    "label": "Education & libraries",
    "short": "Education",
    "blurb": "Libraries and schools"
  },
  {
    "id": "youth",
    "label": "Youth & family",
    "short": "Youth",
    "blurb": "Things for kids and teens to do"
  },
  {
    "id": "seniors",
    "label": "Seniors",
    "short": "Seniors",
    "blurb": "Senior centers and Meals on Wheels"
  },
  {
    "id": "parks",
    "label": "Parks & recreation",
    "short": "Parks",
    "blurb": "Trails, parks, and Lake Lanier"
  },
  {
    "id": "civic",
    "label": "Civic & volunteering",
    "short": "Civic",
    "blurb": "Voting, permits, and city hall"
  },
  {
    "id": "safety",
    "label": "Safety & emergency",
    "short": "Safety",
    "blurb": "Police, fire, and crisis lines"
  }
];

window.RESOURCES = [
  {
    "id": "the-place-of-forsyth",
    "name": "The Place of Forsyth County",
    "category": "food",
    "audience": [
      "all",
      "families"
    ],
    "description": "Shop for free groceries at the county’s largest client-choice food market. Bring a photo ID and proof of where you live and what you earn. Other emergency help is available too.",
    "address": "2550 The Place Circle, Cumming, GA 30040",
    "lat": 34.196,
    "lng": -84.129,
    "phone": "(770) 887-1098",
    "website": "https://theplacega.org",
    "hours": "Food market Tue–Thu (times vary; call ahead)",
    "tags": [
      "food pantry",
      "emergency aid",
      "groceries"
    ],
    "sourceUrl": "https://ampleharvest.org/food-pantries/the-place-of-forsyth-food-pantry-427/",
    "verified": true,
    "featured": true
  },
  {
    "id": "meals-by-grace",
    "name": "Meals by Grace Food Pantry",
    "category": "food",
    "audience": [
      "all",
      "families",
      "seniors"
    ],
    "description": "Pick your own groceries at this north Forsyth pantry. If you can’t get there, ask about home delivery or the monthly mobile pantry.",
    "address": "3540 Keith Bridge Road, Cumming, GA 30041",
    "lat": 34.239,
    "lng": -84.088,
    "phone": "(404) 426-4055",
    "website": "",
    "hours": "",
    "tags": [
      "food pantry",
      "home delivery",
      "mobile pantry"
    ],
    "sourceUrl": "https://sawneeelementary.forsyth.k12.ga.us/student-services/counseling/community-resources",
    "verified": false
  },
  {
    "id": "cfumc-food-pantry",
    "name": "Cumming First United Methodist Church Food Pantry",
    "category": "food",
    "audience": [
      "families"
    ],
    "description": "Families who qualify can get groceries here, including meat and dairy. Call the church office first, since the schedule changes.",
    "address": "770 Canton Highway, Cumming, GA 30040",
    "lat": 34.2185,
    "lng": -84.164,
    "phone": "(770) 887-2900",
    "website": "",
    "hours": "Wednesdays 9–11 a.m. (unconfirmed)",
    "tags": [
      "food pantry",
      "church",
      "groceries"
    ],
    "sourceUrl": "https://networks.whyhunger.org/organisation/33185",
    "verified": false
  },
  {
    "id": "forsyth-dfcs",
    "name": "Georgia DFCS – Forsyth County Office (SNAP & Medicaid)",
    "category": "food",
    "audience": [
      "families",
      "seniors",
      "spanish"
    ],
    "description": "Apply in person for SNAP food benefits, Medicaid, or TANF (cash help for families). You can also start an application by phone at 1-877-423-4746.",
    "address": "6435 Shiloh Road, Suite C, Alpharetta, GA 30005",
    "lat": 34.156,
    "lng": -84.195,
    "phone": "(770) 781-6700",
    "website": "https://dfcs.georgia.gov",
    "hours": "Mon–Fri 8 a.m.–5 p.m.",
    "tags": [
      "SNAP",
      "food stamps",
      "Medicaid",
      "benefits"
    ],
    "sourceUrl": "https://dfcs.georgia.gov/node/15746",
    "verified": false
  },
  {
    "id": "northside-hospital-forsyth",
    "name": "Northside Hospital Forsyth",
    "category": "health",
    "audience": [
      "all"
    ],
    "description": "Go here for emergencies any time, day or night. It’s the county’s full-service hospital, including maternity care and specialists.",
    "address": "1200 Northside Forsyth Drive, Cumming, GA 30041",
    "lat": 34.18,
    "lng": -84.135,
    "phone": "(770) 844-3200",
    "website": "https://www.northside.com/forsyth",
    "hours": "Open 24/7 (emergency department)",
    "tags": [
      "hospital",
      "emergency room",
      "24/7"
    ],
    "sourceUrl": "https://www.ahd.com/free_profile/110005/Northside_Hospital_-_Forsyth/Cumming/Georgia",
    "verified": true
  },
  {
    "id": "forsyth-county-health-department",
    "name": "Forsyth County Health Department",
    "category": "health",
    "audience": [
      "all",
      "families",
      "spanish"
    ],
    "description": "Get shots, WIC nutrition help, and family planning at the county’s public health clinic. Call ahead, because each service has its own hours.",
    "address": "428 Canton Highway, Cumming, GA 30040",
    "lat": 34.215,
    "lng": -84.153,
    "phone": "(770) 781-6900",
    "website": "https://forsythco.com/DepartmentsOffices/HealthDepartment",
    "hours": "Mon, Wed, Thu 8 a.m.–5 p.m.; Tue 8 a.m.–7 p.m.; Fri 8 a.m.–noon",
    "tags": [
      "immunizations",
      "WIC",
      "public health"
    ],
    "sourceUrl": "https://forsythco.com/DepartmentsOffices/HealthDepartment",
    "verified": true
  },
  {
    "id": "ghms-cumming-family-health",
    "name": "Georgia Highlands Medical Services – Cumming Family Health Center",
    "category": "health",
    "audience": [
      "all",
      "families",
      "spanish"
    ],
    "description": "See a doctor even without insurance. Prices are based on your income at this federally qualified health center.",
    "address": "260 Elm Street, Cumming, GA 30040",
    "lat": 34.2058,
    "lng": -84.1385,
    "phone": "(770) 887-1668",
    "website": "https://www.ghms-inc.org",
    "hours": "Mon–Fri plus Saturday mornings (appointment required)",
    "tags": [
      "sliding scale",
      "primary care",
      "uninsured"
    ],
    "sourceUrl": "https://npin.cdc.gov/organization/georgia-highlands-medical-services-incorporated-0",
    "verified": true
  },
  {
    "id": "avita-cumming-center",
    "name": "Avita Community Partners – Cumming Center",
    "category": "health",
    "audience": [
      "all",
      "youth"
    ],
    "description": "Get help with mental health, substance use, or a developmental disability from the area’s public behavioral health provider.",
    "address": "125 North Corners Parkway, Cumming, GA 30040",
    "lat": 34.23,
    "lng": -84.106,
    "phone": "(678) 341-3840",
    "website": "https://avitapartners.org",
    "hours": "",
    "tags": [
      "mental health",
      "counseling",
      "substance use"
    ],
    "sourceUrl": "https://carf.org/provider/cumming-center-29803/",
    "verified": true
  },
  {
    "id": "cumming-library",
    "name": "Cumming Library (Forsyth County Public Library)",
    "category": "education",
    "audience": [
      "all",
      "families",
      "newcomers"
    ],
    "description": "Borrow books, use a computer, or book a meeting room at the downtown branch. Free programs run for every age.",
    "address": "585 Dahlonega Street, Cumming, GA 30040",
    "lat": 34.2158,
    "lng": -84.1355,
    "phone": "(770) 781-9840",
    "website": "https://www.forsythpl.org",
    "hours": "Mon–Thu 9 a.m.–9 p.m.; Fri–Sat 10 a.m.–5:30 p.m.; Sun 1:30–5:30 p.m. (same as other branches; call to confirm)",
    "tags": [
      "library",
      "free wifi",
      "programs"
    ],
    "sourceUrl": "https://forsythpl.org/administrative-offices",
    "verified": true,
    "featured": true
  },
  {
    "id": "sharon-forks-library",
    "name": "Sharon Forks Library",
    "category": "education",
    "audience": [
      "all",
      "families"
    ],
    "description": "Study, borrow, or bring the kids to a youth program at one of Georgia’s busiest library branches, in south Forsyth.",
    "address": "2820 Old Atlanta Road, Cumming, GA 30041",
    "lat": 34.139,
    "lng": -84.1597,
    "phone": "(770) 781-9840",
    "website": "https://forsythpl.org/sharon-forks-library",
    "hours": "Mon–Thu 9 a.m.–9 p.m.; Fri–Sat 10 a.m.–5:30 p.m.; Sun 1:30–5:30 p.m. (same as other branches; call to confirm)",
    "tags": [
      "library",
      "study space",
      "teens"
    ],
    "sourceUrl": "https://forsythpl.org/sharon-forks-library",
    "verified": true
  },
  {
    "id": "hampton-park-library",
    "name": "Hampton Park Library",
    "category": "education",
    "audience": [
      "all",
      "families"
    ],
    "description": "Check out books and tech in northwest Forsyth. During elections, this branch is also an advance voting site.",
    "address": "5345 Settingdown Road, Cumming, GA 30041",
    "lat": 34.293,
    "lng": -84.16,
    "phone": "(770) 781-9840",
    "website": "https://www.forsythpl.org/hampton-park-library",
    "hours": "Mon–Thu 9 a.m.–9 p.m.; Fri–Sat 10 a.m.–5:30 p.m.; Sun 1:30–5:30 p.m. (same as other branches; call to confirm)",
    "tags": [
      "library",
      "early voting",
      "programs"
    ],
    "sourceUrl": "https://www.forsythpl.org/hampton-park-library",
    "verified": true
  },
  {
    "id": "post-road-library",
    "name": "Post Road Library",
    "category": "education",
    "audience": [
      "all",
      "families"
    ],
    "description": "This west Forsyth branch has computers and free programs for kids, teens, and adults. It opened in 2013.",
    "address": "5010 Post Road, Cumming, GA 30040",
    "lat": 34.2246,
    "lng": -84.2234,
    "phone": "(770) 781-9840",
    "website": "https://www.forsythpl.org/post-road-library",
    "hours": "Mon–Thu 9 a.m.–9 p.m.; Fri–Sat 10 a.m.–5:30 p.m.; Sun 1:30–5:30 p.m.",
    "tags": [
      "library",
      "computers",
      "programs"
    ],
    "sourceUrl": "https://www.forsythpl.org/post-road-library",
    "verified": true
  },
  {
    "id": "forsyth-county-schools",
    "name": "Forsyth County Schools",
    "category": "education",
    "audience": [
      "families",
      "youth",
      "newcomers",
      "spanish"
    ],
    "description": "New to the county? Start here to enroll, find your school zone, and ask about student support.",
    "address": "1120 Dahlonega Highway, Cumming, GA 30040",
    "lat": 34.229,
    "lng": -84.125,
    "phone": "(770) 887-2461",
    "website": "https://www.forsyth.k12.ga.us",
    "hours": "",
    "tags": [
      "schools",
      "enrollment",
      "K-12"
    ],
    "sourceUrl": "https://web.focochamber.org/Elementary-Secondary-Schools/Forsyth-County-Schools-578",
    "verified": true
  },
  {
    "id": "lanier-tech-forsyth",
    "name": "Lanier Technical College – Forsyth Campus",
    "category": "education",
    "audience": [
      "all",
      "youth"
    ],
    "description": "Earn a career certificate or degree, take dual-enrollment classes, or prepare for the GED. The campus is near Exit 13 of GA 400.",
    "address": "3410 Ronald Reagan Boulevard, Cumming, GA 30041",
    "lat": 34.1495,
    "lng": -84.1665,
    "phone": "(678) 341-6600",
    "website": "https://www.laniertech.edu",
    "hours": "",
    "tags": [
      "college",
      "dual enrollment",
      "GED",
      "career training"
    ],
    "sourceUrl": "https://laniertech.smartcatalogiq.com/en/2025-2026/catalog/campus-facilities/campuses-and-sites",
    "verified": true
  },
  {
    "id": "ung-cumming",
    "name": "University of North Georgia – Cumming Campus",
    "category": "education",
    "audience": [
      "youth",
      "all"
    ],
    "description": "Take university classes or dual-enrollment courses in high school, or schedule a campus tour just off GA 400.",
    "address": "300 Aquatic Circle, Cumming, GA 30040",
    "lat": 34.229,
    "lng": -84.105,
    "phone": "(470) 239-3132",
    "website": "https://ung.edu/campuses/cumming/",
    "hours": "",
    "tags": [
      "university",
      "dual enrollment",
      "college"
    ],
    "sourceUrl": "https://ung.edu/campuses/cumming/index.php",
    "verified": true
  },
  {
    "id": "forsyth-county-family-ymca",
    "name": "Forsyth County Family YMCA",
    "category": "youth",
    "audience": [
      "families",
      "youth"
    ],
    "description": "Sign up for swim lessons, youth sports, after-school care, or summer camp. Ask about financial assistance.",
    "address": "6050 Y Street, Cumming, GA 30040",
    "lat": 34.204,
    "lng": -84.182,
    "phone": "(770) 888-2788",
    "website": "https://ymcaatlanta.org/locations/forsyth-county-family-ymca",
    "hours": "5 a.m.–9 p.m. (weekdays; call to confirm)",
    "tags": [
      "YMCA",
      "swim",
      "after-school",
      "camps"
    ],
    "sourceUrl": "https://ymcaatlanta.org/locations/forsyth-county-family-ymca",
    "verified": true
  },
  {
    "id": "boys-girls-club-forsyth",
    "name": "Boys & Girls Clubs of Lanier – Forsyth County (Bagwell Club)",
    "category": "youth",
    "audience": [
      "youth",
      "families"
    ],
    "description": "After school and in summer, kids get homework help and mentoring here, at a price families can afford.",
    "address": "2150 Antioch Road, Cumming, GA 30040",
    "lat": 34.181,
    "lng": -84.16,
    "phone": "",
    "website": "https://www.boysgirlsclubs.com",
    "hours": "",
    "tags": [
      "after-school",
      "summer camp",
      "mentoring"
    ],
    "sourceUrl": "https://forsythnews.com/life/faith-charity/forsyth-countys-first-boys-girls-club-is-now-open-and-taking-registrations",
    "verified": false
  },
  {
    "id": "forsyth-4h",
    "name": "Forsyth County 4-H (UGA Extension)",
    "category": "youth",
    "audience": [
      "youth",
      "families"
    ],
    "description": "Students in grades 5 to 12 can join clubs, compete, and go to camp through UGA Extension’s youth program.",
    "address": "5110 Piney Grove Road, Cumming, GA 30040",
    "lat": 34.256,
    "lng": -84.171,
    "phone": "(770) 887-2418",
    "website": "https://extension.uga.edu/county-offices/forsyth/4-h-youth-development.html",
    "hours": "Office Mon–Fri 8 a.m.–5 p.m.",
    "tags": [
      "4-H",
      "leadership",
      "clubs"
    ],
    "sourceUrl": "https://extension.uga.edu/county-offices/forsyth/contact-us.html",
    "verified": true
  },
  {
    "id": "cumming-youth-council",
    "name": "City of Cumming Youth Council",
    "category": "youth",
    "audience": [
      "youth"
    ],
    "description": "High schoolers from Forsyth Central and Alliance Academy advise the City Council. Nine students meet each month.",
    "address": "100 Main Street, Cumming, GA 30040",
    "lat": 34.2079,
    "lng": -84.1394,
    "phone": "(770) 781-2010",
    "website": "https://www.cityofcumming.net/?p=8534",
    "hours": "Meets monthly",
    "tags": [
      "leadership",
      "civic",
      "high school"
    ],
    "sourceUrl": "https://cityofcumming.net/?p=8534",
    "verified": true
  },
  {
    "id": "cumming-aquatic-center",
    "name": "Cumming Aquatic Center",
    "category": "youth",
    "audience": [
      "families",
      "youth",
      "all"
    ],
    "description": "Swim indoors all year. There’s open swim, lessons for kids and adults, and practice space for swim teams.",
    "address": "201 Aquatic Circle, Cumming, GA 30040",
    "lat": 34.227,
    "lng": -84.1045,
    "phone": "(770) 781-1781",
    "website": "https://www.cityofcumming.net",
    "hours": "Seasonal; check city website",
    "tags": [
      "swimming",
      "lessons",
      "recreation"
    ],
    "sourceUrl": "https://exploregeorgia.org/cumming/water-sports-recreation/swimming/cumming-aquatic-center",
    "verified": true
  },
  {
    "id": "charles-place-senior-center",
    "name": "The Center at Charles Place (Forsyth County Senior Services)",
    "category": "seniors",
    "audience": [
      "seniors"
    ],
    "description": "Older adults can join activities, share a meal, and get connected to support services at the county’s main senior center.",
    "address": "595 Dahlonega Street, Cumming, GA 30040",
    "lat": 34.2163,
    "lng": -84.1352,
    "phone": "(770) 781-2178",
    "website": "https://www.forsythco.com/Seniors",
    "hours": "Information & referral Mon–Fri 8 a.m.–4:30 p.m.",
    "tags": [
      "senior center",
      "referral",
      "activities"
    ],
    "sourceUrl": "https://forsythco.com/DepartmentsOffices/SeniorServices/Services",
    "verified": true
  },
  {
    "id": "sexton-hall-enrichment-center",
    "name": "Sexton Hall Enrichment Center",
    "category": "seniors",
    "audience": [
      "seniors"
    ],
    "description": "Adults 50 and older take enrichment classes here, next to Sharon Springs Park. Respite care and meals are for adults 60 and older.",
    "address": "2115 Chloe Road, Cumming, GA 30041",
    "lat": 34.118,
    "lng": -84.16,
    "phone": "(770) 781-2178",
    "website": "https://www.forsythco.com/Seniors",
    "hours": "",
    "tags": [
      "senior center",
      "classes",
      "respite"
    ],
    "sourceUrl": "https://www.forsythco.com/News/forsyth-county-senior-services-expanding-respite-and-congregate-programs-to-sexton-hall-enrichment-center2",
    "verified": true
  },
  {
    "id": "hearthstone-lodge",
    "name": "Hearthstone Lodge Community Center",
    "category": "seniors",
    "audience": [
      "seniors"
    ],
    "description": "Programs for older adults in north Forsyth, run by Forsyth County Senior Services.",
    "address": "7305 Lanier Drive, Cumming, GA 30041",
    "lat": 34.299,
    "lng": -84.043,
    "phone": "(770) 781-2178",
    "website": "https://www.forsythco.com/Seniors",
    "hours": "",
    "tags": [
      "senior center",
      "north Forsyth"
    ],
    "sourceUrl": "https://www.forsythco.com/Seniors",
    "verified": false
  },
  {
    "id": "forsyth-meals-on-wheels",
    "name": "Meals on Wheels (Forsyth County Senior Services)",
    "category": "seniors",
    "audience": [
      "seniors"
    ],
    "description": "Homebound adults 60 and older can get meals delivered by volunteers each week. It’s free, though donations help.",
    "address": "595 Dahlonega Street, Cumming, GA 30040",
    "lat": 34.2163,
    "lng": -84.1352,
    "phone": "(770) 781-2178",
    "website": "https://forsythco.com/DepartmentsOffices/SeniorServices/Services",
    "hours": "Call Mon–Fri",
    "tags": [
      "meals on wheels",
      "homebound",
      "volunteer"
    ],
    "sourceUrl": "https://forsythco.com/DepartmentsOffices/SeniorServices/Services",
    "verified": true
  },
  {
    "id": "sawnee-mountain-preserve",
    "name": "Sawnee Mountain Preserve",
    "category": "parks",
    "audience": [
      "all",
      "families"
    ],
    "description": "Hike to the Indian Seats overlook for the best view in the county. The 963-acre preserve also has a visitor center with nature programs.",
    "address": "4075 Spot Road, Cumming, GA 30040",
    "lat": 34.2451,
    "lng": -84.1388,
    "phone": "(770) 781-2217",
    "website": "https://parks.forsythco.com",
    "hours": "Grounds 6 a.m.–7 p.m. (Nov–Feb), 6 a.m.–9:30 p.m. (Mar–Oct); visitor center Mon–Sat 8:30 a.m.–5 p.m.",
    "tags": [
      "hiking",
      "nature",
      "views"
    ],
    "sourceUrl": "https://parks.forsythco.com/Portals/3/Park Maps/24 - Sawnee Mountain Preserve.pdf",
    "verified": true,
    "featured": true
  },
  {
    "id": "central-park",
    "name": "Central Park",
    "category": "parks",
    "audience": [
      "all",
      "families",
      "youth"
    ],
    "description": "Bring the kids to the playgrounds, or play on the athletic fields. Walking trails loop the park.",
    "address": "2300 Keith Bridge Road, Cumming, GA 30040",
    "lat": 34.2315,
    "lng": -84.1,
    "phone": "(770) 781-2215",
    "website": "https://parks.forsythco.com",
    "hours": "7 a.m.–11 p.m.",
    "tags": [
      "playground",
      "sports",
      "trails"
    ],
    "sourceUrl": "https://parks.forsythco.com/Portals/3/Park Maps/5 - Central Park.pdf",
    "verified": true
  },
  {
    "id": "fowler-park",
    "name": "Fowler Park",
    "category": "parks",
    "audience": [
      "all",
      "families",
      "youth"
    ],
    "description": "Play ball, visit the recreation center, or pick up the Big Creek Greenway right from the park.",
    "address": "4110 Carolene Way, Cumming, GA 30040",
    "lat": 34.188,
    "lng": -84.171,
    "phone": "(770) 781-2215",
    "website": "https://parks.forsythco.com",
    "hours": "",
    "tags": [
      "playground",
      "greenway",
      "sports"
    ],
    "sourceUrl": "https://parks.forsythco.com/Portals/3/Park Maps/9 - Fowler Park Map.pdf",
    "verified": true
  },
  {
    "id": "cumming-city-center",
    "name": "Cumming City Center",
    "category": "parks",
    "audience": [
      "all",
      "families",
      "newcomers"
    ],
    "description": "Catch a concert or a market at the Lou Sobh Amphitheater, then let the kids loose on the playground. Parking in the deck is free.",
    "address": "423 Canton Road, Cumming, GA 30040",
    "lat": 34.2172,
    "lng": -84.156,
    "phone": "(770) 781-2010",
    "website": "https://www.cummingcitycenter.com",
    "hours": "6 a.m.–7 p.m. (Nov–Feb); 6 a.m.–9:30 p.m. (Mar–Oct)",
    "tags": [
      "events",
      "playground",
      "amphitheater",
      "trails"
    ],
    "sourceUrl": "https://cityofcumming.net/?p=9228",
    "verified": true
  },
  {
    "id": "big-creek-greenway",
    "name": "Big Creek Greenway",
    "category": "parks",
    "audience": [
      "all",
      "families"
    ],
    "description": "Walk, run, or bike a paved trail along Big Creek. Trailheads are at Fowler Park, Sawnee Mountain, and Bethelview Road.",
    "address": "5120 Bethelview Road, Cumming, GA 30040",
    "lat": 34.176,
    "lng": -84.197,
    "phone": "(770) 781-2215",
    "website": "https://parks.forsythco.com",
    "hours": "",
    "tags": [
      "trail",
      "biking",
      "walking"
    ],
    "sourceUrl": "https://www.traillink.com/gdbkpdf/trail/6407967/big-creek-greenway63921712207622-2026.pdf",
    "verified": false
  },
  {
    "id": "mary-alice-park",
    "name": "Mary Alice Park (Lake Lanier)",
    "category": "parks",
    "audience": [
      "all",
      "families"
    ],
    "description": "Swim at the city’s beach on Lake Lanier, have a picnic, or launch a boat from the public ramp.",
    "address": "1820 Mary Alice Park Road, Cumming, GA 30041",
    "lat": 34.2155,
    "lng": -84.087,
    "phone": "(770) 781-3491",
    "website": "https://www.cityofcumming.net",
    "hours": "Seasonal 8 a.m.–9 p.m.; boat ramp open 24 hours",
    "tags": [
      "Lake Lanier",
      "beach",
      "boat ramp"
    ],
    "sourceUrl": "https://lakelanier.com/content/directory/parks/mary-alice-park/",
    "verified": true
  },
  {
    "id": "cumming-city-hall",
    "name": "City of Cumming City Hall",
    "category": "civic",
    "audience": [
      "all",
      "newcomers"
    ],
    "description": "Pay a utility bill, request records, or speak at a City Council meeting on the third Tuesday of the month.",
    "address": "100 Main Street, Cumming, GA 30040",
    "lat": 34.2079,
    "lng": -84.1394,
    "phone": "(770) 781-2010",
    "website": "https://www.cityofcumming.net",
    "hours": "Mon–Fri 8 a.m.–5 p.m.",
    "tags": [
      "city government",
      "council",
      "utilities"
    ],
    "sourceUrl": "https://www.cityofcumming.net/?p=8667",
    "verified": true
  },
  {
    "id": "forsyth-county-administration",
    "name": "Forsyth County Administration – Freedom Park Campus",
    "category": "civic",
    "audience": [
      "all",
      "newcomers"
    ],
    "description": "Building permits, planning, and water and sewer service are all handled at the county’s new campus, which opened in March 2026.",
    "address": "2435 Freedom Parkway, Cumming, GA 30041",
    "lat": 34.239,
    "lng": -84.1045,
    "phone": "(770) 781-2101",
    "website": "https://www.forsythco.com",
    "hours": "",
    "tags": [
      "county government",
      "permits",
      "planning"
    ],
    "sourceUrl": "https://www.forsythco.com/News/forsyth-county-administration-offices-have-moved-what-to-know",
    "verified": true
  },
  {
    "id": "forsyth-voter-registration",
    "name": "Forsyth County Voter Registrations & Elections",
    "category": "civic",
    "audience": [
      "all",
      "youth",
      "newcomers"
    ],
    "description": "Register to vote, check your registration, or vote early. Students can pre-register at 17½ if they’ll be 18 by Election Day.",
    "address": "1201 Sawnee Drive, Cumming, GA 30040",
    "lat": 34.2205,
    "lng": -84.137,
    "phone": "(770) 781-2118",
    "website": "https://forsythco.com/vote",
    "hours": "Mon–Fri 8 a.m.–4:30 p.m.",
    "tags": [
      "voting",
      "elections",
      "registration"
    ],
    "sourceUrl": "https://www.forsythco.com/Departments-Offices/Voter-Registrations-Elections",
    "verified": true
  },
  {
    "id": "cumming-forsyth-chamber",
    "name": "Cumming-Forsyth County Chamber of Commerce",
    "category": "civic",
    "audience": [
      "all",
      "newcomers"
    ],
    "description": "Moving here or starting a business? The chamber has relocation guides and connects local businesses.",
    "address": "212 Webb Street, Cumming, GA 30040",
    "lat": 34.2085,
    "lng": -84.138,
    "phone": "(770) 887-6461",
    "website": "https://www.focochamber.org",
    "hours": "",
    "tags": [
      "business",
      "newcomers",
      "networking"
    ],
    "sourceUrl": "https://www.focochamber.org/our-chamber/",
    "verified": true
  },
  {
    "id": "united-way-forsyth",
    "name": "United Way of Forsyth County",
    "category": "civic",
    "audience": [
      "all",
      "families",
      "youth"
    ],
    "description": "Find volunteer opportunities across the county. United Way also funds local programs for health, education, and financial help.",
    "address": "240 Elm Street, Cumming, GA 30040",
    "lat": 34.2062,
    "lng": -84.138,
    "phone": "(770) 781-4110",
    "website": "https://www.unitedway.org/local/united-states/georgia/united-way-of-forsyth-county-inc",
    "hours": "",
    "tags": [
      "volunteer",
      "nonprofit",
      "community"
    ],
    "sourceUrl": "https://www.unitedway.org/local/united-states/georgia/united-way-of-forsyth-county-inc",
    "verified": false
  },
  {
    "id": "forsyth-county-sheriff",
    "name": "Forsyth County Sheriff’s Office",
    "category": "safety",
    "audience": [
      "all",
      "spanish"
    ],
    "description": "Call 911 in an emergency. For anything else, the 24-hour non-emergency line is (770) 781-3087. The Sheriff’s Office patrols unincorporated Forsyth County.",
    "address": "100 East Courthouse Square, Cumming, GA 30040",
    "lat": 34.2071,
    "lng": -84.1398,
    "phone": "(770) 781-2222",
    "website": "https://www.forsythsheriff.org",
    "hours": "HQ Mon–Fri 8:30 a.m.–5 p.m.",
    "tags": [
      "sheriff",
      "law enforcement",
      "non-emergency"
    ],
    "sourceUrl": "https://www.forsythsheriff.org/resources/contact-us/",
    "verified": true
  },
  {
    "id": "cumming-police-department",
    "name": "Cumming Police Department",
    "category": "safety",
    "audience": [
      "all"
    ],
    "description": "Police for the City of Cumming, now in a new precinct at Cumming City Center. Call 911 in an emergency.",
    "address": "Cumming City Center, 423 Canton Road, Cumming, GA 30040",
    "lat": 34.2165,
    "lng": -84.1545,
    "phone": "(770) 781-2000",
    "website": "https://www.cityofcumming.net",
    "hours": "",
    "tags": [
      "police",
      "city",
      "public safety"
    ],
    "sourceUrl": "https://www.forsythnews.com/news/public-safety/cumming-police-department-cuts-ribbon-on-new-precinct-at-city-center-honors-fallen-deputies/",
    "verified": false
  },
  {
    "id": "forsyth-county-fire",
    "name": "Forsyth County Fire Department",
    "category": "safety",
    "audience": [
      "all",
      "families"
    ],
    "description": "Book a car seat check or a fire safety class with the county’s fire and EMS department.",
    "address": "3520 Settingdown Road, Cumming, GA 30028",
    "lat": 34.277,
    "lng": -84.183,
    "phone": "(770) 781-2180",
    "website": "https://www.forsythco.com/Departments-Offices/Fire-Department",
    "hours": "Admin Mon–Fri 8 a.m.–4:30 p.m.",
    "tags": [
      "fire",
      "EMS",
      "safety education"
    ],
    "sourceUrl": "https://www.forsythco.com/Departments-Offices/Fire-Department/Locations",
    "verified": true
  },
  {
    "id": "forsyth-911-center",
    "name": "Forsyth County 911 Communications Center",
    "category": "safety",
    "audience": [
      "all"
    ],
    "description": "Every 911 call in Forsyth County is answered here. For non-emergency dispatch, call (770) 781-3087.",
    "address": "3520 Settingdown Road, Cumming, GA 30028",
    "lat": 34.277,
    "lng": -84.183,
    "phone": "(770) 781-3087",
    "website": "https://forsythco.com/DepartmentsOffices/911Center",
    "hours": "24/7",
    "tags": [
      "911",
      "dispatch",
      "emergency"
    ],
    "sourceUrl": "https://www.forsythsheriff.org/resources/contact-us/",
    "verified": true
  },
  {
    "id": "family-haven",
    "name": "Family Haven (Domestic Violence Shelter)",
    "category": "safety",
    "audience": [
      "all",
      "families",
      "spanish"
    ],
    "description": "If you are experiencing domestic violence, call the 24-hour hotline. Family Haven offers free, confidential shelter, legal advocacy, and help with protective orders.",
    "address": "Confidential location (call the 24-hour hotline)",
    "lat": null,
    "lng": null,
    "phone": "(770) 887-1121",
    "website": "https://www.familyhavenga.org",
    "hours": "24/7 hotline",
    "tags": [
      "domestic violence",
      "shelter",
      "hotline",
      "confidential"
    ],
    "sourceUrl": "https://www.domesticshelters.org/help/ga/cumming/30028/family-haven",
    "verified": true,
    "confidential": true
  }
];

window.EVENTS = [
  {
    "id": "slide-into-sundays",
    "title": "Slide Into Sundays at City Center",
    "category": "youth",
    "start": "2026-11-01T12:00",
    "end": "2026-11-01T17:00",
    "location": "Cumming City Center, 423 Canton Road, Cumming, GA 30040",
    "description": "A weekly afternoon of bounce houses, slides, and games for kids, run with Jump N Jacks Moonwalks. Admission is $10 per child.",
    "recurring": "Sundays (listed Nov 1 and Nov 8)",
    "website": "https://www.cityofcumming.net/events/list",
    "sourceUrl": "https://www.cityofcumming.net/events/list",
    "verified": true
  },
  {
    "id": "general-election-2026",
    "title": "Georgia General Election Day",
    "category": "civic",
    "start": "2026-11-03T07:00",
    "end": "2026-11-03T19:00",
    "location": "Your assigned Forsyth County polling place",
    "description": "Polls are open statewide for the 2026 general election. Check your polling place on the Georgia My Voter Page.",
    "recurring": "",
    "website": "https://forsythco.com/vote",
    "sourceUrl": "https://georgia.gov/georgia-election-guide",
    "verified": true
  },
  {
    "id": "red-cross-blood-drive-nov",
    "title": "American Red Cross Blood Drive",
    "category": "health",
    "start": "2026-11-06T10:00",
    "end": "2026-11-06T15:00",
    "location": "Cumming Library Meeting Room, 585 Dahlonega Street, Cumming, GA 30040",
    "description": "Donors can give blood at the downtown library. Make an appointment at RedCrossBlood.org and bring a photo ID.",
    "recurring": "Periodic Fridays",
    "website": "https://www.redcrossblood.org",
    "sourceUrl": "https://www.forsythpl.org/event/15045234?source=ev",
    "verified": false,
    "dateNote": "Based on last year’s schedule, when drives were held on the first Friday of the month. Check RedCrossBlood.org for the 2026 date."
  },
  {
    "id": "veterans-day-ceremony",
    "title": "City of Cumming Veterans Day Ceremony",
    "category": "civic",
    "start": "2026-11-11T11:00",
    "end": null,
    "location": "Lou Sobh Amphitheater, Cumming City Center, 423 Canton Road, Cumming, GA 30040",
    "description": "An annual tribute to local veterans with speakers and music, held at the City Center since 2023.",
    "recurring": "Annual (Nov 11)",
    "website": "https://www.cityofcumming.net",
    "sourceUrl": "https://www.forsythnews.com/life/events/look-cumming-celebrates-veterans-day-with-annual-tribute-at-cumming-city-center/",
    "verified": false,
    "dateNote": "Held on November 11 each year. The time shown is last year’s; the 2026 time hasn’t been announced yet."
  },
  {
    "id": "steam-tractor-expo",
    "title": "Cumming Steam, Antique Tractor & Gas Engine Exposition",
    "category": "civic",
    "start": "2026-11-13T08:00",
    "end": "2026-11-14T16:00",
    "location": "Cumming Fairgrounds, 235 Castleberry Road, Cumming, GA 30040",
    "description": "A two-day show of working steam engines, antique tractors, and farm machinery, with a parade of power and a heritage village. Admission is $5.",
    "recurring": "Annual (November)",
    "website": "https://www.cummingfair.net/events-calendar",
    "sourceUrl": "https://www.cummingfair.net/events-calendar",
    "verified": true
  },
  {
    "id": "city-council-nov",
    "title": "Cumming City Council Regular Meeting",
    "category": "civic",
    "start": "2026-11-17T18:00",
    "end": null,
    "location": "Council Chambers (3rd floor), Cumming City Hall, 100 Main Street, Cumming, GA 30040",
    "description": "Residents can attend the monthly council meeting, which includes a public comment period. The agenda is posted the Monday before.",
    "recurring": "Third Tuesday of every month",
    "website": "https://www.cityofcumming.net/meetings",
    "sourceUrl": "https://www.cityofcumming.net/meetings",
    "verified": true
  },
  {
    "id": "nights-of-lights",
    "title": "Nights of Lights at the Cumming Fairgrounds",
    "category": "parks",
    "start": "2026-11-20T17:00",
    "end": "2026-12-27T22:00",
    "location": "Cumming Fairgrounds, 235 Castleberry Road, Cumming, GA 30040",
    "description": "A holiday light display at the fairgrounds that runs nightly through the season.",
    "recurring": "Nightly, Nov 20–Dec 27",
    "website": "https://www.cummingfair.net/events-calendar",
    "sourceUrl": "https://www.cummingfair.net/events-calendar",
    "verified": true
  },
  {
    "id": "winter-holiday-market",
    "title": "City Center Winter Holiday Market",
    "category": "civic",
    "start": "2026-11-21T10:00",
    "end": "2026-11-21T17:00",
    "location": "Cumming City Center, 423 Canton Road, Cumming, GA 30040",
    "description": "More than 100 local vendors, live music, kids’ activities, and photos with Santa. Entry is free.",
    "recurring": "Annual",
    "website": "https://www.cityofcumming.net/event/city-center-winter-holiday-market",
    "sourceUrl": "https://www.cityofcumming.net/event/city-center-winter-holiday-market",
    "verified": true
  },
  {
    "id": "tree-lighting",
    "title": "City Center Christmas Tree Lighting",
    "category": "civic",
    "start": "2026-11-21T18:00",
    "end": "2026-11-21T19:00",
    "location": "Cumming City Center, 423 Canton Road, Cumming, GA 30040",
    "description": "The city lights its Christmas tree with a short program and a concert right after the holiday market.",
    "recurring": "Annual",
    "website": "https://www.cityofcumming.net",
    "sourceUrl": "https://www.cityofcumming.net/event/city-center-christmas-tree-lighting-2",
    "verified": false,
    "dateNote": "Last year the lighting followed the Winter Holiday Market at about 6 p.m. The time shown is last year’s; the 2026 time hasn’t been announced yet."
  },
  {
    "id": "general-runoff-2026",
    "title": "Georgia General Election Runoff (if needed)",
    "category": "civic",
    "start": "2026-12-01T07:00",
    "end": "2026-12-01T19:00",
    "location": "Your assigned Forsyth County polling place",
    "description": "A runoff is held for any race where no candidate won more than 50% of the vote on November 3.",
    "recurring": "",
    "website": "https://forsythco.com/vote",
    "sourceUrl": "https://georgia.gov/georgia-election-guide",
    "verified": true
  },
  {
    "id": "christmas-parade",
    "title": "City of Cumming Christmas Parade",
    "category": "civic",
    "start": "2026-12-12T17:00",
    "end": "2026-12-12T18:30",
    "location": "Forsyth Central High School to the Cumming Fairgrounds (Tribble Gap / Castleberry Road)",
    "description": "An evening holiday parade of floats, bands, and community groups from Forsyth Central High School to the fairgrounds.",
    "recurring": "Annual (2nd Saturday of December)",
    "website": "https://www.cityofcumming.net",
    "sourceUrl": "https://www.cummingfair.net/events-calendar",
    "verified": true
  },
  {
    "id": "city-council-2026-12",
    "title": "Cumming City Council Regular Meeting",
    "category": "civic",
    "start": "2026-12-15T18:00",
    "end": null,
    "location": "Council Chambers (3rd floor), Cumming City Hall, 100 Main Street, Cumming, GA 30040",
    "description": "Residents can attend the monthly council meeting, which includes a public comment period. The agenda is posted the Monday before.",
    "recurring": "Third Tuesday of every month",
    "website": "https://www.cityofcumming.net/meetings",
    "sourceUrl": "https://www.cityofcumming.net/meetings",
    "verified": true
  },
  {
    "id": "farmers-market-winter",
    "title": "Cumming Farmers Market – Winter Season",
    "category": "food",
    "start": "2027-01-02T08:00",
    "end": "2027-01-02T11:00",
    "location": "Cumming City Center, 423 Canton Road, Cumming, GA 30040",
    "description": "Local farmers and makers sell produce, meats, baked goods, and crafts every Saturday morning at the City Center.",
    "recurring": "Every Saturday, late Dec–May",
    "website": "https://discoverfoco.com/event/cumming-farmers-market-winter",
    "sourceUrl": "https://discoverfoco.com/event/cumming-farmers-market-winter",
    "verified": false,
    "dateNote": "Based on last season, which ran on Saturday mornings from late December to May. Check the city calendar for this season’s start date and hours."
  },
  {
    "id": "city-council-2027-01",
    "title": "Cumming City Council Regular Meeting",
    "category": "civic",
    "start": "2027-01-19T18:00",
    "end": null,
    "location": "Council Chambers (3rd floor), Cumming City Hall, 100 Main Street, Cumming, GA 30040",
    "description": "Residents can attend the monthly council meeting, which includes a public comment period. The agenda is posted the Monday before.",
    "recurring": "Third Tuesday of every month",
    "website": "https://www.cityofcumming.net/meetings",
    "sourceUrl": "https://www.cityofcumming.net/meetings",
    "verified": true
  },
  {
    "id": "city-council-2027-02",
    "title": "Cumming City Council Regular Meeting",
    "category": "civic",
    "start": "2027-02-16T18:00",
    "end": null,
    "location": "Council Chambers (3rd floor), Cumming City Hall, 100 Main Street, Cumming, GA 30040",
    "description": "Residents can attend the monthly council meeting, which includes a public comment period. The agenda is posted the Monday before.",
    "recurring": "Third Tuesday of every month",
    "website": "https://www.cityofcumming.net/meetings",
    "sourceUrl": "https://www.cityofcumming.net/meetings",
    "verified": true
  },
  {
    "id": "hop-into-easter",
    "title": "Hop into Easter at Cumming City Center",
    "category": "youth",
    "start": "2027-03-14T15:00",
    "end": "2027-03-14T18:00",
    "location": "Cumming City Center, 423 Canton Road, Cumming, GA 30040",
    "description": "A free family Easter celebration with age-grouped egg hunts every 30 minutes, inflatables, and games.",
    "recurring": "Annual (spring)",
    "website": "https://www.cityofcumming.net",
    "sourceUrl": "https://exploregeorgia.org/cumming/events/entertainment/hop-into-easter-at-cumming-city-center",
    "verified": false,
    "dateNote": "Based on last year, when it was held two weeks before Easter. The 2027 date hasn’t been announced yet."
  },
  {
    "id": "city-council-2027-03",
    "title": "Cumming City Council Regular Meeting",
    "category": "civic",
    "start": "2027-03-16T18:00",
    "end": null,
    "location": "Council Chambers (3rd floor), Cumming City Hall, 100 Main Street, Cumming, GA 30040",
    "description": "Residents can attend the monthly council meeting, which includes a public comment period. The agenda is posted the Monday before.",
    "recurring": "Third Tuesday of every month",
    "website": "https://www.cityofcumming.net/meetings",
    "sourceUrl": "https://www.cityofcumming.net/meetings",
    "verified": true
  },
  {
    "id": "spring-market",
    "title": "City Center Spring Festival & Market",
    "category": "civic",
    "start": "2027-04-17T10:00",
    "end": "2027-04-17T17:00",
    "location": "Cumming City Center, 423 Canton Road, Cumming, GA 30040",
    "description": "A spring market with more than 100 local vendors, live music, and a kids’ zone. Entry is free.",
    "recurring": "Annual (April)",
    "website": "https://www.cityofcumming.net/event/city-center-spring-market",
    "sourceUrl": "https://www.cityofcumming.net/event/city-center-spring-market",
    "verified": false,
    "dateNote": "Based on last year, when it was held on the third Saturday in April."
  },
  {
    "id": "city-council-2027-04",
    "title": "Cumming City Council Regular Meeting",
    "category": "civic",
    "start": "2027-04-20T18:00",
    "end": null,
    "location": "Council Chambers (3rd floor), Cumming City Hall, 100 Main Street, Cumming, GA 30040",
    "description": "Residents can attend the monthly council meeting, which includes a public comment period. The agenda is posted the Monday before.",
    "recurring": "Third Tuesday of every month",
    "website": "https://www.cityofcumming.net/meetings",
    "sourceUrl": "https://www.cityofcumming.net/meetings",
    "verified": true
  },
  {
    "id": "aging-well-expo",
    "title": "Aging Well Expo",
    "category": "seniors",
    "start": "2027-04-22T10:00",
    "end": "2027-04-22T14:00",
    "location": "Forsyth Conference Center at Lanier Tech, 3410 Ronald Reagan Boulevard, Cumming, GA 30041",
    "description": "Forsyth County Senior Services’ free expo, with 80+ booths of health, housing, and aging resources for older adults and caregivers.",
    "recurring": "Annual (spring)",
    "website": "https://www.forsythco.com/DepartmentsOffices/SeniorServices/Expo",
    "sourceUrl": "https://www.forsythco.com/News/senior-services-hosting-22nd-annual-aging-well-expo-on-april-23",
    "verified": false,
    "dateNote": "Based on last year, when it was held on the fourth Thursday in April."
  },
  {
    "id": "city-council-2027-05",
    "title": "Cumming City Council Regular Meeting",
    "category": "civic",
    "start": "2027-05-18T18:00",
    "end": null,
    "location": "Council Chambers (3rd floor), Cumming City Hall, 100 Main Street, Cumming, GA 30040",
    "description": "Residents can attend the monthly council meeting, which includes a public comment period. The agenda is posted the Monday before.",
    "recurring": "Third Tuesday of every month",
    "website": "https://www.cityofcumming.net/meetings",
    "sourceUrl": "https://www.cityofcumming.net/meetings",
    "verified": true
  },
  {
    "id": "memorial-day-ceremony",
    "title": "City of Cumming Memorial Day Ceremony",
    "category": "civic",
    "start": "2027-05-28T11:00",
    "end": "2027-05-28T12:30",
    "location": "Lou Sobh Amphitheater, Cumming City Center, 423 Canton Road, Cumming, GA 30040",
    "description": "A ceremony honoring fallen service members with speakers, patriotic music, and the dedication of flags on the Avenue of Flags.",
    "recurring": "Annual (Friday before Memorial Day)",
    "website": "https://www.cityofcumming.net",
    "sourceUrl": "https://www.forsythnews.com/life/events/250-years-of-sacrifice-cumming-honors-fallen-soldiers-at-annual-memorial-day-ceremony/",
    "verified": false,
    "dateNote": "Held on the Friday before Memorial Day in past years."
  },
  {
    "id": "summer-reading-kickoff",
    "title": "Forsyth County Public Library Summer Reading Kickoff",
    "category": "education",
    "start": "2027-06-04T10:00",
    "end": null,
    "location": "All Forsyth County Public Library branches",
    "description": "The library’s free summer reading challenge for all ages begins, with dozens of free programs across the branches.",
    "recurring": "Annual (June–July)",
    "website": "https://www.forsythpl.org",
    "sourceUrl": "https://www.forsythpl.org",
    "verified": false,
    "dateNote": "Based on past years. Check the library calendar for the 2027 date."
  },
  {
    "id": "city-council-2027-06",
    "title": "Cumming City Council Regular Meeting",
    "category": "civic",
    "start": "2027-06-15T18:00",
    "end": null,
    "location": "Council Chambers (3rd floor), Cumming City Hall, 100 Main Street, Cumming, GA 30040",
    "description": "Residents can attend the monthly council meeting, which includes a public comment period. The agenda is posted the Monday before.",
    "recurring": "Third Tuesday of every month",
    "website": "https://www.cityofcumming.net/meetings",
    "sourceUrl": "https://www.cityofcumming.net/meetings",
    "verified": true
  },
  {
    "id": "city-council-2027-07",
    "title": "Cumming City Council Regular Meeting",
    "category": "civic",
    "start": "2027-07-20T18:00",
    "end": null,
    "location": "Council Chambers (3rd floor), Cumming City Hall, 100 Main Street, Cumming, GA 30040",
    "description": "Residents can attend the monthly council meeting, which includes a public comment period. The agenda is posted the Monday before.",
    "recurring": "Third Tuesday of every month",
    "website": "https://www.cityofcumming.net/meetings",
    "sourceUrl": "https://www.cityofcumming.net/meetings",
    "verified": true
  },
  {
    "id": "city-council-2027-08",
    "title": "Cumming City Council Regular Meeting",
    "category": "civic",
    "start": "2027-08-17T18:00",
    "end": null,
    "location": "Council Chambers (3rd floor), Cumming City Hall, 100 Main Street, Cumming, GA 30040",
    "description": "Residents can attend the monthly council meeting, which includes a public comment period. The agenda is posted the Monday before.",
    "recurring": "Third Tuesday of every month",
    "website": "https://www.cityofcumming.net/meetings",
    "sourceUrl": "https://www.cityofcumming.net/meetings",
    "verified": true
  }
];

/* Real quotes only. Collect them from beta testers (classmates, neighbors, a librarian) with permission.
   The "What neighbors say" section stays hidden until at least one entry exists. Example shape:
   { quote: "I found a food pantry open on Saturday in under a minute.", name: "Maria G.", role: "Cumming resident" } */
window.TESTIMONIALS = [];
