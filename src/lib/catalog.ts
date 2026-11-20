export type MediaFormat = "cd" | "cassette";

export type LicenseId = "mp3" | "wav" | "exclusive";

export type LicenseOption = {
  id: LicenseId;
  name: string;
  priceZar: number;
  files: string[];
  terms: string[];
  exclusive?: boolean;
};

export type Track = {
  id: string;
  title: string;
  release: string;
  year: string;
  /** Lowest license price — shown as “from R…” like BeatStars */
  priceZar: number;
  format: MediaFormat;
  cover: string;
  preview: string;
  description: string;
  bpm: number;
  musicalKey: string;
  tags: string[];
  licenses: LicenseOption[];
  /** Official Ditto Music smart link (stream / pre-save) */
  dittoUrl?: string;
  tracklist?: string[];
  featuring?: string;
  /** Official YouTube Topic video for in-site listening */
  youtubeId?: string;
  soundcloudUrl?: string;
  /** SoundCloud track id for the official embed player */
  soundcloudId?: string;
};

export type MerchItem = {
  id: string;
  name: string;
  priceZar: number;
  detail: string;
  image: string;
};

export type SupportTier = {
  id: string;
  name: string;
  priceZar: number;
  cadence: "month" | "once";
  perks: string[];
};

export const ARTIST = {
  stageName: "04OUR",
  legalName: "Anele Ngubane",
  city: "Durban",
  tagline: "Four careers. One frequency. Balance in the number 4.",
  about:
    "04OUR is Anele Ngubane — Durban artist balancing football roots, physiotherapy, academics, and music. Latest smart links: ISINQUMO EP, Ukuhlwa, and Kancane Kancane via Ditto Music.",
  socials: [
    {
      label: "Instagram",
      handle: "04ofakind",
      href: "https://www.instagram.com/04ofakind/",
    },
    {
      label: "Facebook",
      handle: "04ourr",
      href: "https://www.facebook.com/04ourr",
    },
  ],
} as const;

function licensesFor(base: number): LicenseOption[] {
  return [
    {
      id: "mp3",
      name: "MP3 Lease",
      priceZar: base,
      files: ["MP3"],
      terms: [
        "Untagged MP3 download",
        "Non-exclusive personal / fan use",
        "Free re-download from My Crate",
        "No stem pack",
      ],
    },
    {
      id: "wav",
      name: "WAV Lease",
      priceZar: Math.round(base * 2.2),
      files: ["MP3", "WAV"],
      terms: [
        "Untagged MP3 + WAV",
        "Non-exclusive commercial use (demo terms)",
        "Credit 04OUR on releases",
        "Free re-download from My Crate",
      ],
    },
    {
      id: "exclusive",
      name: "Exclusive",
      priceZar: Math.round(base * 12),
      files: ["MP3", "WAV", "Trackouts"],
      terms: [
        "Exclusive master rights (demo contract)",
        "MP3 + WAV + trackouts",
        "Removed from store after sale",
        "One buyer only",
      ],
      exclusive: true,
    },
  ];
}

