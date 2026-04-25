import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Pause, Search, SkipBack, SkipForward, Music2 } from "lucide-react";
import { waLink } from "../lib/content";

// ─── Tracks ────────────────────────────────────────────────────────────────────
const tracks = [
  { title: "Golden Hour", artist: "Memory Session", progress: 28 },
  { title: "Perfect",     artist: "Story Cut",      progress: 74 },
  { title: "Count On Me", artist: "Soul Draft",     progress: 42 },
];

const BAR_COUNT = 28;

// ─── Waveform bar ──────────────────────────────────────────────────────────────
function WaveBar({ i, active }) {
  const [height] = useState(() => 20 + Math.random() * 80);
  return (
    <div
      className="rounded-full"
      style={{
        width: 3,
        flexShrink: 0,
        height: `${height}%`,
        background: active
          ? `rgba(255,185,128,${0.5 + Math.random() * 0.45})`
          : "rgba(255,255,255,0.15)",
        animation: active
          ? `waveAnim ${0.6 + Math.random() * 0.8}s ease-in-out infinite alternate`
          : "none",
        animationDelay: `${i * 0.04}s`,
      }}
    />
  );
}

// ─── Mosaic column data ────────────────────────────────────────────────────────
// Each column = { images: [{ src, alt, height }] }
// Columns are bottom-aligned (alignItems: flex-end) → ascending staircase left→right
const mosaicColumns = [
  // Col 1 — shortest, 1 image
  {
    images: [
      { src: "/content.png", alt: "Couple smiling", h: 240 },
    ],
  },
  // Col 2 — 2 images
  {
    images: [
      { src: "/image.png",        alt: "Wedding moment",   h: 176 },
      { src: "/image%20copy.png", alt: "Family hiking",    h: 176 },
    ],
  },
  // Col 3 — 2 images, taller
  {
    images: [
      { src: "/image%20copy%202.png", alt: "Graduation",        h: 212 },
      { src: "/contenqt.png",         alt: "Friends campfire",  h: 212 },
    ],
  },
  // Col 4 — 2 images, taller still
  {
    images: [
      { src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80", alt: "Studio mic",        h: 250 },
      { src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=60", alt: "Musician",          h: 250 },
    ],
  },
  // Col 5 — tallest single image
  {
    images: [
      { src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80", alt: "Singer on stage",   h: 520 },
    ],
  },
  // Col 6 — 2 images, steps back down slightly
  {
    images: [
      { src: "https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=600&q=80", alt: "Concert lights",    h: 290 },
      { src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80", alt: "Studio console",    h: 224 },
    ],
  },
  // Col 7 — 3 images stacked (rightmost)
  {
    images: [
      { src: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80", alt: "Guitar detail",     h: 164 },
      { src: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=600&auto=format&fit=crop&q=60", alt: "Music crowd",       h: 164 },
      { src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=60", alt: "Concert crowd",     h: 164 },
    ],
  },
];

// ─── Main component ────────────────────────────────────────────────────────────
export default function MelodyFinder() {
  const ref            = useRef(null);
  const prefersReduced = useReducedMotion();
  const [activeTrack, setActiveTrack] = useState(1);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-30, 70]),
    { stiffness: 140, damping: 45, mass: 0.3 }
  );

  return (
    <section
      id="melody-finder"
      ref={ref}
      data-testid="melody-finder-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-transparent"
    >
      <style>{`
        @keyframes waveAnim {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>

      {/* ── Parallax bg ── */}
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

      <div className="relative z-10 w-full px-6 py-16 md:px-16 md:py-32">

        {/* ══════════════════════════════════════════════════════════════
            HERO ROW — text anchored bottom-left, mosaic fills right
        ══════════════════════════════════════════════════════════════ */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "flex-end", gap: "56px", minHeight: "680px", width: "100%" }}
        >

          {/* Text block — bottom-aligned with the mosaic */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
            style={{ flexShrink: 0, width: "430px", paddingBottom: "10px" }}
          >
            <span className="font-archivo text-[11px] uppercase tracking-[0.4em] block mb-5" style={{ color: "#ff5722" }}>
              Chapter 03 — Find Your Melody
            </span>
            <h2
              className="font-archivo font-black leading-[0.9] text-white mb-5"
              style={{ fontSize: "clamp(4.4rem,7.3vw,7.6rem)", letterSpacing: "-0.01em" }}
            >
              Memory<br />Melody.
            </h2>
            <p
              className="font-archivo text-sm leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              Discover the unique soundtrack to your most cherished moments,
              arranged with the same care as the memory itself.
            </p>
            <a
              href={waLink("Hi, I want to find the perfect melody for my memories.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#fff83d] px-5 py-3 font-archivo text-xs font-black text-black transition-transform duration-300 hover:scale-105"
            >
              Find Your Melody
            </a>
          </motion.div>

          {/* ── Ascending staircase mosaic ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",   /* bottom-align all columns → staircase ascends left→right */
              gap: "4px",
              minWidth: 0,
            }}
          >
            {mosaicColumns.map((col, ci) => (
              <div
                key={ci}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  minWidth: 0,
                }}
              >
                {col.images.map((img, ii) => (
                  <motion.img
                    key={ii}
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.07 + ii * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.03, zIndex: 10, transition: { duration: 0.25 } }}
                    style={{
                      width: "100%",
                      height: img.h,
                      objectFit: "cover",
                      borderRadius: "10px",
                      display: "block",
                      filter: "saturate(1.06) contrast(1.04)",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Mobile hero ── */}
        <div className="md:hidden flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="font-archivo text-[11px] uppercase tracking-[0.4em] block mb-4" style={{ color: "#ff5722" }}>
              Chapter 03 — Find Your Melody
            </span>
            <h2
              className="font-archivo font-black leading-[0.9] text-white mb-4"
              style={{ fontSize: "clamp(2.8rem,10vw,4rem)", letterSpacing: "-0.01em" }}
            >
              Memory<br />Melody.
            </h2>
            <p className="font-archivo text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.72)" }}>
              Discover the unique soundtrack to your most cherished moments.
            </p>
            <a
              href={waLink("Hi, I want to find the perfect melody for my memories.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#fff83d] px-5 py-3 font-archivo text-xs font-black text-black"
            >
              Find Your Melody
            </a>
          </motion.div>

          {/* Mobile: mini ascending staircase (4 cols) */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "3px" }}>
            {[
              { src: "/content.png",           h: 100 },
              { src: "/image.png",              h: 140 },
              { src: "/image%20copy.png",       h: 180 },
              { src: "/image%20copy%202.png",   h: 220 },
            ].map((img, i) => (
              <div key={i} style={{ flex: 1 }}>
                <img
                  src={img.src}
                  alt=""
                  loading="lazy"
                  style={{ width: "100%", height: img.h, objectFit: "cover", borderRadius: "8px", display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MUSIC PLAYER
        ══════════════════════════════════════════════════════════════ */}
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
                  background: activeTrack === i ? "rgba(255,185,128,0.12)" : "rgba(255,255,255,0.04)",
                  border:     activeTrack === i ? "1px solid rgba(255,185,128,0.25)" : "1px solid transparent",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: 32, height: 32,
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

                {/* Progress */}
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
          <div
            className="mt-3 flex items-center justify-center gap-6 rounded-full py-3"
            style={{ background: "rgba(0,0,0,0.35)" }}
          >
            <button className="transition-opacity hover:opacity-100 opacity-50">
              <SkipBack className="h-5 w-5 text-white" />
            </button>
            <button
              className="flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
              style={{ width: 44, height: 44, background: "linear-gradient(135deg,#ff5722,#ffb980)" }}
            >
              <Pause className="h-5 w-5 text-white" />
            </button>
            <button className="transition-opacity hover:opacity-100 opacity-50">
              <SkipForward className="h-5 w-5 text-white" />
            </button>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            BOTTOM CTA
        ══════════════════════════════════════════════════════════════ */}
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
