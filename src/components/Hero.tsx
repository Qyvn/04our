import Image from "next/image";
import Link from "next/link";
import { ARTIST } from "@/lib/catalog";
import { withBase } from "@/lib/paths";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden border-b border-concrete">
      <Image
        src={withBase("/covers/isinqumo.jpg")}
        alt="04OUR ISINQUMO EP cover — street fisheye portrait"
        fill
        priority
        className="object-cover object-[50%_35%] opacity-55"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-20">
        <p className="mb-3 text-[10px] font-ui uppercase tracking-[0.35em] text-asphalt">
          Four of a kind · Durban
        </p>
        <h1 className="font-display text-[18vw] leading-[0.85] tracking-tight text-paper md:text-[9rem]">
          {ARTIST.stageName}
          <span className="ml-1 inline-block h-3 w-3 bg-signal align-super md:h-4 md:w-4" />
        </h1>
        <p className="mt-5 max-w-xl text-base text-paper/85 md:text-lg">
          {ARTIST.tagline} Buy the music on-site. Support like a patron. Preview
          thirty seconds on the radio — never the full song until you own it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#listen"
            className="bg-signal px-5 py-3 text-[11px] font-ui uppercase tracking-[0.22em] text-paper transition-opacity hover:opacity-90"
          >
            Put on the radio
          </Link>
          <Link
            href="/#support"
            className="border border-paper/40 px-5 py-3 text-[11px] font-ui uppercase tracking-[0.22em] text-paper transition-colors hover:border-signal hover:text-signal"
          >
            Support 04OUR
          </Link>
          <Link
            href="/#shop"
            className="border border-transparent px-5 py-3 text-[11px] font-ui uppercase tracking-[0.22em] text-asphalt transition-colors hover:text-paper"
          >
            Shop music
          </Link>
        </div>
      </div>
    </section>
  );
}
