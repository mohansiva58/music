import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { waLink } from "../lib/content";

export default function FinalCTA() {
  return (
    <section
      data-testid="final-cta-section"
      className="relative overflow-hidden bg-[#080202] px-6 py-28 md:px-10 md:py-40"
    >
      {/* Full-bleed red glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#dc2626_0%,#450505_50%,#080202_100%)] opacity-85" />
        <div className="duotone-red-wrap absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?crop=entropy&cs=tinysrgb&fit=crop&w=1600&q=85"
            alt=""
            className="duotone-red h-full w-full object-cover"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-[1400px] text-center"
      >
        <span className="font-archivo text-xs uppercase tracking-[0.4em] text-[#ff5722]">
          Your turn
        </span>
        <h2
          className="font-display mx-auto mt-5 max-w-5xl text-[12vw] font-black leading-[0.88] tracking-[-0.04em] text-white md:text-[7vw] lg:text-[7.5rem]"
          data-testid="final-cta-headline"
        >
          TURN YOUR STORY INTO{" "}
          <span className="text-ember">SOMETHING</span> UNFORGETTABLE.
        </h2>
        <p className="font-archivo mx-auto mt-8 max-w-xl text-base text-white/85 md:text-lg">
          One message. Share the occasion, the person, the emotion — and I'll
          take it from there.
        </p>

        <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="final-cta-whatsapp"
            className="group inline-flex items-center gap-6 rounded-full bg-white px-8 py-5 text-base font-archivo font-semibold text-[#0a0202] transition-all hover:bg-[#ff5722] hover:text-white"
          >
            <span>Request Your Song on WhatsApp</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a0202] text-white transition-all group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#ff5722]">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
          <a
            href="#songs"
            className="font-archivo flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white"
            data-testid="final-cta-listen"
          >
            or listen to songs first
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
