import TechFieldDecor from "./TechFieldDecor";
import CodeReadout from "./CodeReadout";

/** Fixed ambience: HUD flanks, scanlines, grid, faint code — sits behind all pages. */
export default function BackgroundTechLayer() {
  return (
    <div className="background-tech-layer" aria-hidden="true">
      <div className="background-tech-layer__grid" />
      <div className="background-tech-layer__scanlines scanlines" />
      <div className="background-tech-layer__glyphs">
        <CodeReadout variant="ambient" />
      </div>
      <TechFieldDecor intensity={0.82} />
    </div>
  );
}
