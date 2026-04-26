import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ARTIST } from "../lib/content";

/* About - full-bleed hero-level chapter
   - Shared video backdrop shows through
   - Huge "WITH / SOULNOTE" typography overlaid
   - Scroll-driven text motion matching hero language
*/
export default function About() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const ghostX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-70, 70]),
    { stiffness: 140, damping: 45, mass: 0.3 }
  );
  const textY = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, -50]),
    { stiffness: 140, damping: 45, mass: 0.3 }
  );

  return (
    <section
      id="about"
      ref={ref}
      data-testid="about-section"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Ghost text drifting */}
      <motion.div
        aria-hidden
        style={prefersReduced ? undefined : { x: ghostX }}
        className="pointer-events-none absolute inset-0 z-10 hidden items-center sm:flex"
      >
        <div
          className="ghost-text text-[22vw] leading-none opacity-60"
          style={{ transform: "translateX(-8%)" }}
        >
          CHAPTER.01
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={prefersReduced ? undefined : { y: textY }}
        className="section-container section-pad relative z-20 flex min-h-[100svh] flex-col justify-center"
      >
        {/* Chapter label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="chapter-label mb-5 sm:mb-6"
        >
          Chapter 01 - The Story
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
          className="font-display text-[clamp(4rem,18vw,9rem)] font-black leading-[0.82] tracking-[-0.04em] text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.8)] lg:text-[clamp(8rem,12vw,11rem)]"
        >
          {ARTIST.brand.toUpperCase()}
        </motion.h2>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-archivo mt-8 max-w-xl text-base leading-relaxed text-white/90 sm:mt-10 md:text-xl"
        >
          inspiration transforms into sound - every memory, every emotion,
          every story becoming something you can truly{" "}
          <span className="text-ember font-semibold">hear, feel, and keep.</span>
        </motion.p>
      </motion.div>
    </section>
  );
}
