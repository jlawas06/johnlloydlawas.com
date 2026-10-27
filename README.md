# johnlloydlawas.com

Personal site and portfolio for John Lloyd Lawas — full-stack engineer, Cebu City (UTC+8).

Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, and MDX.

## Design system — "Instrument"

One rule governs the whole site:

> **Monospace and saturated colour are reserved for measurement.**
> Everything else is ink on paper.

Nav, headings, buttons and body copy are all ink — no colour. `--measure` is the
only saturated value in the palette, and it is permitted in exactly two places:

1. **A measured outcome** — a figure that was actually measured on shipped work,
   and the marks that belong to it (outcome ticks).
2. **A live status** — availability, a currently-held role. Facts that are true
   right now rather than claims.

Nothing else earns it. Success checkmarks, affirmative list bullets and
skill-level dots all deliberately use ink or a value ramp instead — they read
the same and they keep the colour meaningful.

Monospace carries the email address, dates, tags, figures and code. It never
sets labels or body copy. Labels are sentence case in the body face, never
tracked capitals.

### Two constraints that are easy to break

**Every text step clears WCAG AA (4.5:1) on paper, surface and sunk, in both
themes.** `--slate` and `--baseline` carry labels and captions, so they are
text, not decoration. If you lighten them, that text stops being readable.
`python3 scripts/contrast-table.py` prints the current ratios, and
`tests/ui.spec.ts` checks every page in both themes.

**No figure is drawn more precisely than it was measured.** Outcomes are a
printed figure, a label and a source line. There are no bars, because the
data holds a percentage rather than before/after values. A bar comes back only
with real measurements (see the TODO in `data/outcomes.ts`). When it does,
encode before/after with shape as well as colour: simulated protanopia
collapses `--measure` against the muted ramp.

Keeping that rule is what stops the design drifting into decoration. If a new
element wants colour or mono, it has to justify itself as data.

### Tokens

Defined once in [`app/globals.css`](app/globals.css) and bridged to Tailwind via
`@theme inline`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#EBEDEF` | `#101418` | Page ground |
| `--surface` | `#FFFFFF` | `#161B21` | Cards, panels |
| `--surface-sunk` | `#E3E6EA` | `#1D242B` | Inset tracks, code |
| `--ink` | `#14181D` | `#E7EAED` | Primary text |
| `--graphite` | `#434C56` | `#98A2AE` | Secondary text |
| `--slate` | `#4F5964` | `#8D97A3` | Labels, captions, tertiary |
| `--baseline` | `#5A6470` | `#848E9A` | Quietest text step (clears 4.5:1 everywhere) |
| `--rule` / `--rule-strong` | `#D3D8DE` / `#B9C1CA` | `#262D35` / `#384049` | Hairlines |
| `--measure` | `#0B6E52` | `#4EC9A5` | **Measured results only** |

> Hand-written CSS must reference the concrete `next/font` variables
> (`--font-archivo`, `--font-newsreader`, `--font-jetbrains`), **not** the
> `@theme inline` aliases. Those aliases are inlined into utilities and are not
> emitted as usable custom properties, so `var(--font-display)` in plain CSS
> silently invalidates the whole declaration.

### Type

| Role | Face | Use |
|---|---|---|
| Display | Archivo (variable, `wdth` 112) | Headings, UI chrome |
| Body | Newsreader | Prose, descriptions, labels (13–14px, `--slate`) |
| Data | JetBrains Mono | Email address, dates, tags, figures, code |

Nothing is set below 12px. Tag chips are 13px. On phones and coarse pointers
the `touch:` variant gives every control a 44px hit area.

The OG image in [`app/opengraph-image.tsx`](app/opengraph-image.tsx) duplicates
the light palette as literal hex — Satori cannot read CSS variables. **Change
both together.**

### Measured outcomes

A large figure in `--measure`, what it measures, and where the measurement came
from, in [`components/ui/primitives/outcome.tsx`](components/ui/primitives/outcome.tsx).

All figures come from [`data/outcomes.ts`](data/outcomes.ts), keyed by project
slug, so the home page and case studies can never disagree. **Only add an entry
when the number was actually measured.** Projects without one render `ScopeRule`
instead, never a fabricated figure.

## Content

| Source | Holds |
|---|---|
| `content/projects/*.mdx` | Case study narrative + frontmatter (problem / approach / outcome) |
| `content/posts/*.mdx` | Blog posts |
| `content/now.mdx`, `content/uses.mdx` | Standalone pages |
| `data/personal.ts` | Name, contact, bio, meta description |
| `data/experience.ts` | Employment record |
| `data/skills.ts` | Stack breakdown |
| `data/outcomes.ts` | Measured outcomes |

A leading `# Heading` in any MDX body is stripped on load (`stripLeadingH1` in
[`lib/utils.ts`](lib/utils.ts)) — the page chrome already renders the title.

Card images go in `public/work/<slug>.webp`. See
[`public/work/README.md`](public/work/README.md) for specs.

## Development

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

Regenerate the résumé PDF from `resume.md`:

```bash
npm run resume:pdf
```

## Environment

All optional.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console |
