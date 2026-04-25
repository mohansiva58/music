import { useEffect, useRef } from "react";

/*
 * GlobalScrollBackground
 * ──────────────────────────────────────────────────────────────────────────
 * One fixed canvas that covers the entire viewport — z-index underneath
 * all page content. As the user scrolls, it plays through 5 image sequences
 * end-to-end proportional to total page scroll progress (0 → 100%).
 *
 * Sequence order  (user spec):
 *   0  herosection-jpg   240 frames  → top of page
 *   1  artistintro-jpg   176 frames
 *   2  testinomials-jpg  176 frames
 *   3  Mid-pageinterlude 176 frames
 *   4  finalcta          184 frames  → bottom of page
 *
 * Total: 952 frames, each sequence weighted proportionally.
 *
 * Performance contract:
 *  • Single canvas, single scroll listener (passive).
 *  • One rAF per scroll event (coalesced — never doubles up).
 *  • Draw only when frame index changes.
 *  • All images loaded in parallel (browser limits to ~6 TCP connections
 *    per host; they'll queue automatically).
 *  • Canvas sized at min(devicePixelRatio, 2) × viewport.
 */

// ── Sequence manifest ────────────────────────────────────────────────────
const SEQUENCES = [
  { dir: "/herosection.jpg/",   count: 96  },
  { dir: "/artistintro-jpg/",   count: 176 },
  { dir: "/testinomials-jpg/",  count: 176 },
  { dir: "/Mid-pageinterlude/", count: 176 },
  { dir: "/finalcta/",          count: 184 },
];
const PREFIX = "ezgif-frame-";
const EXT    = ".jpg";

const TOTAL = SEQUENCES.reduce((s, q) => s + q.count, 0); // 952

// Cumulative break-points [0 … 1] in page-progress space
const BREAKS = (() => {
  const b = [0];
  let cum = 0;
  for (const seq of SEQUENCES) {
    cum += seq.count;
    b.push(cum / TOTAL);
  }
  return b; // [0, ~0.252, ~0.437, ~0.622, ~0.807, 1]
})();

/**
 * Given page progress p ∈ [0,1], returns the sequence index and frame index
 * inside that sequence.
 */
function resolveFrame(p) {
  const clamped = Math.max(0, Math.min(1, p));
  for (let i = 0; i < SEQUENCES.length; i++) {
    const isLast = i === SEQUENCES.length - 1;
    if (clamped <= BREAKS[i + 1] || isLast) {
      const range  = BREAKS[i + 1] - BREAKS[i];
      const localP = range > 0 ? Math.max(0, Math.min(1, (clamped - BREAKS[i]) / range)) : 0;
      return {
        seqIdx:   i,
        frameIdx: Math.round(localP * (SEQUENCES[i].count - 1)),
      };
    }
  }
  return { seqIdx: 0, frameIdx: 0 };
}

// ── Component ────────────────────────────────────────────────────────────
export default function GlobalScrollBackground({ overlayOpacity = 0.44 }) {
  const canvasRef      = useRef(null);
  // 2-D array: loadedImages[seqIdx][frameIdx] = HTMLImageElement | null
  const loadedImages   = useRef([]);
  const lastSeqIdx     = useRef(-1);
  const lastFrameIdx   = useRef(-1);
  const rafPending     = useRef(false);

  // ── Cover-fit draw ─────────────────────────────────────────────────────
  const paint = (seqIdx, frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = loadedImages.current[seqIdx]?.[frameIdx];
    if (!img || !img.complete || !img.naturalWidth) return;

    // Skip redraw if nothing changed
    if (seqIdx === lastSeqIdx.current && frameIdx === lastFrameIdx.current) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cw = canvas.width,  ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale, dh = ih * scale;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);

    lastSeqIdx.current   = seqIdx;
    lastFrameIdx.current = frameIdx;
  };

  // ── Preload all sequences in parallel ──────────────────────────────────
  useEffect(() => {
    // Initialise 2D array
    const bank = SEQUENCES.map((seq) => new Array(seq.count).fill(null));
    loadedImages.current = bank;
    lastSeqIdx.current   = -1;
    lastFrameIdx.current = -1;

    let aborted = false;

    SEQUENCES.forEach((seq, sIdx) => {
      for (let f = 0; f < seq.count; f++) {
        const img = new Image();
        const fi  = f;
        img.decoding = "async";
        img.onload   = () => {
          if (aborted) return;
          bank[sIdx][fi] = img;
          // Draw first frame of first sequence as soon as it's ready
          if (sIdx === 0 && fi === 0) paint(0, 0);
        };
        img.src = `${seq.dir}${PREFIX}${String(f + 1).padStart(3, "0")}${EXT}`;
      }
    });

    return () => {
      aborted = true;
      loadedImages.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Canvas sizing (DPR-aware, capped at 2×) ────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w   = Math.round(window.innerWidth  * dpr);
      const h   = Math.round(window.innerHeight * dpr);
      if (canvas.width === w && canvas.height === h) return;
      canvas.width  = w;
      canvas.height = h;
      // Repaint after resize
      if (lastSeqIdx.current >= 0) paint(lastSeqIdx.current, lastFrameIdx.current);
    };

    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Scroll → paint ─────────────────────────────────────────────────────
  useEffect(() => {
    const getProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      return scrollable > 0 ? window.scrollY / scrollable : 0;
    };

    const onScroll = () => {
      if (rafPending.current) return; // coalesce
      rafPending.current = true;
      requestAnimationFrame(() => {
        rafPending.current = false;
        const { seqIdx, frameIdx } = resolveFrame(getProgress());
        paint(seqIdx, frameIdx);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Draw initial state
    requestAnimationFrame(() => {
      const { seqIdx, frameIdx } = resolveFrame(getProgress());
      paint(seqIdx, frameIdx);
    });

    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* 1 — Dark base: prevents white flash before images load */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -3,
          background: "#080202",
        }}
      />

      {/* 2 — The animated canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          width:  "100%",
          height: "100%",
          zIndex: -2,
          display: "block",
          transform: "translateZ(0)",   // promote to GPU layer
        }}
      />

      {/* 3 — Cinematic dark veil: ensures all text is readable */}
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
