# CLAUDE.md — Gabriel Lanai Screens marketing site

Guidance for Claude Code (or any future contributor) editing this repository.

## What this is

A static, no-build-step marketing site for **Gabriel Lanai Screens**, a pool cage / lanai screen repair company serving Davenport (special community pricing) and all of Central Florida. Deployed on **Cloudflare Pages**, auto-deploying from the `main` branch of this GitHub repo on every push.

Primary conversion goal: get visitors to tap the **WhatsApp CTA** → `+1 407 520 1065` (`wa.me/14075201065`) with a pre-filled message. Treat WhatsApp CTA visibility and correctness as the highest-priority thing not to break.

## Stack

- Plain HTML/CSS/JS. **No framework, no bundler, no npm build.** Cloudflare Pages deploys the repo root as static assets directly.
- `index.html` — all page markup and content structure.
- `css/styles.css` — single stylesheet, CSS custom properties for the design system (colors, spacing) defined at the top in `:root`.
- `js/i18n.js` — the EN/ES translation dictionary (`window.SITE_I18N.en` / `.es`). This is the single source of truth for all bilingual copy.
- `js/main.js` — language switching logic, WhatsApp link building, mobile nav toggle, FAQ accordion.
- `IMAGE_PROMPTS.md` — ready-to-paste ChatGPT/DALL·E prompts for every photo the site references. Images are optional at runtime (see below) but should eventually be added for full visual impact.
- `_headers` — Cloudflare Pages security/cache headers.
- `robots.txt`, `sitemap.xml` — SEO crawling config.

## Bilingual system — how it works

- Default language is **English**. Spanish is a client-side toggle, not a separate build or route.
- Every translatable element in `index.html` has a `data-i18n="some.key"` attribute. `main.js` looks up that key in `window.SITE_I18N[lang]` and sets `innerHTML` (or the attribute named in `data-i18n-attr` for things like `<meta content>`).
- **When adding new visible text to the page:** add a `data-i18n="section.key"` attribute to the element, then add the matching key to **both** the `en` and `es` objects in `js/i18n.js`. Never leave a key in only one language — the toggle will silently show English fallback text (actually it will show nothing sensible; always keep both dictionaries in sync).
- If a translated string needs inline markup (e.g. a link or `<br>`), that's fine — `main.js` sets `innerHTML`, not `textContent`. Keep any nested elements (like the FAQ chevron `<span class="chev">`) **outside** the `data-i18n` element so translation doesn't wipe them out — see the FAQ `<summary>` markup for the pattern (inner `<span data-i18n="...">` + sibling `<span class="chev">`).
- Language choice persists via `localStorage` (`gls-lang`) and is reflected in the URL as `?lang=es` so Spanish content is linkable/shareable and crawlable. Don't remove the URL param syncing — it's part of the (lightweight) bilingual SEO strategy along with the `hreflang` alternate `<link>` tags in `<head>`.
- If you ever split into true separate `/es/` routes for stronger SEO, update `hreflang` links, `sitemap.xml`, and the JSON-LD accordingly.

## WhatsApp CTA — do not break this

- The phone number lives in exactly one place: `WHATSAPP_NUMBER` constant in `js/main.js`. Change it there only.
- The pre-filled message text lives in the i18n dictionary under the key `whatsapp.message` (per language). Edit copy there, not in `main.js`.
- Any element meant to open WhatsApp must have the `data-wa-link` attribute and `href="#"` placeholder — `main.js` rewrites the `href` on page load and on every language switch. Don't hardcode a `wa.me` URL directly in HTML.

## Images

