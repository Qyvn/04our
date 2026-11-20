"use client";

import Link from "next/link";
import { FEATURED } from "@/data/songs";
import { formatZar } from "@/lib/catalog";
import { coverSrc } from "@/lib/cover";
import { usePurchasesContext } from "@/components/PurchasesProvider";

export function MusicShop() {
  const { buyTrack, ownsTrack, ready } = usePurchasesContext();

  return (
    <section id="shop" className="band-ink">
      <div className="wrap">
        <header className="section-head">
          <p className="kicker">04 · Shop</p>
          <h2 className="h-xl">Own the music.</h2>
          <p className="lede">
            Pick up a release here and it lives in My Crate for good. Demo checkout only — no real payments, and
            prices are placeholders.
          </p>
        </header>

        <ul className="shop-list">
          {FEATURED.map((r) => {
            const owned = ready && ownsTrack(r.id);
            return (
              <li key={r.id} className="shop-row">
                <div className="shop-info">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {coverSrc(r) ? <img src={coverSrc(r)!} alt="" width={72} height={72} loading="lazy" /> : <span className="cover-blank" style={{ width: 72, height: 72 }}>04</span>}
                  <div className="min-w-0">
                    <p className="shop-title">{r.title}</p>
                    <p className="shop-meta">
                      {r.kind}
                      {r.released ? ` · ${r.released.slice(0, 4)}` : ""} · {r.tracks.length}{" "}
                      {r.tracks.length === 1 ? "track" : "tracks"} · {formatZar(r.priceZar ?? 0)}
                    </p>
                  </div>
                </div>
                <div className="shop-actions">
                  {owned ? (
                    <>
                      <span className="owned">In your crate</span>
                      <Link href="/library" className="btn btn-line btn-sm">
                        Open My Crate
                      </Link>
                    </>
                  ) : r.comingSoon ? (
                    <span className="owned owned-soon">Coming soon</span>
                  ) : (
                    <button type="button" onClick={() => buyTrack(r)} className="btn btn-red btn-sm">
                      Buy {formatZar(r.priceZar ?? 0)}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
