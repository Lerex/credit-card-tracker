import type { CardTemplate } from "../types";

export const capitalOneVentureX: CardTemplate = {
  id: "capital-one-venture-x",
  issuer: "Capital One",
  name: "Venture X",
  annualFeeCents: 39500,
  qualitativePerks: [
    "Priority Pass Select (unlimited guests)",
    "Capital One Lounges + Plaza Premium access",
    "Global Entry / TSA PreCheck credit ($120 every 4 yr)",
    "Hertz President's Circle status",
    "Primary rental car CDW",
    "10x hotels + rental cars via Capital One Travel",
  ],
  benefits: [
    {
      id: "travel-credit",
      name: "Capital One Travel Credit",
      amountCents: 30000,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "$300/yr — must book through the Capital One Travel portal",
    },
    {
      id: "anniversary-miles",
      name: "Anniversary Bonus Miles",
      amountCents: 10000,
      period: { type: "cardmember-year" },
      category: "travel",
      notes: "10,000 miles auto-posted each anniversary (~$100 at 1¢/mile)",
    },
  ],
};
