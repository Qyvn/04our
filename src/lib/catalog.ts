export type MediaFormat = "cd" | "cassette";

export type Track = {
  id: string;
  title: string;
  release: string;
  year: string;
  priceZar: number;
  format: MediaFormat;
  cover: string;
  preview: string;
  description: string;
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
