import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  programsData, 
  openCallCategories, 
  advisoryCircle, 
  festivalPillars, 
  competitionCategories, 
  CompetitionCategoryItem
} from "./data";
import { ProgramItem, OpenCallCategory, Submission } from "./types";
import Modal from "./components/Modal";
import SubmissionForm from "./components/SubmissionForm";
import DreamaInteractive from "./components/DreamaInteractive";
import { DreamaLogo } from "./components/DreamaLogo";
import { 
  CollaboratorsShowcase, 
  SohoLogo, 
  HxrLogo 
} from "./components/CollaboratorLogos";
import { GlobalNetworkGallery } from "./components/GlobalNetworkGallery";
import SubmissionGuidelinesAccordion from "./components/SubmissionGuidelinesAccordion";


export default function App() {
  // Navigation & UI States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal & Focus States
  const [activeModal, setActiveModal] = useState<"work" | "partner" | "opencall" | "success" | null>(null);
  const [focusedProgram, setFocusedProgram] = useState<ProgramItem | null>(null);
  const [focusedCategory, setFocusedCategory] = useState<OpenCallCategory | null>(null);
  const [selectedCompCategory, setSelectedCompCategory] = useState<CompetitionCategoryItem | null>(null);
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>("awards");
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  // Client-Session Submissions History
  const [localSubmissions, setLocalSubmissions] = useState<Submission[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Load submissions from localStorage on mount
  useEffect(() => {
    try {
      const existing = localStorage.getItem("fvr_submissions");
      if (existing) {
        setLocalSubmissions(JSON.parse(existing));
      }
    } catch (err) {
      console.error("Failed to load local submissions", err);
    }
  }, [activeModal]);

  const handleSubmissionSuccess = (newSub: Submission) => {
    setLocalSubmissions((prev) => [...prev, newSub]);
    setFeedbackMessage(
      newSub.type === "opencall"
        ? `Successfully registered draft "${newSub.title}" to the 2026 Open Call roster.`
        : newSub.type === "partner"
        ? `Inquiry logged for representative ${newSub.name}. Our curator team will respond shortly.`
        : `Archived artwork portfolio submission: "${newSub.title}".`
    );
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

  // Scroll to section helpers
  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filtered search of programs/calls
  const filteredPrograms = programsData.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = openCallCategories.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark font-sans antialiased relative selection:bg-brand-accent selection:text-white pb-12">
      
      {/* 1. TOP HEADER / NAVIGATION APP BAR */}
      <header 
        className="w-full sticky top-0 z-40 bg-brand-bg/90 backdrop-blur-md border-b border-brand-dark flex justify-between items-center px-6 md:px-16 py-5"
        id="app-header"
      >
        <div className="flex items-center gap-6">
          {/* Menu triggers Left Drawer */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center p-1 hover:bg-neutral-200 transition-colors cursor-pointer text-brand-dark"
            aria-label="Open sidebar index menu"
            id="menu-trigger-btn"
          >
            <span className="material-symbols-outlined text-[26px]">menu</span>
          </button>
          
          {/* Logo Heading */}
          <button 
            onClick={() => scrollTo("hero-viewport")} 
            className="text-left cursor-pointer group hover:opacity-85 transition-opacity"
            id="logo-brand-btn"
          >
            <h1 className="font-display text-lg md:text-xl font-extrabold uppercase tracking-tight text-brand-dark flex items-center gap-2">
              <span className="text-brand-accent">F</span>UTURE <span className="text-brand-accent">R</span>EALITY
            </h1>
          </button>
        </div>
        
        {/* Nav Links for Desktop */}
        <nav className="hidden xl:flex gap-6 items-center font-mono text-[10px] font-bold uppercase tracking-widest text-[#5d5f5f]">
          <button 
            onClick={() => scrollTo("hero-viewport")} 
            className="hover:text-brand-accent hover:underline underline-offset-4 transition-all duration-150 cursor-pointer"
          >
            01. About
          </button>
          <button 
            onClick={() => scrollTo("manifesto-rich-section")} 
            className="hover:text-brand-accent hover:underline underline-offset-4 transition-all duration-150 cursor-pointer"
          >
            02. Manifesto
          </button>
          <button 
            onClick={() => scrollTo("competition-section")} 
            className="hover:text-brand-accent hover:underline underline-offset-4 transition-all duration-150 cursor-pointer"
          >
            03. Competition
          </button>
          <button 
            onClick={() => scrollTo("global-network-section")} 
            className="hover:text-brand-accent hover:underline underline-offset-4 transition-all duration-150 cursor-pointer"
          >
            04. Network
          </button>
          <button 
            onClick={() => scrollTo("experience-section")} 
            className="hover:text-brand-accent hover:underline underline-offset-4 transition-all duration-150 cursor-pointer"
          >
            05. Experience
          </button>
          <button 
            onClick={() => scrollTo("submit-film-section")} 
            className="hover:text-brand-accent hover:underline underline-offset-4 transition-all duration-150 cursor-pointer"
          >
            06. Submit Film
          </button>
          
          <div className="h-4 w-[1px] bg-neutral-300 ml-2" />
          
          {/* Search trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center justify-center text-brand-dark hover:text-brand-accent transition-colors p-1 cursor-pointer"
            aria-label="Toggle keyword index search"
            id="search-trigger-btn"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
        </nav>

        {/* Mobile-only Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex xl:hidden items-center justify-center text-brand-dark p-1 cursor-pointer"
          aria-label="Toggle keyword index search"
          id="search-mobile-btn"
        >
          <span className="material-symbols-outlined text-[22px]">search</span>
        </button>
      </header>

      {/* 2. PERSISTENT NAVIGATION DRIFT DRAWER (LEFT DRAWER) */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex" id="sidebar-drawer-overlay">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/35 backdrop-blur-xs"
              onClick={() => setIsMenuOpen(false)}
              id="sidebar-backdrop"
            />
            
            {/* Drawer Sliding Container */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-sm sm:max-w-md bg-brand-bg border-r-[1.5px] border-brand-dark h-full shadow-2xl p-6 md:p-10 flex flex-col justify-between z-10 select-text overflow-y-auto"
              id="sidebar-content"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-brand-dark pb-4">
                  <div className="font-display font-black text-sm uppercase tracking-tighter text-brand-dark">
                    PLATFORM CATALOG INDEX
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1 border border-transparent hover:border-brand-dark hover:bg-brand-dark hover:text-white transition-colors cursor-pointer"
                    aria-label="Close index menu"
                    id="sidebar-close-btn"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>

                {/* Section Index List */}
                <div className="space-y-3">
                  <span className="font-mono text-[9px] font-bold text-neutral-400 block uppercase tracking-widest border-b border-neutral-200 pb-1">
                    INDEX SECTIONS
                  </span>
                  <ul className="space-y-2 font-display text-[15px] sm:text-lg font-bold uppercase tracking-tight">
                    {[
                      { num: "01", label: "About", id: "hero-viewport" },
                      { num: "02", label: "Manifesto", id: "manifesto-rich-section" },
                      { num: "03", label: "Competition", id: "competition-section" },
                      { num: "04", label: "Network", id: "global-network-section" },
                      { num: "05", label: "Experience", id: "experience-section" },
                      { num: "06", label: "Submit Film", id: "submit-film-section" }
                    ].map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollTo(section.id)}
                          className="hover:translate-x-2 hover:text-brand-accent transition-all cursor-pointer text-left focus:outline-hidden"
                        >
                          {section.num}. {section.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dynamic completed submissions list */}
                <div className="pt-4 space-y-3">
                  <span className="font-mono text-[9px] font-bold text-neutral-400 block uppercase tracking-widest border-b border-neutral-100 pb-1">
                    CLIENT REGISTRY LOGS ({localSubmissions.length})
                  </span>
                  {localSubmissions.length === 0 ? (
                    <div className="p-4 border border-dashed border-neutral-300 text-center font-sans text-xs text-neutral-400">
                      No computational submissions registered in this browser session. Use the forms on the site to submit your concept code.
                    </div>
                  ) : (
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                      {localSubmissions.map((sub) => (
                        <div 
                          key={sub.id} 
                          className="bg-neutral-100 p-2 border border-neutral-300 text-[10px] font-mono leading-normal"
                        >
                          <div className="flex justify-between font-bold text-black border-b border-neutral-200 pb-1 mb-1">
                            <span>ID: FVR_{sub.id.toUpperCase()}</span>
                            <span className="uppercase text-neutral-500">{sub.type}</span>
                          </div>
                          <div>
                            <span className="text-[#5d5f5f]">SUBMITTER:</span> {sub.name}
                          </div>
                          {sub.title && (
                            <div>
                              <span className="text-[#5d5f5f]">PROJECT:</span> {sub.title}
                            </div>
                          )}
                          <div className="mt-1 line-clamp-2 text-neutral-600 italic">
                            "{sub.message}"
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer info inside sidebar */}
              <div className="font-mono text-[10px] text-[#5d5f5f] pt-4 border-t border-neutral-200">
                <span className="block text-black font-semibold">FUTURE REALITY</span>
                <span>NYC ART ARCHIVE 2026</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. DYNAMIC SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-20" id="search-overlay">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-bg/95 backdrop-blur-md"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              id="search-backdrop"
            />

            {/* Content box */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative w-full max-w-2xl bg-transparent mt-12 z-10"
              id="search-content-box"
            >
              <div className="flex items-center gap-4 border-b-2 border-brand-dark pb-2 mb-6">
                <span className="material-symbols-outlined text-2xl text-brand-dark">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH EXHIBITIONS, EXPERIENCES, PROGRAMS, OR ECOSYSTEM..."
                  className="w-full bg-transparent font-display text-lg md:text-2xl font-bold uppercase tracking-tight focus:outline-hidden placeholder-[#c6c6c6] text-brand-dark"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-1 border border-transparent hover:border-brand-dark hover:bg-brand-dark hover:text-white transition-colors cursor-pointer"
                  aria-label="Close search overlay"
                  id="search-close-btn"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Real-time search matches list */}
              <div className="max-h-[55vh] overflow-y-auto pr-2 custom-scrollbar space-y-6">
                {searchQuery.trim() === "" ? (
                  <div className="text-neutral-400 font-mono text-[11px] leading-relaxed">
                    Type a query (e.g. "Cinema", "Summit", "Fashion", "Music", "AWARDS") to search through our official curated indices in real time.
                  </div>
                ) : (
                  <>
                    {/* Program results */}
                    {filteredPrograms.length > 0 && (
                      <div className="space-y-2">
                        <span className="font-mono text-[9px] font-bold text-neutral-400 block uppercase tracking-widest border-b border-neutral-200 pb-1">
                          SEASON PROGRAMS ({filteredPrograms.length})
                        </span>
                        <div className="grid grid-cols-1 gap-3">
                          {filteredPrograms.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => {
                                setFocusedProgram(p);
                                setIsSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="text-left p-4 border border-brand-dark hover:bg-brand-dark hover:text-white transition-colors bg-brand-bg group cursor-pointer"
                            >
                              <div className="font-display font-bold uppercase text-base">
                                {p.title} – {p.subtitle}
                              </div>
                              <p className="font-sans text-xs text-neutral-500 mt-1 line-clamp-2 group-hover:text-neutral-300">
                                {p.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Open Call categories */}
                    {filteredCategories.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <span className="font-mono text-[9px] font-bold text-neutral-400 block uppercase tracking-widest border-b border-neutral-200 pb-1">
                          OPEN CALL SECTORS ({filteredCategories.length})
                        </span>
                        <div className="grid grid-cols-1 gap-3">
                          {filteredCategories.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => {
                                setFocusedCategory(c);
                                setIsSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="text-left p-4 border border-brand-dark hover:bg-brand-dark hover:text-white transition-colors bg-brand-bg group cursor-pointer"
                            >
                              <div className="font-display font-bold uppercase text-base">
                                {c.title}
                              </div>
                              <p className="font-sans text-xs text-neutral-500 mt-1 line-clamp-2 group-hover:text-neutral-300">
                                {c.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredPrograms.length === 0 && filteredCategories.length === 0 && (
                      <div className="p-10 border border-dashed border-neutral-300 text-center font-mono text-xs text-neutral-400">
                        Zero matches found for catalog search query: "{searchQuery}".
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto w-full px-6 md:px-16 space-y-16 md:space-y-32">
        
        {/* ==========================================================
            SECTION 1: HERO VIEWPORT
            ========================================================== */}
        <section 
          className="pt-10 md:pt-16 pb-12 border-b border-brand-dark min-h-[600px] flex flex-col justify-end gap-10 relative overflow-hidden"
          id="hero-viewport"
        >
          {/* Decorative Immersive Background Portal (Visual Direction Elements) */}
          <div className="absolute right-0 top-1/4 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-brand-accent/5 blur-[80px] pointer-events-none z-0" />
          <div className="absolute right-1/4 bottom-10 w-64 h-64 rounded-full bg-neutral-900/5 blur-[60px] pointer-events-none z-0" />

          {/* Particle Web / Mesh Overlay Effect behind elements */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px] z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
            {/* Title, Subheadline, Supporting text block */}
            <div className="lg:col-span-8 space-y-6">
              <span className="font-mono text-[10px] bg-brand-dark text-white px-3 py-1 font-bold uppercase tracking-widest inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-ping" />
                NOW ACCEPTING FILM SUBMISSIONS & DELEGATES FOR 2026/27
              </span>

              <div className="space-y-4">
                <p className="font-mono text-sm sm:text-base md:text-lg uppercase tracking-[0.35em] text-brand-accent font-black flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-accent animate-pulse" />
                  PRESENTED BY
                </p>
                <div className="flex items-center gap-6 sm:gap-10 md:gap-14 bg-[#0A0A0A] p-5 sm:p-7 md:p-8 px-8 sm:px-12 md:px-16 rounded-xs border-2 border-brand-dark shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] w-fit flex-wrap">
                  {/* SOHO International Film Festival Logo */}
                  <a
                    href="https://sohofilmfest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="SOHO International Film Festival"
                    className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                    id="hero-soho-logo-link"
                  >
                    <SohoLogo size="md" variant="dark" className="h-16 sm:h-20 md:h-24" />
                  </a>
                  {/* Divider */}
                  <div className="h-16 sm:h-20 w-[1.5px] bg-white/25 hidden sm:block" />
                  {/* HXR Logo */}
                  <a
                    href="https://harvardxr.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Harvard GSD XR Conference (HXR)"
                    className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                    id="hero-hxr-logo-link"
                  >
                    <HxrLogo size="md" variant="color" className="h-14 sm:h-16 md:h-20" />
                  </a>
                </div>
              </div>

              <div className="space-y-1 mt-4">
                <h2 className="font-display text-[32px] sm:text-[48px] md:text-[64px] leading-[0.95] font-extrabold uppercase tracking-tighter text-brand-dark select-none">
                  <span className="text-brand-accent">F</span>UTURE <br /> 
                  <span className="text-brand-accent">R</span>EALITY
                </h2>

                <div className="font-display text-sm sm:text-lg md:text-xl font-black uppercase tracking-[0.2em] text-brand-dark/95">
                  FROM VIRTUAL TO REAL
                </div>
              </div>

              <div className="text-[15px] md:text-[17px] font-mono tracking-[0.25em] text-brand-dark uppercase font-bold mt-2 flex items-center gap-2" id="hero-location-badge">
                <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                Regal Union Square, New York
              </div>

              <div className="font-serif text-base sm:text-lg md:text-xl text-neutral-800 leading-relaxed max-w-2xl border-l-[3px] border-brand-accent pl-4 py-1 italic font-medium">
                A Curated Evening of AI Cinema,<br className="hidden sm:inline" />Future Storytelling, and Creative Culture
              </div>
            </div>

            {/* CTA buttons */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end space-y-6">
              <div className="flex flex-col gap-4 w-full sm:w-80">
                <a
                  href="https://filmfreeway.com/FutureRealityAIFilmFestival?pending=true"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="px-6 py-4 border-[1.5px] border-brand-dark font-mono text-[11px] font-bold tracking-widest text-white bg-brand-dark hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-200 cursor-pointer text-center uppercase shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:shadow-[5px_5px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] block"
                  id="submit-film-hero-btn"
                >
                  Submit Your Film
                </a>
                <button
                  onClick={() => setActiveModal("partner")}
                  className="px-6 py-4 border-[1.5px] border-brand-dark font-mono text-[11px] font-bold tracking-widest text-brand-dark bg-brand-bg hover:bg-brand-dark hover:text-white transition-all duration-200 cursor-pointer text-center uppercase shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:shadow-[5px_5px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                  id="become-partner-hero-btn"
                >
                  Become a Partner
                </button>
                <button
                  onClick={() => scrollTo("experience-section")}
                  className="px-6 py-4 border border-zinc-300 font-mono text-[10px] font-bold tracking-widest text-zinc-500 hover:text-brand-dark hover:border-brand-dark uppercase text-center block transition-colors cursor-pointer"
                  id="explore-festival-hero-btn"
                >
                  Explore the Festival ↓
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* ==========================================================
            SECTION 2: MANIFESTO
            ========================================================== */}
        <section 
          className="py-12 md:py-24 bg-brand-dark text-brand-bg rounded-xs scroll-mt-24 shadow-[4px_4px_4px_rgba(230,57,70,0.15)] relative overflow-hidden"
          id="manifesto-rich-section"
        >
          {/* Subtle scarlet aesthetic highlight inside background */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-accent/5 blur-[90px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10 selection:bg-brand-accent selection:text-white">
            <span className="font-mono text-[9px] bg-brand-accent text-white px-3 py-1 font-bold tracking-widest uppercase">
              THE 2026 BRAND MANIFESTO
            </span>

            <div className="space-y-6">
              <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl italic font-light leading-snug">
                "Cinema once reflected reality.<br className="hidden md:inline" /> 
                <span className="text-brand-accent font-bold">Today it has the power to create it.</span>"
              </h3>
              
              <p className="font-mono text-[#5d5f5f] text-xs uppercase tracking-widest">
                — FOUNDING CURATORS STATEMENT // FUTURE REALITY
              </p>
            </div>
          </div>
        </section>


        {/* ==========================================================
            SECTION 5: OFFICIAL COMPETITION / AWARDS
            ========================================================== */}
        <section 
          className="pb-12 border-b border-brand-dark space-y-12 scroll-mt-24"
          id="competition-section"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-4">
            <div className="space-y-2">
              <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                AWARDS & RECOGNITION // SECTION 03
              </span>
              <h3 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-brand-dark max-w-3xl leading-tight">
                WE CELEBRATE GREAT FILMMAKING — AND THE NEW FORMS OF IMAGINATION AI MAKES POSSIBLE.
              </h3>
            </div>
            <p className="font-serif text-xs md:text-sm text-[#5d5f5f] max-w-md md:text-right leading-relaxed">
              We recognize extraordinary expressions of machine-intelligence collaboration across our specialized categories. Click on any category to pitch a draft.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {competitionCategories.map((cat, idx) => {
              const isPremier = cat.id === "best_film" || cat.id === "special_jury_award";
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCompCategory(cat)}
                  className={`h-full border-[1.5px] border-brand-dark ${
                    isPremier ? "bg-white ring-1 ring-brand-dark/10" : "bg-neutral-50"
                  } hover:bg-brand-dark hover:text-[#f7f5f0] p-4 sm:p-5 flex flex-col justify-between hover:shadow-[6px_6px_0px_0px_rgba(230,57,70,0.8)] transition-all duration-300 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:translate-y-[-2px] cursor-pointer group select-none`}
                >
                  <div className="space-y-3 flex-1 flex flex-col">
                    <div className="flex justify-between items-center border-b border-brand-dark/10 group-hover:border-white/10 pb-2">
                      <span className={`font-mono text-[9px] ${isPremier ? "text-brand-accent font-black" : "text-zinc-400 font-bold"} uppercase tracking-widest`}>
                        {idx + 1 < 10 ? `CAT 0${idx + 1}` : `CAT ${idx + 1}`} {isPremier && "• PREMIER"}
                      </span>
                      <span className="font-mono text-[8px] uppercase font-bold text-zinc-400 group-hover:text-zinc-300">
                        {isPremier ? "HONOR" : "AWARD"}
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 flex flex-col justify-start">
                      <h4 className="font-display font-extrabold uppercase tracking-tight text-sm sm:text-base leading-tight group-hover:text-white text-brand-dark">
                        {cat.title}
                      </h4>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-brand-dark/10 group-hover:border-white/10 mt-3 flex justify-between items-center">
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase font-bold tracking-wider text-brand-accent">
                      Click to pitch
                    </span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform duration-200">
                      arrow_right_alt
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* -------------------------------------------------------------
              WHAT WE'RE LOOKING FOR & CURATORIAL SUBMISSION CRITERIA
              ------------------------------------------------------------- */}
          <SubmissionGuidelinesAccordion />
        </section>


        {/* ==========================================================
            SECTION 04: GLOBAL NETWORK
            ========================================================== */}
        <section 
          className="py-12 border-b border-brand-dark scroll-mt-24 font-sans text-brand-dark space-y-10"
          id="global-network-section"
        >
          {/* Global Network Editorial Showcase */}
          <GlobalNetworkGallery />
        </section>


        {/* ==========================================================
            SECTION 05: FESTIVAL EXPERIENCE (INCLUDES IMMERSIVE FUTURE REALITY)
            ========================================================== */}
        <section 
          className="pb-12 border-b border-brand-dark space-y-12 scroll-mt-24"
          id="experience-section"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-4">
            <div className="space-y-2">
              <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                FESTIVAL EXPERIENCE // SECTION 05
              </span>
              <h3 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-brand-dark">
                The Festival Experience
              </h3>
            </div>
            <p className="font-serif text-xs md:text-sm text-[#5d5f5f] max-w-md md:text-right leading-relaxed">
              Four interconnected dimensions spanning competitive awards, critical panels, immersive future reality installations, and theatrical film screenings.
            </p>
          </div>

          {/* Interactive Experience selection frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            
            {/* Left selector menu buttons */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {festivalPillars.map((exp, idx) => (
                <button
                  key={exp.id}
                  onClick={() => setSelectedPillarId(exp.id)}
                  className={`w-full text-left p-4 sm:p-5 border-[1.5px] transition-all duration-200 cursor-pointer flex items-center justify-between group focus:outline-hidden ${
                    selectedPillarId === exp.id
                      ? "bg-brand-dark text-white border-brand-dark shadow-[3px_3px_0px_0px_rgba(230,57,70,1)]"
                      : "bg-brand-bg text-brand-dark border-brand-dark hover:border-brand-accent hover:text-brand-accent shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-zinc-400 font-bold group-hover:text-brand-accent">
                      0{idx + 1}
                    </span>
                    <span className="font-display font-bold uppercase tracking-tight text-sm sm:text-base">
                      {exp.title}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                    arrow_right_alt
                  </span>
                </button>
              ))}
            </div>

            {/* Right Display detail panel */}
            <div className="lg:col-span-7 bg-neutral-100 border-[1.5px] border-brand-dark p-6 md:p-10 flex flex-col justify-between min-h-[300px] relative">
              <div className="absolute right-4 top-4 font-mono text-[80px] text-zinc-200 pointer-events-none select-none italic font-extrabold leading-none">
                {`0${festivalPillars.findIndex((p) => p.id === selectedPillarId) + 1}`}
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] bg-brand-accent text-white px-2 py-0.5 font-bold uppercase tracking-wider">
                      {festivalPillars.find((p) => p.id === selectedPillarId)?.tag || "EXPERIENCE INDEX"}
                    </span>
                    {selectedPillarId !== "awards" && (
                      <span className="font-mono text-[10px] bg-neutral-800 text-white px-2 py-0.5 font-bold uppercase tracking-wider animate-pulse">
                        MORE DETAILS COMING SOON
                      </span>
                    )}
                  </div>

                  {/* Dreama Partner Badge on Top Right for Immersive Future Reality */}
                  {(selectedPillarId === "immersive_future_reality" || selectedPillarId === "immersive_live_cinema" || selectedPillarId === "live_cinema") && (
                    <div className="hidden sm:inline-flex">
                      <DreamaLogo size="sm" variant="badge" />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-brand-dark pt-2">
                    {festivalPillars.find((p) => p.id === selectedPillarId)?.title}
                  </h4>

                  {(selectedPillarId === "immersive_future_reality" || selectedPillarId === "immersive_live_cinema" || selectedPillarId === "live_cinema") && (
                    <div className="sm:hidden pt-1">
                      <DreamaLogo size="sm" variant="badge" />
                    </div>
                  )}
                </div>

                <p className="font-serif text-base md:text-lg text-[#5d5f5f] leading-relaxed max-w-xl">
                  {festivalPillars.find((p) => p.id === selectedPillarId)?.description}
                </p>

                {/* Co-Creation Logo Feature Box specifically for Immersive Future Reality */}
                {(selectedPillarId === "immersive_future_reality" || selectedPillarId === "immersive_live_cinema" || selectedPillarId === "live_cinema") && (
                  <div className="mt-4 bg-white border border-brand-dark/20 p-4 sm:p-5 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] flex flex-col sm:flex-row items-center gap-5">
                    <div className="shrink-0 p-2 bg-white rounded-xs border border-brand-dark/10 shadow-xs">
                      <DreamaLogo size="md" variant="full" />
                    </div>
                    <div className="space-y-1.5 text-center sm:text-left border-t sm:border-t-0 sm:border-l border-brand-dark/10 pt-3 sm:pt-0 sm:pl-5">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="font-mono text-[9px] bg-brand-dark text-white px-2 py-0.5 font-bold uppercase tracking-widest">
                          CO-CREATION & SENSORY ENGINE
                        </span>
                        <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                      </div>
                      <p className="font-serif text-xs text-[#5d5f5f] leading-relaxed">
                        Subconscious dreamscapes, neural audience synthesis, and real-time sensory translation powered in official partnership with <strong>DREAMA</strong>.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-8 border-t border-brand-dark/10 flex flex-wrap gap-4 items-center justify-between">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                  FESTIVAL REGENCY CODE: {selectedPillarId?.toUpperCase()}_EXP_2026
                </span>
                
                {(selectedPillarId === "immersive_future_reality" || selectedPillarId === "immersive_live_cinema" || selectedPillarId === "live_cinema") ? (
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                    <span className="font-mono text-[11px] font-bold uppercase text-brand-accent">
                      Interactive Console Active Below ↓
                    </span>
                  </div>
                ) : (
                  <a
                    href="https://filmfreeway.com/FutureRealityAIFilmFestival?pending=true"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="font-mono text-[11px] font-bold uppercase text-brand-accent hover:underline cursor-pointer block"
                  >
                    Apply within this Experience →
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Direct Immersive Future Reality Interactive Console inside Experience */}
          {(selectedPillarId === "immersive_future_reality" || selectedPillarId === "immersive_live_cinema" || selectedPillarId === "live_cinema") && (
            <div id="dreama-viewport-box" className="mt-8 relative bg-black text-white w-full overflow-hidden select-none border border-brand-dark shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
              <DreamaInteractive />
            </div>
          )}
        </section>


        {/* ==========================================================
            SECTION 06: SUBMIT FILM & CREATOR PORTAL
            ========================================================== */}
        <section 
          className="pb-12 border-b border-brand-dark space-y-8 scroll-mt-24"
          id="submit-film-section"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-4">
            <div className="space-y-2">
              <span className="font-mono text-[10px] font-bold text-neural-400 uppercase tracking-widest block">
                GLOBAL OPEN CALL // SECTION 06
              </span>
              <h3 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-brand-dark">
                Submit Your Film & Project
              </h3>
            </div>
            <p className="font-serif text-xs md:text-sm text-[#5d5f5f] max-w-md md:text-right leading-relaxed">
              Open to international filmmakers, AI artists, XR developers, and multidisciplinary studios pushing the boundaries of moving images.
            </p>
          </div>

          <div className="bg-[#1A1A1A] text-[#F2F1ED] p-6 md:p-10 border border-brand-dark shadow-[4px_4px_0px_0px_rgba(230,57,70,0.8)] relative select-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                  <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest font-black">
                    OFFICIAL SUBMISSIONS PORTAL • 2026 EDITION
                  </span>
                </div>

                <h4 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  Enter The Official Competition On FilmFreeway
                </h4>

                <p className="font-serif text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                  Submit across Narrative, Documentary, Generative AI Cinema, Spatial Audio / XR, and Interactive Media categories. All selected works are eligible for jury honors, theatrical exhibition in Manhattan, and academic fellowships.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
                <a
                  href="https://filmfreeway.com/FutureRealityAIFilmFestival?pending=true"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full text-center py-4 px-6 bg-brand-accent text-white hover:bg-white hover:text-brand-dark font-mono text-xs uppercase tracking-widest font-black transition-all shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-none cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Submit Film Via FilmFreeway</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>

                <button
                  onClick={() => setActiveModal("partner")}
                  className="w-full text-center py-3.5 px-6 bg-transparent text-zinc-300 hover:text-white border border-white/20 hover:border-white font-mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
                >
                  Partner / Institutional Inquiries
                </button>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* ==========================================================
          FOOTER (NEWSLETTER & METRICS)
          ========================================================== */}
      <footer 
        className="w-full mt-16 md:mt-32 bg-brand-bg border-t border-brand-dark space-y-12 pb-12"
        id="app-footer"
      >
        {/* Collaborators logo banner in footer */}
        <CollaboratorsShowcase layout="ribbon" onPartnerClick={() => setActiveModal("partner")} />
        
        {/* Newsletter Signup & Directory Links Grid Row */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 px-6 md:px-16">
          
          {/* Column 1: Newsletter signup */}
          <div className="lg:col-span-5 space-y-4 font-sans text-brand-dark border-b lg:border-b-0 lg:border-r border-brand-dark pb-8 lg:pb-0 lg:pr-10">
            <h4 className="font-display font-extrabold uppercase tracking-tight text-lg text-brand-dark">
              Subscribe to Curatorial Broadcasts
            </h4>
            <p className="font-serif text-xs text-[#5d5f5f]">
              Register your email coordinates for our periodic updates on submissions deadlines, computational credits awards, and digital gallery lineups.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3 pt-2">
              <div className="flex items-center border border-brand-dark bg-white overflow-hidden shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="e.g. coordinates@domain.com"
                  className="w-full bg-transparent px-3 py-3 text-sm focus:outline-hidden text-brand-dark font-sans placeholder-[#c6c6c6]"
                  disabled={isNewsletterSubscribed}
                />
                <button
                  type="submit"
                  disabled={isNewsletterSubscribed}
                  className="bg-brand-dark text-white px-5 py-3 font-mono text-[10px] uppercase font-bold tracking-widest hover:bg-brand-accent transition-colors cursor-pointer disabled:bg-zinc-400 disabled:cursor-not-allowed text-center whitespace-nowrap"
                >
                  {isNewsletterSubscribed ? "✓ Subscribed" : "Subscribe"}
                </button>
              </div>
              {newsletterError && (
                <p className="text-red-600 font-sans text-xs tracking-wide">{newsletterError}</p>
              )}
              {isNewsletterSubscribed && (
                <p className="text-green-700 font-sans text-xs font-semibold tracking-wide flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Email logged successfully to general database.
                </p>
              )}
            </form>
          </div>

          {/* Column 2: Quick navigation links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-widest block border-b border-zinc-200 pb-1">
                FESTIVAL UTILITIES
              </span>
              <ul className="space-y-2 font-mono text-[10px] text-[#5d5f5f] font-semibold uppercase tracking-wider">
                <li>
                  <a
                    href="https://filmfreeway.com/FutureRealityAIFilmFestival?pending=true"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="hover:text-brand-accent transition-colors cursor-pointer text-left focus:outline-hidden block"
                  >
                    Submit Film
                  </a>
                </li>
                <li>
                  <button onClick={() => setActiveModal("partner")} className="hover:text-brand-accent transition-colors cursor-pointer text-left focus:outline-hidden">
                    Partnerships
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Curator press packages: Contact connect@futurereality.com for vector logos.")} className="hover:text-brand-accent transition-colors cursor-pointer text-left focus:outline-hidden">
                    Press Kit
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal("partner")} className="hover:text-brand-accent transition-colors cursor-pointer text-left focus:outline-hidden">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-widest block border-b border-zinc-200 pb-1">
                SOCIAL PLATFORMS
              </span>
              <ul className="space-y-2 font-mono text-[10px] text-[#5d5f5f] font-semibold uppercase tracking-wider">
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors">
                    Instagram // @fvr
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors">
                    X-Twitter // @fvr_cine
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors">
                    LinkedIn // fvr-platform
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors">
                    YouTube // fvr_channel
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Brand statement */}
          <div className="lg:col-span-3 space-y-4 sm:text-left lg:text-right flex flex-col justify-between items-start lg:items-end">
            <div className="space-y-2">
              <span className="font-display font-black text-sm uppercase tracking-tighter text-brand-dark block">
                <span className="text-brand-accent">F</span>UTURE REALITY
              </span>
              <p className="font-mono text-[10px] text-zinc-400">
                © 2026 FUTURE REALITY. ALL RIGHTS RESERVED. SECURE LOCAL MEMORY COOPERATION.
              </p>
            </div>

            <div className="font-display text-[15px] md:text-lg font-black text-brand-accent leading-tighter uppercase uppercase tracking-tighter text-left lg:text-right select-none max-w-[200px] border-l-2 lg:border-l-0 lg:border-r-2 border-brand-accent pl-3 lg:pr-3 py-1">
              "The Future Is No Longer Watched. <br className="hidden lg:inline" />
              It Is Experienced."
            </div>
          </div>

        </div>

        {/* Small legal footer coordinates row */}
        <div className="max-w-7xl mx-auto w-full border-t border-brand-dark/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] font-mono text-zinc-400 px-6 md:px-16">
          <div className="flex gap-4">
            <button onClick={() => alert("Submissions Privacy Index: Saved locally on your Client Storage.")} className="hover:text-brand-dark transition-colors">
              Submit Privacy
            </button>
            <button onClick={() => alert("Terms of Curation: Reserved to Future Reality advisory circle curators.")} className="hover:text-brand-dark transition-colors">
              Submission Terms
            </button>
          </div>
          <span className="block italic">
            SECURE SANDBOXED ENVIRONMENT // PORT INGRESS: 3000
          </span>
        </div>

      </footer>


      {/* ==========================================================
          MODALS PORTAL GROUP - INTERACTIVE VIEWS
          ========================================================== */}
      
      {/* MODAL 1: PARTNERS INQUIRY */}
      <Modal
        isOpen={activeModal === "partner"}
        onClose={() => setActiveModal(null)}
        title="PARTNERSHIP REGISTRY REQUEST"
      >
        <p className="font-serif text-xs text-neutral-500 mb-6 leading-relaxed">
          Register brand capabilities, computational hardware provisions, or institution galleries to build the permanent spatial home of algorithmic filmmaking.
        </p>
        <SubmissionForm type="partner" onSuccess={handleSubmissionSuccess} />
      </Modal>

      {/* MODAL 2: GENERAL OPEN CALL APPLY */}
      <Modal
        isOpen={activeModal === "opencall"}
        onClose={() => setActiveModal(null)}
        title="OPEN CALL 2026 GENERAL APPLICATION"
      >
        <p className="font-serif text-xs text-neutral-500 mb-6 leading-relaxed">
          Submit your design draft, cinematic concept, or spatial blueprints to join our upcoming digital art and dreaming exhibition cycle.
        </p>
        <SubmissionForm type="opencall" onSuccess={handleSubmissionSuccess} />
      </Modal>

      {/* MODAL 3: IN-DEPTH REUSE PROGRAM STAGES DETAILS */}
      <Modal
        isOpen={focusedProgram !== null}
        onClose={() => setFocusedProgram(null)}
        title={focusedProgram ? `${focusedProgram.title.toUpperCase()}: ${focusedProgram.subtitle.toUpperCase()}` : ""}
      >
        {focusedProgram && (
          <div className="space-y-6">
            <div className="aspect-[21/9] w-full bg-neutral-900 border border-brand-dark overflow-hidden shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
              <img
                src={
                  focusedProgram.id === "festival"
                    ? "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80"
                    : focusedProgram.id === "dreama"
                    ? "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=80"
                    : focusedProgram.id === "conversations"
                    ? "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80"
                    : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                }
                alt={focusedProgram.title}
                className="w-full h-full object-cover grayscale brightness-90 contrast-105"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-100 p-4 border border-neutral-200">
              <div>
                <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest">TIMELINE SEQUENCE</span>
                <span className="font-sans text-xs font-bold text-black uppercase tracking-wide">{focusedProgram.schedule}</span>
              </div>
              <div className="sm:text-right">
                <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest">LEAD CURATOR</span>
                <span className="font-sans text-xs font-bold text-black uppercase tracking-wide">{focusedProgram.curator}</span>
              </div>
            </div>

            <div className="space-y-4 text-black">
              <h4 className="font-display font-extrabold text-lg uppercase tracking-tight">Curatorial Statement</h4>
              <p className="font-serif text-base leading-relaxed text-neutral-800 font-light font-light leading-relaxed">
                {focusedProgram.longDescription}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row gap-3">
              <a
                href="https://filmfreeway.com/FutureRealityAIFilmFestival?pending=true"
                target="_blank"
                referrerPolicy="no-referrer"
                onClick={() => setFocusedProgram(null)}
                className="flex-grow py-3 text-center bg-black text-white hover:bg-neutral-800 uppercase font-sans font-bold text-[10px] tracking-widest font-semibold cursor-pointer block"
              >
                SUBMIT CO-OPERATION DRAFT
              </a>
              <button
                onClick={() => setFocusedProgram(null)}
                className="px-6 py-3 text-center border border-black text-black hover:bg-black hover:text-[#fbf9f9] uppercase font-sans font-bold text-[10px] tracking-widest font-semibold transition cursor-pointer"
              >
                CLOSE INDEX
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL 4: DETAILED OPEN CALL FOCUS & CATEGORICAL APPLY */}
      <Modal
        isOpen={focusedCategory !== null}
        onClose={() => setFocusedCategory(null)}
        title={focusedCategory ? `OPEN CALL PROJECT FOCUS: ${focusedCategory.title.toUpperCase()}` : ""}
      >
        {focusedCategory && (
          <div className="space-y-6">
            <div className="aspect-[21/9] w-full bg-neutral-900 border border-brand-dark overflow-hidden shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
              <img
                src={
                  focusedCategory.id === "films"
                    ? "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80"
                    : focusedCategory.id === "hybrid"
                    ? "https://images.unsplash.com/photo-1502691876148-a846f376038a?auto=format&fit=crop&w=1200&q=80"
                    : focusedCategory.id === "immersive"
                    ? "https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=1200&q=80"
                    : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
                }
                alt={focusedCategory.title}
                className="w-full h-full object-cover grayscale brightness-90 contrast-105"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4">
              <h4 className="font-display font-extrabold text-base uppercase tracking-tight text-black">Category Curation Objective</h4>
              <p className="font-serif text-sm leading-relaxed text-neutral-800 font-light">
                {focusedCategory.description}
              </p>
            </div>

            <div className="bg-neutral-100 p-4 border border-neutral-300 space-y-2">
              <span className="font-mono text-[9px] text-[#5d5f5f] font-bold uppercase tracking-widest block">REQUIRED DELIVERABLES SCHED</span>
              <p className="font-sans text-xs text-black font-semibold leading-relaxed">
                {focusedCategory.deliverables}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-200 space-y-4">
              <span className="font-display font-extrabold text-sm uppercase tracking-tight block text-black">PRE-SELECTED REGISTRATION FORM</span>
              <SubmissionForm 
                type="opencall" 
                initialCategory={focusedCategory.title}
                onSuccess={(sub) => {
                  setFocusedCategory(null);
                  handleSubmissionSuccess(sub);
                }} 
              />
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL 5: OFFICIAL COMPETITION CATEGORIES CLICK DIALOGS */}
      <Modal
        isOpen={selectedCompCategory !== null}
        onClose={() => setSelectedCompCategory(null)}
        title={selectedCompCategory ? `CURATED CLASS: ${selectedCompCategory.title.toUpperCase()}` : ""}
      >
        {selectedCompCategory && (
          <div className="space-y-6 text-black">
            <div className="flex items-center gap-4 bg-neutral-100 p-4 border border-neutral-300">
              <span className="material-symbols-outlined text-brand-accent text-4xl">military_tech</span>
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">OFFICIAL FESTIVAL COMPETITION AWARD</span>
                <p className="font-sans text-[11px] text-brand-dark/80 tracking-wide font-bold">RECOGNIZED AT NYC WINTER SEASONS CEREMONY</p>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-sans text-xs font-bold uppercase tracking-wider text-zinc-400">Class Objective Overview</h5>
              <p className="font-sans text-lg text-black font-extrabold tracking-tight leading-relaxed">
                {selectedCompCategory.description}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row gap-3">
              <a
                href="https://filmfreeway.com/FutureRealityAIFilmFestival?pending=true"
                target="_blank"
                referrerPolicy="no-referrer"
                onClick={() => setSelectedCompCategory(null)}
                className="flex-grow py-3 text-center bg-brand-dark hover:bg-brand-accent text-white uppercase font-sans font-bold text-[10px] tracking-widest cursor-pointer shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] block"
              >
                PITCH TO THIS CATEGORY
              </a>
              <button
                onClick={() => setSelectedCompCategory(null)}
                className="px-6 py-3 border border-brand-dark hover:bg-brand-dark hover:text-white uppercase font-sans font-bold text-[10px] tracking-widest cursor-pointer transition"
              >
                CLOSE INDEX
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL 6: INTERACTIVE ARCHIVE SUBMISSION SUCCESS (TOAST SIM) */}
      <Modal
        isOpen={activeModal === "success"}
        onClose={() => setActiveModal(null)}
        title="TRANSLATION REGISTRY CONFIRMED"
      >
        <div className="space-y-6 text-black" id="success-feedback-container">
          <div className="flex items-center gap-4 bg-green-50 text-green-800 border border-green-200 p-4">
            <span className="material-symbols-outlined text-green-600 text-3xl">task_alt</span>
            <div className="space-y-0.5">
              <h5 className="font-sans text-xs font-bold leading-none uppercase tracking-wider">INTEGRATION ENVELOPE RECEIVED</h5>
              <p className="font-sans text-[11px] leading-relaxed text-green-700 font-medium">Your telemetry data packet is logged into browser memory registry.</p>
            </div>
          </div>

          <p className="font-serif text-sm leading-relaxed text-neutral-700 font-light">
            {feedbackMessage} Welcome to the Future Reality ecosystem. You can access your offline submissions catalog record anytime under the <b>"Platform Catalog Index" (Menu Icon on top-left of the page)</b>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
            <button
              onClick={() => {
                setActiveModal(null);
                setIsMenuOpen(true);
              }}
              className="flex-grow py-3 bg-black text-white hover:bg-neutral-800 uppercase font-sans font-bold text-[10px] tracking-widest cursor-pointer text-center"
              id="success-view-log-btn"
            >
              BROWSE REGISTRY LOG
            </button>
            <button
              onClick={() => setActiveModal(null)}
              className="px-6 py-3 border border-black hover:bg-black hover:text-white uppercase font-sans font-bold text-[10px] tracking-widest transition cursor-pointer"
              id="success-dismiss-btn"
            >
              Acknowledge
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
