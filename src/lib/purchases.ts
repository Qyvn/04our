export type OwnedTrack = {
  trackId: string;
  title: string;
  purchasedAt: string;
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

export type PurchaseState = {
  tracks: OwnedTrack[];
  merch: OwnedMerch[];
  support: ActiveSupport | null;
};

export const STORAGE_KEY = "04our-purchases-v1";

export const emptyPurchases = (): PurchaseState => ({
  tracks: [],
  merch: [],
  support: null,
});

export function loadPurchases(): PurchaseState {
  if (typeof window === "undefined") return emptyPurchases();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyPurchases();
    const parsed = JSON.parse(raw) as PurchaseState;
    return {
      tracks: Array.isArray(parsed.tracks) ? parsed.tracks : [],
      merch: Array.isArray(parsed.merch) ? parsed.merch : [],
      support: parsed.support ?? null,
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
