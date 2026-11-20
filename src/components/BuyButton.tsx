"use client";

import Link from "next/link";
import { usePurchasesContext } from "@/components/PurchasesProvider";
import { formatZar } from "@/lib/catalog";
import type { Sellable } from "@/lib/store";

/** One Buy control used everywhere (shelf, deck, tracklist, discography, shop). States: Buy / Owned / Coming soon. */
export function BuyButton({
  item,
  label,
  className = "",
  compact = false,
}: {
  item: Sellable;
  /** e.g. "Buy EP" — defaults to "Buy" */
  label?: string;
  className?: string;
  compact?: boolean;
}) {
  const { ownsItem, openCheckout, ready } = usePurchasesContext();
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  if (item.comingSoon) {
    return (
      <span className={`buy buy-soon ${compact ? "buy-compact" : ""} ${className}`} data-testid="buy-soon">
        Coming soon
      </span>
    );
  }
  if (ready && ownsItem(item)) {
    return (
      <Link
        href="/library"
        onClick={stop}
        className={`buy buy-owned ${compact ? "buy-compact" : ""} ${className}`}
        data-testid="buy-owned"
        aria-label={`${item.title} — owned, open My Crate`}
      >
        ✓ Owned
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={(e) => {
        stop(e);
        openCheckout(item);
      }}
      className={`buy buy-go ${compact ? "buy-compact" : ""} ${className}`}
      data-testid="buy-btn"
      aria-label={`${label ?? "Buy"} ${item.title} for ${formatZar(item.priceZar)}`}
    >
      {label ?? "Buy"} {formatZar(item.priceZar)}
    </button>
  );
}
