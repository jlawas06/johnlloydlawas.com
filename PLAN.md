# UI/UX pass — plan

Phase 0 output for the UI/UX improvement spec. Nothing in this file changes
behaviour; it maps each numbered change onto the real files.

## Differences between the spec and the repo

| Spec assumes | Repo has | What I will do |
|---|---|---|
| 5 case studies: youtubely, answerit-ai, nowcom-global-services, yondu-inc, osl-international | 4 case studies: **tigerup, answerit-ai, olj-copilot, youtubely** (`content/projects/*.mdx`). Commit `70b2de8` ("keep case studies to side projects") removed the employer write-ups. nowcom / yondu / osl survive only as keys in `data/outcomes.ts` that feed the home-page figures. | Images and alt text are wired to the 4 real slugs. The spec's alt text is used for youtubely and answerit-ai. For tigerup and olj-copilot I wrote plain descriptive alt text, which is listed as an open decision. |
| Home shows 3 case-study cards on desktop | All 4 projects are `featured: true`, so home shows 4 cards (3 + 1 on the second row at ≥1024px) | Desktop stays as it is (4 cards). Mobile shows 2. |
| Old light `--baseline` = `#6b7681` | Light `--baseline` = **`#8a939e`**. Dark = `#6b7681` | New values from the spec. `--baseline-line` keeps the *real* old values (`#8a939e` / `#6b7681`). |
| `--baseline` may be text | `--baseline` is **never** used for text. Its only consumer is the hatched "before" bar (`.delta-track--baseline` in `app/globals.css`) plus the unused `--color-baseline` Tailwind alias | Change 2 points the hatch at `--baseline-line`. Change 6 removes the bars, so the hatch and `--baseline-line` go with them. |
| Home ≈ 7,700px tall at 390 | **8,214px** (measured below) | Target is ≤ 70% of the measured value, **≤ 5,749px**. |
| Case-study data source is a TS file | MDX frontmatter, loaded by `lib/projects.ts` | `image: { src, alt }` goes in frontmatter. `lib/projects.ts` (server-only `fs`) checks that the file exists. |

## File map

| Area | File |
|---|---|
| Tokens | `app/globals.css` (`:root`, `.dark`, `@theme inline`). This is the single source. |
| Fonts | `app/layout.tsx` (next/font: Archivo, Newsreader, JetBrains Mono) |
| Header / nav, search, hamburger | `components/ui/navigation.tsx` |
| Theme icon button | `components/ui/theme-toggle.tsx` (`h-8 w-8`) |
| Hero, status line, CTAs, email copy, measured outcomes band | `components/ui/hero.tsx` |
| Outcome figures (bars) | `components/ui/primitives/delta-rule.tsx` (`DeltaRule`, `Track`, `ScopeRule`), with data in `data/outcomes.ts` |
| Case-study card | `components/ui/project-card.tsx` |
| Case-study data | `content/projects/{tigerup,answerit-ai,olj-copilot,youtubely}.mdx` → `lib/projects.ts` |
| Home sections (How I work, track record, notes, closing CTA) | `app/page.tsx` |
| Section header / Eyebrow / Button / Rail / Chip | `components/ui/primitives/index.tsx` |
| Timeline row | `components/ui/experience-card.tsx` |
| Blog list row | `components/ui/post-card.tsx` |
| Footer | `components/ui/footer.tsx` |
| Contact page | `components/ui/contact-content.tsx` (`app/contact/page.tsx` is a wrapper) |
| /projects | `app/projects/page.tsx` |
| Other label/mono sites | `app/projects/[slug]/page.tsx`, `app/experience/page.tsx`, `app/skills/page.tsx`, `app/now/page.tsx`, `app/uses/page.tsx`, `app/error.tsx`, `components/ui/about-content.tsx`, `components/ui/blog-content.tsx`, `components/ui/blog-post-content.tsx`, `components/ui/command-palette.tsx`, `components/ui/kbd.tsx`, `components/ui/mdx-components-server.tsx` |
| OG image | `app/opengraph-image.tsx`. **Not touched.** It still reads `ratio` from `data/outcomes.ts`, so that field stays. |

## Theme toggle mechanism

`.dark` class on `<html>`, set before hydration by `themeScript` from
`localStorage.theme` (`components/ui/theme-provider.tsx`). Tests set
`localStorage.theme` in an init script.

## Change → files

