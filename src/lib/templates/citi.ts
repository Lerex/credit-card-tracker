import type { CardTemplate } from "../types";

export const citiPremier: CardTemplate = {
  id: "citi-premier",
  issuer: "Citi",
  name: "Strata Premier",
  annualFeeCents: 9500,
  pointsCurrency: "TY",
  earningRates: [
    { category: "dining", multiplier: 3 },
    { category: "groceries", multiplier: 3, notes: "Supermarkets (excl. Walmart / Target)" },
    { category: "flights", multiplier: 3 },
    { category: "hotels", multiplier: 3 },
    { category: "other", multiplier: 1, notes: "+ 3x on gas / EV charging" },
  ],
  qualitativePerks: ["3x on air travel, gas, restaurants, supermarkets, hotels"],
  benefits: [
    {
      id: "hotel-savings",
      name: "Annual Hotel Benefit",
      amountCents: 10000,
      period: { type: "calendar-year" },
      category: "travel",
      notes: "$500+ single stay booked via thankyou.com",
    },
  ],
};

export const citiStrataElite: CardTemplate = {
  id: "citi-strata-elite",
  issuer: "Citi",
  name: "Strata Elite",
  annualFeeCents: 59500,
  pointsCurrency: "TY",
  earningRates: [
    { category: "hotels", multiplier: 12, bookingMethod: "issuer-portal", notes: "Hotels / car rentals / attractions via Citi Travel" },
    { category: "hotels", multiplier: 1.5, bookingMethod: "direct" },
    { category: "flights", multiplier: 6, bookingMethod: "issuer-portal", notes: "Via Citi Travel" },
    { category: "flights", multiplier: 1.5, bookingMethod: "direct" },
    { category: "dining", multiplier: 3, notes: "6x Fri/Sat nights at restaurants" },
    { category: "other", multiplier: 1.5 },
  ],
  qualitativePerks: [
    "4 Admirals Club passes per year (cardholder only)",
    "Global Entry / TSA PreCheck credit ($120 every 4 yr)",
    "Citigold / Citi Private Client relationship credit (separate $145/$595)",
  ],
  benefits: [
    {
      id: "hotel-credit",
      name: "Citi Travel Hotel Credit",
      amountCents: 30000,
      period: { type: "calendar-year" },
      category: "travel",
      notes: "$300/yr off a 2+ night hotel stay booked through cititravel.com",
    },
    {
      id: "splurge-credit",
      name: "Splurge Credit",
      amountCents: 20000,
      period: { type: "calendar-year" },
      category: "other",
      notes: "$200/yr across up to 2 chosen brands: 1stDibs, American Airlines, Best Buy, Future Personal Training, Live Nation",
    },
    {
      id: "blacklane-credit",
      name: "Blacklane Credit",
      amountCents: 10000,
      period: { type: "semi-annual" },
      category: "travel",
      notes: "$100 Jan–Jun + $100 Jul–Dec on Blacklane chauffeur bookings",
    },
  ],
};

export const citiAAPlatinumSelect: CardTemplate = {
  id: "citi-aa-platinum-select",
  issuer: "Citi",
  name: "AAdvantage Platinum Select",
  annualFeeCents: 9900,
  pointsCurrency: "AAdvantage",
  earningRates: [
    { category: "dining", multiplier: 2 },
    { category: "flights", multiplier: 2, notes: "American Airlines purchases" },
    { category: "other", multiplier: 1, notes: "+ 2x at gas stations" },
  ],
  qualitativePerks: [
    "First checked bag free on AA flights (cardholder + up to 4 companions on same reservation)",
    "Preferred boarding (Group 5) on AA flights",
    "25% savings on inflight food and beverage purchases",
    "Earn 1 Loyalty Point per AAdvantage mile from purchases",
    "$125 American Airlines flight discount after $20,000 calendar-year spend + account renewal",
  ],
  benefits: [],
};

export const citiAAExecutive: CardTemplate = {
  id: "citi-aa-executive",
  issuer: "Citi",
  name: "AAdvantage Executive",
  annualFeeCents: 59500,
  pointsCurrency: "AAdvantage",
  earningRates: [
    { category: "flights", multiplier: 4, notes: "American Airlines flights only" },
    { category: "hotels", multiplier: 10, bookingMethod: "issuer-portal", notes: "Via aa.com / Rocketmiles" },
    { category: "other", multiplier: 1 },
  ],
  qualitativePerks: [
    "Admirals Club access for cardholder + authorized users + guests",
    "First checked bag free (up to 8 companions)",
    "Priority check-in / security / boarding on AA",
    "Complimentary Main Cabin Extra on eligible AA flights",
    "10,000 Loyalty Points every $40k spend (up to 80k/yr)",
  ],
  benefits: [
    {
      id: "grubhub-credit",
      name: "Grubhub Credit",
      amountCents: 1000,
      period: { type: "monthly" },
      category: "dining",
      notes: "$10/month on Grubhub — Grubhub+ membership recommended",
    },
    {
      id: "lyft-credit",
      name: "Lyft Credit",
      amountCents: 1000,
      period: { type: "monthly" },
      category: "travel",
      notes: "$10/month after 3 Lyft rides in the same month",
    },
    {
      id: "global-entry",
      name: "Global Entry / TSA PreCheck Credit",
      amountCents: 12000,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "$120 every 5 years — shown annually for reference",
    },
  ],
};
