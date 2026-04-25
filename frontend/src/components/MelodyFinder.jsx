import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Pause, Search, SkipBack, SkipForward, Music2 } from "lucide-react";
import { waLink } from "../lib/content";

const memoryFrames = [
  {
    src: "/content.png",
    alt: "Couple smiling outdoors",
    className: "left-[3%] top-[6%] h-[36%] w-[22%]",
    rotate: -2.8,
    delay: 0,
    caption: "Forever yours",
  },
  {
    src: "/image.png",
    alt: "Wedding memory moment",
    className: "left-[27%] top-[1%] h-[54%] w-[36%]",
    rotate: 0.4,
    delay: 0.08,
    caption: "The big day",
  },
  {
    src: "/image%20copy.png",
    alt: "Family hiking memory",
    className: "right-[4%] top-[1%] h-[38%] w-[25%]",
    rotate: 2.2,
    delay: 0.16,
    caption: "Peak moments",
  },
  {
    src: "/image%20copy%202.png",
    alt: "Graduation celebration",
    className: "left-[16%] top-[58%] h-[32%] w-[24%]",
    rotate: 0.9,
    delay: 0.24,
    caption: "Achievement unlocked",
  },
  {
    src: "/contenqt.png",
    alt: "Friends around campfire",
    className: "right-[13%] top-[56%] h-[34%] w-[24%]",
    rotate: -1.6,
    delay: 0.32,
    caption: "Warmth & laughter",
  },
];

const tracks = [
  { title: "Golden Hour", artist: "Memory Session", progress: 28 },
  { title: "Perfect", artist: "Story Cut", progress: 74, active: true },
  { title: "Count On Me", artist: "Soul Draft", progress: 42 },
];

const BAR_COUNT = 28;

function WaveBar({ i, active }) {
  const [heights] = useState(() =>
    Array.from({ length: BAR_COUNT }, () => 20 + Math.random() * 80)
  );
  return (
    <div
      className="rounded-full"
      style={{
        width: 3,
        height: `${heights[i % heights.length]}%`,
        background: active
          ? `rgba(255,185,128,${0.5 + Math.random() * 0.5})`
          : "rgba(255,255,255,0.15)",
        animation: active ? `wave ${0.6 + Math.random() * 0.8}s ease-in-out infinite alternate` : "none",
        animationDelay: `${i * 0.04}s`,
      }}
    />
  );
}

