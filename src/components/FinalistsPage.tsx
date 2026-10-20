import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { FinalistFilm, finalists } from "../finalistsData";
import { assetUrl } from "../lib/assetUrl";
import Modal from "./Modal";
import { reveal } from "./ui";

function FilmCard({ film, index, onOpen }: { film: FinalistFilm; index: number; onOpen: () => void }) {
  const details = [film.country, film.runtime].filter(Boolean).join(" · ");

  return (
    <motion.article {...reveal((index % 4) * 0.06, 28)} className="h-full">
      <button
        type="button"
        onClick={onOpen}
        className="group flex h-full w-full cursor-pointer flex-col border border-brand-line bg-brand-surface text-left"
        aria-label={`View ${film.title}`}
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden border-b border-brand-line bg-black">
          <img
            src={assetUrl(film.poster)}
            alt={`${film.title} poster`}
            className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.025] ${
              film.landscape ? "object-contain p-2 md:p-3" : "object-cover"
            }`}
            loading="lazy"
          />
          <div
            className="absolute inset-0 opacity-0 ring-1 ring-inset ring-brand-accent transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-1 flex-col p-4 md:p-5">
          <h3 className="font-display text-2xl uppercase leading-[0.95] text-brand-ink transition-colors group-hover:text-brand-amber">
            {film.title}
          </h3>
          {film.directors && (
            <p className="mt-3 font-serif text-sm leading-snug text-brand-muted">
              {film.directors}
            </p>
          )}
          <div className="mt-auto flex items-end justify-between gap-3 border-t border-brand-line pt-4">
            <span className="label text-[9px] text-brand-copper">{details || "Official selection"}</span>
            <span className="material-symbols-outlined text-lg text-brand-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-amber" aria-hidden="true">
              arrow_forward
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

export default function FinalistsPage() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [selected, setSelected] = useState<FinalistFilm | null>(null);

  const countries = useMemo(
    () => [...new Set(finalists.map((film) => film.country).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [],
  );

  const visibleFilms = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return finalists.filter((film) => {
      const matchesCountry = country === "all" || film.country === country;
      const matchesQuery =
        !normalized ||
        [film.title, film.directors, film.country, film.synopsis]
          .join(" ")
          .toLocaleLowerCase()
          .includes(normalized);
      return matchesCountry && matchesQuery;
    });
  }, [country, query]);

  return (
    <div id="finalists-page">
      <section className="relative overflow-hidden border-b border-brand-line jury-surface">
        <div className="hero-deep-mask hero-deep-mask--jury" aria-hidden="true" />
        <div className="relative z-[1] mx-auto max-w-7xl px-6 pb-20 pt-40 text-center md:px-16">
          <span className="font-serif text-sm font-semibold uppercase tracking-[0.2em] text-brand-cream">
            2026 Official Selection
          </span>
          <motion.h1
            className="mt-5 pb-[0.08em] pt-[0.06em] font-display text-[clamp(4.5rem,13vw,11rem)] uppercase leading-[0.92] text-brand-ink"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Finalists
          </motion.h1>
          <p className="mx-auto mt-7 max-w-2xl font-serif text-lg leading-relaxed text-brand-ink/85 md:text-xl">
            {finalists.length} films selected from a global field of AI-native and AI-assisted cinematic work.
          </p>
        </div>
      </section>

      <section className="relative jury-surface" aria-labelledby="finalist-grid-title">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-16 md:py-20">
          <motion.div
            className="mb-10 grid gap-5 border-b border-brand-line pb-7 md:grid-cols-[1fr_auto] md:items-end"
            {...reveal(0, 24)}
          >
            <div>
              <span className="label text-[10px] text-brand-copper">Official selection · New York 2026</span>
              <h2 id="finalist-grid-title" className="mt-3 font-display text-4xl uppercase text-brand-ink md:text-5xl">
                Selected films
              </h2>
            </div>
            <p className="label text-[10px] text-brand-muted">
              Showing {visibleFilms.length} of {finalists.length}
            </p>
          </motion.div>

          <div className="mb-10 grid gap-3 sm:grid-cols-[1fr_16rem]">
            <label className="relative block">
              <span className="sr-only">Search finalists</span>
              <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-brand-muted" aria-hidden="true">
                search
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search film, filmmaker, or country"
                className="h-12 w-full border border-brand-line bg-brand-surface pl-12 pr-4 font-sans text-sm text-brand-ink placeholder:text-brand-muted/70 focus:border-brand-amber focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="sr-only">Filter by country</span>
              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="h-12 w-full cursor-pointer border border-brand-line bg-brand-surface px-4 font-sans text-sm text-brand-ink focus:border-brand-amber focus:outline-none"
              >
                <option value="all">All countries</option>
                {countries.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {visibleFilms.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleFilms.map((film, index) => (
                <div key={film.id}>
                  <FilmCard film={film} index={index} onOpen={() => setSelected(film)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="border-y border-brand-line py-20 text-center">
              <p className="font-display text-3xl uppercase text-brand-ink">No films found</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCountry("all");
                }}
                className="label mt-4 cursor-pointer text-brand-amber hover:text-brand-cream"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Modal
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ""}
        kicker={selected ? "Official finalist" : undefined}
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
              <dl className="border-t border-brand-line">
                {[
                  ["Director", selected.directors],
                  ["Country", selected.country],
                  ["Runtime", selected.runtime],
                  ["Language", selected.language],
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
                  {selected.synopsis ||
                    `${selected.title} is an official finalist${selected.country ? ` from ${selected.country}` : ""}${selected.directors ? `, directed by ${selected.directors}` : ""}${selected.runtime ? `, with a runtime of ${selected.runtime}` : ""}.`}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
