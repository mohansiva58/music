import { motion } from "framer-motion";
import { waLink } from "../lib/content";

const IMAGES = [
  { src: "/melody/melody1.png", alt: "Memory card" },
  { src: "/melody/melody2.png", alt: "Moment from a story" },
  { src: "/melody/melody3.png", alt: "Outdoor memory" },
  { src: "/melody/melody4.png", alt: "Portrait memory" },
  { src: "/melody/melody5.png", alt: "Live performance" },
  { src: "/melody/melody6.png", alt: "Stage moment" },
  { src: "/melody/melody7.png", alt: "Guitar memory" },
  { src: "/melody/melody8.png", alt: "Studio microphone" },
  { src: "/melody/melody9.png", alt: "Keepsake memory" },
];

const DESKTOP_POSITIONS = [
  { side: "left", top: "7%", offset: "35%", size: "top", rotate: -7, image: 0 },
  { side: "right", top: "7%", offset: "35%", size: "top", rotate: 7, image: 1 },
  { side: "left", top: "21%", offset: "22%", size: "upper", rotate: -17, image: 2 },
  { side: "right", top: "21%", offset: "22%", size: "upper", rotate: 17, image: 3 },
  { side: "left", top: "42%", offset: "11%", size: "middle", rotate: -12, image: 4 },
  { side: "right", top: "42%", offset: "11%", size: "middle", rotate: 12, image: 5 },
  { side: "left", top: "66%", offset: "16%", size: "lower", rotate: -6, image: 6 },
  { side: "right", top: "66%", offset: "16%", size: "lower", rotate: 6, image: 7 },
];

const MOBILE_TOP_CARDS = [
  { image: 0, rotate: -8, lift: "mt-7" },
  { image: 1, rotate: 4, lift: "" },
  { image: 2, rotate: 8, lift: "mt-7" },
];

const MOBILE_BOTTOM_CARDS = [
  { image: 3, rotate: -6, lift: "mb-6" },
  { image: 4, rotate: 5, lift: "" },
  { image: 5, rotate: 9, lift: "mb-6" },
];

const SIZE_CLASSES = {
  top: "h-[180px] w-[230px]",
  upper: "h-[195px] w-[250px]",
  middle: "h-[210px] w-[270px]",
  lower: "h-[220px] w-[285px]",
};

function GalleryCard({ config, index, compact = false }) {
  const image = IMAGES[config.image];
  const positionStyle = {
    top: config.top,
    [config.side]: config.offset,
    rotate: `${config.rotate}deg`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 18 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={compact ? undefined : { scale: 1.06, transition: { duration: 0.22 } }}
      className={`absolute overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_18px_44px_rgba(0,0,0,0.16)] ${SIZE_CLASSES[config.size]}`}
      style={positionStyle}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

function MobileGalleryCard({ config, index }) {
  const image = IMAGES[config.image];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`aspect-[4/3] w-[80px] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_14px_30px_rgba(0,0,0,0.14)] sm:w-[100px] ${config.lift}`}
      style={{ rotate: `${config.rotate}deg` }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

export default function MelodyFinder() {
  return (
    <section
      id="melody-finder"
      data-testid="melody-finder-section"
      className="relative min-h-[100svh] w-full overflow-x-hidden"
    >
      <div className="relative hidden min-h-[100svh] w-full overflow-hidden md:block">
        {DESKTOP_POSITIONS.map((config, index) => (
          <GalleryCard key={`${config.side}-${config.top}-${index}`} config={config} index={index} />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-1/2 z-20 flex w-[min(700px,70vw)] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
        >
         <h2 className="font-display text-[clamp(3.4rem,5.4vw,5.8rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-black">
  Turn
  <span className="block text-ember">Memory</span>
  <span className="block">Into Melody</span>
</h2>

          {/* <p className="mt-5 max-w-[620px] font-sans text-lg leading-snug text-black/70">
            Explore a collection where art, design, and technology merge to
            shape what's next. This gallery isn't just about visuals.
          </p> */}
          {/* <a
            href={waLink("Hi, I want to find the perfect melody for my memories.")}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="melody-finder-cta"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-black px-7 font-sans text-base font-semibold text-white shadow-[0_12px_24px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:scale-105"
          >
            Start for Free
          </a> */}
        </motion.div>
      </div>

      <div className="relative flex min-h-[100svh] w-full flex-col justify-between gap-[clamp(1.5rem,5svh,3rem)] overflow-hidden px-5 py-[clamp(1rem,4svh,2rem)] md:hidden">
        <div className="grid grid-cols-3 items-start justify-items-center gap-3 pt-2 sm:gap-4 sm:pt-4">
          {MOBILE_TOP_CARDS.map((config, index) => (
            <MobileGalleryCard
              key={`${IMAGES[config.image].alt}-top-${index}`}
              config={config}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mx-auto flex w-[85%] max-w-[320px] flex-col items-center text-center"
        >
          <h2 className="font-display text-[clamp(2.35rem,12vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-black">
            Turn
            <span className="block text-ember">Memory</span>
            <span className="block">Into Melody</span>
          </h2>
          <p className="mt-4 max-w-[300px] font-sans text-sm leading-relaxed text-black/70">
            Discover the unique soundtrack to your most cherished moments.
          </p>
          <a
            href={waLink("Hi, I want to find the perfect melody for my memories.")}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="melody-finder-cta"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-black px-6 font-sans text-sm font-semibold text-white transition-transform duration-300 active:scale-95"
          >
            Start for Free
          </a>
        </motion.div>

        <div className="grid grid-cols-3 items-end justify-items-center gap-3 pb-2 sm:gap-4 sm:pb-4">
          {MOBILE_BOTTOM_CARDS.map((config, index) => (
            <MobileGalleryCard
              key={`${IMAGES[config.image].alt}-bottom-${index}`}
              config={config}
              index={index + MOBILE_TOP_CARDS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
