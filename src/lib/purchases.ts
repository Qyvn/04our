import type { LicenseId } from "@/lib/catalog";

export type OwnedTrack = {
  trackId: string;
  title: string;
  purchasedAt: string;
  licenseId?: LicenseId;
  licenseName?: string;
  priceZar?: number;
};

export type OwnedMerch = {
  merchId: string;
  name: string;
  purchasedAt: string;
};

export type ActiveSupport = {
  tierId: string;
  name: string;
  startedAt: string;
};

export type CartItem = {
  trackId: string;
  title: string;
  licenseId: LicenseId;
  licenseName: string;
  priceZar: number;
  cover: string;
};

export type PurchaseState = {
  tracks: OwnedTrack[];
  merch: OwnedMerch[];
  support: ActiveSupport | null;
  cart: CartItem[];
  /** Track IDs sold as exclusive — removed from open licenses */
  exclusiveSold: string[];
};

export const STORAGE_KEY = "04our-purchases-v2";

export const emptyPurchases = (): PurchaseState => ({
  tracks: [],
  merch: [],
  support: null,
  cart: [],
  exclusiveSold: [],
});

export function loadPurchases(): PurchaseState {
  if (typeof window === "undefined") return emptyPurchases();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Migrate v1 if present
      const legacy = window.localStorage.getItem("04our-purchases-v1");
      if (legacy) {
        const parsed = JSON.parse(legacy) as Partial<PurchaseState>;
        return {
          tracks: Array.isArray(parsed.tracks) ? parsed.tracks : [],
          merch: Array.isArray(parsed.merch) ? parsed.merch : [],
          support: parsed.support ?? null,
          cart: [],
          exclusiveSold: [],
        };
      }
      return emptyPurchases();
    }
    const parsed = JSON.parse(raw) as Partial<PurchaseState>;
    return {
      tracks: Array.isArray(parsed.tracks) ? parsed.tracks : [],
      merch: Array.isArray(parsed.merch) ? parsed.merch : [],
      support: parsed.support ?? null,
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      exclusiveSold: Array.isArray(parsed.exclusiveSold)
        ? parsed.exclusiveSold
        : [],
    };
  } catch {
    return emptyPurchases();
  }
}

export function savePurchases(state: PurchaseState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function ownsTrack(state: PurchaseState, trackId: string): boolean {
  return state.tracks.some((t) => t.trackId === trackId);
}

export function isExclusiveSold(state: PurchaseState, trackId: string): boolean {
  return state.exclusiveSold.includes(trackId);
}

export function cartTotal(state: PurchaseState): number {
  return state.cart.reduce((sum, item) => sum + item.priceZar, 0);
}
