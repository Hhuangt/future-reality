import { motion } from "motion/react";
import { assetUrl } from "../lib/assetUrl";
import { reveal } from "./ui";

const communities = [
  {
    number: "01",
    name: "Seattle AI Film Festival",
    location: "Seattle · Global",
    logo: "/network/seattle-ai-film-festival.png?v=2",
    logoAlt: "Seattle AI Film Festival",
    description: [
      "The Seattle AI Film Festival celebrates visual storytelling brought to life with artificial intelligence. It curates leading AI films from more than 30 countries and anchors a high-energy community of filmmakers, technologists, and industry leaders exploring advanced applications of AI across film, video games, online comics, and other creative forms.",
    ],
  },
  {
    number: "02",
    name: "AI Art Innovation Alliance",
    location: "Beijing · Global",
    logo: null,
    logoAlt: null,
    description: [
      "The AI Art Innovation Alliance (AIAIA) was initiated by Today Art Museum and TODAY AI ART. Its founding leadership includes Fei Jun, Professor of Art and Technology at the Central Academy of Fine Arts, as the first Rotating Chair; curator Victoria Lu, filmmaker Lu Chuan, and Today Art Museum founder Zhang Baoquan as Vice Chairs; and TODAY AI ART founder LM Xie as Secretary-General.",
      "Bringing together more than 40 interdisciplinary experts, AIAIA is dedicated to human-led innovation in AI art. The Alliance promotes the meaningful integration of artificial intelligence and artistic creation, advocates for an ethical and sustainable ecosystem for art and technology, and works with AIGC creators worldwide to expand the boundaries of art through human creativity and intelligent tools.",
    ],
  },
  {
    number: "03",
    name: "FIRST International Film Festival",
    location: "China · International",
    logo: "/network/first-film-festival.png",
    logoAlt: "FIRST Fantastic Film Festival Beijing",
    description: [
      "FIRST International Film Festival is a film festival and industry service platform in China focused on discovering and promoting young filmmakers and their work.",
      "Since its inception in 2006, FIRST has spent two decades exploring and experimenting with how a film festival can support contemporary Chinese youth cinema, with particular attention to debut and early-career work. It also serves as a berth within world cinema, offering international audiences a multifaceted view of emerging Chinese filmmaking while contributing to the record of contemporary film history.",
    ],
  },
] as const;

function CommunityLogo({ community }: { community: (typeof communities)[number] }) {
  if (community.logo) {
    return (
      <img
        src={assetUrl(community.logo)}
        alt={community.logoAlt ?? community.name}
        className="h-full w-full object-contain"
        loading="lazy"
      />
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <span className="font-display text-[clamp(3.75rem,7vw,6rem)] leading-none tracking-[0.08em] text-brand-ink">
        AIAIA
      </span>
      <span className="mt-3 max-w-xs font-mono text-[9px] uppercase tracking-[0.28em] text-brand-muted">
        AI Art Innovation Alliance
      </span>
    </div>
  );
}

export default function CommunityPartners() {
  return (
    <section className="border-t border-brand-line pt-14 md:pt-20" aria-labelledby="community-partners-title">
      <motion.div
        className="mb-10 flex flex-col gap-4 border-b border-brand-line pb-6 md:flex-row md:items-end md:justify-between"
        {...reveal(0, 24)}
      >
        <div>
          <span className="label text-[10px] text-brand-copper">Partner network</span>
          <h3
            id="community-partners-title"
            className="mt-3 font-display text-4xl uppercase leading-none text-brand-ink md:text-5xl"
          >
            Community partners
          </h3>
        </div>
        <p className="max-w-md font-serif text-sm leading-relaxed text-brand-muted md:text-left">
          Independent festivals and cultural alliances connecting AI cinema, emerging artists, and creative technology communities worldwide.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {communities.map((community, index) => (
          <motion.article
            key={community.name}
            className="flex h-full flex-col border border-brand-line bg-brand-surface"
            {...reveal(index * 0.1, 32)}
          >
            <div className="flex h-48 items-center justify-center border-b border-brand-line bg-black/45 p-7 md:h-52">
              <CommunityLogo community={community} />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="font-display text-2xl tabular-nums text-brand-copper">{community.number}</span>
                <span className="label text-right text-[9px] text-brand-muted">{community.location}</span>
              </div>
              <h4 className="font-display text-3xl uppercase leading-[0.95] text-brand-ink">
                {community.name}
              </h4>
              <div className="mt-5 space-y-4 border-t border-brand-line pt-5">
                {community.description.map((paragraph) => (
                  <p key={paragraph} className="font-serif text-sm leading-relaxed text-brand-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
