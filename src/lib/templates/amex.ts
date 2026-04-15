import type { CardTemplate } from "../types";

// Refreshed 2025/2026. Existing cardmembers see the new fee and credits
// at renewal on/after Jan 2, 2026.
export const amexPlatinum: CardTemplate = {
  id: "amex-platinum",
  issuer: "Amex",
  name: "Platinum Card",
  annualFeeCents: 89500,
  qualitativePerks: [
    "Centurion Lounge + Delta Sky Club + Priority Pass access",
    "Fine Hotels + Resorts benefits",
    "Global Entry ($120/4yr) or TSA PreCheck ($85/5yr) credit",
    "Marriott Bonvoy Gold + Hilton Honors Gold status",
    "Leaders Club Sterling Status at Leading Hotels of the World",
    "Platinum Nights by Resy",
  ],
  benefits: [
    // Monthly
    {
      id: "uber-cash",
      name: "Uber Cash",
      amountCents: 1500,
      period: { type: "monthly" },
      category: "travel",
      notes: "$15/mo for Uber rides/Uber Eats in U.S. (+ $20 bonus in December)",
    },
    {
      id: "uber-one",
      name: "Uber One Credit",
      amountCents: 1000,
      period: { type: "monthly" },
      category: "travel",
      notes: "$10/mo — must pay for auto-renewing Uber One membership with the card",
    },
    {
      id: "digital-ent",
      name: "Digital Entertainment Credit",
      amountCents: 2500,
      period: { type: "monthly" },
      category: "streaming",
      notes: "$25/mo on Disney+, Hulu, ESPN+, NYT, WSJ, Peacock, Paramount+, YouTube Premium, YouTube TV",
    },
    {
      id: "walmart-plus",
      name: "Walmart+ Membership",
      amountCents: 1295,
      period: { type: "monthly" },
      category: "shopping",
      notes: "$12.95/mo statement credit (membership only, plus tax not covered)",
    },
    // Quarterly
    {
      id: "resy",
      name: "Resy Dining Credit",
      amountCents: 10000,
      period: { type: "quarterly" },
      category: "dining",
      notes: "$100/quarter at eligible Resy restaurants",
    },
    {
      id: "lululemon",
      name: "Lululemon Credit",
      amountCents: 7500,
      period: { type: "quarterly" },
      category: "shopping",
      notes: "$75/quarter — U.S. stores (excl. outlets) and online",
    },
    // Semi-annual
    {
      id: "hotel-credit",
      name: "Hotel Credit (FHR / THC)",
      amountCents: 30000,
      period: { type: "semi-annual" },
      category: "travel",
      notes: "$300 Jan–Jun + $300 Jul–Dec on prepaid FHR or The Hotel Collection via Amex Travel",
    },
    {
      id: "saks",
      name: "Saks Fifth Avenue Credit",
      amountCents: 5000,
      period: { type: "semi-annual" },
      category: "shopping",
      notes: "$50 Jan–Jun + $50 Jul–Dec",
    },
    // Annual (calendar year)
    {
      id: "airline-fee",
      name: "Airline Incidental Credit",
      amountCents: 20000,
      period: { type: "calendar-year" },
      category: "travel",
      notes: "One selected airline — fees only (bags, seat selection, in-flight), not airfare",
    },
    {
      id: "equinox",
      name: "Equinox Credit",
      amountCents: 30000,
      period: { type: "calendar-year" },
      category: "wellness",
      notes: "$25/mo on Equinox membership or Equinox+ app (enrollment required)",
    },
    {
      id: "clear",
      name: "CLEAR Plus Credit",
      amountCents: 20900,
      period: { type: "calendar-year" },
      category: "travel",
      notes: "Up to $209/yr CLEAR+ membership",
    },
    {
      id: "oura",
      name: "Oura Ring Credit",
      amountCents: 20000,
      period: { type: "calendar-year" },
      category: "wellness",
      notes: "Hardware only (not subscription); enrollment required",
    },
  ],
};

