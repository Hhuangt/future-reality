import React, { useState } from "react";
import { GlobalNetworkItem } from "../types";
import { globalNetworkData } from "../data";
import Modal from "./Modal";
import { motion } from "motion/react";
import { EASE_OUT, SectionHeader, reveal } from "./ui";

const groups = [
  {
    number: "A",
    title: "Film & Media",
    description: "New York premieres, screenings, and the people shaping contemporary cinema.",
    itemIds: ["soho_16th_edition_premiere", "soho_gala_step_repeat"],
  },
  {
    number: "B",
    title: "Creative Technology",
    description: "XR, spatial computing, and the tools changing how stories are made.",
    itemIds: ["harvard_xr_keynote", "harvard_xr_inaugural"],
  },
  {
    number: "C",
    title: "Creator Communities",
    description: "Filmmakers, artists, researchers, and founders across New York, Harvard, and beyond.",
    itemIds: ["creator_network_nyc_cambridge", "hxr_2026_conference"],
  },
];

const byId = (id: string) => globalNetworkData.find((item) => item.id === id);

function Frame({ item, index, delay, onOpen }: { item: GlobalNetworkItem; index: number; delay: number; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="group text-left cursor-pointer w-full"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className="relative aspect-[16/10] overflow-hidden bg-brand-surface border border-brand-line"
        variants={{ hidden: { clipPath: "inset(0 0 100% 0)" }, shown: { clipPath: "inset(0 0 0% 0)" } }}
        transition={{ duration: 1.1, ease: EASE_OUT, delay }}
      >
        {item.imageUrl && (
          <div className="h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]">
            <motion.img
              variants={{ hidden: { scale: 1.18 }, shown: { scale: 1 } }}
              transition={{ duration: 1.6, ease: EASE_OUT, delay }}
              src={item.imageUrl}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute inset-3 frame-corners opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute left-3 bottom-3 label text-[10px] text-brand-cream/90">
          FR-{String(index).padStart(2, "0")} · {item.city}
        </span>
      </motion.div>
      <motion.div
        className="pt-4 space-y-1.5"
        variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: delay + 0.25 }}
      >
        <span className="label text-[10px] text-brand-copper">{item.category}</span>
        <h4 className="font-display uppercase text-2xl text-brand-ink leading-tight group-hover:text-brand-amber transition-colors">
          {item.title}
        </h4>
        <p className="font-serif text-sm text-brand-muted leading-relaxed">{item.subtitle}</p>
      </motion.div>
    </motion.button>
  );
}

export const GlobalNetworkGallery: React.FC = () => {
  const [selected, setSelected] = useState<GlobalNetworkItem | null>(null);

  return (
    <div className="space-y-20" id="global-network-gallery">
      <SectionHeader
        reel="03"
        label="Network"
        title={["Rooted in New York.", "Connected to the world."]}
        intro="Future Reality brings together film festivals, universities, and creator communities — from Manhattan screening rooms to Harvard research labs."
      />

      {groups.map((group, groupIndex) => {
        const items = group.itemIds.map(byId).filter((item): item is GlobalNetworkItem => Boolean(item));
        return (
          <div key={group.number} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10" id={`network-category-${group.number}`}>
            <motion.div className="lg:col-span-3 space-y-3 lg:pt-1" {...reveal(0, 24)}>
              <span className="font-display text-5xl text-brand-copper/70 leading-none">{group.number}</span>
              <h3 className="font-display uppercase text-2xl text-brand-ink">{group.title}</h3>
              <p className="font-serif text-sm text-brand-muted leading-relaxed max-w-xs">{group.description}</p>
            </motion.div>
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((item, itemIndex) => (
                <React.Fragment key={item.id}>
                  <Frame item={item} index={groupIndex * 2 + itemIndex + 1} delay={itemIndex * 0.15} onOpen={() => setSelected(item)} />
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      })}

      <Modal
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ""}
        kicker={selected ? `${selected.category} · ${selected.year}` : undefined}
      >
        {selected && (
          <div className="space-y-6">
            {selected.imageUrl && (
              <div className="aspect-[16/9] overflow-hidden border border-brand-line bg-black">
                <img src={selected.imageUrl} alt={selected.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </div>
            )}
            <p className="font-serif text-lg text-brand-cream leading-relaxed">{selected.subtitle}</p>
            <p className="font-serif text-[15px] text-brand-ink/85 leading-relaxed">{selected.description}</p>
            <ul className="border-t border-brand-line">
              {selected.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-4 border-b border-brand-line py-3 font-sans text-sm text-brand-ink/90">
                  <span className="text-brand-copper">—</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <p className="label text-[10px] text-brand-muted">{selected.location}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};
