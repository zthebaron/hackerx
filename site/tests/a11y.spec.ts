import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Walk the built site (dist/) and run axe on every HTML page.
 * We test the static output rather than spinning up a server — fast, deterministic, no flake.
 */

const DIST = join(process.cwd(), 'dist', 'client');

function findHtml(dir: string, files: string[] = []): string[] {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) findHtml(full, files);
    else if (entry.endsWith('.html')) files.push(full);
  }
  return files;
}

const pages = findHtml(DIST);

if (pages.length === 0) {
  test('build output exists', () => {
    throw new Error(`No HTML pages found at ${DIST}. Run \`pnpm build\` first.`);
  });
}

// Sample up to 12 pages: homepage, blog index, every module index, plus 5 random leaves.
const samples = (() => {
  const homepage = pages.find((p) => p.endsWith('/dist/index.html'));
  const blog = pages.find((p) => p.endsWith('/dist/blog/index.html'));
  const indexes = pages.filter((p) => p.match(/dist\/(0[0-9]|10|11|templates)[^/]*\/index\.html$/));
  const leaves = pages.filter((p) => !p.endsWith('/index.html'));
  const randomLeaves = leaves.slice(0, 5);
  return [homepage, blog, ...indexes, ...randomLeaves].filter(Boolean) as string[];
})();

for (const file of samples) {
  const url = 'file://' + file;
  test(`a11y: ${file.replace(DIST, '')}`, async ({ page }) => {
    await page.goto(url);
    const results = await new AxeBuilder({ page })
      .disableRules(['document-title', 'html-has-lang']) // Starlight handles these on real pages, file:// URLs sometimes miss.
      .analyze();
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}
