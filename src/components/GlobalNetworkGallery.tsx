import React, { useState } from "react";
import { GlobalNetworkItem } from "../types";
import { globalNetworkData } from "../data";
import { HxrLogo } from "./CollaboratorLogos";

interface NetworkSectionConfig {
  number: string;
  title: string;
  description: string;
  itemIds: string[];
}

export const GlobalNetworkGallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GlobalNetworkItem | null>(null);

  // The 3 defined Future Reality network sections:
  const networkSections: NetworkSectionConfig[] = [
    {
      number: "01",
      title: "FILM & MEDIA",
      description: "New York film culture, premieres, screenings, festivals, red carpets, and the people shaping contemporary cinema.",
      itemIds: ["soho_16th_edition_premiere", "soho_gala_step_repeat"]
    },
    {
      number: "02",
      title: "AI & CREATIVE TECHNOLOGY",
      description: "AI, XR, spatial computing, and emerging technologies shaping the future of storytelling, creativity, and human experience.",
      itemIds: ["harvard_xr_keynote", "harvard_xr_inaugural"]
    },
    {
      number: "03",
      title: "CREATOR COMMUNITIES",
      description: "Filmmakers, artists, researchers, founders, technologists, and creative communities connecting across New York, Harvard, and beyond.",
      itemIds: ["creator_network_nyc_cambridge", "hxr_2026_conference"]
    }
  ];

  // Helper to retrieve exact item data by ID
  const getItemById = (id: string): GlobalNetworkItem | undefined => {
    return globalNetworkData.find((item) => item.id === id);
  };

  return (
    <div className="space-y-16 lg:space-y-20 font-sans text-brand-dark" id="global-network-gallery">
      {/* 1. Global Network Editorial Intro */}
      <div className="space-y-4 max-w-4xl border-b border-brand-dark/20 pb-8 sm:pb-10">
        <div className="flex items-center gap-2 text-brand-accent">
          <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest font-black">
            GLOBAL NETWORK // FESTIVAL ALLIANCE
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-brand-dark leading-[1.08]">
          ROOTED IN NEW YORK. CONNECTED TO THE WORLD.
        </h2>
        <p className="font-serif text-base sm:text-lg lg:text-xl text-neutral-700 leading-relaxed italic pt-1">
          Future Reality connects film, AI, universities, and creator communities across a growing global network.
        </p>
      </div>

      {/* 2. The Three Sequential Thematic Sections */}
      <div className="space-y-16 lg:space-y-20">
        {networkSections.map((section) => {
          const items = section.itemIds
            .map(getItemById)
            .filter((item): item is GlobalNetworkItem => item !== undefined);

          return (
            <section
              key={section.number}
              className="space-y-8"
              id={`network-category-${section.number}`}
            >
              {/* Category Header */}
              <div className="border-b border-brand-dark pb-3.5 flex items-baseline justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm sm:text-base font-black text-brand-accent">
                    {section.number}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-brand-dark">
                    {section.title}
                  </h3>
                </div>
              </div>

              {/* Category Two-Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group bg-brand-dark border-2 border-brand-dark rounded-xs shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(230,57,70,1)] transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    {/* Visual Aspect Ratio Image Container */}
                    <div className="relative aspect-[16/10] w-full bg-[#0A0A0A] overflow-hidden select-none">
                      {/* Visual Case 1: Creator Network Cohort */}
                      {item.visualType === "creator_cohort" && item.imageUrl && (
                        <div className="w-full h-full relative overflow-hidden group/cohort bg-[#0A0A0C]">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover object-center group-hover/cohort:scale-105 transition-transform duration-700"
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />

                          <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
                            <span className="bg-[#E63946] text-white font-mono text-[8px] sm:text-[9px] px-2.5 py-0.5 font-black uppercase tracking-widest shadow-xs">
                              CREATOR NETWORK
                            </span>
                            <div className="flex items-center gap-1.5 bg-black/80 border border-white/10 px-2 py-0.5 font-mono text-[8px] text-zinc-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#E63946] animate-pulse" />
                              <span className="uppercase font-bold tracking-wider">NYC × CAMBRIDGE</span>
                            </div>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 z-10 bg-black/80 backdrop-blur-xs border border-white/15 p-2 rounded-xs flex justify-between items-center">
                            <div className="font-display text-xs font-black text-white uppercase tracking-wider">CREATOR ALLIANCES</div>
                            <span className="font-mono text-[8px] text-white/80 font-bold bg-neutral-800 px-1.5 py-0.5 border border-white/10">
                              ALLIANCE
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Visual Case 2: SOHO 16th Edition: Cinema Premiere & Keynote */}
                      {item.visualType === "theater_keynote" && item.imageUrl && (
                        <div className="w-full h-full relative overflow-hidden group/theater bg-[#0A0A0C]">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover object-center group-hover/theater:scale-105 transition-transform duration-700"
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                            referrerPolicy="no-referrer"
                          />
                          
                          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center pointer-events-none">
                            <span className="font-mono text-[9px] text-fuchsia-300 uppercase tracking-widest font-black bg-black/75 px-2 py-0.5 border border-fuchsia-800/80 backdrop-blur-xs">
                              SOHO 16TH EDITION
                            </span>
                            <span className="font-mono text-[9px] text-zinc-300 font-bold bg-black/75 px-2 py-0.5 border border-white/20 backdrop-blur-xs">
                              #SOHO16 #SIFFNYC
                            </span>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between font-mono text-[9px] bg-black/80 border border-white/20 px-2.5 py-1.5 backdrop-blur-xs pointer-events-none">
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-[#E63946] animate-pulse" />
                              <span className="font-bold text-white uppercase tracking-wider">MAINSTAGE SCREENING &amp; EXECUTIVE PANEL</span>
                            </div>
                            <span className="text-zinc-400 font-medium hidden sm:inline-block">MANHATTAN PREMIERE</span>
                          </div>
                        </div>
                      )}

                      {/* Visual Case 3: Harvard XR Summit: The Evolution from PC to Spatial Computing */}
                      {item.visualType === "auditorium_lecture" && item.imageUrl && (
                        <div className="w-full h-full relative overflow-hidden group/lecture bg-[#0C0E12]">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover object-center group-hover/lecture:scale-105 transition-all duration-700"
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                            referrerPolicy="no-referrer"
                          />
                          
                          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center">
                            <span className="font-mono text-[9px] text-cyan-300 uppercase tracking-widest font-black bg-black/70 px-2 py-0.5 border border-cyan-800 backdrop-blur-xs">
                              HXR SUMMIT
                            </span>
                            <span className="font-mono text-[8px] text-cyan-200 bg-cyan-950/90 border border-cyan-500/60 px-2 py-0.5 font-bold shadow-xs">
                              MAIN AMPHITHEATER
                            </span>
                          </div>

                          {/* Evolution Timeline Banner */}
                          <div className="absolute bottom-3 left-3 right-3 z-10 bg-black/85 backdrop-blur-xs border border-cyan-500/50 p-2 rounded-xs space-y-1.5 shadow-md">
                            <div className="flex items-center justify-between font-mono text-[8px] sm:text-[9px] text-cyan-300 font-bold">
                              <div className="text-center">
                                <span className="block text-white font-black">PC</span>
                                <span className="text-[7px] text-zinc-400">1970s</span>
                              </div>
                              <span className="text-cyan-500/70">→</span>
                              <div className="text-center">
                                <span className="block text-white font-black">WEB</span>
                                <span className="text-[7px] text-zinc-400">1990s</span>
                              </div>
                              <span className="text-cyan-500/70">→</span>
                              <div className="text-center">
                                <span className="block text-white font-black">MOBILE</span>
                                <span className="text-[7px] text-zinc-400">2007</span>
                              </div>
                              <span className="text-cyan-500/70">→</span>
                              <div className="text-center">
                                <span className="block text-white font-black">VR</span>
                                <span className="text-[7px] text-zinc-400">2016+</span>
                              </div>
                              <span className="text-cyan-500/70">→</span>
                              <div className="text-center">
                                <span className="block text-pink-400 font-black">XR+</span>
                                <span className="text-[7px] text-pink-300">2024+</span>
                              </div>
                            </div>
                            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-pink-500 rounded-full" />
                          </div>
                        </div>
                      )}

                      {/* Visual Case 4: HXR Conference 2026: XR+ From Pixel to Voxel */}
                      {item.visualType === "hxr_team_2026" && item.imageUrl && (
                        <div className="w-full h-full relative overflow-hidden group/hxr">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover brightness-85 group-hover/hxr:brightness-100 group-hover/hxr:scale-105 transition-all duration-700"
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-pink-950/30 to-black/60" />
                          
                          <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
                            <HxrLogo size="sm" variant="color" className="h-5 drop-shadow-md" />
                            <span className="font-mono text-[8px] text-pink-300 bg-black/60 px-2 py-0.5 border border-pink-500/40 font-bold">
                              April 11, 2026
                            </span>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 z-10 bg-black/80 backdrop-blur-xs border border-pink-500/40 p-2 rounded-xs flex justify-between items-center">
                            <div className="font-display text-xs font-black text-white uppercase tracking-wider">HXR SHOWCASE 2026</div>
                            <span className="font-mono text-[8px] text-zinc-300 bg-pink-950/60 px-1.5 py-0.5 border border-pink-800">
                              CAMBRIDGE
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Visual Case 5: SOHO International Film Festival Broome Street Series */}
                      {item.visualType === "step_and_repeat" && item.imageUrl && (
                        <div className="w-full h-full relative overflow-hidden group/gala bg-black">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover/gala:scale-105 transition-all duration-700"
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover/gala:bg-transparent transition-colors pointer-events-none" />
                          
                          <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
                            <span className="bg-brand-accent text-white font-mono text-[8px] px-2 py-0.5 font-bold uppercase tracking-wider shadow-xs">
                              OFFICIAL SELECTION
                            </span>
                            <span className="font-mono text-[8px] text-zinc-200 bg-black/80 px-2 py-0.5 border border-white/20">
                              SHORTS PROGRAM G
                            </span>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 z-10 bg-black/85 backdrop-blur-xs border border-white/20 p-2 rounded-xs flex justify-between items-center">
                            <div className="font-serif text-xs text-white italic font-bold">Broome Street Series</div>
                            <span className="font-mono text-[8px] text-zinc-300 uppercase font-bold">SOHO NYC</span>
                          </div>
                        </div>
                      )}

                      {/* Visual Case 6: HXR 2026 Conference at Graduate School of Design */}
                      {item.visualType === "harvard_inaugural" && item.imageUrl && (
                        <div className="w-full h-full relative overflow-hidden group/inaugural">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover brightness-85 group-hover/inaugural:brightness-100 group-hover/inaugural:scale-105 transition-all duration-700"
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-blue-950/30 to-black/60" />
                          
                          <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
                            <span className="font-mono text-[9px] text-blue-300 font-black uppercase tracking-widest bg-black/60 px-2 py-0.5 border border-blue-500/40">
                              HARVARD XR
                            </span>
                            <span className="bg-blue-600 text-white text-[8px] font-mono px-2 py-0.5 uppercase font-bold tracking-wider">
                              2026 CONFERENCE
                            </span>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 z-10 bg-black/80 backdrop-blur-xs border border-blue-500/40 p-2 rounded-xs flex justify-between items-center">
                            <div className="font-display text-xs font-black text-white uppercase tracking-wider">HXR 2026 CONFERENCE</div>
                            <span className="font-mono text-[8px] text-blue-300 font-bold bg-blue-950/80 px-1.5 py-0.5 border border-blue-800">HARVARD GSD</span>
                          </div>
                        </div>
                      )}

                      {/* Hover Inspect Indicator */}
                      <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-30">
                        <span className="bg-brand-accent text-white font-mono text-xs uppercase px-3.5 py-2 font-bold tracking-widest border border-white flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                          INSPECT EVENT
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Interactive Lightbox / Modal for Inspection */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white border-2 border-brand-dark max-w-2xl w-full p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(230,57,70,1)] relative max-h-[90vh] overflow-y-auto space-y-6 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 bg-neutral-100 hover:bg-brand-accent hover:text-white border border-brand-dark transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>

            {/* Modal Image Showcase */}
            {selectedItem.visualType === "jury_announcement" ? (
              <div className="relative aspect-[16/9] w-full rounded-xs overflow-hidden border border-brand-dark bg-[#0D0D0D] p-6 sm:p-8 flex flex-col justify-between text-[#F2F1ED] shadow-inner select-none">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 opacity-20 pointer-events-none">
                  <div className="border-r border-b border-zinc-700/60 p-2"><span className="font-mono text-[8px] text-zinc-600">SLOT_01</span></div>
                  <div className="border-r border-b border-zinc-700/60 p-2"><span className="font-mono text-[8px] text-zinc-600">SLOT_02</span></div>
                  <div className="border-b border-zinc-700/60 p-2"><span className="font-mono text-[8px] text-zinc-600">SLOT_03</span></div>
                  <div className="border-r border-zinc-700/60 p-2"><span className="font-mono text-[8px] text-zinc-600">SLOT_04</span></div>
                  <div className="border-r border-zinc-700/60 p-2"><span className="font-mono text-[8px] text-zinc-600">SLOT_05</span></div>
                  <div className="p-2"><span className="font-mono text-[8px] text-zinc-600">SLOT_06</span></div>
                </div>

                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="bg-[#E63946] text-white font-mono text-[10px] px-3 py-1 font-black uppercase tracking-widest">
                    FUTURE REALITY JURY
                  </span>
                  <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-400">
                    <span className="h-2 w-2 rounded-full bg-[#E63946] animate-pulse" />
                    <span>CURATORIAL COUNCIL</span>
                  </div>
                </div>

                <div className="relative z-10 text-center space-y-2 py-4 my-auto">
                  <div className="font-mono text-xs font-black uppercase tracking-[0.3em] text-[#E63946]">
                    [ JURY ANNOUNCEMENT ]
                  </div>
                  <h3 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
                    COMING SOON
                  </h3>
                  <p className="font-serif text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed italic pt-1">
                    More jury members and special guests will be announced soon.
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-zinc-400 border-t border-white/10 pt-2">
                  <span>DISCIPLINARY CO-CHAIRS & GUEST JURORS</span>
                  <span className="text-white font-bold">2026 EDITION</span>
                </div>
              </div>
            ) : selectedItem.imageUrl ? (
              <div className="relative aspect-[16/9] w-full rounded-xs overflow-hidden border border-brand-dark/30 bg-black">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-mono text-[10px]">
                  <span className="bg-black/60 px-2 py-1 border border-white/20 backdrop-blur-xs">
                    {selectedItem.badge}
                  </span>
                  <span className="bg-black/60 px-2 py-1 border border-white/20 backdrop-blur-xs">
                    {selectedItem.location}
                  </span>
                </div>
              </div>
            ) : null}

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-brand-accent font-black">
                  {selectedItem.badge} • {selectedItem.year}
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-brand-dark tracking-tight">
                {selectedItem.title}
              </h2>
              <p className="font-serif text-base text-neutral-700 italic border-l-2 border-brand-dark/20 pl-3">
                {selectedItem.subtitle}
              </p>
            </div>

            {/* Description & Context */}
            <div className="space-y-3 bg-neutral-50 p-4 border border-brand-dark/20 rounded-xs">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                DOCUMENTATION & CONTEXT
              </span>
              <p className="font-sans text-sm text-brand-dark leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

            {/* Key Highlights */}
            <div className="space-y-2.5">
              <span className="font-mono text-xs font-bold text-brand-dark uppercase tracking-wider block">
                ARCHIVE HIGHLIGHTS & PARTICIPANTS
              </span>
              <div className="grid grid-cols-1 gap-2">
                {selectedItem.highlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="flex items-start gap-2 text-xs font-mono text-neutral-800 bg-white p-2 border border-brand-dark/15"
                  >
                    <span className="material-symbols-outlined text-sm text-brand-accent shrink-0">check_circle</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Host Footer Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-brand-dark/20 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-zinc-500 uppercase text-[10px] block">OFFICIAL LOCATION</span>
                <span className="font-bold text-brand-dark">{selectedItem.location}</span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-brand-dark text-white hover:bg-brand-accent px-5 py-2 uppercase tracking-wider font-bold transition-colors cursor-pointer text-center"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
