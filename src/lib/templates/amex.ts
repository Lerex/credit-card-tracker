import type { CardTemplate } from "../types";

// Refreshed 2025/2026. Existing cardmembers see the new fee and credits
// at renewal on/after Jan 2, 2026.
export const amexPlatinum: CardTemplate = {
  id: "amex-platinum",
  issuer: "Amex",
  name: "Platinum Card (2025 refresh)",
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
