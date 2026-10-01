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
        <div className="space-y-4 font-sans text-sm sm:text-[15px] text-brand-ink">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border-b sm:border-b-0 sm:border-r border-brand-line pb-3 sm:pb-0 sm:pr-3">
              <span className="label text-[10px] text-brand-muted block mb-1.5">
                Completion Date
              </span>
              <p className="font-medium text-brand-ink">
                Works completed on or after Jan 1, 2026.
              </p>
            </div>

            <div>
              <span className="label text-[10px] text-brand-muted block mb-1.5">
                Runtime
              </span>
              <p className="font-medium text-brand-ink">
                3–15 minutes, including credits.
              </p>
            </div>

            <div className="border-b sm:border-b-0 sm:border-r border-brand-line pb-3 sm:pb-0 sm:pr-3">
              <span className="label text-[10px] text-brand-muted block mb-1.5">
                Premiere Status
              </span>
              <p className="font-medium text-brand-ink">
                No premiere requirement. Released works eligible.
              </p>
            </div>

            <div>
              <span className="label text-[10px] text-brand-muted block mb-1.5">
                Language
              </span>
              <p className="font-medium text-brand-ink">
                Worldwide. Non-English requires English subtitles.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-brand-line">
            <span className="label text-[10px] text-brand-muted block mb-1.5">
              Eligible Categories & Formats
            </span>
            <p className="font-medium text-brand-ink">
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
        <div className="space-y-3 font-serif text-sm sm:text-[15px] text-brand-ink leading-relaxed">
          <p className="font-sans font-bold text-brand-ink text-sm sm:text-base">
            Generative AI must play a meaningful creative role in the work.
          </p>
          <p className="text-brand-ink/85">
            There is no minimum percentage of AI-generated content and no minimum number of AI tools required.
          </p>
          <div className="pl-4 border-l border-brand-copper italic text-brand-cream font-serif text-sm sm:text-base">
            “We care less about how much AI you used than how intentionally you used it.”
          </div>
          <p className="font-sans text-xs text-brand-muted leading-relaxed pt-1">
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
        <div className="space-y-4 font-sans text-sm sm:text-[15px] text-brand-ink">
          <p className="font-serif leading-relaxed text-sm text-brand-ink/85">
            All submissions must be made through FilmFreeway and include a viewable online screener.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5 pl-3 border-l-2 border-brand-line">
              <span className="font-bold text-brand-ink text-xs block">
                AI Creative Statement | 100–200 words
              </span>
              <p className="font-serif text-xs text-brand-muted">
                Briefly describe how AI was used in the creation of the work and how it contributed to your creative vision.
              </p>
            </div>

            <div className="space-y-1.5 pl-3 border-l-2 border-brand-line">
              <span className="font-bold text-brand-ink text-xs block">
                Primary AI Tools / Models
              </span>
              <p className="font-serif text-xs text-brand-muted">
                List the primary AI tools, platforms, or models used in creating the work.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://luma.com/8pqcqqu0"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-brand-amber hover:text-brand-cream transition-colors cursor-pointer"
            >
              <span>Purchase Early Bird Ticket</span>
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
        <div className="space-y-2.5 font-serif text-sm sm:text-[15px] text-brand-ink leading-relaxed">
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
        <div className="space-y-3.5 font-sans text-sm sm:text-[15px] text-brand-ink">
          <p className="font-serif text-sm leading-relaxed text-brand-ink/85">
            VR, AR, XR, spatial, interactive, and experiential AI works are welcome for consideration.
          </p>
          <p className="font-serif text-sm sm:text-[15px] text-brand-muted leading-relaxed">
            For immersive or interactive projects, please submit a 3–10 minute documentation video, a short project description, and relevant technical, installation, or access information.
          </p>
          <p className="font-sans text-xs font-semibold text-brand-ink">
            Projects may be considered for exhibition, demonstration, or presentation as part of the Future Reality experience program.
          </p>

          <div className="pt-2">
            <a
              href="https://filmfreeway.com/FutureRealityAIFilmFestival?pending=true#rules"
              target="_blank"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-brand-amber hover:text-brand-cream transition-colors cursor-pointer"
            >
              <span>Full rules & terms</span>
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
        <div className="space-y-3 font-serif text-sm sm:text-[15px] text-brand-ink leading-relaxed">
          <p>
            Future Reality prioritizes human creative direction and vision. While generative AI models, algorithmic shaders, and neural pipelines may augment, simulate, or generate project assets, the work must reflect the deliberate narrative and artistic choices of human creators.
          </p>
          <p className="text-brand-muted">
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
        <div className="space-y-3 font-serif text-sm sm:text-[15px] text-brand-ink leading-relaxed">
          <p>
            Entrants must own or have secured all necessary rights, licenses, clearances, and releases for all elements of their submission (including music compositions, underlying source material, voice likenesses, and custom dataset assets).
          </p>
          <p className="text-brand-muted">
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
        <div className="space-y-3 font-serif text-sm sm:text-[15px] text-brand-ink leading-relaxed">
          <p>
            All eligible entries are thoroughly evaluated by the Future Reality curatorial committee and distinguished international jury panel. Works are judged on artistic merit, storytelling clarity, bold creative imagination, and the thoughtful application of artificial intelligence.
          </p>
          <p className="text-brand-muted">
            Selected filmmakers and creative teams will be officially invited to present their works at New York City premiere screenings and industry panel dialogues.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-12" id="submission-criteria-block">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-brand-line pt-12">
        <div className="lg:col-span-5 space-y-4">
          <span className="label text-brand-copper">Submission guidelines</span>
          <h3 className="font-display uppercase text-4xl md:text-5xl text-brand-ink leading-[0.95]">
            What we’re
            <br />
            looking for
          </h3>
        </div>
        <div className="lg:col-span-7 space-y-4 font-serif text-base md:text-lg text-brand-ink/85 leading-relaxed">
          <p className="text-brand-cream text-xl md:text-2xl leading-snug">
            Great filmmaking. Bold imagination. AI used with intention.
          </p>
          <p>
            Future Reality celebrates filmmakers and creators exploring what cinematic reality can become through the thoughtful use of artificial intelligence and emerging creative tools.
          </p>
          <p className="text-brand-muted">
            We are looking for work with a clear creative point of view, compelling storytelling, and intentional use of AI. Technical complexity alone is not a selection criterion.
          </p>
        </div>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12" id="submission-guidelines-accordion">
        {sections.map((section) => (
          <li key={section.id} id={`guideline-panel-${section.id}`} className="border-t border-brand-line">
            <details className="group/guideline">
              <summary className="flex min-h-28 cursor-pointer list-none items-start gap-4 py-6 pr-2 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-2xl text-brand-copper tabular-nums">{section.number}</span>
                <span className="min-w-0 flex-1 space-y-1">
                  <span className="block font-display uppercase text-xl md:text-2xl text-brand-ink leading-tight">
                    {section.title}
                  </span>
                  <span className="block font-serif text-sm italic text-brand-muted">{section.summary}</span>
                </span>
                <span className="material-symbols-outlined mt-0.5 text-brand-muted transition-transform group-open/guideline:rotate-45" aria-hidden="true">
                  add
                </span>
              </summary>
              <div className="pb-8 pl-10 pr-4">{section.content}</div>
            </details>
          </li>
        ))}
      </ol>
    </div>
  );
}
