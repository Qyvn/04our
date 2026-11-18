"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TRACKS, type Track } from "@/lib/catalog";
import { withBase } from "@/lib/paths";

const PREVIEW_SECONDS = 30;

export function RadioCrate() {
  const [loaded, setLoaded] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    const onTime = () => {
      const t = audio.currentTime;
      setElapsed(t);
      if (t >= PREVIEW_SECONDS) {
        audio.pause();
        audio.currentTime = 0;
        setPlaying(false);
        setElapsed(0);
      }
    };
    const onEnded = () => {
      setPlaying(false);
      setElapsed(0);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const placeOnRadio = (track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
    setElapsed(0);
    setLoaded(track);
    audio.src = withBase(track.preview);
    audio.load();
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !loaded) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      if (audio.currentTime >= PREVIEW_SECONDS) audio.currentTime = 0;
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const eject = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
    }
    setLoaded(null);
    setPlaying(false);
    setElapsed(0);
  };

  return (
    <section id="listen" className="border-b border-concrete bg-ink">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-ui uppercase tracking-[0.35em] text-signal">
              Physical media · Preview only
            </p>
            <h2 className="mt-2 font-display text-4xl text-paper md:text-6xl">
              The Crate
            </h2>
            <p className="mt-3 max-w-lg text-sm text-asphalt md:text-base">
              Tap a CD or cassette onto the old radio. You get a thirty-second
              sample — not a download, not the full song.
            </p>
          </div>
          <p className="text-[10px] font-ui uppercase tracking-[0.25em] text-asphalt">
            Preview 0:30 · Demo audio
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-max gap-5 border-b-4 border-concrete/60 pb-6 pt-2">
              {TRACKS.map((track) => {
                const active = loaded?.id === track.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => placeOnRadio(track)}
                    className={`group w-36 shrink-0 text-left transition-transform hover:-translate-y-1 ${
                      active ? "opacity-100" : "opacity-90"
                    }`}
                  >
                    <div
                      className={`relative aspect-square overflow-hidden border ${
                        track.format === "cassette"
                          ? "border-asphalt"
                          : "rounded-full border-paper/40"
                      } ${active ? "ring-2 ring-signal" : ""}`}
                    >
                      <Image
                        src={withBase(track.cover)}
                        alt={`${track.title} cover`}
                        fill
                        className="object-cover"
                        sizes="144px"
                      />
                    </div>
                    <p className="mt-2 font-display text-sm leading-tight text-paper">
                      {track.title}
                    </p>
                    <p className="text-[10px] font-ui uppercase tracking-[0.18em] text-asphalt">
                      {track.format} · {track.year}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`relative border border-concrete bg-concrete/40 p-5 md:p-6 ${
              loaded ? "deck-live border-signal/50" : ""
            }`}
          >
            <div className="pointer-events-none absolute inset-x-6 top-3 h-px bg-asphalt/40" />
            <p className="text-[10px] font-ui uppercase tracking-[0.3em] text-asphalt">
              Old-style radio
            </p>
            <div className="mt-4 rounded-sm bg-ink p-4 shadow-inner">
              <div className="flex items-center justify-between gap-3">
                <div className="font-mono text-xs text-signal">
                  {loaded ? "TUNED · PREVIEW" : "EMPTY DECK"}
                </div>
                <div className="font-mono text-xs text-paper/70">
                  {String(Math.min(PREVIEW_SECONDS, Math.floor(elapsed))).padStart(2, "0")}
                  s / 30s
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div
                  className={`relative h-20 w-20 shrink-0 overflow-hidden border border-paper/20 ${
                    loaded?.format === "cassette" ? "" : "rounded-full"
                  } ${playing ? "animate-[spin_4s_linear_infinite]" : ""}`}
                >
                  {loaded ? (
                    <Image
                      src={withBase(loaded.cover)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-concrete text-[10px] uppercase tracking-widest text-asphalt">
                      —
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-xl text-paper">
                    {loaded ? loaded.title : "Select media"}
                  </p>
                  <p className="mt-1 text-xs text-asphalt">
                    {loaded
                      ? loaded.description
                      : "Choose a disc or tape from the shelf."}
                  </p>
                  <div className="mt-3 h-1.5 overflow-hidden bg-concrete">
                    <div
                      className="h-full bg-signal transition-[width] duration-200"
                      style={{
                        width: `${Math.min(100, (elapsed / PREVIEW_SECONDS) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={!loaded}
                  onClick={togglePlay}
                  className="bg-signal px-4 py-2 text-[10px] font-ui uppercase tracking-[0.2em] text-paper disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {playing ? "Pause" : "Play preview"}
                </button>
                <button
                  type="button"
                  disabled={!loaded}
                  onClick={eject}
                  className="border border-paper/30 px-4 py-2 text-[10px] font-ui uppercase tracking-[0.2em] text-paper disabled:opacity-40"
                >
                  Eject
                </button>
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-asphalt">
                Sample only · Not a download · Full song after purchase
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
