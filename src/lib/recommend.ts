import { effectiveCpp } from "./cpp";
import { getTemplate } from "./templates";
import type {
  BookingMethod,
  CardTemplate,
  CppSettings,
  EarningRate,
  PointsCurrency,
  SpendCategory,
  UserCard,
} from "./types";

export type Recommendation = {
  userCard: UserCard;
  template: CardTemplate;
  multiplier: number;
  bookingMethod: BookingMethod;
  currency: PointsCurrency;
  cpp: number;                     // cents per point applied
  effectiveCentsPerDollar: number; // multiplier * cpp
  rateNotes?: string;
  annualCapCents?: number;
  isBaseFallback: boolean;         // true if we fell back to 1x because no rate matched
};

export const CATEGORY_LABEL: Record<SpendCategory, string> = {
  dining: "Dining",
  groceries: "Groceries",
  flights: "Flights",
  hotels: "Hotels",
  transit: "Transit / Rideshare",
  other: "Everything else",
};

export const CATEGORY_ORDER: SpendCategory[] = [
  "dining",
  "groceries",
  "flights",
  "hotels",
  "transit",
  "other",
];

// Matches rates relevant to a picked category. Rates tagged with the exact
// category match; if a card has only an "other" entry, it's used as a fallback.
function matchingRates(template: CardTemplate, category: SpendCategory): EarningRate[] {
  const rates = template.earningRates ?? [];
  const direct = rates.filter((r) => r.category === category);
  if (direct.length > 0) return direct;
  const fallback = rates.filter((r) => r.category === "other");
  return fallback;
}

function toRecommendation(
  userCard: UserCard,
  template: CardTemplate,
  rate: EarningRate,
  cppOverrides: CppSettings | undefined,
  isBaseFallback: boolean,
): Recommendation {
  const currency: PointsCurrency = template.pointsCurrency ?? "Cashback";
  const cpp = effectiveCpp(currency, cppOverrides);
  return {
    userCard,
    template,
    multiplier: rate.multiplier,
    bookingMethod: rate.bookingMethod ?? "any",
    currency,
    cpp,
    effectiveCentsPerDollar: rate.multiplier * cpp,
    rateNotes: rate.notes,
    annualCapCents: rate.annualCapCents,
    isBaseFallback,
  };
}

// Synthetic 1x Cashback fallback for cards with no earning-rate data at all.
// Keeps the card ranked last rather than hiding it, so users still see all their
// options in the results list.
function syntheticBase(
  userCard: UserCard,
  template: CardTemplate,
  cppOverrides: CppSettings | undefined,
): Recommendation {
  const cpp = effectiveCpp("Cashback", cppOverrides);
  return {
    userCard,
    template,
    multiplier: 1,
    bookingMethod: "any",
    currency: "Cashback",
    cpp,
    effectiveCentsPerDollar: cpp,
    rateNotes: "No earning-rate data — assumed 1x base.",
    isBaseFallback: true,
  };
}

export function recommendForCategory(
  category: SpendCategory,
  userCards: UserCard[],
  cppOverrides: CppSettings | undefined,
): Recommendation[] {
  const out: Recommendation[] = [];
  for (const uc of userCards) {
    const template = getTemplate(uc.templateId);
    if (!template) continue;

    const rates = matchingRates(template, category);
    if (rates.length === 0) {
      if (!template.earningRates || template.earningRates.length === 0) {
        out.push(syntheticBase(uc, template, cppOverrides));
      }
      // If the card has earningRates but no match and no "other" row, skip —
      // means we explicitly don't think this card is relevant.
      continue;
    }

    const isFallback = rates[0]?.category === "other" && category !== "other";
    for (const rate of rates) {
      out.push(toRecommendation(uc, template, rate, cppOverrides, isFallback));
    }
  }

  out.sort((a, b) => b.effectiveCentsPerDollar - a.effectiveCentsPerDollar);
  return out;
}

export function formatCents(cents: number): string {
  return `${cents.toFixed(cents < 10 ? 1 : 0)}\u00A2`;
}

export const BOOKING_LABEL: Record<BookingMethod, string> = {
  "issuer-portal": "via issuer portal",
  direct: "direct",
  any: "",
};
