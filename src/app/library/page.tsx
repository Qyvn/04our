"use client";

import Link from "next/link";
import { releaseById } from "@/data/songs";
import { StreamingLinks } from "@/components/StreamingLinks";
import { usePurchasesContext } from "@/components/PurchasesProvider";

const when = (iso: string) =>
  new Date(iso).toLocaleDateString("en-ZA", { timeZone: "Africa/Johannesburg" });

export default function LibraryPage() {
  const { state, ready, clearAll } = usePurchasesContext();
  const owned = state.tracks.map((o) => ({ o, meta: releaseById(o.trackId) }));

  return (
    <main className="band-ink page-min">
      <div className="wrap">
        <header className="section-head">
          <p className="kicker">My Crate</p>
          <h1 className="h-xl">Yours for good.</h1>
          <p className="lede">
            Releases you pick up stay here. Duplicate buys are blocked on this account (demo: this browser). Open any
            release on your favourite platform from here.
          </p>
        </header>

        {!ready ? (
          <p className="muted-note">Loading crate…</p>
        ) : owned.length === 0 ? (
          <div className="empty-crate">
            <p>Your crate is empty.</p>
            <p className="muted-note">Pick up a release in the shop, then come back anytime.</p>
            <Link href="/#shop" className="btn btn-red btn-sm">
              Go to shop
            </Link>
          </div>
        ) : (
          <ul className="shop-list">
            {owned.map(({ o, meta }) => (
              <li key={o.trackId} className="shop-row">
                <div>
                  <p className="shop-title">{o.title}</p>
                  <p className="shop-meta">Owned {when(o.purchasedAt)} · Africa/Johannesburg</p>
                </div>
                {meta ? <StreamingLinks release={meta} /> : null}
              </li>
            ))}
          </ul>
        )}

        {state.merch.length > 0 ? (
          <div className="crate-block">
            <h2 className="h-lg">Merch orders</h2>
            <ul className="crate-list">
              {state.merch.map((m) => (
                <li key={`${m.merchId}-${m.purchasedAt}`}>
                  {m.name} · {when(m.purchasedAt)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {state.support ? <p className="crate-support">Supporting as {state.support.name}</p> : null}

        <button type="button" onClick={clearAll} className="btn btn-line btn-sm clear-btn">
          Clear demo library
        </button>
      </div>
    </main>
  );
}
