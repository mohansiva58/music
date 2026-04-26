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
    useTransform(scrollYProgress, [0, 1], [-35, 80]),
    { stiffness: 140, damping: 45, mass: 0.3 }
  );
  const ghostX = useSpring(
    useTransform(scrollYProgress, [0, 1], [70, -70]),
    { stiffness: 140, damping: 45, mass: 0.3 }
  );

  return (
    <section
      id="benefits"
      ref={ref}
      data-testid="value-proposition-section"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/cta.mp4"
      />
      <div className="absolute inset-0 bg-black/50" />

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

      <div className="section-container section-pad relative z-20 flex min-h-[100svh] flex-col justify-center">

        {/* Header */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="chapter-label"
        >
          Chapter 04 — Why It Matters
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          data-testid="value-headline"
          className="font-display mt-5 text-[clamp(3rem,12vw,5rem)] font-black leading-[0.88] tracking-[-0.03em] text-white md:mt-6 md:text-[clamp(4.6rem,7vw,7rem)]"
        >
          NOT ANOTHER
          <br />
          <span className="text-ember">ORDINARY</span> GIFT.
        </motion.h2>

        {/* Horizontal scroll track */}
        <div className="mt-10 sm:mt-12 lg:mt-16">
          {/* Scroll hint fade edges */}
          <div className="relative">
            <div
              ref={trackRef}
              className="grid grid-cols-1 gap-6 pb-2 sm:grid-cols-2 lg:grid-cols-3"
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
                    className="group flex min-w-0 flex-col justify-between rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm"
                  >
                    {/* Vertical divider + content */}
                    <div className="flex gap-5">
                      {/* Left: number + vertical line */}
                      <div className="flex flex-col items-center pt-1 flex-shrink-0">
                        <span
                          className="font-archivo text-[10px] tracking-[0.3em] font-semibold"
                          style={{ color: "rgba(255,87,34,0.7)" }}
                        >
                          {it.num}
                        </span>
                        <div
                          className="mt-3 min-h-[96px] w-px flex-1"
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
                          style={{ color: "rgba(255,255,255,0.55)" }}
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
          <div className="mt-5 flex gap-1.5">
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
