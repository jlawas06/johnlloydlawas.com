import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

/**
 * UI acceptance checks for the accessibility / scanability pass.
 * See PLAN.md and REPORT.md for where each threshold comes from.
 */

const PAGES = ['/', '/projects', '/contact'] as const;
const THEMES = ['light', 'dark'] as const;

const MOBILE = {
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
};
const DESKTOP = { viewport: { width: 1440, height: 900 } };

/** `/` at 390px on 70b2de8, before this pass (PLAN.md). */
const HOME_HEIGHT_BEFORE_390 = 8214;

const PROOF_LINE =
  'Cut application load time by 50% across 5+ ASP.NET applications (2019–2022).';

/**
 * WCAG 2.5.8 inline exception: links inside a sentence of running prose are
 * sized by the line they sit in, so they are exempt from the 44px check.
 */
const INLINE_PROSE_LINKS = ['.prose a', 'p a'];

async function open(page: Page, path: string, theme: 'light' | 'dark' = 'light') {
  await page.addInitScript((t) => {
    try {
      localStorage.setItem('theme', t);
    } catch {}
  }, theme);
  await page.goto(path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
}

/** Visible text nodes with their element, colour, background and size. */
async function textSamples(page: Page) {
  return page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

    /* Canvas resolves any CSS colour (rgb, oklab, color-mix…) to sRGB bytes. */
    const rgba = (css: string): [number, number, number, number] => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = '#000';
      ctx.fillStyle = css;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return [r, g, b, a / 255];
    };
    const lum = ([r, g, b]: number[]) => {
      const c = [r, g, b].map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };
    const background = (el: Element | null) => {
      for (let node = el; node; node = node.parentElement) {
        const bg = rgba(getComputedStyle(node).backgroundColor);
        if (bg[3] >= 0.99) return bg;
      }
      return rgba(getComputedStyle(document.body).backgroundColor);
    };

    const out: {
      text: string;
      tag: string;
      ratio: number;
      fontSize: number;
    }[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const text = n.textContent?.trim();
      const el = n.parentElement;
      if (!text || !el || el.closest('script, style, noscript, svg')) continue;
      if (!el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
      const range = document.createRange();
      range.selectNodeContents(n);
      const rect = range.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) continue;

      const style = getComputedStyle(el);
      const fg = rgba(style.color);
      const bg = background(el);
      const [l1, l2] = [lum(fg), lum(bg)].sort((a, b) => b - a);
      out.push({
        text: text.slice(0, 60),
        tag: el.tagName.toLowerCase() + (el.className ? `.${String(el.className).split(' ')[0]}` : ''),
        ratio: Math.round(((l1 + 0.05) / (l2 + 0.05)) * 100) / 100,
        fontSize: parseFloat(style.fontSize),
      });
    }
    return out;
  });
}

/* ------------------------------------------------------------------
   Contrast, type size, tracked caps
   ------------------------------------------------------------------ */

for (const theme of THEMES) {
  for (const [label, device] of [
    ['390', MOBILE],
    ['1440', DESKTOP],
  ] as const) {
    test.describe(`${theme} @ ${label}`, () => {
      test.use(device);

      for (const path of PAGES) {
        test(`contrast ≥ 4.5:1 on ${path}`, async ({ page }) => {
          await open(page, path, theme);

          const axe = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
          expect(
            axe.violations.flatMap((v) => v.nodes.map((n) => n.target.join(' ')))
          ).toEqual([]);

          const low = (await textSamples(page)).filter((s) => s.ratio < 4.5);
          expect(low).toEqual([]);
        });

        test(`no text below 12px on ${path}`, async ({ page }) => {
          await open(page, path, theme);
          const small = (await textSamples(page)).filter((s) => s.fontSize < 12);
          expect(small).toEqual([]);

          const chips = await page
            .locator('[data-chip]')
            .evaluateAll((els) => els.map((el) => parseFloat(getComputedStyle(el).fontSize)));
          expect(chips.filter((size) => size < 13)).toEqual([]);
        });
      }
    });
  }
}

test.describe('home labels', () => {
  test.use(DESKTOP);

  test('no tracked all-caps on /', async ({ page }) => {
    await open(page, '/');
    const tracked = await page.evaluate(() =>
      [...document.querySelectorAll('body *')]
        .filter((el) => {
          const s = getComputedStyle(el);
          const spacing = parseFloat(s.letterSpacing) || 0;
          return s.textTransform === 'uppercase' && spacing > 0.05 * parseFloat(s.fontSize);
        })
        .map((el) => el.textContent?.trim().slice(0, 40))
    );
    expect(tracked).toEqual([]);
  });
});

