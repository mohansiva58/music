import { useEffect, useRef } from "react";

/**
 * ScrollFrameCanvas — Apple-style scroll-scrubbed image sequence.
 *
 * DESIGN:
 *  • NO lerp. Scroll progress maps 1:1 to frame index → zero lag.
 *  • Native window scroll listener (passive) → no Framer Motion cost.
 *  • Single rAF per scroll event (coalesced) → never doubles up.
 *  • Parallel image preloading → all frames requested at once.
 *  • Render-on-demand: only redraws when frame index actually changes.
 *  • Canvas sized at devicePixelRatio (capped 2×) → crisp on retina.
 *
 * The outer scrollable container ref + the canvas ref are passed IN from the
 * parent (SectionScrollMovie) — this component is renderless (returns null).
 */
export default function ScrollFrameCanvas({
  outerRef,   // ref to the tall <section> — the "scroll track"
  canvasRef,  // ref to the <canvas> inside the sticky pane
  frameDir,
  totalFrames = 60,
  framePrefix = "ezgif-frame-",
  ext = ".jpg",
}) {
  const images    = useRef([]); // HTMLImageElement[]
  const loadedSet = useRef(new Set()); // indices that finished loading
  const lastIdx   = useRef(-1);
  const rafPending= useRef(false);

  // ── URL builder ──────────────────────────────────────────────────────────
  const frameUrl = (i) =>
    `${frameDir}${framePrefix}${String(i + 1).padStart(3, "0")}${ext}`;

  // ── Cover-fit draw ───────────────────────────────────────────────────────
  const drawIdx = (idx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = images.current[idx];
    if (!img || !img.complete || !img.naturalWidth) return;

    // Only redraw if something actually changed
    if (idx === lastIdx.current &&
        canvas.width > 0 && canvas.height > 0 &&
        canvas.dataset.lastW === String(canvas.width)) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);

    lastIdx.current = idx;
    canvas.dataset.lastW = String(canvas.width);
  };

  // ── Preload: all frames in parallel ─────────────────────────────────────
  useEffect(() => {
    const list = new Array(totalFrames).fill(null);
    images.current = list;
    loadedSet.current = new Set();
    lastIdx.current = -1;

    let aborted = false;

    const loadOne = (i) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (aborted) return;
        list[i] = img;
        loadedSet.current.add(i);
        // Paint frame 0 as soon as it's ready
        if (i === 0) drawIdx(0);
      };
      img.onerror = () => {};
      img.src = frameUrl(i);
    };

    // Fire all loads simultaneously — the browser will queue them
    // via its own HTTP connection pool (usually 6 parallel per host)
    for (let i = 0; i < totalFrames; i++) loadOne(i);

    return () => {
      aborted = true;
      images.current = [];
      loadedSet.current = new Set();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameDir, totalFrames]);

  // ── Canvas DPR sizing ────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const targetW = Math.round(w * dpr);
      const targetH = Math.round(h * dpr);
      if (canvas.width === targetW && canvas.height === targetH) return;
      canvas.width  = targetW;
      canvas.height = targetH;
      // Redraw after resize
      if (lastIdx.current >= 0) drawIdx(lastIdx.current);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Scroll → frame paint ─────────────────────────────────────────────────
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    // Compute scroll progress:
    //  • outerEl offset from page top = outerEl.offsetTop (ignores sticky)
    //  • scrollable range = section height - viewport height
    //  • progress = (scrollY - outerEl.offsetTop) / scrollableRange
    const getProgress = () => {
      const outerEl = outerRef.current;
      if (!outerEl) return 0;
      const offsetTop  = outerEl.offsetTop;
      const sectionH   = outerEl.offsetHeight;
      const vpH        = window.innerHeight;
      const scrollable = sectionH - vpH;
      if (scrollable <= 0) return 0;
      const raw = (window.scrollY - offsetTop) / scrollable;
      return Math.max(0, Math.min(1, raw));
    };

    const handleScroll = () => {
      if (rafPending.current) return;
      rafPending.current = true;
      requestAnimationFrame(() => {
        rafPending.current = false;
        const progress = getProgress();
        // 1:1 mapping — no lerp
        const idx = Math.round(progress * (totalFrames - 1));
        drawIdx(idx);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Draw initial frame immediately
    requestAnimationFrame(() => drawIdx(Math.round(getProgress() * (totalFrames - 1))));

    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames]);

  return null; // Renderless — all DOM is owned by SectionScrollMovie
}
