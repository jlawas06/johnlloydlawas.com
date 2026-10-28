# UI/UX pass — report

All eight changes from the spec are in, as one local commit each on
`claude/confident-ritchie-ajsbag`. Nothing has been pushed or deployed. Lint,
`tsc --noEmit` and `next build` are clean, and the Playwright suite passes 45/45.

## Headline numbers

| | Before | After |
|---|---|---|
| `/` scrollHeight at 390 | 8,214px | **5,720px (69.6%)**, target ≤ 5,749 |
| Measured-outcomes band at 390 | 737px | **533px** |
| Measured-outcomes band at 1440 | 324px | 325px |
| `/` scrollHeight at 1440 | 5,418px | 5,633px (taller because of the proof line and email row; there are no desktop trims) |
| `/projects` at 390 / 1440 | 3,531 / 2,053px | 3,429 / 2,111px |
| `/contact` at 390 / 1440 | 2,598 / 1,537px | 2,466 / 1,550px |
| CLS on `/` at 390 | — | 0.0000 (PerformanceObserver, test threshold < 0.02) |
| Muted text below 4.5:1 | `--slate` on sunk: 4.33 (light), 4.29 (dark) | none, on any page, in either theme |
| Smallest text | 10px | 12px (chips 13px) |
| Tap targets < 44px at 390 | header icons 32px, footer/contact links ~14–18px, buttons 40px | none |

## Commits

| Commit | Change | Files |
|---|---|---|
| `87d5fb9` | 0. Plan, inventory, screenshot tooling | `PLAN.md`, `scripts/capture-screens.mjs`, `.gitignore`, `package.json`/lock (devDeps) |
| `2f5fd3c` | 1. Case-study card images | `lib/projects.ts`, `components/ui/project-card.tsx`, 4× `content/projects/*.mdx`, `app/page.tsx`, `app/projects/page.tsx`, `public/work/README.md`, `README.md` |
| `194edd3` | 2. Muted tokens + labels | `app/globals.css`, `components/ui/primitives/index.tsx`, + 20 label sites, `scripts/contrast-table.py` |
| `9a8056a` | 3. Tap targets on touch | `app/globals.css` (`touch:` variant), nav, theme toggle, primitives, footer, contact, hero, `app/page.tsx`, `playwright.config.ts`, `tests/ui.spec.ts` |
| `e3343dd` | 4. Hero hierarchy | `components/ui/hero.tsx` |
| `49b5ee0` | 5. Status line | `components/ui/hero.tsx` |
| `fc2428f` | 6. Outcomes without bars | `primitives/delta-rule.tsx` → `primitives/outcome.tsx`, `data/outcomes.ts`, `app/globals.css`, `hero.tsx`, `app/projects/[slug]/page.tsx`, `README.md` |
| `0b6ccac` | 7. Shorter mobile home | `app/page.tsx`, `primitives/index.tsx`, `experience-card.tsx`, `footer.tsx`, `hero.tsx`, `tests/ui.spec.ts` |
| `e2cd742` | 8. Mono only for data | Rail/ScopeRule/experience stats `mono` flag, contact link row, footer colophon, `README.md`, `app/layout.tsx` comment |

Run `git log --stat 70b2de8..HEAD` for the full per-file diff stats.

## Where the repo differed from the spec

- **Case studies.** The repo has 4 side-project case studies, not the 5
  listed in the spec: `tigerup`, `answerit-ai`, `olj-copilot`, `youtubely`.
  Commit `70b2de8` removed the nowcom, yondu and osl write-ups. Those three
  now exist only as the home-page outcome figures. Images and alt text are
  wired to the real slugs.
- **Light `--baseline` was `#8a939e`**, not `#6b7681`. It was never used for
  text. Its only use was the hatched "before" bar. Change 2 moved that bar to
  `--baseline-line` (keeping the real old values). Change 6 then removed the
  bars, and `--baseline-line` went with them. `--baseline` now holds the
  spec's text values and is not used anywhere yet.
- **Home was 8,214px, not ≈7,700.** The specified trims (2 cards, 2 posts,
  one sentence per principle) brought it to 6,838px, still short of 70%.
  The 44px footer rows and the new hero rows also add height. To reach the
  target I added these phone-only changes (below `sm`, desktop untouched):
  - "Where I've worked" shows 2 roles. "Full timeline" already links to the rest.
  - Compact timeline rows on the home page hide their tech chips. `/experience` keeps them.
  - Section padding goes from 64px to 48px, and the section-header margin from 40px to 32px.
  - The closing CTA's padding goes from 80px to 56px, and the outcomes band's from 48px to 40px.
  - The three footer link columns sit on one row.

  **These go beyond the spec. Flagged below.**
- **`sizes`** is `(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw`,
  which matches the grid's real `md`/`lg` breakpoints. The spec's 640/1024
  version would under-serve the 641–767px range, where cards are full width.
- **`priority`** is now only on the first card on `/`, per the spec.
  `/projects` used to set it on the first 3 cards.
- **Mobile breakpoint.** Trims use Tailwind's `max-sm:` (< 640px). The
  `touch:` variant uses the spec's `(max-width: 640px), (pointer: coarse)`.
  The two differ at exactly 640px.

