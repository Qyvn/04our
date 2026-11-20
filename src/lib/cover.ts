import type { Release } from "@/data/songs";
import { withBase } from "@/lib/paths";

/** Local covers start with "/", Apple covers are full URLs, a few YouTube-only songs have none. */
export const coverSrc = (r: Pick<Release, "cover">): string | null =>
  r.cover ? (r.cover.startsWith("http") ? r.cover : withBase(r.cover)) : null;
