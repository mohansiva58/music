import { motion } from "framer-motion";
import { Pause, Search, SkipBack, SkipForward } from "lucide-react";
import { waLink } from "../lib/content";

const memoryFrames = [
  {
    src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1100&q=85",
    alt: "Couple smiling outdoors",
    className:
      "left-[4%] top-[8%] h-[34%] w-[22%] rotate-[-1.8deg] md:h-[36%] md:w-[21%]",
    frameClass: "border-[#8d6648]",
  },
  {
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1300&q=85",
    alt: "Wedding memory moment",
    className:
      "left-[29%] top-[2%] h-[52%] w-[34%] rotate-[0.3deg] md:h-[54%] md:w-[35%]",
    frameClass: "border-[#d1b08d]",
  },
  {
    src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1000&q=85",
    alt: "Family hiking memory",
    className:
      "right-[6%] top-[10%] h-[36%] w-[24%] rotate-[1.8deg] md:h-[39%] md:w-[24%]",
    frameClass: "border-[#7c5e3c]",
  },
  {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=85",
    alt: "Graduation celebration",
    className:
      "left-[18%] top-[60%] h-[30%] w-[23%] rotate-[0.6deg] md:top-[58%] md:h-[32%] md:w-[22%]",
    frameClass: "border-[#b88d61]",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=85",
    alt: "Friends around campfire",
    className:
      "right-[14%] top-[58%] h-[31%] w-[24%] rotate-[-1.2deg] md:h-[34%] md:w-[23%]",
    frameClass: "border-[#6d5037]",
  },
];

const tracks = [
  { title: "Golden Hour", artist: "Memory Session", progress: "28%" },
  { title: "Perfect", artist: "Story Cut", progress: "74%", active: true },
  { title: "Count On Me", artist: "Soul Draft", progress: "42%" },
];

export default function MelodyFinder() {
  return (
    <section
      id="melody-finder"
      data-testid="melody-finder-section"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#080202]/30 via-transparent to-[#080202]/50" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_52%_18%,rgba(255,153,96,0.06)_0%,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="font-archivo text-[11px] uppercase tracking-[0.38em] text-[#ff5722]">
            Chapter 03 - Find Your Melody
          </span>
          <h2 className="font-serif-display mt-6 text-[2.2rem] leading-[1.06] text-white md:text-[4rem]">
            Every memory has a melody.
            <br />
            We find it for you.
          </h2>
          <p className="font-archivo mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/78 md:text-xl">
            Discover the unique soundtrack to your most cherished moments,
            arranged with the same care as the memory itself.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-14 h-[430px] w-full max-w-5xl rounded-[2.2rem] border border-white/12 bg-[#0f0404]/45 p-4 shadow-[0_30px_90px_-35px_rgba(0,0,0,0.85)] backdrop-blur-md md:h-[540px] md:p-6"
        >
          <div className="absolute inset-0 rounded-[2.2rem] bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,153,96,0.08)_0%,transparent_55%)]" />
          {memoryFrames.map((frame, i) => (
            <motion.figure
              key={frame.alt}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.65 }}
              className={`absolute ${frame.className}`}
            >
              <div
                className={`h-full w-full overflow-hidden rounded-[2px] border-2 ${frame.frameClass} bg-[#120606] p-1.5 shadow-[0_18px_35px_-12px_rgba(0,0,0,0.8)]`}
              >
                <div className="h-full w-full overflow-hidden border border-black/30 bg-black/20">
                  <img
                    src={frame.src}
                    alt={frame.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </motion.figure>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.8, delay: 0.16 }}
          className="mx-auto mt-10 max-w-5xl"
        >
          <div className="rounded-3xl border border-white/14 bg-[#100505]/65 px-4 py-4 backdrop-blur-xl md:px-6">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {tracks.map((track) => (
                <div
                  key={track.title}
                  className={`rounded-2xl border px-4 py-3.5 ${
                    track.active
                      ? "border-[#ffb980]/55 bg-[#ffb980]/10"
                      : "border-white/12 bg-black/25"
                  }`}
                >
                  <p className="font-archivo text-sm font-medium text-white/92">
                    {track.title}
                  </p>
                  <p className="font-archivo mt-0.5 text-xs text-white/55">
                    {track.artist}
                  </p>
                  <div className="mt-3 h-1 rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-[#ffb980]"
                      style={{ width: track.progress }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-center rounded-full border border-[#ffb980]/35 bg-black/40 px-5 py-3 text-[#ffb980]">
              <div className="flex items-center gap-5">
                <SkipBack className="h-5 w-5" />
                <Pause className="h-6 w-6" />
                <SkipForward className="h-5 w-5" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.22 }}
          className="mt-10 text-center"
        >
          <a
            href={waLink(
              "Hi, I want to find the perfect melody for my memories."
            )}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="melody-finder-cta"
            className="glow-orange inline-flex items-center gap-3 rounded-full border border-[#ffb980]/50 bg-black/55 px-10 py-4 font-archivo text-sm font-semibold uppercase tracking-[0.16em] text-[#ffcfaa] md:text-base"
          >
            <Search className="h-4 w-4" />
            Find Your Melody
          </a>
          <p className="font-archivo mt-4 text-sm text-white/65 md:text-base">
            Scan your photo. Find the song.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
