import { Fragment, useEffect, useRef, useState } from "react";
import { grandJury, preliminaryJury } from "../juryData";
import { JuryMember } from "../types";
import { motion } from "motion/react";
import TechFieldDecor from "./TechFieldDecor";
import { MaskLine, reveal } from "./ui";

type JurySectionId = "grand" | "preliminary";

const sections: { id: JurySectionId; label: string; summary: string; members: JuryMember[] }[] = [
  {
    id: "grand",
    label: "Grand Jury",
    summary: "The grand jury reviews the shortlist and selects the official awards.",
    members: grandJury,
  },
  {
    id: "preliminary",
    label: "Preliminary Jury",
    summary: "The preliminary jury watches the films that advance from the festival’s internal screening.",
    members: preliminaryJury,
  },
];

function Portrait({ member }: { member: JuryMember }) {
  return (
    <div className="relative mx-auto h-36 w-36 md:h-40 md:w-40 rounded-full overflow-hidden ring-1 ring-brand-copper/50 ring-offset-4 ring-offset-transparent bg-brand-surface-2">
      {member.photo ? (
        <img
          src={member.photo}
          alt={`${member.name} headshot`}
          className="h-full w-full object-cover object-top"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-display text-5xl text-brand-cream/80">
          {member.initials}
        </span>
      )}
    </div>
  );
}

function JuryCard({ member, panel }: { member: JuryMember; panel: string }) {
  const [open, setOpen] = useState(false);
  const paragraphs = member.bio?.split(/\n\n+/).filter(Boolean) ?? [];
  const long = (member.bio?.length ?? 0) > 280;

  return (
    <article className="relative h-full flex flex-col bg-brand-surface border border-brand-line overflow-hidden">
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 h-64 w-[140%] pointer-events-none opacity-70"
        style={{
          clipPath: "polygon(44% 0, 56% 0, 88% 100%, 12% 100%)",
          background: "linear-gradient(to bottom, rgba(240,178,122,0.32), rgba(212,135,79,0.08) 70%, transparent)",
          filter: "blur(8px)",
        }}
        aria-hidden="true"
      />

      <div className="relative pt-8 pb-6 px-6 text-center space-y-4">
        <span className="font-serif text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-cream/80 block">
          {panel}
        </span>
        <Portrait member={member} />
        <div className="space-y-2 pt-2">
          <h3 className="font-display text-[28px] uppercase leading-none text-brand-ink">{member.name}</h3>
          <p className="font-serif text-[15px] text-brand-cream leading-snug">{member.role}</p>
          {member.organization && (
            <p className="font-serif text-[15px] font-bold text-brand-ink/90 leading-snug">{member.organization}</p>
          )}
        </div>
      </div>

      {(paragraphs.length > 0 || member.website) && (
        <div className="relative mt-auto border-t border-brand-line px-6 py-5 space-y-3">
          {paragraphs.length > 0 &&
            (long && !open ? (
              <p className="font-serif text-sm text-brand-ink/80 leading-relaxed line-clamp-4">{paragraphs.join(" ")}</p>
            ) : (
              <div className="font-serif text-sm text-brand-ink/80 leading-relaxed space-y-3">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            ))}
          <div className="flex items-center justify-between gap-3">
            {long ? (
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="label text-[10px] text-brand-amber hover:text-brand-cream cursor-pointer min-h-10"
                aria-expanded={open}
              >
                {open ? "Show less" : "Read bio"}
              </button>
            ) : (
              <span />
            )}
            {member.website && (
              <a
                href={member.website}
                target="_blank"
                rel="noreferrer"
                className="label text-[10px] text-brand-muted hover:text-brand-cream min-h-10 inline-flex items-center"
              >
                Profile ↗
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function JurySection({
  section,
  sectionRef,
}: {
  section: (typeof sections)[number];
  sectionRef?: (node: HTMLElement | null) => void;
}) {
  return (
    <section ref={sectionRef} id={`jury-${section.id}`} className="scroll-mt-28 space-y-10" aria-labelledby={`jury-section-${section.id}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-line pb-5">
        <div className="flex items-baseline gap-4">
          <h3 id={`jury-section-${section.id}`} className="font-display text-4xl md:text-5xl uppercase text-brand-ink leading-none">
            {section.label}
          </h3>
          <span className="label text-brand-copper">{String(section.members.length).padStart(2, "0")}</span>
        </div>
        <p className="font-serif text-base text-brand-muted max-w-md md:text-right leading-relaxed">{section.summary}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {section.members.map((member, idx) => (
          <motion.div key={member.id} className="h-full" {...reveal((idx % 3) * 0.1, 40)}>
            <JuryCard member={member} panel={section.label} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function JuryPage() {
  const [activeSection, setActiveSection] = useState<JurySectionId>("grand");
  const sectionRefs = useRef<Record<JurySectionId, HTMLElement | null>>({ grand: null, preliminary: null });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#jury-preliminary" || hash === "#jury-grand") {
      const id = hash.replace("#jury-", "") as JurySectionId;
      window.setTimeout(() => {
        sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(id);
      }, 100);
    }
  }, []);

  useEffect(() => {
    const nodes = sections
      .map((section) => sectionRefs.current[section.id])
      .filter((node): node is HTMLElement => node !== null);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.id.replace("jury-", "");
        if (id === "grand" || id === "preliminary") setActiveSection(id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: JurySectionId) => {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#jury-${id}`);
  };

  return (
    <div id="jury-page">
      <section className="relative overflow-hidden border-b border-brand-line">
        <TechFieldDecor intensity={0.9} />
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[min(900px,150vw)] pointer-events-none"
          style={{
            clipPath: "polygon(44% 0, 56% 0, 100% 100%, 0 100%)",
            background: "linear-gradient(to bottom, rgba(255,205,160,0.45), rgba(212,135,79,0.14) 60%, transparent)",
            filter: "blur(14px)",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-16 pt-40 pb-20 text-center space-y-5">
          <span className="font-serif text-sm font-semibold uppercase tracking-[0.2em] text-brand-cream">2026 Edition</span>
          <h2 className="font-display uppercase text-brand-ink text-[clamp(4rem,12vw,10rem)] leading-[0.88]">
            <MaskLine delay={0.1}>The Jury</MaskLine>
          </h2>
          <p className="font-serif text-lg md:text-xl text-brand-ink/85 max-w-2xl mx-auto leading-relaxed">
            Filmmakers, artists, technologists, and festival leaders reviewing this year’s selection.
          </p>
        </div>
      </section>

      <div className="sticky top-[68px] z-30 bg-brand-bg/90 backdrop-blur-md border-b border-brand-line">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex gap-8" role="tablist" aria-label="Jump to jury section">
          {sections.map((item) => {
            const selected = item.id === activeSection;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`jury-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`relative py-4 label cursor-pointer transition-colors ${selected ? "text-brand-ink" : "text-brand-muted hover:text-brand-ink"}`}
              >
                {item.label} <span className="text-brand-copper ml-1">{item.members.length}</span>
                <span
                  className={`absolute left-0 right-0 -bottom-px h-[2px] bg-brand-amber transition-opacity ${selected ? "opacity-100" : "opacity-0"}`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-brand-line">
        <TechFieldDecor intensity={0.68} />
        <div className="relative z-[1] max-w-7xl mx-auto px-6 md:px-16 py-20 space-y-24">
        {sections.map((section) => (
          <Fragment key={section.id}>
            <JurySection
              section={section}
              sectionRef={(node) => {
                sectionRefs.current[section.id] = node;
              }}
            />
          </Fragment>
        ))}
        </div>
      </div>
    </div>
  );
}
