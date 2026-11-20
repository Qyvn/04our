import { VIDEOS } from "@/data/songs";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";

export function VideosSection() {
  return (
    <section id="videos" className="band-bone">
      <div className="wrap">
        <header className="section-head">
          <p className="kicker kicker-red">03 · Videos</p>
          <h2 className="h-xl">More from 04OUR.</h2>
          <p className="lede">
            Official visuals, promos and audio uploads — straight from 04OUR’s channel and Tiny Films.
          </p>
        </header>
        <ul className="video-grid">
          {VIDEOS.map((v) => (
            <li key={v.id} className="video-card">
              <YouTubeEmbed id={v.id} title={v.title} />
              <div className="video-meta">
                <h3>{v.title}</h3>
                <p>
                  {v.kind} · {v.length} · {v.channel}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
