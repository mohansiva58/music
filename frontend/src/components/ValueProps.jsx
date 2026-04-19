import { motion } from "framer-motion";
import { Gift, Heart, Infinity as InfinityIcon, PenTool, Sparkles } from "lucide-react";

const items = [
  {
    title: "Immortalize the memory",
    body: "A song lives forever. Long after the cake is eaten and the confetti is gone, this is the thing they'll play on anniversaries, birthdays, and quiet drives home.",
    icon: InfinityIcon,
    span: "md:col-span-7 md:row-span-2",
  },
  {
    title: "Perfect gifting",
    body: "For the person who has everything. For the occasion you don't want to forget.",
    icon: Gift,
    span: "md:col-span-5",
  },
  {
    title: "100% custom lyrics",
    body: "Every line written for one specific story. No templates. No recycled verses.",
    icon: PenTool,
    span: "md:col-span-5",
  },
  {
    title: "Studio-grade production",
    body: "Recorded and mixed in a real studio. Not a bedroom demo.",
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
  return (
    <section
      data-testid="value-proposition-section"
      className="relative px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#E2B365]">
            Why a personalized song
          </span>
          <h2
            className="font-display mt-4 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl"
            data-testid="value-headline"
          >
            Not another{" "}
            <span className="font-script text-gold-gradient">
              ordinary
            </span>{" "}
            gift.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-12">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                data-testid={`value-card-${i + 1}`}
                className={`glass group relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:border-white/20 md:p-10 ${it.span}`}
              >
                <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[#E2B365]/5 blur-3xl transition duration-700 group-hover:bg-[#E2B365]/15" />
                <div className="relative">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E2B365]/30 bg-[#E2B365]/10 text-[#E2B365]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl font-medium text-white md:text-3xl">
                    {it.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400 md:text-base">
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
