import { motion } from "motion/react";
import { finalists } from "../finalistsData";
import { assetUrl } from "../lib/assetUrl";
import { buttonPrimary, MaskLine, reveal } from "./ui";

export default function FinalistsPreview({ onOpen }: { onOpen: () => void }) {
  const previewFilms = finalists.slice(0, 5);

  return (
    <section
      id="finalists-preview-section"
      className="relative scroll-mt-20 overflow-hidden border-t border-brand-line"
      aria-labelledby="finalists-preview-title"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-16 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div className="lg:col-span-5" {...reveal(0, 40)}>
            <div className="mb-8 flex items-center gap-4">
              <span className="label text-brand-copper">04 · Official selection</span>
              <span className="h-px flex-1 bg-brand-line" aria-hidden="true" />
              <span className="label text-[9px] text-brand-muted">{finalists.length} films</span>
            </div>
            <h2
              id="finalists-preview-title"
              className="font-display text-[clamp(4rem,8vw,7rem)] uppercase leading-[0.86] text-brand-ink"
            >
              <MaskLine delay={0.1}>Meet the</MaskLine>
              <span className="text-brand-accent">
                <MaskLine delay={0.2}>Finalists</MaskLine>
              </span>
            </h2>
            <p className="mt-7 max-w-lg font-serif text-lg leading-relaxed text-brand-muted">
              Discover the films selected for the 2026 Future Reality AI Film Festival — original work from filmmakers across the world, shaped by story, craft, and intentional use of AI.
            </p>
            <button type="button" onClick={onOpen} className={`${buttonPrimary} mt-8`}>
              View all finalists
              <span className="material-symbols-outlined ml-2" aria-hidden="true">
                arrow_forward
              </span>
            </button>
          </motion.div>

          <motion.div
            className="relative grid grid-cols-6 gap-3 lg:col-span-7"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
          >
            {previewFilms.map((film, index) => (
              <motion.figure
                key={film.id}
                className={`relative overflow-hidden border border-brand-line bg-black ${
                  index < 2 ? "col-span-3 aspect-[2/3]" : "col-span-2 aspect-[2/3]"
                }`}
                variants={{ hidden: { opacity: 0, y: 44 }, shown: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
              >
                <img
                  src={assetUrl(film.poster)}
                  alt={`${film.title} poster`}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.035]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
                <figcaption className="absolute inset-x-3 bottom-3 font-display text-sm uppercase leading-tight text-white md:text-lg">
                  {film.title}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
