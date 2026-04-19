import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PRICING, waLink } from "../lib/content";

export default function Pricing() {
  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="relative px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#E2B365]">
            Pricing
          </span>
          <h2
            className="font-display mt-4 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl"
            data-testid="pricing-headline"
          >
            Starts at ₹2,999.{" "}
            <span className="font-script text-gold-gradient">Scales</span> with
            your story.
          </h2>
          <p className="mt-5 text-base text-zinc-400 md:text-lg">
            Final quote depends on length, production complexity, and delivery
            timeline. Exact pricing is confirmed on WhatsApp.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {PRICING.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              data-testid={`pricing-card-${p.name.toLowerCase()}`}
              className={`relative flex flex-col rounded-3xl p-8 md:p-10 ${
                p.featured
                  ? "bg-gradient-to-b from-[#E2B365]/15 via-[#1a1612] to-[#0a0a0a] glow-gold"
                  : "glass"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#E2B365] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-black">
                  Most popular
                </div>
              )}

              <div>
                <h3 className="font-display text-2xl font-medium text-white">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{p.tagline}</p>
                <div className="mt-7 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-semibold text-white md:text-6xl">
                    {p.price}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    starting
                  </span>
                </div>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {p.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-sm text-zinc-300"
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                        p.featured
                          ? "bg-[#E2B365] text-black"
                          : "bg-white/10 text-[#E2B365]"
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
                className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all ${
                  p.featured
                    ? "bg-[#E2B365] text-black glow-btn"
                    : "border border-white/15 bg-white/5 text-white hover:border-[#E2B365] hover:text-[#E2B365]"
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