1. **Card images**: add `image: { src, alt }` to the 4 MDX frontmatters. `lib/projects.ts` resolves `cover` server-side with `fs.existsSync(public + src)`, falling back to `images[0]` if that file exists. `components/ui/project-card.tsx` is 16:10, `next/image` `fill` + `sizes`, and the fallback is a plain `--surface-sunk` block with a 1px `--rule` border and `aria-hidden`, with the big pale project-name plate removed. Body is `flex-1`, so tags and footer pin to the bottom. `app/page.tsx` and `app/projects/page.tsx` grids get `items-stretch`. `public/work/README.md` gets the new layout.
2. **Tokens + labels**: `app/globals.css` (`--slate`, `--baseline`, new `--baseline-line`, hatch → `--baseline-line`, `.prose th`). The `Eyebrow`, `Rail` and `Chip` primitives move to sentence-case Newsreader labels, with chips at 13px. Every hit in inventory 1/2/6 under `app/` and `components/` is converted. The hard-coded `#6B7681` in `mdx-components-server.tsx` is replaced (see note in REPORT).
3. **Tap targets**: a `touch` custom variant in `globals.css` = `@media (max-width: 640px), (pointer: coarse)`. Applied in `navigation.tsx` and `theme-toggle.tsx` (icon buttons and logo), `primitives/index.tsx` (Button sizes and link variant), `footer.tsx` links, `contact-content.tsx` links and copy button, `hero.tsx` email link and copy button, and the `app/page.tsx` closing CTA email link.
4. **Hero hierarchy**: `components/ui/hero.tsx`. Proof line under the sub-copy. Email row (mailto link + 44×44 copy button + polite live region) below the CTA row.
5. **Status line**: `components/ui/hero.tsx`.
6. **Outcomes without bars**: `delta-rule.tsx` → `outcome.tsx` (`OutcomeFigure`, `ScopeRule`). `data/outcomes.ts` drops `beforeLabel`/`afterLabel` and gains a TODO describing `{ before, after, unit }`. The bar CSS goes from `globals.css`. Callers: `hero.tsx` and `app/projects/[slug]/page.tsx`.
7. **Mobile length**: `app/page.tsx` (cards 3+ `max-sm:hidden` plus a bottom "All case studies →" link, principles reduced to their first sentence, posts 3+ hidden).
8. **Mono**: drop `font-mono` from labels, nav-adjacent chrome and footer. Keep it for email, dates, tags and figures. `layout.tsx` already uses `subsets: ["latin"]` and `display: "swap"` for JetBrains Mono.

### Eyebrows / labels found (all rendered via CSS `uppercase`; source text is already sentence case unless noted)

| Where | Text |
|---|---|
| `hero.tsx` | "Available for new projects · Cebu City, UTC+8 · N years" (rewritten in change 5), "Measured outcomes" |
| `delta-rule.tsx` | outcome labels "Application load time", "Legacy app performance", "Test coverage"; bar captions "Legacy build" / "After rework" / "Inherited" / "At handover" / "At delivery" (removed in change 6) |
| `app/page.tsx` via `Section` | "Selected work", "How I work", "Track record", "Writing", "Next step" |
| `project-card.tsx` | category (e.g. "AI / LLM Tools", "Chrome Extension", "Uptime monitoring"), "Read case study" |
| `experience-card.tsx` | date range "Mar 2025 – Present" (data, so it stays mono with uppercase dropped) |
| `post-card.tsx` | "Apr 2026 · 4 min read" (data, so it stays mono with uppercase dropped) |
| `footer.tsx` | "Work", "More", "Elsewhere", "Cebu City, Philippines · UTC+8" |
| `contact-content.tsx` | "Contact", "Response time", "Working hours", "Availability" |
| `app/projects/page.tsx` | "Work", "4 case studies · …categories" |
| `app/projects/[slug]/page.tsx` | "All case studies" back link, category, "Scope", "At a glance", "Problem" / "Approach" / "Outcome", "Stack", Rail labels |
| `app/experience/page.tsx` | "Experience", stat labels "First role" / "Total" / "Companies" / "Current" |
| `app/skills/page.tsx` | "Stack", legend "Core — daily" etc., level ("core" → "Core") |
| `about-content.tsx` | "About", principle titles, "Reach for daily", "Full stack breakdown", Rail labels |
| `blog-content.tsx`, `blog-post-content.tsx` | "Writing", tag list, "All writing" back link, post date, Rail labels |
| `now`, `uses`, `error`, `not-found` | "Now", "Uses", "Last updated …", "Error", "Reference …", "404" |
| `command-palette.tsx` | group headings "Navigate" / "Actions" / "Links", footer hints |
| `mdx-components-server.tsx` | code-language label, table headers, alert labels "Note" / "Caution" / … |

