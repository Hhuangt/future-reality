import { useState } from "react";
import { motion } from "motion/react";
import { winners, Winner } from "../winnersData";
import { assetUrl } from "../lib/assetUrl";
import { WinnerModal } from "./WinnersPage";
import { buttonPrimary, MaskLine, reveal } from "./ui";

function WinnerCard({ winner, index, onOpen }: { winner: Winner; index: number; onOpen: () => void }) {
  return (
    <motion.article
      {...reveal((index % 4) * 0.08, 36)}
      className="h-full"
    >
      <button
        type="button"
        onClick={onOpen}
        className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden border border-brand-line bg-brand-surface text-left transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-brand-copper/60 hover:shadow-[0_22px_60px_rgba(0,0,0,0.38)]"
        aria-label={`View synopsis for ${winner.title}`}
      >
      <div className="absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-brand-amber to-transparent transition-transform duration-700 group-hover:scale-x-100" aria-hidden="true" />

      <div className="relative h-72 w-full overflow-hidden border-b border-brand-line bg-black md:h-80">
        <img
          src={assetUrl(winner.poster)}
          alt={`${winner.title} poster`}
          className="h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-[1.035]"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 font-mono text-[9px] tracking-[0.2em] text-white/75">
          {String(index + 1).padStart(2, "0")} / WINNER
        </span>
      </div>

      <div className="grid min-h-[13.5rem] shrink-0 gap-4 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0">
          <span className="label text-[9px] text-brand-copper">2026 Award Winner</span>
          {winner.awards.map((award) => (
            <p key={award.title} className="mt-2 font-display text-[clamp(1.8rem,2.6vw,2.4rem)] uppercase leading-[0.95] text-brand-amber">
              {award.title}
            </p>
          ))}
          <h3 className="mt-3 font-display text-[clamp(1.8rem,2.4vw,2.4rem)] uppercase leading-[0.92] text-brand-ink">
            {winner.title}
          </h3>
          <p className="mt-2 font-serif text-sm leading-relaxed text-brand-muted">
            Directed by <span className="text-brand-cream">{winner.directors}</span>
          </p>
          <p className="label mt-4 text-[10px] text-brand-amber">View synopsis</p>
        </div>
        <div className="flex gap-2 sm:flex-col">
          {winner.awards.map((award) => (
            <img
              key={award.title}
              src={assetUrl(award.laurel)}
              alt={`${award.title} winner laurel`}
              className="h-32 w-48 object-contain"
              loading="lazy"
            />
          ))}
        </div>
      </div>
      </button>
    </motion.article>
  );
}

export default function WinnersSection({ onOpen }: { onOpen: () => void }) {
  const [selected, setSelected] = useState<Winner | null>(null);

  return (
    <section
      id="winners-section"
      className="relative scroll-mt-20 overflow-hidden border-t border-brand-line"
      aria-labelledby="winners-title"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 72% 12%, rgba(237,87,56,0.2), transparent 33%), radial-gradient(circle at 8% 48%, rgba(200,61,48,0.12), transparent 28%), linear-gradient(180deg, rgba(9,9,8,0.1), rgba(9,9,8,0.9))",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-24 select-none text-center font-display text-[clamp(8rem,24vw,23rem)] uppercase leading-none text-brand-accent/[0.035]" aria-hidden="true">
        Winners
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-16 md:py-28">
        <div className="mb-12 border-b border-brand-line pb-10 text-center md:mb-16 md:pb-14">
          <motion.div {...reveal(0, 24)}>
            <span className="label text-brand-copper">03 · 2026 Awards Announcement</span>
            <h2
              id="winners-title"
              className="mt-5 font-display text-[clamp(5rem,14vw,12rem)] uppercase leading-[0.84] text-brand-ink"
            >
              <MaskLine delay={0.1}>The Winners</MaskLine>
            </h2>
            <p className="mx-auto mt-7 max-w-2xl font-serif text-lg leading-relaxed text-brand-ink/85 md:text-xl">
              Nine films. Ten awards. The defining work of the 2026 Future Reality AI Film Festival.
            </p>
            <button type="button" onClick={onOpen} className={`${buttonPrimary} mt-8`}>
              View all winners
              <span className="material-symbols-outlined ml-2" aria-hidden="true">arrow_forward</span>
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-7 xl:grid-cols-2">
          {winners.slice(0, 4).map((winner, index) => (
            <div key={`${winner.id}-${winner.awards[0].title}`} className="h-full">
              <WinnerCard winner={winner} index={index} onOpen={() => setSelected(winner)} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button type="button" onClick={onOpen} className={buttonPrimary}>
            Discover all 9 winning films
            <span className="material-symbols-outlined ml-2" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>
      <WinnerModal selected={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

