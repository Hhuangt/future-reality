import { useState, useEffect } from "react";
import { installationsData } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { DreamaLogo } from "./DreamaLogo";

export default function DreamaInteractive() {
  const [activeId, setActiveId] = useState("theater");
  const [ambientVolume, setAmbientVolume] = useState(65);
  const [pulseRate, setPulseRate] = useState(4.2);
  const [selectedArchetype, setSelectedArchetype] = useState("falling");
  const [brainwave, setBrainwave] = useState("theta");
  const [scriptLine, setScriptLine] = useState("");

  const activeInstallation = installationsData.find((inst) => inst.id === activeId) || installationsData[0];

  const dreamPlaywright = [
    "[CAMERA DOLLIES DOWN] An empty concrete lobby filled with knee-deep water. Standard time signature slow-faded.",
    "[SOUND ENGINE INITIATES] Low cello vibrations at 40Hz register. Whispering voices speak in reverse.",
    "[ATMOSPHERICS ADJUSTED] White neon tubes flicker overhead. Shadows elongate toward the western doorway.",
    "[SCENE GENERATION COMPLETE] A single wooden chair floats across the screen, shedding light particles.",
    "[NARRATIVE DRIFT] The viewer walks up an elevator shaft that reveals an open sky of violet gas clouds.",
    "[NARRATION INTERRUPTED] Deep sleep protocols initiated. Sensory feedback returns to neutral."
  ];

  // Rotate simulated movie script lines
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeId === "theater") {
      let index = 0;
      setScriptLine(dreamPlaywright[0]);
      interval = setInterval(() => {
        index = (index + 1) % dreamPlaywright.length;
        setScriptLine(dreamPlaywright[index]);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [activeId]);

  return (
    <div className="w-full bg-black text-white p-6 md:p-12 border-t border-brand-dark" id="dreama-interactive-console">
      {/* Outer Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-neutral-800/80 pb-8">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="inline-block bg-brand-accent text-white px-3 py-1 font-sans text-[10px] font-bold tracking-widest uppercase">
              LIVE INSTALLATION METADATA
            </div>
            <div className="hidden sm:inline-flex items-center gap-2 bg-neutral-900 border border-neutral-700 px-3 py-1 text-white">
              <DreamaLogo size="sm" variant="mark" className="w-4 h-4" />
              <span className="font-mono text-[9px] uppercase font-bold tracking-wider text-cyan-400">
                POWERED BY DREAMA ENGINE
              </span>
            </div>
          </div>
          <h3 className="font-display text-4xl md:text-6xl font-bold tracking-tight uppercase leading-tight">
            NOT JUST WATCHING STORIES.<br />
            <span className="text-brand-accent">E</span>XPERIENCING IMAGINATION ITSELF.
          </h3>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="bg-white/95 text-brand-dark p-3 rounded-xs border border-white/20 shadow-md">
            <DreamaLogo size="sm" variant="full" />
          </div>
          <div className="hidden lg:block max-w-xs text-neutral-400 font-sans text-xs leading-relaxed text-right">
            Neuro-translation telemetry arrays active across the viewing room.
          </div>
        </div>
      </div>

      {/* Grid: Left selector, Right dynamic controller panels */}
      <div className="grid grid-cols-12 gap-8 border-t border-neutral-800 pt-8">
        
        {/* Left Column: 4 Installation Nodes */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4 flex flex-col divide-y divide-neutral-800 border-b md:border-b-0 border-neutral-800">
          {installationsData.map((inst) => {
            const isActive = inst.id === activeId;
            return (
              <button
                key={inst.id}
                onClick={() => setActiveId(inst.id)}
                className={`py-6 flex flex-col text-left transition-all duration-300 relative overflow-hidden group outline-hidden ${
                  isActive ? "text-white pl-4" : "text-neutral-500 hover:text-neutral-300"
                }`}
                id={`install-node-${inst.id}`}
              >
                {/* Highlight Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent" />
                )}
                
                <span className="font-mono text-xs text-neutral-400 mb-2">
                  NODE 0{inst.num}
                </span>
                <span className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight">
                  {inst.title}
                </span>
                <span className="font-sans text-xs text-neutral-400 mt-1 opacity-80 group-hover:opacity-100 italic">
                  {inst.tagline}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Console Preview Frame */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8 bg-[#121212] border border-neutral-800 p-6 md:p-8 flex flex-col justify-between min-h-[460px]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs bg-brand-accent text-white px-2 py-0.5 font-bold">
                    ACTIVE NODE 0{activeInstallation.num}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                  <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest">STREAMING METRICS</span>
                </div>
                <div className="font-mono text-xs text-neutral-400">
                  REF: {activeInstallation.id.toUpperCase()}_STAGE_V2
                </div>
              </div>

              {/* Desc block with Split Image */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <p className="font-serif text-lg leading-relaxed text-neutral-200">
                    {activeInstallation.description}
                  </p>
                  <p className="font-sans text-sm text-neutral-400 leading-relaxed italic">
                    {activeInstallation.narrative}
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full bg-neutral-950 border border-neutral-800 overflow-hidden relative group shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]">
                    <img
                      src={
                        activeInstallation.id === "theater"
                          ? "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80"
                          : activeInstallation.id === "room"
                          ? "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=800&q=80"
                          : activeInstallation.id === "archive"
                          ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                          : "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={activeInstallation.title}
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/90 px-2 py-0.5 font-mono text-[8px] text-neutral-500 uppercase tracking-widest border border-neutral-800 pointer-events-none">
                      LIVE_SURVEILLANCE_CAMERA_0{activeInstallation.num}
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Features Console based on Installation ID */}
              <div className="bg-black p-4 md:p-6 border border-neutral-800 space-y-4 font-mono text-xs text-neutral-300">
                <div className="flex justify-between items-center text-white border-b border-neutral-800 pb-2 mb-2">
                  <span>INSTALLATION CONTROLLER MATRIX</span>
                  <span className="material-symbols-outlined text-sm">settings_input_component</span>
                </div>

                {activeId === "theater" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <span>BIO-FEEDBACK RATE</span>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">LOW</span>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={ambientVolume}
                          onChange={(e) => setAmbientVolume(Number(e.target.value))}
                          className="w-32 bg-neutral-800 accent-brand-accent h-1 cursor-pointer"
                        />
                        <span className="text-white">{ambientVolume}%</span>
                      </div>
                    </div>
                     <div className="border-t border-neutral-800 pt-3 space-y-2">
                      <div className="text-neutral-500 uppercase text-[10px] tracking-widest">LIVE SCRIPT SYNTHESIS FEED</div>
                      <div className="bg-neutral-900 p-3 text-white border-l-2 border-brand-accent min-h-[48px] flex items-center font-mono italic text-xs leading-relaxed">
                        {scriptLine}
                      </div>
                    </div>
                  </div>
                )}

                {activeId === "room" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <span>TRANSDUCER FREQUENCY</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="1.0"
                          max="15.0"
                          step="0.5"
                          value={pulseRate}
                          onChange={(e) => setPulseRate(Number(e.target.value))}
                          className="w-32 bg-neutral-800 accent-brand-accent h-1 cursor-pointer"
                        />
                        <span className="text-white w-12 text-right">{pulseRate.toFixed(1)} Hz</span>
                      </div>
                    </div>
                    <div className="border-t border-neutral-800 pt-3 flex flex-col gap-2">
                      <div className="text-neutral-500 uppercase text-[10px] tracking-widest">HAPTIC SIMULATION PATTERN</div>
                      <div className="flex items-center gap-1.5 h-6">
                        {Array.from({ length: 16 }).map((_, i) => {
                          const height = Math.abs(Math.sin((i / 2) + (pulseRate / 3))) * 22;
                          return (
                            <div
                              key={i}
                              style={{ height: `${Math.max(2, height)}px` }}
                              className="flex-1 bg-brand-accent transition-all duration-150"
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeId === "archive" && (
                  <div className="space-y-3">
                    <div className="text-neutral-500 uppercase text-[10px] tracking-widest">BROWSE ARCHIVE ARCHETYPES</div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        { key: "falling", label: "03-A Falling Void", quote: "Continuous descent with no velocity limits." },
                        { key: "flight", label: "03-B Celestial Drift", quote: "Low-gravity suspension under cloud systems." },
                        { key: "water", label: "03-C Submerged City", quote: "Noiseless aqueducts beneath dark oil currents." },
                        { key: "speech", label: "03-D Symbol-loss", quote: "Alphabet blocks decomposing in a desert yard." }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setSelectedArchetype(item.key)}
                          className={`px-3 py-1.5 border text-[10px] uppercase font-bold transition-all cursor-pointer ${
                            selectedArchetype === item.key
                              ? "bg-brand-accent text-white border-brand-accent"
                              : "border-neutral-800 hover:border-brand-accent hover:text-white text-neutral-400"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <div className="bg-neutral-900 p-3 italic text-xs border border-neutral-800 text-neutral-400">
                      {selectedArchetype === "falling" && "RETRIEVED: 'A sensation of losing solid horizons, accelerating into cold layers of carbon, until gravity folds back.'"}
                      {selectedArchetype === "flight" && "RETRIEVED: 'Tornado-shaped white stairs built of silk. Entering a room where static pressure equals floating density.'"}
                      {selectedArchetype === "water" && "RETRIEVED: 'A sunken library lined with copper plates. Silent water currents sliding papers across algae beds.'"}
                      {selectedArchetype === "speech" && "RETRIEVED: 'Trying to vocalize a prompt, but consonants turn into flat shapes that slide down your sleeve.'"}
                    </div>
                  </div>
                )}

                {activeId === "sleeplab" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>EEG BRAINWAVE TARGET</span>
                      <select
                        value={brainwave}
                        onChange={(e) => setBrainwave(e.target.value)}
                        className="bg-neutral-950 text-white border border-neutral-800 px-2 py-1 text-xs outline-hidden"
                      >
                        <option value="alpha">Alpha Waves (Optimal relaxation)</option>
                        <option value="theta">Theta Waves (Hypnagogic dreaming)</option>
                        <option value="delta">Delta Waves (Deep recovery state)</option>
                      </select>
                    </div>
                    <div className="border-t border-neutral-800 pt-3 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-neutral-500 uppercase text-[9px] tracking-widest">HUMIDITY SYNCHRONIZER</div>
                        <div className="text-white text-sm font-bold mt-1">
                          {brainwave === "alpha" ? "42.5%" : brainwave === "theta" ? "55.0%" : "68.2%"}
                        </div>
                      </div>
                      <div>
                        <div className="text-neutral-500 uppercase text-[9px] tracking-widest text-right">ACOUSTIC FREQ</div>
                        <div className="text-white text-sm font-bold mt-1 text-right">
                          {brainwave === "alpha" ? "12 Hz" : brainwave === "theta" ? "6 Hz" : "2 Hz"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Floor specification metrics footer */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono text-[11px] text-neutral-400 border-t border-neutral-800 pt-4">
                <div>
                  <span className="block text-neutral-600 font-sans text-[9px] uppercase tracking-widest">TIMED SPACE ACCESS</span>
                  <span className="text-white">{activeInstallation.duration}</span>
                </div>
                <div>
                  <span className="block text-neutral-600 font-sans text-[9px] uppercase tracking-widest">CHAMBER FOOTPRINT</span>
                  <span className="text-white">{activeInstallation.spaceRequired}</span>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <span className="block text-neutral-600 font-sans text-[9px] uppercase tracking-widest">PRIMARY SPECTRA</span>
                  <span className="text-white text-xs block truncate" title={activeInstallation.technicalSpecs.join(', ')}>
                    {activeInstallation.technicalSpecs[0]}
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
