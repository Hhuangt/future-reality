import { motion } from "motion/react";
import { teamGroups, TeamMember } from "../teamData";
import { assetUrl } from "../lib/assetUrl";
import { MaskLine, reveal } from "./ui";

const teamMembers = teamGroups.flatMap((group) => group.members);

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function TeamCard({ member, index, panel }: { member: TeamMember; index: number; panel: string }) {
  return (
    <motion.article
      {...reveal((index % 3) * 0.1, 40)}
      className="group relative flex min-h-[350px] h-full flex-col overflow-hidden border border-brand-line bg-brand-surface transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-brand-copper/60 hover:shadow-[0_22px_60px_rgba(0,0,0,0.32)]"
    >
      <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-brand-amber to-transparent transition-transform duration-700 group-hover:scale-x-100" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[140%] -translate-x-1/2 opacity-70"
        style={{
          clipPath: "polygon(44% 0, 56% 0, 88% 100%, 12% 100%)",
          background: "linear-gradient(to bottom, rgba(240,178,122,0.32), rgba(212,135,79,0.08) 70%, transparent)",
          filter: "blur(8px)",
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between gap-4 px-5 pt-5">
        <span className="label text-[9px] text-brand-cream/70">{panel}</span>
        <span className="font-mono text-[9px] tracking-[0.18em] text-brand-copper">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col items-center px-6 pb-7 pt-5 text-center">
        <div className="relative mb-6">
          <div className="absolute -inset-2 rounded-full border-[0.5px] border-brand-copper/15 transition-colors duration-500 group-hover:border-brand-copper/35" aria-hidden="true" />
          <div className="absolute -inset-7 rounded-full bg-brand-copper/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
          <div className="relative h-36 w-36 overflow-hidden rounded-full bg-brand-surface-2 ring-[0.5px] ring-brand-copper/45 ring-offset-2 ring-offset-transparent md:h-40 md:w-40">
        {member.image ? (
          <img
            src={assetUrl(member.image)}
            alt={`${member.name} headshot`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
            style={{ objectPosition: member.imagePosition ?? "center top" }}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center" aria-hidden="true">
            <span className="font-display text-5xl uppercase text-brand-cream/80">
              {initials(member.name)}
            </span>
          </div>
        )}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center">
          <h3 className="font-display text-[28px] uppercase leading-none text-brand-ink transition-colors duration-300 group-hover:text-brand-amber">
            {member.name}
          </h3>
          <span className="my-3 h-px w-8 bg-brand-copper/70 transition-all duration-500 group-hover:w-12" aria-hidden="true" />
          <p className="mx-auto max-w-xs font-serif text-[15px] leading-snug text-brand-cream">
            {member.role}
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-between border-t border-brand-line px-5 py-3">
        <span className="label text-[8px] text-brand-muted">Future Reality</span>
        <span className="label text-[8px] text-brand-muted">New York · 2026</span>
      </div>
    </motion.article>
  );
}

export default function TeamPage() {
  return (
    <div id="team-page">
      <section className="relative overflow-hidden border-b border-brand-line jury-surface">
        <div className="hero-deep-mask hero-deep-mask--jury" aria-hidden="true" />
        <div className="relative z-[1] mx-auto max-w-7xl px-6 pb-20 pt-40 text-center md:px-16">
          <span className="font-serif text-sm font-semibold uppercase tracking-[0.2em] text-brand-cream">
            The people behind Future Reality
          </span>
          <h1 className="mt-5 pb-[0.08em] pt-[0.06em] font-display text-[clamp(4.5rem,13vw,11rem)] uppercase leading-[0.92] text-brand-ink">
            <MaskLine delay={0.1}>Our Team</MaskLine>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl font-serif text-lg leading-relaxed text-brand-ink/85 md:text-xl">
            Thirteen collaborators working across programming, production, creator relations, partnerships, design, and editorial.
          </p>
        </div>
      </section>

      <section className="relative jury-surface" aria-label="Future Reality festival team">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-16 md:py-24">
          <motion.div
            className="mb-8 flex items-end justify-between gap-6 border-b border-brand-line pb-5"
            {...reveal(0, 22)}
          >
            <div>
              <span className="label text-[10px] text-brand-copper">Future Reality · 2026</span>
              <h2 className="mt-2 font-display text-4xl uppercase text-brand-ink md:text-5xl">
                Meet the Team
              </h2>
            </div>
            <span className="label hidden text-[9px] text-brand-muted sm:block">
              {teamMembers.length} people
            </span>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div key={member.name}>
                <TeamCard member={member} index={index} panel="Festival Team" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

