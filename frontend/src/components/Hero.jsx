import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import { waLink } from "../lib/content";

// A static "hero waveform" made of animated bars
function HeroWaveform() {
  const bars = Array.from({ length: 64 });
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-0 flex h-40 items-end justify-center gap-[3px] px-4 md:h-56"
    >
      {bars.map((_, i) => (
        <span
          key={i}
          className="wave-bar w-[3px] rounded-full bg-gradient-to-t from-[#E2B365]/10 via-[#E2B365]/60 to-white/80 md:w-[4px]"
          style={{
            height: `${20 + Math.sin(i * 0.5) * 50 + Math.random() * 40}%`,
            animationDelay: `${(i % 12) * 0.07}s`,
            animationDuration: `${0.9 + (i % 5) * 0.12}s`,
            opacity: 0.35 + (i % 7) * 0.08,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Backdrop image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1615358589317-78332cb21a22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBhdWRpbyUyMHdhdmVmb3JtJTIwZGFya3xlbnwwfHx8fDE3NzY1NzM0ODl8MA&ixlib=rb-4.1.0&q=85"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#050505]" />
        <div className="absolute inset-0 radial-gold" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-28 md:px-12">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-zinc-300 backdrop-blur-xl"
          data-testid="hero-eyebrow"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#E2B365]" />
          150+ songs created since 2025
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display max-w-5xl text-center text-5xl font-medium leading-[1.02] tracking-tighter text-white md:text-7xl lg:text-[88px]"
          data-testid="hero-headline"
        >
          Turn your story{" "}
          <span className="font-script text-gold-gradient inline-block pr-2 text-6xl md:text-7xl lg:text-[96px]">
            into
          </span>{" "}
          a song.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-7 max-w-2xl text-center text-base font-light text-zinc-300 md:text-xl"
          data-testid="hero-sub"
        >
          Custom songs made from real memories, real emotions, and the moments
          that matter most to you. Written, composed, and produced from scratch.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-whatsapp-cta"
            className="glow-btn group inline-flex items-center gap-3 rounded-full bg-[#E2B365] px-7 py-4 text-sm font-semibold text-black md:px-8 md:text-base"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
              aria-hidden
            >
              <path d="M12.04 2.003a9.97 9.97 0 0 0-8.52 15.12l-1.5 5.47 5.62-1.47a9.97 9.97 0 1 0 4.4-19.12Zm5.8 14.2c-.25.7-1.44 1.33-2 1.4-.52.06-1.17.09-1.88-.12-.44-.14-1-.33-1.73-.65-3.05-1.32-5.04-4.39-5.19-4.59-.15-.2-1.24-1.65-1.24-3.15s.78-2.23 1.06-2.54c.28-.31.61-.39.81-.39.2 0 .41.002.59.01.19.007.44-.07.69.52.25.6.84 2.07.92 2.22.08.15.13.32.03.52-.1.2-.15.31-.3.48-.15.17-.32.38-.46.51-.15.14-.31.3-.13.6.18.31.79 1.3 1.7 2.11 1.17 1.03 2.16 1.35 2.47 1.5.31.15.49.13.67-.08.18-.2.77-.89.98-1.19.2-.31.41-.25.69-.15.28.1 1.77.84 2.07 1 .3.15.49.23.56.36.08.13.08.77-.16 1.47Z"></path>
            </svg>
            Request your song on WhatsApp
          </a>

          <a
            href="#songs"
            data-testid="hero-listen-cta"
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-medium text-white backdrop-blur-xl transition-all hover:border-white/30 hover:bg-white/10 md:text-base"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
              <Play className="h-3.5 w-3.5 fill-white text-white" />
            </span>
            Listen to songs
          </a>
        </motion.div>

        {/* Small meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mt-16 flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-zinc-500"
        >
          <span>Birthdays</span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span>Anniversaries</span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span>Weddings</span>
          <span className="hidden h-1 w-1 rounded-full bg-zinc-600 sm:block" />
          <span className="hidden sm:inline">Tributes</span>
        </motion.div>
      </div>

      <HeroWaveform />
    </section>
  );
}
