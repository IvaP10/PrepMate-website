import "./styles.css"

const app = document.querySelector("#app")
const configuredManifestUrl = String(import.meta.env.VITE_PREPMATE_RELEASE_MANIFEST_URL || "/latest.json").trim()

const icons = {
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6" />',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9" />',
  check: '<path d="m5 12 4 4L19 6" />',
  chart: '<path d="M4 19V5m0 14h16M8 16v-4m4 4V8m4 8v-7" />',
  download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />',
  external: '<path d="M14 5h5v5M19 5l-8 8M17 13v5H5V6h5" />',
  lock: '<rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" />',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />',
  shield: '<path d="M12 3 19 6v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" />',
  sparkles: '<path d="m12 3-1.2 4.8L6 9l4.8 1.2L12 15l1.2-4.8L18 9l-4.8-1.2L12 3ZM5 15l-.6 2.4L2 18l2.4.6L5 21l.6-2.4L8 18l-2.4-.6L5 15ZM19 14l-.5 2L16 16.5l2.5.5.5 2 .5-2 2.5-.5-2.5-.5-.5-2Z" />',
  target: '<circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 4V2M20 12h2M12 20v2M4 12H2" />',
}

function icon(name, className = "") {
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.sparkles}</svg>`
}

function logo() {
  return `<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M8 25V7h8.4c5.1 0 8.6 2.6 8.6 7s-3.5 7-8.6 7H13v4H8Zm5-8h3.3c2.2 0 3.7-1.1 3.7-3s-1.5-3-3.7-3H13v6Z" fill="currentColor"/><path d="M6 27h20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>`
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function safeUrl(value, fallback = "") {
  const raw = String(value || "").trim()
  if (!raw) return fallback
  try {
    const parsed = new URL(raw, window.location.origin)
    const sameOriginHttp = parsed.origin === window.location.origin && ["http:", "https:"].includes(parsed.protocol)
    if (parsed.protocol !== "https:" && !sameOriginHttp) return fallback
    return parsed.href
  } catch {
    return fallback
  }
}

function safeEmail(value) {
  const email = String(value || "").trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : ""
}

function formatBytes(value) {
  const bytes = Number(value)
  if (!Number.isFinite(bytes) || bytes <= 0) return "Size included in release manifest"
  const units = ["B", "KB", "MB", "GB"]
  const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  return `${(bytes / 1024 ** unit).toFixed(unit ? 1 : 0)} ${units[unit]}`
}

function formatDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Release date pending"
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date)
}

function navLink(href, label, active) {
  const isActive = active === label.toLowerCase()
  return `<a class="nav-link${isActive ? " active" : ""}" href="${href}"${isActive ? ' aria-current="page"' : ""}>${label}</a>`
}

function shell(content, active = "") {
  return `
    <div class="site-frame">
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="/" aria-label="PrepMate home">${logo()}<span>PrepMate</span></a>
          <nav class="site-nav" aria-label="Primary navigation">
            ${navLink("/#features", "Features", active)}
            ${navLink("/#how-it-works", "How it works", active)}
            ${navLink("/download", "Download", active)}
          </nav>
          <a class="button button-small button-dark" href="/download">Get the app ${icon("arrowUpRight")}</a>
        </div>
      </header>
      ${content}
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <a class="brand footer-brand" href="/">${logo()}<span>PrepMate</span></a>
            <p class="footer-copy">Prepare with proof.<br />A focused interview workspace for your Mac.</p>
          </div>
          <div class="footer-column"><span class="footer-label">Product</span><a href="/#features">Features</a><a href="/download">Download</a><a href="/changelog">Changelog</a></div>
          <div class="footer-column"><span class="footer-label">Trust</span><a href="/privacy">Privacy</a><a href="/security">Security</a><a href="/license">License</a></div>
          <div class="footer-column"><span class="footer-label">Help</span><a href="/support">Support</a><a href="/#how-it-works">Workflow</a></div>
        </div>
        <div class="container footer-bottom"><span>© ${new Date().getFullYear()} PrepMate</span><span>Local-first by design.</span></div>
      </footer>
    </div>`
}

function homePage() {
  return shell(`
    <main>
      <section class="hero-section">
        <div class="container hero-grid">
          <div class="hero-copy">
            <div class="eyebrow"><span class="eyebrow-dot"></span> Interview preparation, made deliberate</div>
            <h1>Turn preparation into <em>evidence.</em></h1>
            <p class="hero-lede">PrepMate is a local-first macOS workspace that turns your resume, practice sessions, and feedback into a clearer path to your next interview.</p>
            <div class="hero-actions"><a class="button button-primary" href="/download">Download for macOS ${icon("arrowUpRight")}</a><a class="text-link" href="/#how-it-works">See how it works ${icon("arrowRight")}</a></div>
            <div class="hero-note"><span class="note-icon">${icon("lock")}</span><span>Your interview workspace stays on your Mac. Provider connections are explicit and under your control.</span></div>
          </div>
          <div class="hero-art" aria-label="PrepMate interview workspace preview">
            <div class="orb orb-one"></div><div class="orb orb-two"></div>
            <div class="app-window">
              <div class="window-bar"><span class="window-dots"><i></i><i></i><i></i></span><span class="window-title">PrepMate <small>Interview workspace</small></span><span class="window-menu">•••</span></div>
              <div class="window-body">
                <aside class="mock-sidebar"><div class="mock-logo">${logo()}</div><div class="mock-nav active"><span>${icon("target")}</span><span>Today</span></div><div class="mock-nav"><span>${icon("chart")}</span><span>Progress</span></div><div class="mock-nav"><span>${icon("sparkles")}</span><span>Improve</span></div><div class="mock-sidebar-bottom"><span>${icon("lock")}</span><span>Local workspace</span></div></aside>
                <div class="mock-main"><div class="mock-kicker">MONDAY, AUGUST 24</div><h3>Good morning, Ivan</h3><p class="mock-muted">One focused session is enough to move the work forward.</p><div class="mock-stat-row"><div class="mock-stat"><span>Readiness</span><strong>72<span>%</span></strong><small><b>+8%</b> this week</small></div><div class="mock-stat"><span>Sessions</span><strong>04</strong><small>keep the rhythm</small></div></div><div class="mock-session"><div class="session-icon">${icon("arrowRight")}</div><div><strong>Continue your system design round</strong><span>12 min remaining · Backend Engineer</span></div><span class="session-arrow">${icon("arrowUpRight")}</span></div><div class="mock-bottom-row"><div><span class="mock-kicker">NEXT FOCUS</span><strong>Communicate trade-offs clearly</strong></div><div class="focus-ring"><span>3</span></div></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="proof-strip"><div class="container proof-inner"><span class="proof-label">A complete loop for better preparation</span><div class="proof-flow"><span>Resume</span><b>→</b><span>Blueprint</span><b>→</b><span>Interview</span><b>→</b><span>Report</span><b>→</b><span>Improve</span></div></div></section>

      <section class="section" id="how-it-works"><div class="container"><div class="section-heading centered"><div class="eyebrow">The preparation loop</div><h2>Every session leaves you<br /><em>with something useful.</em></h2><p>PrepMate keeps the thread between what you have done, what happened, and what to practice next.</p></div><div class="steps-grid"><article class="step-card"><span class="step-number">01</span><div class="step-icon">${icon("target")}</div><h3>Start from your story</h3><p>Bring in your resume and role context. PrepMate shapes a bounded plan around the work you actually want to discuss.</p><a href="/#features" class="arrow-link">Build your context ${icon("arrowRight")}</a></article><article class="step-card featured"><span class="step-number">02</span><div class="step-icon">${icon("sparkles")}</div><h3>Practice with intent</h3><p>Move through behavioral, technical, and follow-up rounds with a clear objective instead of another generic question list.</p><a href="/#features" class="arrow-link">Explore the workspace ${icon("arrowRight")}</a></article><article class="step-card"><span class="step-number">03</span><div class="step-icon">${icon("chart")}</div><h3>Know what to do next</h3><p>Review the evidence from your attempt, then turn the sharpest weakness into a small, concrete next session.</p><a href="/#features" class="arrow-link">See the feedback loop ${icon("arrowRight")}</a></article></div></div></section>

      <section class="section section-tint" id="features"><div class="container"><div class="split-heading"><div><div class="eyebrow">One calm workspace</div><h2>Less dashboard.<br /><em>More signal.</em></h2></div><p>PrepMate is built around the parts of preparation that compound: good context, honest practice, and feedback you can act on.</p></div><div class="feature-grid"><article class="feature-card feature-large"><div class="feature-card-top"><span class="feature-icon violet">${icon("lock")}</span><span class="feature-tag">LOCAL-FIRST</span></div><h3>Your work stays yours</h3><p>Resume data, notes, settings, and interview history live in the desktop app on your Mac. Connect a provider only when you choose one.</p><div class="feature-visual privacy-visual"><div class="privacy-line"><span>${icon("shield")}</span><span>Private workspace</span><b>Ready</b></div><div class="privacy-line muted-line"><span>${icon("lock")}</span><span>External sharing</span><b>Off</b></div></div></article><article class="feature-card"><div class="feature-card-top"><span class="feature-icon blue">${icon("target")}</span><span class="feature-tag">CONTEXT</span></div><h3>Practice from the real role</h3><p>Keep your target role, resume, and preparation profile connected so every round has a reason to exist.</p><div class="mini-bars"><span style="height:46%"></span><span style="height:68%"></span><span style="height:54%"></span><span style="height:82%"></span><span style="height:74%"></span><span style="height:94%"></span></div></article><article class="feature-card"><div class="feature-card-top"><span class="feature-icon green">${icon("chart")}</span><span class="feature-tag">EVIDENCE</span></div><h3>Feedback with a memory</h3><p>See patterns across sessions, not just a score on a single answer. Use the trend to decide what is worth your time.</p><div class="trend-visual"><span class="trend-label">Readiness trend</span><strong>+18%</strong><svg viewBox="0 0 260 55" preserveAspectRatio="none" aria-hidden="true"><path d="M0 44 C28 47 31 33 53 37 S78 31 93 34 S119 16 140 25 S163 29 181 13 S203 22 217 8 S244 6 260 2" /></svg></div></article><article class="feature-card feature-wide"><div class="feature-wide-copy"><div class="feature-card-top"><span class="feature-icon amber">${icon("arrowRight")}</span><span class="feature-tag">ACTIONABLE</span></div><h3>From report to next move</h3><p>Turn a difficult moment into a focused improvement plan. PrepMate keeps your practice connected to the decision you make next.</p><a class="arrow-link" href="/download">Make preparation deliberate ${icon("arrowUpRight")}</a></div><div class="plan-visual"><div class="plan-row done"><span>${icon("check")}</span><span>Explain the architecture first</span></div><div class="plan-row done"><span>${icon("check")}</span><span>Name the trade-offs</span></div><div class="plan-row"><span>03</span><span>Practice the follow-up</span></div></div></article></div></div></section>

      <section class="section cta-section"><div class="container cta-panel"><div class="cta-art"><div class="cta-orbit orbit-a"></div><div class="cta-orbit orbit-b"></div><div class="cta-card"><span>${icon("sparkles")}</span><strong>Next best session</strong><small>Practice one sharper answer</small></div></div><div class="cta-copy"><div class="eyebrow">Start with a clearer plan</div><h2>Good preparation<br /><em>should compound.</em></h2><p>Download PrepMate for macOS and build a practice loop you can trust.</p><a class="button button-primary" href="/download">See download options ${icon("arrowUpRight")}</a></div></div></section>
    </main>`, "")
}

function pageIntro(eyebrow, title, copy) {
  return `<div class="page-intro"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${copy}</p></div>`
}

function downloadPage() {
  return shell(`
    <main class="page-main"><div class="container narrow-container">
      ${pageIntro("Download PrepMate", "A focused workspace for your Mac.", "PrepMate is distributed as a macOS desktop app. Public download links appear here only after a release has passed signing, notarization, and manifest verification.")}
      <div id="download-status" class="notice notice-pending"><span class="notice-icon">${icon("download")}</span><div><strong>Checking the current release…</strong><p>The download page is reading the release manifest.</p></div></div>
      <div id="download-content"></div>
      <section class="release-notes"><div class="eyebrow">Release policy</div><h2>Only approved builds are downloadable.</h2><p>The site is intentionally quiet until the release process has produced a signed and notarized artifact for macOS. This prevents a development build from becoming an accidental public download.</p><div class="release-checks"><span>${icon("check")} Signed artifact</span><span>${icon("check")} Notarization complete</span><span>${icon("check")} SHA-256 published</span></div></section>
    </div></main>`, "download")
}

function pendingDownloadState(message = "No public release is available yet.") {
  const status = document.querySelector("#download-status")
  const content = document.querySelector("#download-content")
  if (!status || !content) return
  status.className = "notice notice-pending"
  status.innerHTML = `<span class="notice-icon">${icon("lock")}</span><div><strong>${escapeHtml(message)}</strong><p>Downloads activate only after a signed and notarized macOS build is published.</p></div>`
  content.innerHTML = `<div class="empty-download"><div class="empty-icon">${icon("download")}</div><h2>Release in preparation</h2><p>Check back when the first public build is ready. The rest of the site is live so you can understand the product and its privacy model.</p><a class="text-link" href="/support">Need help? Visit support ${icon("arrowRight")}</a></div>`
}

function downloadLink(record, type) {
  const url = safeUrl(record?.url)
  if (!url) return ""
  const filename = escapeHtml(record?.filename || `${type.toUpperCase()} download`)
  return `<a class="button button-small button-outline" href="${escapeHtml(url)}" download target="_blank" rel="noopener noreferrer">${type.toUpperCase()} <span>${filename}</span> ${icon("download")}</a>`
}

function releaseCard(label, record) {
  if (!record || (!safeUrl(record.dmg?.url) && !safeUrl(record.zip?.url))) return ""
  const dmg = record.dmg
  const zip = record.zip
  const primary = dmg || zip
  return `<article class="download-card"><div class="download-card-heading"><div><div class="eyebrow">macOS</div><h2>${escapeHtml(label)}</h2></div><span class="arch-badge">${escapeHtml(primary.architecture || label)}</span></div><p class="download-meta">${formatBytes(primary.size_bytes)} · ${escapeHtml(primary.minimum_macos || "macOS version listed in manifest")}</p><div class="download-actions">${downloadLink(dmg, "dmg")}${downloadLink(zip, "zip")}</div><details class="checksum-details"><summary>View checksum</summary><div class="checksum-list">${dmg?.sha256 ? `<span>DMG <code>${escapeHtml(dmg.sha256)}</code></span>` : ""}${zip?.sha256 ? `<span>ZIP <code>${escapeHtml(zip.sha256)}</code></span>` : ""}</div></details></article>`
}

function publishedDownloadState(manifest) {
  const status = document.querySelector("#download-status")
  const content = document.querySelector("#download-content")
  if (!status || !content) return
  const downloads = manifest?.downloads?.macos || {}
  const cards = [releaseCard("Apple silicon", downloads.arm64), releaseCard("Intel", downloads.x64)].filter(Boolean)
  if (!cards.length) {
    pendingDownloadState()
    return
  }
  status.className = "notice notice-published"
  status.innerHTML = `<span class="notice-icon">${icon("check")}</span><div><strong>PrepMate ${escapeHtml(manifest.version || "release")} is available.</strong><p>Published ${escapeHtml(formatDate(manifest.released_at))}. Verify the checksum after downloading.</p></div>`
  content.innerHTML = `<section class="downloads-grid">${cards.join("")}</section><div class="manifest-footnote">${manifest.release_notes_url && safeUrl(manifest.release_notes_url) ? `<a class="text-link" href="${escapeHtml(safeUrl(manifest.release_notes_url))}" target="_blank" rel="noopener noreferrer">Read release notes ${icon("external")}</a>` : ""}<span>Keep the manifest and checksum with the installer you downloaded.</span></div>`
}

async function hydrateDownloadPage() {
  const manifestUrl = safeUrl(configuredManifestUrl)
  if (!manifestUrl) {
    pendingDownloadState()
    return
  }
  try {
    const response = await fetch(manifestUrl, { cache: "no-store", credentials: "omit", headers: { Accept: "application/json" } })
    if (!response.ok) throw new Error("manifest unavailable")
    const manifest = await response.json()
    if (manifest?.status !== "published") {
      pendingDownloadState()
      return
    }
    publishedDownloadState(manifest)
  } catch {
    pendingDownloadState("Release information is temporarily unavailable.")
  }
}

function contactBlock(kind) {
  const email = safeEmail(import.meta.env[kind === "security" ? "VITE_PREPMATE_SECURITY_EMAIL" : "VITE_PREPMATE_SUPPORT_EMAIL"])
  if (email) return `<a class="button button-primary" href="mailto:${escapeHtml(email)}">Contact us ${icon("mail")}</a>`
  return `<div class="contact-pending"><span>${icon("mail")}</span><span>Contact details will be published before the public release.</span></div>`
}

function privacyPage() {
  return shell(`<main class="page-main"><div class="container legal-container">${pageIntro("Privacy", "A local workspace by default.", "PrepMate is designed so your preparation data stays on your Mac. This page explains the product boundary in plain language.")}<div class="legal-layout"><aside class="legal-nav"><span>On this page</span><a href="#data">Your data</a><a href="#providers">Provider connections</a><a href="#site">This website</a></aside><div class="legal-body"><section id="data"><h2>Your data</h2><p>Resume files, interview history, notes, settings, and local reports are stored by the desktop application on your device. PrepMate does not require a PrepMate account or a hosted workspace for its local-first workflow.</p></section><section id="providers"><h2>Provider connections</h2><p>If you configure an AI provider or compatible local endpoint, the app uses that connection for the work you request. Selected prompt context may be sent to the provider you choose. Provider terms and privacy policies apply to those connections.</p><p>PrepMate does not ask for provider access merely because the app opened. Keys are handled through the operating system credential store where supported.</p></section><section id="site"><h2>This website</h2><p>This marketing site does not collect resume files, interview answers, provider keys, or application data. It serves product information and, when a release is approved, links to immutable download assets and their published checksums.</p></section><section><h2>Questions</h2><p>For privacy questions, use the support channel published on the <a class="inline-link" href="/support">support page</a>.</p></section></div></div></div></main>`, "privacy")
}

function securityPage() {
  return shell(`<main class="page-main"><div class="container legal-container">${pageIntro("Security", "Small boundaries are safer boundaries.", "PrepMate keeps the desktop app, local API, and public marketing surface separate. The public site has no access to your interview workspace.")}<div class="legal-layout"><aside class="legal-nav"><span>Principles</span><a href="#desktop">Desktop boundary</a><a href="#release">Release hygiene</a><a href="#report">Report an issue</a></aside><div class="legal-body"><section id="desktop"><h2>Desktop boundary</h2><p>The application runs locally and uses a loopback boundary for its own renderer. The website is a separate static project: it does not proxy requests to the local API and does not receive application data.</p></section><section id="release"><h2>Release hygiene</h2><p>Download links are driven by a versioned release manifest. The site should expose only artifacts that have passed signing, notarization, checksum, and release-inventory checks. An unpublished or incomplete manifest keeps downloads disabled.</p></section><section id="report"><h2>Report a security issue</h2><p>Please do not include provider keys, resumes, interview transcripts, or other private data in a report. Use the security contact below once it has been published.</p>${contactBlock("security")}</section></div></div></div></main>`, "security")
}

function supportPage() {
  return shell(`<main class="page-main"><div class="container narrow-container">${pageIntro("Support", "Get unstuck without giving up your data.", "PrepMate is a local desktop app. Support should never require sending us your resume, provider key, or full interview history.")}<div class="support-grid"><article class="support-card"><span class="feature-icon blue">${icon("download")}</span><h2>Download help</h2><p>When public builds are available, the download page will show the supported macOS architecture, file size, checksum, and release notes.</p><a class="text-link" href="/download">View downloads ${icon("arrowRight")}</a></article><article class="support-card"><span class="feature-icon violet">${icon("lock")}</span><h2>Privacy questions</h2><p>Read how local storage, provider connections, and the public website are separated.</p><a class="text-link" href="/privacy">Read the privacy model ${icon("arrowRight")}</a></article><article class="support-card support-contact"><span class="feature-icon green">${icon("mail")}</span><h2>Contact</h2><p>Include your app version, macOS version, and a short description. Never include secrets.</p>${contactBlock("support")}</article></div></div></main>`, "support")
}

function licensePage() {
  return shell(`<main class="page-main"><div class="container narrow-container">${pageIntro("License", "Clear terms for a focused product.", "PrepMate release packages include the applicable license text and third-party notices alongside the application.")}<div class="legal-card"><h2>Distribution terms</h2><p>The exact license, notices, and dependency inventory for each release are part of that release's verified distribution record. Check the package contents and release manifest for the version you download.</p><p>This page is a product summary, not a replacement for the license files shipped with the application.</p><a class="text-link" href="/download">Go to download policy ${icon("arrowRight")}</a></div></div></main>`, "license")
}

