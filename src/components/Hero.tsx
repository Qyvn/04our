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
        className="hero-fade object-cover object-[50%_35%] opacity-60"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,10,10,0.55)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-24">
        <p className="hero-rise mb-3 text-[10px] font-ui uppercase tracking-[0.35em] text-paper/70">
          Four of a kind · {ARTIST.city}
        </p>
        <h1 className="hero-rise hero-rise-delay-1 font-display text-[22vw] leading-[0.8] tracking-tight text-paper md:text-[10rem]">
          {ARTIST.stageName}
          <span
            className="ml-1 inline-block h-3 w-3 bg-signal align-super md:h-4 md:w-4"
            aria-hidden
          />
        </h1>
        <p className="hero-rise hero-rise-delay-2 mt-5 max-w-lg text-base text-paper/85 md:text-lg">
          {ARTIST.tagline} Preview thirty seconds on the radio. Own the rest in
          My Crate.
        </p>
        <div className="hero-rise hero-rise-delay-3 mt-8 flex flex-wrap gap-3">
          <Link
            href="/#listen"
            className="bg-signal px-5 py-3 text-[11px] font-ui uppercase tracking-[0.22em] text-paper transition-opacity hover:opacity-90"
          >
            Put on the radio
          </Link>
          <Link
            href="/store"
            className="border border-paper/40 px-5 py-3 text-[11px] font-ui uppercase tracking-[0.22em] text-paper transition-colors hover:border-signal hover:text-signal"
          >
            Buy music
          </Link>
        </div>
      </div>
    </section>
  );
}
