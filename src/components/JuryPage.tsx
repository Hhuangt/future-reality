import { useState } from "react";
import { grandJury, preliminaryJury } from "../juryData";
import { JuryMember } from "../types";

type JuryPanel = "preliminary" | "grand";

const panels: { id: JuryPanel; label: string; kicker: string; summary: string; members: JuryMember[] }[] = [
  {
    id: "preliminary",
    label: "Preliminary Jury",
    kicker: "Round 2",
    summary: "The preliminary jury is the second round of review. These jurors watch the films that advance from the festival’s internal screening.",
    members: preliminaryJury
  },
  {
    id: "grand",
    label: "Grand Jury",
    kicker: "Round 3",
    summary: "The grand jury is the third round. They review the shortlist and select the official awards.",
    members: grandJury
  }
];

function JuryAvatar({ member, tone }: { member: JuryMember; tone: JuryPanel }) {
  const accent = tone === "grand" ? "#E63946" : "#F2F1ED";
  return (
    <div className="relative aspect-square w-full overflow-hidden border-b border-brand-dark bg-[#141414]">
      <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
        <rect width="320" height="320" fill="#141414" />
        <circle cx="248" cy="78" r="86" fill={accent} />
        <text
          x="24"
          y="210"
          fill="#F2F1ED"
          fontFamily="Bricolage Grotesque, sans-serif"
          fontSize="72"
          fontWeight="800"
        >
          {member.initials}
        </text>
      </svg>
    </div>
  );
}

function JuryCard({ member, tone }: { member: JuryMember; tone: JuryPanel }) {
  const [open, setOpen] = useState(false);
  const paragraphs = member.bio?.split(/\n\n+/).filter(Boolean) ?? [];
  const long = (member.bio?.length ?? 0) > 320;
  const longRole = member.role.length > 72;

  return (
    <article className="h-full bg-white border-[1.5px] border-brand-dark shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] flex flex-col">
      <JuryAvatar member={member} tone={tone} />
      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <span className={`font-mono text-[10px] font-bold text-brand-accent leading-snug ${longRole ? "normal-case tracking-normal" : "uppercase tracking-wide"}`}>
          {member.role}
        </span>
        <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-brand-dark leading-tight">
          {member.name}
        </h3>
        {member.organization && (
          <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            {member.organization}
          </p>
        )}
        {paragraphs.length > 0 ? (
          long && !open ? (
            <p className="font-serif text-sm text-neutral-700 leading-relaxed line-clamp-6">
              {paragraphs.join(" ")}
            </p>
          ) : (
            <div className="font-serif text-sm text-neutral-700 leading-relaxed space-y-3">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          )
        ) : null}
        <div className="mt-auto pt-3 flex items-center justify-between gap-3">
          {long ? (
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-dark hover:text-brand-accent cursor-pointer min-h-11"
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
              className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-accent hover:underline min-h-11 inline-flex items-center"
            >
              Profile
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function JuryPage() {
  const [panel, setPanel] = useState<JuryPanel>("preliminary");
  const active = panels.find((item) => item.id === panel) ?? panels[0];

  return (
    <section className="pt-10 md:pt-16 pb-8 space-y-10" id="jury-page">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-dark pb-6">
        <div className="space-y-3 max-w-3xl">
          <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
            2026 EDITION // JURY
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-brand-dark leading-[0.95]">
            Preliminary jury. <span className="text-brand-accent">Grand jury.</span>
          </h2>
        </div>
        <p className="font-serif text-sm md:text-base text-[#5d5f5f] max-w-md md:text-right leading-relaxed">
          Round 2 reviews the films that advance. Round 3 selects the awards.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="tablist" aria-label="Jury panels">
        {panels.map((item) => {
          const selected = item.id === panel;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`jury-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="jury-panel"
              onClick={() => setPanel(item.id)}
              className={`text-left px-5 py-4 border-[1.5px] border-brand-dark cursor-pointer transition-all min-h-16 ${
                selected
                  ? "bg-brand-dark text-white shadow-[4px_4px_0px_0px_rgba(230,57,70,1)]"
                  : "bg-transparent text-brand-dark hover:bg-white"
              }`}
            >
              <span className={`block font-mono text-[9px] font-bold uppercase tracking-widest ${selected ? "text-brand-accent" : "text-neutral-400"}`}>
                {item.kicker} · {item.members.length} jurors
              </span>
              <span className="block font-display text-xl md:text-2xl font-extrabold uppercase tracking-tight mt-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div id="jury-panel" role="tabpanel" aria-labelledby={`jury-tab-${active.id}`} className="space-y-8">
        <p className="font-serif text-base md:text-lg text-neutral-800 leading-relaxed max-w-3xl border-l-[3px] border-brand-accent pl-4">
          {active.summary}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {active.members.map((member) => (
            <div key={member.id} className="h-full">
              <JuryCard member={member} tone={active.id} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
