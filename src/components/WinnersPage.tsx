import { useState } from "react";
import { motion } from "motion/react";
import { finalists } from "../finalistsData";
import { winners, Winner } from "../winnersData";
import { assetUrl } from "../lib/assetUrl";
import Modal from "./Modal";
import { MaskLine, reveal } from "./ui";

function filmFor(winner: Winner) {
  return finalists.find((film) => film.id === winner.id);
}

function fullSynopsis(winner: Winner) {
  const synopsis = filmFor(winner)?.synopsis.trim();
  if (!synopsis) return `${winner.title} is an official award winner at the 2026 Future Reality AI Film Festival.`;
  return synopsis;
}

export function WinnerModal({ selected, onClose }: { selected: Winner | null; onClose: () => void }) {
  const film = selected ? filmFor(selected) : undefined;

  return (
    <Modal
      isOpen={selected !== null}
      onClose={onClose}
      title={selected?.title ?? ""}
      kicker={selected ? selected.awards.map((award) => award.title).join(" · ") : undefined}
      size="wide"
    >
      {selected && (
        <div className="grid items-start gap-8 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-10">
          <aside className="min-w-0 space-y-5">
            <div>
              <span className="label block h-4 text-[9px] text-brand-copper">Poster</span>
              <div className="mt-3 overflow-hidden border border-brand-line bg-black">
                <img
                  src={assetUrl(selected.poster)}
                  alt={`${selected.title} poster`}
                  className="h-auto max-h-[58vh] w-full object-contain"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {selected.awards.map((award) => (
                <img
                  key={award.title}
                  src={assetUrl(award.laurel)}
                  alt={`${award.title} winner laurel`}
                  className="h-24 w-36 object-contain"
                />
              ))}
            </div>
            <dl className="border-t border-brand-line">
              {[
                ["Award", selected.awards.map((award) => award.title).join(" · ")],
                ["Director", selected.directors],
                ["Country", film?.country],
                ["Runtime", film?.runtime],
                ["Language", film?.language],
              ]
                .filter(([, value]) => Boolean(value))
                .map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-brand-line py-3">
                    <dt className="label text-[9px] text-brand-muted">{label}</dt>
                    <dd className="font-serif text-sm leading-snug text-brand-ink">{value}</dd>
                  </div>
                ))}
            </dl>
          </aside>

          <div className="min-w-0 space-y-7">
            <div>
              <span className="label block h-4 text-[9px] text-brand-copper">Synopsis</span>
              <p className="mt-3 whitespace-pre-line font-serif text-[15px] leading-relaxed text-brand-ink/90">
                {fullSynopsis(selected)}
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

function AwardNames({ winner }: { winner: Winner }) {
  return (
    <div className="space-y-1">
      {winner.awards.map((award) => (
        <p
          key={award.title}
          className="font-display text-[clamp(1.8rem,2.6vw,2.4rem)] uppercase leading-[0.95] text-brand-amber"
        >
          {award.title}
        </p>
      ))}
    </div>
  );
}

function WinnerDetailCard({ winner, index, onOpen }: { winner: Winner; index: number; onOpen: () => void }) {
  return (
    <motion.article
      {...reveal((index % 2) * 0.1, 40)}
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
          className="h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-[1.025]"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 font-mono text-[9px] tracking-[0.2em] text-white/75">
          {String(index + 1).padStart(2, "0")} / WINNER
        </span>
      </div>

      <div className="grid min-h-[13.5rem] shrink-0 gap-4 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0">
          <span className="label text-[9px] text-brand-copper">2026 Official Award</span>
          <div className="mt-2">
            <AwardNames winner={winner} />
          </div>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,2.4vw,2.4rem)] uppercase leading-[0.92] text-brand-ink">
            {winner.title}
          </h2>
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

export default function WinnersPage() {
  const [selected, setSelected] = useState<Winner | null>(null);

  return (
    <div id="winners-page">
      <section className="relative overflow-hidden border-b border-brand-line jury-surface">
        <div className="hero-deep-mask hero-deep-mask--jury" aria-hidden="true" />
        <div className="relative z-[1] mx-auto max-w-7xl px-6 pb-20 pt-40 text-center md:px-16">
          <span className="font-serif text-sm font-semibold uppercase tracking-[0.2em] text-brand-cream">
            2026 Awards Announcement
          </span>
          <h1 className="mt-5 pb-[0.08em] pt-[0.06em] font-display text-[clamp(4.5rem,13vw,11rem)] uppercase leading-[0.92] text-brand-ink">
            <MaskLine delay={0.1}>The Winners</MaskLine>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl font-serif text-lg leading-relaxed text-brand-ink/85 md:text-xl">
            Nine films recognized across ten awards for storytelling, visual craft, sound, worldbuilding, and intentional use of AI.
          </p>
        </div>
      </section>

      <section className="relative jury-surface" aria-label="2026 award winners">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-16 md:py-24">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            {winners.map((winner, index) => (
              <div key={`${winner.id}-${winner.awards[0].title}`} className="h-full">
                <WinnerDetailCard winner={winner} index={index} onOpen={() => setSelected(winner)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <WinnerModal selected={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

