# 04OUR — official store & radio

Artist site for **04OUR (Anele Ngubane)** — Direction A “Four of a Kind Street”.

## What it includes

1. Direct on-site music purchases (demo)
2. Merchandise shelf
3. Patreon-style support tiers
4. **My Crate** — permanent access + free re-download; duplicate song buys blocked (`localStorage`)
5. CD/cassette shelf → old-style radio → **30-second preview only**
6. Socials: Instagram [`04ofakind`](https://www.instagram.com/04ofakind/), Facebook [`04ourr`](https://www.facebook.com/04ourr)

No real payments. EPK email/phone are not shown.

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
