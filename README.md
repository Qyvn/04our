# 04OUR — official store & radio

Artist site for **04OUR (Anele Ngubane)** — Direction A “Four of a Kind Street”.

## What it includes

1. **Listen** — a cassette-style deck: Apple Music 30-second `.m4a` previews, with the official YouTube video as a "Watch" link or as the player where Apple has no preview
2. **Full discography** — every 04OUR release (EPs & albums, singles, features), searchable, from one data file: `src/data/songs.ts`
3. **Videos** — official visuals / promos from 04OUR's channel, the "04our - Topic" channel and Tiny Films
4. Direct on-site music purchases (demo, `localStorage`), merchandise shelf, patron support tiers, **My Crate**
5. Socials: Instagram `04ofakind`, Facebook `04ourr`, YouTube `@04our66` and the "04our - Topic" channel

No real payments. Prices are placeholders. Every track, preview URL and video id in `songs.ts` was verified
(iTunes Lookup API for artist 04our, Ditto smart-links, YouTube oEmbed). To add a song: add it to `RELEASES`.

Design: bone / ink / signal-red (`#F2EFE8`, `#0B0B0C`, `#E4002B`); Anton, Space Grotesk and Space Mono.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3456](http://localhost:3456).

## Static export (`out/`)

Local static build (no GitHub Pages base path):

```bash
npm run build
```

GitHub Pages build (sets `basePath` / `assetPrefix` to `/04our`):

```bash
npm run build:pages
```

Both produce a static `out/` folder (`output: "export"`, `images.unoptimized: true`).

## GitHub Pages

Workflow: `.github/workflows/deploy-pages.yml`  
Expects the site at `https://<user>.github.io/04our/` when `GITHUB_PAGES=true`.
