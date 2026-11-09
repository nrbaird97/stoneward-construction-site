/*
  The Irontown Modular floor plans Stoneward sells.

  Add, remove or edit plans here. Keep the field names the same so the
  plan cards and filters on adus.html keep working.
  Fields: name, sqft (number), beds, baths, photo and plan (files in assets/img).
  photo is the exterior shown on the card, plan is the floor plan shown on hover.
  series groups the plans on adus.html.
  Optional: type (style of home) and footprint (overall size), both from
  Irontown's current Utah Originals sheet. Leave them out if unknown.
  No prices belong in this file.
*/
window.IRONTOWN_PLANS = [
  { name: "Mysa 500", series: "Mysa",            sqft: 497,  beds: "1",   baths: "1",   photo: "mysa-500.jpg", plan: "mysa-500-plan.jpg",           type: "Single-story cabin or ADU", footprint: "14' x 36'" },
  { name: "Cabana 500", series: "Cabana",          sqft: 497,  beds: "1",   baths: "1",   photo: "cabana-500.jpg", plan: "cabana-500-plan.jpg",         type: "Single-story cabin or ADU", footprint: "14' x 36'" },
  { name: "Sledhaus 500", series: "Sledhaus",        sqft: 580,  beds: "1",   baths: "1",   photo: "sledhaus-500.jpg", plan: "sledhaus-500-plan.jpg",       type: "Cabin or ADU with optional loft and deck", footprint: "14' x 45'" },
  { name: "Cabana 2 Bed", series: "Cabana",        sqft: 638,  beds: "2",   baths: "1-2", photo: "cabana-2-bed.jpg", plan: "cabana-2-bed-plan.jpg",       type: "Single-story cabin or ADU", footprint: "14'6\" x 44'" },
  { name: "Torrey Flats", series: "Torrey Flats",        sqft: 696,  beds: "1-2", baths: "1",   photo: "torrey-flats.jpg", plan: "torrey-flats-plan.jpg",       type: "Single-story cabin or ADU", footprint: "15' x 48'" },
  { name: "Morada 800", series: "Morada",          sqft: 793,  beds: "1-2", baths: "1-2", photo: "morada-800.jpg", plan: "morada-800-plan.jpg",         type: "Single-story home", footprint: "39' x 21'" },
  { name: "Rabbit 800", series: "Rabbit",          sqft: 799,  beds: "2",   baths: "1-2", photo: "rabbit-800.jpg", plan: "rabbit-800-plan.jpg",         type: "Two-story modern", footprint: "14'6\" x 29'" },
  { name: "Eagle Landing 1000", series: "Eagle Landing",  sqft: 1000, beds: "2",   baths: "2",   photo: "eagle-landing-1000.jpg", plan: "eagle-landing-1000-plan.jpg", type: "Traditional rambler", footprint: "54' x 19'8\"" },
  { name: "Morada 1000", series: "Morada",         sqft: 989,  beds: "1-2", baths: "1-2", photo: "morada-1000.jpg", plan: "morada-1000-plan.jpg",        type: "Single-story home", footprint: "43' x 24'" },
  { name: "Rabbit 1000", series: "Rabbit",         sqft: 1002, beds: "2",   baths: "1-2", photo: "rabbit-1000.jpg", plan: "rabbit-1000-plan.jpg",        type: "Two-story traditional", footprint: "38' x 16'" }
];
