"use client";

import { useEffect, useState } from "react";
import type { Release, SongTrack } from "@/data/songs";
import type { Player, PlayerStatus } from "@/hooks/usePreviewPlayer";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { coverSrc } from "@/lib/cover";

const fmt = (t: number) => `0:${String(Math.floor(t + 1e-6)).padStart(2, "0")}`;

const LABEL: Record<PlayerStatus, string> = {
  idle: "No tape loaded",
  loading: "Loading…",
  buffering: "Buffering…",
  playing: "Playing",
  paused: "Ready",
  ended: "Preview ended",
  error: "Preview could not load",
  unavailable: "Preview unavailable",
};

export function CassetteDeck({
  release,
  track,
  player,
}: {
  release: Release | null;
  track: SongTrack | null;
  player: Player;
}) {
  const { status, time, duration, cap, play, pause, replay } = player;
  const isPlaying = status === "playing" || status === "loading" || status === "buffering";
  const canPlay = !!track?.previewUrl && status !== "error";
  const pct = Math.min(100, (time / Math.max(1, duration)) * 100);
  const [showEmbed, setShowEmbed] = useState(false);
  useEffect(() => setShowEmbed(false), [track?.id]);
  const soon = !!release?.comingSoon;
  const yt = soon ? undefined : track?.youtube;

  return (
    <div className={`deck status-${status}`} data-status={status} data-testid="cassette-deck">
      <div className="deck-top">
        <span>04 STEREO · {cap}s PREVIEW</span>
        <span className={`led ${status === "playing" ? "on" : ""}`} aria-hidden />
      </div>

      <div className="tape-body">
        <div className="tape-label">
          {release && track ? (
            <>
              {coverSrc(release) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverSrc(release)!} alt="" width={64} height={64} className="tape-art" />
              ) : (
                <span className="tape-art tape-art-blank" aria-hidden>04</span>
              )}
              <div className="min-w-0">
                <strong className="tape-title">{track.title}</strong>
                <span className="tape-sub">
                  {release.artist ? `${release.artist} · ` : ""}
                  {release.title}
                </span>
              </div>
            </>
          ) : (
            <span className="tape-sub">Pick a tape from the shelf</span>
          )}
        </div>
        <div className="tape-window">
          <span className={`reel ${status === "playing" ? "spin" : ""}`} />
          <span className="tape-strip" />
          <span className={`reel ${status === "playing" ? "spin" : ""}`} />
        </div>
      </div>

      <div className="deck-status" role="status" aria-live="polite">
        <span data-testid="status">{LABEL[status]}</span>
        {track && canPlay && (
          <span className="deck-time">
            {fmt(time)} / {fmt(duration)}
          </span>
        )}
      </div>
      <div
        className="progress"
        role="progressbar"
        aria-label="Preview progress"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(time)}
      >
        <span style={{ width: `${pct}%` }} />
      </div>

      <div className="deck-buttons">
        <button
          type="button"
          className="deck-btn deck-btn-main"
          onClick={() => (isPlaying ? pause() : play())}
          disabled={!canPlay}
          aria-label={isPlaying ? "Pause preview" : "Play preview"}
        >
          {isPlaying ? "❚❚ Pause" : "▶ Play"}
        </button>
        <button type="button" className="deck-btn" onClick={replay} disabled={!canPlay} aria-label="Replay preview from start">
          ↺ Replay
        </button>
      </div>

      {soon && (
        <p className="deck-note" role="note" data-testid="coming-soon">
          Coming soon — no player yet.
        </p>
      )}
      {track && !soon && status === "unavailable" && (
        <p className="deck-note" role="note">
          {yt
            ? "No Apple Music preview for this one — watch the official upload instead."
            : "No preview available yet."}
        </p>
      )}
      {status === "error" && (
        <p className="deck-note" role="alert">
          The preview failed to load. Check your connection or open the full track below.
        </p>
      )}

      {/* YouTube: primary for tracks without an Apple preview, optional "watch" for the rest */}
      {track && yt && status === "unavailable" && <YouTubeEmbed id={yt.id} title={yt.title} />}
      {track && yt && status !== "unavailable" && (
        <div className="deck-video">
          {showEmbed ? (
            <YouTubeEmbed id={yt.id} title={yt.title} autoLoad />
          ) : (
            <button type="button" className="link-btn" onClick={() => setShowEmbed(true)}>
              ▶ Watch the official video ({yt.channel})
            </button>
          )}
        </div>
      )}

      {track?.previewUrl && release && (
        <p className="deck-credit">
          Preview &amp; streaming links courtesy of{" "}
          <a href={track.appleMusicUrl ?? release.links.apple} target="_blank" rel="noopener noreferrer">
            Apple Music<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      )}
    </div>
  );
}
