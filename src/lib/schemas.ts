import { z } from "zod";

const BenefitPeriodSchema = z.union([
  z.object({ type: z.literal("calendar-year") }),
  z.object({ type: z.literal("cardmember-year") }),
  z.object({ type: z.literal("quarterly") }),
  z.object({ type: z.literal("semi-annual") }),
  z.object({ type: z.literal("monthly") }),
]);

const BenefitCategorySchema = z.enum([
  "travel", "dining", "streaming", "shopping", "wellness", "other",
]);

const BenefitTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  amountCents: z.number().int(),
  period: BenefitPeriodSchema,
  category: BenefitCategorySchema,
  notes: z.string().optional(),
  unit: z.literal("flat").optional(),
});

const PointsCurrencySchema = z.enum([
  "MR", "UR", "TY", "CapOneMiles", "Cashback",
  "HiltonHonors", "MarriottBonvoy", "WorldOfHyatt",
  "AAdvantage", "Atmos", "Delta", "Other",
]);

const UserCardSchema = z.object({
  id: z.string(),
  templateId: z.string(),
  nickname: z.string().optional(),
  openedAt: z.string(),
  annualFeeChargedMonth: z.number().int().min(1).max(12),
  customBenefits: z.array(BenefitTemplateSchema).optional(),
  disabledBenefitIds: z.array(z.string()).optional(),
  benefitExpirations: z.record(z.string(), z.string()).optional(),
});

const BenefitUsageSchema = z.object({
  id: z.string(),
  userCardId: z.string(),
  benefitId: z.string(),
  dateISO: z.string(),
  amountCents: z.number().int(),
  note: z.string().optional(),
});

const CppSettingsSchema = z.record(PointsCurrencySchema, z.number());

export const ExportPayloadSchema = z.object({
  version: z.union([z.literal(1), z.literal(2)]),
  exportedAt: z.string(),
  userCards: z.array(UserCardSchema),
  usages: z.array(BenefitUsageSchema),
  cppOverrides: CppSettingsSchema.optional(),
});
