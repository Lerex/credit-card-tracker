import type { CardTemplate } from "../types";
import {
  amexPlatinum,
  amexGold,
  amexGreen,
  amexHiltonAspire,
  amexMarriottBrilliant,
  amexDeltaReserve,
  amexBusinessPlatinum,
} from "./amex";
import {
  chaseSapphireReserve,
  chaseSapphirePreferred,
  chaseWorldOfHyatt,
  chaseIhgPremier,
  chaseRitzCarlton,
} from "./chase";
import { citiPremier, citiStrataElite, citiAAExecutive } from "./citi";
import { capitalOneVentureX } from "./capital-one";
import {
  bofaPremiumRewardsElite,
  bofaAlaskaAscent,
  bofaAlaskaSummit,
} from "./other";

export const CARD_TEMPLATES: CardTemplate[] = [
  amexPlatinum,
  amexGold,
  amexGreen,
  amexHiltonAspire,
  amexMarriottBrilliant,
  amexDeltaReserve,
  amexBusinessPlatinum,
  chaseSapphireReserve,
  chaseSapphirePreferred,
  chaseWorldOfHyatt,
  chaseIhgPremier,
  chaseRitzCarlton,
  citiPremier,
  citiStrataElite,
  citiAAExecutive,
  capitalOneVentureX,
  bofaPremiumRewardsElite,
  bofaAlaskaAscent,
  bofaAlaskaSummit,
];

const byId = new Map(CARD_TEMPLATES.map((t) => [t.id, t]));

export function getTemplate(id: string): CardTemplate | undefined {
  return byId.get(id);
}

/* ── Issuer brand colours ── */

export const ISSUER_COLORS: Record<string, { primary: string; light: string }> = {
  Amex: { primary: "#006FCF", light: "#4DA3FF" },
  Chase: { primary: "#124A8A", light: "#2E7BD6" },
  Citi: { primary: "#003B70", light: "#1A6EB5" },
  "Capital One": { primary: "#D03027", light: "#E8655E" },
  Other: { primary: "#6366F1", light: "#A5B4FC" },
};

const TEMPLATE_COLOR_OVERRIDES: Record<string, { primary: string; light: string }> = {
  "bofa-premium-rewards-elite": { primary: "#E31837", light: "#F06070" },
  "bofa-atmos-ascent": { primary: "#00467F", light: "#3A8FD6" },
  "bofa-atmos-summit": { primary: "#00467F", light: "#3A8FD6" },
};

export function getCardColor(template: CardTemplate): { primary: string; light: string } {
  return TEMPLATE_COLOR_OVERRIDES[template.id] ?? ISSUER_COLORS[template.issuer] ?? ISSUER_COLORS["Other"];
}