// Unchanged in 2025 refresh (Gold had its own refresh cycle)
export const amexGold: CardTemplate = {
  id: "amex-gold",
  issuer: "Amex",
  name: "Gold Card",
  annualFeeCents: 32500,
  qualitativePerks: ["4x dining + US supermarkets", "3x flights booked with Amex Travel"],
  benefits: [
    {
      id: "dining-credit",
      name: "Dining Credit",
      amountCents: 1000,
      period: { type: "monthly" },
      category: "dining",
      notes: "$10/mo on Grubhub, Resy, Five Guys, Goldbelly, Wine.com, Cheesecake Factory",
    },
    {
      id: "uber-cash-gold",
      name: "Uber Cash",
      amountCents: 1000,
      period: { type: "monthly" },
      category: "travel",
      notes: "$10/mo Uber/Uber Eats",
    },
    {
      id: "resy",
      name: "Resy Credit",
      amountCents: 5000,
      period: { type: "semi-annual" },
      category: "dining",
      notes: "$50 Jan–Jun + $50 Jul–Dec",
    },
    {
      id: "dunkin",
      name: "Dunkin' Credit",
      amountCents: 700,
      period: { type: "monthly" },
      category: "dining",
      notes: "$7/mo",
    },
  ],
};

export const amexGreen: CardTemplate = {
  id: "amex-green",
  issuer: "Amex",
  name: "Green Card",
  annualFeeCents: 15000,
  qualitativePerks: ["3x travel, transit, dining", "LoungeBuddy credit"],
  benefits: [
    {
      id: "clear-green",
      name: "CLEAR Plus Credit",
      amountCents: 18900,
      period: { type: "calendar-year" },
      category: "travel",
    },
  ],
};

export const amexHiltonAspire: CardTemplate = {
  id: "amex-hilton-aspire",
  issuer: "Amex",
  name: "Hilton Honors Aspire",
  annualFeeCents: 55000,
  qualitativePerks: [
    "Hilton Honors Diamond status",
    "Second free night after $30k calendar-year spend",
    "Priority Pass Select",
    "Hilton on-property daily F&B credit on eligible rates",
  ],
  benefits: [
    {
      id: "free-night",
      name: "Anniversary Free Weekend Night",
      amountCents: 0,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "One free weekend night at any Hilton property",
      unit: "flat",
    },
    {
      id: "hilton-resort-credit",
      name: "Hilton Resort Credit",
      amountCents: 20000,
      period: { type: "semi-annual" },
      category: "travel",
      notes: "$200 Jan–Jun + $200 Jul–Dec at participating Hilton Resorts",
    },
    {
      id: "flight-credit",
      name: "Airline Flight Credit",
      amountCents: 5000,
      period: { type: "quarterly" },
      category: "travel",
      notes: "$50/quarter — airfare or incidentals on any airline",
    },
    {
      id: "clear-plus",
      name: "CLEAR Plus Credit",
      amountCents: 19900,
      period: { type: "calendar-year" },
      category: "travel",
      notes: "Up to $199/yr CLEAR+ membership",
    },
    {
      id: "hilton-property-credit",
      name: "Hilton Property Credit",
      amountCents: 10000,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "$100 on-property credit — requires 2+ night Aspire-rate stay (disable if not applicable)",
    },
  ],
};

export const amexMarriottBrilliant: CardTemplate = {
  id: "amex-marriott-brilliant",
  issuer: "Amex",
  name: "Marriott Bonvoy Brilliant",
  annualFeeCents: 65000,
  qualitativePerks: [
    "Marriott Bonvoy Platinum Elite status",
    "$100 property credit on 2+ night Bonvoy-rate stays at St. Regis / Ritz-Carlton",
    "Global Entry / TSA PreCheck credit",
    "25 elite night credits / year",
  ],
  benefits: [
    {
      id: "free-night",
      name: "Anniversary Free Night (85k)",
      amountCents: 0,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "85k-point certificate — can top up to 100k with points on redemption",
      unit: "flat",
    },
    {
      id: "dining-credit",
      name: "Dining Credit",
      amountCents: 2500,
      period: { type: "monthly" },
      category: "dining",
      notes: "$25/month at restaurants worldwide — enrollment required",
    },
  ],
};

