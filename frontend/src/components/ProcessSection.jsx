import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const STEPS = [
  {
    label: "Your story",
    num: "01",
    description:
      "Our process begins with understanding you. We dive deep into your memories, emotions, and the unique narrative you want to express in song. This initial consultation forms the heart of your composition.",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    title: "Sharing Your Story",
  },
  {
    label: "The writing",
    num: "02",
    description:
      "Our lyricists and composers transform your narrative into compelling words and melodies, capturing your story in a unique musical form.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    title: "The Writing",
  },
  {
    label: "The music",
    num: "03",
    description:
      "We compose and arrange the music, ensuring every note and instrument reflects your story and emotions.",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    title: "The Music",
  },
  {
    label: "The reaction",
    num: "04",
    description:
      "You listen to your custom song for the first time, experiencing your story in a new, unforgettable way.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    title: "The Reaction",
  },
  {
    label: "Your turn",
    num: "05",
    description:
      "Share your song with loved ones, celebrate your moments, and cherish your story forever.",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    title: "Your Turn",
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-25, 60]),
    { stiffness: 140, damping: 45, mass: 0.3 }
  );
  const ghostX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-50, 50]),
    { stiffness: 140, damping: 45, mass: 0.3 }
  );

  // Micro-keyframe frame index (0-100 frames based on scroll)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Frame-based opacity changes for visual feedback
  const frameFeedback = useTransform(frameIndex, (idx) => {
    return Math.sin(idx * 0.1) * 0.2 + 0.8; // Subtle pulse per frame
  });

  return (
    <section
      id="process"
      ref={ref}
      className="relative w-full overflow-hidden bg-transparent py-24 md:py-36"
    >
      {/* Parallax background tint */}
      <motion.div
        style={prefersReduced ? undefined : { y: bgY }}
        className="absolute inset-0 z-0 opacity-20"
      >
        <img
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=2000&q=60"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(215,123,43,0.12),transparent_60%)]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#080202]/40 via-transparent to-[#080202]/40" />

      {/* Ghost text */}
      <motion.div
        aria-hidden
        style={prefersReduced ? undefined : { x: ghostX }}
        className="pointer-events-none absolute left-0 top-[10%] z-10 hidden md:block"
      >
        <div className="ghost-text text-[14vw] leading-none opacity-30 select-none">
          PROCESS
        </div>
      </motion.div>

      <div className="relative z-20 w-full px-8 md:px-16">
        {/* Micro-keyframe indicator */}
        <motion.div
          style={prefersReduced ? undefined : { opacity: frameFeedback }}
          className="absolute top-0 right-8 text-[10px] font-mono text-[#ff5722]/60 pointer-events-none"
        >
          FRAME <motion.span>{frameIndex}</motion.span>
        </motion.div>

        {/* Header */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-archivo text-[11px] uppercase tracking-[0.4em]"
          style={{ color: "#ff5722" }}
        >
          Chapter 03 — The Journey
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-6 text-[11vw] font-black leading-[0.88] tracking-[-0.03em] text-white md:text-[6vw] lg:text-[6rem]"
        >
          HOW YOUR
          <br />
          <span className="text-ember">SONG</span> GETS MADE.
        </motion.h2>

        {/* Steps */}
        <div className="mt-20 flex flex-col gap-0">
          {STEPS.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 80, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-10 md:gap-16 py-16 md:py-20`}
              >
                {/* Divider line between steps */}
                {i > 0 && (
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  />
                )}

                {/* Step number — large ghost */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute font-black select-none hidden md:block"
                  style={{
                    fontSize: "22vw",
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.025)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    letterSpacing: "-0.05em",
                    fontFamily: "var(--font-display, Georgia, serif)",
                  }}
                >
                  {step.num}
                </div>

                {/* Image side */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative w-full md:w-5/12 flex-shrink-0 overflow-hidden rounded-2xl"
                  style={{ aspectRatio: "4/3" }}
                >
                  {/* Grayscale + overlay */}
                  <img
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 h-full w-full object-cover grayscale opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-90"
                  />
                  {/* Tint overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(215,123,43,0.25) 0%, rgba(8,2,2,0.4) 100%)",
                    }}
                  />
                  {/* Step label badge */}
                  <div
                    className="absolute bottom-5 left-5 font-archivo text-[10px] uppercase tracking-[0.35em] px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(255,87,34,0.15)",
                      border: "1px solid rgba(255,87,34,0.35)",
                      color: "#ff7a50",
                    }}
                  >
                    {step.label}
                  </div>
                </motion.div>

                {/* Text side */}
                <div className="flex-1 flex flex-col">
                  {/* Number + line */}
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className="font-archivo text-[11px] tracking-[0.35em] font-semibold"
                      style={{ color: "rgba(255,87,34,0.7)" }}
                    >
                      {step.num}
                    </span>
                    <div
                      className="h-px flex-1 max-w-[48px]"
                      style={{ background: "rgba(255,87,34,0.4)" }}
                    />
                  </div>

                  <h3
                    className="font-display text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl mb-5"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="font-archivo text-base leading-relaxed md:text-lg"
                    style={{ color: "rgba(255,255,255,0.55)", maxWidth: "42ch" }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}