import TechFieldDecor from "./TechFieldDecor";
import CodeReadout from "./CodeReadout";

/** NYC backdrop + HUD/code flanks — fixed while scrolling the homepage. */
export default function HomeAtmosphere() {
  return (
    <>
      <div className="home-city-flow__backdrop" aria-hidden="true" />
      <div className="home-city-flow__tech" aria-hidden="true">
        <div className="background-tech-layer__grid" />
        <div className="background-tech-layer__scanlines scanlines" />
        <div className="background-tech-layer__glyphs">
          <CodeReadout variant="ambient" />
        </div>
        <TechFieldDecor intensity={0.88} />
      </div>
    </>
  );
}
