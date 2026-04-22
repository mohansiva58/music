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
  src = "/hero2.mp4",
  webmSrc = "/media/hero-bg.webm",
  srcPart1 = "/hero_part1.mp4",
  srcPart2 = "/hero_part2.mp4",
  srcPart3 = "/hero_part3.mp4",
  poster = "",
  className = "",
  enabled = true,
  useSplitVideo = false,
}) {
  const SCRUB_SPEED = 1;
  const LERP_FACTOR = 0.99; // Increased for even faster response
  const SNAP_THRESHOLD = 0.005; // More aggressive snap for instant response

  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const rafRef = useRef(null);
  const targetTimeRef = useRef(0);
  const currentPartRef = useRef(1);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!enabled) return;

    if (useSplitVideo) {
      // Triple video mode: switch between part1, part2, and part3
      const clamped = Math.max(0, Math.min(1, progress));
      const part1Threshold = 1 / 3;
      const part2Threshold = 2 / 3;
      
      let videoPart = 1;
      let progressInPart = 0;
      
      if (clamped < part1Threshold) {
        videoPart = 1;
        progressInPart = clamped / part1Threshold;
      } else if (clamped < part2Threshold) {
        videoPart = 2;
        progressInPart = (clamped - part1Threshold) / part1Threshold;
      } else {
        videoPart = 3;
        progressInPart = (clamped - part2Threshold) / part1Threshold;
      }
      
      const video = 
        videoPart === 1 ? videoRef.current :
        videoPart === 2 ? videoRef2.current :
        videoRef3.current;
      
      if (!video || !video.duration || Number.isNaN(video.duration)) return;
      
      targetTimeRef.current = progressInPart * video.duration * SCRUB_SPEED;

      // Switch video visibility with smooth fade
      if (currentPartRef.current !== videoPart) {
        currentPartRef.current = videoPart;
        if (videoRef.current) videoRef.current.style.opacity = videoPart === 1 ? "1" : "0";
        if (videoRef2.current) videoRef2.current.style.opacity = videoPart === 2 ? "1" : "0";
        if (videoRef3.current) videoRef3.current.style.opacity = videoPart === 3 ? "1" : "0";
      }
    } else {
      // Single video mode (original)
      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) return;
      const clamped = Math.max(0, Math.min(1, progress));
      targetTimeRef.current = clamped * video.duration * SCRUB_SPEED;
    }

    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const video = useSplitVideo 
        ? (currentPartRef.current === 1 ? videoRef.current : 
           currentPartRef.current === 2 ? videoRef2.current :
           videoRef3.current)
        : videoRef.current;
      
      if (!video || !video.duration) return;

      const current = video.currentTime;
      const target = targetTimeRef.current;
      const delta = target - current;
      const next =
        Math.abs(delta) > SNAP_THRESHOLD
          ? target
          : current + delta * LERP_FACTOR;

      if (Math.abs(next - current) > 0.002) {
        try {
          video.currentTime = next;
        } catch (_) {
          // Ignore seek errors during early load.
        }
      }
    });
  });

  useEffect(() => {
    const video = videoRef.current;
    const video2 = videoRef2.current;
    const video3 = videoRef3.current;
    if (!video && !video2 && !video3) return;

    const initAtZero = () => {
      try {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
        if (video2 && useSplitVideo) {
          video2.pause();
          video2.currentTime = 0;
        }
        if (video3 && useSplitVideo) {
          video3.pause();
          video3.currentTime = 0;
        }
      } catch (_) {
        // Ignore initialization errors.
      }
    };

    if (video && video.readyState >= 1) initAtZero();
    else if (video) video.addEventListener("loadedmetadata", initAtZero, { once: true });
    
    if (video2 && useSplitVideo) {
      if (video2.readyState >= 1) initAtZero();
      else video2.addEventListener("loadedmetadata", initAtZero, { once: true });
    }

    if (video3 && useSplitVideo) {
      if (video3.readyState >= 1) initAtZero();
      else video3.addEventListener("loadedmetadata", initAtZero, { once: true });
    }

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [useSplitVideo]);

  useEffect(() => {
    const video = videoRef.current;
    const video2 = videoRef2.current;
    const video3 = videoRef3.current;
    if (!video && !video2 && !video3) return;
    
    if (!enabled) {
      try {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
        if (video2) {
          video2.pause();
          video2.currentTime = 0;
        }
        if (video3) {
          video3.pause();
          video3.currentTime = 0;
        }
      } catch (_) {}
      return;
    }
    
    try {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      if (video2 && useSplitVideo) {
        video2.pause();
        video2.currentTime = 0;
      }
      if (video3 && useSplitVideo) {
        video3.pause();
        video3.currentTime = 0;
      }
    } catch (_) {}
  }, [enabled, useSplitVideo]);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ willChange: "transform" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          {useSplitVideo ? (
            <>
              <video
                ref={videoRef}
                poster={poster || undefined}
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                data-testid="hero-video-part1"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-100 ${
                  enabled ? "opacity-100" : "opacity-0"
                }`}
                style={{ opacity: 1 }}
              >
                <source src={srcPart1} type="video/mp4" />
              </video>
              <video
                ref={videoRef2}
                poster={poster || undefined}
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                data-testid="hero-video-part2"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-100 ${
                  enabled ? "opacity-100" : "opacity-0"
                }`}
                style={{ opacity: 0 }}
              >
                <source src={srcPart2} type="video/mp4" />
              </video>
              <video
                ref={videoRef3}
                poster={poster || undefined}
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                data-testid="hero-video-part3"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-100 ${
                  enabled ? "opacity-100" : "opacity-0"
                }`}
                style={{ opacity: 0 }}
              >
                <source src={srcPart3} type="video/mp4" />
              </video>
            </>
          ) : (
            <video
              ref={videoRef}
              poster={poster || undefined}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              loop
              data-testid="hero-video"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                enabled ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src={webmSrc} type="video/webm" />
              <source src={src} type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      {/* Global cinematic overlay like About, applied across all wrapped sections */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/35" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-black/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-56 bg-gradient-to-t from-[#080202] via-[#080202]/45 to-transparent" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
