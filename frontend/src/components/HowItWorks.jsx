import { motion } from "framer-motion";

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
  return (
    <section
      id="process"
      data-testid="how-it-works-section"
      className="relative overflow-hidden bg-[#450505] bg-crimson px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* ====== Top: label + big heading ====== */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="font-archivo text-sm text-white/80 md:text-base">
              How It Works
            </span>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              data-testid="how-it-works-headline"
              className="font-display text-[9vw] font-black leading-[0.95] tracking-[-0.03em] text-white md:text-[5.8vw] lg:text-[5rem]"
            >
              CREATE <span className="text-ember">MUSIC</span> FROM
              <br />
              YOUR IMAGINATION
            </motion.h2>
          </div>
        </div>

        {/* ====== Steps list + creator card ====== */}
        <div className="mt-20 grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-9">
            <div className="flex flex-col gap-14">
              {steps.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  data-testid={`process-step-${s.id}`}
                  className="grid grid-cols-12 gap-6 border-b border-white/10 pb-8 last:border-0"
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-archivo text-5xl font-light text-white/75 md:text-6xl">
                      {s.id}.
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-11">
                    <h3 className="font-archivo text-lg font-semibold text-[#ff5722] md:text-xl">
                      {s.title}
                    </h3>
                    <p className="font-archivo mt-3 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                      {s.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Creator community card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.2 }}
            data-testid="creator-community-card"
            className="md:col-span-3"
          >
            <div className="overflow-hidden rounded-xl bg-[#2a0404] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <div className="duotone-red-wrap relative h-56">
                <img
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?crop=entropy&cs=tinysrgb&fit=crop&w=600&q=85"
                  alt=""
                  className="duotone-red absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
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
                      className="h-7 w-7 rounded-full border-2 border-[#2a0404] object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="mt-3 font-archivo text-base font-semibold leading-tight text-white">
                  150+ stories already
                  <br />
                  turned into songs
                </div>
                <p className="mt-2 font-archivo text-[11px] leading-relaxed text-white/65">
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
