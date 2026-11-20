import type { MediaFormat } from "@/lib/catalog";

/** Official streamed songs for in-site listening (SoundCloud + YouTube Topic) */
export type Song = {
  id: string;
  title: string;
  /** Store catalog id to license / buy */
  storeId: string;
  cover: string;
  format: MediaFormat;
  year: string;
  youtubeId: string;
  soundcloudId: string;
  soundcloudUrl: string;
  durationSec: number;
  featuring?: string;
  album?: string;
};

export const SONGS: Song[] = [
  {
    id: "my-father",
    title: "My Father",
    storeId: "isinqumo-ep",
    cover: "/covers/isinqumo.jpg",
    format: "cd",
    year: "2026",
    youtubeId: "ob2yyls4MPQ",
    soundcloudId: "2393099739",
    soundcloudUrl: "https://soundcloud.com/04our-music/my-father",
    durationSec: 275,
    album: "ISINQUMO EP",
  },
  {
    id: "indlalifa",
    title: "Indlalifa",
    storeId: "isinqumo-ep",
    cover: "/covers/isinqumo.jpg",
    format: "cd",
    year: "2026",
    youtubeId: "GXZvayet5f4",
    soundcloudId: "2393112864",
    soundcloudUrl: "https://soundcloud.com/04our-music/indlalifa",
    durationSec: 215,
    album: "ISINQUMO EP",
  },
  {
    id: "uzomenzani",
    title: "Uzomenzani",
    storeId: "isinqumo-ep",
    cover: "/covers/isinqumo.jpg",
    format: "cd",
    year: "2026",
    youtubeId: "SEXtq6zqp3Y",
    soundcloudId: "2393104143",
    soundcloudUrl: "https://soundcloud.com/04our-music/uzomenzani",
    durationSec: 277,
    album: "ISINQUMO EP",
  },
  {
    id: "ayqal-iparty",
    title: "Ay'qal Iparty",
    storeId: "isinqumo-ep",
    cover: "/covers/isinqumo.jpg",
    format: "cd",
    year: "2026",
    youtubeId: "jovcWJhMUd8",
    soundcloudId: "2393110617",
    soundcloudUrl: "https://soundcloud.com/04our-music/ayqal-iparty",
    durationSec: 357,
    album: "ISINQUMO EP",
  },
  {
    id: "ukuhlwa",
    title: "Ukuhlwa",
    storeId: "ukuhlwa",
    cover: "/covers/ukuhlwa.jpg",
    format: "cassette",
    year: "2026",
    youtubeId: "eJ_wMFV6KsM",
    soundcloudId: "2349374666",
    soundcloudUrl: "https://soundcloud.com/04our-music/ukuhlwa",
    durationSec: 145,
    featuring: "Sbopho",
    album: "Ukuhlwa",
  },
  {
    id: "kancane-kancane",
    title: "Kancane Kancane",
    storeId: "kancane-kancane",
    cover: "/covers/kancane-kancane.jpg",
    format: "cd",
    year: "2026",
    youtubeId: "YNxuqY1cMeI",
    soundcloudId: "2343532832",
    soundcloudUrl: "https://soundcloud.com/04our-music/kancane-kancane",
    durationSec: 117,
    album: "Kancane Kancane",
  },
  {
    id: "sorry-personal-growth",
    title: "Sorry (Personal Growth)",
    storeId: "sorry-personal-growth",
    cover: "/covers/sorry.jpg",
    format: "cassette",
    year: "2025",
    youtubeId: "YD-DPeA9VF0",
    soundcloudId: "2329513895",
    soundcloudUrl: "https://soundcloud.com/04our-music/sorry-personal-growth",
    durationSec: 179,
    album: "Sorry (Personal Growth)",
  },
];

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function soundcloudEmbedSrc(
  trackId: string,
  opts?: { autoPlay?: boolean },
): string {
  const params = new URLSearchParams({
    url: `https://api.soundcloud.com/tracks/${trackId}`,
    color: "#c8102e",
    auto_play: opts?.autoPlay ? "true" : "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    show_teaser: "false",
    visual: "false",
    buying: "false",
    sharing: "true",
    download: "false",
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

/** Map store catalog ids → primary SoundCloud track for play buttons */
export const STORE_STREAM: Record<
  string,
  { soundcloudId: string; youtubeId: string; soundcloudUrl: string }
> = {
  "isinqumo-ep": {
    soundcloudId: "2393099739",
    youtubeId: "ob2yyls4MPQ",
    soundcloudUrl: "https://soundcloud.com/04our-music/my-father",
  },
  ukuhlwa: {
    soundcloudId: "2349374666",
    youtubeId: "eJ_wMFV6KsM",
    soundcloudUrl: "https://soundcloud.com/04our-music/ukuhlwa",
  },
  "kancane-kancane": {
    soundcloudId: "2343532832",
    youtubeId: "YNxuqY1cMeI",
    soundcloudUrl: "https://soundcloud.com/04our-music/kancane-kancane",
  },
  "sorry-personal-growth": {
    soundcloudId: "2329513895",
    youtubeId: "YD-DPeA9VF0",
    soundcloudUrl: "https://soundcloud.com/04our-music/sorry-personal-growth",
  },
};