/* ------------------------------------------------------------------
   Touch targets and layout at 390
   ------------------------------------------------------------------ */

test.describe('mobile 390', () => {
  test.use(MOBILE);

  for (const path of PAGES) {
    test(`tap targets ≥ 44×44 on ${path}`, async ({ page }) => {
      await open(page, path);
      const small = await page.evaluate((exempt) => {
        const isInlineProse = (el: Element) =>
          exempt.some((sel) => el.matches(sel)) && getComputedStyle(el).display === 'inline';

        return [...document.querySelectorAll('a, button, [role=button], input')]
          .filter((el) => el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }))
          .filter((el) => !isInlineProse(el))
          .map((el) => {
            const r = el.getBoundingClientRect();
            return {
              el: el.outerHTML.slice(0, 90),
              w: Math.round(r.width * 10) / 10,
              h: Math.round(r.height * 10) / 10,
            };
          })
          .filter((t) => t.w > 0 && (t.w < 44 || t.h < 44));
      }, INLINE_PROSE_LINKS);
      expect(small).toEqual([]);
    });

    test(`no horizontal scroll on ${path}`, async ({ page }) => {
      await open(page, path);
      const width = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(width).toBeLessThanOrEqual(390);
    });
  }

  test('status line is one line, no dots, no years', async ({ page }) => {
    await open(page, '/');
    const status = page.locator('[data-status-line]');
    const info = await status.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        text: el.textContent ?? '',
        height: el.getBoundingClientRect().height,
        lineHeight: parseFloat(s.lineHeight),
        overflow: s.textOverflow,
        fontSize: parseFloat(s.fontSize),
      };
    });
    expect(info.text).toContain('Available for new projects — Cebu City (UTC+8)');
    expect(info.text).not.toContain('·');
    expect(info.text).not.toMatch(/\d+\s*years/i);
    expect(info.overflow).not.toBe('ellipsis');
    expect(info.fontSize).toBeGreaterThanOrEqual(12);
    expect(info.height).toBeLessThanOrEqual(1.6 * info.lineHeight);
  });

  test('home is ≤ 70% of its old height and trims are display:none', async ({ page }) => {
    await open(page, '/');
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(`home scrollHeight @390: ${height} (before ${HOME_HEIGHT_BEFORE_390})`);
    expect(height).toBeLessThanOrEqual(HOME_HEIGHT_BEFORE_390 * 0.7);

    /* First two shown, the rest display:none (so not focusable either). */
    const displays = (sel: string) =>
      page.locator(sel).evaluateAll((els) => els.map((el) => getComputedStyle(el).display));
    for (const sel of ['#work a[href^="/projects/"]', '#writing a[href^="/blog/"]']) {
      const shown = (await displays(sel)).map((d) => d !== 'none');
      expect(shown.slice(0, 2)).toEqual([true, true]);
      expect(shown.slice(2).every((s) => !s)).toBe(true);
    }
    await expect(page.locator('#work a[href="/projects"]:visible')).toHaveCount(1);
  });

  test('no layout shift on /', async ({ page }) => {
    await open(page, '/');
    const cls = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let total = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as (PerformanceEntry & {
              value: number;
              hadRecentInput: boolean;
            })[]) {
              if (!entry.hadRecentInput) total += entry.value;
            }
          }).observe({ type: 'layout-shift', buffered: true });
          setTimeout(() => resolve(total), 1000);
        })
    );
    expect(cls).toBeLessThan(0.02);
  });
});

/* ------------------------------------------------------------------
   Header chrome on desktop
   ------------------------------------------------------------------ */

