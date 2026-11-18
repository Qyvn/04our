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
      <section className="border-b border-concrete bg-ink">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <div>
            <p className="text-[10px] font-ui uppercase tracking-[0.35em] text-signal">
              About
            </p>
            <h2 className="mt-2 font-display text-4xl text-paper md:text-5xl">
              {ARTIST.legalName}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-asphalt md:text-base">
              {ARTIST.about}
            </p>
          </div>
          <div className="relative min-h-[280px] overflow-hidden border border-paper/15">
            <Image
              src={withBase("/portraits/denim.jpg")}
              alt="04OUR portrait"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