- All `<img>` tags use `onerror="this.remove()"` so missing images fail gracefully (the surrounding CSS gradient/card design still looks intentional) instead of showing broken-image icons. This means the site is safe to deploy before real photos exist.
- Image filenames referenced in HTML are fixed contracts — see `IMAGE_PROMPTS.md` for the exact filename each prompt must be saved as. Generate images, drop them in `images/` with those exact names, commit, and they appear automatically with no code changes.
- **The 6 on-page photos are served as WebP with a PNG fallback**, via `<picture><source type="image/webp" srcset="....webp"><img src="....png" ...></picture>`. AI-generated PNGs run 2-3.5MB each (lossless), while the WebP sibling at `quality=82` runs ~90% smaller with no visible quality loss — this matters a lot for mobile load time, especially the hero image which loads eagerly. **Whenever you add or replace one of these 6 images, generate the matching `.webp` sibling** (see the Pillow snippet in `IMAGE_PROMPTS.md`) — don't just drop a PNG and skip the WebP step, or that photo will silently regress to the much larger fallback for every browser (WebP support is near-universal, so the `<source>` wins almost always). `og-cover.png` is the one exception — it's only fetched by social-media crawlers for link previews, not rendered in-browser, so it stays plain PNG.
- `picture { display: contents; }` in `styles.css` makes the `<picture>` wrapper invisible to layout so all existing `.hero-media img`, `.gallery-item img`, etc. sizing rules keep applying to the inner `<img>` unchanged — don't remove that rule when touching image markup.
- If you add a **new** image slot, also add a corresponding prompt to `IMAGE_PROMPTS.md` so there's always a way to regenerate/replace it.
- Keep images photorealistic and specific to lanai/pool-screen repair in Florida — avoid generic stock-photo or illustration style, per the brand's realism-first design direction.

## SEO & structured data

- `index.html` `<head>` contains two `application/ld+json` blocks: `HomeAndConstructionBusiness` (business/local SEO) and `FAQPage` (rich snippets for the FAQ section). **If you edit the visible FAQ questions/answers, update the matching JSON-LD text too** — they must stay in sync for valid structured data.
- `meta.title` / `meta.description` / `meta.ogDescription` in `js/i18n.js` drive the `<title>` and meta tags per language. Keep descriptions under ~160 characters and keep target keywords (Davenport, Kissimmee, ChampionsGate, Central Florida, storm/hail damage, affordable/cheap screen repair) present naturally — don't keyword-stuff.
- `sitemap.xml` and `robots.txt` reference `https://gabriellanaiscreens.com` — update this domain everywhere (sitemap, canonical, hreflang, OG tags, JSON-LD `url`) if the real production domain differs.

## Accessibility

- Keep the skip link (`.skip-link` → `#main-content`) working — don't remove `id="main-content"` from `<main>`.
- All interactive icons (WhatsApp button, nav toggle, language switch) must keep their `aria-label` / `aria-pressed` / `aria-expanded` attributes in sync with real state — `main.js` already manages `aria-pressed` on language buttons and `aria-expanded` on the nav toggle; preserve this if you refactor.
- Maintain color contrast — don't lighten `--color-body` or `--color-primary` text against light backgrounds without checking WCAG AA contrast.
- New interactive elements should be real `<button>`/`<a>` tags, not `<div onclick>`, so they're keyboard- and screen-reader-accessible by default.

## Deployment

- Cloudflare Pages project **`gabriel-lanai-screens`** is connected directly to this GitHub repo. Every push to `main` triggers an automatic production deploy — there is no manual deploy step and no build command (build output directory is the repo root, `/`).
- Because there's no build step, whatever is committed is exactly what ships. Double-check `index.html`/CSS/JS changes render correctly locally (just open `index.html` in a browser, or run any static file server) before pushing to `main`.
- Don't introduce a bundler/framework without updating the Cloudflare Pages build configuration to match — it currently expects zero build step.

## General editing conventions

- No trailing whitespace, keep existing 2-space indentation in HTML/CSS/JS.
- Keep copy honest and specific to the business: Davenport community special pricing, all of Central Florida service area, storm/hail damage focus, same-day service *when possible* (don't overpromise guaranteed same-day for every job — the copy intentionally hedges with "often"/"available").
- Prefer editing existing sections over adding new ones; this is a single-page site and should stay scannable on mobile.
