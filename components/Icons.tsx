import type { ReactNode } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Gene-map "constellation" mark - a small network of connected nodes.
export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <g stroke="rgba(255,255,255,0.62)" strokeWidth="1.7">
        <line x1="10" y1="12" x2="17" y2="8" />
        <line x1="17" y1="8" x2="23" y2="14" />
        <line x1="10" y1="12" x2="13" y2="22" />
        <line x1="23" y1="14" x2="21" y2="22" />
        <line x1="13" y1="22" x2="21" y2="22" />
      </g>
      <g fill="#fff">
        <circle cx="10" cy="12" r="2.5" />
        <circle cx="17" cy="8" r="2.5" />
        <circle cx="23" cy="14" r="2.5" />
        <circle cx="13" cy="22" r="2.5" />
        <circle cx="21" cy="22" r="2.5" />
      </g>
    </svg>
  );
}

export const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronRight = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const Close = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Menu = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Tap = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M9 11V6a2 2 0 014 0v6" />
    <path d="M13 9a2 2 0 014 0v3a6 6 0 01-6 6h-1a6 6 0 01-4.2-1.7L4 14.5a1.6 1.6 0 012.3-2.2L8 14" />
  </svg>
);

export const Info = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

// Area icons keyed by area.iconKey
const AREA_ICONS: Record<string, ReactNode> = {
  sleep: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base}>
      <path d="M20 14.5A8 8 0 119.5 4a6.5 6.5 0 0010.5 10.5z" />
    </svg>
  ),
  coffee: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base}>
      <path d="M5 9h11v5a4 4 0 01-4 4H9a4 4 0 01-4-4V9z" />
      <path d="M16 10h2.5a2.5 2.5 0 010 5H16" />
      <path d="M8 3c-.5 1 .5 1.6 0 2.6M11.5 3c-.5 1 .5 1.6 0 2.6" />
    </svg>
  ),
  food: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base}>
      <path d="M5 3v7a2 2 0 002 2v9M5 3v4M8 3v4M19 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" />
    </svg>
  ),
  fitness: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base}>
      <path d="M6 9v6M4 10v4M18 9v6M20 10v4M6 12h12" />
    </svg>
  ),
  stress: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base}>
      <path d="M3 12h3l2-5 3 9 2.5-7L18 12h3" />
    </svg>
  ),
  family: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base}>
      <circle cx="7.5" cy="8" r="2.5" />
      <circle cx="16.5" cy="8" r="2.5" />
      <path d="M3.5 19c0-2.5 1.8-4.5 4-4.5s4 2 4 4.5M12.5 19c0-2.5 1.8-4.5 4-4.5s4 2 4 4.5" />
    </svg>
  ),
};

export function AreaIcon({ iconKey }: { iconKey?: string }) {
  return <>{AREA_ICONS[iconKey ?? ""] ?? AREA_ICONS.sleep}</>;
}
