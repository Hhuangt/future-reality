import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { HxrLogo, SohoLogo } from "./CollaboratorLogos";
import HeroHud from "./HeroHud";
import { buttonPrimary, buttonSecondary, EASE_OUT } from "./ui";

type HeroStageProps = {
  onOpenJury: () => void;
  openingActive?: boolean;
};

const titleLineVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 1.16,
    rotateX: 22,
    filter: "blur(20px)",
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.12 + index * 0.32,
      duration: 1.35,
      ease: EASE_OUT,
    },
  }),
};

const MAX_TILT_DEG = 3;

export default function HeroStage({ onOpenJury, openingActive = false }: HeroStageProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const frameX = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -12]);
  const posterScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.88]);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let frame = 0;
    let nextX = 0;

    const paint = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const offset = (nextX - rect.left - rect.width / 2) / (rect.width / 2);
      const clamped = Math.max(-1, Math.min(1, offset));
      node.style.setProperty("--tilt", `${(-clamped * MAX_TILT_DEG).toFixed(2)}deg`);
    };

    const onMove = (event: PointerEvent) => {
      nextX = event.clientX;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => node.style.setProperty("--tilt", "0deg");

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="hero-viewport"
      className={`stage poster-stage relative w-full ${openingActive ? "is-opening" : ""}`}
    >
      <div className="hero-deep-mask hero-deep-mask--home" aria-hidden="true" />
      <HeroHud />
      <motion.div className="hero-frame" style={{ x: frameX, scale: posterScale }}>
        <motion.div className="hero-shell" style={{ y: contentY, opacity: contentOpacity }}>
          <h2 className={`hero-title poster-title ${openingActive ? "poster-title--intro" : ""}`}>
            <span className="sr-only">Future Reality</span>
            <motion.img
              className="poster-title-line"
              src="/poster/future.png"
              alt=""
              width={2700}
              height={1300}
              fetchPriority="high"
              decoding="async"
              custom={0}
              variants={titleLineVariants}
              initial={openingActive && !reduced ? "hidden" : "visible"}
              animate="visible"
            />
            <motion.img
              className="poster-title-line"
              src="/poster/reality.png"
              alt=""
              width={2700}
              height={1300}
              decoding="async"
              custom={1}
              variants={titleLineVariants}
              initial={openingActive && !reduced ? "hidden" : "visible"}
              animate="visible"
            />
          </h2>

          <motion.div
            className="hero-sub -mt-4 md:-mt-6"
            initial={false}
            animate={{
              opacity: openingActive && !reduced ? 0 : 1,
              y: openingActive && !reduced ? 28 : 0,
              filter: openingActive && !reduced ? "blur(8px)" : "blur(0px)",
            }}
            transition={{ duration: 0.95, delay: openingActive ? 0 : 0.2, ease: EASE_OUT }}
          >
            <p className="font-serif text-[clamp(1.85rem,4.35vw,3.75rem)] font-black uppercase leading-none tracking-[-0.02em] text-brand-accent">
              AI Film Festival
            </p>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.45em] text-brand-muted md:mt-3 md:text-sm md:tracking-[0.5em]">
              New York
            </p>
          </motion.div>
          <motion.div
            className="hero-cta flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center"
            initial={false}
            animate={{
              opacity: openingActive && !reduced ? 0 : 1,
              y: openingActive && !reduced ? 20 : 0,
            }}
            transition={{ duration: 0.85, delay: openingActive ? 0 : 0.45, ease: EASE_OUT }}
          >
            <a
              href="https://luma.com/8pqcqqu0"
              target="_blank"
              rel="noreferrer"
              className={`${buttonPrimary} w-full sm:w-auto`}
              id="submit-film-hero-btn"
            >
              Purchase Early Bird Ticket
            </a>
            <button type="button" onClick={onOpenJury} className={`${buttonSecondary} w-full sm:w-auto`}>
              Meet the Jury
            </button>
          </motion.div>

          <motion.div
            className="hero-foot flex flex-col gap-6 border-t border-brand-line/80 pt-8 sm:flex-row sm:items-end sm:justify-between"
            initial={false}
            animate={{
              opacity: openingActive && !reduced ? 0 : 1,
              y: openingActive && !reduced ? 16 : 0,
            }}
            transition={{ duration: 0.85, delay: openingActive ? 0 : 0.55, ease: EASE_OUT }}
          >
            <p className="font-sans text-xs leading-5 text-brand-ink/85 md:text-sm sm:text-left">
              Regal Union Square
              <br />
              New York City
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5 sm:justify-end md:gap-7">
              <a
                href="https://sohofilmfest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="SOHO International Film Festival"
                id="hero-soho-logo-link"
              >
                <SohoLogo size="sm" variant="dark" className="!h-9 md:!h-11" />
              </a>
              <a href="https://harvardxr.com" target="_blank" rel="noreferrer" aria-label="Harvard XR" id="hero-hxr-logo-link">
                <HxrLogo size="sm" variant="dark" className="!h-7 md:!h-8" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span>Scroll to enter</span>
        <i />
      </div>
    </section>
  );
}
