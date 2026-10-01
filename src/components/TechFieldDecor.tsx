import CodeReadout from "./CodeReadout";

type TechFieldDecorProps = {
  className?: string;
  /** 0–1 visual strength */
  intensity?: number;
};

const stroke = "#d4874f";
const strokeBright = "#ff633e";

function SidePanel({ mirror = false, intensity }: { mirror?: boolean; intensity: number }) {
  const gOpacity = 0.35 + intensity * 0.45;
  return (
    <svg
      className={`tech-field-panel ${mirror ? "tech-field-panel--right" : "tech-field-panel--left"}`}
      viewBox="0 0 140 720"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g opacity={gOpacity} transform={mirror ? "scale(-1,1) translate(-140,0)" : undefined}>
        {/* Full rings anchored on the outer flank (not meeting in the page center). */}
        <circle cx="34" cy="360" r="62" fill="none" stroke={stroke} strokeOpacity="0.24" strokeWidth="0.75" />
        <circle cx="34" cy="360" r="44" fill="none" stroke={strokeBright} strokeOpacity="0.2" strokeWidth="0.65" />
        <circle cx="34" cy="360" r="26" fill="none" stroke={stroke} strokeOpacity="0.12" strokeWidth="0.5" />
        <circle cx="22" cy="520" r="18" fill="none" stroke={strokeBright} strokeOpacity="0.16" strokeWidth="0.55" />
        {[18, 32, 46, 62, 78, 94, 108].map((x, i) => (
          <line
            key={x}
            x1={x}
            y1={40 + (i % 3) * 18}
            x2={x}
            y2={680 - (i % 4) * 22}
            stroke={stroke}
            strokeOpacity={0.08 + (i % 5) * 0.04}
            strokeWidth={i % 3 === 0 ? 1.2 : 0.6}
          />
        ))}
        {[120, 210, 320, 430, 540, 620].map((y, i) => (
          <rect
            key={y}
            x={12 + (i % 2) * 8}
            y={y}
            width={10 + (i % 3) * 6}
            height={28 + (i % 4) * 14}
            fill={strokeBright}
            fillOpacity={0.06 + (i % 3) * 0.03}
          />
        ))}
        {[88, 160, 280, 390, 510].map((y, i) => (
          <g key={y} opacity={0.45 + (i % 2) * 0.2}>
            <line x1={24} y1={y} x2={36} y2={y} stroke={strokeBright} strokeOpacity="0.5" strokeWidth="0.75" />
            <line x1={30} y1={y - 6} x2={30} y2={y + 6} stroke={strokeBright} strokeOpacity="0.5" strokeWidth="0.75" />
          </g>
        ))}
        {[95, 255, 415, 575].map((y, i) => (
          <g key={`dots-${y}`}>
            {[0, 1, 2, 3].map((d) => (
              <circle
                key={d}
                cx={100 - (i % 2) * 12}
                cy={y + d * 10}
                r="1.1"
                fill={strokeBright}
                fillOpacity={0.35 - d * 0.06}
                className="tech-field-dot"
                style={{ animationDelay: `${i * 0.35 + d * 0.12}s` }}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function TechFieldDecor({ className = "", intensity = 0.85 }: TechFieldDecorProps) {
  return (
    <div className={`tech-field ${className}`} aria-hidden="true">
      <div className="tech-field-beams" />
      <div className="tech-field-columns" />
      <SidePanel intensity={intensity} />
      <SidePanel mirror intensity={intensity} />
      <CodeReadout />
    </div>
  );
}
