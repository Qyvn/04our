"use client";

import { SUPPORT_TIERS, formatZar } from "@/lib/catalog";
import { usePurchasesContext } from "@/components/PurchasesProvider";

export function SupportStrip() {
  const { joinSupport, state, ready } = usePurchasesContext();
  const activeId = ready ? state.support?.tierId : null;

  return (
    <section id="support" className="border-b border-concrete bg-ink">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="text-[10px] font-ui uppercase tracking-[0.35em] text-signal">
            Patron-style model
          </p>
          <h2 className="mt-2 font-display text-4xl text-paper md:text-6xl">
            Support 04OUR
          </h2>
          <p className="mt-3 text-sm text-asphalt md:text-base">
            Subscribe like Patreon — back the artist, then buy music through the
            same membership mindset. Demo pledges only.
          </p>
          {activeId ? (
            <p className="mt-4 text-sm text-signal">
              Active: {state.support?.name}
            </p>
          ) : null}
        </div>

        <div className="grid gap-0 border border-concrete md:grid-cols-3">
          {SUPPORT_TIERS.map((tier, index) => {
            const active = activeId === tier.id;
            return (
              <div
                key={tier.id}
                className={`flex flex-col border-concrete p-6 ${
                  index > 0 ? "border-t md:border-l md:border-t-0" : ""
                } ${active ? "bg-concrete/50" : "bg-transparent"}`}
              >
                <p className="text-[10px] font-ui uppercase tracking-[0.25em] text-asphalt">
                  Tier 0{index + 1}
                </p>
                <h3 className="mt-2 font-display text-3xl text-paper">
                  {tier.name}
                </h3>
                <p className="mt-1 text-signal">
                  {formatZar(tier.priceZar)}
                  <span className="text-asphalt"> / {tier.cadence}</span>
                </p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-paper/80">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="border-l border-signal/60 pl-3">
                      {perk}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => joinSupport(tier)}
                  className={`mt-6 px-4 py-2 text-[10px] font-ui uppercase tracking-[0.2em] ${
                    active
                      ? "border border-signal text-signal"
                      : "bg-signal text-paper"
                  }`}
                >
                  {active ? "Current tier" : "Join tier"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
