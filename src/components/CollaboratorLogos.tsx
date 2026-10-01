import React from "react";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark" | "color" | "monochrome";
  size?: "sm" | "md" | "lg" | "xl";
}

const logoSizeClasses = {
  soho: {
    sm: "h-12 sm:h-14 md:h-16",
    md: "h-16 sm:h-20 md:h-24",
    lg: "h-24 sm:h-28 md:h-32",
    xl: "h-32 sm:h-36 md:h-44",
  },
  hxr: {
    sm: "h-9 sm:h-11 md:h-12",
    md: "h-12 sm:h-14 md:h-16",
    lg: "h-16 sm:h-20 md:h-24",
    xl: "h-20 sm:h-24 md:h-28",
  },
  deovr: {
    sm: "h-8 sm:h-9",
    md: "h-10 sm:h-11",
    lg: "h-14 sm:h-16",
    xl: "h-16 sm:h-20",
  },
} as const;

const DEOVR_URL = "https://deovr.com";

function partnerLogoTone(variant: NonNullable<LogoProps["variant"]>) {
  if (variant === "light") return "invert brightness-0";
  if (variant === "monochrome") return "brightness-0 invert opacity-90";
  return "";
}

/** Official SOHO International Film Festival wordmark (PNG from brand assets). */
export const SohoLogo: React.FC<LogoProps> = ({ className = "", variant = "dark", size = "md" }) => {
  const sizeClass = logoSizeClasses.soho[size];
  const tone = partnerLogoTone(variant as NonNullable<LogoProps["variant"]>);

  return (
    <img
      src="/logos/soho.png"
      alt="SOHO International Film Festival"
      width={2300}
      height={964}
      className={`block w-auto max-w-full object-contain object-left transition-transform duration-300 hover:scale-[1.02] ${sizeClass} ${tone} ${className}`}
    />
  );
};

/** Official HXR wordmark (PNG from brand assets). */
export const HxrLogo: React.FC<LogoProps> = ({ className = "", variant = "dark", size = "md" }) => {
  const sizeClass = logoSizeClasses.hxr[size];
  const tone = partnerLogoTone(variant as NonNullable<LogoProps["variant"]>);

  return (
    <img
      src="/logos/hxr.png"
      alt="Harvard XR"
      width={1320}
      height={832}
      className={`block w-auto max-w-full object-contain object-left transition-transform duration-300 hover:scale-[1.02] ${sizeClass} ${tone} ${className}`}
    />
  );
};

