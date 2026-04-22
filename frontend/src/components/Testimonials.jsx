import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { TESTIMONIALS } from "../lib/content";

function getIndices(active, total) {
  const prev = (active - 1 + total) % total;
  const next = (active + 1) % total;
  return { prev, next };
}

export default function Testimonials() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const timerRef = useRef(null);
  const total = TESTIMONIALS.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-30, 60]),
    { stiffness: 120, damping: 40, mass: 0.4 }
  );
  const ghostX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-60, 60]),
    { stiffness: 120, damping: 40, mass: 0.4 }
  );

  const goTo = (index) => {
    if (animating || index === active) return;
    setAnimating(true);
    setQuoteVisible(false);
    setTimeout(() => {
      setActive(index);
      setQuoteVisible(true);
      setAnimating(false);
    }, 350);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setQuoteVisible(false);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % total);
        setQuoteVisible(true);
        setAnimating(false);
      }, 350);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [total]);

  const { prev, next } = getIndices(active, total);
  const positions = [prev, active, next];

  const sizes = [
    {
      opacity: "opacity-50",
      nameSize: "text-sm",
      ring: "ring-1 ring-white/30",
      avatarSize: "w-12 h-12",
    },
    {
      opacity: "opacity-100",
      nameSize: "text-xl font-semibold",
      ring: "ring-2 ring-green-400",
      avatarSize: "w-20 h-20",
    },
    {
      opacity: "opacity-50",
      nameSize: "text-sm",
      ring: "ring-1 ring-white/30",
      avatarSize: "w-12 h-12",
    },
  ];

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative w-full py-20 bg-transparent overflow-hidden"
    >
      {/* Parallax ghost text background */}
      <motion.div
        style={prefersReduced ? undefined : { x: ghostX }}
        className="pointer-events-none absolute inset-0 z-0 flex items-center opacity-10"
      >
        <div className="text-8xl font-bold text-white whitespace-nowrap">VOICES</div>
      </motion.div>
      <div className="relative z-10 w-full px-8 md:px-16 flex flex-col md:flex-row gap-16 items-center">

        {/* LEFT: Timeline + Avatars */}
        <div className="flex flex-col items-start w-full md:w-5/12">
          {/* Section label */}
          <div className="mb-6">
            <div className="w-10 h-1 bg-green-400 rounded mb-3" />
            <h2 className="text-2xl font-bold text-white tracking-tight">Client Stories</h2>
          </div>

          {/* Timeline */}
          <div className="relative flex flex-col items-start gap-0 w-full pl-4">
            {/* Curved arc SVG */}
            <svg
              className="absolute left-0 top-0 h-full"
              width="40"
              viewBox="0 0 40 260"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "100%", minHeight: "220px" }}
            >
              <path
                d="M30 10 Q8 65 20 130 Q32 195 30 250"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                fill="none"
              />
            </svg>

            {positions.map((tIndex, posIdx) => {
              const t = TESTIMONIALS[tIndex];
              const s = sizes[posIdx];
              const isActive = posIdx === 1;
              return (
                <div
                  key={tIndex}
                  onClick={() => goTo(tIndex)}
                  className={`
                    relative flex items-center gap-4 cursor-pointer select-none
                    transition-all duration-500 ease-in-out
                    ${isActive ? "my-3" : "my-1"}
                    ${s.opacity}
                  `}
                  style={{ paddingLeft: "32px" }}
                >
                  {/* Avatar with initials */}
                  <div
                    className={`
                      rounded-full overflow-hidden flex items-center justify-center
                      bg-gradient-to-br from-green-400 to-emerald-600 flex-shrink-0
                      ${s.avatarSize} ${s.ring}
                      transition-all duration-500 font-semibold text-white
                    `}
                  >
                    {t.initials}
                  </div>

                  {/* Name + location */}
                  <div className="flex flex-col">
                    <span
                      className={`text-white transition-all duration-300 ${s.nameSize}`}
                    >
                      {t.name}
                    </span>
                    <span className="text-white/60 transition-all duration-300 text-xs">
                      {t.location}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Quote */}
        <div
          className={`flex-1 flex flex-col justify-center ${quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          style={{ transition: "opacity 0.35s ease, transform 0.35s ease" }}
        >
          {/* Opening quotation mark */}
          <span
            className="text-5xl leading-none mb-2"
            style={{
              fontFamily: "Georgia, serif",
              lineHeight: 1,
              color: "rgba(255,255,255,0.3)",
            }}
          >
            &#8220;
          </span>

          {/* Quote text with large drop cap */}
          <p
            className="leading-relaxed max-w-lg"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              lineHeight: "1.85",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <span
              style={{
                float: "left",
                fontSize: "3.2rem",
                lineHeight: "0.75",
                marginRight: "4px",
                marginTop: "6px",
                fontStyle: "italic",
                fontWeight: "bold",
                color: "#ffffff",
                fontFamily: "Georgia, serif",
              }}
            >
              {TESTIMONIALS[active].quote.charAt(0)}
            </span>
            {TESTIMONIALS[active].quote.slice(1)}
          </p>

          {/* Dots indicator */}
          <div className="flex gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "bg-green-400 w-6 h-2"
                    : "bg-white/30 w-2 h-2"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}