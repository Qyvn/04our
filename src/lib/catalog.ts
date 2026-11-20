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
    "04OUR is Anele Ngubane — a Durban artist balancing football roots, physiotherapy, academics and music. Four of a kind: every release is a different card from the same hand.",
  socials: [
    { label: "Instagram", handle: "04ofakind", href: "https://www.instagram.com/04ofakind/" },
    { label: "Facebook", handle: "04ourr", href: "https://www.facebook.com/04ourr" },
    { label: "YouTube", handle: "04our66", href: "https://www.youtube.com/@04our66" },
    {
      label: "YouTube Topic",
      handle: "04our - Topic",
      href: "https://www.youtube.com/channel/UCF495vOibO8ZJ0KzYDy3X8w",
    },
  ],
} as const;

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
    perks: ["Early previews", "Supporter badge in My Crate", "Release notes"],
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
