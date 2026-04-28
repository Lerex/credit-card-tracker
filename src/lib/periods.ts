import { parseLocalDate } from "./dates";
import type { BenefitPeriod, BenefitUsage } from "./types";

export type Window = { start: Date; end: Date };

export function currentWindow(
  period: BenefitPeriod,
  openedAt: string,
  now: Date = new Date(),
): Window {
  const y = now.getFullYear();
  const m = now.getMonth();

  switch (period.type) {
    case "calendar-year":
      return { start: new Date(y, 0, 1), end: new Date(y + 1, 0, 1) };

    case "monthly":
      return { start: new Date(y, m, 1), end: new Date(y, m + 1, 1) };

    case "quarterly": {
      const qStart = Math.floor(m / 3) * 3;
      return { start: new Date(y, qStart, 1), end: new Date(y, qStart + 3, 1) };
    }

    case "semi-annual": {
      const hStart = m < 6 ? 0 : 6;
      return { start: new Date(y, hStart, 1), end: new Date(y, hStart + 6, 1) };
    }

    case "cardmember-year": {
      const opened = parseLocalDate(openedAt);
      const anchorMonth = opened.getMonth();
      const anchorDay = opened.getDate();
      let start = new Date(y, anchorMonth, anchorDay);
      if (start > now) start = new Date(y - 1, anchorMonth, anchorDay);
      const end = new Date(
        start.getFullYear() + 1,
        start.getMonth(),
        start.getDate(),
      );
      return { start, end };
    }
  }
}

export function usageInWindow(
  usages: BenefitUsage[],
  benefitId: string,
  userCardId: string,
  win: Window,
): number {
  let total = 0;
  for (const u of usages) {
    if (u.userCardId !== userCardId) continue;
    if (u.benefitId !== benefitId) continue;
    const d = parseLocalDate(u.dateISO);
    if (d >= win.start && d < win.end) total += u.amountCents;
  }
  return total;
}

export function daysUntil(date: Date, now: Date = new Date()): number {
  const ms = date.getTime() - now.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}
