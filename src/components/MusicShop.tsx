"use client";

import { MusicStore } from "@/components/MusicStore";

/** Homepage teaser into the BeatStars-style music marketplace */
export function MusicShop() {
  return <MusicStore variant="teaser" limit={4} />;
}