test.describe('desktop 1440', () => {
  test.use(DESKTOP);

  test('header icon buttons stay 32×32 with a mouse', async ({ page }) => {
    await open(page, '/');
    for (const name of [/search/i, /switch to (dark|light) theme/i]) {
      const box = await page.getByRole('button', { name }).boundingBox();
      expect(box?.width).toBe(32);
      expect(box?.height).toBe(32);
    }
  });

  test('focus ring shows on keyboard focus', async ({ page }) => {
    await open(page, '/');
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      const outline = await page.evaluate(() => {
        const s = getComputedStyle(document.activeElement!);
        return { style: s.outlineStyle, width: parseFloat(s.outlineWidth) };
      });
      expect(outline.style).toBe('solid');
      expect(outline.width).toBeGreaterThanOrEqual(2);
    }
  });

  test('case-study cards in a row share a height on /projects', async ({ page }) => {
    await open(page, '/projects');
    const boxes = await page
      .locator('[data-card-media]')
      .evaluateAll((els) =>
        els.map((el) => el.closest('a')!.getBoundingClientRect()).map((r) => ({
          top: Math.round(r.top),
          height: r.height,
        }))
      );
    const rows = new Map<number, number[]>();
    for (const b of boxes) rows.set(b.top, [...(rows.get(b.top) ?? []), b.height]);
    for (const heights of rows.values()) {
      expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(1);
    }
  });
});

/* ------------------------------------------------------------------
   Card media, hero, outcomes at both widths
   ------------------------------------------------------------------ */

for (const [label, device] of [
  ['390', MOBILE],
  ['1440', DESKTOP],
] as const) {
  test.describe(`layout @ ${label}`, () => {
    test.use(device);

    for (const path of ['/', '/projects']) {
      test(`card media is 16:10 on ${path}`, async ({ page }) => {
        await open(page, path);
        const media = await page.locator('[data-card-media]').evaluateAll((els) =>
          els
            .filter((el) => el.checkVisibility())
            .map((el) => {
              const r = el.getBoundingClientRect();
              const img = el.querySelector('img');
              return {
                ratio: r.width / r.height,
                text: img ? '' : (el.textContent ?? '').trim(),
                alt: img ? img.getAttribute('alt') : null,
                sizes: img ? img.getAttribute('sizes') : null,
                hasImg: Boolean(img),
              };
            })
        );
        expect(media.length).toBeGreaterThan(0);
        for (const m of media) {
          expect(Math.abs(m.ratio - 1.6)).toBeLessThanOrEqual(0.01);
          if (m.hasImg) {
            expect(m.alt).toBeTruthy();
            expect(m.sizes).toBeTruthy();
          } else {
            expect(m.text).toBe('');
          }
        }
      });
    }

    test('hero reads H1 → sub-copy → proof → CTAs → email', async ({ page }) => {
      await open(page, '/');
      const order = await page.evaluate(() => {
        const sel = [
          'h1',
          '[data-hero-subcopy]',
          '[data-hero-proof]',
          '[data-hero-ctas]',
          '[data-hero-email]',
        ];
        const els = sel.map((s) => document.querySelector(s));
        if (els.some((el) => !el)) return sel.filter((_, i) => !els[i]);
        return els.slice(1).every(
          (el, i) =>
            els[i]!.compareDocumentPosition(el!) & Node.DOCUMENT_POSITION_FOLLOWING
        );
      });
      expect(order).toBe(true);

      await expect(page.locator('[data-hero-proof]')).toHaveText(PROOF_LINE);

      const ctas = await page.locator('[data-hero-ctas]').boundingBox();
      const email = await page.locator('[data-hero-email]').boundingBox();
      expect(email!.y).toBeGreaterThanOrEqual(ctas!.y + ctas!.height);
      await expect(
        page.locator('[data-hero-email] a[href="mailto:johnlloydlawas06@gmail.com"]')
      ).toBeVisible();
      await expect(page.getByRole('button', { name: 'Copy email address' })).toBeVisible();
    });

    test('outcomes are figures and captions, no hatched bars', async ({ page }) => {
      await open(page, '/');
      const band = page.locator('[data-outcomes]');
      await expect(band).toContainText('Measured outcomes');
      await expect(band).toContainText('Every figure below was measured on shipped work.');
      for (const text of [
        '−50%',
        'Application load time',
        'Measured across 5+ modernised ASP.NET applications, 2019–2022.',
        '+40%',
        'Legacy app performance',
        'Response times on the revamped .NET and Angular platform, 2022–2025.',
        '+60%',
        'Test coverage',
        'Unit test coverage across the delivery codebase, 2022.',
      ]) {
        await expect(band).toContainText(text);
      }
      const patterned = await band.evaluate((root) =>
        [root, ...root.querySelectorAll('*')].filter((el) =>
          getComputedStyle(el).backgroundImage.includes('gradient')
        ).length
      );
      expect(patterned).toBe(0);
    });
  });
}
