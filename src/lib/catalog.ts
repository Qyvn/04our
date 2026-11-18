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
    "04OUR is Anele Ngubane — Durban artist balancing football roots, physiotherapy, academics, and music. Latest: Izinkinga Zabantu EP. Next up: VIMBA and Isobho.",
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
    release: "Extended Play",
    year: "2025",
    priceZar: 89,
    format: "cd",
    cover: "/covers/isinqumo.jpg",
    preview: "/audio/preview-tone.mp3",
    description: "Street fisheye energy — sample the first 30 seconds on the radio.",
    bpm: 92,
    musicalKey: "Am",
    tags: ["hip-hop", "street", "durban", "ep"],
    licenses: licensesFor(89),
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
    description: "Chrome-type confession. Preview only — full track after purchase.",
    bpm: 88,
    musicalKey: "Dm",
    tags: ["single", "melodic", "confession"],
    licenses: licensesFor(29),
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
    description: "Latest release (16 Nov 2025). Own it on-site; keep it forever.",
    bpm: 96,
    musicalKey: "Gm",
    tags: ["ep", "amapiano-lean", "latest"],
    licenses: licensesFor(99),
  },
  {
    id: "vimba",
    title: "VIMBA",
    release: "Upcoming single",
    year: "2026",
    priceZar: 29,
    format: "cassette",
    cover: "/covers/sorry.jpg",
    preview: "/audio/preview-tone.mp3",
    description: "Drops 2 Feb 2026 — pre-order the digital release now.",
    bpm: 100,
    musicalKey: "F#m",
    tags: ["pre-order", "single", "2026"],
    licenses: licensesFor(29),
  },
  {
    id: "isobho",
    title: "Isobho",
    release: "Upcoming single",
    year: "2026",
    priceZar: 29,
    format: "cd",
    cover: "/covers/isinqumo.jpg",
    preview: "/audio/preview-tone.mp3",
    description: "Follows VIMBA on 6 Feb 2026. Preview on the deck.",
    bpm: 94,
    musicalKey: "Em",
    tags: ["pre-order", "single", "2026"],
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
    tags: ["archive", "ep", "catalogue"],
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
