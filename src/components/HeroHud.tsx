import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { competitionCategories } from "../data";
import { grandJury, preliminaryJury } from "../juryData";

const FPS = 24;

function useTimecode() {
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const start = performance.now();
    const id = window.setInterval(() => setElapsed(performance.now() - start), 1000 / FPS);
    return () => window.clearInterval(id);
  }, [reduced]);

  const totalFrames = Math.floor((elapsed / 1000) * FPS);
  const frames = totalFrames % FPS;
  const seconds = Math.floor(totalFrames / FPS) % 60;
  const minutes = Math.floor(totalFrames / (FPS * 60)) % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `00:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

const programme = ["Generative Cinema", "Immersive Worlds", "Conversations", "Awards Night"];

export default function HeroHud() {
  const timecode = useTimecode();
  const stats = [
    { value: String(competitionCategories.length).padStart(2, "0"), label: "Awards" },
    { value: String(grandJury.length + preliminaryJury.length), label: "Jurors" },
    { value: "01", label: "Night in NYC" },
  ];

  return (
    <div className="hero-hud" aria-hidden="true">
      <div className="hero-hud__side hero-hud__side--left">
        <div className="hero-hud__rec">
          <i />
          <span>REC</span>
          <span className="hero-hud__tc">{timecode}</span>
        </div>
        <p className="hero-hud__meta">24 FPS · 4K · DCI-P3</p>
        <span className="hero-hud__rule" />
        <ol className="hero-hud__list">
          {programme.map((item, i) => (
            <li key={item}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
        <span className="hero-hud__rule" />
        <p className="hero-hud__meta">40.7310° N · 73.9857° W</p>
      </div>

      <div className="hero-hud__side hero-hud__side--right">
        {stats.map((stat) => (
          <div key={stat.label} className="hero-hud__stat">
            <span className="hero-hud__stat-value">{stat.value}</span>
            <span className="hero-hud__stat-label">{stat.label}</span>
          </div>
        ))}
        <span className="hero-hud__rule" />
        <p className="hero-hud__meta">Human-directed · AI-shaped</p>
      </div>
    </div>
  );
}
