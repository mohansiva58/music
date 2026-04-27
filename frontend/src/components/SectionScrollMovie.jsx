import { useRef } from "react";
import ScrollFrameCanvas from "./ScrollFrameCanvas";

/**
 * SectionScrollMovie — Pure background scroll-movie section.
 *
 * ● NO content/children rendered on top. Background only.
 * ● Creates the outer scrollable container + sticky canvas itself,
 *   then passes both refs down to ScrollFrameCanvas.
 * ● scrollHeight controls how long the user must scroll (e.g. "250vh").
 *   Longer = slower, more cinematic. Shorter = faster cut.
 *
 * Props:
 *  id            — anchor id
 *  frameDir      — "/herosection-jpg/"
 *  totalFrames   — e.g. 240
 *  scrollHeight  — css height string, e.g. "280vh"
 *  overlayOpacity— [0-1] darkness of the cinematic overlay, default 0.35
 *  framePrefix   — "ezgif-frame-" (default)
 *  ext           — ".jpg" (default)
 */
export default function SectionScrollMovie({
  id,
  frameDir,
  totalFrames,
  scrollHeight = "220vh",
  overlayOpacity = 0.18,
  framePrefix = "ezgif-frame-",
  ext = ".jpg",
}) {
  // outerRef → the tall scrollable section element
  const outerRef = useRef(null);
  // canvasRef → the canvas element inside the sticky pane
  const canvasRef = useRef(null);

  return (
    /*
     * Outer: full-width, height = scrollHeight.
     * This is the element that actually scrolls — the "scroll track."
     */
    <section
      id={id}
      ref={outerRef}
      style={{
        position: "relative",
        width: "100%",
        height: scrollHeight,
        // Prevent margin collapse with adjacent sections
        isolation: "isolate",
      }}
    >
      {/*
       * Sticky pane: stays fixed at top of viewport while outer scrolls.
       * 100vh tall, clips everything outside.
       */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#080202", // match site bg — fills before first frame loads
        }}
      >
        {/* THE CANVAS — fills the sticky pane edge-to-edge */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
            // GPU-composite the canvas on its own layer
            willChange: "contents",
            transform: "translateZ(0)",
          }}
        />

        {/* ── Cinematic overlays (no content, pure atmosphere) ────────── */}

        {/* Global dark veil */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `rgba(0,0,0,${overlayOpacity})`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Top gradient: blends with section above */}
        <div
          style={{
            position: "absolute",
            inset: "0 0 auto 0",
            height: "20%",
            background: "linear-gradient(to bottom, rgba(8,2,2,0.75) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Bottom gradient: blends into section below */}
        <div
          style={{
            position: "absolute",
            inset: "auto 0 0 0",
            height: "22%",
            background: "linear-gradient(to top, rgba(8,2,2,0.75) 0%, rgba(8,2,2,0.28) 55%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Subtle left rim light for depth */}
        <div
          style={{
            position: "absolute",
            inset: "0 auto 0 0",
            width: "8%",
            background: "linear-gradient(to right, rgba(140,160,220,0.045), transparent)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      </div>

      {/*
       * The actual scroll-frame logic — renders nothing in the DOM itself,
       * just listens to window scroll and paints onto canvasRef.
       */}
      <ScrollFrameCanvas
        outerRef={outerRef}
        canvasRef={canvasRef}
        frameDir={frameDir}
        totalFrames={totalFrames}
        framePrefix={framePrefix}
        ext={ext}
      />
    </section>
  );
}
