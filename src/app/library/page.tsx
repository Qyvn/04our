"use client";

import Link from "next/link";
import { TRACKS } from "@/lib/catalog";
import { withBase } from "@/lib/paths";
import { usePurchasesContext } from "@/components/PurchasesProvider";

export default function LibraryPage() {
  const { state, ready, clearAll } = usePurchasesContext();

  const owned = state.tracks.map((ownedTrack) => {
    const meta = TRACKS.find((t) => t.id === ownedTrack.trackId);
    return { ownedTrack, meta };
  });

  return (
    <main className="min-h-[70vh] border-b border-concrete bg-ink">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <p className="text-[10px] font-ui uppercase tracking-[0.35em] text-signal">
          Permanent access
        </p>
        <h1 className="mt-2 font-display text-4xl text-paper md:text-6xl">
          My Crate
        </h1>
        <p className="mt-3 max-w-xl text-sm text-asphalt md:text-base">
          Songs you bought stay here forever. Lost a file? Re-download free.
          Duplicate buys are blocked on this account (demo: this browser).
        </p>

        {!ready ? (
          <p className="mt-10 text-asphalt">Loading crate…</p>
        ) : owned.length === 0 ? (
          <div className="mt-10 border border-dashed border-concrete p-8">
            <p className="text-paper">Your crate is empty.</p>
            <p className="mt-2 text-sm text-asphalt">
              Buy a release on the shop, then come back to re-download anytime.
            </p>
            <Link
              href="/#shop"
              className="mt-6 inline-block bg-signal px-4 py-2 text-[10px] font-ui uppercase tracking-[0.2em] text-paper"
            >
              Go to shop
            </Link>
          </div>
        ) : (
          <ul className="mt-10 divide-y divide-concrete border-y border-concrete">
            {owned.map(({ ownedTrack, meta }) => (
              <li
                key={ownedTrack.trackId}
                className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-display text-xl text-paper">
                    {ownedTrack.title}
                  </p>
                  <p className="text-[10px] font-ui uppercase tracking-[0.18em] text-asphalt">
                    Owned{" "}
                    {new Date(ownedTrack.purchasedAt).toLocaleDateString(
                      "en-ZA",
                      { timeZone: "Africa/Johannesburg" },
                    )}{" "}
                    · Africa/Johannesburg
                  </p>
                </div>
                <a
                  href={withBase(meta?.preview || "/audio/preview-tone.mp3")}
                  download={`${ownedTrack.trackId}-04our.mp3`}
                  className="inline-flex bg-signal px-4 py-2 text-[10px] font-ui uppercase tracking-[0.2em] text-paper"
                >
                  Re-download free
                </a>
              </li>
            ))}
          </ul>
        )}

        {state.merch.length > 0 ? (
          <div className="mt-12">
            <h2 className="font-display text-2xl text-paper">Merch orders</h2>
            <ul className="mt-4 space-y-2 text-sm text-asphalt">
              {state.merch.map((m) => (
                <li key={`${m.merchId}-${m.purchasedAt}`}>
                  {m.name} ·{" "}
                  {new Date(m.purchasedAt).toLocaleDateString("en-ZA", {
                    timeZone: "Africa/Johannesburg",
                  })}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {state.support ? (
          <p className="mt-10 text-sm text-signal">
            Supporting as {state.support.name}
          </p>
        ) : null}

        <button
          type="button"
          onClick={clearAll}
          className="mt-12 border border-paper/20 px-3 py-2 text-[10px] font-ui uppercase tracking-[0.18em] text-asphalt hover:text-paper"
        >
          Clear demo library
        </button>
      </div>
    </main>
  );
}
