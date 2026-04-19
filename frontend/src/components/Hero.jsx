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
 * Hero — content only. The video background lives in <VideoBackdrop> wrapping
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
      {/* Readability layers (light, so video stays visible) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-black/35 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* ===================== Nav Bar ===================== */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-8">
        <a
          href="#top"
          data-testid="hero-logo"
          className="font-serif-display flex items-baseline text-3xl tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
        >
          {ARTIST.brand}
          <sup className="ml-0.5 text-[10px] font-normal text-white">®</sup>
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
        className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <div style={{ paddingTop: "calc(8rem - 75px)", paddingBottom: "10rem" }}>
          <h1
            data-testid="hero-headline"
            className="font-serif-display animate-fade-rise mx-auto max-w-7xl text-5xl font-normal sm:text-7xl md:text-8xl"
            style={{
              lineHeight: "0.95",
              letterSpacing: "-2.46px",
              color: "#FFFFFF",
              textShadow: "0 6px 40px rgba(0,0,0,0.55)",
            }}
          >
            Beyond{" "}
            <em
              style={{
                color: "rgba(255,255,255,0.78)",
                fontStyle: "italic",
                fontFamily: "Instrument Serif, Georgia, serif",
              }}
            >
              words,
            </em>{" "}
            we compose{" "}
            <em
              style={{
                color: "rgba(255,255,255,0.78)",
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
            style={{
              color: "rgba(255,255,255,0.82)",
              fontFamily: "Inter, sans-serif",
              textShadow: "0 2px 18px rgba(0,0,0,0.55)",
            }}
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
                backgroundColor: "#FFFFFF",
                color: "#000000",
                fontFamily: "Inter, sans-serif",
                boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
              }}
            >
              Begin Journey
            </a>
            <a
              href="#songs"
              data-testid="hero-listen-btn"
              className="animate-fade-rise-delay-2 mt-6 text-xs uppercase tracking-[0.3em] transition-colors"
              style={{
                color: "rgba(255,255,255,0.72)",
                fontFamily: "Inter, sans-serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              }}
            >
              or listen to songs ?
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}