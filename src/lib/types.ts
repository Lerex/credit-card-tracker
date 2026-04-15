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

export type CardTemplate = {
  id: string;
  issuer: "Amex" | "Chase" | "Citi" | "Capital One" | "Other";
  name: string;
  annualFeeCents: number;
  benefits: BenefitTemplate[];
  qualitativePerks?: string[];
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

export type ExportPayload = {
  version: 1;
  exportedAt: string;
  userCards: UserCard[];
  usages: BenefitUsage[];
};
