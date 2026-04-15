import { currentWindow, usageInWindow } from "./periods";
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
};

export function benefitStatuses(
  card: UserCard,
  template: CardTemplate,
  usages: BenefitUsage[],
  now: Date = new Date(),
): BenefitStatus[] {
  return effectiveBenefits(card, template).map((b) => {
    const win = currentWindow(b.period, card.openedAt, now);
    const usedCents = usageInWindow(usages, b.id, card.id, win);
    const remainingCents = Math.max(0, b.amountCents - usedCents);
    const pct = b.amountCents > 0 ? usedCents / b.amountCents : 0;
    const daysLeft = Math.ceil(
      (win.end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    return {
      benefit: b,
      usedCents,
      remainingCents,
      pct,
      windowEnd: win.end,
      daysLeft,
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
    const d = new Date(u.dateISO);
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
