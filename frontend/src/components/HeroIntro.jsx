import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/*
 * HeroIntro
 * Phase 1: fullscreen cinematic intro video
 * Phase 2: premium hero reveal with image background + delayed content fade-in
 */
export default function HeroIntro({
  introVideoSrc = "/entry2.mp4",
  ctaHref = "#contact",
  onComplete,
}) {
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);

  const finishIntro = useCallback(() => {
    setIsIntroPlaying((prev) => {
      if (!prev) return prev;
      if (typeof onComplete === "function") onComplete();
      return false;
    });
  }, [onComplete]);

  // Shared easing + durations tuned for premium, non-jarring transitions.
  const timing = useMemo(
    () => ({
      ease: [0.42, 0, 0.58, 1], // easeInOut
      switchDuration: 1.0,
    }),
    []
  );

  useEffect(() => {
    if (!isIntroPlaying) return;

    const skipIntro = () => finishIntro();
    const onScroll = () => {
      if (window.scrollY > 0) skipIntro();
    };

    // Skip intro as soon as the user intends to navigate.
    window.addEventListener("wheel", skipIntro, { passive: true });
    window.addEventListener("touchmove", skipIntro, { passive: true });
    window.addEventListener("keydown", skipIntro);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", skipIntro);
      window.removeEventListener("touchmove", skipIntro);
      window.removeEventListener("keydown", skipIntro);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isIntroPlaying, finishIntro]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black" id="top">
      <AnimatePresence mode="wait">
        {isIntroPlaying ? (
          <motion.div
            key="intro-video"
            className="absolute inset-0 z-20"
            initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: "blur(8px)",
              transition: {
                duration: timing.switchDuration,
                ease: timing.ease,
              },
            }}
          >
            <video
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={finishIntro}
              className="h-full w-full object-cover"
            >
              <source src={introVideoSrc} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/35" />
            <motion.div
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: timing.ease },
              }}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-white/70 sm:text-sm">
                  Chapter 01
                </p>
                <h2 className="mt-4 font-serif-display text-3xl text-white/95 sm:text-4xl md:text-5xl">
                  Every Memory Has a Melody
                </h2>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="hero-content"
            className="absolute inset-0 z-10"
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              transition: {
                duration: timing.switchDuration,
                ease: timing.ease,
              },
            }}
            exit={{ opacity: 0 }}
          >
            {/* Transparent content layer: video backdrop (hero2.mp4) remains visible */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/28 via-black/20 to-black/36" />

            <motion.div
              className="relative z-20 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.35,
                  duration: 0.8,
                  ease: timing.ease,
                },
              }}
            >
              <h1 className="font-serif-display text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
                Turn Your Story Into a Song
              </h1>
              <p className="mt-6 max-w-3xl text-base text-white/85 sm:text-lg md:text-xl">
                Custom songs created from your memories, emotions, and moments
              </p>
              <a
                href={ctaHref}
                className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black transition-transform duration-300 hover:scale-[1.03]"
              >
                Request Your Song
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
