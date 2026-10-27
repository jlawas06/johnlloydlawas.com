# Case study screenshots

## Card image

One image per case study, used as the card thumbnail on `/` and `/projects`:

```
public/work/<project-slug>.webp
```

The slug must match the MDX filename in `content/projects/`. Each project's
frontmatter already points at it, along with the alt text:

```yaml
image:
  src: "/work/answerit-ai.webp"
  alt: "AnswerIt AI snip overlay capturing a question on screen"
```

Whether the file exists is checked at build time (`lib/projects.ts`). Until it
does, the card shows a plain 16:10 plate. That is a deliberate empty state,
not a broken image, so files can be added one at a time.

## Gallery (optional)

Extra screenshots for the case study page go in a folder per project and are
listed in an `images` array. Every entry renders full-width on the case study
page. If a project has no `image`, the first gallery entry is used for the card.

```
public/work/<project-slug>/01-<short-name>.webp
```

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
| Weight | Under 200 KB each. `cwebp -q 80` is a good default |
| Content | Real UI. Crop out browser chrome, personal data, and client identifiers you cannot show. |

Cards crop to `object-cover object-top`, so keep the important content in the
top two thirds of the frame.

## Priority

1. `answerit-ai`: the paid product, the strongest client proof
2. `youtubely`: shipped on the Chrome Web Store
3. `tigerup`, `olj-copilot`
