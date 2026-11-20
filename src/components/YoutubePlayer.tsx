"use client";

import { useEffect, useRef } from "react";

type YTPlayer = {
  destroy: () => void;
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  loadVideoById: (videoId: string) => void;
  cueVideoById: (videoId: string) => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: Record<string, unknown>,
      ) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

function loadYoutubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const prior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prior?.();
      resolve();
    };
    if (!document.getElementById("yt-iframe-api")) {
      const script = document.createElement("script");
      script.id = "yt-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    }
  });
  return apiPromise;
}

type YoutubePlayerProps = {
  videoId: string | null;
  playing: boolean;
  onPlayingChange: (playing: boolean) => void;
  onTime: (elapsed: number, duration: number) => void;
  onEnded: () => void;
};

export function YoutubePlayer({
  videoId,
  playing,
  onPlayingChange,
  onTime,
  onEnded,
}: YoutubePlayerProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const videoIdRef = useRef(videoId);
  const playingRef = useRef(playing);
  const onPlayingChangeRef = useRef(onPlayingChange);
  const onTimeRef = useRef(onTime);
  const onEndedRef = useRef(onEnded);

  videoIdRef.current = videoId;
  playingRef.current = playing;
  onPlayingChangeRef.current = onPlayingChange;
  onTimeRef.current = onTime;
  onEndedRef.current = onEnded;

  useEffect(() => {
    let cancelled = false;
    let poll: number | undefined;

    const boot = async () => {
      await loadYoutubeApi();
      if (cancelled || !hostRef.current || !window.YT?.Player) return;

      const initialId = videoIdRef.current || undefined;
      playerRef.current = new window.YT.Player(hostRef.current, {
        height: "0",
        width: "0",
        ...(initialId ? { videoId: initialId } : {}),
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            const id = videoIdRef.current;
            if (id) {
              playerRef.current?.cueVideoById(id);
              if (playingRef.current) playerRef.current?.playVideo();
            }
          },
          onStateChange: (event: { data: number }) => {
            const state = window.YT?.PlayerState;
            if (!state) return;
            if (event.data === state.PLAYING) {
              onPlayingChangeRef.current(true);
            } else if (event.data === state.PAUSED) {
              onPlayingChangeRef.current(false);
            } else if (event.data === state.ENDED) {
              onPlayingChangeRef.current(false);
              onEndedRef.current();
            }
          },
        },
      });

      poll = window.setInterval(() => {
        const player = playerRef.current;
        if (!player || !readyRef.current) return;
        try {
          const state = player.getPlayerState();
          if (state === window.YT?.PlayerState.PLAYING) {
            onTimeRef.current(player.getCurrentTime(), player.getDuration());
          }
        } catch {
          /* player mid-load */
        }
      }, 250);
    };

    void boot();

    return () => {
      cancelled = true;
      if (poll) window.clearInterval(poll);
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
      readyRef.current = false;
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !readyRef.current) return;
    if (!videoId) {
      try {
        player.stopVideo();
      } catch {
        /* ignore */
      }
      return;
    }
    try {
      player.cueVideoById(videoId);
      if (playingRef.current) player.playVideo();
    } catch {
      /* ignore invalid mid-load states */
    }
  }, [videoId]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !readyRef.current || !videoId) return;
    try {
      if (playing) player.playVideo();
      else player.pauseVideo();
    } catch {
      /* ignore */
    }
  }, [playing, videoId]);

  return (
    <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
      <div ref={hostRef} />
    </div>
  );
}
