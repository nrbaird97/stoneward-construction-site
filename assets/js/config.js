/*
  Stoneward Construction site configuration.

  These contact details are the single source of truth for the entire site.
  They feed the header, footer, contact page, click-to-call links and the
  LocalBusiness structured data. Change them here and nowhere else.
*/
window.SITECONFIG = {
  businessName: "Stoneward Construction",
  siteUrl: "https://www.stonewardconstruction.com",

  // VERIFY WITH OWNER
  phone: "(801) 888-0136",

  // VERIFY WITH OWNER
  email: "admin@stonewardconstruction.com",

  // Lead form endpoint (Google Apps Script web app). Empty falls back to a mailto link.
  leadEndpoint: "https://script.google.com/macros/s/AKfycbwEx3mrvck8svCB1x_-Cj-uXhnc8H4TvoblAXsIjidyNUE_7CNEAH5CEBMxbPwqju6y/exec",

  // Same office address as the owner's other businesses
  address: {
    street: "767 S Auto Mall Dr, Suite 14",
    city: "American Fork",
    region: "UT",
    postalCode: "84003"
  },

  // VERIFY WITH OWNER
  serviceArea: "Utah County, Salt Lake County and the Wasatch Front"
};
