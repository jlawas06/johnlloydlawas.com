#!/usr/bin/env node
/**
 * Converts resume.md -> public/resume/john-lloyd-lawas-resume.pdf
 *
 * Strategy: marked (md -> html) + print-ready CSS + headless Chrome.
 * Uses the already-installed macOS Google Chrome binary — no puppeteer download.
 *
 * Usage: npm run resume:pdf
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { platform } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const MD_PATH = join(ROOT, 'resume.md');
const OUT_DIR = join(ROOT, 'public', 'resume');
const OUT_PDF = join(OUT_DIR, 'john-lloyd-lawas-resume.pdf');
const TMP_HTML = join(ROOT, '.resume-tmp.html');

function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }

  const candidates =
    platform() === 'darwin'
      ? [
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
          '/Applications/Chromium.app/Contents/MacOS/Chromium',
          '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
        ]
      : platform() === 'win32'
        ? [
            'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
          ]
        : [
            '/usr/bin/google-chrome',
            '/usr/bin/google-chrome-stable',
            '/usr/bin/chromium',
            '/usr/bin/chromium-browser',
          ];

  for (const p of candidates) {
    if (existsSync(p)) return p;
  }

  throw new Error(
    'Could not find Chrome. Set CHROME_PATH env var to your chrome executable and try again.'
  );
}

const CSS = `
  @page {
    size: Letter;
    margin: 0.6in 0.65in;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ui-sans-serif, -apple-system, "Segoe UI", "Helvetica Neue", Helvetica,
      Arial, sans-serif;
    font-size: 10.25pt;
    line-height: 1.45;
    color: #111;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  h1 {
    font-size: 22pt;
    font-weight: 700;
    margin: 0 0 4px 0;
    letter-spacing: -0.01em;
  }

  /* The line immediately after h1 contains the title (wrapped in <strong>). */
  h1 + p {
    font-size: 11.5pt;
    font-weight: 600;
    color: #333;
    margin: 0 0 6px 0;
  }

  /* The contact/location lines sit directly under the title. */
  h1 + p + p,
  h1 + p + p + p {
    font-size: 9.5pt;
    color: #444;
    margin: 0 0 3px 0;
  }

  h2 {
    font-size: 11.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #111;
    margin: 16px 0 6px 0;
    padding-bottom: 3px;
    border-bottom: 1px solid #222;
  }

  h3 {
    font-size: 10.75pt;
    font-weight: 700;
    margin: 10px 0 2px 0;
    color: #111;
  }

  p {
    margin: 0 0 6px 0;
  }

  hr {
    display: none;
  }

  ul {
    margin: 4px 0 8px 0;
    padding-left: 18px;
  }

  li {
    margin: 0 0 2px 0;
  }

  a {
    color: #0b63c4;
    text-decoration: none;
  }

  strong {
    color: #111;
    font-weight: 600;
  }

  em {
    color: #555;
  }

  /* Avoid awkward page breaks inside a role's block. */
  h3, h3 + p, h3 + p + ul {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  h2 {
    page-break-after: avoid;
    break-after: avoid;
  }
`;

function buildHtml(bodyHtml) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>John Lloyd Lawas — Resume</title>
    <style>${CSS}</style>
  </head>
  <body>
${bodyHtml}
  </body>
</html>`;
}

function main() {
  if (!existsSync(MD_PATH)) {
    console.error(`resume.md not found at ${MD_PATH}`);
    process.exit(1);
  }

  const md = readFileSync(MD_PATH, 'utf8');
  const bodyHtml = marked.parse(md, { mangle: false, headerIds: false });
  const html = buildHtml(bodyHtml);

  writeFileSync(TMP_HTML, html, 'utf8');

  if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR, { recursive: true });
  }

  const chrome = findChrome();
  const fileUrl = `file://${TMP_HTML}`;

  console.log(`Using Chrome at: ${chrome}`);
  console.log(`Rendering ${MD_PATH} -> ${OUT_PDF}`);

  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--no-pdf-header-footer',
      `--print-to-pdf=${OUT_PDF}`,
      fileUrl,
    ],
    { stdio: 'inherit' }
  );

  try {
    unlinkSync(TMP_HTML);
  } catch {
    /* non-fatal */
  }

  console.log(`\nWrote ${OUT_PDF}`);
}

main();
