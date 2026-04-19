import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { waLink, ARTIST } from "../lib/content";

/*
 * Cinematic Hero — Aethera layout + music portrait + scroll parallax (like before)
 *   - Light white bg with Instrument Serif display + italic emphasis
 *   - Red-duotone music image pinned to bottom, FLIPPED horizontally
 *   - Scroll parallax: bg scales 1 → 1.18, drifts down, text lifts + fades out
 */

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?crop=entropy&cs=tinysrgb&fit=crop&w=2400&q=90";

const NAV_LINKS = [
  { label: "Home", href: "#top", active: true },
  { label: "Songs", href: "#songs" },
  { label: "Process", href: "#process" },
  { label: "Benefits", href: "#benefits" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Hero() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll-linked transforms
  const bgScaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgYRaw = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textYRaw = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacityRaw = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const overlayOpacityRaw = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [0.1, 0.4, 0.7]
  );

  const spring = { stiffness: 120, damping: 30, mass: 0.6 };
  const bgScale = useSpring(bgScaleRaw, spring);
  const bgY = useSpring(bgYRaw, spring);
  const textY = useSpring(textYRaw, spring);
  const textOpacity = useSpring(textOpacityRaw, spring);
  const overlayOpacity = useSpring(overlayOpacityRaw, spring);

  return (
    <section
      ref={ref}
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      {/* ===================== Music Image Background (parallax + flipped) ===================== */}
      <motion.div
        style={
          prefersReduced
            ? { top: "300px", inset: "auto 0 0 0" }
            : {
                top: "300px",
                inset: "auto 0 0 0",
                height: "calc(100vh + 300px)",
                scale: bgScale,
                y: bgY,
              }
        }
        className="absolute z-0 origin-center"
      >
        <div className="duotone-red-wrap relative h-full w-full">
          <img
            src={HERO_IMAGE_URL}
            alt="Listening to music"
            data-testid="hero-image"
            className="duotone-red absolute inset-0 h-full w-full object-cover object-[center_25%]"
            style={{ transform: "scaleX(-1)" }} /* flipped horizontally */
          />
        </div>
      </motion.div>

      {/* White gradient fades (soften image into bg) */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white via-transparent to-white" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,255,255,0.85)_0%,transparent_55%)]" />

      {/* Scroll-driven darkening overlay (matches the old video-hero language) */}
      <motion.div
        style={prefersReduced ? undefined : { opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-transparent to-[#080202]"
        aria-hidden
      />

      {/* ===================== Nav Bar ===================== */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-8">
        <a
          href="#top"
          data-testid="hero-logo"
          className="font-serif-display flex items-baseline text-3xl tracking-tight"
          style={{ color: "#000000" }}
        >
          {ARTIST.brand}
          <sup className="ml-0.5 text-[10px] font-normal" style={{ color: "#000000" }}>
            ®
          </sup>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className="text-sm transition-colors hover:text-black"
              style={{
                fontFamily: "Inter, sans-serif",
                color: l.active ? "#000000" : "#6F6F6F",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="nav-cta"
          className="rounded-full px-6 py-2.5 text-sm transition-transform hover:scale-[1.03]"
          style={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Begin Journey
        </a>
      </nav>

      {/* ===================== Hero Content (scroll parallax) ===================== */}
      <motion.div
        style={
          prefersReduced
            ? undefined
            : { y: textY, opacity: textOpacity }
        }
        className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <div style={{ paddingTop: "calc(8rem - 75px)", paddingBottom: "10rem" }}>
          <h1
            data-testid="hero-headline"
            className="font-serif-display animate-fade-rise mx-auto max-w-7xl text-5xl font-normal sm:text-7xl md:text-8xl"
            style={{
              lineHeight: "0.95",
              letterSpacing: "-2.46px",
              color: "#000000",
            }}
          >
            Beyond{" "}
            <em
              style={{
                color: "#6F6F6F",
                fontStyle: "italic",
                fontFamily: "Instrument Serif, Georgia, serif",
              }}
            >
              words,
            </em>{" "}
            we compose{" "}
            <em
              style={{
                color: "#6F6F6F",
                fontStyle: "italic",
                fontFamily: "Instrument Serif, Georgia, serif",
              }}
            >
              the unforgettable.
            </em>
          </h1>

          <p
            data-testid="hero-sub"
            className="animate-fade-rise-delay mx-auto mt-8 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: "#6F6F6F", fontFamily: "Inter, sans-serif" }}
          >
            Original songs built for brilliant moments, fearless love stories,
            and thoughtful souls. Through the noise, we craft music for memories
            that last a lifetime — 150+ stories already turned into song.
          </p>

          <div className="flex flex-col items-center">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-whatsapp-cta"
              className="animate-fade-rise-delay-2 mt-12 rounded-full px-14 py-5 text-base transition-transform hover:scale-[1.03]"
              style={{
                backgroundColor: "#000000",
                color: "#FFFFFF",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Begin Journey
            </a>
            <a
              href="#songs"
              data-testid="hero-listen-btn"
              className="animate-fade-rise-delay-2 mt-6 text-xs uppercase tracking-[0.3em] transition-colors hover:text-black"
              style={{ color: "#6F6F6F", fontFamily: "Inter, sans-serif" }}
            >
              or listen to songs →
            </a>
          </div>
        </div>
      </motion.div>

      {/* Transition fade into dark body */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-b from-transparent to-[#080202]"
      />
    </section>
  );
}
