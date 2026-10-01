import React, { ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const reveal = (delay = 0, distance = 36) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.9, ease: EASE_OUT, delay },
});

export function MaskLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.span
      className="block overflow-hidden pb-[0.06em] -mb-[0.06em]"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "105%" }, shown: { y: "0%" } }}
        transition={{ duration: 1, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

function ScrollWord({ word, progress, range, className }: { word: string; progress: MotionValue<number>; range: [number, number]; className?: string }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={className}>
      {word}{" "}
    </motion.span>
  );
}

export function ScrollWords({ lines }: { lines: { text: string; className?: string }[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = lines.flatMap((line, lineIndex) =>
    line.text.split(" ").map((word, i) => ({ word, className: line.className, key: `${lineIndex}-${i}`, breakBefore: lineIndex > 0 && i === 0 }))
  );
  return (
    <span ref={ref}>
      {words.map((w, i) => (
        <React.Fragment key={w.key}>
          {w.breakBefore && <br />}
          <ScrollWord word={w.word} className={w.className} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        </React.Fragment>
      ))}
    </span>
  );
}

export const buttonPrimary =
  "inline-flex items-center justify-center gap-2 px-7 py-4 bg-brand-accent text-brand-bg font-sans text-[12px] font-extrabold uppercase tracking-[0.2em] hover:bg-brand-accent-bright transition-colors cursor-pointer";

export const buttonSecondary =
  "inline-flex items-center justify-center gap-2 px-7 py-4 border border-brand-cream/35 text-brand-ink font-sans text-[12px] font-bold uppercase tracking-[0.2em] hover:border-brand-cream hover:bg-brand-cream/5 transition-colors cursor-pointer";

export const buttonText =
  "inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-brand-amber hover:text-brand-cream transition-colors cursor-pointer";

type SectionHeaderProps = {
  reel: string;
  label: string;
  title: string | string[];
  intro?: ReactNode;
};

export function SectionHeader({ reel, label, title, intro }: SectionHeaderProps) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <header className="space-y-8">
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6 }}
      >
        <span className="label whitespace-nowrap text-brand-copper">{reel} · {label}</span>
        <span className="h-px flex-1 bg-brand-line" aria-hidden="true" />
      </motion.div>
      <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-12">
        <h2 className="lg:col-span-8 font-display uppercase text-brand-ink text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.95]">
          {lines.map((line, i) => (
            <React.Fragment key={line}>
              <MaskLine delay={0.15 + i * 0.1}>{line}</MaskLine>
            </React.Fragment>
          ))}
        </h2>
        {intro && (
          <motion.p className="lg:col-span-4 font-serif text-base md:text-lg text-brand-muted leading-relaxed" {...reveal(0.35, 20)}>
            {intro}
          </motion.p>
        )}
      </div>
    </header>
  );
}

// Deterministic pseudo-random so the streak field renders identically every time.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const streaks = (() => {
  const rand = seeded(7);
  return Array.from({ length: 70 }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    w: rand() > 0.85 ? 3 : 1,
    h: 8 + rand() * 40,
    o: 0.04 + rand() * 0.16,
  }));
})();

export function StreakField({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {streaks.map((s, i) => (
        <rect key={i} x={s.x} y={s.y} width={s.w * 0.08} height={s.h} fill="#e09a62" opacity={s.o} />
      ))}
    </svg>
  );
}

const crosshairs = [
  { left: "12%", top: "30%" },
  { left: "88%", top: "22%" },
  { left: "80%", top: "70%" },
  { left: "18%", top: "76%" },
];

export function Crosshair({ style }: { style?: React.CSSProperties }) {
  return (
    <span className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={style} aria-hidden="true">
      <span className="absolute left-0 top-1/2 h-px w-full bg-brand-cream/35" />
      <span className="absolute top-0 left-1/2 w-px h-full bg-brand-cream/35" />
    </span>
  );
}

export function Orbits({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full">
        <circle cx="-6%" cy="42%" r="30%" fill="none" stroke="#d4874f" strokeOpacity="0.28" strokeWidth="1" />
        <circle cx="106%" cy="56%" r="26%" fill="none" stroke="#d4874f" strokeOpacity="0.22" strokeWidth="1" />
      </svg>
      {crosshairs.map((pos) => (
        <React.Fragment key={`${pos.left}${pos.top}`}>
          <Crosshair style={pos} />
        </React.Fragment>
      ))}
    </div>
  );
}
