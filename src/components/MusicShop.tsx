"use client";

import Image from "next/image";
import Link from "next/link";
import { TRACKS, formatZar } from "@/lib/catalog";
import { withBase } from "@/lib/paths";
import { usePurchasesContext } from "@/components/PurchasesProvider";

export function MusicShop() {
  const { buyTrack, ownsTrack, ready } = usePurchasesContext();

  return (
    <section id="shop" className="border-b border-concrete bg-[#0d0d0d]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="text-[10px] font-ui uppercase tracking-[0.35em] text-signal">
            Direct on-site sales
          </p>
          <h2 className="mt-2 font-display text-4xl text-paper md:text-6xl">
            Buy the music
          </h2>
          <p className="mt-3 text-sm text-asphalt md:text-base">
            Buy releases on-site. Owned tracks land in My Crate for free
            re-download — duplicate buys are blocked. Demo checkout only.
          </p>
        </div>

        <ul className="divide-y divide-concrete border-y border-concrete">
          {TRACKS.map((track) => {
            const owned = ready && ownsTrack(track.id);
            return (
              <li
                key={track.id}
                className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-paper/15">
                    <Image
                      src={withBase(track.cover)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-xl text-paper">{track.title}</p>
                    <p className="text-[10px] font-ui uppercase tracking-[0.18em] text-asphalt">
                      {track.release} · {track.year} · {formatZar(track.priceZar)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  {owned ? (
                    <>
                      <span className="text-[10px] font-ui uppercase tracking-[0.18em] text-signal">
                        In your crate
                      </span>
                      <Link
                        href="/library"
                        className="border border-signal px-4 py-2 text-[10px] font-ui uppercase tracking-[0.2em] text-signal"
                      >
                        Re-download free
                      </Link>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => buyTrack(track)}
                      className="bg-signal px-4 py-2 text-[10px] font-ui uppercase tracking-[0.2em] text-paper"
                    >
                      Buy {formatZar(track.priceZar)}
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
