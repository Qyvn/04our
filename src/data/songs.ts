/**
 * SONG DATA — 04OUR  (single source of truth for Listen, Shop, Videos and the discography)
 *
 * Verified 20 Nov 2026. Nothing here is invented. Sources:
 *  - Apple's iTunes Lookup API for artist 04our (artistId 1502182352, country=za, 53 songs): every 30-second
 *    `previewUrl` (.m4a), Apple Music link and cover art below. Streamed from Apple's CDN, never rehosted.
 *    Duplicates removed: the second "I Need You" single, the standalone "Blessings" single (it is on 4444 of a Kind EP),
 *    and the album copy of "Nkri Nkri Nkri".
 *  - The artist's Ditto smart-links (In-4Mation EP, It's Just "4" Not "4 Our", Alot, Kick-Off Freestyle, Money for Mama,
 *    Isilwane, Ukuhlwa, Vimba): titles, durations, cover art and the Spotify / YouTube Music / SoundCloud links behind
 *    their service buttons.
 *  - YouTube oEmbed: each `youtube.id` returns author_url = the "04our - Topic" channel (UCF495vOibO8ZJ0KzYDy3X8w),
 *    04OUR's own channel (@04our66) or the Tiny Films official-visuals channel (@tinyfilms_).
 *
 * Playback rule (same as the Wilson Shuker site):
 *   previewUrl present -> cassette deck plays Apple's 30s M4A preview (+ optional "Watch" video if `youtube` is set)
 *   no previewUrl      -> deck shows "Preview unavailable" and the official YouTube embed instead
 *   comingSoon         -> "Coming soon" label, no player
 */

export type YouTubeRef = {
  id: string;
  title: string;
  channel: "04our - Topic" | "04OUR" | "Tiny Films";
};

export type SongTrack = {
  id: string;
  title: string;
  /** Length of the full song (mm:ss). */
  length?: string;
  /** Apple's 30-second preview (.m4a). */
  previewUrl?: string;
  appleMusicUrl?: string;
  youtube?: YouTubeRef;
};

export type Release = {
  id: string;
  title: string;
  kind: "EP" | "Album" | "Single";
  /** "ep" = EPs & albums, "single" = 04OUR's own singles, "feature" = tracks by other artists featuring 04OUR. */
  group: "ep" | "single" | "feature";
  /** Lead artist when it isn't just 04our (features, collabs). */
  artist?: string;
  /** ISO date from Apple / Ditto when known — never guessed. */
  released?: string;
  /** Local path (starts with "/") or an Apple CDN URL. */
  cover?: string;
  format: "cd" | "cassette";
  /** Shown on the Listen shelf + sold in the demo shop. */
  featured?: boolean;
  comingSoon?: boolean;
  tracks: SongTrack[];
  links: {
    apple?: string;
    ditto?: string;
    spotify?: string;
    youtubeMusic?: string;
    soundcloud?: string;
  };
  note?: string;
};

