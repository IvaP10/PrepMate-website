import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const highlights = [
  {
    index: "01",
    title: "Private by default",
    body: "Your resumes, answers, reports, and progress stay on your Mac. Nothing leaves until you choose an AI provider.",
  },
  {
    index: "02",
    title: "Evidence, not vibes",
    body: "Practice sessions become useful history: clear reports, Performance patterns, and focused Improve work.",
  },
  {
    index: "03",
    title: "Bring your provider",
    body: "Connect OpenAI, Anthropic, Gemini, or an OpenAI-compatible endpoint from Settings.",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> Local-first interview practice</p>
          <h1>Prepare with the data you already own.</h1>
          <p className="hero-lede">
            A focused desktop workspace for mock interviews, technical rounds,
            evidence-backed reports, Performance, and Improve coaching.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/download">Download for macOS <span aria-hidden="true">↗</span></Link>
            <Link className="button button-quiet" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></Link>
          </div>
          <p className="hero-note">Apple Silicon and Intel · No account required · Your provider, your key</p>
        </div>
        <div className="hero-visual" aria-label="A preview of the PrepMate practice workspace">
          <div className="visual-topline">
            <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="visual-label">Practice workspace</span>
            <span className="visual-status"><span className="status-dot" aria-hidden="true" /> local</span>
          </div>
          <div className="visual-body">
            <div className="visual-sidebar">
              <span className="sidebar-kicker">Today</span>
              <span className="sidebar-line active">Interview Round</span>
              <span className="sidebar-line">Technical Round</span>
              <span className="sidebar-line">Performance</span>
              <span className="sidebar-line">Improve</span>
              <span className="sidebar-kicker later">Workspace</span>
              <span className="sidebar-line">Resume assets</span>
              <span className="sidebar-line">Settings</span>
            </div>
            <div className="visual-main">
              <div className="visual-heading">
                <span className="visual-kicker">Interview Round · Behavioral</span>
                <strong>Tell me about a time you changed your approach.</strong>
              </div>
              <div className="visual-answer">
                <span className="answer-label">Your answer</span>
                <span className="answer-bar long" />
                <span className="answer-bar medium" />
                <span className="answer-bar short" />
                <span className="answer-cursor" aria-hidden="true" />
              </div>
              <div className="visual-footer">
                <span className="footer-chip">03:42</span>
                <span className="footer-chip accent">Evidence captured</span>
                <span className="footer-action">Finish answer&nbsp; →</span>
              </div>
            </div>
          </div>
          <div className="visual-caption">Nothing is scored or sent before you decide.</div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Product principles">
        <span>Designed for deliberate practice</span>
        <span className="trust-rule" aria-hidden="true" />
        <span>Local SQLite history</span>
        <span className="trust-rule" aria-hidden="true" />
        <span>Explicit provider connection</span>
      </section>

      <section className="section section-intro" id="how-it-works">
        <div>
          <p className="eyebrow">A calmer practice loop</p>
          <h2>Start with your context.<br /><em>Keep the useful part.</em></h2>
        </div>
        <p className="section-lede">
          PrepMate turns the details that make an interview yours—your resume,
          target role, choices, and answers—into a private practice history you
          can actually build on.
        </p>
      </section>

      <section className="highlight-grid" aria-label="PrepMate highlights">
        {highlights.map((highlight) => (
          <article className="highlight-card" key={highlight.index}>
            <span className="card-index">{highlight.index}</span>
            <h3>{highlight.title}</h3>
            <p>{highlight.body}</p>
          </article>
        ))}
      </section>

      <section className="download-banner">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2>Make practice feel like progress.</h2>
        </div>
        <Link className="button button-light" href="/download">Choose your Mac build <span aria-hidden="true">↗</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
