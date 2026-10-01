type FestivalLogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { title: "text-[22px]", sub: "text-[10px] tracking-[0.12em]", gap: "mt-1" },
  md: { title: "text-[34px]", sub: "text-[13px] tracking-[0.12em]", gap: "mt-1.5" },
  lg: { title: "text-[clamp(3.5rem,9vw,7rem)]", sub: "text-[clamp(1rem,2vw,1.6rem)] tracking-[0.1em]", gap: "mt-2" },
};

export default function FestivalLogo({ className = "", size = "sm" }: FestivalLogoProps) {
  const s = sizes[size];
  const stacked = size !== "sm";

  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className={`font-display uppercase text-brand-ink leading-[0.9] ${s.title}`}>
        Future{stacked ? <br /> : " "}Reality
      </span>
      <span className={`font-serif font-semibold uppercase text-brand-cream ${s.sub} ${s.gap}`}>
        AI Film Festival
      </span>
    </span>
  );
}
