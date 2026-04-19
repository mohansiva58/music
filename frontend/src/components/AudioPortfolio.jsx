import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { SONGS } from "../lib/content";

function formatTime(sec) {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPortfolio() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const portraitScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1.1, 0.95]),
    { stiffness: 100, damping: 30 }
  );
  const ghostY = useSpring(
    useTransform(scrollYProgress, [0, 1], [100, -100]),
    { stiffness: 100, damping: 30 }
  );

  const progress = duration > 0 ? (current / duration) * 100 : 0;
  const barCount = 120;
  const bars = Array.from({ length: barCount });

  return (
    <section
      id="songs"
      ref={ref}
      data-testid="audio-portfolio-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#200303]"
    >
      {/* Ghost text drifting */}
      <motion.div
        aria-hidden
        style={prefersReduced ? undefined : { y: ghostY }}
        className="pointer-events-none absolute left-1/2 top-[28%] z-10 hidden -translate-x-1/2 md:block"
      >
        <div className="ghost-text text-[20vw] leading-none opacity-40">
          SHOWCASE
        </div>
      </motion.div>

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col px-6 pb-20 pt-28 md:px-10 md:pt-32">
        {/* Chapter label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-archivo text-[11px] uppercase tracking-[0.4em] text-[#ff5722]"
        >
          Chapter 03 — Showcase
        </motion.span>

        {/* Headline row with centered portrait */}
        <div className="relative mt-10 flex-1">
          <div className="relative grid grid-cols-12 items-center gap-4">
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9 }}
              data-testid="showcase-headline-left"
              className="font-display col-span-12 z-20 text-[12vw] font-black leading-[0.9] text-white/95 md:col-span-4 md:text-[4.5vw]"
            >
              HEAR
              <br />
              WHAT
            </motion.h2>

            <motion.div
              style={prefersReduced ? undefined : { scale: portraitScale }}
              className="col-span-12 flex justify-center md:col-span-4"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.08 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="duotone-red-wrap relative h-[56vh] w-full max-w-md overflow-hidden md:h-[68vh]"
                >
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="duotone-red absolute inset-0 h-full w-full object-cover object-[center_20%]"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9 }}
              data-testid="showcase-headline-right"
              className="font-display col-span-12 z-20 text-right text-[12vw] font-black leading-[0.9] text-ember md:col-span-4 md:text-[4.5vw]"
            >
              AI
              <br />
              CAN DO.
            </motion.h2>
          </div>

          {/* Song title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${song.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-8 text-center"
            >
              <div className="font-archivo text-xs uppercase tracking-[0.4em] text-[#ff5722]">
                {song.occasion}
              </div>
              <div className="font-display mt-2 text-2xl font-black text-white md:text-3xl">
                {song.title}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={() => go(-1)}
            data-testid="showcase-prev"
            className="group flex items-center gap-3 font-archivo text-sm uppercase tracking-[0.3em] text-white/75 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Previous
          </button>
          <button
            onClick={() => go(1)}
            data-testid="showcase-next"
            className="group flex items-center gap-3 font-archivo text-sm uppercase tracking-[0.3em] text-white/75 transition-colors hover:text-white"
          >
            Next
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Timecode row */}
        <div className="mt-6 flex items-center justify-between">
          <div className="font-display text-3xl font-black text-white md:text-4xl">
            {formatTime(current)}
          </div>
          <div className="font-display text-3xl font-black text-white md:text-4xl">
            {index + 1}/{total.toString().padStart(2, "0")}
          </div>
        </div>

        {/* Waveform player */}
        <div className="relative mt-3 flex h-32 items-end justify-between gap-[2px] md:h-40">
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

      <audio ref={audioRef} src={song.audio} preload="none" />
    </section>
  );
}