## Contrast

From `python3 scripts/contrast-table.py`, which reads `app/globals.css`.
These match the spec exactly.

| Theme | Token | Value | paper | surface | sunk |
|---|---|---|---|---|---|
| light | `--ink` | `#14181d` | 15.19 | 17.82 | 14.24 |
| light | `--graphite` | `#434c56` | 7.43 | 8.73 | 6.97 |
| light | `--slate` | `#4f5964` | 6.07 | 7.13 | 5.69 |
| light | `--baseline` | `#5a6470` | 5.12 | 6.01 | 4.80 |
| light | `--measure` | `#0b6e52` | 5.31 | 6.24 | 4.98 |
| dark | `--ink` | `#e7eaed` | 15.32 | 14.34 | 12.98 |
| dark | `--graphite` | `#98a2ae` | 7.15 | 6.69 | 6.06 |
| dark | `--slate` | `#8d97a3` | 6.24 | 5.84 | 5.29 |
| dark | `--baseline` | `#848e9a` | 5.56 | 5.21 | 4.72 |
| dark | `--measure` | `#4ec9a5` | 9.00 | 8.43 | 7.63 |

In the browser, axe `color-contrast` reports 0 violations on `/`,
`/projects` and `/contact` in light and dark at 390 and 1440. A second
check computes every visible text node's colour against its nearest opaque
background, using canvas so `color-mix`/oklab resolve, and finds nothing
below 4.5:1. I also confirmed both checks fail when a low-contrast `h1` is
injected.

The one remaining hard-coded hex is the code-block language label in
`mdx-components-server.tsx`. Code blocks are dark in both themes, so a
theme token would fail in light mode. It is now `CODE_LABEL = '#8D97A3'`
(dark `--slate`), next to the existing `CODE_BG`/`CODE_RULE` constants.
The old `#6B7681` gave about 3.9:1.

## Tests

`tests/ui.spec.ts` (Playwright + `@axe-core/playwright`, devDependencies
only) has 45 tests, all passing:

- Contrast (axe + per-node ratio) and min font-size of 12px (chips ≥ 13px) on
  `/`, `/projects`, `/contact` × light/dark × 390/1440
- No `uppercase` with letter-spacing > 0.05em on `/`
- Tap targets ≥ 44×44 for every visible `a, button, [role=button], input` at
  390 on all three pages. Exemptions are listed in the test: inline links
  in running prose (`.prose a`, `p a` with `display: inline`, WCAG 2.5.8)
- No horizontal scroll at 390
- Header icon buttons stay 32×32 at 1440 with a mouse
- Keyboard focus shows the 2px solid ring (first 6 tab stops)
- Card media ratio 1.6 ± 0.01 on `/` and `/projects` at 390 and 1440. With an
  image, the `<img>` has non-empty `alt` and `sizes`. Without one, the media
  box has no text.
- Equal card heights per row on `/projects` at 1440
- Status line: one line at 390, no "·", no "N years", no ellipsis, ≥ 12px
- Hero DOM order H1 → sub-copy → proof → CTAs → email. Exact proof-line
  text. Email row sits below the CTA row at both widths.
- Outcomes: all three figures, labels and captions match the old text. No
  gradient or hatched backgrounds in the band.
- `/` at 390 is ≤ 70% of 8,214px. Trimmed cards and posts are `display: none`.
- CLS < 0.02 on `/` at 390

I also ran the contrast, size, tap-target and overflow tests once against
`/about`, `/experience`, `/skills`, `/blog`, a blog post,
`/projects/tigerup`, `/now`, `/uses` and the 404. All 90 passed. They are
not in the committed suite.

Run it:

```bash
npm run build && npx playwright test   # starts `next start` on :3000
```

## Screenshots

These are git-ignored because they are too large to commit (full-page, 2×
on mobile). `node scripts/capture-screens.mjs <dir>` regenerates them
against a running server. The before set was captured from `70b2de8`.

| Page | Width | Theme | Before | After |
|---|---|---|---|---|
| `/` | 390 | light | `screenshots/before/home-390-light.png` | `screenshots/after/home-390-light.png` |
| `/` | 390 | dark | `screenshots/before/home-390-dark.png` | `screenshots/after/home-390-dark.png` |
| `/` | 1440 | light | `screenshots/before/home-1440-light.png` | `screenshots/after/home-1440-light.png` |
| `/` | 1440 | dark | `screenshots/before/home-1440-dark.png` | `screenshots/after/home-1440-dark.png` |
| `/projects` | 390 | light | `screenshots/before/projects-390-light.png` | `screenshots/after/projects-390-light.png` |
| `/projects` | 390 | dark | `screenshots/before/projects-390-dark.png` | `screenshots/after/projects-390-dark.png` |
| `/projects` | 1440 | light | `screenshots/before/projects-1440-light.png` | `screenshots/after/projects-1440-light.png` |
| `/projects` | 1440 | dark | `screenshots/before/projects-1440-dark.png` | `screenshots/after/projects-1440-dark.png` |
| `/contact` | 390 | light | `screenshots/before/contact-390-light.png` | `screenshots/after/contact-390-light.png` |
| `/contact` | 390 | dark | `screenshots/before/contact-390-dark.png` | `screenshots/after/contact-390-dark.png` |
| `/contact` | 1440 | light | `screenshots/before/contact-1440-light.png` | `screenshots/after/contact-1440-light.png` |
| `/contact` | 1440 | dark | `screenshots/before/contact-1440-dark.png` | `screenshots/after/contact-1440-dark.png` |
| Focus ring | 1440 | light | — | `screenshots/after/focus-ring-1440.png` |

