import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Play, ArrowDown } from "lucide-react";
import { waLink } from "../lib/content";

/* ---------- 3D Vinyl Record (pure CSS) ---------- */
function Vinyl({ rotate, tilt, scale, y }) {
  return (
    <motion.div
      style={{ y, scale }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <motion.div
        style={{ rotateX: tilt, rotateZ: rotate }}
        className="relative"
      >
        {/* Soft warm glow behind the disc */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E2B365]/30 blur-[100px]" />

        {/* The vinyl */}
        <div
          className="vinyl spin-slow relative h-[78vmin] w-[78vmin] max-h-[700px] max-w-[700px] rounded-full"
          aria-hidden
        >
          {/* Outer rim highlight */}
          <div className="absolute inset-0 rounded-full ring-1 ring-black/80" />
          {/* Grooves */}
          <div className="vinyl-grooves absolute inset-3 rounded-full" />
          {/* Radial shimmer reflection */}
          <div className="vinyl-shimmer absolute inset-0 rounded-full" />
          {/* Center label */}
          <div className="absolute left-1/2 top-1/2 h-[32%] w-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#F5D38E] via-[#E2B365] to-[#8a5b1f] shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="font-display text-[9px] font-bold uppercase tracking-[0.3em] text-black/80 md:text-xs">
                Soulnote
              </div>
              <div className="font-script -mt-1 text-lg text-black/70 md:text-2xl">
                vol. 01
              </div>
              <div className="mt-1 h-px w-8 bg-black/30" />
              <div className="mt-1 text-[7px] uppercase tracking-[0.35em] text-black/60 md:text-[9px]">
                Side A · 45 RPM
              </div>
            </div>
            {/* Spindle hole */}
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black md:h-4 md:w-4" />
          </div>
        </div>
      </motion.div>

      {/* Tonearm */}
      <div className="pointer-events-none absolute right-[4%] top-[6%] hidden md:block">
        <div className="relative h-[420px] w-[28px] origin-top">
          <div className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-600 shadow-[0_4px_20px_rgba(0,0,0,0.6)]" />
          <div className="absolute left-1/2 top-4 h-[78%] w-[3px] -translate-x-1/2 rotate-[22deg] origin-top rounded-full bg-gradient-to-b from-zinc-400 via-zinc-500 to-zinc-700" />
          <div className="absolute bottom-[10%] right-[-22px] h-3 w-7 rotate-[22deg] rounded-sm bg-gradient-to-b from-zinc-300 to-zinc-600" />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Hero ---------- */
export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // Scroll-driven transforms (0 → 800px scroll)
  const rawRotate = useTransform(scrollY, [0, 1200], [0, 180]);
  const rawTilt = useTransform(scrollY, [0, 800], [18, 55]);
  const rawScale = useTransform(scrollY, [0, 800], [1, 0.55]);
  const rawVinylY = useTransform(scrollY, [0, 800], [0, 120]);
  const rawTextY = useTransform(scrollY, [0, 600], [0, -80]);
  const rawTextOpacity = useTransform(scrollY, [0, 400, 700], [1, 0.6, 0]);
  const rawSkyOpacity = useTransform(scrollY, [0, 600], [1, 0.15]);

  // Smooth out with springs
  const spring = { stiffness: 120, damping: 30, mass: 0.6 };
  const rotate = useSpring(rawRotate, spring);
  const tilt = useSpring(rawTilt, spring);
  const scale = useSpring(rawScale, spring);
  const vinylY = useSpring(rawVinylY, spring);
  const textY = useSpring(rawTextY, spring);
  const textOpacity = useSpring(rawTextOpacity, spring);
  const skyOpacity = useSpring(rawSkyOpacity, spring);

  return (
    <section
      ref={ref}
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      {/* Golden-hour sky */}
      <motion.div
        style={{ opacity: skyOpacity }}
        className="absolute inset-0"
        aria-hidden
      >
        {/* Gradient sky: warm top → dark bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4B860] via-[#B8621B] via-40% to-[#050505]" />
        {/* Sun halo */}
        <div className="absolute left-[70%] top-[18%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE6B5] opacity-60 blur-[90px]" />
        {/* Soft light rays */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen">
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(255,220,150,0.55) 0%, transparent 60%)",
            }}
          />
        </div>
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%272%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")',
          }}
        />
      </motion.div>

      {/* Permanent dark base (so content below still reads) */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#050505]"
      />

      {/* ===== Vinyl Layer (right-biased) ===== */}
      <div className="absolute inset-0 flex items-center justify-center md:-right-[18%] md:justify-end md:pr-10">
        <Vinyl rotate={rotate} tilt={tilt} scale={scale} y={vinylY} />
      </div>

      {/* ===== Content ===== */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-24 pt-32 md:justify-center md:px-12 md:pb-0"
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-3"
            data-testid="hero-eyebrow"
          >
            <span className="h-px w-10 bg-white/50" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/90 md:text-xs">
              150+ songs · since 2025
            </span>
          </motion.div>

          {/* Huge Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            data-testid="hero-headline"
            className="font-display text-[14vw] font-semibold uppercase leading-[0.88] tracking-[-0.03em] text-white sm:text-[13vw] md:text-[10vw] lg:text-[9.5rem] xl:text-[11rem]"
            style={{ textShadow: "0 2px 40px rgba(0,0,0,0.35)" }}
          >
            Your
            <br />
            <span className="block">
              story,{" "}
              <span className="font-script text-[0.95em] font-normal italic text-[#FFE6B5] normal-case">
                in
              </span>
            </span>
            <span className="block text-gold-gradient">a song.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            data-testid="hero-sub"
            className="mt-8 max-w-xl text-base font-light leading-relaxed text-white/85 md:text-lg"
          >
            Original, studio-produced songs — written from scratch around your
            memories, your people, and the moments you never want to forget.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-whatsapp-cta"
              className="glow-btn group inline-flex items-center gap-3 rounded-full bg-[#0A0A0A] px-7 py-4 text-sm font-semibold text-white ring-1 ring-white/20 md:text-base"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 fill-white"
                  aria-hidden
                >
                  <path d="M12.04 2.003a9.97 9.97 0 0 0-8.52 15.12l-1.5 5.47 5.62-1.47a9.97 9.97 0 1 0 4.4-19.12Zm5.8 14.2c-.25.7-1.44 1.33-2 1.4-.52.06-1.17.09-1.88-.12-.44-.14-1-.33-1.73-.65-3.05-1.32-5.04-4.39-5.19-4.59-.15-.2-1.24-1.65-1.24-3.15s.78-2.23 1.06-2.54c.28-.31.61-.39.81-.39.2 0 .41.002.59.01.19.007.44-.07.69.52.25.6.84 2.07.92 2.22.08.15.13.32.03.52-.1.2-.15.31-.3.48-.15.17-.32.38-.46.51-.15.14-.31.3-.13.6.18.31.79 1.3 1.7 2.11 1.17 1.03 2.16 1.35 2.47 1.5.31.15.49.13.67-.08.18-.2.77-.89.98-1.19.2-.31.41-.25.69-.15.28.1 1.77.84 2.07 1 .3.15.49.23.56.36.08.13.08.77-.16 1.47Z"></path>
                </svg>
              </span>
              Request your song on WhatsApp
            </a>

            <a
              href="#songs"
              data-testid="hero-listen-btn"
              className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-6 py-4 text-sm font-medium text-white backdrop-blur-xl transition-all hover:border-white hover:bg-white/15 md:text-base"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                <Play className="h-3.5 w-3.5 fill-black text-black" />
              </span>
              Listen to songs
            </a>
          </motion.div>
        </div>

        {/* Bottom meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.9 }}
          className="mt-20 flex items-end justify-between border-t border-white/15 pt-6 md:mt-24"
        >
          <div className="flex items-center gap-6 text-[10px] font-medium uppercase tracking-[0.3em] text-white/70 md:text-xs">
            <span>Birthdays</span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span>Anniversaries</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />
            <span className="hidden sm:inline">Weddings</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/40 md:block" />
            <span className="hidden md:inline">Tributes</span>
          </div>

          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/70 md:text-xs">
            <span className="animate-bounce">
              <ArrowDown className="h-4 w-4" />
            </span>
            Scroll
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
