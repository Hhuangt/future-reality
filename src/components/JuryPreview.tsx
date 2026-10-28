import { motion } from "motion/react";
import { grandJury } from "../juryData";
import { assetUrl } from "../lib/assetUrl";
import { buttonSecondary, MaskLine, reveal } from "./ui";

export default function JuryPreview({ onOpen }: { onOpen: () => void }) {
  const previewMembers = grandJury.slice(0, 3);

  return (
    <section
      id="jury-preview-section"
      className="relative scroll-mt-20 overflow-hidden border-t border-brand-line"
      aria-labelledby="jury-preview-title"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-16 md:py-28">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div {...reveal(0, 30)}>
            <span className="label text-brand-copper">05 · The Jury</span>
            <h2
              id="jury-preview-title"
              className="mt-4 font-display text-[clamp(4rem,9vw,8rem)] uppercase leading-[0.88] text-brand-ink"
            >
              <MaskLine delay={0.1}>Meet the Jury</MaskLine>
            </h2>
            <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-brand-muted">
              Filmmakers, artists, technologists, and festival leaders shaping the 2026 awards.
            </p>
          </motion.div>
          <motion.button
            type="button"
            onClick={onOpen}
            className={buttonSecondary}
            {...reveal(0.12, 20)}
          >
            View the full jury
            <span className="material-symbols-outlined ml-2 text-lg" aria-hidden="true">arrow_forward</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {previewMembers.map((member, index) => (
            <motion.article
              key={member.id}
              {...reveal(index * 0.1, 40)}
              className="group relative flex min-h-[350px] flex-col overflow-hidden border border-brand-line bg-brand-surface transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-brand-copper/60 hover:shadow-[0_22px_60px_rgba(0,0,0,0.32)]"
            >
              <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-brand-amber to-transparent transition-transform duration-700 group-hover:scale-x-100" aria-hidden="true" />
              <div
                className="pointer-events-none absolute left-1/2 top-0 h-64 w-[140%] -translate-x-1/2 opacity-70"
                style={{
                  clipPath: "polygon(44% 0, 56% 0, 88% 100%, 12% 100%)",
                  background: "linear-gradient(to bottom, rgba(240,178,122,0.32), rgba(212,135,79,0.08) 70%, transparent)",
                  filter: "blur(8px)",
                }}
                aria-hidden="true"
              />

              <div className="relative flex items-center justify-between gap-4 px-5 pt-5">
                <span className="label text-[9px] text-brand-cream/70">Grand Jury</span>
                <span className="font-mono text-[9px] tracking-[0.18em] text-brand-copper">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative flex flex-1 flex-col items-center px-6 pb-7 pt-5 text-center">
                <div className="relative mb-6">
                  <div className="absolute -inset-2 rounded-full border-[0.5px] border-brand-copper/15 transition-colors duration-500 group-hover:border-brand-copper/35" aria-hidden="true" />
                  <div className="absolute -inset-7 rounded-full bg-brand-copper/10 blur-2xl" aria-hidden="true" />
                  <div className="relative h-36 w-36 overflow-hidden rounded-full bg-brand-surface-2 ring-[0.5px] ring-brand-copper/45 ring-offset-2 ring-offset-transparent md:h-40 md:w-40">
                    {member.photo ? (
                      <img
                        src={assetUrl(member.photo)}
                        alt={`${member.name} headshot`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        style={{ objectPosition: member.photoObjectPosition ?? "center top" }}
                        loading="lazy"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center font-display text-5xl text-brand-cream/80">
                        {member.initials}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="font-display text-[28px] uppercase leading-none text-brand-ink transition-colors duration-300 group-hover:text-brand-amber">
                  {member.name}
                </h3>
                <span className="my-3 h-px w-8 bg-brand-copper/70 transition-all duration-500 group-hover:w-12" aria-hidden="true" />
                <p className="font-serif text-[15px] leading-snug text-brand-cream">{member.role}</p>
                {member.organization && (
                  <p className="mt-2 font-serif text-sm font-bold leading-snug text-brand-ink/85">{member.organization}</p>
                )}
              </div>

              <div className="relative flex items-center justify-between border-t border-brand-line px-5 py-3">
                <span className="label text-[8px] text-brand-muted">Future Reality</span>
                <span className="label text-[8px] text-brand-muted">New York · 2026</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

