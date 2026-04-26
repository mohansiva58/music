import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Check } from "lucide-react";
import { PRICING, waLink } from "../lib/content";

export default function Pricing() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ghostY = useSpring(
    useTransform(scrollYProgress, [0, 1], [80, -80]),
    { stiffness: 100, damping: 30 }
  );
  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-40, 80]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section
      id="pricing"
      ref={ref}
      data-testid="pricing-section"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Parallax bg */}
      <motion.div
        style={prefersReduced ? undefined : { y: bgY }}
        className="absolute inset-0 z-0 opacity-20"
      >
        <div className="duotone-red-wrap absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?crop=entropy&cs=tinysrgb&fit=crop&w=2000&q=85"
            alt=""
            className="duotone-red absolute inset-0 h-full w-full object-cover object-[center_20%]"
            loading="lazy"
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(220,38,38,0.16),transparent_65%)]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#080202]/32 via-transparent to-[#080202]/48" />

      <motion.div
        aria-hidden
        style={prefersReduced ? undefined : { y: ghostY }}
        className="pointer-events-none absolute right-0 top-[10%] z-10 hidden md:block"
      >
        <div className="ghost-text text-[15vw] leading-none opacity-40">
          PRICING
        </div>
      </motion.div>

      <div className="section-container relative z-20 flex min-h-[100svh] flex-col justify-center section-pad">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="chapter-label"
        >
          Chapter 06 — Investment
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          data-testid="pricing-headline"
          className="font-display mt-4 text-[clamp(2.8rem,10vw,5rem)] font-black leading-[0.9] tracking-[-0.03em] text-white md:text-[clamp(4.2rem,6.5vw,6.5rem)]"
        >
          STARTS AT <span className="text-ember">₹2,999</span>.
          <br />
          SCALES WITH YOUR STORY.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-archivo mt-6 max-w-xl text-base text-white/70 md:text-lg"
        >
          Final quote depends on length, production complexity, and delivery
          timeline. Exact pricing is confirmed on WhatsApp.
        </motion.p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PRICING.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              data-testid={`pricing-card-${p.name.toLowerCase()}`}
              className={`group relative flex flex-col rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 md:p-8 lg:p-10 ${
                p.featured
                  ? "bg-gradient-to-b from-[#7a0c0c] via-[#450505] to-[#1a0303] ring-2 ring-[#ff5722]/60 shadow-[0_30px_100px_-20px_rgba(255,87,34,0.4)]"
                  : "border border-white/15 bg-[#140202]/80 hover:border-[#ff5722]/40"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#ff5722] px-4 py-1 font-archivo text-[10px] font-bold uppercase tracking-[0.25em] text-black">
                  Most popular
                </div>
              )}

              <h3 className="font-display text-2xl font-black text-white md:text-3xl">
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

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {p.features.map((f, j) => (
                  <li
                    key={j}
                    className="font-archivo flex items-start gap-3 text-sm text-white/90"
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
                className={`font-archivo mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                  p.featured
                    ? "bg-white text-[#0a0202] hover:bg-[#ff5722] hover:text-white"
                    : "border border-white/25 bg-white/5 text-white hover:border-[#ff5722] hover:bg-[#ff5722] hover:text-black"
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
