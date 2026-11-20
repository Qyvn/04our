"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type PlayerStatus =
  | "idle"
  | "loading"
  | "buffering"
  | "playing"
  | "paused"
  | "ended"
  | "error"
  | "unavailable";

const CAP = 30;

/**
 * One shared <audio> element. All visual state is derived from real media events and
 * audio.currentTime (read each animation frame while playing) — no optimistic timers.
 * Pattern borrowed from the Wilson Shuker site's preview player.
 */
export function usePreviewPlayer(src: string | null | undefined, hasTrack: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(CAP);
  const gen = useRef(0);
  const wantPlay = useRef(false);

  useEffect(() => {
    const a = new Audio();
    a.preload = "auto";
    audioRef.current = a;
    (window as unknown as { __previewAudio?: HTMLAudioElement[] }).__previewAudio ??= [];
    (window as unknown as { __previewAudio: HTMLAudioElement[] }).__previewAudio.push(a);
    let raf = 0;
    const stopAt = () => {
      wantPlay.current = false;
      a.pause();
      try {
        a.currentTime = CAP;
      } catch {}
      setTime(CAP);
      setStatus("ended");
    };
    const sync = () => {
      const t = a.currentTime;
      if (t >= CAP) {
        stopAt();
        return true;
      }
      setTime(t);
      return false;
    };
    const loop = () => {
      raf = 0;
      if (a.paused) return;
      if (!sync()) raf = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const on: [string, EventListener][] = [
      ["playing", () => { setStatus("playing"); sync(); startLoop(); }],
      ["timeupdate", () => { sync(); }],
      ["pause", () => { stopLoop(); sync(); setStatus((s) => (["ended", "error", "unavailable"].includes(s) ? s : "paused")); }],
      ["ended", () => { stopLoop(); wantPlay.current = false; setTime(Math.min(CAP, a.currentTime)); setStatus("ended"); }],
      ["waiting", () => { if (wantPlay.current && !a.paused) setStatus((s) => (s === "playing" ? "buffering" : s)); }],
      ["error", () => { if (a.getAttribute("src")) { stopLoop(); wantPlay.current = false; setStatus("error"); } }],
      ["loadedmetadata", () => { if (Number.isFinite(a.duration) && a.duration > 0) setDuration(Math.min(CAP, a.duration)); }],
    ];
    on.forEach(([n, f]) => a.addEventListener(n, f));
    return () => {
      stopLoop();
      on.forEach(([n, f]) => a.removeEventListener(n, f));
      a.pause();
      a.removeAttribute("src");
    };
  }, []);

  // Track switch: stop, detach, load the new source (preload, no autoplay).
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    gen.current++;
    wantPlay.current = false;
    a.pause();
    setTime(0);
    setDuration(CAP);
    if (!hasTrack) {
      a.removeAttribute("src");
      setStatus("idle");
      return;
    }
    if (!src) {
      a.removeAttribute("src");
      a.load();
      setStatus("unavailable");
      return;
    }
    a.src = src;
    a.load();
    setStatus("paused");
  }, [src, hasTrack]);

  const play = useCallback(async () => {
    const a = audioRef.current;
    if (!a || !src) return;
    const my = gen.current;
    if (a.currentTime >= CAP - 0.05) {
      try { a.currentTime = 0; } catch {}
      setTime(0);
    }
    wantPlay.current = true;
    setStatus((s) => (s === "playing" ? s : "loading"));
    try {
      await a.play();
    } catch (e) {
      if (my !== gen.current) return;
      wantPlay.current = false;
      const name = (e as Error)?.name;
      setStatus(name === "AbortError" || name === "NotAllowedError" ? "paused" : "error");
    }
  }, [src]);

  const pause = useCallback(() => {
    wantPlay.current = false;
    audioRef.current?.pause();
  }, []);

  const replay = useCallback(async () => {
    const a = audioRef.current;
    if (!a || !src) return;
    a.pause();
    try { a.currentTime = 0; } catch {}
    setTime(0);
    await play();
  }, [src, play]);

  return { status, time, duration, cap: CAP, play, pause, replay };
}

export type Player = ReturnType<typeof usePreviewPlayer>;
