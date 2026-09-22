# Case study screenshots

Drop screenshots here, then reference them from the project's MDX frontmatter.

## Layout

```
public/work/<project-slug>/01-<short-name>.webp
```

The slug must match the MDX filename in `content/projects/`.

## Frontmatter

Add an `images` array. The first entry is the card thumbnail on `/` and
`/projects`; every entry renders full-width on the case study page.

```yaml
images:
  - "/work/answerit-ai/01-capture-overlay.webp"
  - "/work/answerit-ai/02-answer-panel.webp"
```

## Specs

| | |
|---|---|
| Format | WebP (or PNG if transparency is needed) |
| Size | 1600 × 1000 (16:10), the aspect the card crops to |
| Weight | Under 300 KB each — `cwebp -q 82` is a good default |
| Content | Real UI. Crop out browser chrome, personal data, and client identifiers you cannot show. |

Cards crop to `object-cover object-top`, so keep the important content in the
top two thirds of the frame.

## Priority

1. `answerit-ai` — the paid product, the strongest client proof
2. `youtubely` — shipped on the Chrome Web Store
3. Enterprise work, only where NDAs allow it

Until an `images` array exists, cards fall back to a typographic plate. That is
a deliberate empty state, not a broken image — the page is complete without it.
