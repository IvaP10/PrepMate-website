import type { CSSProperties } from "react";

type ThemeLogoProps = {
  className?: string;
  decorative?: boolean;
  size?: number;
};

export function ThemeLogo({
  className = "",
  decorative = false,
  size = 32,
}: ThemeLogoProps) {
  return (
    <span
      className={`theme-logo ${className}`.trim()}
      style={{ "--theme-logo-size": `${size}px` } as CSSProperties}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "PrepMate logo"}
    >
      {/* SVGs are served directly so Vinext does not wrap both theme variants in its image runtime. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="theme-logo-light"
        src="/images/light.svg"
        alt=""
        width={size}
        height={size}
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="theme-logo-dark"
        src="/images/logo-dark.svg"
        alt=""
        width={size}
        height={size}
        decoding="async"
      />
    </span>
  );
}
