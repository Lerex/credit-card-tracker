import type { CardTemplate } from "../types";

export const citiPremier: CardTemplate = {
  id: "citi-premier",
  issuer: "Citi",
  name: "Strata Premier",
  annualFeeCents: 9500,
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

export const citiAAExecutive: CardTemplate = {
  id: "citi-aa-executive",
  issuer: "Citi",
  name: "AAdvantage Executive",
  annualFeeCents: 59500,
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
