import { useEffect, useRef, useState } from "react";
import { waLink, ARTIST } from "../lib/content";

/*
 * Cinematic Hero — Aethera-style, music-adapted
 * - Light off-white background
 * - Instrument Serif display typography with italic emphasis words
 * - Fullscreen looping background video with custom fade-in / fade-out via RAF
 * - Minimal glass nav bar at top
 * - Centered hero with animate-fade-rise sequence
 */

const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

const NAV_LINKS = [
  { label: "Home", href: "#top", active: true },
  { label: "Songs", href: "#songs" },
  { label: "Process", href: "#process" },
  { label: "Benefits", href: "#benefits" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Hero() {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  // Custom fade-in / fade-out loop:
  //   - On first `canplay`, start RAF that samples currentTime
  //   - Fade in over 0.5s at the start (opacity 0 → 1)
  //   - Fade out over 0.5s before the end (opacity 1 → 0)
  //   - On `ended`: set opacity 0, wait 100ms, reset currentTime = 0, play() again
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const FADE_DURATION = 0.5; // seconds

    const tick = () => {
      if (video.duration && !Number.isNaN(video.duration)) {
        const t = video.currentTime;
        const d = video.duration;
        let next = 1;
        if (t < FADE_DURATION) {
          next = t / FADE_DURATION;
        } else if (t > d - FADE_DURATION) {
          next = Math.max(0, (d - t) / FADE_DURATION);
        }
        setOpacity(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      setOpacity(0);
      setTimeout(() => {
        try {
          video.currentTime = 0;
          const p = video.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } catch (e) {
          /* swallow */
        }
      }, 100);
    };

    const onCanPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("canplay", onCanPlay);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      {/* ===================== Video Background ===================== */}
      <div
        className="absolute z-0"
        style={{ top: "300px", inset: "auto 0 0 0", height: "calc(100vh + 300px)" }}
      >
        <video
          ref={videoRef}
          data-testid="hero-video"
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          style={{ opacity, transition: "opacity 40ms linear" }}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlays on video — fade top & bottom to white bg */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white via-transparent to-white" />
      {/* Extra subtle vignette for legibility */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_40%,rgba(255,255,255,0.55)_100%)]" />

      {/* ===================== Nav Bar ===================== */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-8">
        {/* Logo */}
        <a
          href="#top"
          data-testid="hero-logo"
          className="font-serif-display flex items-baseline text-3xl tracking-tight"
          style={{ color: "#000000" }}
        >
          {ARTIST.brand}
          <sup className="ml-0.5 text-[10px] font-normal" style={{ color: "#000000" }}>
            ®
          </sup>
        </a>

        {/* Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className="text-sm transition-colors hover:text-black"
              style={{
                fontFamily: "Inter, sans-serif",
                color: l.active ? "#000000" : "#6F6F6F",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="nav-cta"
          className="rounded-full px-6 py-2.5 text-sm transition-transform hover:scale-[1.03]"
          style={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Begin Journey
        </a>
      </nav>

      {/* ===================== Hero Content ===================== */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
        style={{ paddingTop: "calc(8rem - 75px)", paddingBottom: "10rem" }}
      >
        {/* Headline */}
        <h1
          data-testid="hero-headline"
          className="font-serif-display animate-fade-rise max-w-7xl text-5xl font-normal sm:text-7xl md:text-8xl"
          style={{
            lineHeight: "0.95",
            letterSpacing: "-2.46px",
            color: "#000000",
          }}
        >
          Beyond{" "}
          <em
            style={{
              color: "#6F6F6F",
              fontStyle: "italic",
              fontFamily: "Instrument Serif, Georgia, serif",
            }}
          >
            words,
          </em>{" "}
          we compose{" "}
          <em
            style={{
              color: "#6F6F6F",
              fontStyle: "italic",
              fontFamily: "Instrument Serif, Georgia, serif",
            }}
          >
            the unforgettable.
          </em>
        </h1>

        {/* Description */}
        <p
          data-testid="hero-sub"
          className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{
            color: "#6F6F6F",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Original songs built for brilliant moments, fearless love stories,
          and thoughtful souls. Through the noise, we craft music for memories
          that last a lifetime — 150+ stories already turned into song.
        </p>

        {/* Hero CTA */}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="hero-whatsapp-cta"
          className="animate-fade-rise-delay-2 mt-12 rounded-full px-14 py-5 text-base transition-transform hover:scale-[1.03]"
          style={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Begin Journey
        </a>

        {/* Secondary action */}
        <a
          href="#songs"
          data-testid="hero-listen-btn"
          className="animate-fade-rise-delay-2 mt-6 text-xs uppercase tracking-[0.3em] transition-colors hover:text-black"
          style={{
            color: "#6F6F6F",
            fontFamily: "Inter, sans-serif",
          }}
        >
          or listen to songs →
        </a>
      </div>

      {/* Transition fade to dark body */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-b from-transparent to-[#080202]"
      />
    </section>
  );
}