## Non-text uses of `--baseline`

| File:line | Use |
|---|---|
| `app/globals.css:213-219` | `.delta-track--baseline` hatch (`repeating-linear-gradient(var(--baseline) …)`) |
| `app/globals.css:72` | `--color-baseline` alias, which no utility (`*-baseline`) uses anywhere |

No text uses `--baseline`. Muted text is `text-slate` throughout.

## BEFORE

`node scripts/capture-screens.mjs screenshots/before` ran against `next start`
(production build of `70b2de8`), with reduced motion on.

| Metric | Value |
|---|---|
| `/` scrollHeight at 390 | **8,214px** |
| `/` measured-outcomes band height at 390 | 737px |
| `/` scrollHeight at 1440 | 5,418px |
| `/projects` scrollHeight at 390 / 1440 | 3,531 / 2,053px |
| `/contact` scrollHeight at 390 / 1440 | 2,598 / 1,537px |

Screenshots: `screenshots/before/{home,projects,contact}-{390,1440}-{light,dark}.png`.
These are git-ignored because they are too large to commit.

## Inventory

All commands exclude `node_modules`, `.next`, `package-lock.json`.
Inventory 7 is case-insensitive, so it also catches the hex values.

### 1. `uppercase` — 34 hits

```
scripts/generate-resume.mjs:112:    text-transform: uppercase;
app/experience/page.tsx:57:                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
app/opengraph-image.tsx:95:                      textTransform: 'uppercase',
app/globals.css:373:  text-transform: uppercase;
app/error.tsx:29:          <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/now/page.tsx:28:        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/projects/page.tsx:30:              <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/projects/[slug]/page.tsx:116:              className="group mb-10 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate transition-colors hover:text-in
app/projects/[slug]/page.tsx:274:      <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
app/skills/page.tsx:34:      <span className="w-20 shrink-0 text-right font-mono text-[0.625rem] uppercase tracking-[0.1em] text-slate">
app/skills/page.tsx:73:          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-rule pb-5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-slate">
app/uses/page.tsx:28:        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
components/ui/about-content.tsx:107:                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1">
components/ui/about-content.tsx:161:              className="mt-5 inline-block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate underline decoration-rule-strong underline-offset-4 tra
components/ui/blog-content.tsx:26:              <p className="mt-8 max-w-[60ch] font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.12em] text-slate">
components/ui/blog-post-content.tsx:33:              className="group mb-10 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate transition-colors hover:t
components/ui/experience-card.tsx:32:      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1.5">
components/ui/post-card.tsx:19:      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1.5">
components/ui/command-palette.tsx:234:                '[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.625rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-
components/ui/project-card.tsx:53:        <div className="flex items-baseline justify-between gap-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-slate">
components/ui/project-card.tsx:84:            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
components/ui/mdx-components-server.tsx:35:        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[#6B7681]">
components/ui/mdx-components-server.tsx:77:    <th className="px-4 py-2.5 text-left font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/mdx-components-server.tsx:119:      <p className="mb-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/footer.tsx:50:            <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
components/ui/contact-content.tsx:75:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:84:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:93:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/primitives/index.tsx:33:   Eyebrow — mono, uppercase. A label, nothing more.
components/ui/primitives/index.tsx:49:        'font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate',
components/ui/primitives/index.tsx:238:          <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/primitives/delta-rule.tsx:71:        <span className="max-w-[14ch] font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.14em] text-graphite">
components/ui/primitives/delta-rule.tsx:122:          'w-[6.5rem] shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.08em]',
components/ui/primitives/delta-rule.tsx:161:          <div className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
```

### 2. `tracking-|letter-spacing` — 43 hits

