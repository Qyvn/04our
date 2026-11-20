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
 * ONE persistent <audio> element (created once, never re-created on track change).
 *
 * Mobile-browser rules this follows (iOS Safari / Android Chrome):
 *  - `load(src, { play: true })` sets `src` and calls `play()` SYNCHRONOUSLY, so it must be called straight from a
 *    click/tap handler — no await, no setState-then-effect in between — or iOS blocks playback.
 *  - no `crossOrigin` attribute (Apple's CDN is only needed as a plain media request),
 *  - `playsInline`, and the play() promise is always handled (error / retry state, never silently stuck).
 * All visual state comes from real media events and `currentTime`; there are no optimistic timers.
 */
export function usePreviewPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const srcRef = useRef<string | null>(null);
  const gen = useRef(0);
  const wantPlay = useRef(false);
  const rafRef = useRef(0);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(CAP);
  const [slow, setSlow] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const ensure = useCallback((): HTMLAudioElement => {
    if (audioRef.current) return audioRef.current;
    const a = new Audio();
    a.preload = "auto";
    a.setAttribute("playsinline", "");
    audioRef.current = a;
    (window as unknown as { __previewAudio?: HTMLAudioElement }).__previewAudio = a; // handy for tests

    const stopLoop = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
    const stopAt = () => {
      wantPlay.current = false;
      a.pause();
      try { a.currentTime = CAP; } catch {}
      setTime(CAP);
      setStatus("ended");
    };
    const sync = () => {
      const t = a.currentTime;
      if (t >= CAP) { stopAt(); return true; }
      setTime(t);
      return false;
    };
    const loop = () => {
      rafRef.current = 0;
      if (a.paused) return;
      if (!sync()) rafRef.current = requestAnimationFrame(loop);
    };
    const on: [string, EventListener][] = [
      ["playing", () => { setStatus("playing"); setSlow(false); sync(); if (!rafRef.current) rafRef.current = requestAnimationFrame(loop); }],
      ["timeupdate", () => { sync(); }],
      ["pause", () => { stopLoop(); sync(); setStatus((s) => (["ended", "error", "unavailable", "idle"].includes(s) ? s : "paused")); }],
      ["ended", () => { stopLoop(); wantPlay.current = false; setTime(Math.min(CAP, a.currentTime)); setStatus("ended"); }],
      ["waiting", () => { if (wantPlay.current && !a.paused) setStatus((s) => (s === "playing" ? "buffering" : s)); }],
      ["error", () => {
        if (a.getAttribute("src")) {
          stopLoop();
          wantPlay.current = false;
          setErrorCode(a.error?.code ?? 0);
          setStatus("error");
        }
      }],
      ["loadedmetadata", () => { if (Number.isFinite(a.duration) && a.duration > 0) setDuration(Math.min(CAP, a.duration)); }],
    ];
    on.forEach(([n, f]) => a.addEventListener(n, f));
    return a;
  }, []);

  // Create the element on mount (so the first tap can use it) and clean up on unmount.
  useEffect(() => {
    const a = ensure();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      a.pause();
    };
  }, [ensure]);

  // "Still loading…" hint when the CDN is slow (phones on mobile data).
  useEffect(() => {
    if (status !== "loading") { setSlow(false); return; }
    const id = window.setTimeout(() => setSlow(true), 3500);
    return () => window.clearTimeout(id);
  }, [status]);

  const startPlayback = useCallback((a: HTMLAudioElement, my: number) => {
    wantPlay.current = true;
    setStatus((s) => (s === "playing" ? s : "loading"));
    const p = a.play(); // synchronous inside the user's gesture
    if (p && typeof p.then === "function") {
      p.catch((e: unknown) => {
        if (my !== gen.current) return; // track switched meanwhile
        wantPlay.current = false;
        const name = (e as Error)?.name;
        if (name === "AbortError") { setStatus("paused"); return; }
        if (name === "NotAllowedError") { setStatus("paused"); return; }
        setErrorCode(-1);
        setStatus("error");
      });
    }
  }, []);

  /** Load a preview URL (or null/undefined = no preview). With `play`, start playing in the same gesture. */
  const load = useCallback((src: string | null | undefined, opts?: { play?: boolean }) => {
    const a = ensure();
    const my = ++gen.current;
    wantPlay.current = false;
    a.pause();
    setTime(0);
    setDuration(CAP);
    setErrorCode(null);
    if (!src) {
      srcRef.current = null;
      a.removeAttribute("src");
      a.load();
      setStatus("unavailable");
      return;
    }
    if (srcRef.current !== src || a.error) {
      srcRef.current = src;
      a.src = src;
      a.load();
    } else {
      try { a.currentTime = 0; } catch {}
    }
    if (opts?.play) startPlayback(a, my);
    else setStatus("paused");
  }, [ensure, startPlayback]);

  const play = useCallback(() => {
    const a = ensure();
    if (!srcRef.current) return;
    if (a.error) { load(srcRef.current, { play: true }); return; }
    if (a.currentTime >= CAP - 0.05) { try { a.currentTime = 0; } catch {} setTime(0); }
    startPlayback(a, gen.current);
  }, [ensure, load, startPlayback]);

  const pause = useCallback(() => {
    wantPlay.current = false;
    audioRef.current?.pause();
  }, []);

  const replay = useCallback(() => {
    const a = ensure();
    if (!srcRef.current) return;
    a.pause();
    try { a.currentTime = 0; } catch {}
    setTime(0);
    startPlayback(a, gen.current);
  }, [ensure, startPlayback]);

  /** After an error: force a fresh request for the same preview and play. */
  const retry = useCallback(() => {
    const s = srcRef.current;
    if (!s) return;
    srcRef.current = null;
    load(s, { play: true });
  }, [load]);

  return { status, time, duration, cap: CAP, slow, errorCode, load, play, pause, replay, retry };
}

export type Player = ReturnType<typeof usePreviewPlayer>;
