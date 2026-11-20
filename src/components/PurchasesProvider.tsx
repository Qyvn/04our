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
          className="toast"
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