```
scripts/generate-resume.mjs:90:    letter-spacing: -0.01em;
scripts/generate-resume.mjs:113:    letter-spacing: 0.08em;
app/experience/page.tsx:57:                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
app/globals.css:94:  --text-display--letter-spacing: -0.035em;
app/globals.css:98:  --text-title--letter-spacing: -0.025em;
app/globals.css:102:  --text-heading--letter-spacing: -0.015em;
app/globals.css:249:  letter-spacing: -0.02em;
app/globals.css:374:  letter-spacing: 0.06em;
app/error.tsx:29:          <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/now/page.tsx:28:        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/projects/page.tsx:30:              <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/projects/[slug]/page.tsx:116:              className="group mb-10 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate transition-colors hover:text-in
app/projects/[slug]/page.tsx:274:      <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
app/skills/page.tsx:34:      <span className="w-20 shrink-0 text-right font-mono text-[0.625rem] uppercase tracking-[0.1em] text-slate">
app/skills/page.tsx:73:          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-rule pb-5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-slate">
app/skills/page.tsx:86:            <span className="ml-auto normal-case tracking-normal">
app/uses/page.tsx:28:        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
components/ui/about-content.tsx:107:                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1">
components/ui/about-content.tsx:161:              className="mt-5 inline-block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate underline decoration-rule-strong underline-offset-4 tra
components/ui/blog-post-content.tsx:33:              className="group mb-10 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate transition-colors hover:t
components/ui/command-palette.tsx:234:                '[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.625rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-
components/ui/project-card.tsx:45:            <span className="font-display text-[2.75rem] font-semibold leading-none tracking-tight text-rule-strong">
components/ui/project-card.tsx:53:        <div className="flex items-baseline justify-between gap-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-slate">
components/ui/project-card.tsx:55:          <span className="shrink-0 normal-case tracking-normal">
components/ui/project-card.tsx:84:            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
components/ui/primitives/index.tsx:49:        'font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate',
components/ui/primitives/index.tsx:238:          <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/primitives/delta-rule.tsx:71:        <span className="max-w-[14ch] font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.14em] text-graphite">
components/ui/primitives/delta-rule.tsx:122:          'w-[6.5rem] shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.08em]',
components/ui/primitives/delta-rule.tsx:161:          <div className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/footer.tsx:43:            <div className="font-display text-[0.9375rem] font-semibold tracking-tight text-ink">
components/ui/footer.tsx:50:            <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
components/ui/experience-card.tsx:32:      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1.5">
components/ui/experience-card.tsx:36:        <div className="mt-1 flex items-center gap-1.5 normal-case tracking-normal">
components/ui/navigation.tsx:53:            className="font-display text-[0.9375rem] font-semibold leading-none tracking-tight text-ink"
components/ui/post-card.tsx:19:      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1.5">
components/ui/blog-content.tsx:26:              <p className="mt-8 max-w-[60ch] font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.12em] text-slate">
components/ui/mdx-components-server.tsx:35:        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[#6B7681]">
components/ui/mdx-components-server.tsx:77:    <th className="px-4 py-2.5 text-left font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/mdx-components-server.tsx:119:      <p className="mb-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:75:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:84:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:93:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
```

### 3. `font-mono|JetBrains|--font-mono` — 56 hits

