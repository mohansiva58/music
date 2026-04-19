import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "../lib/content";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const t = TESTIMONIALS[index];

  return (
    <section
      data-testid="testimonials-section"
      className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32"
    >
      <div className="absolute inset-0 radial-gold opacity-50" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#E2B365]">
            In their own words
          </span>
          <h2
            className="font-display mt-4 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl"
            data-testid="testimonials-headline"
          >
            The{" "}
            <span className="font-script text-gold-gradient">reactions</span>{" "}
            that keep me going.
          </h2>
        </div>

        <div className="mt-16 md:mt-20">
          <div className="glass-strong relative mx-auto max-w-4xl rounded-3xl p-8 md:p-14">
            <Quote className="absolute left-8 top-8 h-10 w-10 text-[#E2B365]/30 md:h-14 md:w-14" />

            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                data-testid={`testimonial-${t.id}`}
              >
                <p className="font-display relative mt-6 text-2xl font-light leading-relaxed text-white md:text-3xl lg:text-[32px]">
                  “{t.quote}”
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E2B365] text-sm font-semibold text-black">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-base font-medium text-white">
                      {t.name}
                    </div>
                    <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                      {t.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              onClick={prev}
              data-testid="testimonial-prev"
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:border-[#E2B365] hover:text-[#E2B365]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2" data-testid="testimonial-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-8 bg-[#E2B365]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              data-testid="testimonial-next"
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:border-[#E2B365] hover:text-[#E2B365]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
