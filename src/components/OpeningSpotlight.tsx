import { type PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type OpeningSpotlightProps = {
  onComplete: () => void;
};

const AUTO_REVEAL_MS = 3200;
const REVEAL_DURATION_MS = 1400;

export default function OpeningSpotlight({ onComplete }: OpeningSpotlightProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const frameRef = useRef(0);
  const completeTimerRef = useRef<number | null>(null);
  const revealingRef = useRef(false);
  const [revealing, setRevealing] = useState(false);
  const reducedMotion = useReducedMotion();

  const reveal = useCallback(() => {
    if (revealingRef.current) return;
    revealingRef.current = true;
    setRevealing(true);

    completeTimerRef.current = window.setTimeout(
      onComplete,
      reducedMotion ? 0 : REVEAL_DURATION_MS,
    );
  }, [onComplete, reducedMotion]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousRestoration = window.history.scrollRestoration;
    document.body.style.overflow = "hidden";
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0 });

    const autoRevealTimer = window.setTimeout(reveal, reducedMotion ? 400 : AUTO_REVEAL_MS);
    return () => {
      window.clearTimeout(autoRevealTimer);
      if (completeTimerRef.current !== null) window.clearTimeout(completeTimerRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      document.body.style.overflow = previousOverflow;
      window.history.scrollRestoration = previousRestoration;
    };
  }, [reveal, reducedMotion]);

  const moveSpotlight = (event: PointerEvent<HTMLButtonElement>) => {
    if (revealing || event.pointerType === "touch") return;
    const x = event.clientX;
    const y = event.clientY;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty("--opening-x", `${x}px`);
      ref.current?.style.setProperty("--opening-y", `${y}px`);
      frameRef.current = 0;
    });
  };

  return (
    <button
      ref={ref}
      type="button"
      className={`opening-spotlight ${revealing ? "is-revealing" : ""}`}
      onPointerMove={moveSpotlight}
      onClick={reveal}
      aria-label="Enter the Future Reality AI Film Festival website"
    >
      <div className="opening-curtain" aria-hidden="true" />
      <div className="opening-scan" aria-hidden="true" />

      <motion.div
        className="opening-chrome"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealing ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <span className="opening-chrome__tag">Future Reality · Sequence 01</span>
        <span className="opening-chrome__hint">Move light · Click to enter</span>
      </motion.div>

      <div className="opening-frame" aria-hidden="true">
        <span className="opening-frame__corner opening-frame__corner--tl" />
        <span className="opening-frame__corner opening-frame__corner--tr" />
        <span className="opening-frame__corner opening-frame__corner--bl" />
        <span className="opening-frame__corner opening-frame__corner--br" />
      </div>

      <span className="opening-ring" aria-hidden="true" />
      <span className="opening-mask-hole" aria-hidden="true" />

      <motion.div
        className="opening-burst"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={revealing ? { opacity: [0, 0.85, 0], scale: [0.6, 2.4, 3] } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: reducedMotion ? 0.01 : 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      <span className="sr-only">Click to enter. The website will open automatically after a few seconds.</span>
    </button>
  );
}