```
content/uses.mdx:19:- **JetBrains Rider** — when a .NET solution gets serious
content/uses.mdx:21:- **JetBrains Mono** — always, at size 13
README.md:75:| Data | JetBrains Mono | Figures, dates, labels, code |
app/experience/page.tsx:57:                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
app/experience/page.tsx:60:                <dd className="mt-1.5 font-mono text-[0.8125rem] text-ink">
app/layout.tsx:8:import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google";
app/layout.tsx:27:const jetbrainsMono = JetBrains_Mono({
app/page.tsx:145:                className="font-mono text-[0.75rem] text-graphite underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
app/globals.css:88:  --font-mono: var(--font-jetbrains), ui-monospace, SFMono-Regular, monospace;
app/error.tsx:29:          <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/now/page.tsx:28:        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/projects/page.tsx:30:              <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/projects/[slug]/page.tsx:116:              className="group mb-10 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate transition-colors hover:text-in
app/projects/[slug]/page.tsx:274:      <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/hero.tsx:76:              className="group inline-flex h-10 items-center gap-2 px-1 font-mono text-[0.75rem] text-graphite transition-colors hover:text-ink"
components/ui/hero.tsx:92:            <p className="font-mono text-[0.6875rem] text-slate">
components/ui/about-content.tsx:107:                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1">
components/ui/about-content.tsx:161:              className="mt-5 inline-block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate underline decoration-rule-strong underline-offset-4 tra
components/ui/blog-post-content.tsx:33:              className="group mb-10 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate transition-colors hover:t
components/ui/command-palette.tsx:234:                '[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.625rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-
components/ui/command-palette.tsx:264:        <div className="flex items-center justify-between gap-2 border-t border-rule px-3 py-2 font-mono text-[0.625rem] text-slate">
app/uses/page.tsx:28:        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
components/ui/project-card.tsx:53:        <div className="flex items-baseline justify-between gap-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-slate">
components/ui/project-card.tsx:79:            <span className="font-mono text-[0.8125rem] text-measure tabular-nums">
components/ui/project-card.tsx:84:            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/skills/page.tsx:28:      <span className="min-w-0 flex-1 truncate font-mono text-[0.8125rem] text-ink">
app/skills/page.tsx:31:      <span className="shrink-0 font-mono text-[0.6875rem] tabular-nums text-slate">
app/skills/page.tsx:34:      <span className="w-20 shrink-0 text-right font-mono text-[0.625rem] uppercase tracking-[0.1em] text-slate">
app/skills/page.tsx:73:          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-rule pb-5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-slate">
components/ui/contact-content.tsx:57:                className="group inline-flex h-10 items-center gap-2 border border-rule-strong px-3.5 font-mono text-[0.75rem] text-ink transition-colors hover:bor
components/ui/contact-content.tsx:75:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:84:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:93:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:147:          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-8 font-mono text-[0.75rem]">
components/ui/kbd.tsx:13:        'inline-flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-[2px] border border-rule bg-surface-sunk px-1 font-mono text-[0.625rem] leading-none tex
components/ui/post-card.tsx:19:      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1.5">
components/ui/post-card.tsx:33:          <div className="mt-3 font-mono text-[0.6875rem] text-slate">
components/ui/footer.tsx:50:            <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
components/ui/footer.tsx:85:        <div className="flex flex-col gap-3 border-t border-rule py-7 font-mono text-[0.6875rem] text-slate sm:flex-row sm:items-center sm:justify-between">
components/ui/mdx-components-server.tsx:35:        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[#6B7681]">
components/ui/mdx-components-server.tsx:77:    <th className="px-4 py-2.5 text-left font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/mdx-components-server.tsx:92:  return <td className="px-4 py-2.5 font-mono text-[0.8125rem]">{children}</td>;
components/ui/mdx-components-server.tsx:119:      <p className="mb-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/blog-content.tsx:26:              <p className="mt-8 max-w-[60ch] font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.12em] text-slate">
components/ui/experience-card.tsx:32:      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1.5">
components/ui/experience-card.tsx:80:          <p className="mt-3 font-mono text-[0.8125rem] text-measure tabular-nums">
components/ui/primitives/index.tsx:49:        'font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate',
components/ui/primitives/index.tsx:238:          <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/primitives/index.tsx:241:          <dd className="mt-1.5 font-mono text-[0.8125rem] leading-relaxed text-ink">
components/ui/primitives/index.tsx:264:        'inline-flex items-center border border-rule bg-surface px-2 py-0.5 font-mono text-[0.6875rem] text-graphite',
components/ui/primitives/delta-rule.tsx:71:        <span className="max-w-[14ch] font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.14em] text-graphite">
components/ui/primitives/delta-rule.tsx:74:        <span className="font-mono text-3xl font-medium leading-none text-measure tabular-nums sm:text-[2.125rem]">
components/ui/primitives/delta-rule.tsx:97:        <p className="mt-4 max-w-[42ch] font-mono text-[0.625rem] leading-relaxed text-slate">
components/ui/primitives/delta-rule.tsx:122:          'w-[6.5rem] shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.08em]',
components/ui/primitives/delta-rule.tsx:161:          <div className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/primitives/delta-rule.tsx:164:          <div className="mt-1 font-mono text-[0.8125rem] text-ink">{item.value}</div>
```

### 4. `·|&middot;|\\u00b7` — 15 hits

