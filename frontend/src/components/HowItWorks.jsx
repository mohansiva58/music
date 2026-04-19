import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const steps = [
  {
    id: "1",
    title: "Share Your Story",
    body: "Tell us the occasion, the people, the feelings. Every song starts with a real conversation on WhatsApp — no forms, no templates.",
  },
  {
    id: "2",
    title: "Instant Direction",
    body: "Within hours you receive a clear scope, timeline, and reference tracks — so you know exactly what your song will feel like before a single note is written.",
  },
  {
    id: "3",
    title: "Studio Delivery",
    body: "Lyrics, melody, arrangement, and full studio production — shaped around your mood, tempo, and story. Then delivered as a finished, keep-forever song.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, 1.15]),
    { stiffness: 100, damping: 30 }
  );
  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-60, 120]),
    { stiffness: 100, damping: 30 }
  );
  const ghostY = useSpring(
    useTransform(scrollYProgress, [0, 1], [80, -80]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section
      id="process"
      ref={ref}
      data-testid="how-it-works-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-crimson"
    >
      {/* Parallax background imagery */}
      <motion.div
        style={prefersReduced ? undefined : { scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 opacity-35"
      >
        <div className="duotone-red-wrap absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516280906200-dfcb5f7c8cb1?crop=entropy&cs=tinysrgb&fit=crop&w=2000&q=85"
            alt=""
            className="duotone-red absolute inset-0 h-full w-full object-cover object-[center_30%]"
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* Radial color wash */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(220,38,38,0.45),transparent_60%)]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#450505]/40 to-[#080202]" />

      {/* Ghost chapter text */}
      <motion.div
        aria-hidden
        style={prefersReduced ? undefined : { y: ghostY }}
        className="pointer-events-none absolute left-0 top-[12%] z-10 hidden md:block"
      >
        <div className="ghost-text text-[14vw] leading-none opacity-50">
          PROCESS
        </div>
      </motion.div>

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-6 py-24 md:px-10 md:py-32">
        {/* Chapter label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-archivo mb-6 text-[11px] uppercase tracking-[0.4em] text-[#ff5722]"
        >
          Chapter 02 — How It Works
        </motion.span>

        {/* Big split headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          data-testid="how-it-works-headline"
          className="font-display text-[11vw] font-black leading-[0.88] tracking-[-0.03em] text-white md:text-[6.5vw] lg:text-[6.5rem]"
        >
          CREATE <span className="text-ember">MUSIC</span>
          <br />
          FROM YOUR
          <br />
          IMAGINATION.
        </motion.h2>

        {/* Steps + sticky card */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <div className="flex flex-col gap-10">
              {steps.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  data-testid={`process-step-${s.id}`}
                  className="group relative grid grid-cols-12 gap-4 border-b border-white/15 pb-8 transition-all hover:border-[#ff5722]/50"
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-display text-4xl font-black text-white/75 transition-colors group-hover:text-[#ff5722] md:text-5xl">
                      {s.id}.
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-11">
                    <h3 className="font-archivo text-lg font-semibold text-[#ff5722] md:text-xl">
                      {s.title}
                    </h3>
                    <p className="font-archivo mt-2 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
                      {s.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Creator community card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            data-testid="creator-community-card"
            className="md:col-span-4"
          >
            <div className="overflow-hidden rounded-2xl bg-[#1a0303] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
              <div className="duotone-red-wrap relative h-64">
                <img
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=crop&w=800&q=85"
                  alt=""
                  className="duotone-red absolute inset-0 h-full w-full object-cover object-[center_25%]"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=85",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=85",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=85",
                  ].map((u, i) => (
                    <img
                      key={i}
                      src={u}
                      alt=""
                      className="h-8 w-8 rounded-full border-2 border-[#1a0303] object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="font-archivo mt-4 text-lg font-semibold leading-tight text-white">
                  150+ stories already
                  <br />
                  turned into songs
                </div>
                <p className="font-archivo mt-3 text-xs leading-relaxed text-white/65">
                  A growing circle of couples, families, and friends ordering
                  custom songs since 2025.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
