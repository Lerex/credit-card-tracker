"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BenefitTemplate, BenefitUsage, ExportPayload, UserCard } from "./types";

type State = {
  userCards: UserCard[];
  usages: BenefitUsage[];
  hydrated: boolean;
};

type Actions = {
  addCard: (card: Omit<UserCard, "id">) => string;
  updateCard: (id: string, patch: Partial<UserCard>) => void;
  removeCard: (id: string) => void;
  toggleBenefit: (cardId: string, benefitId: string, enabled: boolean) => void;
  addCustomBenefit: (cardId: string, benefit: BenefitTemplate) => void;
  logUsage: (usage: Omit<BenefitUsage, "id">) => void;
  removeUsage: (id: string) => void;
  setBenefitExpiration: (
    cardId: string,
    benefitId: string,
    dateISO: string | null,
  ) => void;
  exportJSON: () => ExportPayload;
  importJSON: (payload: ExportPayload) => void;
  clearAll: () => void;
};

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      userCards: [],
      usages: [],
      hydrated: false,

      addCard: (card) => {
        const id = uid();
        set((s) => ({ userCards: [...s.userCards, { ...card, id }] }));
        return id;
      },

      updateCard: (id, patch) =>
        set((s) => ({
          userCards: s.userCards.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),

      removeCard: (id) =>
        set((s) => ({
          userCards: s.userCards.filter((c) => c.id !== id),
          usages: s.usages.filter((u) => u.userCardId !== id),
        })),

      toggleBenefit: (cardId, benefitId, enabled) =>
        set((s) => ({
          userCards: s.userCards.map((c) => {
            if (c.id !== cardId) return c;
            const set = new Set(c.disabledBenefitIds ?? []);
            if (enabled) set.delete(benefitId);
            else set.add(benefitId);
            return { ...c, disabledBenefitIds: [...set] };
          }),
        })),

      addCustomBenefit: (cardId, benefit) =>
        set((s) => ({
          userCards: s.userCards.map((c) =>
            c.id === cardId
              ? { ...c, customBenefits: [...(c.customBenefits ?? []), benefit] }
              : c,
          ),
        })),

      logUsage: (usage) =>
        set((s) => ({ usages: [...s.usages, { ...usage, id: uid() }] })),

      removeUsage: (id) =>
        set((s) => ({ usages: s.usages.filter((u) => u.id !== id) })),

      setBenefitExpiration: (cardId, benefitId, dateISO) =>
        set((s) => ({
          userCards: s.userCards.map((c) => {
            if (c.id !== cardId) return c;
            const next = { ...(c.benefitExpirations ?? {}) };
            if (dateISO) next[benefitId] = dateISO;
            else delete next[benefitId];
            return { ...c, benefitExpirations: next };
          }),
        })),

      exportJSON: () => ({
        version: 1,
        exportedAt: new Date().toISOString(),
        userCards: get().userCards,
        usages: get().usages,
      }),

      importJSON: (payload) =>
        set({ userCards: payload.userCards, usages: payload.usages }),

      clearAll: () => set({ userCards: [], usages: [] }),
    }),
    {
      name: "credit-card-tracker",
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);
