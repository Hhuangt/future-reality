import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig, useScroll, useSpring } from "motion/react";
import { festivalPillars, competitionCategories, CompetitionCategoryItem } from "./data";
import { Submission } from "./types";
import Modal from "./components/Modal";
import SubmissionForm from "./components/SubmissionForm";
import { DeoVrLogo, SohoLogo, HxrLogo } from "./components/CollaboratorLogos";
import { GlobalNetworkGallery } from "./components/GlobalNetworkGallery";
import SubmissionGuidelinesAccordion from "./components/SubmissionGuidelinesAccordion";
import JuryPage from "./components/JuryPage";
import FestivalLogo from "./components/FestivalLogo";
import HeroStage from "./components/HeroStage";
import CursorSpotlight from "./components/CursorSpotlight";
import OpeningSpotlight from "./components/OpeningSpotlight";
import HomeAtmosphere from "./components/BackgroundTechLayer";
import EndingNavigation from "./components/EndingNavigation";
import { assetUrl } from "./lib/assetUrl";
import { SectionHeader, buttonPrimary, buttonSecondary, buttonText, MaskLine, ScrollWords, reveal } from "./components/ui";

const TICKETS_URL = "https://luma.com/8pqcqqu0";
const FILMFREEWAY_URL = "https://filmfreeway.com/FutureRealityAIFilmFestival?pending=true";

const navItems = [
  { label: "About", id: "manifesto-rich-section" },
  { label: "Awards", id: "competition-section" },
  { label: "Network", id: "global-network-section" },
  { label: "Programme", id: "experience-section" },
  { label: "Jury", id: "jury-page" },
];

const principles = [
  { title: "Great Filmmaking", text: "Story, craft, and a clear point of view come first." },
  { title: "Bold Imagination", text: "Work that shows us something we haven’t seen before." },
  { title: "AI with Intention", text: "Tools chosen on purpose, in service of the film." },
];

const isImmersive = (id: string | null) =>
  id === "immersive_future_reality" || id === "immersive_live_cinema" || id === "live_cinema";

const isJuryRoute = (hash: string) => hash === "#jury" || hash.startsWith("#jury-");

