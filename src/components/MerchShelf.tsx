"use client";

import Image from "next/image";
import { MERCH, formatZar } from "@/lib/catalog";
import { withBase } from "@/lib/paths";
import { usePurchasesContext } from "@/components/PurchasesProvider";

export function MerchShelf() {
  const { buyMerch } = usePurchasesContext();

  return (
    <section id="merch" className="band-bone">
      <div className="wrap">
        <header className="section-head">
          <p className="kicker kicker-red">06 · Merch</p>
          <h2 className="h-xl">Wear the number.</h2>
          <p className="lede">Artist merch, sold on-site. Demo orders only.</p>
        </header>

        <div className="merch-row">
          {MERCH.map((item) => (
            <article key={item.id} className="merch-card">
              <div className="merch-img">
                <Image
                  src={withBase(item.image)}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 700px) 80vw, 320px"
                />
              </div>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
              <div className="merch-buy">
                <span>{formatZar(item.priceZar)}</span>
                <button type="button" onClick={() => buyMerch(item)} className="btn btn-ink btn-sm">
                  Buy
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
