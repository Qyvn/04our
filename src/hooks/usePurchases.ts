"use client";

import { useCallback, useEffect, useState } from "react";
import {
  emptyPurchases,
  loadPurchases,
  savePurchases,
  type PurchaseState,
} from "@/lib/purchases";
import type { MerchItem, SupportTier } from "@/lib/catalog";
import { owns, type Sellable } from "@/lib/store";

export function usePurchases() {
  const [state, setState] = useState<PurchaseState>(emptyPurchases);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setState(loadPurchases());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(id);
  }, [toast]);

  const persist = useCallback((next: PurchaseState, message: string) => {
    setState(next);
    savePurchases(next);
    setToast(message);
  }, []);

  /** Demo purchase: records ownership in this browser only. Never charges anything. */
  const buy = useCallback(
    (item: Sellable) => {
      const current = loadPurchases();
      if (item.comingSoon) {
        setToast(`${item.title} is coming soon.`);
        return { ok: false as const, reason: "coming-soon" as const };
      }
      if (owns(current, item)) {
        setToast("Already in your crate — open My Crate to find it.");
        setState(current);
        return { ok: false as const, reason: "duplicate" as const };
      }
      const next: PurchaseState = {
        ...current,
        tracks: [
          ...current.tracks,
          { trackId: item.key, title: item.title, purchasedAt: new Date().toISOString() },
        ],
      };
      persist(
        next,
        item.kind === "bundle"
          ? `Added to My Crate: ${item.title} (${item.songs} songs). Demo purchase.`
          : `Added to My Crate: ${item.title}. Demo purchase.`,
      );
      return { ok: true as const };
    },
    [persist],
  );

  const buyMerch = useCallback(
    (item: MerchItem) => {
      const current = loadPurchases();
      const next: PurchaseState = {
        ...current,
        merch: [
          ...current.merch,
          {
            merchId: item.id,
            name: item.name,
            purchasedAt: new Date().toISOString(),
          },
        ],
      };
      persist(next, `Merch order logged: ${item.name} (demo).`);
      return { ok: true as const };
    },
    [persist],
  );

  const joinSupport = useCallback(
    (tier: SupportTier) => {
      const current = loadPurchases();
      const next: PurchaseState = {
        ...current,
        support: {
          tierId: tier.id,
          name: tier.name,
          startedAt: new Date().toISOString(),
        },
      };
      persist(next, `You're supporting as ${tier.name}.`);
      return { ok: true as const };
    },
    [persist],
  );

  const clearAll = useCallback(() => {
    const next = emptyPurchases();
    persist(next, "Demo library cleared.");
  }, [persist]);

  return {
    state,
    ready,
    toast,
    buy,
    buyMerch,
    joinSupport,
    clearAll,
    ownsItem: (item: Sellable) => owns(state, item),
  };
}
