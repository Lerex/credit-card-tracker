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
} from "./chase";
import { citiPremier, citiPrestige, citiAAExecutive } from "./citi";
import { capitalOneVentureX } from "./capital-one";
import { bofaPremiumRewardsElite } from "./other";

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
  citiPremier,
  citiPrestige,
  citiAAExecutive,
  capitalOneVentureX,
  bofaPremiumRewardsElite,
];

const byId = new Map(CARD_TEMPLATES.map((t) => [t.id, t]));

export function getTemplate(id: string): CardTemplate | undefined {
  return byId.get(id);
}
