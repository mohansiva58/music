import { motion } from "framer-motion";
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
  return (
    <section
      id="benefits"
      data-testid="value-proposition-section"
      className="relative overflow-hidden bg-[#080202] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="font-archivo text-sm text-white/70 md:text-base">
              Benefits
            </span>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1 }}
              data-testid="value-headline"
              className="font-display text-[9vw] font-black leading-[0.95] tracking-[-0.03em] text-white md:text-[5.6vw] lg:text-[4.8rem]"
            >
              NOT ANOTHER <span className="text-ember">ORDINARY</span>
              <br />
              GIFT.
            </motion.h2>
          </div>
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
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-[#1a0303] to-[#0a0101] p-8 transition-all duration-500 hover:border-[#ff5722]/40 md:p-10 ${it.span}`}
              >
                <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[#ff5722]/5 blur-3xl transition duration-700 group-hover:bg-[#ff5722]/20" />
                <div className="relative">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ff5722]/30 bg-[#ff5722]/10 text-[#ff5722]">
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
