import type { CardTemplate } from "../types";

export const bofaPremiumRewardsElite: CardTemplate = {
  id: "bofa-premium-rewards-elite",
  issuer: "Other",
  name: "BofA Premium Rewards Elite",
  annualFeeCents: 55000,
  pointsCurrency: "Cashback",
  earningRates: [
    { category: "dining", multiplier: 2 },
    { category: "flights", multiplier: 2 },
    { category: "hotels", multiplier: 2 },
    { category: "transit", multiplier: 2, notes: "Part of travel category" },
    { category: "other", multiplier: 1.5, notes: "Preferred Rewards Platinum Honors adds up to +75%" },
  ],
  qualitativePerks: [
    "Priority Pass Select",
    "$100 Global Entry / TSA PreCheck credit (every 4 yr)",
    "Up to 75% rewards bonus with Preferred Rewards Platinum Honors",
    "VIP concierge + luxury hotel collection benefits",
    "Trip delay / baggage protection",
  ],
  benefits: [
    {
      id: "airline-incidentals",
      name: "Airline Incidental Credit",
      amountCents: 30000,
      period: { type: "calendar-year" },
      category: "travel",
      notes: "$300/yr on bags, seat selection, in-flight purchases — not airfare",
    },
    {
      id: "lifestyle-credit",
      name: "Lifestyle Credit",
      amountCents: 15000,
      period: { type: "calendar-year" },
      category: "other",
      notes: "$150/yr on streaming, food delivery, fitness, rideshare",
    },
  ],
};

// Rebranded from Alaska Airlines Visa Signature to Atmos Rewards in 2025.
// Lounge+ membership credit was discontinued; primary anniversary perk is now
// the $99 Companion Fare (qualitative — depends on companion eligibility).
export const bofaAlaskaAscent: CardTemplate = {
  id: "bofa-alaska-ascent",
  issuer: "Other",
  name: "Atmos Ascent",
  annualFeeCents: 9500,
  pointsCurrency: "Atmos",
  earningRates: [
    { category: "flights", multiplier: 3, notes: "Alaska / Hawaiian airfare only" },
    { category: "other", multiplier: 1 },
  ],
  qualitativePerks: [
    "Free checked bag + preferred boarding for up to 6 companions (Alaska / Hawaiian)",
    "$99 Companion Fare each anniversary after $6k calendar-year spend",
    "3x on Alaska / Hawaiian airfare",
    "Transfer Atmos points to Marriott / IHG / Wyndham / Preferred / Shangri-La",
    "No foreign transaction fees",
  ],
  benefits: [],
};

// Premium Alaska card launched 2025; tracked benefits are the recurring
// companion award certs (modeled like free-night certs).
export const bofaAlaskaSummit: CardTemplate = {
  id: "bofa-alaska-summit",
  issuer: "Other",
  name: "Atmos Summit",
  annualFeeCents: 39500,
  pointsCurrency: "Atmos",
  earningRates: [
    { category: "flights", multiplier: 4, notes: "Alaska / Hawaiian airfare only" },
    { category: "dining", multiplier: 3 },
    { category: "other", multiplier: 1 },
  ],
  qualitativePerks: [
    "Free checked bag + preferred boarding for up to 6 companions (Alaska / Hawaiian)",
    "2 Alaska Lounge passes per quarter (8 / yr)",
    "2 Alaska Wi-Fi passes per quarter",
    "Free same-day confirmed flight changes + free same-day standby on Alaska",
    "Automatic $50 voucher on Alaska delays 2+ hr or cancellations within 24 hr",
    "Global Entry / TSA PreCheck credit ($120 every 4 yr)",
    "10,000 status points per anniversary + 1 status point per $2 spent",
    "Transfer Atmos points to Marriott / IHG / Wyndham / Preferred / Shangri-La",
    "No foreign transaction fees",
  ],
  benefits: [
    {
      id: "global-companion-award",
      name: "Global Companion Award (25k)",
      amountCents: 0,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "25,000-point companion award certificate — auto-issued each anniversary",
      unit: "flat",
    },
    {
      id: "global-companion-award-bonus",
      name: "Global Companion Award Upgrade (100k)",
      amountCents: 0,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "Upgrades the anniversary cert to up to 100,000 points after $60k calendar-year spend (disable if not applicable)",
      unit: "flat",
    },
  ],
};
