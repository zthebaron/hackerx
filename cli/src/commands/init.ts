import { mkdirSync, copyFileSync, existsSync, writeFileSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import kleur from 'kleur';

const TEMPLATES_DIR = fileURLToPath(new URL('../../templates', import.meta.url));

interface InitOptions {
  skill: string;
  scope: 'project' | 'user';
  cwd: string;
  force: boolean;
}

function parseArgs(rest: string[]): InitOptions {
  const opts: InitOptions = {
    skill: 'ui-pattern-picker',
    scope: 'project',
    cwd: process.cwd(),
    force: false,
  };
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === '--skill') opts.skill = rest[++i];
    else if (a === '--scope') opts.scope = rest[++i] as 'project' | 'user';
    else if (a === '--force' || a === '-f') opts.force = true;
    else if (a === '--cwd') opts.cwd = rest[++i];
  }
  return opts;
}

function copyIfMissing(src: string, dest: string, force: boolean): { written: boolean; reason: string } {
  if (!existsSync(src)) return { written: false, reason: `template missing: ${src}` };
  if (existsSync(dest) && !force) {
    return { written: false, reason: 'already exists (use --force to overwrite)' };
  }
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  return { written: true, reason: 'copied' };
}

export async function init(rest: string[]): Promise<void> {
  const opts = parseArgs(rest);
  const root = opts.scope === 'user' ? homedir() : opts.cwd;
  const skillDir = join(root, '.claude', 'skills', opts.skill);
  const claudeMd = join(opts.cwd, 'CLAUDE.md');
  const verifyMd = join(opts.cwd, '.github', 'PULL_REQUEST_TEMPLATE.md');

  console.log(kleur.bold().green('hackerx init'));
  console.log(kleur.gray(`scope: ${opts.scope}`));
  console.log(kleur.gray(`target: ${root}`));
  console.log();

  const writes: Array<{ path: string; result: { written: boolean; reason: string } }> = [];

  // 1. Skill
  const skillSrc = join(TEMPLATES_DIR, 'skills', opts.skill, 'SKILL.md');
  const skillDest = join(skillDir, 'SKILL.md');
  writes.push({ path: skillDest, result: copyIfMissing(skillSrc, skillDest, opts.force) });

  // 2. CLAUDE.md (project scope only)
  if (opts.scope === 'project') {
    const claudeSrc = join(TEMPLATES_DIR, 'CLAUDE.md');
    writes.push({ path: claudeMd, result: copyIfMissing(claudeSrc, claudeMd, opts.force) });

    // 3. PR template
    const verifySrc = join(TEMPLATES_DIR, 'verification-checklist.md');
    writes.push({ path: verifyMd, result: copyIfMissing(verifySrc, verifyMd, opts.force) });
  }

  for (const w of writes) {
    if (w.result.written) {
      console.log(kleur.green('  + '), w.path);
    } else {
      console.log(kleur.yellow('  · '), w.path, kleur.gray(`(${w.result.reason})`));
    }
  }

  console.log();
  console.log(kleur.bold('Next:'));
  console.log('  1. Open Claude Code in this repo: ' + kleur.cyan('claude'));
  console.log('  2. Try a vague UI request — the ' + kleur.cyan(opts.skill) + ' skill will activate');
  console.log('  3. Read the master prompt: ' + kleur.cyan('https://hackerx.app/02-master-prompts/master-prompt/'));
}