/** DeoVR — immersive partner wordmark. */
export const DeoVrLogo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeClass = logoSizeClasses.deovr[size];

  return (
    <a
      href={DEOVR_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-block transition-transform duration-300 hover:scale-[1.02] ${className}`}
      aria-label="DeoVR"
    >
      <img
        src="/logos/deovr.jpg"
        alt="DeoVR"
        width={1024}
        height={352}
        className={`block w-auto max-w-full object-contain object-left ${sizeClass}`}
      />
    </a>
  );
};

/**
 * DREAMA Logo
 * Faithful rendering of the 3D Portal 'D' with glowing dusk dreamscape & modern typography
 */
export const DreamaLogo: React.FC<LogoProps> = ({
  className = "",
  variant = "color",
  size = "md"
}) => {
  const sizeClasses = {
    sm: "h-12 w-auto",
    md: "h-20 w-auto",
    lg: "h-28 w-auto",
    xl: "h-36 w-auto"
  }[size];

  const isDark = variant === "dark";
  const titleColor = isDark ? "#FFFFFF" : "#0F172A";

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 340 330"
        className={`${sizeClasses} max-w-full drop-shadow-md transition-transform duration-300 hover:scale-[1.02]`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="DREAMA Logo"
      >
        <defs>
          {/* Main D exterior gradient */}
          <linearGradient id="dreamaDOuter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="30%" stopColor="#9333EA" />
            <stop offset="70%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          {/* Portal inner shadow and 3D depth */}
          <linearGradient id="dreamaInnerBevel" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#581C87" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.2" />
          </linearGradient>

          {/* Dreamscape sky gradient */}
          <linearGradient id="dreamaSky" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FDF2F8" />
            <stop offset="40%" stopColor="#E9D5FF" />
            <stop offset="70%" stopColor="#C4B5FD" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>

          {/* Mountain silhouettes */}
          <linearGradient id="dreamaMountains" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>

          {/* Tagline gradient */}
          <linearGradient id="dreamaTagline" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          {/* Clip path for the interior portal room */}
          <clipPath id="dreamaPortalClip">
            <path d="M 125 45 H 175 C 235 45 270 75 270 115 C 270 155 235 185 175 185 H 125 Z" />
          </clipPath>
        </defs>

        {/* Main D Geometric Body */}
        <path
          d="M 80 20 H 190 C 270 20 310 65 310 115 C 310 165 270 210 190 210 H 80 Z"
          fill="url(#dreamaDOuter)"
        />

        {/* 3D Depth Inner Bevel Corner */}
        <path
          d="M 80 20 L 125 45 V 185 L 80 210 Z"
          fill="#A855F7"
          opacity="0.85"
        />

        {/* Portal Interior Sky & World */}
        <g clipPath="url(#dreamaPortalClip)">
          {/* Sky background */}
          <rect x="110" y="30" width="180" height="170" fill="url(#dreamaSky)" />

          {/* Soft clouds & dawn glow */}
          <circle cx="180" cy="115" r="45" fill="#FFFFFF" opacity="0.6" />
          <circle cx="210" cy="120" r="35" fill="#FCE7F3" opacity="0.7" />

          {/* Crescent Moon & Star */}
          <path
            d="M 195 72 C 190 77 185 79 178 78 C 173 77 169 74 167 70 C 173 76 182 77 190 74 C 193 73 195 72 195 72 Z"
            fill="#818CF8"
          />
          {/* Star twinkle */}
          <polygon
            points="205,65 207,69 211,70 207,71 205,75 203,71 199,70 203,69"
            fill="#818CF8"
          />

          {/* Distant mountains */}
          <polygon
            points="120,170 160,135 190,155 220,130 260,165 280,190 120,190"
            fill="url(#dreamaMountains)"
            opacity="0.8"
          />

          {/* Closer mountains with depth */}
          <polygon
            points="125,185 155,150 185,175 215,145 250,185 275,195 125,195"
            fill="#312E81"
          />

          {/* Reflective calm water surface at base of portal */}
          <path
            d="M 125 170 C 160 168 220 168 270 170 L 270 185 H 125 Z"
            fill="#4338CA"
            opacity="0.9"
          />
          <line x1="140" y1="178" x2="250" y2="178" stroke="#E0E7FF" strokeWidth="1" opacity="0.5" />
        </g>

        {/* 3D Portal Door Jamb on Left */}
        <polygon
          points="125,45 138,55 138,175 125,185"
          fill="#581C87"
          opacity="0.5"
        />

        {/* D R E A M A text */}
        <text
          x="170"
          y="265"
          textAnchor="middle"
          fill={titleColor}
          fontSize="30"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="900"
          letterSpacing="18"
        >
          D R E A M A
        </text>

        {/* EXPLORE. UNDERSTAND. BECOME. */}
        <text
          x="170"
          y="295"
          textAnchor="middle"
          fill="url(#dreamaTagline)"
          fontSize="11"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="700"
          letterSpacing="4"
        >
          EXPLORE. UNDERSTAND. BECOME.
        </text>
      </svg>
    </div>
  );
};

export interface CollaboratorInfo {
  id: string;
  name: string;
  role: string;
  description: string;
  component: React.ReactNode;
  badge: string;
}

export const collaboratorsList: CollaboratorInfo[] = [
  {
    id: "soho_fest",
    name: "SOHO INTERNATIONAL FILM FESTIVAL",
    role: "Official Festival & Curatorial Partner",
    description: "Leading the global platform for contemporary independent cinema and cross-disciplinary film arts in New York City.",
    component: <SohoLogo size="lg" variant="dark" />,
    badge: "FOUNDING PARTNER"
  },
  {
    id: "hxr",
    name: "HARVARD GSD XR CONFERENCE (HXR)",
    role: "XR+: From Pixel to Voxel Partner",
    description: "Focusing on human-centered XR applications and empowering the next generation of XR change-makers across evolving industries.",
    component: <HxrLogo size="lg" variant="color" />,
    badge: "XR ALLIANCE"
  },
  {
    id: "dreama",
    name: "DREAMA",
    role: "Neuro-Cinematic & Subconscious Storytelling Partner",
    description: "Creating transformative dream environments and real-time sensory translation engines that redefine immersive human experience.",
    component: <DreamaLogo size="lg" variant="color" />,
    badge: "EXPERIENCE ENGINE"
  }
];

/**
 * Collaborators Showcase Component
 * Responsive, architectural presentation for hero & alliance sections
 */
export const CollaboratorsShowcase: React.FC<{
  layout?: "grid" | "ribbon" | "hero-badge" | "compact";
  className?: string;
  onPartnerClick?: () => void;
}> = ({
  layout = "grid",
  className = "",
  onPartnerClick
}) => {
  if (layout === "hero-badge") {
    return (
      <div className={`border border-brand-line/15 bg-brand-surface/90 p-4 sm:p-5 shadow-[3px_3px_0px_0px_rgba(242,211,182,0.16)] ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-line/10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="font-mono text-[10px] font-bold text-brand-ink uppercase tracking-widest">
              OFFICIAL ALLIANCE COLLABORATORS
            </span>
          </div>
          <span className="font-mono text-[9px] text-brand-muted uppercase tracking-wider">
            NYC × GLOBAL 2026/27
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 items-center">
          {/* Soho */}
          <div className="p-3 py-4 bg-brand-dark rounded-xs flex items-center justify-center text-center group hover:bg-neutral-900 transition-colors">
            <SohoLogo size="sm" variant="dark" className="h-10 sm:h-12" />
          </div>

          {/* HXR */}
          <div className="p-3 py-4 bg-black rounded-xs flex items-center justify-center text-center group hover:bg-neutral-900 transition-colors">
            <HxrLogo size="sm" variant="color" className="h-8 sm:h-10" />
          </div>

          {/* Dreama */}
          <div className="p-3 py-4 bg-brand-surface border border-brand-line/20 rounded-xs flex items-center justify-center text-center group hover:border-brand-accent transition-colors">
            <DreamaLogo size="sm" variant="color" className="h-12 sm:h-14" />
          </div>
        </div>
      </div>
    );
  }

  if (layout === "ribbon") {
    return (
      <div className={`w-full bg-brand-dark text-white border-y border-brand-line py-6 px-6 md:px-12 ${className}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-mono text-[9px] uppercase tracking-widest text-brand-accent font-bold">
              ESTABLISHED ALLIANCE
            </span>
            <h4 className="font-display font-black uppercase text-sm tracking-wider text-brand-ink">
              FOUNDING COLLABORATORS & PARTNERS
            </h4>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            <div className="flex flex-col items-center group">
              <SohoLogo size="sm" variant="dark" className="h-9 transition-transform group-hover:scale-105" />
            </div>
            <div className="h-8 w-[1px] bg-zinc-700 hidden sm:block" />
            <div className="flex flex-col items-center group">
              <HxrLogo size="sm" variant="color" className="h-8 transition-transform group-hover:scale-105" />
            </div>
            <div className="h-8 w-[1px] bg-zinc-700 hidden sm:block" />
            <div className="flex flex-col items-center group">
              <DreamaLogo size="sm" variant="dark" className="h-11 transition-transform group-hover:scale-105" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default rich Grid layout
  return (
    <div className={`space-y-8 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: SOHO INTERNATIONAL FILM FESTIVAL */}
        <div className="border-[1.5px] border-brand-line bg-brand-dark text-white p-6 sm:p-8 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(242,211,182,0.16)] hover:shadow-[6px_6px_0px_0px_rgba(224,74,59,0.8)] transition-all duration-200 group">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="font-mono text-[9px] bg-brand-accent text-white px-2 py-0.5 font-bold uppercase tracking-widest">
                FOUNDING PARTNER
              </span>
              <span className="font-mono text-[9px] text-zinc-400 uppercase">NYC // SOHO</span>
            </div>

            <div className="py-4 flex justify-center items-center min-h-[140px] bg-neutral-900/60 border border-white/5 p-4 rounded-xs">
              <SohoLogo size="md" variant="dark" className="h-20" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-display font-extrabold uppercase text-lg text-white group-hover:text-brand-accent transition-colors">
                SOHO INTERNATIONAL FILM FESTIVAL
              </h4>
              <p className="font-mono text-[10px] text-brand-accent uppercase font-bold tracking-wider">
                Official Festival & Screenings Platform
              </p>
            </div>
          </div>

          <div className="pt-5 border-t border-white/10 mt-5 flex items-center justify-between text-zinc-400 font-mono text-[9px] uppercase">
            <span>OFFICIAL CO-HOST</span>
            <span className="text-white group-hover:translate-x-1 transition-transform">EXPLORE →</span>
          </div>
        </div>

        {/* Card 2: HXR */}
        <div className="border-[1.5px] border-brand-line bg-[#0A0A0A] text-white p-6 sm:p-8 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(242,211,182,0.16)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.6)] transition-all duration-200 group">
          <div className="space-y-5">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="font-mono text-[9px] bg-brand-surface text-brand-ink px-2 py-0.5 font-bold uppercase tracking-widest">
                HARVARD GSD XR+ ALLIANCE
              </span>
              <span className="font-mono text-[9px] text-zinc-400 uppercase">CAMBRIDGE // 2026</span>
            </div>

            <div className="py-4 flex justify-center items-center min-h-[140px] bg-neutral-900/60 border border-white/5 p-4 rounded-xs">
              <HxrLogo size="md" variant="dark" className="h-16" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-display font-extrabold uppercase text-lg text-white group-hover:text-zinc-200 transition-colors">
                HXR
              </h4>
              <p className="font-mono text-[10px] text-zinc-300 uppercase font-bold tracking-wider">
                Harvard GSD XR Conference 2026: XR+: From Pixel to Voxel
              </p>
            </div>
          </div>

          <div className="pt-5 border-t border-white/10 mt-5 flex items-center justify-between text-zinc-400 font-mono text-[9px] uppercase">
            <span>HUMAN-CENTERED XR</span>
            <span className="text-white group-hover:translate-x-1 transition-transform">EXPLORE →</span>
          </div>
        </div>

        {/* Card 3: DREAMA */}
        <div className="border-[1.5px] border-brand-line bg-brand-surface text-brand-ink p-6 sm:p-8 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(242,211,182,0.16)] hover:shadow-[6px_6px_0px_0px_rgba(6,182,212,0.8)] transition-all duration-200 group">
          <div className="space-y-5">
            <div className="flex justify-between items-center border-b border-brand-line/10 pb-3">
              <span className="font-mono text-[9px] bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-2 py-0.5 font-bold uppercase tracking-widest">
                EXPERIENCE ENGINE
              </span>
              <span className="font-mono text-[9px] text-brand-muted uppercase">BIO-SENSORY LABS</span>
            </div>

            <div className="py-4 flex justify-center items-center min-h-[140px] bg-brand-surface border border-brand-line/10 p-4 rounded-xs shadow-inner">
              <DreamaLogo size="md" variant="color" className="h-20" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-display font-extrabold uppercase text-lg text-brand-ink group-hover:text-blue-600 transition-colors">
                DREAMA
              </h4>
              <p className="font-mono text-[10px] text-blue-600 uppercase font-bold tracking-wider">
                Explore. Understand. Become.
              </p>
            </div>
          </div>

          <div className="pt-5 border-t border-brand-line/10 mt-5 flex items-center justify-between text-brand-muted font-mono text-[9px] uppercase">
            <span>IMMERSIVE LABS</span>
            <span className="text-brand-ink font-bold group-hover:translate-x-1 transition-transform">EXPLORE →</span>
          </div>
        </div>
      </div>
    </div>
  );
};
