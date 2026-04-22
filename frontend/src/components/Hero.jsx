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
   * Hero - content only. The video background lives in <VideoBackdrop> wrapping
   * Hero + next section(s), so scrubbing continues as the user scrolls beyond
   * the hero. This component focuses on nav + headline + CTAs, sitting on top
   * of the shared video layer.
   */

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

  const textYRaw = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacityRaw = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Micro-keyframe scrubbing: frame-by-frame scale & rotation changes
  const textScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.95, 1, 0.98, 0.85]);
  const textRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, -2]);
  
  const spring = { stiffness: 120, damping: 30, mass: 0.6 };
  const textY = useSpring(textYRaw, spring);
  const textOpacity = useSpring(textOpacityRaw, spring);

  return (
    <section
      ref={ref}
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background image with overlay for readability */}
      <div className="absolute inset-0 z-0">
        <img
          src="content.png"
          alt="Letters to Tomorrow cover"
          className="h-full w-full object-cover"
          style={{ pointerEvents: "none" }}
        />
        <div
          className="absolute inset-0 bg-black/30"
          style={{ zIndex: 1, pointerEvents: "none" }}
        />
      </div>

      {/* ===================== Nav Bar ===================== */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-8">
        <a
          href="#top"
          data-testid="hero-logo"
          className="font-serif-display flex items-baseline text-3xl tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
        >
          {ARTIST.brand}
          <sup className="ml-0.5 text-[10px] font-normal text-white">�</sup>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className="text-sm transition-colors"
              style={{
                fontFamily: "Inter, sans-serif",
                color: l.active ? "#FFFFFF" : "rgba(255,255,255,0.72)",
                textShadow: "0 1px 10px rgba(0,0,0,0.5)",
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
          className="rounded-full border border-white/20 px-6 py-2.5 text-sm backdrop-blur-sm transition-transform hover:scale-[1.03]"
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            color: "#FFFFFF",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Begin Journey
        </a>
      </nav>

      {/* ===================== Hero Content (scroll parallax) ===================== */}
      <motion.div
        style={prefersReduced ? undefined : { y: textY, opacity: textOpacity }}
        className="relative z-10 flex min-h-[calc(100vh-96px)] flex-col items-start justify-end px-6 pb-14 text-left md:px-12 lg:px-16"
      >
        <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
          <motion.h1
            style={{
              ...{
                lineHeight: "1.05",
                letterSpacing: "-2.46px",
                color: "rgba(255,255,255,0.54)",
                textShadow: "0 6px 40px rgba(0,0,0,0.32)",
              },
              ...(prefersReduced ? {} : { scale: textScale, rotate: textRotate })
            }}
            data-testid="hero-headline"
            className="font-serif-display animate-fade-rise text-4xl font-bold sm:text-6xl md:text-7xl lg:text-8xl"
          >
            TURN YOUR <em style={{ fontStyle: "italic", color: "#ffe082", opacity: 0.92 }}>STORY</em><br />INTO A  <em style={{ fontStyle: "italic", color: "#ffe082", opacity: 0.92 }}>MEMORABLE</em><br /> SONG
          </motion.h1>

          <p
            data-testid="hero-sub"
            className="animate-fade-rise-delay mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
            style={{
              color: "rgba(255,255,255,0.68)",
              fontFamily: "Inter, sans-serif",
              textShadow: "0 2px 18px rgba(0,0,0,0.38)",
            }}
          >
            Personalized music for proposals, anniversaries, and milestones. <br />
            Capture your memories in a song made just for you or your loved ones.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-whatsapp-cta"
              className="animate-fade-rise-delay-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03] shadow-lg"
              style={{
                background: "linear-gradient(90deg, #FFD700 0%, #FFB300 100%)",
                color: "#1a0303",
                fontFamily: "Inter, sans-serif",
                boxShadow: "0 8px 24px rgba(255,193,7,0.14)",
                border: "none",
              }}
            >
              <span style={{ fontWeight: 700, letterSpacing: 1 }}>REQUEST YOUR SONG</span>
            </a>
            <a
              href="#songs"
              data-testid="hero-listen-btn"
              className="animate-fade-rise-delay-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] transition-colors"
              style={{
                background: "#1a0303",
                color: "#FFD700",
                fontFamily: "Inter, sans-serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                border: "1.5px solid #FFD700",
              }}
            >
              LISTEN TO SAMPLES
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}