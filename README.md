# Nayeeb Rahman — portfolio website

Anime-story, motion-heavy multipage portfolio (single-page app with hash routes: home, work, case studies, hire, consulting, partner, about, contact, 404).

## Structure
- `site/` — the deployable static site. `site/index.html` is generated; all images, frame sheets and videos live under `site/img`, `site/frames`, `site/abframes`, `site/ppframes`, `site/csframes`, `site/hrframes`, `site/wkframes`.
- `src/` — sources: `head.html`, `body.html`, the page CSS files, `app.js` and `shell.js`.
- `sprite.html` — SVG icon sprite injected into the page.
- `build.py` — concatenates `src/` + `sprite.html` into `site/index.html`. Run `python3 build.py` after editing anything in `src/`.
- `qa/` — Playwright check scripts (overflow, reduced motion, screenshots). Install with `npm install`.
- `USER-ASSETS.md` — where every user-supplied picture and video is used (locked placements).

## Deploy
Serve the `site/` folder as static files (e.g. Vercel with `site` as the output directory). No build step is needed on the host because `site/index.html` is committed.

Note: `og:image` is set to `img/og.jpg`; once the site has its own domain, change it to the full URL so LinkedIn and WhatsApp previews pick it up.
