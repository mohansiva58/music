import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { waLink } from "../lib/content";
import { useEffect, useState } from "react";

const FINAL_CTA_FRAME_COUNT = 112;

function getFinalCtaFrameSrc(index) {
  const frame = String(index + 1).padStart(3, "0");
  return `/finalcta/ezgif-frame-${frame}.jpg`;
}

export default function FinalCTA() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const [frameIndex, setFrameIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.25,
  });
  const ghostY = useSpring(
    useTransform(scrollYProgress, [0, 1], [30, -30]),
    { stiffness: 140, damping: 45, mass: 0.3 }
  );

  useEffect(() => {
    const preload = [0, 1, 2, 8, 16, 32, 48, 64, 80, 96, 111];
    preload.forEach((index) => {
      const image = new Image();
      image.src = getFinalCtaFrameSrc(index);
    });
  }, []);

  useMotionValueEvent(smoothedProgress, "change", (latest) => {
    if (prefersReduced) return;
    const nextFrame = Math.min(
      FINAL_CTA_FRAME_COUNT - 1,
      Math.max(0, Math.round(latest * (FINAL_CTA_FRAME_COUNT - 1)))
    );
    setFrameIndex(nextFrame);
  });

  return (
    <section
      ref={ref}
      data-testid="final-cta-section"
      className="relative min-h-[120svh] w-full overflow-hidden"
    >
      {/* Scroll-smoothed frame background */}
      <img
        src={getFinalCtaFrameSrc(prefersReduced ? 0 : frameIndex)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Ghost "FINALE" text — floats over the video background */}
      <motion.div
        aria-hidden
        style={prefersReduced ? undefined : { y: ghostY }}
        className="pointer-events-none absolute left-1/2 top-[8%] z-10 hidden -translate-x-1/2 md:block"
      >
        <div className="ghost-text text-[18vw] leading-none opacity-20">
          FINALE
        </div>
      </motion.div>

      <div className="relative z-20 mx-auto flex min-h-[120svh] max-w-[1400px] flex-col items-center justify-center px-6 py-24 text-center md:px-10 md:py-32">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-archivo text-[11px] uppercase tracking-[0.4em] text-[#ff5722]"
        >
          Your Turn
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          data-testid="final-cta-headline"
          className="font-display mt-6 max-w-5xl text-[12vw] font-black leading-[0.88] tracking-[-0.04em] text-white drop-shadow-[0_10px_50px_rgba(0,0,0,0.6)] md:text-[7vw] lg:text-[8rem]"
        >
          TURN YOUR STORY
          <br />
          INTO{" "}
          <span className="text-ember">SOMETHING</span>
          <br />
          UNFORGETTABLE.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-archivo mx-auto mt-10 max-w-xl text-base text-white/90 md:text-lg"
        >
          One message. Share the occasion, the person, the emotion — and I'll
          take it from there.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
        >
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="final-cta-whatsapp"
            className="group inline-flex items-center gap-6 rounded-full bg-white px-8 py-5 font-archivo text-base font-semibold text-[#0a0202] transition-all hover:bg-[#ff5722] hover:text-white"
          >
            <span>Request Your Song on WhatsApp</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a0202] text-white transition-all group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#ff5722]">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
          <a
            href="#songs"
            className="font-archivo flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/75 transition-colors hover:text-white"
            data-testid="final-cta-listen"
          >
            or listen to songs first
            <ArrowRight className="h-3 w-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
