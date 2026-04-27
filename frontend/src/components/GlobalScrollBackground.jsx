import { useEffect, useRef } from "react";

/*
 * GlobalScrollBackground
 * ──────────────────────────────────────────────────────────────────────────
 * One fixed canvas + one fixed video layer. As the user scrolls, the
 * background plays through multiple sequences. The hero sequence is now
 * a video (hero2.mp4), while remaining sections keep their image frames.
 */

const SEQUENCES = [
  { type: "video", src: "/hero2.mp4", weight: 96 },
  { type: "frames", dir: "/artistintro-jpg/", count: 176, weight: 176 },
  { type: "frames", dir: "/testinomials-jpg/", count: 176, weight: 176 },
  { type: "frames", dir: "/Mid-pageinterlude/", count: 176, weight: 176 },
  { type: "frames", dir: "/finalcta/", count: 112, weight: 260 },
];

const PREFIX = "ezgif-frame-";
const EXT = ".jpg";
const TOTAL_WEIGHT = SEQUENCES.reduce((s, q) => s + q.weight, 0);
const SCROLL_SMOOTHING = 0.12;
const MIN_SEEK_DELTA = 0.02;

const BREAKS = (() => {
  const b = [0];
  let cum = 0;
  for (const seq of SEQUENCES) {
    cum += seq.weight;
    b.push(cum / TOTAL_WEIGHT);
  }
  return b;
})();

function resolveSegment(p) {
  const clamped = Math.max(0, Math.min(1, p));
  for (let i = 0; i < SEQUENCES.length; i++) {
    const isLast = i === SEQUENCES.length - 1;
    if (clamped <= BREAKS[i + 1] || isLast) {
      const range = BREAKS[i + 1] - BREAKS[i];
      const localP = range > 0 ? Math.max(0, Math.min(1, (clamped - BREAKS[i]) / range)) : 0;
      return { seqIdx: i, localP, seq: SEQUENCES[i] };
    }
  }
  return { seqIdx: 0, localP: 0, seq: SEQUENCES[0] };
}

