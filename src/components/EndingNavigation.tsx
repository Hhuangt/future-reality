type EndingNavigationProps = {
  page: "home" | "jury";
  onGoHome: () => void;
  onOpenJury: () => void;
};

export default function EndingNavigation({
  page,
  onGoHome,
  onOpenJury,
}: EndingNavigationProps) {
  const goToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const destination =
    page === "home"
      ? { label: "Meet the jury", action: onOpenJury }
      : { label: "Festival home", action: onGoHome };

  const isHomeTerminal = page === "home";

  return (
    <nav
      className={`ending-navigation border-t border-brand-line ${isHomeTerminal ? "ending-navigation--home-terminal" : ""}`}
      aria-label="End of page navigation"
    >
      <div
        className={`mx-auto max-w-7xl px-6 md:px-16 ${isHomeTerminal ? "py-5 md:py-6" : "py-6 md:py-8"}`}
      >
        {!isHomeTerminal && (
          <p className="label mb-3 text-[9px] text-brand-muted">End · Continue</p>
        )}
        <div className="grid border-y border-brand-line sm:grid-cols-2">
          <button
            type="button"
            onClick={destination.action}
            className="group flex cursor-pointer items-center justify-between gap-4 border-b border-brand-line py-3.5 text-left transition-colors hover:text-brand-amber sm:border-b-0 sm:border-r sm:pr-6 md:py-4"
          >
            <span className="font-display text-xl uppercase md:text-2xl">
              {destination.label}
            </span>
            <span
              className="material-symbols-outlined transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </button>

          <button
            type="button"
            onClick={goToTop}
            className="group flex cursor-pointer items-center justify-between gap-4 py-3.5 text-left transition-colors hover:text-brand-amber sm:pl-6 md:py-4"
          >
            <span className="font-display text-xl uppercase md:text-2xl">
              Back to top
            </span>
            <span
              className="material-symbols-outlined transition-transform group-hover:-translate-y-1"
              aria-hidden="true"
            >
              arrow_upward
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
