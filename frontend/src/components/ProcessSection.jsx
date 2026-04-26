import { useEffect, useRef, useState } from "react";
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
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG11c2ljfGVufDB8fDB8fHww",
    title: "Sharing Your Story",
  },
  {
    label: "The writing",
    num: "02",
    description:
      "Our lyricists and composers transform your narrative into compelling words and melodies, capturing your story in a unique musical form.",
    image:
      "https://images.unsplash.com/photo-1586095087956-bc66fe634955?q=80&w=766&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Writing",
  },
  {
    label: "The music",
    num: "03",
    description:
      "We compose and arrange the music, ensuring every note and instrument reflects your story and emotions.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    title: "The Music",
  },
  {
    label: "The reaction",
    num: "04",
    description:
      "You listen to your custom song for the first time, experiencing your story in a new, unforgettable way.",
    image:
      "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljfGVufDB8fDB8fHww",
    title: "The Reaction",
  },
  {
    label: "Your turn",
    num: "05",
    description:
      "Share your song with loved ones, celebrate your moments, and cherish your story forever.",
    image:
      "https://images.unsplash.com/photo-1642559732916-347fab27cdca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDc4fHx8ZW58MHx8fHx8",
    title: "Your Turn",
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplaying, setIsAutoplaying] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const ghostX = useSpring(useTransform(scrollYProgress, [0, 1], [-50, 50]), {
    stiffness: 140,
    damping: 45,
    mass: 0.3,
  });
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const frameFeedback = useTransform(frameIndex, (idx) => {
    return Math.sin(idx * 0.1) * 0.2 + 0.8;
  });

  useEffect(() => {
    if (!isAutoplaying || prefersReduced) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STEPS.length);
    }, 2400);

    return () => clearInterval(timer);
  }, [isAutoplaying, prefersReduced]);

  const goToStep = (index) => {
    setActiveIndex(index);
    setIsAutoplaying(false);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + STEPS.length) % STEPS.length);
    setIsAutoplaying(false);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % STEPS.length);
    setIsAutoplaying(false);
  };

  const activeStep = STEPS[activeIndex];

  return (
    <section
      id="process"
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-x-hidden bg-transparent py-10 sm:py-12 lg:py-0"
    >
      <motion.div
        aria-hidden
        style={prefersReduced ? undefined : { x: ghostX }}
        className="pointer-events-none absolute left-0 top-[10%] z-10 hidden md:block"
      >
        <div className="ghost-text text-[14vw] leading-none opacity-30 select-none">
          PROCESS
        </div>
      </motion.div>

      <div className="section-container relative z-20">
        <motion.div
          style={prefersReduced ? undefined : { opacity: frameFeedback }}
          className="pointer-events-none absolute right-4 top-0 font-mono text-[10px] text-[#ff5722]/60 sm:right-6"
        >
          FRAME <motion.span>{frameIndex}</motion.span>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="chapter-label"
          style={{ color: "#ff5722" }}
        >
          Chapter 03 - The Journey
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-3 text-[clamp(2.45rem,10vw,4.8rem)] font-black leading-[0.88] tracking-[-0.03em] text-white md:text-[clamp(4rem,6vw,5.8rem)]"
        >
          The Journey
          <br />
          <span className="text-ember">Of </span>Your Song.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-6 overflow-visible md:mt-8"
          style={{ perspective: "1200px" }}
        >
          <div className="absolute left-0 top-0 z-30 flex items-center gap-3">
            <span className="font-archivo text-[11px] uppercase tracking-[0.35em] text-[#ffcfaa]">
              Step {activeStep.num}
            </span>
            <div className="h-px w-12 bg-[#ff5722]/50" />
          </div>

          <div className="absolute right-0 z-30 flex gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-sm text-white transition-all duration-300 hover:border-[#ffb980]/50 hover:bg-[#ff5722]/20"
              aria-label="Previous journey step"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-sm text-white transition-all duration-300 hover:border-[#ffb980]/50 hover:bg-[#ff5722]/20"
              aria-label="Next journey step"
            >
              Next
            </button>
          </div>

          <div className="grid min-h-0 items-center gap-6 pt-14 md:h-[62vh] md:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] md:gap-8 md:pt-10">
            <div className="relative h-[340px] overflow-visible md:h-full">
              {STEPS.map((step, index) => {
                const totalCards = STEPS.length;
                const rawAngle = (index - activeIndex) * (360 / totalCards);
                const normalizedAngle =
                  rawAngle < -180 ? rawAngle + 360 : rawAngle > 180 ? rawAngle - 360 : rawAngle;
                const isActive = index === activeIndex;
                const angleInRadians = (normalizedAngle * Math.PI) / 180;
                const radius = 160;
                const xOffset = Math.sin(angleInRadians) * radius;
                const yOffset = Math.cos(angleInRadians) * radius + 60;
                const zOffset = Math.cos(angleInRadians) * 90;
                const scale = isActive ? 1.08 : 0.7 + Math.cos(angleInRadians) * 0.18;
                const opacity = isActive ? 1 : Math.max(0.42, 0.68 + Math.cos(angleInRadians) * 0.2);

                return (
                  <motion.button
                    type="button"
                    key={step.num}
                    initial={false}
                    animate={{ x: xOffset, y: yOffset, z: zOffset, scale, opacity }}
                    transition={{ type: "spring", stiffness: 82, damping: 23, mass: 1 }}
                    onClick={() => goToStep(index)}
                    className={`absolute left-1/2 top-[44%] block -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.4rem] text-left transition-shadow duration-300 ${
                      isActive
                        ? "h-[250px] w-[198px] md:h-[330px] md:w-[264px]"
                        : "h-[170px] w-[138px] md:h-[225px] md:w-[182px]"
                    }`}
                    style={{
                      zIndex: isActive ? 1000 : Math.round((120 + zOffset) / 2),
                      transformStyle: "preserve-3d",
                      border: isActive
                        ? "1px solid rgba(255,185,128,0.72)"
                        : "1px solid rgba(255,255,255,0.14)",
                      boxShadow: isActive
                        ? "0 42px 90px -28px rgba(255,87,34,0.55), 0 30px 70px rgba(0,0,0,0.55)"
                        : "0 18px 46px rgba(0,0,0,0.36)",
                    }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080202] via-[#080202]/35 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <span className="font-archivo text-[10px] font-semibold uppercase tracking-[0.32em] text-[#ffb980]">
                        {step.num} / {step.label}
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-black leading-tight text-white md:text-3xl">
                        {step.title}
                      </h3>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              key={activeStep.num}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 max-w-xl"
            >
              <span className="font-archivo text-[12px] font-semibold uppercase tracking-[0.4em] text-[#ffb980] md:text-sm">
                {activeStep.num} / {activeStep.label}
              </span>
              <h3 className="mt-4 font-display text-[clamp(2.6rem,9vw,4rem)] font-black leading-[0.9] text-white md:text-[clamp(3.5rem,5vw,5rem)]">
                {activeStep.title}
              </h3>
              <p className="mt-5 font-archivo text-base leading-relaxed text-white/70 md:text-lg lg:text-xl">
                {activeStep.description}
              </p>
              <div className="mt-6 flex w-fit items-center gap-3 rounded-full border border-[#ffb980]/25 bg-black/25 px-4 py-2">
                {STEPS.map((step, index) => (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => goToStep(index)}
                    aria-label={`Go to ${step.title}`}
                    className="h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: index === activeIndex ? 34 : 10,
                      background: index === activeIndex ? "#ffb980" : "rgba(255,255,255,0.28)",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
