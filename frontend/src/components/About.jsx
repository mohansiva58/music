import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ARTIST } from "../lib/content";

/* About — full-bleed hero-level chapter
   - Full-height background portrait (duotone red)
   - Huge "WITH / SOULNOTE" typography overlaid
   - Scroll-driven parallax (bg zoom, text translate) matching hero language
*/
export default function About() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1.15, 1]),
    { stiffness: 100, damping: 30 }
  );
  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-80, 80]),
    { stiffness: 100, damping: 30 }
  );
  const textY = useSpring(
    useTransform(scrollYProgress, [0, 1], [80, -80]),
    { stiffness: 100, damping: 30 }
  );
  const ghostX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-120, 120]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section
      id="about"
      ref={ref}
      data-testid="about-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#080202]"
    >
      {/* Full-bleed parallax bg portrait */}
      <motion.div
        style={prefersReduced ? undefined : { scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div className="duotone-red-wrap absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?crop=entropy&cs=tinysrgb&fit=crop&w=2000&q=85"
            alt=""
            className="duotone-red absolute inset-0 h-full w-full object-cover object-[center_25%]"
            loading="lazy"
          />
        </div>
        {/* Smoke-edge fades */}
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#080202] via-[#080202]/60 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#080202]/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#080202] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#080202] to-transparent" />
      </motion.div>

      {/* Ghost text drifting */}
      <motion.div
        aria-hidden
        style={prefersReduced ? undefined : { x: ghostX }}
        className="pointer-events-none absolute inset-0 z-10 flex items-center"
      >
        <div
          className="ghost-text text-[22vw] leading-none opacity-60"
          style={{ transform: "translateX(-8%)" }}
        >
          CHAPTER·01
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={prefersReduced ? undefined : { y: textY }}
        className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-6 py-24 md:px-10"
      >
        {/* Chapter label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-archivo mb-6 text-[11px] uppercase tracking-[0.4em] text-[#ff5722]"
        >
          Chapter 01 — The Story
        </motion.span>

        {/* With + SOULNOTE (stacked, left-aligned) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3"
        >
          <span className="font-script text-5xl text-white md:text-7xl">
            With
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          data-testid="about-headline"
          className="font-display text-[18vw] font-black leading-[0.82] tracking-[-0.04em] text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.8)] md:text-[13vw] lg:text-[11rem]"
        >
          {ARTIST.brand.toUpperCase()}
        </motion.h2>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-archivo mt-10 max-w-xl text-base leading-relaxed text-white/90 md:text-xl"
        >
          inspiration transforms into sound — every memory, every emotion,
          every story becoming something you can truly{" "}
          <span className="text-ember font-semibold">hear, feel, and keep.</span>
        </motion.p>
      </motion.div>
    </section>
  );
}