Each folder's `metrics.json` holds the scroll heights quoted above.

## Case-study images

| Slug | `/public/work/<slug>.webp` | Renders |
|---|---|---|
| tigerup | missing | plain 16:10 plate |
| answerit-ai | missing | plain 16:10 plate |
| olj-copilot | missing | plain 16:10 plate |
| youtubely | missing | plain 16:10 plate |

To check the image path, I dropped a temporary 1600×1000 webp at
`public/work/answerit-ai.webp`. The card rendered
`<img alt="AnswerIt AI snip overlay capturing a question on screen" sizes="…" srcset="…">`
in the same 16:10 box. The file was deleted and never committed.

## Remaining `font-mono` usage

| Where | Renders | Why mono stays |
|---|---|---|
| `hero.tsx:97`, `app/page.tsx:178`, `contact-content.tsx:60` | email address | email |
| `experience-card.tsx:33`, `post-card.tsx:19`, `project-card.tsx:59`, `blog-post-content.tsx:45` | date ranges, durations, post dates, reading time | dates / figures |
| `project-card.tsx:83`, `experience-card.tsx:86` | outcome figure (label inside is now body face) | figure |
| `primitives/index.tsx:281` (`Chip`), `post-card.tsx:33`, `blog-content.tsx:26`, `app/skills/page.tsx:28` | tech tags, post tags, skill names | tags |
| `app/skills/page.tsx:31` | years per skill | figure |
| `primitives/index.tsx:255` (`Rail`), `outcome.tsx:69` (`ScopeRule`), `app/experience/page.tsx:61` | only items flagged `mono`: timeline range, reading time, years, topics/stack lists, first-role date, totals | dates / figures / tags. Everything else is body face. |
| `mdx-components-server.tsx:37, :94` | code-block language id, table cells (post tables are before/after metrics) | code / figures |
| `kbd.tsx:13` | keyboard keys in the command palette | not on the spec's list. `<kbd>` is keyboard input, so monospace is the convention. |
| `app/error.tsx:31` | error digest | identifier, not a label |

`app/layout.tsx` still loads JetBrains Mono with `subsets: ["latin"]`,
`display: "swap"`. That was already set.

*Option, not implemented:* drop JetBrains Mono entirely and set figures in
Archivo with `font-variant-numeric: tabular-nums`. That saves one font
download, but dates and tags would lose their data texture. Not
recommended.

## Skipped / not done

- **Lighthouse** was not run. CLS was measured with `PerformanceObserver` in
  the test (0.0000; the media slot reserves its 16:10 box before any image
  loads).
- **OG image** (`app/opengraph-image.tsx`) is unchanged, as the spec asks.
  It still draws before/after bars from `ratio`. Its palette was already
  out of step with `globals.css` before this pass. See decision (h).
- Nothing was pushed or deployed.

## Open decisions for John

a. **JetBrains Mono:** keep it restricted to data (implemented,
   recommended), or remove it entirely.

b. **Status line:** one line with a dash (implemented, fits at 390), or two
   stacked lines.

c. **Proof line:** confirm "Cut application load time by 50% across 5+
   ASP.NET applications (2019–2022)."

d. **Mobile trims:** confirm 2 case studies, 2 posts, and one sentence per
   principle.

e. **Extra mobile trims I added to hit 70%:** 2 roles on the home timeline,
   no chips on compact timeline rows, tighter mobile section padding, and
   footer columns on one row. Without them the page is about 6,840px (83%).
   Keep or revert?

f. **Alt text for the two slugs the spec didn't cover:** tigerup is "TigerUp
   public status page". olj-copilot is "OLJ Copilot filling in an
   OnlineJobs.ph application". Edit both in their frontmatter to match the
   screenshots you add.

g. **Youtubely alt text doesn't match the product.** The spec's "Youtubely
   dashboard showing a channel's video analytics" is in place as instructed.
   But the case study describes a local list of unfinished videos with
   resume points, not channel analytics. Something like "Youtubely popup
   listing unfinished videos with their saved progress" would be accurate.

h. **OG image** still shows the bars. Simplify it to figures only, to
   match the site?

i. **Real before/after values:** if you want the bars back on the site,
   add `{ before, after, unit }` to each entry in `data/outcomes.ts` (see
   the TODO there).

j. **Push:** the commits are local only, as the spec asked. The cloud
   container is temporary, so they need to be pushed to
   `claude/confident-ritchie-ajsbag` (or another branch) to survive.
   Vercel may build a preview for that branch.
