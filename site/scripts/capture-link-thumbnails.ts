/**
 * Capture preview screenshots for the /links/ page.
 *
 * Run manually:  pnpm tsx scripts/capture-link-thumbnails.ts
 * Output:        site/public/links/<slug>.png  (1280x800 → resized to 800x500)
 *
 * Adding a new partner: drop another entry into LINKS, run the script, commit the new PNG.
 */

import { chromium, type Browser } from '@playwright/test';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

interface Link {
  slug: string;
  url: string;
}

const LINKS: Link[] = [
  { slug: 'digitaluniverse-academy', url: 'https://digitaluniverse.academy/' },
  { slug: 'db-agent', url: 'https://db-agent.app/' },
  { slug: 'claude-code-plugins', url: 'https://claude-code-plugins-self.vercel.app/' },
];

const SITE = decodeURIComponent(new URL('..', import.meta.url).pathname);
const OUT_DIR = `${SITE}public/links`;

async function captureOne(browser: Browser, link: Link): Promise<void> {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
    colorScheme: 'dark',
  });
  const page = await context.newPage();
  console.log(`Capturing ${link.url}...`);
  await page.goto(link.url, { waitUntil: 'networkidle', timeout: 30_000 }).catch((err) => {
    console.warn(`  networkidle timed out, falling back to load: ${err.message}`);
    return page.goto(link.url, { waitUntil: 'load', timeout: 30_000 });
  });
  // Give above-the-fold animations a moment to settle.
  await page.waitForTimeout(1500);

  const buffer = await page.screenshot({ type: 'png', fullPage: false });
  await context.close();

  const outPath = `${OUT_DIR}/${link.slug}.png`;
  mkdirSync(dirname(outPath), { recursive: true });
  await sharp(buffer)
    .resize({ width: 1200, height: 750, fit: 'cover', position: 'top' })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`  -> ${outPath}`);
}

async function main() {
  const browser = await chromium.launch();
  try {
    for (const link of LINKS) {
      try {
        await captureOne(browser, link);
      } catch (err) {
        console.error(`Failed ${link.url}:`, (err as Error).message);
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
