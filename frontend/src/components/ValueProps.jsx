import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Gift, Heart, Infinity as InfinityIcon, PenTool, Sparkles } from "lucide-react";

const items = [
  {
    title: "Immortalize the memory",
    body: "Long after the cake is eaten and the confetti is gone, this is what they'll still be playing on lonely drives and quiet anniversaries.",
    icon: InfinityIcon,
    num: "01",
  },
  {
    title: "Perfect gifting",
    body: "For the person who has everything. For the occasion you refuse to forget.",
    icon: Gift,
    num: "02",
  },
  {
    title: "100% custom lyrics",
    body: "Every line written for one specific story. No templates. No recycling.",
    icon: PenTool,
    num: "03",
  },
  {
    title: "Studio-grade production",
    body: "Recorded, mixed, and mastered in a real studio. Not a bedroom demo.",
    icon: Sparkles,
    num: "04",
  },
  {
    title: "Emotional impact, guaranteed",
    body: "Most recipients cry. A few laugh. Nobody forgets.",
    icon: Heart,
    num: "05",
  },
];

export default function ValueProps() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-60, 140]),
    { stiffness: 100, damping: 30 }
  );
  const ghostX = useSpring(
    useTransform(scrollYProgress, [0, 1], [120, -120]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section
      id="benefits"
      ref={ref}
      data-testid="value-proposition-section"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Parallax bg */}
      <motion.div
        style={prefersReduced ? undefined : { y: bgY }}
        className="absolute inset-0 z-0 opacity-25"
      >
        <div className="duotone-red-wrap absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?crop=entropy&cs=tinysrgb&fit=crop&w=2000&q=85"
            alt=""
            className="duotone-red absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(220,38,38,0.16),transparent_60%)]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#080202]/32 via-transparent to-[#080202]/48" />

      {/* Ghost chapter text */}
      <motion.div
        aria-hidden
        style={prefersReduced ? undefined : { x: ghostX }}
        className="pointer-events-none absolute right-0 top-[20%] z-10 hidden md:block"
      >
        <div className="ghost-text text-[16vw] leading-none opacity-40">
          BENEFITS
        </div>
      </motion.div>

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-6 py-24 md:px-10 md:py-32">

        {/* Header */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-archivo text-[11px] uppercase tracking-[0.4em] text-[#ff5722]"
        >
          Chapter 04 — Why It Matters
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          data-testid="value-headline"
          className="font-display mt-6 text-[12vw] font-black leading-[0.88] tracking-[-0.03em] text-white md:text-[7vw] lg:text-[7rem]"
        >
          NOT ANOTHER
          <br />
          <span className="text-ember">ORDINARY</span> GIFT.
        </motion.h2>

        {/* Horizontal scroll track */}
        <div className="mt-16 -mx-6 md:-mx-10">
          {/* Scroll hint fade edges */}
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-black/40 to-transparent" />

            <div
              ref={trackRef}
              className="flex overflow-x-auto gap-0 px-6 md:px-10 pb-6 scrollbar-hide"
              style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
            >
              {items.map((it, i) => {
                const Icon = it.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.9,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    data-testid={`value-card-${i + 1}`}
                    className="group flex-shrink-0 flex flex-col justify-between"
                    style={{
                      width: "clamp(280px, 36vw, 440px)",
                      scrollSnapAlign: "start",
                      paddingRight: i < items.length - 1 ? "0" : "0",
                    }}
                  >
                    {/* Vertical divider + content */}
                    <div className="flex gap-6 pr-10 md:pr-14">
                      {/* Left: number + vertical line */}
                      <div className="flex flex-col items-center pt-1 flex-shrink-0">
                        <span
                          className="font-archivo text-[10px] tracking-[0.3em] font-semibold"
                          style={{ color: "rgba(255,87,34,0.7)" }}
                        >
                          {it.num}
                        </span>
                        <div
                          className="mt-3 w-px flex-1 min-h-[120px]"
                          style={{
                            background:
                              "linear-gradient(to bottom, rgba(255,87,34,0.6), rgba(255,255,255,0.04))",
                          }}
                        />
                      </div>

                      {/* Right: icon + text */}
                      <div className="flex flex-col pb-4">
                        <div
                          className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110"
                          style={{
                            background: "rgba(255,87,34,0.12)",
                            color: "#ff5722",
                            border: "1px solid rgba(255,87,34,0.2)",
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <h3
                          className="font-display text-xl font-black leading-tight text-white md:text-2xl"
                          style={{ letterSpacing: "-0.02em" }}
                        >
                          {it.title}
                        </h3>

                        <p
                          className="font-archivo mt-3 text-sm leading-relaxed md:text-base"
                          style={{ color: "rgba(255,255,255,0.55)", maxWidth: "26ch" }}
                        >
                          {it.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Scroll progress dots */}
          <div className="flex gap-1.5 px-6 md:px-10 mt-2">
            {items.map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                className="h-px origin-left"
                style={{
                  width: i === 0 ? "32px" : "12px",
                  background: i === 0 ? "#ff5722" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}