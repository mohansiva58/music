import { motion } from "framer-motion";
import { ARTIST } from "../lib/content";

/* SonicMind-style "About" — red smoke portrait + huge white "WITH SOULNOTE" headline */
export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative overflow-hidden bg-[#080202] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Top: WITH + SOULNOTE */}
        <div className="relative flex flex-col items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="mb-2 mr-4 self-start md:mr-0 md:self-end md:pr-[14%]"
          >
            <span className="font-script text-3xl text-white md:text-4xl">
              With
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            data-testid="about-headline"
            className="font-display text-[18vw] font-black leading-[0.85] tracking-[-0.04em] text-white md:text-[13vw] lg:text-[11rem]"
          >
            {ARTIST.brand.toUpperCase()}
          </motion.h2>
        </div>

        {/* Portrait with red smoke */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-[-2vw] flex justify-center"
        >
          <div className="duotone-red-wrap relative h-[72vh] w-full max-w-[900px] overflow-hidden md:h-[80vh]">
            <img
              src="https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?crop=entropy&cs=tinysrgb&fit=crop&w=1400&q=85"
              alt="Listening to music"
              className="duotone-red absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Smoke-like fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#080202] via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#080202] via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#080202]" />
        </motion.div>

        {/* Bottom description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-archivo mx-auto mt-[-4vw] max-w-2xl text-center text-lg leading-relaxed text-white/90 md:text-xl"
        >
          inspiration transforms into sound — every memory, every emotion,
          every story becoming something you can truly{" "}
          <span className="text-ember font-semibold">hear, feel, and keep.</span>
        </motion.p>
      </div>
    </section>
  );
}
