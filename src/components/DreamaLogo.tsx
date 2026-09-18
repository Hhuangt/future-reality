import React from "react";

interface DreamaLogoProps {
  variant?: "full" | "mark" | "badge";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const DreamaLogo: React.FC<DreamaLogoProps> = ({
  variant = "full",
  size = "md",
  className = "",
}) => {
  const sizeMap = {
    sm: { icon: 36, text: "text-xs", sub: "text-[7px]", gap: "gap-2" },
    md: { icon: 54, text: "text-sm", sub: "text-[8px]", gap: "gap-3" },
    lg: { icon: 84, text: "text-lg", sub: "text-[9px]", gap: "gap-4" },
    xl: { icon: 120, text: "text-2xl", sub: "text-[11px]", gap: "gap-5" },
  };

  const currentSize = sizeMap[size];

  // SVG representation matching the official Dreama 3D Doorway portal logo
  const LogoMark = (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full drop-shadow-md select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Outer D Gradient */}
        <linearGradient id="dreamaOuterGrad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7928CA" />
          <stop offset="35%" stopColor="#A855F7" />
          <stop offset="70%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        {/* 3D Chamfer / Bevel Gradient */}
        <linearGradient id="dreamaBevelGrad" x1="40" y1="160" x2="160" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D946EF" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>

        {/* Doorway Interior Portal Gradient */}
        <linearGradient id="portalSky" x1="100" y1="40" x2="100" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5D0FE" />
          <stop offset="30%" stopColor="#E9D5FF" />
          <stop offset="60%" stopColor="#C084FC" />
          <stop offset="85%" stopColor="#7E22CE" />
          <stop offset="100%" stopColor="#3B0764" />
        </linearGradient>

        {/* Sunset Glow */}
        <radialGradient id="sunGlow" cx="100" cy="120" r="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#FDE047" stopOpacity="0.7" />
          <stop offset="80%" stopColor="#F43F5E" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7E22CE" stopOpacity="0" />
        </radialGradient>

        {/* Door Perspective Wall */}
        <linearGradient id="doorWall" x1="75" y1="50" x2="95" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#E879F9" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#9333EA" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Outer Letter D Body */}
      <path
        d="M36 24 H105 C148 24 176 52 176 100 C176 148 148 176 105 176 H36 Z"
        fill="url(#dreamaOuterGrad)"
      />

      {/* Inner Cutout with Doorway Clip Path */}
      <g>
        <clipPath id="innerDClip">
          <path d="M72 50 H102 C126 50 144 68 144 100 C144 132 126 150 102 150 H72 Z" />
        </clipPath>

        {/* Sky Background */}
        <rect
          x="70"
          y="45"
          width="80"
          height="110"
          fill="url(#portalSky)"
          clipPath="url(#innerDClip)"
        />

        {/* Sun/Sunset Horizon Glow */}
        <circle
          cx="106"
          cy="125"
          r="30"
          fill="url(#sunGlow)"
          clipPath="url(#innerDClip)"
        />

        {/* Distant Mountains */}
        <path
          d="M70 135 L90 120 L108 130 L130 112 L150 128 L150 155 L70 155 Z"
          fill="#4A044E"
          fillOpacity="0.8"
          clipPath="url(#innerDClip)"
        />

        {/* Foreground Mountains & Lake Reflection */}
        <path
          d="M70 142 L98 128 L118 138 L145 124 L150 130 L150 155 L70 155 Z"
          fill="#2E1065"
          clipPath="url(#innerDClip)"
        />
        <path
          d="M70 146 Q106 140 145 146 L145 152 L70 152 Z"
          fill="#581C87"
          fillOpacity="0.9"
          clipPath="url(#innerDClip)"
        />

        {/* Crescent Moon in Portal Sky */}
        <path
          d="M102 78 A8 8 0 1 0 114 68 A10 10 0 1 1 102 78 Z"
          fill="#FFFFFF"
          fillOpacity="0.95"
          clipPath="url(#innerDClip)"
        />

        {/* Dream Star */}
        <path
          d="M124 72 L125.5 75 L128.5 76.5 L125.5 78 L124 81 L122.5 78 L119.5 76.5 L122.5 75 Z"
          fill="#FFFFFF"
          fillOpacity="0.9"
          clipPath="url(#innerDClip)"
        />

        {/* Open Door Perspective Left Leaf */}
        <path
          d="M72 50 L94 62 V138 L72 150 Z"
          fill="url(#doorWall)"
        />
        {/* Door Inner Edge Highlight */}
        <path
          d="M94 62 L96 63 V137 L94 138 Z"
          fill="#FFFFFF"
          fillOpacity="0.95"
        />
      </g>

      {/* Bottom 3D Bevel Lip Highlight */}
      <path
        d="M36 176 L48 164 H105 C140 164 164 140 164 100 H176 C176 148 148 176 105 176 Z"
        fill="url(#dreamaBevelGrad)"
        fillOpacity="0.4"
      />
    </svg>
  );

