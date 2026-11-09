/*
  The floor plans Stoneward sells, all built by Irontown Modular.

  Add, remove or edit plans here. Keep the field names the same so the
  plan cards and filters on adus.html keep working.
  Fields: name, series, category, sqft (number), beds, baths, photo, plan,
  type, footprint.
  - series groups the plans on adus.html. Plans in a series stay together.
  - category is "adu" (about 1,000 sq ft and under) or "home".
  - photo is the exterior shown on the card, plan is the floor plan shown
    on hover. Both are files in assets/img.
  - beds and baths are strings. A range is written with a hyphen.
  Specs come from the model pages on Irontown's website.
  No prices belong in this file.
*/
window.IRONTOWN_PLANS = [
  { name: "Cabana 200", series: "Cabana", category: "adu", sqft: 200, beds: "1", baths: "0-1", photo: "cabana-200.jpg", plan: "cabana-200-plan.jpg", type: "Studio cabin, ADU or park model", footprint: "10' x 20'" },
  { name: "Cabana 300", series: "Cabana", category: "adu", sqft: 330, beds: "1", baths: "1", photo: "cabana-300.jpg", plan: "cabana-300-plan.jpg", type: "Studio cabin or ADU", footprint: "12' x 27'6\"" },
  { name: "Cabana 400", series: "Cabana", category: "adu", sqft: 397, beds: "1", baths: "1", photo: "cabana-400.jpg", plan: "cabana-400-plan.jpg", type: "One-bedroom cabin, ADU or park model", footprint: "14' x 32'" },
  { name: "Cabana 500", series: "Cabana", category: "adu", sqft: 497, beds: "1", baths: "1", photo: "cabana-500.jpg", plan: "cabana-500-plan.jpg", type: "Single-story cabin or ADU", footprint: "14' x 36'" },
  { name: "Cabana 2 Bed", series: "Cabana", category: "adu", sqft: 638, beds: "2", baths: "1-2", photo: "cabana-2-bed.jpg", plan: "cabana-2-bed-plan.jpg", type: "Single-story cabin or ADU", footprint: "14'6\" x 44'" },
  { name: "Mysa 200", series: "Mysa", category: "adu", sqft: 200, beds: "1", baths: "0-1", photo: "mysa-200.jpg", plan: "mysa-200-plan.jpg", type: "Studio cabin, ADU or park model", footprint: "10' x 20'" },
  { name: "Mysa 300", series: "Mysa", category: "adu", sqft: 330, beds: "1", baths: "1", photo: "mysa-300.jpg", plan: "mysa-300-plan.jpg", type: "Studio cabin or ADU", footprint: "12' x 27'6\"" },
  { name: "Mysa 400", series: "Mysa", category: "adu", sqft: 397, beds: "1", baths: "1", photo: "mysa-400.jpg", plan: "mysa-400-plan.jpg", type: "One-bedroom cabin, ADU or park model", footprint: "14' x 32'" },
  { name: "Mysa 500", series: "Mysa", category: "adu", sqft: 497, beds: "1", baths: "1", photo: "mysa-500.jpg", plan: "mysa-500-plan.jpg", type: "Single-story cabin or ADU", footprint: "14' x 36'" },
  { name: "Sledhaus 200", series: "Sledhaus", category: "adu", sqft: 200, beds: "1", baths: "0-1", photo: "sledhaus-200.jpg", plan: "sledhaus-200-plan.jpg", type: "Studio cabin, ADU or park model", footprint: "10' x 20'" },
  { name: "Sledhaus 300", series: "Sledhaus", category: "adu", sqft: 384, beds: "1", baths: "1", photo: "sledhaus-300.jpg", plan: "sledhaus-300-plan.jpg", type: "Studio cabin, ADU or park model", footprint: "12' x 32'" },
  { name: "Sledhaus 400", series: "Sledhaus", category: "adu", sqft: 397, beds: "1", baths: "1", photo: "sledhaus-400.jpg", plan: "sledhaus-400-plan.jpg", type: "Cabin, ADU or park model with optional loft and deck", footprint: "14' x 32'" },
  { name: "Sledhaus 500", series: "Sledhaus", category: "adu", sqft: 580, beds: "1", baths: "1", photo: "sledhaus-500.jpg", plan: "sledhaus-500-plan.jpg", type: "Cabin or ADU with optional loft and deck", footprint: "14' x 45'" },
  { name: "Skyview 400", series: "Skyview", category: "adu", sqft: 398, beds: "1", baths: "1", photo: "skyview-400.jpg", plan: "skyview-400-plan.jpg", type: "Cabin, ADU or park model with loft and deck", footprint: "13' x 33'" },
  { name: "Torrey Flats", series: "Torrey Flats", category: "adu", sqft: 696, beds: "1-2", baths: "1", photo: "torrey-flats.jpg", plan: "torrey-flats-plan.jpg", type: "Single-story cabin or ADU", footprint: "15' x 48'" },
  { name: "Morada 800", series: "Morada", category: "adu", sqft: 793, beds: "1-2", baths: "1-2", photo: "morada-800.jpg", plan: "morada-800-plan.jpg", type: "Single-story home", footprint: "39' x 21'" },
  { name: "Morada 1000", series: "Morada", category: "adu", sqft: 989, beds: "1-2", baths: "1-2", photo: "morada-1000.jpg", plan: "morada-1000-plan.jpg", type: "Single-story home", footprint: "43' x 24'" },
  { name: "Rabbit 800", series: "Rabbit", category: "adu", sqft: 799, beds: "2", baths: "1-2", photo: "rabbit-800.jpg", plan: "rabbit-800-plan.jpg", type: "Two-story modern", footprint: "14'6\" x 29'" },
  { name: "Rabbit 1000", series: "Rabbit", category: "adu", sqft: 1002, beds: "2", baths: "1-2", photo: "rabbit-1000.jpg", plan: "rabbit-1000-plan.jpg", type: "Two-story traditional", footprint: "38' x 16'" },
  { name: "Eagle Landing 1000", series: "Eagle Landing", category: "adu", sqft: 1000, beds: "2", baths: "2", photo: "eagle-landing-1000.jpg", plan: "eagle-landing-1000-plan.jpg", type: "Traditional rambler", footprint: "54' x 19'8\"" },
  { name: "Eagle Landing 1220", series: "Eagle Landing", category: "home", sqft: 1220, beds: "3", baths: "2", photo: "eagle-landing-1220.jpg", plan: "eagle-landing-1220-plan.jpg", type: "Traditional rambler", footprint: "65' x 20'" },
  { name: "Eagle Landing 1976", series: "Eagle Landing", category: "home", sqft: 1976, beds: "5", baths: "2.5", photo: "eagle-landing-1976.jpg", plan: "eagle-landing-1976-plan.jpg", type: "Traditional rambler", footprint: "65' x 20'" },
  { name: "Walker", series: "Walker", category: "home", sqft: 1165, beds: "2", baths: "2", photo: "walker.jpg", plan: "walker-plan.jpg", type: "Traditional rambler", footprint: "42' x 27'" },
  { name: "San Conejo", series: "San Conejo", category: "home", sqft: 1250, beds: "2", baths: "2", photo: "san-conejo.jpg", plan: "san-conejo-plan.jpg", type: "Single-story Spanish", footprint: "46' x 28'" },
  { name: "Aspen", series: "Aspen", category: "home", sqft: 1255, beds: "3", baths: "2", photo: "aspen.jpg", plan: "aspen-plan.jpg", type: "Rambler cabin", footprint: "24' x 52'" },
  { name: "Berkeley 1300", series: "Berkeley", category: "home", sqft: 1268, beds: "3", baths: "2", photo: "berkeley-1300.jpg", plan: "berkeley-1300-plan.jpg", type: "Two-story beachfront", footprint: "48' x 15'" },
  { name: "Bridger 1300", series: "Berkeley", category: "home", sqft: 1268, beds: "3", baths: "2", photo: "bridger-1300.jpg", plan: "bridger-1300-plan.jpg", type: "Two-story modern", footprint: "48' x 15'" },
  { name: "Donner 1300", series: "Donner", category: "home", sqft: 1315, beds: "3", baths: "2", photo: "donner-1300.jpg", plan: "donner-1300-plan.jpg", type: "Single-story modern", footprint: "56' x 24'6\"" },
  { name: "Donner 1560", series: "Donner", category: "home", sqft: 1576, beds: "3", baths: "2-2.5", photo: "donner-1560.jpg", plan: "donner-1560-plan.jpg", type: "Single-story modern", footprint: "64'6\" x 36'6\"" },
  { name: "Spirit", series: "Spirit", category: "home", sqft: 1320, beds: "2", baths: "2", photo: "spirit.jpg", plan: "spirit-plan.jpg", type: "Single-story modern", footprint: "46' x 28'" },
  { name: "Bunkhouse", series: "Bunkhouse", category: "home", sqft: 1588, beds: "3", baths: "2", photo: "bunkhouse.jpg", plan: "bunkhouse-plan.jpg", type: "Two-story cabin", footprint: "36' x 26'" },
  { name: "Thatcher", series: "Thatcher", category: "home", sqft: 1860, beds: "4", baths: "2", photo: "thatcher.jpg", plan: "thatcher-plan.jpg", type: "Craftsman traditional", footprint: "48' x 63'" },
  { name: "Mill Creek", series: "Mill Creek", category: "home", sqft: 2198, beds: "3", baths: "2", photo: "mill-creek.jpg", plan: "mill-creek-plan.jpg", type: "Traditional rambler", footprint: "55' x 53'" }
];
