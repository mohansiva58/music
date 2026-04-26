import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { Pause, Search, SkipBack, SkipForward, Music2 } from "lucide-react";
import { TESTIMONIALS, waLink } from "../lib/content";

const testimonials = Array.isArray(TESTIMONIALS) ? TESTIMONIALS : [];

// ─── Tracks ────────────────────────────────────────────────────────────────────
const tracks = [
  { title: "Golden Hour", artist: "Memory Session", progress: 28 },
  { title: "Perfect", artist: "Story Cut", progress: 74 },
  { title: "Count On Me", artist: "Soul Draft", progress: 42 },
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

// ─── Arc card definitions ──────────────────────────────────────────────────────
// Responsive fractions: wFrac/hFrac scale with container
const ARC_CARD_DEFS = [
  { src: "/content.png", alt: "Couple smiling", angleDeg: -92, rotateDeg: -44, wFrac: 0.195, hFrac: 0.240 },
  { src: "/image.png", alt: "Wedding moment", angleDeg: -70, rotateDeg: -30, wFrac: 0.230, hFrac: 0.285 },
  { src: "/image%20copy.png", alt: "Family hiking", angleDeg: -48, rotateDeg: -16, wFrac: 0.255, hFrac: 0.315 },
  { src: "/image%20copy%202.png", alt: "Graduation", angleDeg: -24, rotateDeg: -5, wFrac: 0.275, hFrac: 0.342 },
  { src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80", alt: "Studio mic", angleDeg: 24, rotateDeg: 5, wFrac: 0.275, hFrac: 0.342 },
  { src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80", alt: "Singer on stage", angleDeg: 48, rotateDeg: 16, wFrac: 0.255, hFrac: 0.315 },
  { src: "https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=600&q=80", alt: "Concert lights", angleDeg: 70, rotateDeg: 30, wFrac: 0.230, hFrac: 0.285 },
  { src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=60", alt: "Concert crowd", angleDeg: 92, rotateDeg: 44, wFrac: 0.195, hFrac: 0.240 },
];

function computeArcCards(containerW, containerH) {
  const R = containerW * 0.42; // Tighter radius for viewport fit
  const CY = containerH * 0.95; // Center positioned to show arc top

  return ARC_CARD_DEFS.map((def) => {
    const rad = (def.angleDeg * Math.PI) / 180;
    const x = R * Math.sin(rad);
    const y = -R * Math.cos(rad);
    const w = R * def.wFrac;
    const h = R * def.hFrac;
    const left = containerW / 2 + x - w / 2;
    const top = CY + y - h / 2;
    return { ...def, left, top, w, h };
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function MelodyFinder() {
  const ref = useRef(null);
  const arcRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [activeTrack, setActiveTrack] = useState(1);
  const [arcCards, setArcCards] = useState([]);
  const [arcDimensions, setArcDimensions] = useState({ w: 0, h: 0 });

  // Responsive arc calculation
  useEffect(() => {
    function recalc() {
      const el = arcRef.current;
      if (!el) return;
      const w = el.offsetWidth;
      const h = Math.min(window.innerHeight * 0.65, Math.max(420, w * 0.68));
      setArcDimensions({ w, h });
      setArcCards(computeArcCards(w, h));
    }
    recalc();
    const ro = new ResizeObserver(recalc);
    if (arcRef.current) ro.observe(arcRef.current);
    window.addEventListener("resize", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalc);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-15, 25]), // Reduced parallax for viewport fit
    { stiffness: 140, damping: 45, mass: 0.3 }
  );

  return (
    <section
      id="melody-finder"
      ref={ref}
      data-testid="melody-finder-section"
      className="relative h-[100svh] w-full overflow-hidden bg-[#080202]"
    >
      <style>{`
        @keyframes waveAnim {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
        .arc-card {
          will-change: transform;
          transform-origin: center;
          transition: filter 0.3s ease;
        }
        .arc-card:hover {
          filter: saturate(1.15) brightness(1.05);
        }
      `}</style>

      {/* ── Subtle parallax bg ── */}
      <motion.div
        style={prefersReduced ? undefined : { y: bgY }}
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=2000&q=60"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
        />
      </motion.div>
      
      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#080202]/50 via-transparent to-[#080202]/80" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,153,96,0.08)_0%,transparent_70%)]" />

      {/* ══════════════════════════════════════════════════════════════
          DESKTOP — Viewport-fitted Arc Gallery (Framify style)
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 hidden md:flex flex-col h-full w-full">
        
        {/* Arc Gallery Container — constrained height */}
        <div
          ref={arcRef}
          className="relative w-full flex-shrink-0"
          style={{ height: arcDimensions.h || "65vh" }}
        >
          <AnimatePresence>
            {arcCards.map((card, i) => {
              const isCenter = Math.abs(card.angleDeg) < 30;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.55, 
                    delay: i * 0.05, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  whileHover={{ 
                    scale: 1.04, 
                    zIndex: 50,
                    transition: { duration: 0.25 }
                  }}
                  className="arc-card absolute cursor-pointer"
                  style={{
                    width: card.w,
                    height: card.h,
                    left: card.left,
                    top: card.top,
                    borderRadius: "clamp(12px, 1.5vw, 24px)",
                    overflow: "hidden",
                    boxShadow: isCenter 
                      ? "0 12px 60px rgba(0,0,0,0.45), 0 4px 20px rgba(255,185,128,0.15)"
                      : "0 6px 30px rgba(0,0,0,0.35)",
                    transform: `rotate(${card.rotateDeg}deg)`,
                    border: isCenter ? "1px solid rgba(255,185,128,0.25)" : "1px solid rgba(255,255,255,0.08)",
                    zIndex: isCenter ? 40 : 20 - Math.abs(i - 3.5),
                  }}
                >
                  <img
                    src={card.src}
                    alt={card.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle gradient overlay on cards */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Centered Text Block — Framify editorial style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30 pointer-events-none"
            style={{ width: "clamp(280px, 32vw, 480px)" }}
          >
            <span
              className="font-archivo text-[10px] uppercase tracking-[0.42em] block mb-3"
              style={{ color: "#ff5722" }}
            >
              Chapter 03 — Find Your Melody
            </span>
            <h2
              className="font-display font-black leading-[0.88] text-white mb-4"
              style={{ 
                fontSize: "clamp(3.2rem, 6.8vw, 6.5rem)",
                letterSpacing: "-0.02em",
                textShadow: "0 4px 30px rgba(0,0,0,0.5)"
              }}
            >
              Memory<br />Melody.
            </h2>
            <p
              className="font-archivo text-sm leading-relaxed mx-auto"
              style={{ 
                color: "rgba(255,255,255,0.75)", 
                maxWidth: "340px",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)"
              }}
            >
              Discover the unique soundtrack to your most cherished moments,
              arranged with the same care as the memory itself.
            </p>
          </motion.div>
        </div>

        {/* Player + CTA — Bottom panel (fits remaining viewport) */}
        <div className="flex-1 flex flex-col justify-end px-4 pb-4 md:px-8 md:pb-6">
          
          {/* ── Music Player Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="w-full max-w-5xl mx-auto"
            style={{
              borderRadius: "1.25rem",
              background: "rgba(18,6,6,0.72)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
              padding: "1rem 1.25rem",
            }}
          >
            {/* Track List */}
            <div className="grid grid-cols-3 gap-2.5 mb-3">
              {tracks.map((track, i) => (
                <button
                  key={track.title}
                  onClick={() => { setActiveTrack(i); }}
                  className="text-left transition-all duration-300 group"
                  style={{
                    borderRadius: "0.875rem",
                    padding: "0.875rem 1rem",
                    background: activeTrack === i 
                      ? "rgba(255,185,128,0.10)" 
                      : "rgba(255,255,255,0.03)",
                    border: activeTrack === i 
                      ? "1px solid rgba(255,185,128,0.22)" 
                      : "1px solid transparent",
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div
                      className="flex items-center justify-center rounded-full flex-shrink-0 transition-colors"
                      style={{
                        width: 28, height: 28,
                        background: activeTrack === i 
                          ? "rgba(255,185,128,0.15)" 
                          : "rgba(255,255,255,0.05)",
                      }}
                    >
                      <Music2
                        className="h-3 w-3"
                        style={{ 
                          color: activeTrack === i ? "#ffb980" : "rgba(255,255,255,0.45)" 
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p 
                        className="font-archivo text-[11px] font-semibold truncate" 
                        style={{ 
                          color: activeTrack === i ? "#fff" : "rgba(255,255,255,0.72)" 
                        }}
                      >
                        {track.title}
                      </p>
                      <p 
                        className="font-archivo text-[10px] truncate" 
                        style={{ color: "rgba(255,255,255,0.42)" }}
                      >
                        {track.artist}
                      </p>
                    </div>
                  </div>
                  
                  {/* Waveform */}
                  <div className="flex items-end gap-[2px]" style={{ height: 24 }}>
                    {Array.from({ length: BAR_COUNT }).map((_, bi) => (
                      <WaveBar key={bi} i={bi} active={activeTrack === i} />
                    ))}
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-2 h-px rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${track.progress}%`,
                        background: activeTrack === i
                          ? "linear-gradient(90deg,#ff5722,#ffb980)"
                          : "rgba(255,255,255,0.28)",
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Playback Controls */}
            <div
              className="flex items-center justify-center gap-5 rounded-full py-2.5"
              style={{ background: "rgba(0,0,0,0.28)" }}
            >
              <motion.button 
                whileHover={{ scale: 1.08, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                className="transition-opacity opacity-55 hover:opacity-100"
                onClick={() => setActiveTrack((p) => (p - 1 + tracks.length) % tracks.length)}
              >
                <SkipBack className="h-4.5 w-4.5 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="flex items-center justify-center rounded-full"
                style={{ 
                  width: 40, height: 40, 
                  background: "linear-gradient(135deg,#ff5722,#ffb980)",
                  boxShadow: "0 4px 20px rgba(255,87,34,0.35)"
                }}
              >
                <Pause className="h-4.5 w-4.5 text-white" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.08, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                className="transition-opacity opacity-55 hover:opacity-100"
                onClick={() => setActiveTrack((p) => (p + 1) % tracks.length)}
              >
                <SkipForward className="h-4.5 w-4.5 text-white" />
              </motion.button>
            </div>
          </motion.div>

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="mt-3 text-center"
          >
            <a
              href={waLink("Hi, I want to find the perfect melody for my memories.")}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="melody-finder-cta"
              className="inline-flex items-center gap-2.5 rounded-full font-archivo text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:scale-105"
              style={{
                padding: "0.75rem 2rem",
                background: "rgba(255,248,61,0.92)",
                color: "#0a0b0c",
                boxShadow: "0 4px 24px rgba(255,248,61,0.25)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <Search className="h-3.5 w-3.5" />
              Find Your Melody
            </a>
            <p 
              className="font-archivo mt-2.5 text-[11px]" 
              style={{ color: "rgba(255,255,255,0.48)" }}
            >
              Scan your photo. Find the song.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE — Compact vertical layout (Framify mobile pattern)
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 md:hidden flex flex-col h-full px-4 pb-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-shrink-0 pt-2 pb-3"
        >
          <span
            className="font-archivo text-[9px] uppercase tracking-[0.4em] block mb-2"
            style={{ color: "#ff5722" }}
          >
            Chapter 03
          </span>
          <h2
            className="font-display font-black leading-[0.9] text-white"
            style={{ fontSize: "clamp(2.2rem, 9vw, 3.2rem)", letterSpacing: "-0.02em" }}
          >
            Memory<br />Melody.
          </h2>
          <p
            className="font-archivo text-[11px] leading-relaxed mt-2"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Discover your unique soundtrack.
          </p>
        </motion.div>

        {/* Horizontal Card Scroll */}
        <div
          className="flex-shrink-0 flex items-end gap-2 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {ARC_CARD_DEFS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex-shrink-0 scroll-snap-align-start"
              style={{
                width: 72,
                height: 90,
                borderRadius: 10,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <img
                src={card.src}
                alt={card.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Player */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex flex-col justify-end min-h-0"
          style={{
            borderRadius: "1rem",
            background: "rgba(18,6,6,0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "0.875rem",
            marginTop: "0.5rem",
          }}
        >
          <div className="space-y-2 overflow-y-auto max-h-[45vh] pr-1">
            {tracks.map((track, i) => (
              <button
                key={track.title}
                onClick={() => setActiveTrack(i)}
                className="w-full text-left transition-all duration-300"
                style={{
                  borderRadius: "0.75rem",
                  padding: "0.75rem",
                  background: activeTrack === i 
                    ? "rgba(255,185,128,0.10)" 
                    : "rgba(255,255,255,0.03)",
                  border: activeTrack === i 
                    ? "1px solid rgba(255,185,128,0.22)" 
                    : "1px solid transparent",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: 26, height: 26,
                      background: activeTrack === i 
                        ? "rgba(255,185,128,0.15)" 
                        : "rgba(255,255,255,0.05)",
                    }}
                  >
                    <Music2
                      className="h-2.5 w-2.5"
                      style={{ 
                        color: activeTrack === i ? "#ffb980" : "rgba(255,255,255,0.45)" 
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p 
                      className="font-archivo text-[11px] font-semibold truncate" 
                      style={{ 
                        color: activeTrack === i ? "#fff" : "rgba(255,255,255,0.72)" 
                      }}
                    >
                      {track.title}
                    </p>
                    <p 
                      className="font-archivo text-[10px] truncate" 
                      style={{ color: "rgba(255,255,255,0.42)" }}
                    >
                      {track.artist}
                    </p>
                  </div>
                </div>
                <div className="flex items-end gap-[2px]" style={{ height: 20 }}>
                  {Array.from({ length: BAR_COUNT }).map((_, bi) => (
                    <WaveBar key={bi} i={bi} active={activeTrack === i} />
                  ))}
                </div>
                <div className="mt-1.5 h-px rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${track.progress}%`,
                      background: activeTrack === i
                        ? "linear-gradient(90deg,#ff5722,#ffb980)"
                        : "rgba(255,255,255,0.28)",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
          
          <div
            className="mt-2.5 flex items-center justify-center gap-4 rounded-full py-2"
            style={{ background: "rgba(0,0,0,0.28)" }}
          >
            <button 
              className="opacity-55 hover:opacity-100 transition-opacity"
              onClick={() => setActiveTrack((p) => (p - 1 + tracks.length) % tracks.length)}
            >
              <SkipBack className="h-4 w-4 text-white" />
            </button>
            <button
              className="flex items-center justify-center rounded-full"
              style={{ 
                width: 36, height: 36, 
                background: "linear-gradient(135deg,#ff5722,#ffb980)",
              }}
            >
              <Pause className="h-4 w-4 text-white" />
            </button>
            <button 
              className="opacity-55 hover:opacity-100 transition-opacity"
              onClick={() => setActiveTrack((p) => (p + 1) % tracks.length)}
            >
              <SkipForward className="h-4 w-4 text-white" />
            </button>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-shrink-0 mt-2 text-center"
        >
          <a
            href={waLink("Hi, I want to find the perfect melody for my memories.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full font-archivo text-[10px] font-semibold uppercase tracking-[0.2em] transition-transform hover:scale-105"
            style={{
              padding: "0.625rem 1.75rem",
              background: "rgba(255,248,61,0.92)",
              color: "#0a0b0c",
              borderRadius: "9999px",
            }}
          >
            <Search className="h-3 w-3" />
            Find Melody
          </a>
        </motion.div>
      </div>
    </section>
  );
}