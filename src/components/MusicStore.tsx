"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ARTIST,
  TRACKS,
  formatZar,
  startingPrice,
  type LicenseOption,
  type Track,
} from "@/lib/catalog";
import { withBase } from "@/lib/paths";
import { usePurchasesContext } from "@/components/PurchasesProvider";

const PREVIEW_SECONDS = 30;

type MusicStoreProps = {
  /** Compact home teaser vs full store page */
  variant?: "full" | "teaser";
  limit?: number;
};

export function MusicStore({ variant = "full", limit }: MusicStoreProps) {
  const {
    ready,
    ownsTrack,
    isExclusiveSold,
    addToCart,
    buyTrack,
    setCartOpen,
  } = usePurchasesContext();

  const [query, setQuery] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [licenseTrack, setLicenseTrack] = useState<Track | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const catalog = useMemo(() => {
    const filtered = TRACKS.filter((track) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        track.title.toLowerCase().includes(q) ||
        track.tags.some((tag) => tag.includes(q)) ||
        track.release.toLowerCase().includes(q)
      );
    });
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }, [query, limit]);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    const onTime = () => {
      if (audio.currentTime >= PREVIEW_SECONDS) {
        audio.pause();
        audio.currentTime = 0;
        setPlayingId(null);
      }
    };
    const onEnded = () => setPlayingId(null);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePreview = async (track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playingId === track.id) {
      audio.pause();
      setPlayingId(null);
      return;
    }
    audio.src = withBase(track.preview);
    audio.currentTime = 0;
    try {
      await audio.play();
      setPlayingId(track.id);
    } catch {
      setPlayingId(null);
    }
  };

  const openLicenses = (track: Track) => {
    if (isExclusiveSold(track.id)) return;
    setLicenseTrack(track);
  };

  return (
    <section
      id={variant === "teaser" ? "shop" : "store"}
      className="border-b border-concrete bg-[#0d0d0d]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-ui uppercase tracking-[0.35em] text-signal">
              Music store · BeatStars-style licenses
            </p>
            <h2 className="mt-2 font-display text-4xl text-paper md:text-6xl">
              {variant === "full" ? "Buy music" : "Music marketplace"}
            </h2>
            <p className="mt-3 text-sm text-asphalt md:text-base">
              Preview on-site, stream via official Ditto links, or license MP3 /
              WAV / Exclusive for download in My Crate. Demo payments only.
            </p>
          </div>
          {variant === "teaser" ? (
            <Link
              href="/store"
              className="shrink-0 border border-paper/40 px-5 py-3 text-[11px] font-ui uppercase tracking-[0.22em] text-paper transition-colors hover:border-signal hover:text-signal"
            >
              Open full store
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="shrink-0 border border-paper/40 px-5 py-3 text-[11px] font-ui uppercase tracking-[0.22em] text-paper transition-colors hover:border-signal hover:text-signal"
            >
              View cart
            </button>
          )}
        </div>

        {variant === "full" ? (
          <label className="mb-8 block max-w-md">
            <span className="sr-only">Search tracks</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title or tag…"
              className="w-full border border-concrete bg-ink px-4 py-3 text-sm text-paper outline-none placeholder:text-asphalt focus:border-signal"
            />
          </label>
        ) : null}

        <div className="border-y border-concrete">
          <div className="hidden grid-cols-[auto_1fr_auto_auto] gap-4 border-b border-concrete px-2 py-3 text-[10px] font-ui uppercase tracking-[0.2em] text-asphalt md:grid">
            <span className="w-12">Play</span>
            <span>Track</span>
            <span className="w-28 text-right">Time / key</span>
            <span className="w-36 text-right">License from</span>
          </div>

          <ul>
            {catalog.map((track) => {
              const owned = ready && ownsTrack(track.id);
              const soldOut = ready && isExclusiveSold(track.id);
              const from = startingPrice(track);
              const isPlaying = playingId === track.id;

              return (
                <li
                  key={track.id}
                  className="grid grid-cols-[auto_1fr] items-center gap-3 border-b border-concrete py-4 md:grid-cols-[auto_1fr_auto_auto] md:gap-4"
                >
                  <button
                    type="button"
                    onClick={() => togglePreview(track)}
                    className={`flex h-11 w-11 items-center justify-center border text-[10px] font-ui uppercase tracking-[0.14em] ${
                      isPlaying
                        ? "border-signal bg-signal text-paper"
                        : "border-paper/30 text-paper hover:border-signal"
                    }`}
                    aria-label={
                      isPlaying ? `Pause ${track.title}` : `Play ${track.title}`
                    }
                  >
                    {isPlaying ? "II" : "▶"}
                  </button>

                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative hidden h-12 w-12 shrink-0 overflow-hidden border border-paper/15 sm:block">
                      <Image
                        src={withBase(track.cover)}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-display text-xl text-paper">
                        {track.title}
                        {track.featuring ? (
                          <span className="ml-2 font-ui text-[10px] uppercase tracking-[0.14em] text-asphalt">
                            feat. {track.featuring}
                          </span>
                        ) : null}
                      </p>
                      <p className="truncate text-[10px] font-ui uppercase tracking-[0.16em] text-asphalt">
                        {ARTIST.stageName} · {track.release}
                        {track.dittoUrl ? " · Ditto" : ""}
                      </p>
                    </div>
                  </div>

                  <p className="col-span-2 text-[10px] font-ui uppercase tracking-[0.16em] text-asphalt md:col-span-1 md:w-28 md:text-right">
                    {track.bpm} BPM · {track.musicalKey}
                  </p>

                  <div className="col-span-2 flex flex-wrap items-center justify-end gap-2 md:col-span-1 md:w-auto">
                    {track.dittoUrl ? (
                      <a
                        href={track.dittoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-paper/30 px-3 py-2 text-[10px] font-ui uppercase tracking-[0.18em] text-paper transition-colors hover:border-signal hover:text-signal"
                      >
                        Stream
                      </a>
                    ) : null}
                    {owned ? (
                      <Link
                        href="/library"
                        className="border border-signal px-3 py-2 text-[10px] font-ui uppercase tracking-[0.18em] text-signal"
                      >
                        In crate
                      </Link>
                    ) : soldOut ? (
                      <span className="px-3 py-2 text-[10px] font-ui uppercase tracking-[0.18em] text-asphalt">
                        Exclusive sold
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openLicenses(track)}
                        className="bg-signal px-3 py-2 text-[10px] font-ui uppercase tracking-[0.18em] text-paper"
                      >
                        From {formatZar(from)}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {variant === "teaser" ? (
          <p className="mt-6 text-sm text-asphalt">
            Same flow as BeatStars: price → choose license → cart → instant
            download.{" "}
            <Link href="/store" className="text-signal hover:underline">
              Browse every release
            </Link>
            .
          </p>
        ) : null}
      </div>

      {licenseTrack ? (
        <LicensePicker
          track={licenseTrack}
          onClose={() => setLicenseTrack(null)}
          onAdd={(license) => {
            addToCart(licenseTrack, license);
            setLicenseTrack(null);
          }}
          onBuyNow={(license) => {
            buyTrack(licenseTrack, license);
            setLicenseTrack(null);
          }}
        />
      ) : null}
    </section>
  );
}

function LicensePicker({
  track,
  onClose,
  onAdd,
  onBuyNow,
}: {
  track: Track;
  onClose: () => void;
  onAdd: (license: LicenseOption) => void;
  onBuyNow: (license: LicenseOption) => void;
}) {
  const [selected, setSelected] = useState<LicenseOption>(track.licenses[0]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[75] flex items-end justify-center md:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-ink/75"
        aria-label="Close licenses"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="license-title"
        className="relative z-10 w-full max-w-lg border border-concrete bg-ink p-5 md:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-ui uppercase tracking-[0.3em] text-signal">
              Choose license
            </p>
            <h3
              id="license-title"
              className="mt-1 font-display text-3xl text-paper"
            >
              {track.title}
            </h3>
            {track.featuring ? (
              <p className="mt-1 text-[10px] font-ui uppercase tracking-[0.18em] text-asphalt">
                Feat. {track.featuring}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="border border-paper/30 px-3 py-1.5 text-[10px] font-ui uppercase tracking-[0.2em] text-paper"
          >
            Close
          </button>
        </div>

        {track.tracklist?.length ? (
          <ol className="mt-4 space-y-1 border border-concrete p-3 text-xs text-paper/80">
            {track.tracklist.map((song, index) => (
              <li key={song} className="flex gap-2">
                <span className="text-asphalt">{String(index + 1).padStart(2, "0")}</span>
                <span>{song}</span>
              </li>
            ))}
          </ol>
        ) : null}

        {track.dittoUrl ? (
          <a
            href={track.dittoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-[10px] font-ui uppercase tracking-[0.2em] text-signal hover:underline"
          >
            Official stream / pre-save on Ditto →
          </a>
        ) : null}

        <ul className="mt-6 space-y-3">
          {track.licenses.map((license) => {
            const active = selected.id === license.id;
            return (
              <li key={license.id}>
                <button
                  type="button"
                  onClick={() => setSelected(license)}
                  className={`w-full border p-4 text-left transition-colors ${
                    active
                      ? "border-signal bg-concrete/40"
                      : "border-concrete hover:border-paper/40"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-display text-2xl text-paper">
                      {license.name}
                    </p>
                    <p className="text-signal">{formatZar(license.priceZar)}</p>
                  </div>
                  <p className="mt-1 text-[10px] font-ui uppercase tracking-[0.16em] text-asphalt">
                    Includes {license.files.join(" · ")}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {license.terms.map((term) => (
                      <li
                        key={term}
                        className="border-l border-signal/50 pl-3 text-xs text-paper/80"
                      >
                        {term}
                      </li>
                    ))}
                  </ul>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onAdd(selected)}
            className="border border-paper/40 px-4 py-3 text-[11px] font-ui uppercase tracking-[0.2em] text-paper"
          >
            Add to cart
          </button>
          <button
            type="button"
            onClick={() => onBuyNow(selected)}
            className="bg-signal px-4 py-3 text-[11px] font-ui uppercase tracking-[0.2em] text-paper"
          >
            Buy now · {formatZar(selected.priceZar)}
          </button>
        </div>
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-asphalt">
          Demo store · Instant unlock in My Crate after checkout
        </p>
      </div>
    </div>
  );
}
