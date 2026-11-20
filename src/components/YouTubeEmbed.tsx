"use client";

import { useState } from "react";

/** Click-to-load official YouTube embed (nocookie). Thumbnail first so the page stays light. */
export function YouTubeEmbed({
  id,
  title,
  autoLoad = false,
}: {
  id: string;
  title: string;
  autoLoad?: boolean;
}) {
  const [on, setOn] = useState(autoLoad);
  return (
    <div className="yt-frame" data-testid="youtube-embed">
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`}
          title={`${title} (YouTube)`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setOn(true)} className="yt-poster" aria-label={`Play ${title} on YouTube`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="yt-play" aria-hidden>
            ▶
          </span>
        </button>
      )}
    </div>
  );
}
