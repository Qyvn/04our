"use client";

import { useCallback, useEffect, useState } from "react";
import {
  emptyPurchases,
  loadPurchases,
  ownsTrack,
  savePurchases,
  type PurchaseState,
} from "@/lib/purchases";
import type { MerchItem, SupportTier } from "@/lib/catalog";
import type { Release } from "@/data/songs";

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

  const buyTrack = useCallback(
    (track: Release) => {
      const current = loadPurchases();
      if (ownsTrack(current, track.id)) {
        setToast("Already in your crate — re-download free from My Library.");
        setState(current);
        return { ok: false as const, reason: "duplicate" as const };
      }
      const next: PurchaseState = {
        ...current,
        tracks: [
          ...current.tracks,
          {
            trackId: track.id,
            title: track.title,
            purchasedAt: new Date().toISOString(),
          },
        ],
      };
      persist(next, `Owned: ${track.title}. Permanent access unlocked.`);
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
    buyTrack,
    buyMerch,
    joinSupport,
    clearAll,
    ownsTrack: (id: string) => ownsTrack(state, id),
  };
}
