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

const MOBILE_POSITIONS = [
  { side: "left", top: "11%", offset: "25%", size: "mobileTop", rotate: -8, image: 0 },
  { side: "right", top: "11%", offset: "25%", size: "mobileTop", rotate: 8, image: 1 },
  { side: "left", top: "32%", offset: "7%", size: "mobileMid", rotate: -15, image: 2 },
  { side: "right", top: "32%", offset: "7%", size: "mobileMid", rotate: 15, image: 3 },
  { side: "left", top: "70%", offset: "14%", size: "mobileLow", rotate: -6, image: 4 },
  { side: "right", top: "70%", offset: "14%", size: "mobileLow", rotate: 6, image: 5 },
];

const SIZE_CLASSES = {
  top: "h-[180px] w-[230px]",
  upper: "h-[195px] w-[250px]",
  middle: "h-[210px] w-[270px]",
  lower: "h-[220px] w-[285px]",
  mobileTop: "h-[82px] w-[104px]",
  mobileMid: "h-[92px] w-[116px]",
  mobileLow: "h-[100px] w-[128px]",
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

export default function MelodyFinder() {
  return (
    <section
      id="melody-finder"
      data-testid="melody-finder-section"
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div className="relative hidden min-h-screen w-full overflow-hidden md:block">
        {DESKTOP_POSITIONS.map((config, index) => (
          <GalleryCard key={`${config.side}-${config.top}-${index}`} config={config} index={index} />
        ))}

        <motion.div
  initial={{ opacity: 0, y: 18 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-90px" }}
  transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
  className="absolute left-1/2 top-1/2 z-20 flex w-[min(10px,90vw)] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
>
  <h2 className="font-display text-[clamp(3.4rem,5.4vw,5.8rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
  
  {/* TURN */}
  <span className="block">Turn</span>

  {/* MEMORY (Gold Highlight) */}
  <span className="block bg-gradient-to-r from-[#f5c27a] via-[#e0a85a] to-[#b87333] bg-clip-text text-transparent drop-shadow-[0_4px_10px_rgba(255,180,80,0.35)]">
    Memory
  </span>

  {/* INTO MELODY */}
  <span className="block text-white/90">
    Into Melody
  </span>

</h2>
</motion.div>
      </div>

      <div className="relative min-h-screen w-full overflow-hidden md:hidden">
        {MOBILE_POSITIONS.map((config, index) => (
          <GalleryCard
            key={`${config.side}-${config.top}-mobile-${index}`}
            config={config}
            index={index}
            compact
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="absolute left-1/2 top-1/2 z-20 flex w-[min(340px,82vw)] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
        >
          <h2 className="font-sans text-[clamp(2.25rem,10vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-black">
            A Gallery That
            <br />
            Redefines Creativity
          </h2>
          <p className="mt-4 max-w-[310px] font-sans text-sm leading-snug text-black/70">
            Explore a collection where art, design, and technology merge to
            shape what's next.
          </p>
          <a
            href={waLink("Hi, I want to find the perfect melody for my memories.")}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="melody-finder-cta"
            className="mt-6 inline-flex min-h-10 items-center justify-center rounded-full bg-black px-6 font-sans text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
          >
            Start for Free
          </a>
        </motion.div>
      </div>
    </section>
  );
}
