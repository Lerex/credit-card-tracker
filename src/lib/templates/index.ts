import type { CardTemplate } from "../types";
import { amexPlatinum, amexGold, amexGreen } from "./amex";
import { chaseSapphireReserve, chaseSapphirePreferred } from "./chase";
import { citiPremier, citiPrestige } from "./citi";

export const CARD_TEMPLATES: CardTemplate[] = [
  amexPlatinum,
  amexGold,
  amexGreen,
  chaseSapphireReserve,
  chaseSapphirePreferred,
  citiPremier,
  citiPrestige,
];

const byId = new Map(CARD_TEMPLATES.map((t) => [t.id, t]));

export function getTemplate(id: string): CardTemplate | undefined {
  return byId.get(id);
}
