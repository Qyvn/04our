"use client";

import { soundcloudEmbedSrc } from "@/lib/songs";

type SoundcloudEmbedProps = {
  trackId: string;
  title: string;
  autoPlay?: boolean;
  className?: string;
};

/** Visible official SoundCloud player — reliable in-browser audio */
export function SoundcloudEmbed({
  trackId,
  title,
  autoPlay = false,
  className = "",
}: SoundcloudEmbedProps) {
  return (
    <iframe
      key={`${trackId}-${autoPlay ? "auto" : "cue"}`}
      title={`SoundCloud · ${title}`}
      width="100%"
      height="120"
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={soundcloudEmbedSrc(trackId, { autoPlay })}
      className={`w-full border-0 bg-ink ${className}`}
    />
  );
}
