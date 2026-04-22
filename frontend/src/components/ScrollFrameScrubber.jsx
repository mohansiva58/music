import React, { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent, useTransform } from "framer-motion";

/**
 * ScrollFrameScrubber - Maps scroll progress to frame index for frame-by-frame animation
 * Every pixel scrolled changes the frame instantly
 */
export function useScrollFrames(totalFrames = 60) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Map scroll 0-1 to frame index 0-totalFrames
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  return { ref, frameIndex, scrollYProgress };
}

/**
 * FrameRenderer - Renders frame-indexed element instantly (no interpolation)
 */
export function FrameRenderer({ frameIndex, frameData, className }) {
  const [currentFrame, setCurrentFrame] = React.useState(0);

  useMotionValueEvent(frameIndex, "change", (v) => {
    setCurrentFrame(Math.round(v));
  });

  const frame = frameData[Math.min(currentFrame, frameData.length - 1)];

  return (
    <div className={className}>
      {frame}
    </div>
  );
}
