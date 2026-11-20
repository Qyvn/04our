import Image from "next/image";
import { Hero } from "@/components/Hero";
import { ListenSection } from "@/components/ListenSection";
import { VideosSection } from "@/components/VideosSection";
import { MusicShop } from "@/components/MusicShop";
import { SupportStrip } from "@/components/SupportStrip";
import { MerchShelf } from "@/components/MerchShelf";
import { ARTIST } from "@/lib/catalog";
import { withBase } from "@/lib/paths";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ListenSection />
      <VideosSection />
      <MusicShop />
      <SupportStrip />
      <MerchShelf />
      <section id="about" className="band-ink">
        <div className="wrap about-grid">
          <div>
            <p className="kicker">07 · About</p>
            <h2 className="h-xl">{ARTIST.legalName}</h2>
            <p className="lede">{ARTIST.about}</p>
          </div>
          <div className="about-photo">
            <Image
              src={withBase("/brand/04our-collage.jpg")}
              alt="04OUR collage"
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