export const RELEASES: Release[] = [
  {
    "id": "ukuhlwa",
    "title": "Ukuhlwa",
    "kind": "Single",
    "group": "single",
    "released": "2026-07-03",
    "cover": "/covers/new/ukuhlwa.jpeg",
    "tracks": [
      {
        "id": "ukuhlwa",
        "title": "Ukuhlwa",
        "youtube": {
          "id": "eJ_wMFV6KsM",
          "title": "Ukuhlwa",
          "channel": "04our - Topic"
        }
      }
    ],
    "links": {
      "ditto": "https://ditto.fm/ukuhlwa-04our"
    },
    "note": "Listed as “Coming soon” on the artist's Ditto page. An official YouTube upload already exists (id kept in this file) — flip comingSoon to false to switch the player on.",
    "comingSoon": true,
    "featured": true,
    "format": "cassette"
  },
  {
    "id": "kick-off-freestyle",
    "title": "Kick-Off Freestyle",
    "kind": "Single",
    "group": "single",
    "released": "2026-05-31",
    "cover": "/covers/new/kick-off-freestyle.jpg",
    "tracks": [
      {
        "id": "kick-off-freestyle-4612",
        "title": "Kick-Off Freestyle",
        "length": "2:30",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d5/c7/5a/d5c75a21-2b64-5645-7b1d-caf78471197c/mzaf_2835921008718237238.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/kick-off-freestyle/6774504157?i=6774504612",
        "youtube": {
          "id": "PPCc9g6FNXo",
          "title": "Kick-Off Freestyle",
          "channel": "04our - Topic"
        }
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/kick-off-freestyle/6774504157?i=6774504612",
      "ditto": "https://ditto.fm/kick-off-freestyle",
      "spotify": "https://open.spotify.com/track/1iMDRGeVKtnkxEqXzeidTH",
      "youtubeMusic": "https://music.youtube.com/watch?v=PPCc9g6FNXo",
      "soundcloud": "https://soundcloud.com/04our-music/kick-off-freestyle"
    },
    "featured": true,
    "format": "cassette"
  },
  {
    "id": "isilwane",
    "title": "Isilwane",
    "kind": "Single",
    "group": "single",
    "released": "2026-03-25",
    "cover": "/covers/new/isilwane.jpeg",
    "tracks": [
      {
        "id": "isilwane",
        "title": "Isilwane",
        "youtube": {
          "id": "nvlImQfLO1s",
          "title": "Isilwane",
          "channel": "04our - Topic"
        }
      }
    ],
    "links": {
      "ditto": "https://ditto.fm/isilwane"
    },
    "note": "Listed as “Coming soon” on the artist's Ditto page. An official YouTube upload already exists (id kept in this file) — flip comingSoon to false to switch the player on.",
    "comingSoon": true,
    "featured": true,
    "format": "cassette"
  },
  {
    "id": "vimba",
    "title": "Vimba",
    "kind": "Single",
    "group": "single",
    "released": "2026-02-02",
    "cover": "/covers/new/vimba.jpeg",
    "tracks": [
      {
        "id": "vimba",
        "title": "Vimba",
        "length": "2:35",
        "youtube": {
          "id": "qm2-uRvSYPc",
          "title": "Vimba",
          "channel": "04our - Topic"
        }
      }
    ],
    "links": {
      "ditto": "https://ditto.fm/vimba_ee127544"
    },
    "note": "Listed as “Coming soon” on the artist's Ditto page. An official YouTube upload already exists (id kept in this file) — flip comingSoon to false to switch the player on.",
    "comingSoon": true,
    "featured": true,
    "format": "cassette"
  },
  {
    "id": "money-for-mama",
    "title": "Money for Mama",
    "kind": "Single",
    "group": "single",
    "cover": "/covers/new/money-for-mama.jpeg",
    "tracks": [
      {
        "id": "money-for-mama",
        "title": "Money for Mama",
        "youtube": {
          "id": "pGd74zcZxe4",
          "title": "Money for Mama",
          "channel": "04our - Topic"
        }
      }
    ],
    "links": {
      "ditto": "https://ditto.fm/money-for-mama-04our",
      "spotify": "https://open.spotify.com/track/1xSqsc1g5aAtY8uHMySxcp",
      "youtubeMusic": "https://music.youtube.com/watch?v=pGd74zcZxe4",
      "soundcloud": "https://soundcloud.com/04our-music/money-for-mama-1"
    },
    "note": "Not on Apple Music — plays the official YouTube upload.",
    "featured": true,
    "format": "cassette"
  },
  {
    "id": "alot",
    "title": "Alot",
    "kind": "Single",
    "group": "single",
    "released": "2025-06-04",
    "cover": "/covers/new/alot.jpg",
    "tracks": [
      {
        "id": "alot-6924",
        "title": "Alot",
        "length": "1:08",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/bf/4d/89/bf4d89e0-b82e-6278-9f22-a2016086992d/mzaf_602088423384567248.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/alot/1850256531?i=1850256924"
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/alot/1850256531?i=1850256924",
      "ditto": "https://ditto.fm/alot_997f01bc",
      "spotify": "https://open.spotify.com/album/3rZES37oicTVwxjWivu8fH",
      "youtubeMusic": "https://music.youtube.com/playlist?list=OLAK5uy_nKi0ElpPRWx-w8-85DeD8djBRvFa6o7bo",
      "soundcloud": "https://soundcloud.com/04our-music/alot"
    },
    "featured": true,
    "format": "cassette"
  },
  {
    "id": "its-just-4-not-4-our",
    "title": "It’s Just “4” Not “4 Our”",
    "kind": "Single",
    "group": "single",
    "released": "2024-09-20",
    "cover": "/covers/new/its-just-4.jpg",
    "tracks": [
      {
        "id": "04our-1-5046",
        "title": "04our 1",
        "length": "2:11",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/6e/f3/37/6ef3374e-66ce-9c5a-8c4c-08e49669c24c/mzaf_9225258811509576091.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/04our-1/1767144706?i=1767145046",
        "youtube": {
          "id": "KNigQ2yD08k",
          "title": "04OUR - 04OUR 1 (Official visuals)",
          "channel": "Tiny Films"
        }
      },
      {
        "id": "04our-2-5047",
        "title": "04our 2",
        "length": "3:04",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d6/bb/d0/d6bbd038-0110-9c7d-22f1-8cf4b8a458e0/mzaf_2578590693712568732.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/04our-2/1767144706?i=1767145047",
        "youtube": {
          "id": "BoVyy0TD3yM",
          "title": "04OUR - 04OUR 2 (Official visuals)",
          "channel": "Tiny Films"
        }
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/04our-1/1767144706",
      "ditto": "https://ditto.fm/its-just-4-not-4-our",
      "spotify": "https://open.spotify.com/album/6ly9oYK9pMpP8DT2QDoYyN",
      "youtubeMusic": "https://music.youtube.com/playlist?list=OLAK5uy_nMKmuPemLr_Px1syp86AbkdHNT4ovstaE",
      "soundcloud": "https://soundcloud.com/04our-music/sets/its-just-4-not-4-our"
    },
    "featured": true,
    "format": "cd"
  },
  {
    "id": "in-4mation-ep",
    "title": "In-4Mation EP",
    "kind": "EP",
    "group": "ep",
    "released": "2024-06-21",
    "cover": "/covers/new/in-4mation.jpg",
    "tracks": [
      {
        "id": "my-bros-8852",
        "title": "My Bros",
        "length": "1:30",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f3/e3/96/f3e39647-7c51-ed4a-0857-28b62015afa2/mzaf_10904811789932241349.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/my-bros/1754768851?i=1754768852",
        "youtube": {
          "id": "jgQWqYqxckA",
          "title": "My bros",
          "channel": "04our - Topic"
        }
      },
      {
        "id": "her-own-lies-8994",
        "title": "Her Own Lies",
        "length": "2:42",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d6/05/a4/d605a402-899e-f5ba-81d7-97c4177be1c8/mzaf_12441945003625527780.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/her-own-lies/1754768851?i=1754768994",
        "youtube": {
          "id": "5cd75UfOn-g",
          "title": "04OUR - Her own lies (Official visuals)",
          "channel": "Tiny Films"
        }
      },
      {
        "id": "chill-8996",
        "title": "Chill",
        "length": "2:35",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f3/60/92/f36092fe-ae60-ac86-2ea2-dd053ea98402/mzaf_11453490700967497112.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/chill/1754768851?i=1754768996"
      },
      {
        "id": "great-ones-9004",
        "title": "Great Ones",
        "length": "1:52",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e0/cb/0e/e0cb0ee0-e55b-321b-91f1-561868b3584b/mzaf_2275572204764850422.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/great-ones/1754768851?i=1754769004"
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/my-bros/1754768851",
      "ditto": "https://ditto.fm/in-4mation-ep",
      "spotify": "https://open.spotify.com/album/2ROQxduev8YrJrWkufMOHy",
      "youtubeMusic": "https://music.youtube.com/playlist?list=OLAK5uy_nMAqrGdedqgSo2Ssk91k0UXzzza0ao5ss",
      "soundcloud": "https://soundcloud.com/04our-music/sets/in-4mation-ep"
    },
    "featured": true,
    "format": "cd"
  },
  {
    "id": "kancane-kancane",
    "title": "Kancane Kancane",
    "kind": "Single",
    "group": "single",
    "released": "2026-06-25",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/6a/d9/0c/6ad90c42-d02d-fc4a-5e02-bee983054e06/5064020426023_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "kancane-kancane-2493",
        "title": "Kancane Kancane",
        "length": "1:57",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/21/7c/16/217c16e9-a703-12fd-4b09-cff1ba3ca642/mzaf_13290799797984989400.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/kancane-kancane/6782612490?i=6782612493",
        "youtube": {
          "id": "YNxuqY1cMeI",
          "title": "Kancane Kancane",
          "channel": "04our - Topic"
        }
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/kancane-kancane/6782612490?i=6782612493"
    },
    "format": "cassette"
  },
  {
    "id": "sorry-personal-growth",
    "title": "Sorry (Personal Growth)",
    "kind": "Single",
    "group": "single",
    "released": "2026-05-31",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/69/42/48/694248a8-0ba2-1714-dcdb-98483d94615e/5063961642806_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "sorry-personal-growth-4160",
        "title": "Sorry (Personal Growth)",
        "length": "2:59",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/75/6a/78/756a78ed-8a4d-b601-b034-44b5d96660a3/mzaf_18178931767006715690.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/sorry-personal-growth/6774474151?i=6774474160",
        "youtube": {
          "id": "YD-DPeA9VF0",
          "title": "Sorry (Personal Growth)",
          "channel": "04our - Topic"
        }
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/sorry-personal-growth/6774474151?i=6774474160"
    },
    "format": "cassette"
  },
  {
    "id": "ebsheni-bami",
    "title": "Eb'sheni Bami",
    "kind": "Single",
    "group": "single",
    "released": "2026-04-10",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/53/20/26/532026ef-acd9-2e8a-a0d0-0b45522968ac/5063960191916_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "ebsheni-bami-9457",
        "title": "Eb'sheni Bami",
        "length": "4:25",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/32/c0/78/32c0782a-f0b6-5757-5985-abb84e9f7670/mzaf_5788738875614120833.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/ebsheni-bami/1890529092?i=1890529457",
        "youtube": {
          "id": "FPTdNE99oGU",
          "title": "Eb'sheni Bami",
          "channel": "04our - Topic"
        }
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/ebsheni-bami/1890529092?i=1890529457"
    },
    "format": "cassette"
  },
  {
    "id": "isobho",
    "title": "Isobho",
    "kind": "Single",
    "group": "single",
    "released": "2026-02-06",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ce/92/b6/ce92b6af-6ae6-fd82-babf-f440c50a8920/5063904697542_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "isobho-1429",
        "title": "Isobho",
        "length": "3:11",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/56/5d/f3/565df300-06b1-248e-1819-980adb56ddf3/mzaf_6519897609779107741.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/isobho/1873321415?i=1873321429",
        "youtube": {
          "id": "Xx2l70VrTXY",
          "title": "04our - Isobho (Official Visuals)",
          "channel": "Tiny Films"
        }
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/isobho/1873321415?i=1873321429"
    },
    "format": "cassette"
  },
  {
    "id": "on-my-own",
    "title": "On My Own",
    "kind": "Single",
    "group": "single",
    "tracks": [
      {
        "id": "on-my-own",
        "title": "On My Own",
        "length": "2:51",
        "youtube": {
          "id": "Ak_vrYwN4Ko",
          "title": "04OUR - On My Own (Official Audio)",
          "channel": "04OUR"
        }
      }
    ],
    "links": {},
    "note": "YouTube only — plays the official audio upload.",
    "format": "cassette"
  },
  {
    "id": "double-peace-freestyle-snakes",
    "title": "Double Peace Freestyle (Snakes)",
    "kind": "Single",
    "group": "single",
    "tracks": [
      {
        "id": "double-peace-freestyle-snakes",
        "title": "Double Peace Freestyle (Snakes)",
        "length": "2:21",
        "youtube": {
          "id": "rnKewfmafMs",
          "title": "04OUR - Double Peace Freestyle (Snakes)",
          "channel": "04OUR"
        }
      }
    ],
    "links": {},
    "note": "YouTube only.",
    "format": "cassette"
  },
  {
    "id": "equal-dividends",
    "title": "Equal Dividends",
    "kind": "Single",
    "group": "feature",
    "tracks": [
      {
        "id": "equal-dividends",
        "title": "Equal Dividends",
        "length": "2:25",
        "youtube": {
          "id": "Ze51kEr2P3s",
          "title": "Louder T x 04OUR - Equal Dividends (Official Visuals)",
          "channel": "Tiny Films"
        }
      }
    ],
    "links": {},
    "artist": "Louder T × 04OUR",
    "note": "YouTube only — official visuals by Tiny Films.",
    "format": "cassette"
  },
  {
    "id": "penalty-freestyle",
    "title": "Penalty Freestyle",
    "kind": "Single",
    "group": "single",
    "released": "2025-12-20",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f0/53/7c/f0537ca3-2707-98e2-c09e-a22e9ed1f204/5063858740844_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "penalty-freestyle-8631",
        "title": "Penalty Freestyle",
        "length": "2:05",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/33/78/33/3378337e-1f7a-8936-88ad-1043e67e1376/mzaf_6823411062489324370.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/penalty-freestyle/1862438620?i=1862438631"
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/penalty-freestyle/1862438620?i=1862438631"
    },
    "format": "cassette"
  },
  {
    "id": "ishuu-feat-pdogg-amazing-04our-ricco-tello-grae-jxy",
    "title": "Ishuu (feat. Pdogg Amazing, 04our, Ricco Tello & Grae Jxy)",
    "kind": "Single",
    "group": "feature",
    "released": "2025-10-10",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/aa/c9/43/aac94313-558b-1bbf-7bac-f3f517f9f140/7300346293399.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "ishuu-feat-pdogg-amazing-04our-ricco-tello-grae-jxy-3244",
        "title": "Ishuu (feat. Pdogg Amazing, 04our, Ricco Tello & Grae Jxy)",
        "length": "2:48",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d5/bf/01/d5bf0119-ba92-7823-5a06-1eba23f90c24/mzaf_4381438306330910534.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/ishuu-feat-pdogg-amazing-04our-ricco-tello-grae-jxy/1842783239?i=1842783244"
      }
    ],
    "artist": "SigmaStudiio & Dustbeatz",
    "links": {
      "apple": "https://music.apple.com/za/album/ishuu-feat-pdogg-amazing-04our-ricco-tello-grae-jxy/1842783239?i=1842783244"
    },
    "format": "cassette"
  },
  {
    "id": "killing-me-softly-feat-sbopho-emo",
    "title": "Killing Me Softly (feat. Sbopho & EMO)",
    "kind": "Single",
    "group": "single",
    "released": "2025-09-23",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/63/52/73/6352732e-cbe2-a444-165e-dd751e96b93e/5063807297061_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "killing-me-softly-feat-emo-sbopho-5769",
        "title": "Killing Me Softly (feat. EMO & Sbopho)",
        "length": "4:35",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/9d/1d/66/9d1d6677-a341-6fff-7657-ecb2a79e0191/mzaf_18138869781048707106.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/killing-me-softly-feat-emo-sbopho/1841105764?i=1841105769",
        "youtube": {
          "id": "UXbzkLtJvoc",
          "title": "04OUR - Killing Me Softly (ft. Emo & Sbopho)",
          "channel": "Tiny Films"
        }
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/killing-me-softly-feat-emo-sbopho/1841105764?i=1841105769"
    },
    "format": "cassette"
  },
  {
    "id": "bodmas-rules",
    "title": "Bodmas Rules",
    "kind": "Single",
    "group": "single",
    "released": "2025-08-15",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/2a/ab/f2/2aabf2e7-53c1-a798-14d5-262b594a6d1a/5063778738136_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "bodmas-rules-9699",
        "title": "Bodmas Rules",
        "length": "2:32",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/4e/02/9d/4e029daa-25a0-82c1-82ad-49eee6b8a7f7/mzaf_17600484585365805808.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/bodmas-rules/1833239688?i=1833239699"
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/bodmas-rules/1833239688?i=1833239699"
    },
    "format": "cassette"
  },
  {
    "id": "ngena-ngaphakathi",
    "title": "Ngena Ngaphakathi",
    "kind": "Single",
    "group": "single",
    "released": "2025-04-10",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/26/6a/70/266a7026-0935-33ea-0795-50397067753f/5063655096571_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "ngena-ngaphakathi-5262",
        "title": "Ngena Ngaphakathi",
        "length": "2:01",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/47/ca/2f/47ca2fb0-05f8-2ffc-9608-46e47bc4d3e1/mzaf_18065456198420188503.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/ngena-ngaphakathi/1804744968?i=1804745262"
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/ngena-ngaphakathi/1804744968?i=1804745262"
    },
    "format": "cassette"
  },
  {
    "id": "my-nigga-feat-04our",
    "title": "My Nigga (feat. 04our)",
    "kind": "Single",
    "group": "feature",
    "released": "2025-03-28",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/7b/3a/10/7b3a1035-ea24-edd4-c996-f25b559ef73f/0.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "my-n-a-feat-04our-7256",
        "title": "My N***a (feat. 04our)",
        "length": "3:15",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/53/61/85/536185c3-5bd4-0406-0ad5-5ac2a7fe1a93/mzaf_6138254388870335263.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/my-n-a-feat-04our/1801377255?i=1801377256"
      }
    ],
    "artist": "esbeeflex031",
    "links": {
      "apple": "https://music.apple.com/za/album/my-n-a-feat-04our/1801377255?i=1801377256"
    },
    "format": "cassette"
  },
  {
    "id": "16-feat-ricco-tello-04our-pdogg-amazing-tommy-nebula-hood-baby",
    "title": "16 (feat. Ricco Tello, 04our, Pdogg Amazing, Tommy Nebula & Hood Baby)",
    "kind": "Single",
    "group": "feature",
    "released": "2025-02-21",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b4/82/d3/b482d37a-3c06-501d-bc10-9a7a6e3b56c3/7300343620730.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "16-feat-ricco-tello-04our-pdogg-amazing-tommy-nebula-hood-baby-4233",
        "title": "16 (feat. Ricco Tello, 04our, Pdogg Amazing, Tommy Nebula & Hood Baby)",
        "length": "2:49",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f2/b6/0e/f2b60e3c-edd5-64a8-d4f5-0f7e7779d759/mzaf_6501167305373153967.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/16-feat-ricco-tello-04our-pdogg-amazing-tommy-nebula/1794494230?i=1794494233"
      }
    ],
    "artist": "SigmaStudiio",
    "links": {
      "apple": "https://music.apple.com/za/album/16-feat-ricco-tello-04our-pdogg-amazing-tommy-nebula/1794494230?i=1794494233"
    },
    "format": "cassette"
  },
  {
    "id": "goku-feat-ricco-tello-tommy-nebula-04our-skhulusamantungwa-slim-ego-pdogg-amazing",
    "title": "Goku (feat. Ricco Tello, Tommy Nebula, 04our, SkhulusamaNtungwa, Slim Ego & Pdogg Amazing)",
    "kind": "Single",
    "group": "feature",
    "released": "2024-11-22",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/52/56/c5/5256c54d-52c1-a3a5-130a-fe885b9b548d/7300342898710.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "goku-feat-ricco-tello-tommy-nebula-04our-skhulusamantungwa-slim-ego-pdogg-amazing-3745",
        "title": "Goku (feat. Ricco Tello, Tommy Nebula, 04our, SkhulusamaNtungwa, Slim Ego & Pdogg Amazing)",
        "length": "2:58",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ef/2c/a3/ef2ca3f0-080c-ac3f-265d-9bc8fc30de2c/mzaf_9026864328839993507.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/goku-feat-ricco-tello-tommy-nebula-04our-skhulusamantungwa/1781273743?i=1781273745"
      }
    ],
    "artist": "SigmaStudiio",
    "links": {
      "apple": "https://music.apple.com/za/album/goku-feat-ricco-tello-tommy-nebula-04our-skhulusamantungwa/1781273743?i=1781273745"
    },
    "format": "cassette"
  },
  {
    "id": "straight-up",
    "title": "Straight Up",
    "kind": "Single",
    "group": "single",
    "released": "2024-08-19",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/55/50/20/55502090-d718-6151-123c-1721dc8e540f/5063549495718_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "straight-up-7648",
        "title": "Straight Up",
        "length": "1:24",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/34/cc/4b/34cc4b30-0f92-f746-e0b8-5539129430d3/mzaf_6015692033890695718.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/straight-up/1762217504?i=1762217648"
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/straight-up/1762217504?i=1762217648"
    },
    "format": "cassette"
  },
  {
    "id": "mshanam",
    "title": "Mshanam",
    "kind": "Single",
    "group": "single",
    "released": "2024-04-26",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/78/96/09/789609f2-ca62-4227-99fd-d882beb4176d/5063483452754_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "mshanam-0716",
        "title": "Mshanam",
        "length": "3:28",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/cf/1d/22/cf1d221c-2424-fe4c-6297-4554620037f1/mzaf_4711115387920812535.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/mshanam/1742660381?i=1742660716",
        "youtube": {
          "id": "w6X6RpbFn_0",
          "title": "04OUR x Mabhiyoza - Mshanam (Official visuals)",
          "channel": "Tiny Films"
        }
      }
    ],
    "artist": "04our & MaBhiyoza",
    "links": {
      "apple": "https://music.apple.com/za/album/mshanam/1742660381?i=1742660716"
    },
    "format": "cassette"
  },
  {
    "id": "lost-files",
    "title": "Lost Files",
    "kind": "Album",
    "group": "ep",
    "released": "2024-02-10",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c0/fe/f8/c0fef87f-0519-dfd6-27c8-4ceec57745e0/5063413779029_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "ipiki-7618",
        "title": "Ipiki",
        "length": "1:47",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/76/ac/27/76ac27a0-27fe-53e8-ba9d-3716dece2b0c/mzaf_16288031623025950952.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/ipiki/1729257372?i=1729257618",
        "youtube": {
          "id": "8B7r72gOOho",
          "title": "Ipiki",
          "channel": "04our - Topic"
        }
      },
      {
        "id": "number-10-7621",
        "title": "Number 10",
        "length": "3:27",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/9b/23/86/9b238655-1655-e381-3a85-b3b965a7f8f1/mzaf_14327138013935761522.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/number-10/1729257372?i=1729257621",
        "youtube": {
          "id": "Vrnh_9SLdg4",
          "title": "04OUR - Number 10 (Official visuals)",
          "channel": "Tiny Films"
        }
      },
      {
        "id": "ho-t-7625",
        "title": "Ho.T",
        "length": "2:56",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/e5/14/b8/e514b8e5-6b8d-c424-4960-2dd990206883/mzaf_14893582817243708128.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/ho-t/1729257372?i=1729257625"
      },
      {
        "id": "things-about-you-7770",
        "title": "Things About You",
        "length": "2:45",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/e6/64/48/e66448e8-9975-0eb1-347b-03cadb95522e/mzaf_1528144368749878796.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/things-about-you/1729257372?i=1729257770"
      },
      {
        "id": "sauce-7778",
        "title": "Sauce",
        "length": "3:17",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/4c/fb/5a/4cfb5a76-fdc8-6f82-d7b1-e3c37565acf0/mzaf_17067534132158690046.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/sauce/1729257372?i=1729257778"
      },
      {
        "id": "intombazane-feat-mthorsh-7786",
        "title": "Intombazane (feat. Mthorsh)",
        "length": "4:04",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/14/d4/10/14d41071-5e97-9733-eefa-cd837e523daf/mzaf_12696185117202762650.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/intombazane-feat-mthorsh/1729257372?i=1729257786"
      },
      {
        "id": "grind-7790",
        "title": "Grind",
        "length": "4:06",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/10/89/30/108930c1-17e4-2406-f116-41dabb1ce13f/mzaf_13086400391508169106.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/grind/1729257372?i=1729257790"
      },
      {
        "id": "syofa-7795",
        "title": "S'yofa",
        "length": "4:02",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/ec/1d/e8/ec1de809-5a40-aee0-0587-b684dc20caa2/mzaf_6221036772137815800.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/syofa/1729257372?i=1729257795"
      },
      {
        "id": "up-n-d-bergs-freestyle-8100",
        "title": "Up N D Bergs Freestyle",
        "length": "1:42",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/82/19/49/8219498b-e7d1-e20f-9156-1bbc37865139/mzaf_14216840532933327977.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/up-n-d-bergs-freestyle/1729257372?i=1729258100"
      },
      {
        "id": "lentilula-feat-mabhiyoza-8111",
        "title": "Lent'ilula (feat. MaBhiyoza)",
        "length": "2:40",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/40/70/7d/40707d3b-de9c-ba58-be89-99384c2141db/mzaf_700824976382945046.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/lentilula-feat-mabhiyoza/1729257372?i=1729258111"
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/ipiki/1729257372"
    },
    "format": "cd"
  },
  {
    "id": "early-morning-in-bizana-feat-trizer-fokza-joat",
    "title": "Early Morning in Bizana (feat. Trizer & Fokza Joat)",
    "kind": "Single",
    "group": "single",
    "released": "2023-11-30",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/59/69/cf/5969cfc7-9490-9bd6-b7d0-3bb000faa573/5063413274272_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "early-morning-in-bizana-feat-trizer-fokza-joat-9816",
        "title": "Early Morning in Bizana (feat. Trizer & Fokza Joat)",
        "length": "2:55",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/9b/92/8b/9b928b1b-1e95-bb3e-af34-33bdc41df889/mzaf_3391713269016159990.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/early-morning-in-bizana-feat-trizer-fokza-joat/1718119813?i=1718119816"
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/early-morning-in-bizana-feat-trizer-fokza-joat/1718119813?i=1718119816"
    },
    "format": "cassette"
  },
  {
    "id": "impatha-yasemakhaya",
    "title": "Impatha Yasemakhaya",
    "kind": "Album",
    "group": "feature",
    "released": "2023-08-27",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/61/2a/a7/612aa713-8b3d-224b-f4d8-5cde96cbcb54/5063346487503_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "look-at-me-now-feat-04our-raddix-hod-9552",
        "title": "Look at Me Now (feat. 04our & Raddix HOD)",
        "length": "2:53",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/8a/fc/e7/8afce70c-9a5d-770c-85c6-75fb896f5eef/mzaf_6620043778674375428.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/look-at-me-now-feat-04our-raddix-hod/1703889298?i=1703889552"
      }
    ],
    "artist": "MaBhiyoza",
    "links": {
      "apple": "https://music.apple.com/za/album/look-at-me-now-feat-04our-raddix-hod/1703889298"
    },
    "format": "cd"
  },
  {
    "id": "nkri-nkri-nkri-feat-thisguy-thatguy-04our",
    "title": "Nkri Nkri Nkri (feat. ThisGuy ThatGuy & 04our)",
    "kind": "Single",
    "group": "feature",
    "released": "2023-08-13",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/17/31/77/1731774e-66ec-e414-c869-0b3a0af09d23/5063346291209_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "nkri-nkri-nkri-feat-thisguy-thatguy-04our-6686",
        "title": "Nkri Nkri Nkri (feat. ThisGuy ThatGuy & 04our)",
        "length": "3:28",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/c3/8f/25/c38f2585-0354-67b8-a184-a3c6b3b99938/mzaf_13791414851226145873.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/nkri-nkri-nkri-feat-thisguy-thatguy-04our/1701476408?i=1701476686"
      }
    ],
    "artist": "MaBhiyoza",
    "links": {
      "apple": "https://music.apple.com/za/album/nkri-nkri-nkri-feat-thisguy-thatguy-04our/1701476408?i=1701476686"
    },
    "format": "cassette"
  },
  {
    "id": "awngeke",
    "title": "Aw'Ngeke",
    "kind": "Single",
    "group": "single",
    "released": "2023-06-08",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6e/5e/95/6e5e9509-d844-50a7-8a01-2c11f824f8d7/5063268660725_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "awngeke-6932",
        "title": "Aw'Ngeke",
        "length": "4:45",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/7f/25/e1/7f25e177-718e-ace3-6502-c64313fa2981/mzaf_6878176142141778060.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/awngeke/1690086917?i=1690086932"
      }
    ],
    "artist": "04our & Mthorsh",
    "links": {
      "apple": "https://music.apple.com/za/album/awngeke/1690086917?i=1690086932"
    },
    "format": "cassette"
  },
  {
    "id": "mandela-feat-meggz",
    "title": "Mandela (feat. Meggz)",
    "kind": "Single",
    "group": "single",
    "released": "2022-09-18",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/81/a7/3e/81a73e05-d1d1-1a61-fd23-344fd9fc1b81/5063072929490_cover.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "mandela-feat-meggz-8332",
        "title": "Mandela (feat. Meggz)",
        "length": "3:12",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/a0/a1/0e/a0a10eb7-3c80-30ec-1e1b-2afbc80323db/mzaf_11583325689498912864.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/mandela-feat-meggz/1644808329?i=1644808332"
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/mandela-feat-meggz/1644808329?i=1644808332"
    },
    "format": "cassette"
  },
  {
    "id": "take-over-ep",
    "title": "Take Over EP",
    "kind": "EP",
    "group": "feature",
    "released": "2022-08-17",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/b7/e2/1a/b7e21a43-f5bb-e797-41f3-c952fa910273/artwork.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "utshwala-feat-04our-8495",
        "title": "Utshwala (feat. 04Our)",
        "length": "3:59",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/cc/4e/18/cc4e180d-86b5-d872-0d1c-f0850a4ffb01/mzaf_8197321315948307535.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/utshwala-feat-04our/1634098487?i=1634098495"
      }
    ],
    "artist": "Mphemba prince",
    "links": {
      "apple": "https://music.apple.com/za/album/utshwala-feat-04our/1634098487"
    },
    "format": "cd"
  },
  {
    "id": "ashuu-feat-mthorsh-elhis-the-ninja",
    "title": "ASHUU (feat. Mthorsh & Elhis the Ninja)",
    "kind": "Single",
    "group": "single",
    "released": "2022-02-03",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/75/1a/6b/751a6b7f-55c2-d4db-f5c9-f933c3169241/artwork.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "ashuu-feat-mthorsh-elhis-the-ninja-9078",
        "title": "ASHUU (feat. Mthorsh & Elhis the Ninja)",
        "length": "3:58",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/60/54/ab/6054abc7-c505-582d-cc7f-8a0c51c9b4af/mzaf_6622331804398174520.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/ashuu-feat-mthorsh-elhis-the-ninja/1612709077?i=1612709078"
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/ashuu-feat-mthorsh-elhis-the-ninja/1612709077?i=1612709078"
    },
    "format": "cassette"
  },
  {
    "id": "brand-new-freestyle-feat-mthorsh",
    "title": "Brand New Freestyle (feat. Mthorsh)",
    "kind": "Single",
    "group": "single",
    "released": "2021-10-15",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b1/e9/18/b1e918b4-83fe-894a-c57f-c67014d6051a/artwork.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "brand-new-freestyle-feat-mthorsh-7241",
        "title": "Brand New Freestyle (feat. Mthorsh)",
        "length": "1:31",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/a8/ba/4f/a8ba4f11-95e7-490a-9538-5b368eee2472/mzaf_14376154042188325023.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/brand-new-freestyle-feat-mthorsh/1607527238?i=1607527241"
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/brand-new-freestyle-feat-mthorsh/1607527238?i=1607527241"
    },
    "format": "cassette"
  },
  {
    "id": "04our-04our",
    "title": "04Our-04Our",
    "kind": "Single",
    "group": "single",
    "released": "2021-06-17",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ca/c8/41/cac8418f-52c0-f93a-9258-faefa4313f66/artwork.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "04our-04our-0219",
        "title": "04Our-04Our",
        "length": "2:11",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/2a/c0/9b/2ac09bfb-5537-c2c9-6ad8-d21a970a3e10/mzaf_5262595276686388834.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/04our-04our/1573320218?i=1573320219"
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/04our-04our/1573320218?i=1573320219"
    },
    "format": "cassette"
  },
  {
    "id": "i-need-you-feat-megah-dj-trae",
    "title": "I Need You (feat. MeGaH & Dj Trae)",
    "kind": "Single",
    "group": "single",
    "released": "2021-01-29",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4d/ae/a8/4daea896-c579-b22a-786a-5c1280e5bd27/artwork.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "i-need-you-feat-megah-dj-trae-9049",
        "title": "I Need You (feat. MeGaH & Dj Trae)",
        "length": "3:00",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/d4/3b/f4/d43bf4f8-a706-b364-31e8-0cfa35f45a22/mzaf_5977914454820306132.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/i-need-you-feat-megah-dj-trae/1584399048?i=1584399049",
        "youtube": {
          "id": "STN5McFmLoI",
          "title": "04our - I Need You ft MeGaH & Dj Trae (Official Music Video)",
          "channel": "04OUR"
        }
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/i-need-you-feat-megah-dj-trae/1584399048?i=1584399049"
    },
    "format": "cassette"
  },
  {
    "id": "inkece",
    "title": "Inkece",
    "kind": "Single",
    "group": "single",
    "released": "2020-10-09",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/6e/43/b5/6e43b50a-f312-7cf6-090c-af3c6fb7f2e1/artwork.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "inkece-5835",
        "title": "Inkece",
        "length": "2:27",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5f/fd/38/5ffd38d0-b646-7920-2c19-06fb6c9fa221/mzaf_17021818628597313158.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/inkece/1532775833?i=1532775835",
        "youtube": {
          "id": "-725BzPRY8o",
          "title": "04OUR - Inkece (Official Audio)",
          "channel": "04OUR"
        }
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/inkece/1532775833?i=1532775835"
    },
    "format": "cassette"
  },
  {
    "id": "umthakathi-feat-yourfamousplaybee",
    "title": "Umthakathi (feat. Yourfamousplaybee)",
    "kind": "Single",
    "group": "single",
    "released": "2020-09-04",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/67/22/d2/6722d202-fb7c-cef9-f46c-a4b655bff7dc/artwork.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "umthakathi-feat-yourfamousplaybee-0674",
        "title": "Umthakathi (feat. Yourfamousplaybee)",
        "length": "3:22",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/5b/10/5c/5b105c85-18a8-3c87-1722-10458291f5fd/mzaf_16988753697338156268.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/umthakathi-feat-yourfamousplaybee/1526370673?i=1526370674",
        "youtube": {
          "id": "4XSw9p2e6YM",
          "title": "04OUR - Umthakathi (Promo & Lyrics Video)",
          "channel": "04OUR"
        }
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/umthakathi-feat-yourfamousplaybee/1526370673?i=1526370674"
    },
    "format": "cassette"
  },
  {
    "id": "no-one-else-feat-yourfamousplaybee",
    "title": "No One Else (feat. Yourfamousplaybee)",
    "kind": "Single",
    "group": "single",
    "released": "2019-10-10",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/e4/55/57/e455571f-0418-d764-d2c8-ae46efd8e909/artwork.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "no-one-else-feat-yourfamousplaybee-8252",
        "title": "No One Else (feat. Yourfamousplaybee)",
        "length": "2:50",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e6/09/1a/e6091a22-3cd4-08d0-7b3c-01abb250b989/mzaf_587506034637181971.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/no-one-else-feat-yourfamousplaybee/1516898251?i=1516898252"
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/no-one-else-feat-yourfamousplaybee/1516898251?i=1516898252"
    },
    "format": "cassette"
  },
  {
    "id": "4444-of-a-kind-ep",
    "title": "4444 of a Kind EP",
    "kind": "EP",
    "group": "ep",
    "released": "2019-09-08",
    "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/b4/b0/7e/b4b07e49-6427-895f-8111-234a7bb48aae/artwork.jpg/600x600bb.jpg",
    "tracks": [
      {
        "id": "back-stabbed-intro-8533",
        "title": "Back Stabbed (Intro)",
        "length": "3:25",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/43/ca/5f/43ca5fd8-2901-108b-1603-fd8a812f0138/mzaf_6049854395434461855.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/back-stabbed-intro/1503578532?i=1503578533"
      },
      {
        "id": "mad-money-8534",
        "title": "Mad Money",
        "length": "3:48",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/99/8a/17/998a1763-7982-d25c-e14e-eb0510101555/mzaf_7634926484053349523.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/mad-money/1503578532?i=1503578534",
        "youtube": {
          "id": "vALukyzCYQw",
          "title": "04OUR - Mad Money (Promo Video)",
          "channel": "04OUR"
        }
      },
      {
        "id": "blessings-feat-yourfamousplaybee-diactonic-8535",
        "title": "Blessings (feat. Yourfamousplaybee & Diactonic)",
        "length": "4:31",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/72/e0/2e/72e02ed2-9616-2cd4-5fd0-22cbcc807d85/mzaf_15800205029999922782.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/blessings-feat-yourfamousplaybee-diactonic/1503578532?i=1503578535"
      },
      {
        "id": "more-blessings-8536",
        "title": "More Blessings",
        "length": "2:34",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/82/4f/20/824f2050-667b-7ff8-57e9-dabb341b0823/mzaf_5471791566918587659.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/more-blessings/1503578532?i=1503578536"
      },
      {
        "id": "get-it-8537",
        "title": "Get It",
        "length": "3:14",
        "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/11/ae/bc/11aebc14-202c-f247-bf0a-a713a792d6db/mzaf_8367924117630020713.plus.aac.p.m4a",
        "appleMusicUrl": "https://music.apple.com/za/album/get-it/1503578532?i=1503578537"
      }
    ],
    "links": {
      "apple": "https://music.apple.com/za/album/back-stabbed-intro/1503578532"
    },
    "format": "cd"
  }
];

