import { Hero } from "@/components/Hero";
import { RadioCrate } from "@/components/RadioCrate";
import { MusicShop } from "@/components/MusicShop";
import { SupportStrip } from "@/components/SupportStrip";
import { MerchShelf } from "@/components/MerchShelf";
import Image from "next/image";
import { ARTIST } from "@/lib/catalog";
import { withBase } from "@/lib/paths";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RadioCrate />
      <MusicShop />
      <SupportStrip />
      <MerchShelf />
      <section className="relative overflow-hidden border-b border-concrete bg-ink">
        <div className="absolute inset-0">
          <Image
            src={withBase("/portraits/denim.jpg")}
            alt=""
            fill
            className="object-cover object-[50%_20%] opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
          <p className="text-[10px] font-ui uppercase tracking-[0.35em] text-signal">
            About
          </p>
          <h2 className="mt-2 max-w-xl font-display text-5xl text-paper md:text-7xl">
            {ARTIST.legalName}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-paper/80 md:text-base">
            {ARTIST.about}
          </p>
          <p className="mt-8 text-[10px] font-ui uppercase tracking-[0.28em] text-asphalt">
            Football · Physiotherapy · Academics · Music
          </p>
        </div>
      </section>
    </>
  );
}
