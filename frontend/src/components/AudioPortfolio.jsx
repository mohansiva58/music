import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { SONGS } from "../lib/content";

// Single shared audio controller via module state
let currentAudio = null;
let currentId = null;
const listeners = new Set();
const setGlobalPlaying = (id, audio) => {
  currentId = id;
  currentAudio = audio;
  listeners.forEach((fn) => fn(id));
};

function SongCard({ song, index }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onGlobal = (id) => {
      if (id !== song.id && playing) {
        audioRef.current?.pause();
        setPlaying(false);
      }
    };
    listeners.add(onGlobal);
    return () => {
      listeners.delete(onGlobal);
    };
  }, [song.id, playing]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => {
      if (a.duration) setProgress((a.currentTime / a.duration) * 100);
    };
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      if (currentId === song.id) setGlobalPlaying(null, null);
    } else {
      if (currentAudio && currentAudio !== a) {
        try {
          currentAudio.pause();
        } catch (e) {
          // ignore
        }
      }
      a.play()
        .then(() => {
          setPlaying(true);
          setGlobalPlaying(song.id, a);
        })
        .catch(() => {
          // autoplay/user gesture errors — ignore silently
        });
    }
  };

  // Waveform bars
  const barCount = 40;
  const bars = Array.from({ length: barCount });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-testid={`song-card-${song.id}`}
      className="group glass relative flex flex-col overflow-hidden rounded-3xl p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={song.cover}
          alt={song.title}
          className={`h-56 w-full object-cover transition duration-700 group-hover:scale-105 ${
            playing ? "scale-105" : ""
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Play button */}
        <button
          onClick={toggle}
          data-testid={`song-play-btn-${song.id}`}
          aria-label={playing ? "Pause" : "Play"}
          className="absolute bottom-4 left-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E2B365] text-black glow-btn"
        >
          {playing ? (
            <Pause className="h-5 w-5 fill-black" />
          ) : (
            <Play className="h-5 w-5 fill-black translate-x-[1px]" />
          )}
        </button>

        {/* Duration */}
        <div className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[11px] uppercase tracking-widest text-zinc-200 backdrop-blur-xl">
          {song.duration}
        </div>
      </div>

      {/* Meta */}
      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#E2B365]">
            {song.occasion}
          </div>
          <h3 className="font-display mt-1 text-xl font-medium text-white">
            {song.title}
          </h3>
        </div>
      </div>

      {/* Waveform */}
      <div className="mt-5 flex h-10 items-center gap-[2px]">
        {bars.map((_, i) => {
          const barActive = playing && (i / barCount) * 100 < progress;
          const reached = (i / barCount) * 100 <= progress;
          return (
            <span
              key={i}
              className={`flex-1 rounded-full transition-all duration-200 ${
                reached ? "bg-[#E2B365]" : "bg-white/15"
              } ${playing ? "wave-bar" : ""}`}
              style={{
                height: `${25 + Math.abs(Math.sin(i * 0.6)) * 70}%`,
                animationDelay: `${(i % 10) * 0.08}s`,
                opacity: barActive ? 1 : 0.8,
              }}
            />
          );
        })}
      </div>

      <audio
        ref={audioRef}
        src={song.audio}
        preload="none"
        data-testid={`song-audio-${song.id}`}
      />
    </motion.div>
  );
}

export default function AudioPortfolio() {
  return (
    <section
      id="songs"
      data-testid="audio-portfolio-section"
      className="relative px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#E2B365]">
              The catalogue
            </span>
            <h2
              className="font-display mt-4 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl"
              data-testid="portfolio-headline"
            >
              Real songs. <br />
              <span className="font-script text-gold-gradient">Real people.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 md:text-base">
            A selection from the 150+ songs written for birthdays,
            anniversaries, weddings, long-distance love and everything in
            between. Press play — only one track plays at a time.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SONGS.map((s, i) => (
            <SongCard key={s.id} song={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
