import { ARTIST } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 md:flex-row md:items-end md:justify-between md:px-6">
        <div>
          <p className="font-display text-4xl text-paper">
            {ARTIST.stageName}
            <span className="ml-1 inline-block h-2.5 w-2.5 bg-signal align-super" />
          </p>
          <p className="mt-2 max-w-md text-sm text-asphalt">
            {ARTIST.legalName} · {ARTIST.city}. Football. Academics.
            Physiotherapy. Music.
          </p>
          <p className="mt-4 text-[10px] font-ui uppercase tracking-[0.2em] text-asphalt">
            Demo storefront · No real payments · No EPK phone or email on site
          </p>
        </div>
        <div>
          <p className="text-[10px] font-ui uppercase tracking-[0.3em] text-asphalt">
            Socials
          </p>
          <ul className="mt-3 space-y-2">
            {ARTIST.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:text-signal"
                >
                  {s.label} · @{s.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
