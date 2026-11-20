/**
 * PRICING — the ONE place to change what the music costs (demo store).
 *
 * ⚠ PLACEHOLDER PRICES. No real payments are wired up yet: checkout is a demo, nothing is charged.
 * Change the numbers below and every Buy button, the checkout dialog and My Crate update on the next build.
 *
 *  - songZar    : one song (also a single-track release)
 *  - bundleZar  : a whole EP / album bought as a bundle (unlocks every song on it)
 *  - overrides  : optional price for ONE item, keyed by sellable key (see src/lib/store.ts):
 *                   "<releaseId>"            -> the release / bundle
 *                   "<releaseId>:<trackId>"  -> one song on a multi-track release
 *                 e.g. { "in-4mation-ep": 89, "in-4mation-ep:somesong": 19 }
 */
export const PRICING = {
  songZar: 29,
  bundleZar: 99,
  overrides: {} as Record<string, number>,
} as const;

export const PRICE_IS_PLACEHOLDER = true;
export const PRICE_NOTE =
  "Placeholder prices. Demo checkout only — no real payment is taken yet, real payments are coming soon.";
