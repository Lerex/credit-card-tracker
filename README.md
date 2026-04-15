# Credit Card Benefit Tracker

A personal credit card benefit tracker for managing annual reimbursement credits and renewal decisions. Built for self + family use — single-user per browser, no accounts, no cloud.

## What it does

Track recurring credits (e.g. Amex Platinum's $300 semi-annual hotel credit, Sapphire Reserve's $150 dining credit, Hilton Aspire free-night certs) so you can see at a glance:

- How much value you've actually pulled from each card this year
- Whether the card is "earning back" its annual fee
- Which credits expire soon and you haven't used yet

Renewal decisions get easier when the math is in front of you.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind v4**
- **Zustand** with `persist` middleware (data lives in `localStorage`)
- **OpenNext** adapter for Cloudflare Workers deployment
- No backend — everything stays in the browser

## Built-in card templates

19 templates as of April 2026, kept in sync with the latest issuer refreshes:

| Issuer | Cards |
| --- | --- |
| Amex | Platinum, Gold, Green, Hilton Aspire, Marriott Bonvoy Brilliant, Delta SkyMiles Reserve, Business Platinum |
| Chase | Sapphire Reserve, Sapphire Preferred, World of Hyatt, IHG One Rewards Premier, Ritz-Carlton |
| Citi | Strata Premier, Strata Elite, AAdvantage Executive |
| Capital One | Venture X |
| BofA | Premium Rewards Elite, Atmos Ascent, Atmos Summit |

Templates reflect 2025–2026 refreshes — Amex Platinum / Business Platinum ($895 fees, ChatGPT / Hilton credits), Chase Sapphire Reserve June 2025 overhaul ($795, The Edit, dining + StubHub credits, Peloton, Apple TV+/Music), and the Citi / BofA Atmos rebrands.

## Architecture

- `src/lib/types.ts` — domain types (`UserCard`, `BenefitTemplate`, `BenefitUsage`, `BenefitPeriod`)
- `src/lib/store.ts` — Zustand store, persisted under key `credit-card-tracker`
- `src/lib/periods.ts` — period window math (`monthly`, `quarterly`, `semi-annual`, `calendar-year`, `cardmember-year`)
- `src/lib/value.ts` — derived `benefitStatuses` and `cardAnnualValue`
- `src/lib/templates/` — built-in card templates, edited in place when issuers refresh
- `src/app/` — pages: `/` dashboard, `/cards/new`, `/cards/[id]`, `/settings`
- `src/components/` — `CardSummary`, `BenefitRow`, `ProgressBar`

All money is stored as integer cents (`amountCents`). Card detail pages group benefits by period (Monthly / Quarterly / Semi-annual / Annual) rather than by category.

## Development

```bash
npm install
npm run dev       # localhost:3000
```

Other scripts:

```bash
npm run build     # next build
npm run preview   # local Cloudflare Workers preview via OpenNext
npm run deploy    # build + deploy to Cloudflare Workers
```

## Adding or refreshing a card template

1. Edit the matching file in `src/lib/templates/` (or add a new one).
2. Export the new template and register it in `src/lib/templates/index.ts`.
3. When an issuer refreshes a card, edit the existing template in place — user cards reference templates by `id`, so they pick up the new fee / benefits on next render. Don't change the `id` unless you're truly creating a new product.

Use `unit: "flat"` + `amountCents: 0` for non-cash perks (free-night certs, companion award certs) — the UI renders these as a checkbox per period rather than an amount field.

## Data sync across devices

Data is per-browser. To move between machines: **Settings → Export JSON → import on the other device**. No accounts, no cloud sync.
