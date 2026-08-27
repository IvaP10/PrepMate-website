import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="PrepMate home">
        <span className="brand-mark" aria-hidden="true">P</span>
        <span>PrepMate</span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        <Link href="/download">Download</Link>
        <Link href="/changelog">Release notes</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/support">Support</Link>
      </nav>
      <Link className="header-cta" href="/download">
        Get the Mac app <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}
