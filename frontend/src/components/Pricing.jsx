import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PRICING, waLink } from "../lib/content";

export default function Pricing() {
  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="relative overflow-hidden bg-[#080202] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="font-archivo text-sm text-white/70 md:text-base">
              Pricing
            </span>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1 }}
              data-testid="pricing-headline"
              className="font-display text-[9vw] font-black leading-[0.95] tracking-[-0.03em] text-white md:text-[5.6vw] lg:text-[4.8rem]"
            >
              STARTS AT <span className="text-ember">₹2,999</span>.
              <br />
              SCALES WITH YOUR STORY.
            </motion.h2>
            <p className="font-archivo mt-6 max-w-xl text-base text-white/60 md:text-lg">
              Final quote depends on length, production complexity, and
              delivery timeline. Exact pricing is confirmed on WhatsApp.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {PRICING.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              data-testid={`pricing-card-${p.name.toLowerCase()}`}
              className={`relative flex flex-col rounded-2xl p-8 md:p-10 ${
                p.featured
                  ? "bg-gradient-to-b from-[#7a0c0c] via-[#450505] to-[#1a0303] ring-2 ring-[#ff5722]/50 shadow-[0_30px_80px_-20px_rgba(255,87,34,0.35)]"
                  : "border border-white/10 bg-[#140202]"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#ff5722] px-4 py-1 font-archivo text-[10px] font-bold uppercase tracking-[0.25em] text-black">
                  Most popular
                </div>
              )}

              <div>
                <h3 className="font-display text-2xl font-black text-white">
                  {p.name.toUpperCase()}
                </h3>
                <p className="font-archivo mt-2 text-sm text-white/70">{p.tagline}</p>
                <div className="mt-7 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-black text-white md:text-6xl">
                    {p.price}
                  </span>
                  <span className="font-archivo text-xs uppercase tracking-[0.2em] text-white/40">
                    starting
                  </span>
                </div>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {p.features.map((f, j) => (
                  <li
                    key={j}
                    className="font-archivo flex items-start gap-3 text-sm text-white/85"
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                        p.featured
                          ? "bg-[#ff5722] text-black"
                          : "bg-white/10 text-[#ff5722]"
                      }`}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={waLink(
                  `Hi, I'm interested in the ${p.name} package for a personalized song.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`pricing-cta-${p.name.toLowerCase()}`}
                className={`font-archivo mt-10 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all ${
                  p.featured
                    ? "bg-white text-[#0a0202] glow-orange hover:bg-[#ff5722] hover:text-white"
                    : "border border-white/20 bg-white/5 text-white hover:border-[#ff5722] hover:text-[#ff5722]"
                }`}
              >
                Inquire on WhatsApp
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
