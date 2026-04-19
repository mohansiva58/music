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
    useTransform(scrollYProgress, [0, 1], [-60, 100]),
    { stiffness: 100, damping: 30 }
  );
  const ghostX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-150, 150]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section
      id="faq"
      ref={ref}
      data-testid="faq-section"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <motion.div
        style={prefersReduced ? undefined : { y: bgY }}
        className="absolute inset-0 z-0 opacity-20"
      >
        <div className="duotone-red-wrap absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?crop=entropy&cs=tinysrgb&fit=crop&w=2000&q=85"
            alt=""
            className="duotone-red absolute inset-0 h-full w-full object-cover object-[center_25%]"
            loading="lazy"
          />
        </div>
      </motion.div>
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

      <div className="relative z-20 mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-12 md:gap-20 md:px-10 md:py-32">
        <div className="md:col-span-5">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-archivo text-[11px] uppercase tracking-[0.4em] text-[#ff5722]"
          >
            Chapter 07 — FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-6 text-[12vw] font-black leading-[0.88] tracking-[-0.03em] text-white md:text-[5.5vw] lg:text-[5.5rem]"
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
              <AccordionItem
                key={i}
                value={`item-${i}`}
                data-testid={`faq-item-${i}`}
                className="border-b border-white/15 last:border-0"
              >
                <AccordionTrigger className="py-7 text-left font-archivo text-lg font-semibold text-white hover:text-[#ff5722] hover:no-underline md:text-xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-archivo pb-6 pr-6 text-sm leading-relaxed text-white/75 md:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
