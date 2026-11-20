import type { MediaFormat } from "@/lib/catalog";

/** Official streamed songs (YouTube Topic + SoundCloud) for in-site listening */
export type Song = {
  id: string;
  title: string;
  /** Store catalog id to license / buy */
  storeId: string;
  cover: string;
  format: MediaFormat;
  year: string;
  youtubeId: string;
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
