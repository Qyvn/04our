"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { usePurchases } from "@/hooks/usePurchases";

type PurchasesContextValue = ReturnType<typeof usePurchases>;

const PurchasesContext = createContext<PurchasesContextValue | null>(null);

export function PurchasesProvider({ children }: { children: ReactNode }) {
  const value = usePurchases();
  return (
    <PurchasesContext.Provider value={value}>
      {children}
      {value.toast ? (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[80] max-w-[90vw] -translate-x-1/2 border border-signal bg-ink px-4 py-3 text-center text-sm text-paper shadow-[0_0_0_1px_rgba(200,16,46,0.35)]"
        >
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
