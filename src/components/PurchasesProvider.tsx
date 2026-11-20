"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePurchases } from "@/hooks/usePurchases";
import { PRICE_NOTE } from "@/config/pricing";
import { formatZar } from "@/lib/catalog";
import type { Sellable } from "@/lib/store";

type PurchasesContextValue = ReturnType<typeof usePurchases> & {
  openCheckout: (item: Sellable) => void;
};

const PurchasesContext = createContext<PurchasesContextValue | null>(null);

function CheckoutDialog({ item, onClose, onConfirm }: { item: Sellable; onClose: () => void; onConfirm: () => void }) {
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    btn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="checkout-back" onClick={onClose} data-testid="checkout">
      <div
        className="checkout"
        role="dialog"
        aria-modal="true"
        aria-labelledby="co-title"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="checkout-demo">Demo checkout · nothing is charged</p>
        <h3 id="co-title" className="h-lg">
          {item.title}
        </h3>
        <p className="muted-note">{item.subtitle}</p>
        <p className="checkout-price">
          {formatZar(item.priceZar)} <small>placeholder price</small>
        </p>
        <p className="muted-note">{PRICE_NOTE}</p>
        <div className="checkout-actions">
          <button ref={btn} type="button" className="btn btn-red" onClick={onConfirm} data-testid="checkout-confirm">
            Confirm demo purchase
          </button>
          <button type="button" className="btn btn-line" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function PurchasesProvider({ children }: { children: ReactNode }) {
  const value = usePurchases();
  const [pending, setPending] = useState<Sellable | null>(null);
  const openCheckout = useCallback((item: Sellable) => setPending(item), []);
  const close = useCallback(() => setPending(null), []);
  const { buy } = value;
  return (
    <PurchasesContext.Provider value={{ ...value, openCheckout }}>
      {children}
      {pending ? (
        <CheckoutDialog
          item={pending}
          onClose={close}
          onConfirm={() => {
            buy(pending);
            setPending(null);
          }}
        />
      ) : null}
      {value.toast ? (
        <div role="status" className="toast">
          {value.toast}
        </div>
      ) : null}
    </PurchasesContext.Provider>
  );
}

export function usePurchasesContext() {
  const ctx = useContext(PurchasesContext);
  if (!ctx) {
    throw new Error("usePurchasesContext must be used within PurchasesProvider");
  }
  return ctx;
}
