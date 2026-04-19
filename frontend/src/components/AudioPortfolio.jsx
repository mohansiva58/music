import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { SONGS } from "../lib/content";

/* SonicMind-style showcase:
   - "HEAR WHAT ... AI CAN DO" headline split around centered portrait
   - Centered hero portrait (duotone red)
   - Big waveform audio player below (orange bars)
   - Previous / Next controls, 1/10 counter, 2:36 timecode
*/

function formatTime(sec) {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPortfolio() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const song = SONGS[index];
  const total = SONGS.length;

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrent(a.currentTime);
    const onLoaded = () => setDuration(a.duration || 0);
    const onEnded = () => {
      setPlaying(false);
      setCurrent(0);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("ended", onEnded);
    };
  }, [index]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const go = (dir) => {
    setPlaying(false);
    setCurrent(0);
    setIndex((i) => (i + dir + total) % total);
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;
  const barCount = 100;
  const bars = Array.from({ length: barCount });

  return (
    <section
      id="songs"
      data-testid="audio-portfolio-section"
      className="relative overflow-hidden bg-[#200303] bg-crimson px-6 pb-24 pt-24 md:px-10 md:pb-32 md:pt-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section label */}
        <div className="mb-10 font-archivo text-sm text-white/70 md:text-base">
          Showcase
        </div>

        {/* Big split headline around the portrait */}
        <div className="relative">
          <div className="relative grid grid-cols-12 items-end gap-4">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              data-testid="showcase-headline-left"
              className="font-display col-span-12 z-20 text-[12vw] font-black leading-[0.9] text-white/90 md:col-span-4 md:text-[4.2vw]"
            >
              HEAR WHAT
            </motion.h2>

            {/* Center portrait */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 flex justify-center md:col-span-4"
            >
              <div className="duotone-red-wrap relative h-[62vh] w-full max-w-md overflow-hidden md:h-[68vh]">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="duotone-red absolute inset-0 h-full w-full object-cover object-center"
                  key={song.id}
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              data-testid="showcase-headline-right"
              className="font-display col-span-12 z-20 text-right text-[12vw] font-black leading-[0.9] text-ember md:col-span-4 md:text-[4.2vw]"
            >
              AI CAN DO
            </motion.h2>
          </div>

          {/* Song title underneath */}
          <motion.div
            key={`title-${song.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 text-center"
          >
            <div className="font-archivo text-xs uppercase tracking-[0.35em] text-[#ff5722]">
              {song.occasion}
            </div>
            <div className="font-display mt-2 text-xl text-white md:text-2xl">
              {song.title}
            </div>
          </motion.div>

          {/* Prev / Next */}
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={() => go(-1)}
              data-testid="showcase-prev"
              className="group flex items-center gap-3 font-archivo text-sm uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Previous
            </button>
            <button
              onClick={() => go(1)}
              data-testid="showcase-next"
              className="group flex items-center gap-3 font-archivo text-sm uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white"
            >
              Next
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Waveform player row */}
          <div className="mt-8 flex items-center justify-between">
            <div className="font-display text-2xl text-white md:text-3xl">
              {formatTime(current)}
            </div>
            <div className="font-display text-2xl text-white md:text-3xl">
              {index + 1}/{total.toString().padStart(2, "0")}
            </div>
          </div>

          {/* Waveform */}
          <div className="relative mt-3 flex h-40 items-end justify-between gap-[2px] md:h-48">
            {/* Center play button */}
            <button
              onClick={toggle}
              data-testid="showcase-play-btn"
              aria-label={playing ? "Pause" : "Play"}
              className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a0303] text-white ring-1 ring-white/30 transition-transform hover:scale-110 md:h-24 md:w-24"
            >
              {playing ? (
                <Pause className="h-7 w-7 fill-white" />
              ) : (
                <Play className="h-7 w-7 translate-x-[2px] fill-white" />
              )}
            </button>

            {bars.map((_, i) => {
              const reached = (i / barCount) * 100 <= progress;
              const height =
                30 +
                Math.abs(Math.sin(i * 0.45 + index * 1.1)) * 70 +
                Math.abs(Math.sin(i * 0.13)) * 20;
              return (
                <span
                  key={i}
                  className={`flex-1 rounded-full transition-colors duration-200 ${
                    playing ? "wave-bar" : ""
                  }`}
                  style={{
                    height: `${Math.min(height, 100)}%`,
                    background: reached
                      ? "linear-gradient(to top,#ff5722,#ffb38a)"
                      : "rgba(255,255,255,0.18)",
                    animationDelay: `${(i % 12) * 0.05}s`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={song.audio} preload="none" />
    </section>
  );
}
