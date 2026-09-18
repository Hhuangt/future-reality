import React from "react";

interface GuidelineSection {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  content: React.ReactNode;
}

export default function SubmissionGuidelinesAccordion() {
  const sections: GuidelineSection[] = [
    {
      id: "eligibility",
      number: "01",
      title: "ELIGIBILITY",
      shortTitle: "ELIGIBILITY",
      summary: "Completion date, runtime, language, premiere status",
      content: (
        <div className="space-y-4 font-sans text-xs sm:text-sm text-neutral-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border-b sm:border-b-0 sm:border-r border-zinc-200/80 pb-3 sm:pb-0 sm:pr-3">
              <span className="font-mono text-[9px] uppercase font-bold text-zinc-500 block mb-1">
                Completion Date
              </span>
              <p className="font-medium text-brand-dark">
                Works completed on or after Jan 1, 2026.
              </p>
            </div>

            <div>
              <span className="font-mono text-[9px] uppercase font-bold text-zinc-500 block mb-1">
                Runtime
              </span>
              <p className="font-medium text-brand-dark">
                3–15 minutes, including credits.
              </p>
            </div>

            <div className="border-b sm:border-b-0 sm:border-r border-zinc-200/80 pb-3 sm:pb-0 sm:pr-3">
              <span className="font-mono text-[9px] uppercase font-bold text-zinc-500 block mb-1">
                Premiere Status
              </span>
              <p className="font-medium text-brand-dark">
                No premiere requirement. Released works eligible.
              </p>
            </div>

            <div>
              <span className="font-mono text-[9px] uppercase font-bold text-zinc-500 block mb-1">
                Language
              </span>
              <p className="font-medium text-brand-dark">
                Worldwide. Non-English requires English subtitles.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-200/80">
            <span className="font-mono text-[9px] uppercase font-bold text-zinc-500 block mb-1">
              Eligible Categories & Formats
            </span>
            <p className="font-medium text-brand-dark">
              Narrative films, animation, documentaries, experimental films, music videos, and hybrid cinematic works are welcome.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "ai-creative-process",
      number: "02",
      title: "AI & CREATIVE PROCESS",
      shortTitle: "AI PROCESS",
      summary: "Meaningful use of AI and creative intention",
      content: (
        <div className="space-y-3 font-serif text-xs sm:text-sm text-neutral-800 leading-relaxed">
          <p className="font-sans font-bold text-brand-dark text-sm sm:text-base">
            Generative AI must play a meaningful creative role in the work.
          </p>
          <p className="text-neutral-700">
            There is no minimum percentage of AI-generated content and no minimum number of AI tools required.
          </p>
          <div className="p-3 bg-neutral-100 border-l-2 border-brand-accent italic text-brand-dark font-serif text-xs sm:text-sm">
            “We care less about how much AI you used than how intentionally you used it.”
          </div>
          <p className="font-sans text-xs text-neutral-600 leading-relaxed pt-1">
            AI may be incorporated into areas including concept development, writing, character creation, visual development, animation, production, post-production, sound, music, worldbuilding, or other aspects of the creative process.
          </p>
        </div>
      )
    },
    {
      id: "how-to-submit",
      number: "03",
      title: "HOW TO SUBMIT / SUBMISSION REQUIREMENTS",
      shortTitle: "SUBMISSION",
      summary: "FilmFreeway screener, AI statement, and primary tools list",
      content: (
        <div className="space-y-4 font-sans text-xs sm:text-sm text-neutral-800">
          <p className="font-serif leading-relaxed text-sm text-neutral-700">
            All submissions must be made through FilmFreeway and include a viewable online screener.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5 pl-3 border-l-2 border-brand-dark">
              <span className="font-bold text-brand-dark text-xs block">
                AI Creative Statement | 100–200 words
              </span>
              <p className="font-serif text-xs text-neutral-600">
                Briefly describe how AI was used in the creation of the work and how it contributed to your creative vision.
              </p>
            </div>

            <div className="space-y-1.5 pl-3 border-l-2 border-brand-dark">
              <span className="font-bold text-brand-dark text-xs block">
                Primary AI Tools / Models
              </span>
              <p className="font-serif text-xs text-neutral-600">
                List the primary AI tools, platforms, or models used in creating the work.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://filmfreeway.com/FutureRealityAIFilmFestival?pending=true"
              target="_blank"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-white bg-brand-dark hover:bg-brand-accent px-5 py-2.5 transition-colors uppercase cursor-pointer"
            >
              <span>SUBMIT ON FILMFREEWAY</span>
              <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
            </a>
          </div>
        </div>
      )
    },
    {
      id: "screening-requirements",
      number: "04",
      title: "SCREENING REQUIREMENTS",
      shortTitle: "SCREENING",
      summary: "Resolution, subtitles, screening masters, exhibition materials",
      content: (
        <div className="space-y-2.5 font-serif text-xs sm:text-sm text-neutral-800 leading-relaxed">
          <p>
            Full HD (1920 × 1080) or higher is recommended.
          </p>
          <p>
            Non-English works must include English subtitles.
          </p>
          <p>
            Selected filmmakers will be contacted to provide high-quality screening masters, subtitle files where applicable, and additional exhibition or promotional materials.
          </p>
        </div>
      )
    },
    {
      id: "immersive-interactive",
      number: "05",
      title: "IMMERSIVE & INTERACTIVE",
      shortTitle: "IMMERSIVE",
      summary: "VR, AR, XR, spatial and experiential works",
      content: (
        <div className="space-y-3.5 font-sans text-xs sm:text-sm text-neutral-800">
          <p className="font-serif text-sm leading-relaxed text-neutral-700">
            VR, AR, XR, spatial, interactive, and experiential AI works are welcome for consideration.
          </p>
          <p className="font-serif text-xs sm:text-sm text-neutral-600 leading-relaxed">
            For immersive or interactive projects, please submit a 3–10 minute documentation video, a short project description, and relevant technical, installation, or access information.
          </p>
          <p className="font-sans text-xs font-semibold text-brand-dark">
            Projects may be considered for exhibition, demonstration, or presentation as part of the Future Reality experience program.
          </p>

          <div className="pt-2">
            <a
              href="https://filmfreeway.com/FutureRealityAIFilmFestival?pending=true#rules"
              target="_blank"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-brand-dark border border-brand-dark hover:bg-brand-dark hover:text-white px-4 py-2 transition-colors uppercase cursor-pointer"
            >
              <span>VIEW FULL RULES & TERMS</span>
              <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
            </a>
          </div>
        </div>
      )
    },
    {
      id: "human-authorship",
      number: "06",
      title: "HUMAN AUTHORSHIP",
      shortTitle: "AUTHORSHIP",
      summary: "Human creative direction, integrity, agency",
      content: (
        <div className="space-y-3 font-serif text-xs sm:text-sm text-neutral-800 leading-relaxed">
          <p>
            Future Reality prioritizes human creative direction and vision. While generative AI models, algorithmic shaders, and neural pipelines may augment, simulate, or generate project assets, the work must reflect the deliberate narrative and artistic choices of human creators.
          </p>
          <p className="text-neutral-600">
            We champion directors, writers, animators, and creative technologists who maintain intentional authorial voice and artistic stewardship throughout the creative lifecycle.
          </p>
        </div>
      )
    },
    {
      id: "rights-permissions",
      number: "07",
      title: "RIGHTS & PERMISSIONS",
      shortTitle: "RIGHTS",
      summary: "Intellectual property, clearances, model rights",
      content: (
        <div className="space-y-3 font-serif text-xs sm:text-sm text-neutral-800 leading-relaxed">
          <p>
            Entrants must own or have secured all necessary rights, licenses, clearances, and releases for all elements of their submission (including music compositions, underlying source material, voice likenesses, and custom dataset assets).
          </p>
          <p className="text-neutral-600">
            Submissions must not infringe upon the copyrights, trademarks, or publicity rights of any third party. Creators retain full copyright ownership of their submitted films and projects.
          </p>
        </div>
      )
    },
    {
      id: "selection-exhibition",
      number: "08",
      title: "SELECTION & EXHIBITION",
      shortTitle: "SELECTION",
      summary: "Jury review, theatrical premiere, showcase",
      content: (
        <div className="space-y-3 font-serif text-xs sm:text-sm text-neutral-800 leading-relaxed">
          <p>
            All eligible entries are thoroughly evaluated by the Future Reality curatorial committee and distinguished international jury panel. Works are judged on artistic merit, storytelling clarity, bold creative imagination, and the thoughtful application of artificial intelligence.
          </p>
          <p className="text-neutral-600">
            Selected filmmakers and creative teams will be officially invited to present their works at New York City premiere screenings and industry panel dialogues.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="pt-8 sm:pt-10 border-t-[1.5px] border-brand-dark space-y-8" id="submission-criteria-block">
      {/* Editorial Header Section */}
      <div className="space-y-3 max-w-4xl">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
            CURATORIAL CRITERIA // SELECTION CRITERIA
          </span>
          <span className="h-[2px] w-10 bg-brand-accent block" />
        </div>

        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-brand-dark">
          WHAT WE’RE LOOKING FOR
        </h3>

        <p className="font-serif text-base sm:text-lg text-brand-dark font-medium italic border-l-2 border-brand-accent pl-3.5 py-0.5">
          Great filmmaking. Bold imagination. AI used with intention.
        </p>

        <div className="space-y-1.5 font-serif text-xs sm:text-sm text-neutral-700 leading-relaxed max-w-3xl">
          <p>
            Future Reality celebrates filmmakers and creators exploring what cinematic reality can become through the thoughtful use of artificial intelligence and emerging creative tools.
          </p>
          <p>
            We are looking for work with a clear creative point of view, compelling storytelling, and intentional use of AI. Technical complexity alone is not a selection criterion.
          </p>
        </div>
      </div>

      {/* Specifications Header Bar */}
      <div className="flex items-center justify-between pt-2 pb-2 border-b border-brand-dark/20 flex-wrap gap-3">
        <span className="font-mono text-[10px] sm:text-[11px] font-bold text-neutral-600 uppercase tracking-wider">
          SUBMISSION SPECIFICATIONS ({sections.length} GUIDELINE SECTORS)
        </span>
        <span className="font-mono text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-widest">
          COMPLETE SPECIFICATIONS PERMANENTLY EXPANDED
        </span>
      </div>

      {/* ALL 8 GUIDELINE SECTORS PERMANENTLY EXPANDED DIRECTLY ON THE PAGE */}
      {/* Mobile: stacked vertically (grid-cols-1) for comfortable reading. Desktop: balanced 2-column grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start" 
        id="submission-guidelines-accordion"
      >
        {sections.map((section) => (
          <div
            key={section.id}
            id={`guideline-panel-${section.id}`}
            className="border-[1.5px] border-brand-dark bg-white shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] p-5 sm:p-6 space-y-4 flex flex-col justify-between"
          >
            {/* Header with number and title */}
            <div className="border-b border-brand-dark/15 pb-3.5 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-black text-brand-accent bg-neutral-100 border border-brand-dark/15 px-2 py-0.5">
                  {section.number}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 font-bold">
                  SECTOR {section.number}
                </span>
              </div>

              <h4 className="font-display font-black text-base sm:text-lg text-brand-dark uppercase tracking-tight leading-snug pt-1">
                {section.title}
              </h4>

              <p className="font-serif text-xs text-neutral-500 italic">
                {section.summary}
              </p>
            </div>

            {/* Full guideline content permanently visible */}
            <div className="pt-1 flex-1">
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
