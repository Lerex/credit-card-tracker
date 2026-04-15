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

export const citiPrestige: CardTemplate = {
  id: "citi-prestige",
  issuer: "Citi",
  name: "Prestige (legacy)",
  annualFeeCents: 49500,
  qualitativePerks: ["4th night free at hotels", "Priority Pass Select"],
  benefits: [
    {
      id: "travel-credit-prestige",
      name: "Annual Travel Credit",
      amountCents: 25000,
      period: { type: "calendar-year" },
      category: "travel",
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
