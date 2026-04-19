import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "../lib/content";

export default function Testimonials() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;
  const t = TESTIMONIALS[index];
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1.1, 1]),
    { stiffness: 100, damping: 30 }
  );
  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-60, 80]),
    { stiffness: 100, damping: 30 }
  );
  const ghostX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-150, 150]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section
      id="testimonials"
      ref={ref}
      data-testid="testimonials-section"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Parallax background portrait */}
      <motion.div
        style={prefersReduced ? undefined : { scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 opacity-16"
      >
        <div className="duotone-red-wrap absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=crop&w=2000&q=85"
            alt=""
            className="duotone-red absolute inset-0 h-full w-full object-cover object-[center_30%]"
            loading="lazy"
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_30%,rgba(8,2,2,0.62)_95%)]" />

      <motion.div
        aria-hidden
        style={prefersReduced ? undefined : { x: ghostX }}
        className="pointer-events-none absolute left-0 top-[18%] z-10 hidden md:block"
      >
        <div className="ghost-text text-[15vw] leading-none opacity-40">
          STORIES
        </div>
      </motion.div>

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-6 py-24 md:px-10 md:py-32">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-archivo text-[11px] uppercase tracking-[0.4em] text-[#ff5722]"
        >
          Chapter 05 — In Their Words
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          data-testid="testimonials-headline"
          className="font-display mt-6 text-[12vw] font-black leading-[0.88] tracking-[-0.03em] text-white md:text-[7vw] lg:text-[7rem]"
        >
          REACTIONS THAT
          <br />
          <span className="text-ember">KEEP</span> ME GOING.
        </motion.h2>

        <div className="mt-16 flex flex-1 items-center">
          <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-white/15 bg-[#1a0303]/80 p-8 backdrop-blur-xl md:p-16">
            <Quote className="absolute left-8 top-8 h-12 w-12 text-[#ff5722]/40 md:h-20 md:w-20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                data-testid={`testimonial-${t.id}`}
              >
                <p className="font-display relative mt-8 text-3xl font-light leading-snug text-white md:text-4xl lg:text-5xl">
                  “{t.quote}”
                </p>
                <div className="mt-12 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff5722] text-base font-bold text-black">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-archivo text-lg font-semibold text-white">
                      {t.name}
                    </div>
                    <div className="font-archivo text-xs uppercase tracking-[0.3em] text-white/60">
                      {t.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-14 flex items-center justify-between">
              <button
                onClick={prev}
                data-testid="testimonial-prev"
                className="group flex items-center gap-3 font-archivo text-xs uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-[#ff5722]"
              >
                <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                Previous
              </button>
              <div className="flex items-center gap-2" data-testid="testimonial-dots">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-10 bg-[#ff5722]" : "w-1.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                data-testid="testimonial-next"
                className="group flex items-center gap-3 font-archivo text-xs uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-[#ff5722]"
              >
                Next
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
