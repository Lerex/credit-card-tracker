import type { CardTemplate } from "../types";

// Refreshed June 2025. Fee jumped to $795, restructured into many semi-annual
// dining/entertainment credits, added The Edit + Chase Travel hotels, replaced
// Lyft Pink with monthly Lyft credit, added Peloton + Apple TV+ & Music perks.
export const chaseSapphireReserve: CardTemplate = {
  id: "chase-sapphire-reserve",
  issuer: "Chase",
  name: "Sapphire Reserve",
  annualFeeCents: 79500,
  qualitativePerks: [
    "Priority Pass Select",
    "Chase Sapphire Lounges",
    "Primary CDW rental insurance",
    "Global Entry / TSA PreCheck credit ($120 every 4 yr)",
    "Apple TV+ & Apple Music complimentary subscriptions (~$288 value, through 6/22/2027)",
  ],
  benefits: [
    // Monthly
    {
      id: "lyft-credit",
      name: "Lyft Credit",
      amountCents: 1000,
      period: { type: "monthly" },
      category: "travel",
      notes: "$10/month in-app Lyft credit",
    },
    {
      id: "peloton-credit",
      name: "Peloton Credit",
      amountCents: 1000,
      period: { type: "monthly" },
      category: "wellness",
      notes: "$10/month toward Peloton membership — through 12/31/2027",
    },
    // Semi-annual
    {
      id: "dining-credit-csr",
      name: "Sapphire Reserve Dining Credit",
      amountCents: 15000,
      period: { type: "semi-annual" },
      category: "dining",
      notes: "$150 Jan–Jun + $150 Jul–Dec at Sapphire Reserve Exclusive Tables restaurants",
    },
    {
      id: "stubhub-credit",
      name: "StubHub / Viagogo Credit",
      amountCents: 15000,
      period: { type: "semi-annual" },
      category: "other",
      notes: "$150 Jan–Jun + $150 Jul–Dec on StubHub / Viagogo",
    },
    // Calendar-year
    {
      id: "the-edit-credit",
      name: "The Edit Hotel Credit",
      amountCents: 50000,
      period: { type: "calendar-year" },
      category: "travel",
      notes: "$500/yr via The Edit by Chase Travel — max $250 per transaction, 2+ night prepaid stays",
    },
    {
      id: "chase-travel-hotels-credit",
      name: "Chase Travel Hotels Credit",
      amountCents: 25000,
      period: { type: "calendar-year" },
      category: "travel",
      notes: "$250/yr on select brands via Chase Travel: IHG, Minor, Montage, Omni, Pan Pacific, Pendry, Virgin",
    },
    {
      id: "doordash-dashpass",
      name: "DashPass Membership + Credits",
      amountCents: 12000,
      period: { type: "calendar-year" },
      category: "dining",
      notes: "Complimentary DashPass + monthly $5 restaurant + $10 grocery + $10 DashMart credits",
    },
    // Cardmember-year
    {
      id: "travel-credit",
      name: "Annual Travel Credit",
      amountCents: 30000,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "Auto-applied to any travel purchase",
    },
  ],
};

export const chaseSapphirePreferred: CardTemplate = {
  id: "chase-sapphire-preferred",
  issuer: "Chase",
  name: "Sapphire Preferred",
  annualFeeCents: 9500,
  qualitativePerks: ["Primary CDW rental insurance", "Trip delay insurance"],
  benefits: [
    {
      id: "hotel-credit-csp",
      name: "Annual Hotel Credit",
      amountCents: 5000,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "Booked through Chase Travel",
    },
  ],
};

export const chaseWorldOfHyatt: CardTemplate = {
  id: "chase-world-of-hyatt",
  issuer: "Chase",
  name: "World of Hyatt",
  annualFeeCents: 9500,
  qualitativePerks: [
    "Discoverist status",
    "5 qualifying night credits / year",
    "Extra Cat 1–4 free night after $15k calendar-year spend",
    "2 elite night credits per $5k spent",
    "2x on restaurants, flights, fitness, local transit",
  ],
  benefits: [
    {
      id: "free-night",
      name: "Anniversary Free Night (Cat 1–4)",
      amountCents: 0,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "One free night at a Cat 1–4 Hyatt property, posted on anniversary",
      unit: "flat",
    },
  ],
};

export const chaseIhgPremier: CardTemplate = {
  id: "chase-ihg-premier",
  issuer: "Chase",
  name: "IHG One Rewards Premier",
  annualFeeCents: 9900,
  qualitativePerks: [
    "Platinum Elite status",
    "4th Reward Night free on 4+ night award stays",
    "$100 statement credit + 10k bonus points after $20k calendar-year spend",
    "Global Entry / TSA PreCheck credit ($120 every 4 yr)",
    "Trip delay / baggage / purchase protection",
    "No foreign transaction fees",
  ],
  benefits: [
    {
      id: "free-night",
      name: "Anniversary Free Night (40k cap)",
      amountCents: 0,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "Free night at eligible IHG hotels, points cost up to 40k — can top up with points on redemption",
      unit: "flat",
    },
    {
      id: "united-travelbank",
      name: "United TravelBank Cash",
      amountCents: 5000,
      period: { type: "calendar-year" },
      category: "travel",
      notes: "$50/yr in United TravelBank Cash after registering the card with your MileagePlus account",
    },
  ],
};

// Closed to new applicants; existing cardholders keep the card.
export const chaseRitzCarlton: CardTemplate = {
  id: "chase-ritz-carlton",
  issuer: "Chase",
  name: "Ritz-Carlton",
  annualFeeCents: 45000,
  qualitativePerks: [
    "Marriott Bonvoy Gold Elite status",
    "Priority Pass Select (cardholder + 2 guests; additional guests $27 each from 1/15/2026)",
    "Global Entry / TSA PreCheck credit ($100 every 4 yr)",
    "Primary CDW rental insurance",
    "No longer open to new applicants",
  ],
  benefits: [
    {
      id: "airline-incidentals",
      name: "Airline Incidental Credit",
      amountCents: 30000,
      period: { type: "calendar-year" },
      category: "travel",
      notes: "$300/yr on one selected airline — bags, seat selection, in-flight (not airfare)",
    },
    {
      id: "ritz-property-credit",
      name: "Ritz-Carlton Property Credit",
      amountCents: 10000,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "$100 on dining/spa/recreation — requires 2+ night Bonvoy-rate stay at Ritz-Carlton or St. Regis (disable if not applicable)",
    },
    {
      id: "free-night",
      name: "Anniversary Free Night (up to 85k)",
      amountCents: 0,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "Free night certificate at any Marriott property up to 85k points — can top up with points on redemption",
      unit: "flat",
    },
  ],
};
