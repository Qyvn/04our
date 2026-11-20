"use client";

import { useEffect, useMemo, useState } from "react";
import { FEATURED, GROUPS, RELEASES, releaseById, type Release } from "@/data/songs";
import { usePreviewPlayer } from "@/hooks/usePreviewPlayer";
import { CassetteDeck } from "@/components/CassetteDeck";
import { MiniPlayer } from "@/components/MiniPlayer";
import { BuyButton } from "@/components/BuyButton";
import { bundleOf, releaseSellable, songOf } from "@/lib/store";
import { StreamingLinks } from "@/components/StreamingLinks";
import { coverSrc } from "@/lib/cover";

const year = (d?: string) => (d ? d.slice(0, 4) : "");
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function Cover({ r, size }: { r: Release; size: number }) {
  const src = coverSrc(r);
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={size} height={size} loading="lazy" />
  ) : (
    <span className="cover-blank" style={{ width: size, height: size }} aria-hidden>
      04
    </span>
  );
}

export function ListenSection() {
  const first = FEATURED.find((r) => !r.comingSoon) ?? FEATURED[0];
  const [releaseId, setReleaseId] = useState(first.id);
  const [trackId, setTrackId] = useState(first.tracks[0].id);
  const [group, setGroup] = useState<Release["group"]>("ep");
  const [q, setQ] = useState("");

  const release = releaseById(releaseId)!;
  const track = release.tracks.find((t) => t.id === trackId) ?? release.tracks[0];
  const player = usePreviewPlayer();
  const [started, setStarted] = useState(false);

  // Prime the deck with the default tape (no autoplay — browsers need a tap first).
  useEffect(() => {
    player.load(first.tracks[0].previewUrl, { play: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Choose a tape / song. MUST run straight from the tap handler: it sets the audio `src` and calls `play()`
   * synchronously (no await / effect in between) so iOS Safari and Android Chrome allow the sound.
   */
  const select = (r: Release, tid?: string, opts: { scroll?: boolean } = {}) => {
    const t = r.tracks.find((x) => x.id === tid) ?? r.tracks[0];
    setReleaseId(r.id);
    setTrackId(t.id);
    setStarted(true);
    player.load(r.comingSoon ? undefined : t.previewUrl, { play: true });
    if (opts.scroll && typeof document !== "undefined") {
      document.getElementById("deck")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const query = norm(q);
  const list = useMemo(() => {
    const inGroup = query ? RELEASES : RELEASES.filter((r) => r.group === group);
    if (!query) return inGroup;
    return inGroup.filter(
      (r) => norm(r.title).includes(query) || norm(r.artist ?? "").includes(query) || r.tracks.some((t) => norm(t.title).includes(query)),
    );
  }, [group, query]);
  const counts = (g: Release["group"]) => RELEASES.filter((r) => r.group === g).reduce((n, r) => n + r.tracks.length, 0);

  return (
    <section id="listen" className="band-ink">
      <div className="wrap">
        <header className="section-head">
          <p className="kicker">02 · Listen</p>
          <h2 className="h-xl">Put a tape on.</h2>
          <p className="lede">
            The latest and key releases are on the shelf. Slide one into the deck for a thirty-second preview — or
            watch the official video where there’s no Apple Music preview. The whole catalogue is below.
          </p>
        </header>

        <div className="shelf" role="tablist" aria-label="Key releases">
          {FEATURED.map((r) => {
            const active = r.id === releaseId;
            return (
              <div key={r.id} className={`shelf-cell ${active ? "active" : ""}`} role="presentation">
                <button
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => select(r)}
                  className={`shelf-item ${active ? "active" : ""}`}
                  aria-label={`${r.comingSoon ? "Select" : "Play preview of"} ${r.title}`}
                >
                  <span className={`shelf-art ${r.format}`}>
                    <Cover r={r} size={160} />
                    {r.comingSoon ? <em className="soon-tag">Coming soon</em> : <span className="shelf-play" aria-hidden>▶</span>}
                  </span>
                  <span className="shelf-title">{r.title}</span>
                  <span className="shelf-meta">
                    {r.kind}
                    {r.released ? ` · ${year(r.released)}` : ""}
                  </span>
                </button>
                <BuyButton item={releaseSellable(r)} label={bundleOf(r) ? `Buy ${r.kind}` : "Buy"} className="shelf-buy" />
              </div>
            );
          })}
        </div>

        <div className="listen-grid">
          <div>
            <div className="release-head">
              <p className="kicker kicker-red">
                {release.kind}
                {release.released ? ` · ${year(release.released)}` : ""}
                {release.comingSoon ? " · Coming soon" : ""}
              </p>
              <h3 className="h-lg" data-testid="release-title">
                {release.title}
              </h3>
              {release.artist && <p className="muted-note">{release.artist}</p>}
              {release.note && <p className="muted-note">{release.note}</p>}
            </div>

            <ol className="tracklist" data-testid="tracklist">
              {release.tracks.map((t, i) => {
                const active = t.id === track.id;
                return (
                  <li key={t.id} className="track-li">
                    <button
                      type="button"
                      onClick={() => select(release, t.id)}
                      className={`track-row ${active ? "active" : ""}`}
                      aria-current={active}
                    >
                      <span className="track-no">{String(i + 1).padStart(2, "0")}</span>
                      <span className="track-name">{t.title}</span>
                      <span className="track-kind">
                        {release.comingSoon ? "Coming soon" : t.previewUrl ? "Apple preview" : t.youtube ? "YouTube" : "—"}
                      </span>
                      <span className="track-len">{t.length ?? ""}</span>
                    </button>
                    <BuyButton item={songOf(release, t)} compact label="Buy song" />
                  </li>
                );
              })}
            </ol>

            {bundleOf(release) && (
              <div className="bundle-row">
                <span>
                  <strong>{release.title}</strong> · whole {release.kind} ({release.tracks.length} songs)
                </span>
                <BuyButton item={bundleOf(release)!} label={`Buy ${release.kind}`} />
              </div>
            )}

            <div className="mt-8">
              <p className="kicker">Full track</p>
              <StreamingLinks release={release} track={track} />
            </div>
          </div>

          <div id="deck" className="deck-wrap">
            <CassetteDeck release={release} track={track} player={player} />
          </div>
        </div>

        <MiniPlayer visible={started} release={release} track={track} player={player} />

        <div className="disco" id="discography">
          <div className="disco-head">
            <h3 className="h-lg">Full discography</h3>
            <p className="muted-note">
              {RELEASES.reduce((n, r) => n + r.tracks.length, 0)} tracks · {RELEASES.length} releases · tap a row to play a preview, or buy any song / EP
            </p>
          </div>
          <div className="disco-tools">
            <div className="seg" role="tablist" aria-label="Discography group">
              {GROUPS.map((g) => (
                <button
                  key={g.id}
                  role="tab"
                  type="button"
                  aria-selected={!query && group === g.id}
                  className={!query && group === g.id ? "on" : ""}
                  onClick={() => {
                    setGroup(g.id);
                    setQ("");
                  }}
                >
                  {g.label} <small>{counts(g.id)}</small>
                </button>
              ))}
            </div>
            <label className="disco-search">
              <span className="sr-only">Search songs</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search all songs…"
                aria-label="Search all songs"
              />
            </label>
          </div>

          <ul className="disco-list" data-testid="discography">
            {list.length === 0 && <li className="disco-empty">No songs match “{q}”.</li>}
            {list.map((r) => (
              <li key={r.id} className="disco-rel">
                <div className="disco-relhead">
                  <Cover r={r} size={44} />
                  <div className="min-w-0">
                    <p className="disco-reltitle">{r.title}</p>
                    <p className="disco-relmeta">
                      {r.artist ? `${r.artist} · ` : ""}
                      {r.kind}
                      {r.released ? ` · ${year(r.released)}` : ""}
                      {r.comingSoon ? " · Coming soon" : ""}
                    </p>
                  </div>
                  {bundleOf(r) && <BuyButton item={bundleOf(r)!} label={`Buy ${r.kind}`} compact className="disco-bundle" />}
                </div>
                <ul>
                  {r.tracks.map((t) => {
                    const active = r.id === releaseId && t.id === track.id;
                    const kind = r.comingSoon ? "Soon" : t.previewUrl ? "30s" : t.youtube ? "Video" : "—";
                    return (
                      <li key={t.id} className="disco-li">
                        <button
                          type="button"
                          className={`disco-track ${active ? "active" : ""}`}
                          onClick={() => select(r, t.id)}
                        >
                          <span className="disco-play" aria-hidden>
                            {active ? "●" : "▶"}
                          </span>
                          <span className="disco-name">{t.title}</span>
                          <span className="disco-kind">{kind}</span>
                          <span className="disco-len">{t.length ?? ""}</span>
                        </button>
                        <BuyButton item={songOf(r, t)} compact />
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
