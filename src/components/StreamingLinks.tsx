import type { Release, SongTrack } from "@/data/songs";

export function StreamingLinks({ release, track }: { release: Release; track?: SongTrack }) {
  const l = release.links;
  if (release.comingSoon) {
    return l.ditto ? (
      <ul className="stream-links">
        <li>
          <a href={l.ditto} target="_blank" rel="noopener noreferrer">
            Release page<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      </ul>
    ) : null;
  }
  const items = [
    { label: "Apple Music", href: track?.appleMusicUrl ?? l.apple },
    { label: "Spotify", href: l.spotify },
    { label: "YouTube Music", href: l.youtubeMusic },
    { label: "SoundCloud", href: l.soundcloud },
    { label: l.ditto ? "All platforms" : "", href: l.ditto },
  ].filter((i): i is { label: string; href: string } => !!i.href);
  return (
    <ul className="stream-links">
      {items.map((i) => (
        <li key={i.label}>
          <a href={i.href} target="_blank" rel="noopener noreferrer">
            {i.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
