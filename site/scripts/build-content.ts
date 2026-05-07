/**
 * Sync course markdown from the repo root into Starlight's content collection.
 *
 * Source:  ../<module>/*.md  (the course)
 * Target:  src/content/docs/<module>/*.md  (Starlight reads this)
 *
 * - Injects Starlight frontmatter (title, description, sidebar.order)
 * - Renames README.md → index.md so the section URL works at /<module>/
 * - Rewrites internal cross-links (`(README.md)` → `(./)`, `(other.md)` → `(./other/)`)
 * - Preserves existing frontmatter (e.g. SKILL.md) and merges with Starlight's required keys
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, rmSync, existsSync } from 'node:fs';
import { join, relative, dirname, basename, extname } from 'node:path';

const ROOT = decodeURIComponent(new URL('../..', import.meta.url).pathname);
const SITE = decodeURIComponent(new URL('..', import.meta.url).pathname);
const SOURCE_MODULES = [
  '00-start-here',
  '01-foundations',
  '02-master-prompts',
  '03-ui-ux-vocabulary',
  '04-modern-ui-stack',
  '05-prompt-library',
  '06-add-ons',
  '07-skills',
  '08-demonstrations',
  '09-workshops',
  '10-philosophy',
  '11-final-operating-system',
  'templates',
];

const TARGET_DIR = join(SITE, 'src/content/docs');

type FrontmatterValue = string | number | boolean | { [k: string]: string | number | boolean };
type Frontmatter = Record<string, FrontmatterValue>;

function parseFrontmatter(source: string): { fm: Frontmatter; body: string } {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { fm: {}, body: source };
  const fm: Frontmatter = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^([a-zA-Z_][\w-]*)\s*:\s*(.*)$/);
    if (m) fm[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return { fm, body: match[2] };
}

function stringifyValue(v: FrontmatterValue): string {
  if (typeof v === 'object' && v !== null) {
    const inner = Object.entries(v)
      .map(([k, val]) => `${k}: ${typeof val === 'string' ? JSON.stringify(val) : val}`)
      .join(', ');
    return `{ ${inner} }`;
  }
  if (typeof v === 'string') {
    // Always quote strings — safer than guessing whether YAML will reinterpret as number/bool/null.
    return JSON.stringify(v);
  }
  return String(v);
}

function stringifyFrontmatter(fm: Frontmatter): string {
  const lines = Object.entries(fm).map(([k, v]) => `${k}: ${stringifyValue(v)}`);
  return `---\n${lines.join('\n')}\n---\n`;
}

function deriveTitle(body: string, filename: string): string {
  const h1 = body.match(/^#\s+(.+?)$/m);
  if (h1) {
    let title = h1[1].replace(/[*_`]/g, '').trim();
    // Strip leading "NN — " / "NN - " / "NN. " numeric prefixes from module titles.
    title = title.replace(/^\d+\s*[—–\-.]\s*/, '').trim();
    if (title) return title;
  }
  return basename(filename, '.md').replace(/^\d+-/, '').replace(/-/g, ' ');
}

function deriveDescription(body: string): string {
  const stripped = body
    .replace(/^---[\s\S]*?---\n/, '')
    .replace(/^#.*$/gm, '')
    .replace(/^>\s+/gm, '')
    .trim();
  const firstPara = stripped.split(/\n\s*\n/).find((p) => p.trim().length > 0) ?? '';
  const oneLine = firstPara.replace(/\s+/g, ' ').replace(/[*_`]/g, '').trim();
  if (!oneLine) return 'HackerX — ship UI 100x faster with Claude Code.';
  return oneLine.length > 160 ? oneLine.slice(0, 157) + '...' : oneLine;
}

function rewriteLinks(body: string, sourceModule: string): string {
  return body
    // Cross-module README references: (../foo-module/README.md) or (foo-module/README.md)
    .replace(/\((\.\.\/)?([0-9a-z-]+)\/README\.md\)/g, '(/$2/)')
    // Cross-module file references: (../foo/bar.md) → (/foo/bar/)
    .replace(/\(\.\.\/([0-9a-z-]+)\/([\w-]+)\.md\)/g, '(/$1/$2/)')
    // Same-module README: (README.md) → (./)
    .replace(/\(README\.md\)/g, '(./)')
    // Same-module file: (foo.md) → (./foo/)
    .replace(/\(([\w-]+)\.md\)/g, '(./$1/)')
    // Skill sub-folder reference: (ui-pattern-picker/SKILL.md) → (./ui-pattern-picker/)
    .replace(/\(([\w-]+)\/SKILL\.md\)/g, '(./$1/)');
}

function ensureDir(p: string) {
  mkdirSync(p, { recursive: true });
}

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (extname(entry) === '.md') files.push(full);
  }
  return files;
}

function clean() {
  for (const m of SOURCE_MODULES) {
    const p = join(TARGET_DIR, m);
    if (existsSync(p)) rmSync(p, { recursive: true, force: true });
  }
}

function syncModule(moduleName: string) {
  const sourceDir = join(ROOT, moduleName);
  if (!existsSync(sourceDir)) return;
  const files = walk(sourceDir);
  let order = 0;
  for (const file of files) {
    const rel = relative(sourceDir, file);
    const isReadme = basename(file).toLowerCase() === 'readme.md';
    const isSkill = basename(file) === 'SKILL.md';
    let outPath: string;
    if (isReadme) {
      outPath = join(TARGET_DIR, moduleName, 'index.md');
    } else if (isSkill) {
      const subDir = dirname(rel);
      outPath = join(TARGET_DIR, moduleName, subDir, 'index.md');
    } else {
      const baseName = basename(file, '.md');
      outPath = join(TARGET_DIR, moduleName, dirname(rel), `${baseName}.md`);
    }
    ensureDir(dirname(outPath));
    const raw = readFileSync(file, 'utf8');
    const { fm: existing, body: rawBody } = parseFrontmatter(raw);
    const body = rewriteLinks(rawBody, moduleName);
    const title = (existing.title as string) ?? deriveTitle(body, file);
    const description = (existing.description as string) ?? deriveDescription(body);
    const fm: Frontmatter = {
      title,
      description,
    };
    if (isReadme) {
      fm.sidebar = { order: 0 };
    } else {
      order++;
      fm.sidebar = { order };
    }
    if (existing.template) fm.template = existing.template as string;
    const out = `${stringifyFrontmatter(fm)}\n${body}`;
    writeFileSync(outPath, out, 'utf8');
  }
  console.log(`  synced ${moduleName} (${files.length} files)`);
}

function main() {
  console.log('Syncing course content into Starlight...');
  clean();
  ensureDir(TARGET_DIR);
  for (const m of SOURCE_MODULES) syncModule(m);
  console.log('Sync complete.');
}

main();
