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

  return (
    <nav
      className="ending-navigation border-t border-brand-line"
      aria-label="End of page navigation"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-16 md:py-14">
        <p className="label mb-5 text-[9px] text-brand-muted">End · Continue</p>
        <div className="grid border-y border-brand-line sm:grid-cols-2">
          <button
            type="button"
            onClick={destination.action}
            className="group flex min-h-16 cursor-pointer items-center justify-between gap-6 border-b border-brand-line py-5 text-left transition-colors hover:text-brand-amber sm:border-b-0 sm:border-r sm:pr-8"
          >
            <span className="font-display text-2xl uppercase md:text-3xl">
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
            className="group flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 text-left transition-colors hover:text-brand-amber sm:pl-8"
          >
            <span className="font-display text-2xl uppercase md:text-3xl">
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
