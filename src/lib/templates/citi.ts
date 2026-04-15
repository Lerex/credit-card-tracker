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
