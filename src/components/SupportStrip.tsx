"use client";

import { SUPPORT_TIERS, formatZar } from "@/lib/catalog";
import { usePurchasesContext } from "@/components/PurchasesProvider";

export function SupportStrip() {
  const { joinSupport, state, ready } = usePurchasesContext();
  const activeId = ready ? state.support?.tierId : null;

  return (
    <section id="support" className="band-red">
      <div className="wrap">
        <header className="section-head">
          <p className="kicker">05 · Support</p>
          <h2 className="h-xl">Back the hand.</h2>
          <p className="lede">
            Back 04OUR like a patron. Demo pledges only — nothing is charged.
            {activeId ? ` Active: ${state.support?.name}.` : ""}
          </p>
        </header>

        <div className="tiers">
          {SUPPORT_TIERS.map((tier, index) => {
            const active = activeId === tier.id;
            return (
              <div key={tier.id} className={`tier ${active ? "active" : ""}`}>
                <p className="tier-no">Tier 0{index + 1}</p>
                <h3>{tier.name}</h3>
                <p className="tier-price">
                  {formatZar(tier.priceZar)}
                  <span> / {tier.cadence}</span>
                </p>
                <ul>
                  {tier.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <button type="button" onClick={() => joinSupport(tier)} className="btn btn-ink btn-sm">
                  {active ? "Current tier ✓" : "Join tier"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
