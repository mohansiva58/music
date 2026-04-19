import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Instagram, Send, Facebook } from "lucide-react";
import { waLink, ARTIST } from "../lib/content";

/* SonicMind-style hero for Soulnote
   - Full-bleed looping cinematic video (with fallback image if video fails)
   - Scroll-driven: bg zoom (1 → 1.15), text parallax & fade, ghost-letters drift
*/

const HERO_VIDEO_SOURCES = [
  // Pexels stable video CDN (supports byte-range streaming)
  "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4",
  "https://videos.pexels.com/video-files/4763824/4763824-hd_1920_1080_24fps.mp4",
  "https://videos.pexels.com/video-files/4114797/4114797-hd_1920_1080_25fps.mp4",
];

const HERO_FALLBACK_IMG =
  "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?crop=entropy&cs=tinysrgb&fit=crop&w=1600&q=85";

export default function Hero() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [videoBroken, setVideoBroken] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll transforms
  const bgScaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgYRaw = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textYRaw = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacityRaw = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const ghostXRaw = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const overlayOpacityRaw = useTransform(scrollYProgress, [0, 0.6, 1], [0.55, 0.7, 0.85]);

  const spring = { stiffness: 120, damping: 30, mass: 0.6 };
  const bgScale = useSpring(bgScaleRaw, spring);
  const bgY = useSpring(bgYRaw, spring);
  const textY = useSpring(textYRaw, spring);
  const textOpacity = useSpring(textOpacityRaw, spring);
  const ghostX = useSpring(ghostXRaw, spring);
  const overlayOpacity = useSpring(overlayOpacityRaw, spring);

  return (
    <section
      ref={ref}
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#080202] text-white"
    >
      {/* ================= VIDEO BACKGROUND (scroll-zoomed) ================= */}
      <motion.div
        style={prefersReduced ? undefined : { scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 origin-center"
      >
        {!videoBroken ? (
          <video
            ref={videoRef}
            data-testid="hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={() => setVideoBroken(true)}
            poster={HERO_FALLBACK_IMG}
            className="absolute inset-0 h-full w-full object-cover"
          >
            {HERO_VIDEO_SOURCES.map((src) => (
              <source key={src} src={src} type="video/mp4" />
            ))}
          </video>
        ) : (
          <img
            src={HERO_FALLBACK_IMG}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
          />
        )}

        {/* Red duotone overlay on video */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "linear-gradient(180deg, #8a0c0c 0%, #dc2626 45%, #991b1b 100%)",
          }}
        />
        {/* Darkening overlay — deepens on scroll */}
        <motion.div
          style={prefersReduced ? undefined : { opacity: overlayOpacity }}
          className="absolute inset-0"
          aria-hidden
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-[#080202]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_30%,rgba(0,0,0,0.7)_100%)]" />
        </motion.div>
      </motion.div>

      {/* =========== TOP NAV =========== */}
      <div className="relative z-30 mx-auto flex max-w-[1400px] items-center justify-between px-6 pt-7 md:px-10 md:pt-8">
        <a
          href="#top"
          data-testid="hero-logo"
          className="flex items-center gap-3 font-display leading-none"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold tracking-tight text-white">
            S
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="font-display text-sm tracking-[0.02em]">
              SOUL
            </span>
            <span className="font-display text-sm tracking-[0.02em]">
              NOTE
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {[
            { label: "How It Works", href: "#process" },
            { label: "Showcase", href: "#songs" },
            { label: "Benefits", href: "#benefits" },
            { label: "Testimonials", href: "#testimonials" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-archivo text-[15px] text-white/90 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {[Instagram, Send, Facebook].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="social"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#7a0c0c]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {/* =========== GHOST SOULNOTE letters (right edge drift) =========== */}
      <motion.div
        aria-hidden
        style={prefersReduced ? undefined : { x: ghostX }}
        className="pointer-events-none absolute right-0 top-0 z-20 hidden h-full items-center md:flex"
      >
        <div
          className="ghost-text text-[26vw] leading-none"
          style={{ transform: "translateX(18%)" }}
        >
          SOULNOTE
        </div>
      </motion.div>

      {/* =========== CONTENT =========== */}
      <motion.div
        style={
          prefersReduced ? undefined : { y: textY, opacity: textOpacity }
        }
        className="relative z-30 mx-auto flex min-h-[calc(100svh-120px)] max-w-[1400px] flex-col justify-between px-6 pt-12 pb-10 md:px-10 md:pt-16 md:pb-12"
      >
        {/* Top-right tagline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="ml-auto max-w-xs text-right"
        >
          <p className="font-archivo text-[15px] font-light leading-snug text-white/95 md:text-base">
            From a spark of emotion <br />
            to a full song, made for you.
          </p>
        </motion.div>

        {/* Giant heading */}
        <div className="relative mt-auto flex flex-1 items-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            data-testid="hero-headline"
            className="font-display text-[22vw] font-black leading-[0.82] tracking-[-0.04em] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)] md:text-[16vw] lg:text-[14.5rem]"
          >
            SOUL
            <br />
            NOTE
          </motion.h1>
        </div>

        {/* Description + CTA */}
        <div className="relative z-30 mt-10 grid grid-cols-1 items-end gap-8 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            data-testid="hero-sub"
            className="font-archivo max-w-xs text-sm leading-relaxed text-white/95 md:col-span-5 md:text-base"
          >
            {ARTIST.brand} turns your memories, emotions,
            <br className="hidden md:block" /> and moments into an original,
            studio-produced song — 150+ created since 2025.
          </motion.p>

          <div className="md:col-span-3" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="flex flex-col gap-3 md:col-span-4 md:items-end"
          >
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-whatsapp-cta"
              className="group inline-flex w-full items-center justify-between gap-6 rounded-full bg-white px-8 py-5 font-archivo text-base font-semibold text-[#0a0202] transition-all hover:bg-[#ff5722] hover:text-white md:w-auto md:min-w-[320px]"
            >
              <span>Request Your Song</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a0202] text-white transition-all group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#ff5722]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href="#songs"
              data-testid="hero-listen-btn"
              className="font-archivo flex items-center gap-2 pl-2 text-[12px] uppercase tracking-[0.3em] text-white/80 transition-colors hover:text-white md:self-end"
            >
              or listen to songs
              <ArrowRight className="h-3 w-3" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
