import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
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

// ─── Arc card definitions ──────────────────────────────────────────────────────
// angleDeg: position on arc (negative = left, positive = right, 0 = top)
// rotateDeg: card tilt
// wFrac / hFrac: card size as fraction of arc radius (makes them scale responsively)
const ARC_CARD_DEFS = [
  { src: "/content.png",                                                                                 alt: "Couple smiling",  angleDeg: -92, rotateDeg: -44, wFrac: 0.195, hFrac: 0.240 },
  { src: "/image.png",                                                                                   alt: "Wedding moment",  angleDeg: -70, rotateDeg: -30, wFrac: 0.230, hFrac: 0.285 },
  { src: "/image%20copy.png",                                                                            alt: "Family hiking",   angleDeg: -48, rotateDeg: -16, wFrac: 0.255, hFrac: 0.315 },
  { src: "/image%20copy%202.png",                                                                        alt: "Graduation",      angleDeg: -24, rotateDeg:  -5, wFrac: 0.275, hFrac: 0.342 },
  { src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",alt: "Studio mic",      angleDeg:  24, rotateDeg:   5, wFrac: 0.275, hFrac: 0.342 },
  { src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80",alt: "Singer on stage", angleDeg:  48, rotateDeg:  16, wFrac: 0.255, hFrac: 0.315 },
  { src: "https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=600&q=80",alt: "Concert lights",  angleDeg:  70, rotateDeg:  30, wFrac: 0.230, hFrac: 0.285 },
  { src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=60",alt: "Concert crowd",   angleDeg:  92, rotateDeg:  44, wFrac: 0.195, hFrac: 0.240 },
];

// Arc geometry: circle radius = 46vw, center at (50vw from left, CY_FRAC * containerH from top)
// We compute everything in JS using the container's live pixel width.
function computeArcCards(containerW, containerH) {
  const R  = containerW * 0.46;          // arc radius — 46% of container width
  const CY = containerH * 1.18;          // circle center far below → only top arc visible

  return ARC_CARD_DEFS.map((def) => {
    const rad = (def.angleDeg * Math.PI) / 180;
    const x   =  R * Math.sin(rad);       // horizontal offset from circle center (50%)
    const y   = -R * Math.cos(rad);       // vertical offset (negative = up)

    const w = R * def.wFrac;
    const h = R * def.hFrac;

    // absolute pixel position: circle center is at (containerW/2, CY)
    const left = containerW / 2 + x - w / 2;
    const top  = CY + y - h / 2;

    return { ...def, left, top, w, h };
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function MelodyFinder() {
  const ref            = useRef(null);
  const arcRef         = useRef(null);
  const prefersReduced = useReducedMotion();
  const [activeTrack, setActiveTrack] = useState(1);
  const [arcCards, setArcCards]       = useState([]);
  const [arcH, setArcH]               = useState(700);

  // Compute arc card positions reactively on resize
  useEffect(() => {
    function recalc() {
      const el = arcRef.current;
      if (!el) return;
      const w = el.offsetWidth;
      // height = 72% of width, min 480px, max 820px
      const h = Math.min(820, Math.max(480, w * 0.72));
      setArcH(h);
      setArcCards(computeArcCards(w, h));
    }
    recalc();
    const ro = new ResizeObserver(recalc);
    if (arcRef.current) ro.observe(arcRef.current);
    return () => ro.disconnect();
  }, []);

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

      {/* ══════════════════════════════════════════════════════════════
          DESKTOP — Full-screen arc (no horizontal padding)
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 hidden md:block w-full">

        {/* Arc container — full viewport width, overflow hidden to crop bottom cards */}
        <div
          ref={arcRef}
          style={{
            position: "relative",
            width: "100%",
            height: arcH,
            overflow: "hidden",
          }}
        >
          {/* Arc cards */}
          {arcCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.72, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.06, zIndex: 30, transition: { duration: 0.2 } }}
              style={{
                position: "absolute",
                width:  card.w,
                height: card.h,
                left:   card.left,
                top:    card.top,
                borderRadius: "clamp(10px, 1.2vw, 20px)",
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(0,0,0,0.38), 0 2px 10px rgba(0,0,0,0.20)",
                transform: `rotate(${card.rotateDeg}deg)`,
                filter: "saturate(1.06) contrast(1.04)",
                zIndex: 10 - Math.abs(i - 3.5),
                willChange: "transform",
              }}
            >
              <img
                src={card.src}
                alt={card.alt}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </motion.div>
          ))}

          {/* Text block — 40px left of center */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(0, -50%)",
              textAlign: "center",
              zIndex: 20,
              width: "clamp(320px, 36vw, 520px)",
            }}
          >
            <span
              className="font-archivo text-[11px] uppercase tracking-[0.4em] block mb-5"
              style={{ color: "#ff5722" }}
            >
              Chapter 03 — Find Your Melody
            </span>
            <h2
              className="font-archivo font-black leading-[0.9] text-white mb-5"
              style={{ fontSize: "clamp(4.4rem,7.3vw,7.6rem)", letterSpacing: "-0.01em" }}
            >
              Memory<br />Melody.
            </h2>
            <p
              className="font-archivo text-sm leading-relaxed mb-8 mx-auto"
              style={{ color: "rgba(255,255,255,0.72)", maxWidth: "360px" }}
            >
              Discover the unique soundtrack to your most cherished moments,
              arranged with the same care as the memory itself.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <a
                href={waLink("Hi, I want to find the perfect melody for my memories.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#fff83d] px-5 py-3 font-archivo text-xs font-black text-black transition-transform duration-300 hover:scale-105"
              >
                Find Your Melody
              </a>
            </div>
          </motion.div>
        </div>

        {/* Player + CTA below the arc — with normal padding restored */}
        <div className="px-6 pb-16 md:px-16 md:pb-20">
          {/* ── Music Player ── */}
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
            <div className="grid grid-cols-3 gap-2">
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
                  <div className="flex items-end gap-[2px]" style={{ height: 28 }}>
                    {Array.from({ length: BAR_COUNT }).map((_, bi) => (
                      <WaveBar key={bi} i={bi} active={activeTrack === i} />
                    ))}
                  </div>
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

          {/* ── Bottom CTA ── */}
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
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE — original layout
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 md:hidden w-full px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span
            className="font-archivo text-[11px] uppercase tracking-[0.4em] block mb-4"
            style={{ color: "#ff5722" }}
          >
            Chapter 03 — Find Your Melody
          </span>
          <h2
            className="font-archivo font-black leading-[0.9] text-white mb-4"
            style={{ fontSize: "clamp(2.8rem,10vw,4rem)", letterSpacing: "-0.01em" }}
          >
            Memory<br />Melody.
          </h2>
          <p
            className="font-archivo text-sm leading-relaxed mb-6"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Discover the unique soundtrack to your most cherished moments.
          </p>
          <div className="relative inline-block">
            <video
              src="https://framerusercontent.com/assets/4ufI5jWNiH6OijVpfkPC1C2YVQ.mp4"
              autoPlay
              muted
              loop
              className="absolute inset-0 w-full h-full object-cover rounded-full"
            />
            <a
              href={waLink("Hi, I want to find the perfect melody for my memories.")}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 rounded-full px-5 py-3 font-archivo text-xs font-black text-black"
              style={{ background: 'rgba(255,248,61,0.8)' }}
            >
              Find Your Melody
            </a>
          </div>
        </motion.div>

        {/* Mobile: horizontal scroll of cards */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "8px",
            marginTop: "2rem",
          }}
        >
          {ARC_CARD_DEFS.map((card, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: 80,
                height: 100,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                filter: "saturate(1.06) contrast(1.04)",
              }}
            >
              <img
                src={card.src}
                alt={card.alt}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>

        {/* Mobile player */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.18 }}
          className="mt-8 w-full"
          style={{
            borderRadius: "1.5rem",
            background: "rgba(12,3,3,0.60)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "1.25rem",
          }}
        >
          <div className="grid grid-cols-1 gap-2">
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
                <div className="flex items-end gap-[2px]" style={{ height: 28 }}>
                  {Array.from({ length: BAR_COUNT }).map((_, bi) => (
                    <WaveBar key={bi} i={bi} active={activeTrack === i} />
                  ))}
                </div>
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="mt-10 text-center"
        >
          <div className="relative inline-block">
            <video
              src="https://framerusercontent.com/assets/4ufI5jWNiH6OijVpfkPC1C2YVQ.mp4"
              autoPlay
              muted
              loop
              className="absolute inset-0 w-full h-full object-cover rounded-full"
            />
            <a
              href={waLink("Hi, I want to find the perfect melody for my memories.")}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="melody-finder-cta"
              className="relative glow-orange inline-flex items-center gap-3 rounded-full font-archivo text-sm font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:scale-105"
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
          </div>
          <p className="font-archivo mt-4 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            Scan your photo. Find the song.
          </p>
        </motion.div>
      </div>

    </section>
  );
}