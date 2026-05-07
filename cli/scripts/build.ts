/**
 * Build the hackerx CLI.
 *  1. Re-sync templates/ from the course root (so the published package has the latest).
 *  2. Bundle src/ into dist/ via esbuild-like simplicity using tsc.
 */
import { execSync } from 'node:child_process';
import { mkdirSync, copyFileSync, readdirSync, statSync, existsSync, rmSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';

const CLI = decodeURIComponent(new URL('..', import.meta.url).pathname);
const ROOT = decodeURIComponent(new URL('../..', import.meta.url).pathname);
const TEMPLATES = join(CLI, 'templates');

function sh(cmd: string, cwd = CLI) {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

function syncTemplates() {
  console.log('Syncing templates from course root...');
  rmSync(TEMPLATES, { recursive: true, force: true });
  mkdirSync(join(TEMPLATES, 'skills', 'ui-pattern-picker'), { recursive: true });
  mkdirSync(join(TEMPLATES, 'snippets'), { recursive: true });
  copyFileSync(join(ROOT, 'templates/CLAUDE.md'), join(TEMPLATES, 'CLAUDE.md'));
  copyFileSync(
    join(ROOT, 'templates/verification-checklist.md'),
    join(TEMPLATES, 'verification-checklist.md')
  );
  copyFileSync(
    join(ROOT, '07-skills/ui-pattern-picker/SKILL.md'),
    join(TEMPLATES, 'skills', 'ui-pattern-picker', 'SKILL.md')
  );
  const lib = join(ROOT, '05-prompt-library');
  for (const f of readdirSync(lib)) {
    if (f.toLowerCase() === 'readme.md') continue;
    if (!f.endsWith('.md')) continue;
    const out = basename(f, '.md').replace(/^\d+-/, '') + '.md';
    copyFileSync(join(lib, f), join(TEMPLATES, 'snippets', out));
  }
  console.log('Templates synced.');
}

function compile() {
  console.log('Compiling TypeScript -> dist/...');
  rmSync(join(CLI, 'dist'), { recursive: true, force: true });
  sh('tsc -p tsconfig.json');
  // Make the entry executable (quote path because cli root may contain spaces).
  const entry = join(CLI, 'dist', 'index.js');
  if (existsSync(entry)) {
    sh(`chmod +x "${entry}"`);
  }
}

syncTemplates();
compile();
console.log('hackerx CLI build complete.');