export const TRACKS: Track[] = [
  {
    id: "isinqumo-ep",
    title: "ISINQUMO EP",
    release: "Extended Play · 4 songs",
    year: "2025",
    priceZar: 89,
    format: "cd",
    cover: "/covers/isinqumo.jpg",
    preview: "/audio/preview-tone.mp3",
    description:
      "My Father · Indlalifa · Uzomenzani · Ay'qal Iparty. Stream the EP on every platform via Ditto.",
    bpm: 92,
    musicalKey: "Am",
    tags: ["ep", "isinqumo", "ditto", "street"],
    licenses: licensesFor(89),
    dittoUrl: "https://ditto.fm/isinqumo-ep",
    youtubeId: "ob2yyls4MPQ",
    soundcloudUrl: "https://soundcloud.com/04our-music/my-father",
    soundcloudId: "2393099739",
    tracklist: [
      "My Father (04:34)",
      "Indlalifa (03:34)",
      "Uzomenzani (04:36)",
      "Ay'qal Iparty (05:57)",
    ],
  },
  {
    id: "ukuhlwa",
    title: "Ukuhlwa",
    release: "Single",
    year: "2026",
    priceZar: 29,
    format: "cassette",
    cover: "/covers/ukuhlwa.jpg",
    preview: "/audio/preview-tone.mp3",
    description:
      "Ukuhlwa with Sbopho — play the official upload on-site, or open Ditto / SoundCloud.",
    bpm: 98,
    musicalKey: "Gm",
    tags: ["single", "ukuhlwa", "ditto", "2026"],
    licenses: licensesFor(29),
    dittoUrl: "https://ditto.fm/ukuhlwa-04our",
    youtubeId: "eJ_wMFV6KsM",
    soundcloudUrl: "https://soundcloud.com/04our-music/ukuhlwa",
    soundcloudId: "2349374666",
    featuring: "Sbopho",
    tracklist: ["Ukuhlwa (02:25)"],
  },
  {
    id: "kancane-kancane",
    title: "Kancane Kancane",
    release: "Single",
    year: "2026",
    priceZar: 29,
    format: "cd",
    cover: "/covers/kancane-kancane.jpg",
    preview: "/audio/preview-tone.mp3",
    description:
      "Kancane Kancane — full official stream on-site via SoundCloud.",
    bpm: 94,
    musicalKey: "Em",
    tags: ["single", "kancane", "ditto", "2026"],
    licenses: licensesFor(29),
    dittoUrl: "https://ditto.fm/kancane-kancane-04our",
    youtubeId: "YNxuqY1cMeI",
    soundcloudUrl: "https://soundcloud.com/04our-music/kancane-kancane",
    soundcloudId: "2343532832",
    tracklist: ["Kancane Kancane (01:58)"],
  },
  {
    id: "izinkinga-zabantu",
    title: "Izinkinga Zabantu",
    release: "EP · 7 songs",
    year: "2025",
    priceZar: 99,
    format: "cd",
    cover: "/covers/isinqumo.jpg",
    preview: "/audio/preview-tone.mp3",
    description: "Catalogue EP — own it on-site; keep it forever in My Crate.",
    bpm: 96,
    musicalKey: "Gm",
    tags: ["ep", "catalogue"],
    licenses: licensesFor(99),
  },
  {
    id: "sorry-personal-growth",
    title: "Sorry. / Personal Growth",
    release: "Single",
    year: "2025",
    priceZar: 29,
    format: "cassette",
    cover: "/covers/sorry.jpg",
    preview: "/audio/preview-tone.mp3",
    description: "Chrome-type confession — official stream available on-site.",
    bpm: 88,
    musicalKey: "Dm",
    tags: ["single", "melodic"],
    licenses: licensesFor(29),
    youtubeId: "YD-DPeA9VF0",
    soundcloudUrl: "https://soundcloud.com/04our-music/sorry-personal-growth",
    soundcloudId: "2329513895",
  },
  {
    id: "vimba",
    title: "VIMBA",
    release: "Single",
    year: "2026",
    priceZar: 29,
    format: "cassette",
    cover: "/covers/sorry.jpg",
    preview: "/audio/preview-tone.mp3",
    description: "Catalogue single — license on-site or stream when linked.",
    bpm: 100,
    musicalKey: "F#m",
    tags: ["single", "catalogue"],
    licenses: licensesFor(29),
  },
  {
    id: "isobho",
    title: "Isobho",
    release: "Single",
    year: "2026",
    priceZar: 29,
    format: "cd",
    cover: "/covers/isinqumo.jpg",
    preview: "/audio/preview-tone.mp3",
    description: "Catalogue single available for on-site licensing.",
    bpm: 94,
    musicalKey: "Em",
    tags: ["single", "catalogue"],
    licenses: licensesFor(29),
  },
  {
    id: "lost-files",
    title: "Lost Files",
    release: "10-track EP",
    year: "2024",
    priceZar: 79,
    format: "cassette",
    cover: "/covers/sorry.jpg",
    preview: "/audio/preview-tone.mp3",
    description: "Salvaged catalogue — rebuilt and refined.",
    bpm: 90,
    musicalKey: "Cm",
    tags: ["archive", "ep"],
    licenses: licensesFor(79),
  },
];

export const MERCH: MerchItem[] = [
  {
    id: "four-tee",
    name: "FOUR OF A KIND Tee",
    priceZar: 350,
    detail: "Heavyweight black tee · signal-red 04 mark",
    image: "/brand/04our-collage.jpg",
  },
  {
    id: "balance-cap",
    name: "Balance Cap",
    priceZar: 280,
    detail: "Distressed denim · embroidered 04OUR",
    image: "/portraits/denim.jpg",
  },
  {
    id: "street-hoodie",
    name: "Street Archive Hoodie",
    priceZar: 650,
    detail: "Concrete grey · paper-white print",
    image: "/portraits/gagasi.jpg",
  },
];

export const SUPPORT_TIERS: SupportTier[] = [
  {
    id: "listener",
    name: "Listener",
    priceZar: 49,
    cadence: "month",
    perks: ["Early radio previews", "Supporter badge in My Crate", "Release notes"],
  },
  {
    id: "patron",
    name: "Patron",
    priceZar: 149,
    cadence: "month",
    perks: [
      "Everything in Listener",
      "15% off music buys",
      "Merch drop access",
      "Name on supporters wall",
    ],
  },
  {
    id: "inner-circle",
    name: "Inner Circle",
    priceZar: 399,
    cadence: "month",
    perks: [
      "Everything in Patron",
      "Free digital EP each quarter",
      "Priority merch",
      "Studio session notes",
    ],
  },
];

export function formatZar(amount: number): string {
  return `R${amount}`;
}

export function startingPrice(track: Track): number {
  return Math.min(...track.licenses.map((l) => l.priceZar));
}

export function getLicense(
  track: Track,
  licenseId: LicenseId,
): LicenseOption | undefined {
  return track.licenses.find((l) => l.id === licenseId);
}
