import { motion } from "framer-motion";
import { ARTIST } from "../lib/content";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:gap-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative md:col-span-5"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1563170261-90260910461d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHw0fHxjaW5lbWF0aWMlMjBtdXNpY2lhbiUyMHBvcnRyYWl0JTIwZGFyayUyMG1vb2R5fGVufDB8fHx8MTc3NjU3MzQ4NHww&ixlib=rb-4.1.0&q=85"
              alt={`${ARTIST.name} portrait`}
              className="h-[560px] w-full object-cover grayscale transition duration-700 hover:grayscale-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <div className="font-script text-4xl text-[#E2B365]">
                  {ARTIST.name}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.3em] text-zinc-300">
                  {ARTIST.tagline}
                </div>
              </div>
              <div className="glass rounded-2xl px-4 py-3 text-right">
                <div className="font-display text-2xl font-semibold text-white">
                  150+
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                  songs · since 2025
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center md:col-span-7"
        >
          <span className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#E2B365]">
            Meet the artist
          </span>
          <h2
            className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
            data-testid="about-headline"
          >
            Every song I write <br />
            starts with{" "}
            <span className="font-script text-gold-gradient">
              your story.
            </span>
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            I don't make stock songs. I don't use templates. Every single
            personalized track you hear on this page was written from a blank
            page — built around a real conversation with a real human about the
            moment they wanted to preserve.
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Lyrics first. Then the melody. Then the arrangement. Then the
            studio. My goal is simple: when the person you give this to hits
            play, they should feel seen.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <div>
              <div className="font-display text-3xl font-semibold text-white md:text-4xl">
                150+
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                songs created
              </div>
            </div>
            <div>
              <div className="font-display text-3xl font-semibold text-white md:text-4xl">
                7–14 <span className="text-base text-zinc-500">days</span>
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                typical delivery
              </div>
            </div>
            <div>
              <div className="font-display text-3xl font-semibold text-white md:text-4xl">
                100%
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                original lyrics
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
