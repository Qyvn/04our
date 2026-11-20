"use client";

import Link from "next/link";
import { sellableByKey } from "@/lib/store";
import { StreamingLinks } from "@/components/StreamingLinks";
import { usePurchasesContext } from "@/components/PurchasesProvider";

const when = (iso: string) =>
  new Date(iso).toLocaleDateString("en-ZA", { timeZone: "Africa/Johannesburg" });

export default function LibraryPage() {
  const { state, ready, clearAll } = usePurchasesContext();
  const owned = state.tracks.map((o) => ({ o, found: sellableByKey(o.trackId) }));

  return (
    <main className="band-ink page-min">
      <div className="wrap">
        <header className="section-head">
          <p className="kicker">My Crate</p>
          <h1 className="h-xl">Yours for good.</h1>
          <p className="lede">
            Songs and EPs you pick up stay here (demo: saved in this browser only — no real payment was taken). Duplicate
            buys are blocked. Open any of them on your favourite platform from here.
          </p>
        </header>

        {!ready ? (
          <p className="muted-note">Loading crate…</p>
        ) : owned.length === 0 ? (
          <div className="empty-crate">
            <p>Your crate is empty.</p>
            <p className="muted-note">Buy a song or an EP (demo checkout), then come back anytime.</p>
            <Link href="/#listen" className="btn btn-red btn-sm">
              Go to the music
            </Link>
          </div>
        ) : (
          <ul className="shop-list">
            {owned.map(({ o, found }) => (
              <li key={o.trackId} className="shop-row">
                <div>
                  <p className="shop-title">{o.title}</p>
                  <p className="shop-meta">
                    {found ? `${found.item.subtitle} · ` : ""}Owned {when(o.purchasedAt)} · demo purchase
                  </p>
                </div>
                {found ? <StreamingLinks release={found.release} track={found.item.kind === "song" ? found.release.tracks.find((t) => t.id === found.item.trackId) : undefined} /> : null}
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
