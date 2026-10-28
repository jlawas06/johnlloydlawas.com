/**
 * Full-page screenshots of the key pages, for before/after UI reviews.
 *
 *   node scripts/capture-screens.mjs <out-dir> [base-url]
 *
 * Writes <out-dir>/<page>-<width>-<theme>.png and prints a JSON summary of
 * page heights, which the UI report quotes. Needs a running server.
 */
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const outDir = process.argv[2];
const base = process.argv[3] ?? 'http://localhost:3000';
if (!outDir) {
  console.error('usage: node scripts/capture-screens.mjs <out-dir> [base-url]');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { name: 'home', path: '/' },
  { name: 'projects', path: '/projects' },
  { name: 'contact', path: '/contact' },
];

const viewports = [
  { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
];

const browser = await chromium.launch();
const summary = {};

for (const vp of viewports) {
  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.deviceScaleFactor,
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
      reducedMotion: 'reduce',
    });
    await context.addInitScript((t) => {
      try {
        localStorage.setItem('theme', t);
      } catch {}
    }, theme);

    const page = await context.newPage();
    for (const p of pages) {
      await page.goto(base + p.path, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const file = path.join(outDir, `${p.name}-${vp.width}-${theme}.png`);
      await page.screenshot({ path: file, fullPage: true });

      const metrics = await page.evaluate(() => {
        const label = [...document.querySelectorAll('body *')].find(
          (el) => el.children.length === 0 && /^measured outcomes$/i.test(el.textContent.trim())
        );
        const band = label?.closest('[data-outcomes], .border-t');
        return {
          scrollHeight: document.documentElement.scrollHeight,
          scrollWidth: document.documentElement.scrollWidth,
          outcomesHeight: band ? Math.round(band.getBoundingClientRect().height) : null,
        };
      });
      summary[`${p.name}-${vp.width}-${theme}`] = metrics;
      console.log(file);
    }
    await context.close();
  }
}

/* Keyboard focus on the hero's primary button, to check the focus ring. */
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press('Tab');
    const text = await page.evaluate(() => document.activeElement?.textContent?.trim());
    if (text?.startsWith('See the work')) break;
  }
  const box = await page.evaluate(() => {
    const r = document.activeElement.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  const file = path.join(outDir, 'focus-ring-1440.png');
  await page.screenshot({
    path: file,
    clip: { x: box.x - 24, y: box.y - 24, width: box.width + 360, height: box.height + 48 },
  });
  console.log(file);
  await context.close();
}

await browser.close();
fs.writeFileSync(path.join(outDir, 'metrics.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify(summary, null, 2));
