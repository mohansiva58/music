import { motion } from "framer-motion";
import { MessageSquare, Wand2, Music, Download } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Share your story",
    icon: MessageSquare,
    body: "Tap WhatsApp and tell me everything — the occasion, the people, the memories, the emotions. The more specific, the better.",
  },
  {
    id: "02",
    title: "Shape the vibe",
    icon: Wand2,
    body: "We agree on a tone, tempo, and direction. I'll share a quote, timeline, and reference tracks so you know exactly what's coming.",
  },
  {
    id: "03",
    title: "Studio magic",
    icon: Music,
    body: "Lyrics get written. A melody is born. I record vocals, layer instruments, and produce the full arrangement in a real studio.",
  },
  {
    id: "04",
    title: "Your song arrives",
    icon: Download,
    body: "You receive a studio-grade master and lyric sheet on WhatsApp. Gift it, play it at the moment, or keep it forever.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="process"
      data-testid="how-it-works-section"
      className="relative px-6 py-24 md:px-12 md:py-32"
    >
      <div className="absolute inset-0 radial-gold opacity-40" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#E2B365]">
            The process
          </span>
          <h2
            className="font-display mt-4 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl"
            data-testid="how-it-works-headline"
          >
            From a voice note to a{" "}
            <span className="font-script text-gold-gradient">finished</span>{" "}
            song.
          </h2>
          <p className="mt-5 text-base text-zinc-400 md:text-lg">
            Four steps. Most of it happens while you go about your day.
          </p>
        </div>

        <div className="relative mt-20">
          {/* Vertical glowing line (desktop) */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-[#E2B365]/40 to-transparent" />
          </div>

          <div className="flex flex-col gap-10 md:gap-16">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  data-testid={`process-step-${idx + 1}`}
                  className={`relative grid items-center gap-6 md:grid-cols-2 md:gap-16 ${
                    isEven ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  {/* Step card */}
                  <div
                    className={`glass-strong rounded-3xl p-8 md:p-10 ${
                      isEven ? "md:mr-6" : "md:ml-6"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#E2B365]/15 text-[#E2B365]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-display text-xs uppercase tracking-[0.3em] text-[#E2B365]">
                          Step {s.id}
                        </div>
                        <h3 className="font-display mt-1 text-2xl font-medium text-white md:text-3xl">
                          {s.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dot on center line */}
                  <div className="hidden md:flex md:items-center md:justify-center">
                    <div className="relative">
                      <div className="absolute -inset-4 rounded-full bg-[#E2B365]/20 blur-xl" />
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#E2B365]/40 bg-black">
                        <span className="font-display text-sm font-semibold text-[#E2B365]">
                          {s.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
