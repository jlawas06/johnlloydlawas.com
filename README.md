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
   and the marks that belong to it (delta tracks, outcome ticks).
2. **A live status** — availability, a currently-held role. Facts that are true
   right now rather than claims.

Nothing else earns it. Success checkmarks, affirmative list bullets and
skill-level dots all deliberately use ink or a value ramp instead — they read
the same and they keep the colour meaningful.

Monospace carries figures, dates, labels and code; it never sets body copy.

### Two constraints that are easy to break

**Every step of the ink ramp clears WCAG AA on `--paper`** (15.2:1 / 7.4:1 /
4.6:1). `--slate` carries eyebrows, rail labels and captions at 10–11px, so it
is text, not decoration — if you lighten it, that text stops being readable.
`--baseline` exists precisely so the delta rule's "before" bar can stay light
without dragging label text along with it.

**The delta rule never encodes before/after with colour alone.** Simulated
protanopia collapses `--measure` and `--baseline` to a 1.02:1 value ratio —
indistinguishable. The baseline bar is therefore *hatched* and the measured bar
*solid*, so the comparison survives with no colour perception at all. Bar
length and the printed figure are the third and fourth redundant encodings.
Do not "clean up" the hatch into a flat fill.

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
| `--slate` | `#616B76` | `#7C8794` | Labels, captions, tertiary |
| `--baseline` | `#8A939E` | `#6B7681` | The "before" bar in a delta — **not** a text colour |
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
| Body | Newsreader | Prose, descriptions |
| Data | JetBrains Mono | Figures, dates, labels, code |

The OG image in [`app/opengraph-image.tsx`](app/opengraph-image.tsx) duplicates
the light palette as literal hex — Satori cannot read CSS variables. **Change
both together.**

### The delta rule

The signature element: a two-track measurement instrument drawn from real
numbers, in [`components/ui/primitives/delta-rule.tsx`](components/ui/primitives/delta-rule.tsx).

All figures come from [`data/outcomes.ts`](data/outcomes.ts), keyed by project
slug, so the home page and case studies can never disagree. **Only add an entry
when the number was actually measured.** Projects without one render `ScopeRule`
instead — never a fabricated delta.

## Content

| Source | Holds |
|---|---|
| `content/projects/*.mdx` | Case study narrative + frontmatter (problem / approach / outcome) |
| `content/posts/*.mdx` | Blog posts |
| `content/now.mdx`, `content/uses.mdx` | Standalone pages |
| `data/personal.ts` | Name, contact, bio, meta description |
| `data/experience.ts` | Employment record |
| `data/skills.ts` | Stack breakdown |
| `data/outcomes.ts` | Measured deltas |

A leading `# Heading` in any MDX body is stripped on load (`stripLeadingH1` in
[`lib/utils.ts`](lib/utils.ts)) — the page chrome already renders the title.

Screenshots go in `public/work/<slug>/`. See
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
| `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` | Overrides the default chat webhook |
