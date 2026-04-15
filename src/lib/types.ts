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
