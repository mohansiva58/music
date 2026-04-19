import { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Play, ArrowDown, Sparkles } from "lucide-react";
import { waLink } from "../lib/content";

/* ------------------------------------------------------------------ */
/*                     Music-themed background layers                 */
/* ------------------------------------------------------------------ */

/** Animated aurora mesh — large, soft, purple/blue glowing blobs that drift. */
function AuroraBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Base navy */}
      <div className="absolute inset-0 bg-[#05060F]" />

      {/* Big drifting blobs — purple, blue, teal */}
      <motion.div
        className="absolute -top-40 -left-40 h-[620px] w-[620px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, #6D28D9 0%, transparent 65%)" }}
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-20 right-0 h-[700px] w-[700px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 65%)" }}
        animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-160px] left-1/3 h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, #0EA5E9 0%, transparent 70%)" }}
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#05060F_100%)]" />
      {/* Bottom fade into page body */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#05060F]" />
    </div>
  );
}

/** Floating particle dots — extremely lightweight (pure CSS/framer). */
function Particles({ count = 30 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.4 + 0.2,
      })),
    [count]
  );

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: "0 0 8px rgba(167,139,250,0.7)",
          }}
          animate={{ y: [0, -40, 0], opacity: [p.opacity, p.opacity * 0.2, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/** Animated audio visualizer — bars that pulse with a music-like rhythm. */
function AudioVisualizer() {
  const bars = Array.from({ length: 80 });
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 flex h-44 items-end justify-center gap-[3px] px-4 md:h-60 md:gap-[4px]"
    >
      {bars.map((_, i) => (
        <span
          key={i}
          className="wave-bar w-[3px] rounded-full md:w-[4px]"
          style={{
            height: `${25 + Math.abs(Math.sin(i * 0.55)) * 65 + Math.random() * 10}%`,
            background:
              "linear-gradient(to top, rgba(139,92,246,0) 0%, rgba(139,92,246,0.9) 50%, #E9D5FF 100%)",
            animationDelay: `${(i % 14) * 0.065}s`,
            animationDuration: `${0.9 + (i % 5) * 0.12}s`,
            opacity: 0.45 + (i % 7) * 0.06,
          }}
        />
      ))}
    </div>
  );
}

/** Small floating music-note bars that drift slowly. */
function FloatingNotes() {
  const items = [
    { left: "8%", top: "22%", delay: 0, size: 12 },
    { left: "16%", top: "68%", delay: 2.4, size: 8 },
    { left: "82%", top: "30%", delay: 1.2, size: 10 },
    { left: "72%", top: "72%", delay: 3.5, size: 14 },
    { left: "42%", top: "18%", delay: 0.8, size: 6 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {items.map((n, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: n.left,
            top: n.top,
            width: n.size,
            height: n.size,
            background:
              "radial-gradient(circle, #A78BFA 0%, rgba(167,139,250,0) 70%)",
            boxShadow: "0 0 20px rgba(167,139,250,0.8)",
          }}
          animate={{ y: [0, -22, 0], scale: [1, 1.3, 1] }}
          transition={{
            duration: 6 + i * 0.6,
            delay: n.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                              Hero                                  */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  /**
   * Scroll-linked animations
   * ------------------------------------------------------------
   * We read raw window scroll progress for this section (target=ref)
   * and map the [0 → 1] progress (top of section at viewport top →
   * bottom of section at viewport top) into distinct visual outputs:
   *   - `bgScale`         : background zoom  (1 → 1.2)
   *   - `contentY`        : foreground parallax   (drifts up)
   *   - `contentOpacity`  : content fades out near end of scroll
   *   - `contentBlur`     : soft blur as user leaves hero
   *   - `ctaY`            : CTAs move up slower (additional parallax)
   *   - `vizOpacity`      : visualizer fades out
   *   - `creditsY`        : bottom meta row slight parallax
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgScaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const contentYRaw = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacityRaw = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.5, 0]);
  const contentBlurRaw = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const ctaYRaw = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const vizOpacityRaw = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const creditsYRaw = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Spring smoothing (skip when user prefers reduced motion)
  const springCfg = { stiffness: 110, damping: 28, mass: 0.6 };
  const bgScale = useSpring(bgScaleRaw, springCfg);
  const contentY = useSpring(contentYRaw, springCfg);
  const contentOpacity = useSpring(contentOpacityRaw, springCfg);
  const contentBlur = useSpring(contentBlurRaw, springCfg);
  const ctaY = useSpring(ctaYRaw, springCfg);
  const vizOpacity = useSpring(vizOpacityRaw, springCfg);
  const creditsY = useSpring(creditsYRaw, springCfg);

  // Filter value string depends on blur output
  const contentFilter = useTransform(contentBlur, (b) => `blur(${b}px)`);

  return (
    <section
      ref={ref}
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden text-white"
    >
      {/* =============================================================== */}
      {/*                     BACKGROUND (scroll zooms)                   */}
      {/* =============================================================== */}
      <motion.div
        style={prefersReduced ? undefined : { scale: bgScale }}
        className="absolute inset-0 origin-center"
      >
        <AuroraBackdrop />
        <Particles count={36} />
        <FloatingNotes />
      </motion.div>

      {/* Audio visualizer (music-themed element, fades on scroll) */}
      <motion.div
        style={prefersReduced ? undefined : { opacity: vizOpacity }}
        className="absolute inset-0"
      >
        <AudioVisualizer />
      </motion.div>

      {/* =============================================================== */}
      {/*              FOREGROUND CONTENT (parallax + fade)               */}
      {/* =============================================================== */}
      <motion.div
        style={
          prefersReduced
            ? undefined
            : { y: contentY, opacity: contentOpacity, filter: contentFilter }
        }
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-6 pt-28 md:px-12"
      >
        {/* --------- Glassmorphism content card --------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl md:p-14"
          style={{
            boxShadow:
              "0 25px 80px -20px rgba(109,40,217,0.35), 0 0 0 1px rgba(255,255,255,0.06) inset",
          }}
        >
          {/* Inner shimmer line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          <div className="flex flex-col items-center text-center">
            {/* Credibility pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-white/80 backdrop-blur-xl"
              data-testid="hero-eyebrow"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#A78BFA]" />
              150+ songs created since 2025
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              data-testid="hero-headline"
              className="font-display mt-7 text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              Turn Your Story <br className="hidden sm:block" />
              Into a{" "}
              <span
                className="relative bg-gradient-to-r from-[#E9D5FF] via-[#A78BFA] to-[#60A5FA] bg-clip-text text-transparent"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                Song
                <svg
                  aria-hidden
                  viewBox="0 0 300 18"
                  className="absolute -bottom-3 left-0 h-3 w-full"
                >
                  <path
                    d="M3 14 Q 80 2, 150 10 T 297 8"
                    stroke="url(#underlineGrad)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="underlineGrad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#A78BFA" />
                      <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              .
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              data-testid="hero-sub"
              className="mt-7 max-w-2xl text-base font-light leading-relaxed text-white/70 md:text-lg"
            >
              Custom songs created from your memories, emotions, and the
              moments that matter. Studio-produced. Delivered to your heart.
            </motion.p>

            {/* CTAs (extra parallax) */}
            <motion.div
              style={prefersReduced ? undefined : { y: ctaY }}
              className="mt-10 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center"
            >
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-whatsapp-cta"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#3B82F6] px-7 py-4 text-sm font-semibold text-white shadow-[0_10px_40px_-8px_rgba(139,92,246,0.7)] transition-all hover:shadow-[0_14px_50px_-4px_rgba(139,92,246,0.9)] md:text-base"
              >
                {/* Hover shimmer */}
                <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366]">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white" aria-hidden>
                    <path d="M12.04 2.003a9.97 9.97 0 0 0-8.52 15.12l-1.5 5.47 5.62-1.47a9.97 9.97 0 1 0 4.4-19.12Zm5.8 14.2c-.25.7-1.44 1.33-2 1.4-.52.06-1.17.09-1.88-.12-.44-.14-1-.33-1.73-.65-3.05-1.32-5.04-4.39-5.19-4.59-.15-.2-1.24-1.65-1.24-3.15s.78-2.23 1.06-2.54c.28-.31.61-.39.81-.39.2 0 .41.002.59.01.19.007.44-.07.69.52.25.6.84 2.07.92 2.22.08.15.13.32.03.52-.1.2-.15.31-.3.48-.15.17-.32.38-.46.51-.15.14-.31.3-.13.6.18.31.79 1.3 1.7 2.11 1.17 1.03 2.16 1.35 2.47 1.5.31.15.49.13.67-.08.18-.2.77-.89.98-1.19.2-.31.41-.25.69-.15.28.1 1.77.84 2.07 1 .3.15.49.23.56.36.08.13.08.77-.16 1.47Z"></path>
                  </svg>
                </span>
                Request Your Song on WhatsApp
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                href="#songs"
                data-testid="hero-listen-btn"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm font-medium text-white backdrop-blur-xl transition-all hover:border-white/40 hover:bg-white/10 md:text-base"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-110">
                  <Play className="h-3.5 w-3.5 fill-black translate-x-[1px]" />
                </span>
                Listen to Songs
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={prefersReduced ? undefined : { y: creditsY, opacity: contentOpacity }}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-white/50"
      >
        <span className="flex items-center gap-2">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
}
