import type { CppSettings, PointsCurrency } from "./types";

// Default cents-per-point valuations. Conservative redemption values — users
// can override in Settings if they consistently get higher redemptions.
export const DEFAULT_CPP: Record<PointsCurrency, number> = {
  MR: 2.0,
  UR: 2.0,
  TY: 1.7,
  CapOneMiles: 1.7,
  Cashback: 1.0,
  Other: 1.0,
};

export const CURRENCY_LABEL: Record<PointsCurrency, string> = {
  MR: "Amex MR",
  UR: "Chase UR",
  TY: "Citi TY",
  CapOneMiles: "Cap One Miles",
  Cashback: "Cashback",
  Other: "Other points",
};

export function effectiveCpp(
  currency: PointsCurrency | undefined,
  overrides: CppSettings | undefined,
): number {
  const key: PointsCurrency = currency ?? "Cashback";
  const override = overrides?.[key];
  if (typeof override === "number" && Number.isFinite(override) && override >= 0) {
    return override;
  }
  return DEFAULT_CPP[key];
}
