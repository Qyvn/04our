"use client";

import Image from "next/image";
import Link from "next/link";
import { formatZar } from "@/lib/catalog";
import { withBase } from "@/lib/paths";
import { usePurchasesContext } from "@/components/PurchasesProvider";

export function CartDrawer() {
  const {
    state,
    cartOpen,
    setCartOpen,
    cartTotal,
    removeFromCart,
    checkoutCart,
  } = usePurchasesContext();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-ink/70"
        aria-label="Close cart"
        onClick={() => setCartOpen(false)}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-concrete bg-ink shadow-2xl">
        <div className="flex items-center justify-between border-b border-concrete px-5 py-4">
          <div>
            <p className="text-[10px] font-ui uppercase tracking-[0.3em] text-signal">
              Cart
            </p>
            <h2 className="font-display text-3xl text-paper">Checkout</h2>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="border border-paper/30 px-3 py-1.5 text-[10px] font-ui uppercase tracking-[0.2em] text-paper"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {state.cart.length === 0 ? (
            <p className="text-sm text-asphalt">
              Empty — pick a license in the music store to add a release.
            </p>
          ) : (
            <ul className="space-y-4">
              {state.cart.map((item) => (
                <li
                  key={`${item.trackId}-${item.licenseId}`}
                  className="flex gap-3 border-b border-concrete pb-4"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-paper/15">
                    <Image
                      src={withBase(item.cover)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg text-paper">
                      {item.title}
                    </p>
                    <p className="text-[10px] font-ui uppercase tracking-[0.16em] text-asphalt">
                      {item.licenseName} · {formatZar(item.priceZar)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.trackId)}
                      className="mt-2 text-[10px] font-ui uppercase tracking-[0.18em] text-asphalt hover:text-signal"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-concrete px-5 py-5">
          <div className="mb-4 flex items-end justify-between">
            <span className="text-[10px] font-ui uppercase tracking-[0.2em] text-asphalt">
              Total
            </span>
            <span className="font-display text-3xl text-paper">
              {formatZar(cartTotal)}
            </span>
          </div>
          <button
            type="button"
            disabled={state.cart.length === 0}
            onClick={() => checkoutCart()}
            className="w-full bg-signal px-4 py-3 text-[11px] font-ui uppercase tracking-[0.22em] text-paper disabled:opacity-40"
          >
            Checkout · Instant download
          </button>
          <p className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-asphalt">
            Demo checkout · No real payment · Files land in{" "}
            <Link href="/library" className="text-signal" onClick={() => setCartOpen(false)}>
              My Crate
            </Link>
          </p>
        </div>
      </aside>
    </div>
  );
}
