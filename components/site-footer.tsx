import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span className="footer-brand">PrepMate</span>
      <span>Local-first interview practice.</span>
      <div className="footer-links">
        <Link href="/download">Download</Link>
        <Link href="/changelog">Release notes</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/security">Security</Link>
        <Link href="/support">Support</Link>
        <Link href="/license">License</Link>
      </div>
    </footer>
  );
}
