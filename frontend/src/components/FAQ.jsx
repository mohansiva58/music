import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { FAQS } from "../lib/content";

export default function FAQ() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-30, 60]),
    { stiffness: 140, damping: 45, mass: 0.3 }
  );
  const ghostX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-80, 80]),
    { stiffness: 140, damping: 45, mass: 0.3 }
  );

  return (
    <section
      id="faq"
      ref={ref}
      data-testid="faq-section"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/cta.mp4"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#080202]/35 via-transparent to-[#080202]/50" />

      <motion.div
        aria-hidden
        style={prefersReduced ? undefined : { x: ghostX }}
        className="pointer-events-none absolute right-0 top-[16%] z-10 hidden md:block"
      >
        <div className="ghost-text text-[18vw] leading-none opacity-40">
          QUESTIONS
        </div>
      </motion.div>

      <div className="section-container section-pad relative z-20 grid min-h-[100svh] grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14 lg:gap-20">
        <div className="md:col-span-5">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="chapter-label"
          >
            Chapter 07 — FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-5 text-[clamp(3rem,12vw,5rem)] font-black leading-[0.88] tracking-[-0.03em] text-white md:mt-6 md:text-[clamp(4rem,5.5vw,5.5rem)]"
            data-testid="faq-headline"
          >
            THE USUAL
            <br />
            <span className="text-ember">QUESTIONS.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-archivo mt-6 max-w-md text-base text-white/80 md:text-lg"
          >
            Anything not covered here? WhatsApp directly — I usually reply
            within the hour.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7"
        >
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="w-full"
            data-testid="faq-accordion"
          >
            {FAQS.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  data-testid={`faq-item-${i}`}
                  className="border-b border-white/15 last:border-0"
                >
                <AccordionTrigger className="py-5 text-left font-archivo text-base font-semibold text-white hover:text-[#ff5722] hover:no-underline sm:py-6 md:py-7 md:text-xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-archivo pb-5 pr-2 text-sm leading-relaxed text-white/75 sm:pr-6 md:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
