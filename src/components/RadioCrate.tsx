"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatDuration, SONGS, type Song } from "@/lib/songs";
import { withBase } from "@/lib/paths";
import { SoundcloudEmbed } from "@/components/SoundcloudEmbed";

export function RadioCrate() {
  const [loaded, setLoaded] = useState<Song | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);

  const placeOnRadio = (song: Song) => {
    setAutoPlay(false);
    setLoaded(song);
  };

  const playLoaded = () => {
    if (!loaded) return;
    // Remount embed with auto_play=true so SoundCloud starts on user click
    setAutoPlay(true);
    setLoaded({ ...loaded });
  };

  const eject = () => {
    setLoaded(null);
    setAutoPlay(false);
  };

  return (
    <section id="listen" className="border-b border-concrete bg-ink">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-ui uppercase tracking-[0.35em] text-signal">
              Real tracks · Official stream
            </p>
            <h2 className="mt-2 font-display text-4xl text-paper md:text-6xl">
              The Crate
            </h2>
            <p className="mt-3 max-w-lg text-sm text-asphalt md:text-base">
              Tap a release onto the deck, then hit play on the SoundCloud
              player — real 04OUR audio, streamed officially.
            </p>
          </div>
          <p className="text-[10px] font-ui uppercase tracking-[0.25em] text-asphalt">
            Full play · SoundCloud
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-max gap-5 border-b-4 border-concrete/60 pb-6 pt-2">
              {SONGS.map((song) => {
                const active = loaded?.id === song.id;
                return (
                  <button
                    key={song.id}
                    type="button"
                    onClick={() => placeOnRadio(song)}
                    className={`group w-36 shrink-0 text-left transition-transform hover:-translate-y-1 ${
                      active ? "opacity-100" : "opacity-90"
                    }`}
                  >
                    <div
                      className={`relative aspect-square overflow-hidden border ${
                        song.format === "cassette"
                          ? "border-asphalt"
                          : "rounded-full border-paper/40"
                      } ${active ? "ring-2 ring-signal" : ""}`}
                    >
                      <Image
                        src={withBase(song.cover)}
                        alt={`${song.title} cover`}
                        fill
                        className="object-cover"
                        sizes="144px"
                      />
                    </div>
                    <p className="mt-2 font-display text-sm leading-tight text-paper">
                      {song.title}
                    </p>
                    <p className="text-[10px] font-ui uppercase tracking-[0.18em] text-asphalt">
                      {song.album ?? song.format} ·{" "}
                      {formatDuration(song.durationSec)}
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
                  {loaded ? "TUNED · LIVE" : "EMPTY DECK"}
                </div>
                <div className="font-mono text-xs text-paper/70">
                  {loaded
                    ? formatDuration(loaded.durationSec)
                    : "0:00 / —"}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div
                  className={`relative h-20 w-20 shrink-0 overflow-hidden border border-paper/20 ${
                    loaded?.format === "cassette" ? "" : "rounded-full"
                  }`}
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
                      ? `${loaded.album ?? "Single"}${
                          loaded.featuring ? ` · feat. ${loaded.featuring}` : ""
                        }`
                      : "Choose a disc or tape from the shelf."}
                  </p>
                </div>
              </div>

              {loaded ? (
                <div className="mt-5 overflow-hidden border border-concrete">
                  <SoundcloudEmbed
                    trackId={loaded.soundcloudId}
                    title={loaded.title}
                    autoPlay={autoPlay}
                  />
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={!loaded}
                  onClick={playLoaded}
                  className="bg-signal px-4 py-2 text-[10px] font-ui uppercase tracking-[0.2em] text-paper disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {autoPlay ? "Restart play" : "Play track"}
                </button>
                <button
                  type="button"
                  disabled={!loaded}
                  onClick={eject}
                  className="border border-paper/30 px-4 py-2 text-[10px] font-ui uppercase tracking-[0.2em] text-paper disabled:opacity-40"
                >
                  Eject
                </button>
                {loaded ? (
                  <Link
                    href="/store"
                    className="border border-transparent px-4 py-2 text-[10px] font-ui uppercase tracking-[0.2em] text-asphalt hover:text-signal"
                  >
                    License / buy
                  </Link>
                ) : null}
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-asphalt">
                Official SoundCloud stream · Use the player controls above
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
