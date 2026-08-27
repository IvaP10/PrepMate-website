import Link from "next/link";
import { ThemeLogo } from "./theme-logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-identity">
        <span className="footer-brand"><ThemeLogo className="footer-logo" size={26} decorative /> PrepMate</span>
        <span>AI interview practice for macOS.</span>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <Link href="/download">Download</Link>
        <Link href="/changelog">Release notes</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/security">Security</Link>
        <Link href="/support">Support</Link>
        <Link href="/license">License</Link>
      </nav>
      <span className="footer-platform">macOS only</span>
    </footer>
  );
}
