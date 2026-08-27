import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { ThemeLogo } from "./theme-logo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="PrepMate home">
        <ThemeLogo className="brand-logo" size={31} decorative />
        <span>PrepMate</span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        <Link href="/#product">Product</Link>
        <Link href="/#how-it-works">How it works</Link>
        <Link href="/#privacy">Privacy</Link>
        <Link href="/support">Support</Link>
      </nav>
      <ThemeToggle />
      <Link className="header-cta" href="/download">
        Download <span aria-hidden="true">↓</span>
      </Link>
    </header>
  );
}
