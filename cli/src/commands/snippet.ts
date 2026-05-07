import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import kleur from 'kleur';

const SNIPPETS_DIR = fileURLToPath(new URL('../../templates/snippets', import.meta.url));

function list(): string[] {
  if (!existsSync(SNIPPETS_DIR)) return [];
  return readdirSync(SNIPPETS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => basename(f, '.md'))
    .sort();
}

export async function snippet(rest: string[]): Promise<void> {
  const name = rest[0];
  const all = list();

  if (!name) {
    console.log(kleur.bold().green('hackerx snippets'));
    console.log();
    if (all.length === 0) {
      console.log(kleur.yellow('No snippets bundled. Reinstall with `npm i -g hackerx@latest`.'));
      return;
    }
    for (const n of all) console.log('  ' + kleur.cyan(n));
    console.log();
    console.log(kleur.gray('Pick one:  hackerx snippet <name>'));
    return;
  }

  const path = join(SNIPPETS_DIR, `${name}.md`);
  if (!existsSync(path)) {
    console.error(kleur.red(`No such snippet: ${name}`));
    console.log(kleur.gray('Available: ' + all.join(', ')));
    process.exit(1);
  }

  const content = readFileSync(path, 'utf8');
  // Strip the frontmatter heading so the user can paste cleanly.
  const stripped = content.replace(/^---[\s\S]*?---\n/, '').replace(/^#\s+.+\n/, '');
  process.stdout.write(stripped);
}
