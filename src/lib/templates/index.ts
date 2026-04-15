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
