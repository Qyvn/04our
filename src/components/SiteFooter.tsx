import { ARTIST } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-brand">
            {ARTIST.stageName}
            <i aria-hidden />
          </p>
          <p className="footer-line">
            {ARTIST.legalName} · {ARTIST.city}. Football. Academics. Physiotherapy. Music.
          </p>
          <p className="footer-fine">Demo storefront · No real payments · Previews courtesy of Apple Music</p>
        </div>
        <div>
          <p className="kicker">Find 04OUR</p>
          <ul className="footer-links">
            {ARTIST.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} <span>@{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
