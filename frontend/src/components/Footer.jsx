import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ARTIST } from "../lib/content";

export default function Footer() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yOffset = useSpring(
    useTransform(scrollYProgress, [0, 1], [40, -40]),
    { stiffness: 200, damping: 50, mass: 0.2 }
  );
  return (
    <footer
      ref={ref}
      data-testid="site-footer"
      className="relative border-t border-white/8 px-6 py-12 md:px-10 overflow-hidden"
    >
      <motion.div
        style={prefersReduced ? undefined : { y: yOffset }}
        className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3"
        >
          {/* <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white">
            S
          </span> */}
          <div>
            <div className="font-display text-sm font-black text-white">
              {ARTIST.brand.toUpperCase()}
            </div>
            {/* <div className="font-archivo text-[10px] uppercase tracking-[0.25em] text-white/50">
              by {ARTIST.name}
            </div> */}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-archivo text-xs text-white/50"
        >
         {ARTIST.brand}. Every song written from
          scratch.
        </motion.p>
      </motion.div>
    </footer>
  );
}
