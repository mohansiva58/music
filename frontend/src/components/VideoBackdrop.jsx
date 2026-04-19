import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/*
 * VideoBackdrop - sticky, full-viewport scroll-scrubbed video layer.
 *
 * Wraps children and keeps video pinned while the wrapper scrolls.
 * Video currentTime is mapped from wrapper scroll progress.
 */
export default function VideoBackdrop({
  children,
  src = "/  .mp4",
  webmSrc = "/media/hero-bg.webm",
  poster = "/herobg.png",
  className = "",
}) {
  const SCRUB_SPEED = 0.5;
  const LERP_FACTOR = 0.8;
  const SNAP_THRESHOLD = 0.24;

  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const targetTimeRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;

    const clamped = Math.max(0, Math.min(1, progress));
    targetTimeRef.current = clamped * video.duration * SCRUB_SPEED;

    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const currentVideo = videoRef.current;
      if (!currentVideo || !currentVideo.duration) return;

      const current = currentVideo.currentTime;
      const target = targetTimeRef.current;
      const delta = target - current;
      const next =
        Math.abs(delta) > SNAP_THRESHOLD
          ? target
          : current + delta * LERP_FACTOR;

      if (Math.abs(next - current) > 0.002) {
        try {
          currentVideo.currentTime = next;
        } catch (_) {
          // Ignore seek errors during early load.
        }
      }
    });
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const initAtZero = () => {
      try {
        video.pause();
        video.currentTime = 0;
      } catch (_) {
        // Ignore initialization errors.
      }
    };

    if (video.readyState >= 1) initAtZero();
    else video.addEventListener("loadedmetadata", initAtZero, { once: true });

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ willChange: "transform" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          <video
            ref={videoRef}
            poster={poster}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            data-testid="hero-video"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={webmSrc} type="video/webm" />
            <source src={src} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