function EventEssentials() {
  const facts = [
    ["Date", "October 25, 2026"],
    ["Venue", "Regal Union Square"],
    ["Location", "New York City"],
  ] as const;
  return (
    <section className="border-y border-brand-line bg-brand-accent text-brand-bg" aria-label="Festival information">
      <div className="mx-auto grid max-w-7xl grid-cols-1 px-6 md:grid-cols-3 md:px-16">
        {facts.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-4 border-b border-black/20 py-4 text-left last:border-b-0 md:block md:border-b-0 md:border-r md:px-8 md:py-6 md:first:pl-0 md:last:border-r-0">
            <span className="label text-[9px] text-brand-bg/65">{label}</span>
            <p className="font-display text-xl uppercase md:mt-2 md:text-left md:text-2xl">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const aiProcess = [
  ["01", "Intent", "A human idea sets the direction."],
  ["02", "Generate", "Models expand the visual possibility."],
  ["03", "Direct", "Artists make every creative decision."],
  ["04", "Cinema", "The work meets an audience."],
] as const;

function AiProcessRail() {
  return (
    <section className="ai-process relative overflow-hidden border-b border-brand-line" aria-labelledby="ai-process-title">
      <div className="relative z-[1] mx-auto max-w-7xl px-6 py-16 md:px-16 md:py-20">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3 text-left">
          <div className="text-left">
            <span className="label text-brand-accent">How we see AI</span>
            <h2 id="ai-process-title" className="mt-2 font-display text-3xl uppercase text-brand-ink md:text-4xl">
              Human vision. Machine possibility.
            </h2>
          </div>
          <p className="max-w-sm text-left font-serif text-sm leading-relaxed text-brand-muted md:text-left">
            AI expands the creative process. Filmmakers remain responsible for the intention, direction, and final work.
          </p>
        </div>
        <ol className="grid grid-cols-1 border-l border-t border-brand-line sm:grid-cols-2 lg:grid-cols-4">
          {aiProcess.map(([number, title, text]) => (
            <li key={title} className="ai-process-step border-b border-r border-brand-line p-5 md:p-6">
              <span className="font-mono text-[10px] tracking-[0.24em] text-brand-accent">{number}</span>
              <h3 className="mt-8 font-display text-2xl uppercase text-brand-ink">{title}</h3>
              <p className="mt-2 font-serif text-sm leading-relaxed text-brand-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState<"home" | "jury">(
    typeof window !== "undefined" && isJuryRoute(window.location.hash) ? "jury" : "home"
  );
  const [openingVisible, setOpeningVisible] = useState(activePage === "home");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);
  const [activeNavId, setActiveNavId] = useState("");

  const [activeModal, setActiveModal] = useState<"partner" | "success" | null>(null);
  const [selectedCompCategory, setSelectedCompCategory] = useState<CompetitionCategoryItem | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");
  const completeOpening = useCallback(() => setOpeningVisible(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncPage = () => setActivePage(isJuryRoute(window.location.hash) ? "jury" : "home");
    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  useEffect(() => {
    if (activePage !== "home") return;
    const nodes = navItems
      .filter((item) => item.id !== "jury-page")
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActiveNavId(current.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.15, 0.35] }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [activePage]);

  const closeModal = useCallback(() => setActiveModal(null), []);
  const closeCategory = useCallback(() => setSelectedCompCategory(null), []);

  const handleSubmissionSuccess = (sub: Submission) => {
    setFeedbackMessage(`Thank you, ${sub.name}. Your partnership inquiry has been submitted.`);
    setActiveModal("success");
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError("");
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) {
      setNewsletterError("Please enter a valid email address.");
      return;
    }
    setIsNewsletterSubscribed(true);
    setNewsletterEmail("");
  };

  const openJury = () => {
    setIsMenuOpen(false);
    setActivePage("jury");
    window.history.replaceState(null, "", "#jury");
    window.scrollTo({ top: 0 });
  };

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    if (id === "jury-page") {
      openJury();
      return;
    }
    if (activePage !== "home") {
      setActivePage("home");
      window.history.replaceState(null, "", window.location.pathname);
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goHome = () => {
    setIsMenuOpen(false);
    if (activePage !== "home") {
      setActivePage("home");
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="film-grain min-h-screen overflow-x-hidden bg-brand-bg text-brand-ink font-sans antialiased relative">
      <div className="relative z-[1]">
      <CursorSpotlight />
      {openingVisible && <OpeningSpotlight onComplete={completeOpening} />}

      {/* Header */}
      <header
        id="app-header"
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled || activePage !== "home" ? "bg-brand-bg/90 backdrop-blur-md border-b border-brand-line" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-16 h-[68px]">
          <button onClick={goHome} className="text-left cursor-pointer" id="logo-brand-btn" aria-label="Future Reality AI Film Festival — home">
            <FestivalLogo />
          </button>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {navItems.map((item) => {
              const active =
                (item.id === "jury-page" && activePage === "jury") ||
                (activePage === "home" && item.id === activeNavId);
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`label text-[11px] cursor-pointer transition-colors ${active ? "text-brand-amber" : "text-brand-ink/80 hover:text-brand-ink"}`}
                >
                  {item.label}
                </button>
              );
            })}
            <a href={TICKETS_URL} target="_blank" rel="noreferrer" className="label text-[11px] px-4 py-2.5 border border-brand-cream/40 hover:border-brand-cream hover:bg-brand-cream hover:text-brand-bg transition-colors">
              Tickets
            </a>
          </nav>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden h-11 w-11 -mr-2 flex items-center justify-center text-brand-ink cursor-pointer"
            aria-label="Open menu"
            id="menu-trigger-btn"
          >
            <span className="material-symbols-outlined text-[26px]">menu</span>
          </button>
        </div>
        <motion.div className="absolute left-0 right-0 bottom-0 h-px bg-brand-amber origin-left" style={{ scaleX: progress }} aria-hidden="true" />
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-brand-bg flex flex-col"
            id="sidebar-drawer-overlay"
          >
            <div className="flex items-center justify-between px-6 h-[68px] border-b border-brand-line">
              <FestivalLogo />
              <button onClick={() => setIsMenuOpen(false)} className="h-11 w-11 -mr-2 flex items-center justify-center cursor-pointer" aria-label="Close menu" id="sidebar-close-btn">
                <span className="material-symbols-outlined text-[26px]">close</span>
              </button>
            </div>
            <nav className="flex-1 px-6 py-8 overflow-y-auto" aria-label="Mobile">
              <ol className="space-y-1">
                {navItems.map((item, idx) => (
                  <li key={item.id}>
                    <button onClick={() => scrollTo(item.id)} className="w-full flex items-baseline gap-4 py-3 border-b border-brand-line text-left cursor-pointer">
                      <span className="label text-brand-copper w-8">{String(idx + 1).padStart(2, "0")}</span>
                      <span className="font-display uppercase text-4xl text-brand-ink">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
              <a href={TICKETS_URL} target="_blank" rel="noreferrer" className={`${buttonPrimary} w-full mt-10`}>
                Purchase Early Bird Ticket
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="overflow-x-hidden">
        <div className="home-city-flow">
          <HomeAtmosphere />
          <div className="home-city-flow__content">
            {activePage === "jury" ? (
              <JuryPage />
            ) : (
              <>
            <HeroStage onOpenJury={openJury} openingActive={openingVisible} />
            <EventEssentials />
            <AiProcessRail />

            {/* Manifesto */}
            <section id="manifesto-rich-section" className="relative scroll-mt-20 border-b border-brand-line overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28">
                <div className="mb-10 flex items-center gap-4">
                  <span className="label text-brand-copper">01 · About</span>
                  <span className="h-px flex-1 bg-brand-line" aria-hidden="true" />
                  <span className="label text-[9px] text-brand-muted">New York · 2026</span>
                </div>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                  <blockquote className="lg:col-span-7 font-serif text-[clamp(2rem,4.6vw,3.9rem)] leading-[1.12] text-brand-ink">
                    <ScrollWords
                      lines={[
                        { text: "“Cinema once reflected reality." },
                        { text: "Today it has the power to create it.”", className: "text-brand-cream italic" },
                      ]}
                    />
                  </blockquote>
                  <div className="lg:col-span-5">
                    <p className="max-w-xl font-serif text-lg leading-relaxed text-brand-muted">
                      Future Reality brings filmmakers, artists, and technologists together to celebrate AI cinema where story, craft, and human perspective come first.
                    </p>
                  </div>
                </div>
                <div className="mt-16">
                  <ol className="grid grid-cols-1 md:grid-cols-3 border-t border-brand-line">
                    {principles.map((p, idx) => (
                      <motion.li key={p.title} {...reveal(idx * 0.12, 24)} className="pt-6 pb-2 md:pr-8 md:border-r md:last:border-r-0 border-brand-line md:[&:not(:first-child)]:pl-8 space-y-3">
                        <span className="label text-brand-copper">0{idx + 1}</span>
                        <h3 className="font-display uppercase text-2xl text-brand-ink">{p.title}</h3>
                        <p className="font-serif text-[15px] text-brand-muted leading-relaxed">{p.text}</p>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            {/* Awards */}
            <section id="competition-section" className="relative scroll-mt-20 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28 space-y-12">
                <SectionHeader
                  reel="02"
                  label="Awards & Guidelines"
                  title={["Ten awards.", "One night in New York."]}
                  intro="Ten awards for cinema shaped with artificial intelligence — judged by story, authorship, craft, and how intentionally each filmmaker uses the technology."
                />

                <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-b border-brand-line">
                {competitionCategories.map((cat, idx) => {
                  const premier = cat.id === "best_film" || cat.id === "special_jury_award";
                  return (
                    <motion.li key={cat.id} {...reveal((idx % 2) * 0.08, 24)} className="border-t border-brand-line">
                      <button
                        type="button"
                        onClick={() => setSelectedCompCategory(cat)}
                        className="sweep group w-full flex items-baseline gap-5 py-6 pr-2 text-left cursor-pointer"
                      >
                        <span className="font-display text-xl text-brand-copper tabular-nums w-8 shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 space-y-1.5">
                          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="font-display uppercase text-[26px] md:text-3xl text-brand-ink leading-none group-hover:text-brand-amber transition-colors">
                              {cat.title}
                            </span>
                            {premier && <span className="label text-[10px] text-brand-cream border border-brand-cream/40 px-2 py-0.5">Honor</span>}
                          </span>
                          <span className="block font-serif text-[15px] text-brand-muted">{cat.description}</span>
                        </span>
                        <span className="material-symbols-outlined text-brand-muted group-hover:text-brand-amber group-hover:translate-x-1 transition-all" aria-hidden="true">
                          arrow_forward
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
                </ol>

                <SubmissionGuidelinesAccordion />
              </div>
            </section>

            {/* Network */}
            <section id="global-network-section" className="relative scroll-mt-20 overflow-hidden border-t border-brand-line">
              <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28">
                <GlobalNetworkGallery />
              </div>
            </section>

            {/* Programme */}
            <section id="experience-section" className="relative scroll-mt-20 overflow-hidden border-t border-brand-line">
              <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28 space-y-12">
                <SectionHeader
                  reel="04"
                  label="Programme"
                  title="The festival experience"
                  intro="Generative cinema, spatial storytelling, critical conversation, and theatrical screenings — AI moves from tool to medium for one night at Regal Union Square."
                />
                <motion.figure
                  className="relative aspect-[16/9] overflow-hidden border border-brand-line bg-brand-surface"
                  initial="hidden"
                  whileInView="shown"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.img
                    src={assetUrl("/poster/cinema-red.jpg")}
                    alt="A red-lit cinema auditorium facing the screen"
                    className="h-full w-full object-cover"
                    variants={{ hidden: { scale: 1.08 }, shown: { scale: 1 } }}
                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.div
                    className="absolute inset-0 z-10 origin-top bg-brand-accent"
                    variants={{ hidden: { scaleY: 1 }, shown: { scaleY: 0 } }}
                    transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" aria-hidden="true" />
                  <figcaption className="absolute inset-x-5 bottom-4 z-20 flex items-end justify-between gap-4 md:inset-x-8 md:bottom-7">
                    <span className="label text-[9px] text-brand-accent-bright">Theater 01 · Regal Union Square</span>
                    <span className="hidden font-serif text-sm italic text-brand-ink md:block">One night in New York</span>
                  </figcaption>
                </motion.figure>
                <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border-t border-brand-line">
                  {festivalPillars.map((pillar, idx) => (
                    <motion.li
                      key={pillar.id}
                      {...reveal(idx * 0.12)}
                      className="relative pt-8 pb-10 xl:px-7 xl:first:pl-0 xl:border-l xl:first:border-l-0 border-brand-line border-b xl:border-b-0 md:odd:pr-8 xl:odd:pr-7 space-y-4 flex flex-col"
                    >
                      <span className="font-display text-6xl text-brand-copper/60 leading-none tabular-nums">0{idx + 1}</span>
                      <span className="label text-[10px] text-brand-copper">{pillar.tag}</span>
                      <h3 className="font-display uppercase text-3xl text-brand-ink leading-none">{pillar.title}</h3>
                      <p className="font-serif text-[15px] text-brand-muted leading-relaxed flex-1">{pillar.description}</p>
                      {isImmersive(pillar.id) && (
                        <div className="flex items-center gap-3 pt-2">
                          <span className="label text-[10px] text-brand-muted">With</span>
                          <DeoVrLogo size="sm" />
                        </div>
                      )}
                      {pillar.id !== "awards" && <span className="label text-[10px] text-brand-muted/80">Details to be announced</span>}
                    </motion.li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Tickets */}
            <section id="submit-film-section" className="relative scroll-mt-20 overflow-hidden border-t border-brand-line">
              <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28">
                <motion.div
                  {...reveal(0, 60)}
                  className="relative overflow-hidden border border-brand-line bg-brand-surface grid grid-cols-1 lg:grid-cols-12"
                >
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                      backgroundImage: `linear-gradient(90deg, rgba(9,9,8,0.08), rgba(9,9,8,0.86) 76%), url('${assetUrl("/poster/nyc-sunset.jpg")}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative lg:col-span-8 p-8 md:p-14 space-y-6">
                    <span className="label text-brand-copper">Reel 05 · Admit one</span>
                    <h2 className="font-display uppercase text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-brand-ink">
                      <MaskLine delay={0.25}>Take your seat</MaskLine>
                    </h2>
                    <p className="font-serif text-lg text-brand-ink/85 max-w-xl leading-relaxed">
                      Join filmmakers, artists, and technologists for an evening of AI cinema in Manhattan. Early bird tickets are available now.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <a href={TICKETS_URL} target="_blank" rel="noreferrer" className={buttonPrimary}>
                        Purchase Early Bird Ticket
                      </a>
                      <button onClick={() => setActiveModal("partner")} className={buttonSecondary} id="become-partner-hero-btn">
                        Partner with us
                      </button>
                    </div>
                  </div>

                  <dl className="relative lg:col-span-4 border-t lg:border-t-0 lg:border-l border-dashed border-brand-cream/30 p-8 md:p-10 grid grid-cols-1 gap-6 content-center">
                    <span className="hidden lg:block absolute -left-3 -top-3 h-6 w-6 rounded-full bg-brand-bg border border-brand-line" aria-hidden="true" />
                    <span className="hidden lg:block absolute -left-3 -bottom-3 h-6 w-6 rounded-full bg-brand-bg border border-brand-line" aria-hidden="true" />
                    {[
                      ["Date", "October 25, 2026"],
                      ["Venue", "Regal Union Square"],
                      ["City", "New York City"],
                    ].map(([k, v]) => (
                      <div key={k} className="space-y-1">
                        <dt className="label text-[10px] text-brand-muted">{k}</dt>
                        <dd className="font-display uppercase text-2xl text-brand-ink">{v}</dd>
                      </div>
                    ))}
                    <a href={FILMFREEWAY_URL} target="_blank" rel="noreferrer" className={buttonText}>
                      Festival rules on FilmFreeway ↗
                    </a>
                  </dl>
                </motion.div>
              </div>
            </section>
              </>
            )}
            <EndingNavigation
              page={activePage}
              onGoHome={goHome}
              onOpenJury={openJury}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="app-footer" className="border-t border-brand-line bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-14">
          <FestivalLogo size="md" className="mb-10 block text-left" />
          <div className="footer-grid grid grid-cols-1 gap-12 border-b border-brand-line pb-10 lg:grid-cols-3 lg:gap-16">
            <div className="footer-col">
              <span className="footer-kicker">Festival</span>
              <p className="max-w-sm font-sans text-sm leading-relaxed text-brand-muted">
                Great Filmmaking · Bold Imagination · AI with Intention
              </p>
              <p className="font-sans text-xs leading-relaxed text-brand-muted/90">
                October 25, 2026 · Regal Union Square, New York City
              </p>
            </div>

            <nav className="footer-col" aria-label="Footer">
              <span className="footer-kicker">Navigate</span>
              <ul className="flex w-full flex-col gap-2.5">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(item.id)}
                      className="footer-link"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button type="button" onClick={() => setActiveModal("partner")} className="footer-link">
                    Partnerships
                  </button>
                </li>
              </ul>
            </nav>

            <div className="footer-col">
              <div className="footer-block">
                <span className="footer-kicker">Presented by</span>
                <div className="flex flex-wrap items-center gap-6">
                  <a href="https://sohofilmfest.com" target="_blank" rel="noreferrer" aria-label="SOHO International Film Festival">
                    <SohoLogo size="sm" variant="dark" className="!h-10" />
                  </a>
                  <a href="https://harvardxr.com" target="_blank" rel="noreferrer" aria-label="Harvard XR">
                    <HxrLogo size="sm" variant="dark" className="!h-8" />
                  </a>
                </div>
              </div>
              <div className="footer-block">
                <span className="footer-kicker">Immersive partner</span>
                <DeoVrLogo size="sm" />
              </div>
              <form onSubmit={handleNewsletterSubmit} className="footer-block w-full" noValidate>
                <label htmlFor="newsletter-email" className="footer-kicker">
                  Festival updates
                </label>
                <div className="flex w-full border-b border-brand-line focus-within:border-brand-amber transition-colors">
                  <input
                    id="newsletter-email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email"
                    autoComplete="email"
                    className="min-w-0 flex-1 bg-transparent py-2.5 font-sans text-sm text-brand-ink placeholder:text-brand-muted/60 focus:outline-none"
                    disabled={isNewsletterSubscribed}
                  />
                  <button
                    type="submit"
                    disabled={isNewsletterSubscribed}
                    className="label shrink-0 text-[11px] text-brand-amber hover:text-brand-cream px-2 cursor-pointer disabled:text-brand-muted"
                  >
                    {isNewsletterSubscribed ? "Subscribed" : "Subscribe"}
                  </button>
                </div>
                {newsletterError && (
                  <p role="alert" className="font-sans text-xs text-brand-cream">
                    {newsletterError}
                  </p>
                )}
                {isNewsletterSubscribed && <p className="font-sans text-xs text-brand-muted">Thanks — you’re on the list.</p>}
              </form>
            </div>
          </div>

          <p className="pt-6 font-sans text-xs text-brand-muted">© 2026 Future Reality AI Film Festival</p>
        </div>
      </footer>

      {/* Partner inquiry */}
      <Modal isOpen={activeModal === "partner"} onClose={closeModal} title="Partner with us" kicker="Partnerships">
        <p className="font-serif text-[15px] text-brand-muted mb-8 leading-relaxed">
          Brands, studios, institutions, and cultural organizations interested in working with Future Reality — tell us a little about yourself.
        </p>
        <SubmissionForm type="partner" onSuccess={handleSubmissionSuccess} />
      </Modal>

      {/* Success */}
      <Modal isOpen={activeModal === "success"} onClose={closeModal} title="Thank you" kicker="Inquiry sent">
        <div className="space-y-8" id="success-feedback-container">
          <p className="font-serif text-lg text-brand-ink/90 leading-relaxed">{feedbackMessage}</p>
          <button onClick={closeModal} className={buttonSecondary} id="success-dismiss-btn">
            Close
          </button>
        </div>
      </Modal>

      {/* Award category */}
      <Modal
        isOpen={selectedCompCategory !== null}
        onClose={closeCategory}
        title={selectedCompCategory?.title ?? ""}
        kicker="Official award"
      >
        {selectedCompCategory && (
          <div className="space-y-8">
            <p className="font-serif text-2xl text-brand-cream leading-snug">{selectedCompCategory.description}</p>
            <div className="space-y-2 border-t border-brand-line pt-6">
              <span className="label text-[10px] text-brand-muted">What to include</span>
              <p className="font-serif text-[15px] text-brand-ink/90 leading-relaxed">{selectedCompCategory.requirements}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={FILMFREEWAY_URL} target="_blank" rel="noreferrer" onClick={closeCategory} className={buttonPrimary}>
                View on FilmFreeway
              </a>
              <button onClick={closeCategory} className={buttonSecondary}>
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
      </div>
    </div>
    </MotionConfig>
  );
}