export const FEATURED = RELEASES.filter((r) => r.featured);

export const GROUPS: { id: Release["group"]; label: string }[] = [
  { id: "ep", label: "EPs & albums" },
  { id: "single", label: "Singles" },
  { id: "feature", label: "Features" },
];

export const releaseById = (id: string) => RELEASES.find((r) => r.id === id);

export type VideoItem = {
  id: string;
  title: string;
  length: string;
  channel: "04OUR" | "Tiny Films";
  kind: "Official visuals" | "Official video" | "Official audio" | "Promo" | "Freestyle";
};

/** "More from 04OUR" — official uploads that are not (yet) in the release list above. All ids oEmbed-verified. */
export const VIDEOS: VideoItem[] = [
  { id: "STN5McFmLoI", title: "I Need You ft MeGaH & Dj Trae", length: "3:06", channel: "04OUR", kind: "Official video" },
  { id: "UXbzkLtJvoc", title: "Killing Me Softly ft Emo & Sbopho", length: "4:32", channel: "Tiny Films", kind: "Official visuals" },
  { id: "Xx2l70VrTXY", title: "Isobho", length: "3:32", channel: "Tiny Films", kind: "Official visuals" },
  { id: "Vrnh_9SLdg4", title: "Number 10", length: "3:28", channel: "Tiny Films", kind: "Official visuals" },
  { id: "w6X6RpbFn_0", title: "Mshanam × Mabhiyoza", length: "3:20", channel: "Tiny Films", kind: "Official visuals" },
  { id: "Ze51kEr2P3s", title: "Equal Dividends × Louder T", length: "2:25", channel: "Tiny Films", kind: "Official visuals" },
  { id: "4XSw9p2e6YM", title: "Umthakathi ft YourFamousPlayBEE", length: "3:23", channel: "04OUR", kind: "Promo" },
  { id: "vALukyzCYQw", title: "Mad Money", length: "3:11", channel: "04OUR", kind: "Promo" },
  { id: "Ak_vrYwN4Ko", title: "On My Own", length: "2:51", channel: "04OUR", kind: "Official audio" },
  { id: "-725BzPRY8o", title: "Inkece", length: "2:28", channel: "04OUR", kind: "Official audio" },
  { id: "rnKewfmafMs", title: "Double Peace Freestyle (Snakes)", length: "2:21", channel: "04OUR", kind: "Freestyle" },
];
