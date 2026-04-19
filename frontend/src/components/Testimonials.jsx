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
      id="testimonials"
      data-testid="testimonials-section"
      className="relative overflow-hidden bg-crimson px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="font-archivo text-sm text-white/80 md:text-base">
              Testimonials
            </span>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1 }}
              data-testid="testimonials-headline"
              className="font-display text-[9vw] font-black leading-[0.95] tracking-[-0.03em] text-white md:text-[5.6vw] lg:text-[4.8rem]"
            >
              REACTIONS THAT <span className="text-ember">KEEP</span>
              <br />
              ME GOING.
            </motion.h2>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <div className="relative mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#1a0303]/70 p-8 backdrop-blur-xl md:p-14">
            <Quote className="absolute left-8 top-8 h-10 w-10 text-[#ff5722]/40 md:h-14 md:w-14" />

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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff5722] text-sm font-semibold text-black">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-archivo text-base font-medium text-white">
                      {t.name}
                    </div>
                    <div className="font-archivo text-xs uppercase tracking-[0.25em] text-white/50">
                      {t.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              onClick={prev}
              data-testid="testimonial-prev"
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:border-[#ff5722] hover:text-[#ff5722]"
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
                      ? "w-8 bg-[#ff5722]"
                      : "w-1.5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              data-testid="testimonial-next"
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:border-[#ff5722] hover:text-[#ff5722]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