function changelogPage() {
  return shell(`<main class="page-main"><div class="container narrow-container">${pageIntro("Changelog", "A quiet record of what gets better.", "Release notes will appear here as signed public builds become available.")}<div class="empty-download changelog-empty"><div class="empty-icon">${icon("chart")}</div><h2>First release notes are on the way</h2><p>The download manifest is currently pending, so there are no public release notes to display yet.</p><a class="text-link" href="/download">Check release status ${icon("arrowRight")}</a></div></div></main>`, "changelog")
}

function notFoundPage() {
  return shell(`<main class="page-main"><div class="container narrow-container"><div class="empty-download"><div class="empty-icon">${icon("target")}</div><h1>That page wandered off.</h1><p>The page you requested does not exist.</p><a class="button button-primary" href="/">Back to PrepMate ${icon("arrowRight")}</a></div></div></main>`)
}

function routePath() {
  const path = window.location.pathname.replace(/\/+$/, "")
  return path || "/"
}

function render() {
  const path = routePath()
  const pages = {
    "/": homePage,
    "/download": downloadPage,
    "/privacy": privacyPage,
    "/security": securityPage,
    "/support": supportPage,
    "/license": licensePage,
    "/changelog": changelogPage,
  }
  const page = pages[path] || notFoundPage
  app.innerHTML = page()
  document.title = path === "/" ? "PrepMate — Prepare with proof" : `PrepMate — ${path.slice(1).replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())}`
  if (path === "/download") void hydrateDownloadPage()
  if (window.location.hash) {
    window.requestAnimationFrame(() => document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "smooth" }))
  }
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a")
  if (!link || link.target === "_blank" || link.hasAttribute("download")) return
  const href = link.getAttribute("href")
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return
  const target = new URL(href, window.location.origin)
  if (target.origin !== window.location.origin || target.hash) return
  event.preventDefault()
  window.history.pushState({}, "", `${target.pathname}${target.search}`)
  render()
  window.scrollTo({ top: 0, behavior: "smooth" })
})

window.addEventListener("popstate", render)
render()