export default function MelodyFinder() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const [activeTrack, setActiveTrack] = useState(1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-30, 70]),
    { stiffness: 140, damping: 45, mass: 0.3 }
  );

  // Micro-keyframe index (0-150 frames per scroll)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  // Frame-by-frame opacity fluctuation for visual feedback
  const framePulse = useTransform(frameIndex, (idx) => {
    return 0.85 + Math.sin(idx * 0.15) * 0.15;
  });

  const frame0Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -20]), { stiffness: 140, damping: 45, mass: 0.3 });
  const frame1Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -30]), { stiffness: 140, damping: 45, mass: 0.3 });
  const frame2Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -12]), { stiffness: 140, damping: 45, mass: 0.3 });
  const frame3Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -40]), { stiffness: 60, damping: 25 });
  const frame4Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -25]), { stiffness: 60, damping: 25 });
  const frameYs = [frame0Y, frame1Y, frame2Y, frame3Y, frame4Y];

  return (
    <section
      id="melody-finder"
      ref={ref}
      data-testid="melody-finder-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-transparent"
    >
      <style>{`
        @keyframes wave {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
        @keyframes float0 { 0%,100%{transform:translateY(0px) rotate(-2.8deg)} 50%{transform:translateY(-8px) rotate(-2.8deg)} }
        @keyframes float1 { 0%,100%{transform:translateY(0px) rotate(0.4deg)}  50%{transform:translateY(-12px) rotate(0.4deg)} }
        @keyframes float2 { 0%,100%{transform:translateY(0px) rotate(2.2deg)}  50%{transform:translateY(-6px) rotate(2.2deg)} }
        @keyframes float3 { 0%,100%{transform:translateY(0px) rotate(0.9deg)}  50%{transform:translateY(-10px) rotate(0.9deg)} }
        @keyframes float4 { 0%,100%{transform:translateY(0px) rotate(-1.6deg)} 50%{transform:translateY(-7px) rotate(-1.6deg)} }
        @keyframes melodyConnectorFlow {
          from { stroke-dashoffset: 34; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes melodyConnectorPulse {
          0%, 100% { opacity: 0.55; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.08); }
        }
      `}</style>

      {/* Parallax bg */}
      <motion.div
        style={prefersReduced ? undefined : { y: bgY }}
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=2000&q=60"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#080202]/40 via-transparent to-[#080202]/60" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_52%_25%,rgba(255,153,96,0.1)_0%,transparent_60%)]" />

      <div className="relative z-10 w-full px-8 py-20 md:px-16 md:py-28">

        {/* Header with frame indicator */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl relative"
        >
          {/* Frame counter display */}
          <motion.div
            style={{ opacity: framePulse }}
            className="absolute -top-8 right-0 text-[9px] font-mono text-[#ff5722]/50"
          >
            FRAME <motion.span>{frameIndex}</motion.span>
          </motion.div>
          <span className="font-archivo text-[11px] uppercase tracking-[0.4em]" style={{ color: "#ff5722" }}>
            Chapter 03 — Find Your Melody
          </span>
          <h2
            className="font-display mt-6 font-black leading-[0.9] text-white"
            style={{ fontSize: "clamp(2.8rem,7vw,6.5rem)", letterSpacing: "-0.03em" }}
          >
            EVERY MEMORY
            <br />
            <span className="text-ember">HAS A MELODY.</span>
          </h2>
          <p className="font-archivo mt-6 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>
            Discover the unique soundtrack to your most cherished moments, arranged with the same care as the memory itself.
          </p>
        </motion.div>

        {/* Memory board with frame-by-frame feedback */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-14 w-full overflow-visible"
          style={{
            ...(prefersReduced ? {} : { opacity: framePulse }),
            height: "clamp(320px, 48vw, 560px)",
            borderRadius: "2rem",
            background: "rgba(15,4,4,0.30)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Inner radial glow */}
          <div className="absolute inset-0 pointer-events-none rounded-[2rem]"
            style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(255,153,96,0.10) 0%, transparent 60%)" }}
          />

          {/* Flow line connecting the middle memory to the next memory */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[6] h-full w-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="melody-connector-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff5722" stopOpacity="0.15" />
                <stop offset="42%" stopColor="#ffb980" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ff5722" stopOpacity="0.55" />
              </linearGradient>
              <filter id="melody-connector-glow" x="-20%" y="-80%" width="140%" height="260%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 60 5 C 63 1.5, 68 1.5, 72 5"
              fill="none"
              stroke="rgba(255,185,128,0.16)"
              strokeWidth="1.15"
              strokeLinecap="round"
            />
            <path
              d="M 60 5 C 63 1.5, 68 1.5, 72 5"
              fill="none"
              stroke="url(#melody-connector-gradient)"
              strokeWidth="0.72"
              strokeLinecap="round"
              strokeDasharray="7 5"
              filter="url(#melody-connector-glow)"
              style={{
                animation: prefersReduced ? "none" : "melodyConnectorFlow 1.7s linear infinite",
              }}
            />
            <circle
              cx="60"
              cy="5"
              r="0.8"
              fill="#ffb980"
              style={{
                transformOrigin: "60px 5px",
                filter: "drop-shadow(0 0 7px rgba(255,185,128,0.95))",
                animation: prefersReduced ? "none" : "melodyConnectorPulse 1.8s ease-in-out infinite",
              }}
            />
            <circle
              cx="72"
              cy="5"
              r="0.8"
              fill="#ffb980"
              style={{
                transformOrigin: "72px 5px",
                filter: "drop-shadow(0 0 7px rgba(255,185,128,0.95))",
                animation: prefersReduced ? "none" : "melodyConnectorPulse 1.8s ease-in-out infinite 0.45s",
              }}
            />
          </svg>

          {memoryFrames.map((frame, i) => (
            <motion.figure
              key={frame.alt}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: frame.delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.06, zIndex: 30, transition: { duration: 0.3 } }}
              className={`absolute cursor-pointer ${frame.className}`}
              style={{
                animation: prefersReduced ? "none" : `float${i} ${3.5 + i * 0.4}s ease-in-out infinite`,
                zIndex: i === 1 ? 20 : 10,
              }}
            >
              {/* Polaroid frame */}
              <div
                className="h-full w-full flex flex-col"
                style={{
                  background: "#f5efe6",
                  padding: "6px 6px 28px 6px",
                  boxShadow: "0 24px 48px -12px rgba(0,0,0,0.75), 0 4px 12px rgba(0,0,0,0.4)",
                  borderRadius: "2px",
                }}
              >
                <div className="flex-1 overflow-hidden bg-black/10">
                  <img
                    src={frame.src}
                    alt={frame.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{ filter: "sepia(0.15) contrast(1.05)" }}
                  />
                </div>
                <p
                  className="mt-1 text-center font-serif italic leading-none"
                  style={{ fontSize: "clamp(7px,1vw,11px)", color: "#4a3728", opacity: 0.8 }}
                >
                  {frame.caption}
                </p>
              </div>
            </motion.figure>
          ))}
        </motion.div>

        {/* Player */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, delay: 0.18 }}
          className="mt-10 w-full"
          style={{
            borderRadius: "1.5rem",
            background: "rgba(12,3,3,0.60)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "1.25rem",
          }}
        >
          {/* Track list */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {tracks.map((track, i) => (
              <button
                key={track.title}
                onClick={() => setActiveTrack(i)}
                className="text-left transition-all duration-300"
                style={{
                  borderRadius: "1rem",
                  padding: "1rem 1.25rem",
                  background: activeTrack === i
                    ? "rgba(255,185,128,0.12)"
                    : "rgba(255,255,255,0.04)",
                  border: activeTrack === i
                    ? "1px solid rgba(255,185,128,0.25)"
                    : "1px solid transparent",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: 32,
                      height: 32,
                      background: activeTrack === i ? "rgba(255,185,128,0.18)" : "rgba(255,255,255,0.06)",
                    }}
                  >
                    <Music2
                      className="h-3.5 w-3.5"
                      style={{ color: activeTrack === i ? "#ffb980" : "rgba(255,255,255,0.4)" }}
                    />
                  </div>
                  <div>
                    <p className="font-archivo text-sm font-semibold" style={{ color: activeTrack === i ? "#fff" : "rgba(255,255,255,0.7)" }}>
                      {track.title}
                    </p>
                    <p className="font-archivo text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {track.artist}
                    </p>
                  </div>
                </div>

                {/* Waveform */}
                <div className="flex items-end gap-[2px]" style={{ height: 28 }}>
                  {Array.from({ length: BAR_COUNT }).map((_, bi) => (
                    <WaveBar key={bi} i={bi} active={activeTrack === i} />
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-2 h-px rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${track.progress}%`,
                      background: activeTrack === i
                        ? "linear-gradient(90deg,#ff5722,#ffb980)"
                        : "rgba(255,255,255,0.25)",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Transport controls */}
          <div className="mt-3 flex items-center justify-center gap-6 rounded-full py-3" style={{ background: "rgba(0,0,0,0.35)" }}>
            <button className="transition-opacity hover:opacity-100 opacity-50">
              <SkipBack className="h-5 w-5 text-white" />
            </button>
            <button
              className="flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
              style={{
                width: 44,
                height: 44,
                background: "linear-gradient(135deg,#ff5722,#ffb980)",
              }}
            >
              <Pause className="h-5 w-5 text-white" />
            </button>
            <button className="transition-opacity hover:opacity-100 opacity-50">
              <SkipForward className="h-5 w-5 text-white" />
            </button>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="mt-10 text-center"
        >
          <a
            href={waLink("Hi, I want to find the perfect melody for my memories.")}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="melody-finder-cta"
            className="glow-orange inline-flex items-center gap-3 rounded-full font-archivo text-sm font-semibold uppercase tracking-[0.16em] md:text-base transition-all duration-300 hover:scale-105"
            style={{
              padding: "1rem 2.5rem",
              background: "rgba(0,0,0,0.50)",
              border: "1px solid rgba(255,185,128,0.3)",
              color: "#ffcfaa",
            }}
          >
            <Search className="h-4 w-4" />
            Find Your Melody
          </a>
          <p className="font-archivo mt-4 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            Scan your photo. Find the song.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
