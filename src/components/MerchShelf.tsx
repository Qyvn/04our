"use client";

import Image from "next/image";
import { MERCH, formatZar } from "@/lib/catalog";
import { withBase } from "@/lib/paths";
import { usePurchasesContext } from "@/components/PurchasesProvider";

export function MerchShelf() {
  const { buyMerch } = usePurchasesContext();

  return (
    <section id="merch" className="border-b border-concrete bg-[#0d0d0d]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10">
          <p className="text-[10px] font-ui uppercase tracking-[0.35em] text-signal">
            Wear the archive
          </p>
          <h2 className="mt-2 font-display text-4xl text-paper md:text-6xl">
            Merchandise
          </h2>
          <p className="mt-3 max-w-lg text-sm text-asphalt md:text-base">
            Wear the archive. Scroll the shelf, grab a piece. Demo orders only.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-6 border-b-4 border-concrete/50 pb-8">
            {MERCH.map((item) => (
              <article key={item.id} className="w-64 shrink-0">
                <div className="relative aspect-[3/4] overflow-hidden border border-paper/15">
                  <Image
                    src={withBase(item.image)}
                    alt={item.name}
                    fill
                    className="object-cover grayscale transition duration-500 hover:grayscale-0"
                    sizes="256px"
                  />
                </div>
                <h3 className="mt-3 font-display text-xl text-paper">
                  {item.name}
                </h3>
                <p className="text-xs text-asphalt">{item.detail}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-sm text-paper">
                    {formatZar(item.priceZar)}
                  </span>
                  <button
                    type="button"
                    onClick={() => buyMerch(item)}
                    className="bg-signal px-3 py-2 text-[10px] font-ui uppercase tracking-[0.18em] text-paper"
                  >
                    Buy
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
