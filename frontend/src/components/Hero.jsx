import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { waLink, ARTIST } from "../lib/content";

const NAV_LINKS = [
  { label: "Home", href: "#top", active: true },
  { label: "Songs", href: "#songs" },
  { label: "Process", href: "#process" },
  { label: "Benefits", href: "#benefits" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Hero() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textYRaw = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacityRaw = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const textScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.95, 1, 0.98, 0.85]);
  const textRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, -2]);
  
  const spring = { stiffness: 120, damping: 30, mass: 0.6 };
  const textY = useSpring(textYRaw, prefersReduced ? { stiffness: 0 } : spring);
  const textOpacity = useSpring(textOpacityRaw, prefersReduced ? { stiffness: 0 } : spring);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section
      ref={ref}
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* ===================== Full-Screen Background ===================== */}
      <div className="absolute inset-0 z-0">
        <picture>
          {/* Optional: Serve different images for mobile/desktop */}
          <source 
            media="(max-width: 768px)" 
            srcSet="content-mobile.png" 
          />
          <img
            src="content.png"
            alt="Letters to Tomorrow cover"
            className="h-full w-full object-cover"
            style={{ 
              pointerEvents: "none",
              objectPosition: "58% 50%",
              imageRendering: "auto"
            }}
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        {/* Gradient overlay for readability across all devices */}
        <div 
          className="absolute inset-0 z-1"
          style={{ 
            background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(26,3,3,0.85) 100%)",
            pointerEvents: "none"
          }} 
        />
      </div>

      {/* ===================== Nav Bar ===================== */}
      <nav className="section-container relative z-20 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
        {/* Logo */}
        <a
          href="#top"
          data-testid="hero-logo"
          className="font-serif-display flex items-baseline text-xl tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-2xl lg:text-3xl"
          onClick={() => setMobileMenuOpen(false)}
        >
          {ARTIST.brand}
          <sup className="ml-0.5 text-[9px] font-normal text-white sm:text-[10px]">©</sup>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
              style={{
                fontFamily: "Inter, sans-serif",
                color: l.active ? "#FFFFFF" : "rgba(255,255,255,0.75)",
                textShadow: "0 1px 8px rgba(0,0,0,0.4)",
                padding: "8px 4px"
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="nav-cta"
          className="hidden min-h-[44px] items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 lg:inline-flex"
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            color: "#FFFFFF",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Begin Journey
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 z-25 mx-4 mt-2 rounded-2xl border border-white/20 bg-black/60 backdrop-blur-md p-4 shadow-2xl">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                style={{ fontFamily: "Inter, sans-serif" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFB300] px-6 py-3 text-sm font-bold text-[#1a0303] shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Begin Journey
            </a>
          </div>
        </div>
      )}

      {/* ===================== Hero Content ===================== */}
      <motion.div
        style={prefersReduced ? undefined : { y: textY, opacity: textOpacity }}
        className="section-container relative z-10 flex min-h-[calc(100svh-72px)] flex-col items-center justify-end px-4 pb-8 text-center sm:px-6 sm:pb-10 md:min-h-[calc(100svh-88px)] md:items-start md:px-8 md:pb-12 md:text-left lg:px-12"
      >
        <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
          <motion.h1
            style={{
              lineHeight: "1.05",
              letterSpacing: "-0.04em",
              color: "rgba(255,255,255,0.54)",
              textShadow: "0 6px 40px rgba(0,0,0,0.32)",
              ...(prefersReduced ? {} : { scale: textScale, rotate: textRotate })
            }}
            data-testid="hero-headline"
            className="font-serif-display animate-fade-rise font-bold text-white [text-wrap:balance] sm:[text-wrap:pretty]"
            css={{
              fontSize: "clamp(2.5rem, 9vw, 5.6rem)",
              "@media (min-width: 768px)": {
                fontSize: "clamp(3.5rem, 7vw, 6rem)",
              }
            }}
          >
            TURN YOUR{" "}
            <em className="italic text-[#ffe082] opacity-92">STORY</em>
            <br className="sm:hidden" />
            {" "}INTO A{" "}
            <em className="italic text-[#ffe082] opacity-92">MEMORABLE</em>
            <br /> SONG
          </motion.h1>

          <p
            data-testid="hero-sub"
            className="animate-fade-rise-delay mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg md:mt-7"
            style={{
              fontFamily: "Inter, sans-serif",
              textShadow: "0 2px 18px rgba(0,0,0,0.38)",
            }}
          >
            Personalized music for proposals, anniversaries, and milestones.{" "}
            <span className="hidden sm:inline"><br /></span>
            Capture your memories in a song made just for you or your loved ones.
          </p>

          {/* CTAs - Mobile-first, touch-friendly */}
          <div className="mt-7 flex w-full flex-col items-stretch gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-whatsapp-cta"
              className="animate-fade-rise-delay-2 inline-flex min-h-[48px] items-center justify-center rounded-full px-6 py-3 text-sm font-bold shadow-lg transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:px-7 sm:text-base"
              style={{
                background: "linear-gradient(90deg, #FFD700 0%, #FFB300 100%)",
                color: "#1a0303",
                fontFamily: "Inter, sans-serif",
                boxShadow: "0 8px 24px rgba(255,193,7,0.2)",
              }}
            >
              <span className="tracking-wide">REQUEST YOUR SONG</span>
            </a>
            <a
              href="#songs"
              data-testid="hero-listen-btn"
              className="animate-fade-rise-delay-2 inline-flex min-h-[48px] items-center justify-center rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:tracking-[0.3em]"
              style={{
                background: "#1a0303",
                color: "#FFD700",
                fontFamily: "Inter, sans-serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                border: "1.5px solid #FFD700",
              }}
            >
              LISTEN TO SAMPLES
            </a>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator for desktop */}
      <div className="hidden md:block absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg 
          className="h-6 w-6 text-white/60" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
