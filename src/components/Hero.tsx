import Image from "next/image";
import Link from "next/link";
import { ARTIST } from "@/lib/catalog";
import { RELEASES } from "@/data/songs";
import { coverSrc } from "@/lib/cover";
import { withBase } from "@/lib/paths";

export function Hero() {
  const latest = RELEASES.filter((r) => !r.comingSoon && r.released)
    .sort((a, b) => (b.released! > a.released! ? 1 : -1))[0];
  return (
    <section className="band-bone hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="kicker">
            <span className="suits" aria-hidden>
              ♠ ♥ ♦ ♣
            </span>{" "}
            Four of a kind · {ARTIST.city}
          </p>
          <h1 className="hero-title">
            04<span>OUR</span>
          </h1>
          <p className="hero-tag">{ARTIST.tagline}</p>
          <div className="hero-actions">
            <Link href="/#listen" className="btn btn-red">
              Put a tape on
            </Link>
            <Link href="/#videos" className="btn btn-line">
              Watch
            </Link>
            <Link href="/#shop" className="btn btn-line">
              Shop music
            </Link>
          </div>
          <Link href="/#listen" className="latest">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverSrc(latest) ?? ""} alt="" width={72} height={72} />
            <span>
              <small>Latest release</small>
              <strong>{latest.title}</strong>
            </span>
            <span aria-hidden className="latest-arrow">
              →
            </span>
          </Link>
        </div>
        <div className="hero-photo">
          <span className="hero-four" aria-hidden>
            4
          </span>
          <Image
            src={withBase("/portraits/denim.jpg")}
            alt="04OUR portrait"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 900px) 100vw, 45vw"
          />
        </div>
      </div>
    </section>
  );
}
