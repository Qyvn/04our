"use client";

import { FEATURED } from "@/data/songs";
import { BuyButton } from "@/components/BuyButton";
import { PRICE_NOTE } from "@/config/pricing";
import { bundleOf, releaseSellable } from "@/lib/store";
import { coverSrc } from "@/lib/cover";

export function MusicShop() {
  return (
    <section id="shop" className="band-ink">
      <div className="wrap">
        <header className="section-head">
          <p className="kicker">04 · Shop</p>
          <h2 className="h-xl">Own the music.</h2>
          <p className="lede">
            Every song and every EP/album can be bought — here, on the shelf, or in the full discography. Buying puts it in My Crate. {PRICE_NOTE}
          </p>
        </header>

        <ul className="shop-list">
          {FEATURED.map((r) => {
            const item = releaseSellable(r);
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
                      {r.tracks.length === 1 ? "track" : "tracks"}
                    </p>
                  </div>
                </div>
                <div className="shop-actions">
                  <BuyButton item={item} label={bundleOf(r) ? `Buy ${r.kind}` : "Buy song"} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
