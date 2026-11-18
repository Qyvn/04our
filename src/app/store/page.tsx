import type { Metadata } from "next";
import { MusicStore } from "@/components/MusicStore";

export const metadata: Metadata = {
  title: "Buy music — 04OUR store",
  description:
    "BeatStars-style music store for 04OUR: preview tracks, choose MP3 / WAV / Exclusive licenses, checkout, and download instantly from My Crate.",
};

export default function StorePage() {
  return (
    <main>
      <MusicStore variant="full" />
    </main>
  );
}