```
resume.md:7:[johnlloydlawas06@gmail.com](mailto:johnlloydlawas06@gmail.com) · +63 962 690 5612 · [linkedin.com/in/john-lloyd-lawas](https://www.linkedin.com/in/john-lloyd-lawas/) · [johnlloydlawas.
resume.md:33:**March 2025 – Present** · Remote
resume.md:45:**December 2022 – March 2025** · Remote
app/opengraph-image.tsx:142:            ASP.NET Core &middot; Angular &middot; TypeScript &middot; React
app/opengraph-image.tsx:143:            &middot; Next.js
app/opengraph-image.tsx:145:          <span>Cebu City, PH &middot; UTC+8 &middot; Available</span>
app/projects/page.tsx:31:                {projects.length} case studies · {categories.join(' · ')}
app/skills/page.tsx:87:              {all.length} technologies · {core.length} core
components/ui/hero.tsx:35:              Available for new projects · Cebu City, UTC+8 · {years} years
components/ui/experience-card.tsx:40:              <span aria-hidden="true">·</span>
components/ui/post-card.tsx:21:        <span className="mx-2 text-rule-strong sm:hidden">·</span>
components/ui/post-card.tsx:34:            {post.tags.slice(0, 3).join(' · ')}
components/ui/contact-content.tsx:172:            <span className="text-slate">Cebu City, Philippines · UTC+8</span>
components/ui/footer.tsx:51:              Cebu City, Philippines · UTC+8
components/ui/blog-content.tsx:27:                {tags.slice(0, 12).join(' · ')}
```

### 5. `h-8 w-8|size-8|w-8 h-8|h-7|size-7|h-9 w-9|size-9` — 3 hits

```
components/ui/theme-toggle.tsx:14:      className="inline-flex h-8 w-8 items-center justify-center rounded-[3px] text-graphite transition-colors hover:bg-surface hover:text-ink"
components/ui/navigation.tsx:85:              className="inline-flex h-8 w-8 items-center justify-center rounded-[3px] text-graphite transition-colors hover:bg-surface hover:text-ink"
components/ui/navigation.tsx:97:              className="inline-flex h-8 w-8 items-center justify-center rounded-[3px] text-graphite transition-colors hover:bg-surface hover:text-ink md:hidden"
```

### 6. `text-\[1[01]px\]|text-\[0\.6|text-\[0\.7|text-xs|font-size:\s*1[01]px` — 42 hits

```
app/experience/page.tsx:57:                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
app/page.tsx:145:                className="font-mono text-[0.75rem] text-graphite underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
app/error.tsx:29:          <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/now/page.tsx:28:        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/projects/page.tsx:30:              <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/projects/[slug]/page.tsx:116:              className="group mb-10 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate transition-colors hover:text-in
app/projects/[slug]/page.tsx:274:      <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/blog-content.tsx:26:              <p className="mt-8 max-w-[60ch] font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.12em] text-slate">
components/ui/hero.tsx:76:              className="group inline-flex h-10 items-center gap-2 px-1 font-mono text-[0.75rem] text-graphite transition-colors hover:text-ink"
components/ui/hero.tsx:92:            <p className="font-mono text-[0.6875rem] text-slate">
components/ui/about-content.tsx:107:                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1">
components/ui/about-content.tsx:161:              className="mt-5 inline-block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate underline decoration-rule-strong underline-offset-4 tra
components/ui/blog-post-content.tsx:33:              className="group mb-10 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate transition-colors hover:t
components/ui/command-palette.tsx:234:                '[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.625rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-
components/ui/command-palette.tsx:264:        <div className="flex items-center justify-between gap-2 border-t border-rule px-3 py-2 font-mono text-[0.625rem] text-slate">
app/skills/page.tsx:31:      <span className="shrink-0 font-mono text-[0.6875rem] tabular-nums text-slate">
app/skills/page.tsx:34:      <span className="w-20 shrink-0 text-right font-mono text-[0.625rem] uppercase tracking-[0.1em] text-slate">
app/skills/page.tsx:73:          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-rule pb-5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-slate">
components/ui/project-card.tsx:53:        <div className="flex items-baseline justify-between gap-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-slate">
components/ui/project-card.tsx:84:            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/uses/page.tsx:28:        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
components/ui/footer.tsx:50:            <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
components/ui/footer.tsx:85:        <div className="flex flex-col gap-3 border-t border-rule py-7 font-mono text-[0.6875rem] text-slate sm:flex-row sm:items-center sm:justify-between">
components/ui/contact-content.tsx:57:                className="group inline-flex h-10 items-center gap-2 border border-rule-strong px-3.5 font-mono text-[0.75rem] text-ink transition-colors hover:bor
components/ui/contact-content.tsx:75:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:84:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:93:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:147:          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-8 font-mono text-[0.75rem]">
components/ui/kbd.tsx:13:        'inline-flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-[2px] border border-rule bg-surface-sunk px-1 font-mono text-[0.625rem] leading-none tex
components/ui/post-card.tsx:19:      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1.5">
components/ui/post-card.tsx:33:          <div className="mt-3 font-mono text-[0.6875rem] text-slate">
components/ui/primitives/index.tsx:49:        'font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate',
components/ui/primitives/index.tsx:238:          <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/primitives/index.tsx:264:        'inline-flex items-center border border-rule bg-surface px-2 py-0.5 font-mono text-[0.6875rem] text-graphite',
components/ui/experience-card.tsx:32:      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1.5">
components/ui/mdx-components-server.tsx:35:        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[#6B7681]">
components/ui/mdx-components-server.tsx:77:    <th className="px-4 py-2.5 text-left font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/mdx-components-server.tsx:119:      <p className="mb-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/primitives/delta-rule.tsx:71:        <span className="max-w-[14ch] font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.14em] text-graphite">
components/ui/primitives/delta-rule.tsx:97:        <p className="mt-4 max-w-[42ch] font-mono text-[0.625rem] leading-relaxed text-slate">
components/ui/primitives/delta-rule.tsx:122:          'w-[6.5rem] shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.08em]',
components/ui/primitives/delta-rule.tsx:161:          <div className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
```