  if (variant === "mark") {
    return (
      <div
        className={`inline-flex items-center justify-center ${className}`}
        style={{ width: currentSize.icon, height: currentSize.icon }}
      >
        {LogoMark}
      </div>
    );
  }

  if (variant === "badge") {
    return (
      <div
        className={`inline-flex items-center gap-3 bg-white/95 border border-brand-dark/20 p-2.5 sm:p-3 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] ${className}`}
      >
        <div style={{ width: currentSize.icon, height: currentSize.icon }} className="shrink-0">
          {LogoMark}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-display font-black tracking-[0.25em] text-brand-dark text-xs sm:text-sm">
            <span>D</span>
            <span>R</span>
            <span className="inline-flex flex-col justify-center gap-[2px] w-2.5">
              <span className="h-[1.5px] w-full bg-brand-dark rounded-xs" />
              <span className="h-[1.5px] w-full bg-brand-dark rounded-xs" />
              <span className="h-[1.5px] w-full bg-brand-dark rounded-xs" />
            </span>
            <span>Ʌ</span>
            <span>M</span>
            <span>Ʌ</span>
          </div>
          <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.2em] text-brand-accent font-bold">
            EXPLORE • UNDERSTAND • BECOME
          </span>
        </div>
      </div>
    );
  }

  // Full Logo Layout (with Icon, Stylized Wordmark, and Tagline)
  return (
    <div className={`flex flex-col items-center text-center ${currentSize.gap} ${className}`}>
      {/* 3D Portal Mark */}
      <div
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        style={{ width: currentSize.icon, height: currentSize.icon }}
      >
        {LogoMark}
      </div>

      {/* Stylized Wordmark: D R E Ʌ M Ʌ */}
      <div className="flex items-center justify-center gap-2 sm:gap-2.5 font-display font-black tracking-[0.3em] text-brand-dark">
        <span className={`${currentSize.text} leading-none`}>D</span>
        <span className={`${currentSize.text} leading-none`}>R</span>
        {/* Custom 3-bar stylized E */}
        <span className="inline-flex flex-col justify-center gap-[2px] w-3 sm:w-3.5">
          <span className="h-[2px] w-full bg-brand-dark rounded-xs" />
          <span className="h-[2px] w-full bg-brand-dark rounded-xs" />
          <span className="h-[2px] w-full bg-brand-dark rounded-xs" />
        </span>
        <span className={`${currentSize.text} leading-none`}>Ʌ</span>
        <span className={`${currentSize.text} leading-none`}>M</span>
        <span className={`${currentSize.text} leading-none`}>Ʌ</span>
      </div>

      {/* Tagline */}
      <div className="font-mono uppercase tracking-[0.28em] font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
        <span className={`${currentSize.sub} block`}>
          EXPLORE. UNDERSTAND. BECOME.
        </span>
      </div>
    </div>
  );
};