// ── Component ────────────────────────────────────────────────────────────
export default function GlobalScrollBackground({ overlayOpacity = 0.44 }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const loadedImages = useRef([]);
  const lastSeqIdx = useRef(-1);
  const lastFrameIdx = useRef(-1);
  const rafId = useRef(0);
  const currentProgress = useRef(0);
  const targetProgress = useRef(0);
  const lastTime = useRef(-1);
  const lastMode = useRef("frames");

  const paint = (seqIdx, frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = loadedImages.current[seqIdx]?.[frameIdx];
    if (!img || !img.complete || !img.naturalWidth) return;

    if (seqIdx === lastSeqIdx.current && frameIdx === lastFrameIdx.current) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const viewportAspect = window.innerWidth / Math.max(window.innerHeight, 1);
    const imageAspect = iw / Math.max(ih, 1);
    const shouldContainOnSmallScreens = window.innerWidth < 640 && viewportAspect < imageAspect;
    const scale = shouldContainOnSmallScreens
      ? Math.min(cw / iw, ch / ih)
      : Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    ctx.fillStyle = "#080202";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);

    lastSeqIdx.current = seqIdx;
    lastFrameIdx.current = frameIdx;
  };

  const seekVideo = (progress) => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    const clamped = Math.max(0, Math.min(1, progress));
    const nextTime = clamped * video.duration;
    if (Math.abs(nextTime - lastTime.current) < MIN_SEEK_DELTA) return;

    try {
      video.currentTime = nextTime;
      lastTime.current = nextTime;
    } catch (_) {
      // Ignore seek errors during early load.
    }
  };

  // ── Preload all frame sequences in parallel ───────────────────────────
  useEffect(() => {
    const bank = SEQUENCES.map((seq) =>
      seq.type === "frames" ? new Array(seq.count).fill(null) : null
    );
    loadedImages.current = bank;
    lastSeqIdx.current = -1;
    lastFrameIdx.current = -1;

    let aborted = false;

    SEQUENCES.forEach((seq, sIdx) => {
      if (seq.type !== "frames") return;
      for (let f = 0; f < seq.count; f++) {
        const img = new Image();
        const fi = f;
        img.decoding = "async";
        img.onload = () => {
          if (aborted) return;
          bank[sIdx][fi] = img;
          if (sIdx === 1 && fi === 0) paint(sIdx, 0);
        };
        img.src = `${seq.dir}${PREFIX}${String(f + 1).padStart(3, "0")}${EXT}`;
      }
    });

    return () => {
      aborted = true;
      loadedImages.current = [];
    };
  }, []);

  // ── Canvas sizing (DPR-aware, capped at 2×) ───────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      if (lastSeqIdx.current >= 0) paint(lastSeqIdx.current, lastFrameIdx.current);
    };

    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  // ── Initialize video to 0 once metadata is ready ─────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const initAtZero = () => {
      try {
        video.pause();
        video.currentTime = 0;
        lastTime.current = 0;
      } catch (_) {
        // Ignore initialization errors.
      }
    };

    if (video.readyState >= 1) initAtZero();
    else video.addEventListener("loadedmetadata", initAtZero, { once: true });

    return () => {
      video.removeEventListener("loadedmetadata", initAtZero);
    };
  }, []);

  // ── Scroll → paint/scrub ─────────────────────────────────────────────
  useEffect(() => {
    const getProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      return scrollable > 0 ? window.scrollY / scrollable : 0;
    };

    const setVideoActive = (active) => {
      const video = videoRef.current;
      if (!video) return;
      const nextOpacity = active ? "1" : "0";
      if (video.style.opacity !== nextOpacity) video.style.opacity = nextOpacity;
    };

    const tick = () => {
      const delta = targetProgress.current - currentProgress.current;

      if (Math.abs(delta) < 0.0005) {
        currentProgress.current = targetProgress.current;
      } else {
        currentProgress.current += delta * SCROLL_SMOOTHING;
      }

      const { seqIdx, localP, seq } = resolveSegment(currentProgress.current);

      if (seq.type === "video") {
        if (lastMode.current !== "video") {
          setVideoActive(true);
          lastMode.current = "video";
        }
        seekVideo(localP);
      } else {
        if (lastMode.current !== "frames") {
          setVideoActive(false);
          lastMode.current = "frames";
        }
        const frameIdx = Math.round(localP * (seq.count - 1));
        paint(seqIdx, frameIdx);
      }

      if (Math.abs(delta) < 0.0005) {
        rafId.current = 0;
        return;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    const requestSmoothPaint = () => {
      targetProgress.current = getProgress();
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", requestSmoothPaint, { passive: true });
    window.addEventListener("resize", requestSmoothPaint);

    requestAnimationFrame(() => {
      targetProgress.current = getProgress();
      currentProgress.current = targetProgress.current;
      const { seqIdx, localP, seq } = resolveSegment(currentProgress.current);
      if (seq.type === "video") {
        lastMode.current = "video";
        setVideoActive(true);
        seekVideo(localP);
      } else {
        lastMode.current = "frames";
        setVideoActive(false);
        const frameIdx = Math.round(localP * (seq.count - 1));
        paint(seqIdx, frameIdx);
      }
    });

    return () => {
      window.removeEventListener("scroll", requestSmoothPaint);
      window.removeEventListener("resize", requestSmoothPaint);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* 1 — Dark base: prevents white flash before assets load */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -3,
          background: "#080202",
        }}
      />

      {/* 2 — Frame animation canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: -2,
          display: "block",
          transform: "translateZ(0)",
        }}
      />

      {/* 3 — Scroll-scrubbed hero video (only visible during its segment) */}
      <video
        ref={videoRef}
        aria-hidden
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
          display: "block",
          opacity: 0,
          transition: "opacity 120ms linear",
        }}
      >
        <source src="/hero2.mp4" type="video/mp4" />
      </video>

      {/* 4 — Cinematic dark veil: ensures all text is readable */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background: `rgba(0,0,0,${overlayOpacity})`,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