### 7. `slate|baseline|#6b7681|#616b76|#7c8794` — 81 hits

```
data/experience.ts:79:      'Translated technical designs into functional code for backend and frontend',
resume.md:58:- Translated technical designs into functional code for backend and frontend.
content/posts/cursor-composer-rules-that-work.mdx:17:The problem with prompts is that they're temporary. Every new chat is a blank slate. If you have to re-explain "we use Xano for the backend, Supaba
README.md:31:4.6:1). `--slate` carries eyebrows, rail labels and captions at 10–11px, so it
README.md:33:`--baseline` exists precisely so the delta rule's "before" bar can stay light
README.md:37:protanopia collapses `--measure` and `--baseline` to a 1.02:1 value ratio —
README.md:38:indistinguishable. The baseline bar is therefore *hatched* and the measured bar
README.md:58:| `--slate` | `#616B76` | `#7C8794` | Labels, captions, tertiary |
README.md:59:| `--baseline` | `#8A939E` | `#6B7681` | The "before" bar in a delta — **not** a text colour |
app/experience/page.tsx:57:                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
app/page.tsx:140:                  className="transition-transform group-hover:translate-x-0.5"
app/opengraph-image.tsx:15:const SLATE = '#8A939E';
app/opengraph-image.tsx:97:                      color: SLATE,
app/opengraph-image.tsx:113:                        background: SLATE,
app/globals.css:25:  --slate: #616b76;    /* 4.6:1  */
app/globals.css:27:  /* The "before" state in a measurement. Deliberately not --slate: it must
app/globals.css:29:  --baseline: #8a939e;
app/globals.css:58:  --slate: #7c8794;    /* 5.1:1  */
app/globals.css:60:  --baseline: #6b7681;
app/globals.css:78:  --color-slate: var(--slate);
app/globals.css:79:  --color-baseline: var(--baseline);
app/globals.css:178:/* The baseline is hatched, the measured result is solid.
app/globals.css:183:.delta-track--baseline {
app/globals.css:186:    var(--baseline) 0 1.5px,
app/globals.css:202:    transform: translateY(10px);
app/globals.css:349:  color: var(--slate);
app/error.tsx:29:          <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/now/page.tsx:28:        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/projects/page.tsx:30:              <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/projects/[slug]/page.tsx:116:              className="group mb-10 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate transition-colors hover:text-in
app/projects/[slug]/page.tsx:121:                className="transition-transform group-hover:-translate-x-0.5"
app/projects/[slug]/page.tsx:274:      <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
app/uses/page.tsx:28:        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
app/skills/page.tsx:19:    <div className="flex items-baseline gap-3 border-b border-rule py-2 last:border-b-0">
app/skills/page.tsx:21:        className={cn('h-1.5 w-1.5 shrink-0 translate-y-[-1px] rounded-full', {
app/skills/page.tsx:31:      <span className="shrink-0 font-mono text-[0.6875rem] tabular-nums text-slate">
app/skills/page.tsx:34:      <span className="w-20 shrink-0 text-right font-mono text-[0.625rem] uppercase tracking-[0.1em] text-slate">
app/skills/page.tsx:73:          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-rule pb-5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-slate">
components/ui/hero.tsx:67:                className="transition-transform group-hover:translate-x-0.5"
components/ui/hero.tsx:90:          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
components/ui/hero.tsx:92:            <p className="font-mono text-[0.6875rem] text-slate">
components/ui/about-content.tsx:107:                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1">
components/ui/about-content.tsx:140:                  className="transition-transform group-hover:translate-x-0.5"
components/ui/about-content.tsx:161:              className="mt-5 inline-block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate underline decoration-rule-strong underline-offset-4 tra
components/ui/blog-post-content.tsx:33:              className="group mb-10 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate transition-colors hover:t
components/ui/blog-post-content.tsx:38:                className="transition-transform group-hover:-translate-x-0.5"
components/ui/command-palette.tsx:216:          <Search size={15} strokeWidth={1.75} className="shrink-0 text-slate" />
components/ui/command-palette.tsx:220:            className="h-12 w-full bg-transparent font-display text-sm text-ink outline-none focus:outline-none focus-visible:outline-none placeholder:text-slate"
components/ui/command-palette.tsx:234:                '[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.625rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-
components/ui/command-palette.tsx:264:        <div className="flex items-center justify-between gap-2 border-t border-rule px-3 py-2 font-mono text-[0.625rem] text-slate">
components/ui/project-card.tsx:53:        <div className="flex items-baseline justify-between gap-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-slate">
components/ui/project-card.tsx:81:              <span className="text-slate">{outcome.label.toLowerCase()}</span>
components/ui/project-card.tsx:84:            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
components/ui/project-card.tsx:91:            className="shrink-0 text-slate transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
components/ui/primitives/index.tsx:49:        'font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate',
components/ui/primitives/index.tsx:238:          <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/primitives/delta-rule.tsx:9:  /** Caption for the baseline track, e.g. "Legacy build". */
components/ui/primitives/delta-rule.tsx:15:  /** Length of the "after" track relative to the baseline. 0.5 = halved. */
components/ui/primitives/delta-rule.tsx:24: * The baseline is drawn in graphite, the measured result in `--measure`.
components/ui/primitives/delta-rule.tsx:83:          tone="baseline"
components/ui/primitives/delta-rule.tsx:97:        <p className="mt-4 max-w-[42ch] font-mono text-[0.625rem] leading-relaxed text-slate">
components/ui/primitives/delta-rule.tsx:114:  tone: 'baseline' | 'measured';
components/ui/primitives/delta-rule.tsx:123:          tone === 'measured' ? 'text-ink' : 'text-slate'
components/ui/primitives/delta-rule.tsx:139:              : 'delta-track--baseline'
components/ui/primitives/delta-rule.tsx:161:          <div className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/experience-card.tsx:32:      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1.5">
components/ui/experience-card.tsx:51:        <div className="flex flex-wrap items-baseline gap-x-2">
components/ui/experience-card.tsx:62:              className="shrink-0 text-slate transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
components/ui/experience-card.tsx:82:            <span className="text-slate">{outcome.label.toLowerCase()}</span>
components/ui/post-card.tsx:19:      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1.5">
components/ui/post-card.tsx:33:          <div className="mt-3 font-mono text-[0.6875rem] text-slate">
components/ui/mdx-components-server.tsx:35:        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[#6B7681]">
components/ui/mdx-components-server.tsx:77:    <th className="px-4 py-2.5 text-left font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/mdx-components-server.tsx:119:      <p className="mb-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:75:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:84:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:93:              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
components/ui/contact-content.tsx:172:            <span className="text-slate">Cebu City, Philippines · UTC+8</span>
components/ui/footer.tsx:50:            <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
components/ui/footer.tsx:85:        <div className="flex flex-col gap-3 border-t border-rule py-7 font-mono text-[0.6875rem] text-slate sm:flex-row sm:items-center sm:justify-between">
components/ui/blog-content.tsx:26:              <p className="mt-8 max-w-[60ch] font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.12em] text-slate">
```

### 8. Footer + contact link classes

```
components/ui/contact-content.tsx:152:              className="text-graphite underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
components/ui/contact-content.tsx:160:              className="text-graphite underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
components/ui/contact-content.tsx:168:              className="text-graphite underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
components/ui/footer.tsx:66:                        className="font-display text-[0.8125rem] text-graphite transition-colors hover:text-ink"
components/ui/footer.tsx:73:                        className="font-display text-[0.8125rem] text-graphite transition-colors hover:text-ink"
```
