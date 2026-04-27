import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const STEPS = [
  {
    label: "Your story",
    num: "01",
    description:
      "Our process begins with understanding you. We dive deep into your memories, emotions, and the unique narrative you want to express in song.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    title: "Sharing Your Story",
  },
  {
    label: "The writing",
    num: "02",
    description:
      "Our lyricists and composers transform your narrative into compelling words and melodies, capturing your story in a unique musical form.",
    image:
      "melody/melody3.png",
    title: "The Writing",
  },
  {
    label: "The music",
    num: "03",
    description:
      "We compose and arrange the music, ensuring every note and instrument reflects your story and emotions.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=60",
    title: "The Music",
  },
  {
    label: "The reaction",
    num: "04",
    description:
      "You listen to your custom song for the first time, experiencing your story in a new, unforgettable way.",
    image:
      "melody/melody9.png",
    title: "The Reaction",
  },
  {
    label: "Your turn",
    num: "05",
    description:
      "Share your song with loved ones, celebrate your moments, and cherish your story forever.",
    image:
      "https://images.unsplash.com/photo-1642559732916-347fab27cdca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    title: "Your Turn",
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -30]), {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex(0);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      id="process"
      ref={ref}
      className="relative w-full min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-red-50/30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-orange-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-red-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header - Original Structure */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="chapter-label block text-sm font-semibold uppercase tracking-[0.3em] mb-4"
            style={{ color: "#ff5722" }}
          >
            Chapter 03 - The Journey
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.45rem,10vw,4.8rem)] font-black leading-[0.88] tracking-[-0.03em] text-white md:text-[clamp(4rem,6vw,5.8rem)]"
          >
            The Journey
            <br />
            <span className="text-ember" style={{ color: "#ff5722" }}>Of </span>Your Song.
          </motion.h2>
        </motion.div>

        {/* Cards Grid - 5 Cards with Transparency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-4">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.num}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group"
              style={{
                marginTop: index === 1 || index === 3 ? '2.5rem' : '0',
              }}
            >
              {/* Card Container with Transparent Border */}
              <div className="relative h-[280px] md:h-[340px] lg:h-[380px] rounded-3xl overflow-hidden shadow-xl border border-white/10 transition-all duration-500">
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Transparent Gradient Overlay - Lighter for transparency */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Number */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-4xl md:text-5xl font-black text-white/90 drop-shadow-lg">
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <span className="block text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#ffb980] mb-2">
                    {step.label}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/80 leading-relaxed line-clamp-3">
                    {step.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-white/20 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}