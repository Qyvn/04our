"use client";

import Link from "next/link";
import { ARTIST } from "@/lib/catalog";
import { usePurchasesContext } from "@/components/PurchasesProvider";

const links = [
  { href: "/#listen", label: "Listen" },
  { href: "/#videos", label: "Videos" },
  { href: "/#shop", label: "Shop" },
  { href: "/#support", label: "Support" },
  { href: "/#merch", label: "Merch" },
  { href: "/library", label: "My Crate" },
];

export function SiteHeader() {
  const { state, ready } = usePurchasesContext();
  const count = ready ? state.tracks.length : 0;

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="brand">
          {ARTIST.stageName}
          <i aria-hidden />
        </Link>
        <nav className="nav" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
              {l.href === "/library" && count ? <b>{count}</b> : null}
            </Link>
          ))}
        </nav>
        <Link href="/library" className="crate-pill">
          Crate{count ? ` ${count}` : ""}
        </Link>
      </div>
    </header>
  );
}
