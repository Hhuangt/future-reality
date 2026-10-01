import { type PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type OpeningSpotlightProps = {
  onComplete: () => void;
};

const AUTO_REVEAL_MS = 3000;
const REVEAL_DURATION_MS = 1200;

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

    const autoRevealTimer = window.setTimeout(reveal, AUTO_REVEAL_MS);
    return () => {
      window.clearTimeout(autoRevealTimer);
      if (completeTimerRef.current !== null) window.clearTimeout(completeTimerRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      document.body.style.overflow = previousOverflow;
      window.history.scrollRestoration = previousRestoration;
    };
  }, [reveal]);

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
      <span className="opening-mask-hole" aria-hidden="true" />
      <span className="sr-only">Click to enter. The website will open automatically after three seconds.</span>
    </button>
  );
}
