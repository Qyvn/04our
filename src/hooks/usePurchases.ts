"use client";

import { useCallback, useEffect, useState } from "react";
import {
  cartTotal,
  emptyPurchases,
  isExclusiveSold,
  loadPurchases,
  ownsTrack,
  savePurchases,
  type CartItem,
  type PurchaseState,
} from "@/lib/purchases";
import type {
  LicenseOption,
  MerchItem,
  SupportTier,
  Track,
} from "@/lib/catalog";

export function usePurchases() {
  const [state, setState] = useState<PurchaseState>(emptyPurchases);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setState(loadPurchases());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(id);
  }, [toast]);

  const persist = useCallback((next: PurchaseState, message?: string) => {
    setState(next);
    savePurchases(next);
    if (message) setToast(message);
  }, []);

  const buyTrack = useCallback(
    (track: Track, license?: LicenseOption) => {
      const current = loadPurchases();
      if (isExclusiveSold(current, track.id)) {
        setToast("Exclusive already sold — this release is off the market.");
        setState(current);
        return { ok: false as const, reason: "exclusive_sold" as const };
      }
      if (ownsTrack(current, track.id)) {
        setToast("Already in your crate — re-download free from My Crate.");
        setState(current);
        return { ok: false as const, reason: "duplicate" as const };
      }
      const chosen = license ?? track.licenses[0];
      const next: PurchaseState = {
        ...current,
        tracks: [
          ...current.tracks,
          {
            trackId: track.id,
            title: track.title,
            purchasedAt: new Date().toISOString(),
            licenseId: chosen.id,
            licenseName: chosen.name,
            priceZar: chosen.priceZar,
          },
        ],
        exclusiveSold: chosen.exclusive
          ? [...current.exclusiveSold, track.id]
          : current.exclusiveSold,
      };
      persist(
        next,
        `Owned: ${track.title} (${chosen.name}). Instant download in My Crate.`,
      );
      return { ok: true as const };
    },
    [persist],
  );

  const addToCart = useCallback(
    (track: Track, license: LicenseOption) => {
      const current = loadPurchases();
      if (isExclusiveSold(current, track.id)) {
        setToast("Exclusive already sold for this release.");
        setState(current);
        return { ok: false as const, reason: "exclusive_sold" as const };
      }
      if (ownsTrack(current, track.id)) {
        setToast("Already in your crate — open My Crate to download.");
        setState(current);
        return { ok: false as const, reason: "duplicate" as const };
      }
      const withoutSameTrack = current.cart.filter(
        (item) => item.trackId !== track.id,
      );
      const item: CartItem = {
        trackId: track.id,
        title: track.title,
        licenseId: license.id,
        licenseName: license.name,
        priceZar: license.priceZar,
        cover: track.cover,
      };
      const next: PurchaseState = {
        ...current,
        cart: [...withoutSameTrack, item],
      };
      persist(next, `Added ${track.title} · ${license.name}`);
      setCartOpen(true);
      return { ok: true as const };
    },
    [persist],
  );

  const removeFromCart = useCallback(
    (trackId: string) => {
      const current = loadPurchases();
      const next: PurchaseState = {
        ...current,
        cart: current.cart.filter((item) => item.trackId !== trackId),
      };
      persist(next);
    },
    [persist],
  );

  const checkoutCart = useCallback(() => {
    const current = loadPurchases();
    if (current.cart.length === 0) {
      setToast("Cart is empty.");
      return { ok: false as const, reason: "empty" as const };
    }

    const purchasedAt = new Date().toISOString();
    const newTracks = [...current.tracks];
    const exclusiveSold = [...current.exclusiveSold];

    for (const item of current.cart) {
      if (ownsTrack({ ...current, tracks: newTracks }, item.trackId)) continue;
      if (exclusiveSold.includes(item.trackId)) continue;
      newTracks.push({
        trackId: item.trackId,
        title: item.title,
        purchasedAt,
        licenseId: item.licenseId,
        licenseName: item.licenseName,
        priceZar: item.priceZar,
      });
      if (item.licenseId === "exclusive") {
        exclusiveSold.push(item.trackId);
      }
    }

    const next: PurchaseState = {
      ...current,
      tracks: newTracks,
      cart: [],
      exclusiveSold,
    };
    const added = newTracks.length - current.tracks.length;
    persist(
      next,
      `Checkout complete — ${added} release${added === 1 ? "" : "s"} unlocked in My Crate.`,
    );
    setCartOpen(false);
    return { ok: true as const };
  }, [persist]);

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
    cartOpen,
    setCartOpen,
    cartCount: state.cart.length,
    cartTotal: cartTotal(state),
    buyTrack,
    addToCart,
    removeFromCart,
    checkoutCart,
    buyMerch,
    joinSupport,
    clearAll,
    ownsTrack: (id: string) => ownsTrack(state, id),
    isExclusiveSold: (id: string) => isExclusiveSold(state, id),
  };
}
