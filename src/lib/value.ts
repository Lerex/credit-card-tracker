import { parseLocalDate } from "./dates";
import { currentWindow } from "./periods";
import type {
  BenefitTemplate,
  BenefitUsage,
  CardTemplate,
  UserCard,
} from "./types";

export function effectiveBenefits(
  card: UserCard,
  template: CardTemplate,
): BenefitTemplate[] {
  const disabled = new Set(card.disabledBenefitIds ?? []);
  const base = template.benefits.filter((b) => !disabled.has(b.id));
  return [...base, ...(card.customBenefits ?? [])];
}

export type BenefitStatus = {
  benefit: BenefitTemplate;
  usedCents: number;
  remainingCents: number;
  pct: number;
  windowEnd: Date;
  daysLeft: number;
  usagesInWindow: BenefitUsage[];
};

export function benefitStatuses(
  card: UserCard,
  template: CardTemplate,
  usages: BenefitUsage[],
  now: Date = new Date(),
): BenefitStatus[] {
  return effectiveBenefits(card, template).map((b) => {
    const win = currentWindow(b.period, card.openedAt, now);
    const usagesInWindow = usages.filter((u) => {
      if (u.userCardId !== card.id) return false;
      if (u.benefitId !== b.id) return false;
      const d = parseLocalDate(u.dateISO);
      return d >= win.start && d < win.end;
    });
    const usedCents = usagesInWindow.reduce((sum, u) => sum + u.amountCents, 0);
    const remainingCents = Math.max(0, b.amountCents - usedCents);
    const pct = b.amountCents > 0 ? usedCents / b.amountCents : 0;
    const override =
      b.unit === "flat" ? card.benefitExpirations?.[b.id] : undefined;
    const effectiveEnd = override ? parseLocalDate(override) : win.end;
    const daysLeft = Math.max(
      0,
      Math.ceil((effectiveEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    );
    return {
      benefit: b,
      usedCents,
      remainingCents,
      pct,
      windowEnd: effectiveEnd,
      daysLeft,
      usagesInWindow,
    };
  });
}

export type CardValue = {
  annualFeeCents: number;
  annualUsedCents: number;
  netCents: number;
  pct: number;
};

export function cardAnnualValue(
  card: UserCard,
  template: CardTemplate,
  usages: BenefitUsage[],
  now: Date = new Date(),
): CardValue {
  const y = now.getFullYear();
  const yearStart = new Date(y, 0, 1);
  const yearEnd = new Date(y + 1, 0, 1);
  let used = 0;
  for (const u of usages) {
    if (u.userCardId !== card.id) continue;
    const d = parseLocalDate(u.dateISO);
    if (d >= yearStart && d < yearEnd) used += u.amountCents;
  }
  const net = used - template.annualFeeCents;
  const pct =
    template.annualFeeCents > 0 ? used / template.annualFeeCents : used > 0 ? 1 : 0;
  return {
    annualFeeCents: template.annualFeeCents,
    annualUsedCents: used,
    netCents: net,
    pct,
  };
}

export function formatUSD(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  return `${sign}$${(abs / 100).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
