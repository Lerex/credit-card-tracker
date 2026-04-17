export type BenefitPeriod =
  | { type: "calendar-year" }
  | { type: "cardmember-year" }
  | { type: "quarterly" }
  | { type: "semi-annual" }
  | { type: "monthly" };

export type BenefitCategory =
  | "travel"
  | "dining"
  | "streaming"
  | "shopping"
  | "wellness"
  | "other";

export type BenefitTemplate = {
  id: string;
  name: string;
  amountCents: number;
  period: BenefitPeriod;
  category: BenefitCategory;
  notes?: string;
  // "flat" = single redemption per period (e.g. a free-night cert). UI shows a
  // checkbox instead of an amount form; marking used logs one usage at amountCents.
  unit?: "flat";
};

// Points "currency" — determines how `multiplier` converts to cents via CPP lookup.
export type PointsCurrency =
  | "MR"           // Amex Membership Rewards
  | "UR"           // Chase Ultimate Rewards
  | "TY"           // Citi ThankYou
  | "CapOneMiles"  // Capital One Miles
  | "Cashback"     // 1¢/point, earns cash
  | "Other";       // hotel/airline points without a published valuation default

export type BookingMethod = "issuer-portal" | "direct" | "any";

export type SpendCategory =
  | "dining"
  | "groceries"
  | "flights"
  | "hotels"
  | "transit"   // rideshare + public transit
  | "other";    // catch-all / base rate

export type EarningRate = {
  category: SpendCategory;
  multiplier: number;              // points per $1 (1 = base, 4 = 4x)
  bookingMethod?: BookingMethod;   // default "any"; used mainly for flights/hotels
  annualCapCents?: number;         // metadata only in v1 — shown in UI, not enforced
  notes?: string;                  // e.g. "US supermarkets only, excl. Walmart/Target"
};

export type CardTemplate = {
  id: string;
  issuer: "Amex" | "Chase" | "Citi" | "Capital One" | "Other";
  name: string;
  annualFeeCents: number;
  benefits: BenefitTemplate[];
  qualitativePerks?: string[];
  earningRates?: EarningRate[];
  pointsCurrency?: PointsCurrency;
};

export type UserCard = {
  id: string;
  templateId: string;
  nickname?: string;
  openedAt: string;
  annualFeeChargedMonth: number;
  customBenefits?: BenefitTemplate[];
  disabledBenefitIds?: string[];
  // Per-benefit expiration override (ISO date). Primarily used for flat benefits
  // like free-night certs whose expiry is set by the issuer on issuance.
  benefitExpirations?: Record<string, string>;
};

export type BenefitUsage = {
  id: string;
  userCardId: string;
  benefitId: string;
  dateISO: string;
  amountCents: number;
  note?: string;
};

// cents per point — partial so unset currencies fall back to DEFAULT_CPP.
export type CppSettings = Partial<Record<PointsCurrency, number>>;

export type ExportPayload = {
  version: 1 | 2;
  exportedAt: string;
  userCards: UserCard[];
  usages: BenefitUsage[];
  cppOverrides?: CppSettings;
};
