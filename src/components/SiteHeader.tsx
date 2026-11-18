"use client";

import Link from "next/link";
import { ARTIST } from "@/lib/catalog";
import { usePurchasesContext } from "@/components/PurchasesProvider";

const links = [
  { href: "/#listen", label: "Listen" },
  { href: "/#shop", label: "Shop" },
  { href: "/#support", label: "Support" },
  { href: "/#merch", label: "Merch" },
  { href: "/library", label: "My Crate" },
];

export function SiteHeader() {
  const { state, ready } = usePurchasesContext();
  const count = ready ? state.tracks.length : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-concrete/80 bg-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-baseline gap-1">
          <span className="font-display text-2xl tracking-tight text-paper md:text-3xl">
            {ARTIST.stageName}
          </span>
          <span className="h-2 w-2 translate-y-[-6px] bg-signal" aria-hidden />
        </Link>
        <nav className="hidden items-center gap-5 text-[11px] font-ui uppercase tracking-[0.18em] text-asphalt md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-paper"
            >
              {link.label}
              {link.href === "/library" && count > 0 ? (
                <span className="ml-1 text-signal">({count})</span>
              ) : null}
            </Link>
          ))}
        </nav>
        <Link
          href="/library"
          className="border border-paper/30 px-3 py-1.5 text-[10px] font-ui uppercase tracking-[0.2em] text-paper transition-colors hover:border-signal hover:text-signal md:hidden"
        >
          Crate{count ? ` ${count}` : ""}
        </Link>
      </div>
    </header>
  );
}
