import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Instagram, Send, Facebook } from "lucide-react";
import { waLink, ARTIST } from "../lib/content";

/* SonicMind-inspired hero for Soulnote
   - Deep red/black palette
   - Red-duotone portrait anchored center-right
   - Giant layered "SOUL / NOTE" typography on the left
   - Ghost "SOULNOTE" bleeding off the right edge
   - Scroll-based parallax + fade
*/
export default function Hero() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll transforms
  const bgScaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textYRaw = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacityRaw = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const portraitYRaw = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const ghostXRaw = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const spring = { stiffness: 120, damping: 30, mass: 0.6 };
  const bgScale = useSpring(bgScaleRaw, spring);
  const textY = useSpring(textYRaw, spring);
  const textOpacity = useSpring(textOpacityRaw, spring);
  const portraitY = useSpring(portraitYRaw, spring);
  const ghostX = useSpring(ghostXRaw, spring);

  return (
    <section
      ref={ref}
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-crimson text-white"
    >
      {/* Decorative radial red glow behind portrait */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[90%] w-[70%] -translate-x-1/4 -translate-y-1/2 rounded-full bg-[#e11d48]/35 blur-[140px]" />
        <div className="absolute right-0 top-0 h-[60%] w-[40%] bg-gradient-to-bl from-[#ef4444]/30 via-transparent to-transparent blur-3xl" />
      </div>

      {/* =========== TOP NAV =========== */}
      <div className="relative z-30 mx-auto flex max-w-[1400px] items-center justify-between px-6 pt-7 md:px-10 md:pt-8">
        {/* Logo */}
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

        {/* Nav links */}
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
              className="text-[15px] font-archivo text-white/85 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-[#7a0c0c]"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="#"
            aria-label="Telegram"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-[#7a0c0c]"
          >
            <Send className="h-4 w-4" />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-[#7a0c0c]"
          >
            <Facebook className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* =========== BACKGROUND PORTRAIT =========== */}
      <motion.div
        style={prefersReduced ? undefined : { scale: bgScale, y: portraitY }}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      >
        <div className="duotone-red-wrap relative h-[90%] w-[72%] md:w-[58%]">
          <img
            src="https://images.unsplash.com/photo-1601412436009-d964bd02edbc?crop=entropy&cs=tinysrgb&fit=crop&w=1600&q=85"
            alt=""
            className="duotone-red absolute inset-0 h-full w-full object-cover object-[center_20%]"
            loading="eager"
          />
        </div>
        {/* Side fades to blend portrait into red bg */}
        <div className="absolute inset-y-0 left-0 z-10 w-1/3 bg-gradient-to-r from-[#450505] via-[#7a0c0c]/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-1/4 bg-gradient-to-l from-[#450505] via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#080202]" />
      </motion.div>

      {/* =========== GHOST SOULNOTE (right edge) =========== */}
      <motion.div
        aria-hidden
        style={prefersReduced ? undefined : { x: ghostX }}
        className="pointer-events-none absolute right-0 top-0 z-20 hidden h-full items-center md:flex"
      >
        <div
          className="ghost-text text-[28vw] leading-none"
          style={{ writingMode: "horizontal-tb", transform: "translateX(18%)" }}
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

        {/* Middle area (giant heading) */}
        <div className="relative mt-auto flex flex-1 items-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            data-testid="hero-headline"
            className="font-display text-[20vw] font-black leading-[0.82] tracking-[-0.04em] text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.4)] md:text-[16vw] lg:text-[14.5rem]"
          >
            SOUL
            <br />
            NOTE
          </motion.h1>
        </div>

        {/* Bottom row: description + CTA */}
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
              className="group inline-flex w-full items-center justify-between gap-6 rounded-full bg-white px-8 py-5 text-base font-archivo font-semibold text-[#0a0202] transition-all hover:bg-[#ff5722] hover:text-white md:w-auto md:min-w-[320px]"
            >
              <span>Request Your Song</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a0202] text-white transition-all group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#ff5722]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href="#songs"
              data-testid="hero-listen-btn"
              className="flex items-center gap-2 pl-2 text-[12px] font-archivo uppercase tracking-[0.3em] text-white/75 transition-colors hover:text-white md:self-end"
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
