# Credit Card Benefit Tracker

A personal credit card benefit tracker for managing annual reimbursement credits and renewal decisions. Built for self + family use, single-user per browser.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind v4**
- **Zustand** with `persist` middleware for localStorage state
- No backend — all data stays in the browser

## Architecture

- `src/lib/types.ts` — domain types (`UserCard`, `BenefitTemplate`, `BenefitUsage`, `BenefitPeriod`)
- `src/lib/store.ts` — Zustand store, persisted under key `credit-card-tracker`
- `src/lib/periods.ts` — period window math (`monthly`, `quarterly`, `semi-annual`, `calendar-year`, `cardmember-year`)
- `src/lib/value.ts` — derived `benefitStatuses` and `cardAnnualValue`
- `src/lib/templates/` — built-in card templates (Amex Platinum 2025 refresh, Gold, Green, Chase Sapphire Reserve/Preferred, Citi Strata Premier/Prestige)
- `src/app/` — pages: `/` dashboard, `/cards/new`, `/cards/[id]`, `/settings`
- `src/components/` — `CardSummary`, `BenefitRow`, `ProgressBar`

## Conventions

- All money is stored as **integer cents** (`amountCents`).
- Card detail page groups benefits by `period.type` into sections (Monthly / Quarterly / Semi-annual / Annual). Don't show the `category` field in the UI — the user prefers period-based grouping.
- Built-in templates are static code, edited directly in `src/lib/templates/*.ts`. When a card is refreshed by the issuer, update the template in place — existing user cards reference templates by `id` and pick up changes on next render.
- Amex Platinum reflects the **2025 refresh**: $895 fee, 10 tracked credits including new Resy / Lululemon / Oura alongside kept Uber Cash / Saks / Airline / Equinox / CLEAR+. Hotel and Digital Entertainment were enhanced. Uber One and Walmart+ are part of the issuer refresh but intentionally not tracked here per user preference.

## Dev

- `npm run dev` — start dev server on :3000
- `.claude/launch.json` configures the preview server (`next-dev`)

## Data Sync Across Devices

Data is per-browser (localStorage). To move between machines: Settings → Export JSON → import on the other device. No accounts, no cloud sync.
