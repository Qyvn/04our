"use client";

import type { Release, SongTrack } from "@/data/songs";
import type { Player } from "@/hooks/usePreviewPlayer";
import { BuyButton } from "@/components/BuyButton";
import { coverSrc } from "@/lib/cover";
import { songOf } from "@/lib/store";

/** Sticky bottom bar so playback is visible and controllable wherever you tapped (important on phones). */
export function MiniPlayer({
  visible,
  release,
  track,
  player,
}: {
  visible: boolean;
  release: Release;
  track: SongTrack;
  player: Player;
}) {
  if (!visible) return null;
  const { status, time, duration, slow, play, pause, retry } = player;
  const busy = status === "playing" || status === "loading" || status === "buffering";
  const noPreview = status === "unavailable";
  const text =
    release.comingSoon
      ? "Coming soon"
      : noPreview
        ? track.youtube
          ? "No preview — watch the video in the deck"
          : "No preview available"
        : status === "loading"
          ? slow
            ? "Still loading — slow connection…"
            : "Loading preview…"
          : status === "buffering"
            ? "Buffering…"
            : status === "error"
              ? "Preview didn’t load"
              : status === "playing"
                ? "Playing 30s preview"
                : status === "ended"
                  ? "Preview ended"
                  : "Paused";
  const cover = coverSrc(release);
  return (
    <div className="mini" data-testid="mini-player" data-status={status} role="region" aria-label="Preview player">
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt="" width={40} height={40} />
      ) : (
        <span className="mini-art" aria-hidden>04</span>
      )}
      <div className="mini-info">
        <strong>{track.title}</strong>
        <span data-testid="mini-status">{text}</span>
      </div>
      {!noPreview && !release.comingSoon && (
        <>
          <span className="mini-time">0:{String(Math.floor(time + 1e-6)).padStart(2, "0")}/0:{String(Math.round(duration)).padStart(2, "0")}</span>
          <button
            type="button"
            className="mini-btn"
            onClick={() => (status === "error" ? retry() : busy ? pause() : play())}
            aria-label={status === "error" ? "Retry" : busy ? "Pause" : "Play"}
            data-testid="mini-toggle"
          >
            {status === "error" ? "↻" : busy ? "❚❚" : "▶"}
          </button>
        </>
      )}
      <BuyButton item={songOf(release, track)} compact className="mini-buy" />
      <span className="mini-bar" aria-hidden>
        <span style={{ width: `${Math.min(100, (time / Math.max(1, duration)) * 100)}%` }} />
      </span>
    </div>
  );
}
