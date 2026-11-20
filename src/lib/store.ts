import { PRICING } from "@/config/pricing";
import { RELEASES, releaseById, type Release, type SongTrack } from "@/data/songs";
import type { PurchaseState } from "@/lib/purchases";

/** Something the shop can sell: one song, or a whole EP/album bundle. */
export type Sellable = {
  /** Stored in My Crate. Bundle = release id. Song = "<releaseId>:<trackId>" (single-track release: just release id). */
  key: string;
  kind: "song" | "bundle";
  releaseId: string;
  trackId?: string;
  title: string;
  subtitle: string;
  priceZar: number;
  comingSoon: boolean;
  /** number of songs it unlocks */
  songs: number;
};

const isBundle = (r: Release) => r.tracks.length > 1;

export function bundleOf(r: Release): Sellable | null {
  if (!isBundle(r)) return null;
  return {
    key: r.id,
    kind: "bundle",
    releaseId: r.id,
    title: r.title,
    subtitle: `${r.kind} · ${r.tracks.length} songs`,
    priceZar: PRICING.overrides[r.id] ?? PRICING.bundleZar,
    comingSoon: !!r.comingSoon,
    songs: r.tracks.length,
  };
}

export function songOf(r: Release, t: SongTrack): Sellable {
  const single = !isBundle(r);
  const key = single ? r.id : `${r.id}:${t.id}`;
  return {
    key,
    kind: "song",
    releaseId: r.id,
    trackId: t.id,
    title: t.title,
    subtitle: single ? `${r.kind}${r.artist ? ` · ${r.artist}` : ""}` : `Song · ${r.title}`,
    priceZar: PRICING.overrides[key] ?? PRICING.songZar,
    comingSoon: !!r.comingSoon,
    songs: 1,
  };
}

/** The release as one buy: bundle for EPs/albums, the song itself for singles. */
export function releaseSellable(r: Release): Sellable {
  return bundleOf(r) ?? songOf(r, r.tracks[0]);
}

export function sellableByKey(key: string): { item: Sellable; release: Release } | null {
  const [rid, tid] = key.split(":");
  const r = releaseById(rid);
  if (!r) return null;
  if (!tid) return { item: releaseSellable(r), release: r };
  const t = r.tracks.find((x) => x.id === tid);
  return t ? { item: songOf(r, t), release: r } : null;
}

/** Owned directly, or because its EP/album bundle was bought. */
export function owns(state: PurchaseState, item: Sellable): boolean {
  const has = (k: string) => state.tracks.some((o) => o.trackId === k);
  return has(item.key) || (item.kind === "song" && has(item.releaseId));
}

export const ALL_RELEASE_COUNT = RELEASES.length;