export const amexDeltaReserve: CardTemplate = {
  id: "amex-delta-reserve",
  issuer: "Amex",
  name: "Delta SkyMiles Reserve",
  annualFeeCents: 65000,
  qualitativePerks: [
    "Delta Sky Club access when flying Delta",
    "Centurion Lounge access when flying Delta (same-day ticket)",
    "Annual Companion Certificate (domestic First/Comfort+/Main Cabin)",
    "First checked bag free",
    "Main Cabin 1 priority boarding",
    "15% off award tickets on Delta",
  ],
  benefits: [
    {
      id: "resy-credit",
      name: "Resy Dining Credit",
      amountCents: 2000,
      period: { type: "monthly" },
      category: "dining",
      notes: "$20/month at U.S. Resy restaurants",
    },
    {
      id: "rideshare-credit",
      name: "Rideshare Credit",
      amountCents: 1000,
      period: { type: "monthly" },
      category: "travel",
      notes: "$10/month Uber / Lyft / Curb / Revel / Alto",
    },
    {
      id: "delta-stays-credit",
      name: "Delta Stays Credit",
      amountCents: 20000,
      period: { type: "calendar-year" },
      category: "travel",
      notes: "$200/yr on prepaid hotels booked via Delta Stays",
    },
  ],
};

export const amexBusinessPlatinum: CardTemplate = {
  id: "amex-business-platinum",
  issuer: "Amex",
  name: "Business Platinum",
  annualFeeCents: 69500,
  qualitativePerks: [
    "5x flights + prepaid hotels via Amex Travel",
    "1.5x on purchases $5,000+ (up to $2M/yr)",
    "35% airline bonus on pay-with-points (up to 1M/yr)",
    "Centurion + Priority Pass + Delta Sky Club access (flying Delta)",
    "Global Entry / TSA PreCheck credit",
    "Hilton Gold + Marriott Gold status",
  ],
  benefits: [
    {
      id: "wireless-credit",
      name: "Wireless Credit",
      amountCents: 1000,
      period: { type: "monthly" },
      category: "other",
      notes: "$10/month on U.S. wireless telephone provider charges",
    },
    {
      id: "indeed-credit",
      name: "Indeed Credit",
      amountCents: 9000,
      period: { type: "quarterly" },
      category: "other",
      notes: "$90/quarter on Indeed recruiting ads",
    },
    {
      id: "dell-credit",
      name: "Dell Credit",
      amountCents: 10000,
      period: { type: "semi-annual" },
      category: "shopping",
      notes: "$100 Jan–Jun + $100 Jul–Dec on U.S. Dell Technologies purchases",
    },
    {
      id: "adobe-credit",
      name: "Adobe Credit",
      amountCents: 15000,
      period: { type: "calendar-year" },
      category: "shopping",
      notes: "$150/yr on annual prepaid Adobe Creative Cloud / Acrobat Pro",
    },
    {
      id: "hotel-credit-biz",
      name: "Hotel Credit (FHR / THC)",
      amountCents: 40000,
      period: { type: "calendar-year" },
      category: "travel",
      notes: "$400/yr on prepaid FHR or The Hotel Collection via Amex Travel",
    },
    {
      id: "clear-plus-biz",
      name: "CLEAR Plus Credit",
      amountCents: 20900,
      period: { type: "calendar-year" },
      category: "travel",
      notes: "Up to $209/yr CLEAR+ membership",
    },
  ],
};
