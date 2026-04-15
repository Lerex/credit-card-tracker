import type { CardTemplate } from "../types";

export const bofaPremiumRewardsElite: CardTemplate = {
  id: "bofa-premium-rewards-elite",
  issuer: "Other",
  name: "BofA Premium Rewards Elite",
  annualFeeCents: 55000,
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
