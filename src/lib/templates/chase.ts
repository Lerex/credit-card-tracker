import type { CardTemplate } from "../types";

export const chaseSapphireReserve: CardTemplate = {
  id: "chase-sapphire-reserve",
  issuer: "Chase",
  name: "Sapphire Reserve",
  annualFeeCents: 55000,
  qualitativePerks: [
    "Priority Pass Select",
    "Chase Sapphire Lounges",
    "Primary CDW rental insurance",
    "Global Entry / TSA PreCheck credit",
  ],
  benefits: [
    {
      id: "travel-credit",
      name: "Annual Travel Credit",
      amountCents: 30000,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "Auto-applied to any travel purchase",
    },
    {
      id: "doordash-dashpass",
      name: "DashPass Membership",
      amountCents: 12000,
      period: { type: "calendar-year" },
      category: "dining",
      notes: "Complimentary DashPass + monthly credits",
    },
    {
      id: "lyft-pinkpass",
      name: "Lyft Pink All Access",
      amountCents: 19900,
      period: { type: "calendar-year" },
      category: "travel",
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
