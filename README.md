# PrepMate marketing site

This is the independent public-facing marketing and download site for PrepMate.
It is deliberately separate from the private desktop application repository:

- this project contains only the product story, legal/support pages, and download UI;
- the desktop `Frontend/` directory remains the Electron renderer and is not deployed here;
- the site never talks to the PrepMate local API, stores user interview data, or accepts provider keys;
- binary downloads are activated only by publishing a signed/notarized release manifest.

## Local development

```bash
npm install
npm run dev
```

Create `.env` from `.env.example` when pointing the download page at a hosted
manifest. The default `/latest.json` is intentionally pending-safe.

## Netlify

Connect this repository as a Netlify site with the defaults in `netlify.toml`:

- build command: `npm run build`
- publish directory: `dist`
- Node: 22

Set `VITE_PREPMATE_RELEASE_MANIFEST_URL` to the public HTTPS URL of the
approved `latest.json` manifest once Cloudflare R2 and release signing are
configured. Do not publish a development or unsigned DMG.
