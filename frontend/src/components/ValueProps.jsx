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
    span: "md:col-span-7 md:row-span-2",
  },
  {
    title: "Perfect gifting",
    body: "For the person who has everything. For the occasion you refuse to forget.",
    icon: Gift,
    span: "md:col-span-5",
  },
  {
    title: "100% custom lyrics",
    body: "Every line written for one specific story. No templates. No recycling.",
    icon: PenTool,
    span: "md:col-span-5",
  },
  {
    title: "Studio-grade production",
    body: "Recorded, mixed, and mastered in a real studio. Not a bedroom demo.",
    icon: Sparkles,
    span: "md:col-span-6",
  },
  {
    title: "Emotional impact, guaranteed",
    body: "Most recipients cry. A few laugh. Nobody forgets.",
    icon: Heart,
    span: "md:col-span-6",
  },
];

export default function ValueProps() {
  const ref = useRef(null);
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

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-12">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                data-testid={`value-card-${i + 1}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-[#1a0303]/80 to-[#0a0101]/80 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 md:p-10 ${it.span}`}
              >
                <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#ff5722]/5 blur-3xl transition duration-700 group-hover:bg-[#ff5722]/25" />
                <div className="relative">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff5722]/10 text-[#ff5722]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl font-black leading-tight text-white md:text-3xl">
                    {it.title}
                  </h3>
                  <p className="font-archivo mt-3 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                    {it.body}
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
