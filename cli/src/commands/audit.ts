import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import kleur from 'kleur';

interface AuditCheck {
  name: string;
  cmd: string;
  args: string[];
  optional?: boolean;
}

function detectChecks(cwd: string): AuditCheck[] {
  const pkgPath = join(cwd, 'package.json');
  if (!existsSync(pkgPath)) {
    return [];
  }
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const scripts: Record<string, string> = pkg.scripts ?? {};
  const has = (s: string) => Boolean(scripts[s]);
  const pm = existsSync(join(cwd, 'pnpm-lock.yaml'))
    ? 'pnpm'
    : existsSync(join(cwd, 'yarn.lock'))
    ? 'yarn'
    : existsSync(join(cwd, 'bun.lockb')) || existsSync(join(cwd, 'bun.lock'))
    ? 'bun'
    : 'npm';

  const checks: AuditCheck[] = [];
  if (has('typecheck')) checks.push({ name: 'Typecheck', cmd: pm, args: ['run', 'typecheck'] });
  else if (has('check')) checks.push({ name: 'Typecheck', cmd: pm, args: ['run', 'check'] });
  if (has('lint')) checks.push({ name: 'Lint', cmd: pm, args: ['run', 'lint'] });
  if (has('test')) checks.push({ name: 'Tests', cmd: pm, args: ['run', 'test'], optional: true });
  return checks;
}

export async function audit(_rest: string[]): Promise<void> {
  const cwd = process.cwd();
  console.log(kleur.bold().green('hackerx audit'));
  console.log(kleur.gray(`cwd: ${cwd}`));
  console.log();

  const checks = detectChecks(cwd);
  if (checks.length === 0) {
    console.log(kleur.yellow('No package.json or no recognizable scripts. Skipping automated checks.'));
  }

  let failed = 0;
  for (const c of checks) {
    process.stdout.write(`  ${c.name.padEnd(12)} `);
    const res = spawnSync(c.cmd, c.args, { cwd, stdio: 'pipe', encoding: 'utf8' });
    if (res.status === 0) {
      console.log(kleur.green('PASS'));
    } else if (c.optional) {
      console.log(kleur.yellow('SKIP') + kleur.gray(` (${res.status})`));
    } else {
      console.log(kleur.red('FAIL'));
      failed++;
    }
  }

  console.log();
  console.log(kleur.bold('Manual verification (you do these — Claude can\'t):'));
  console.log('  ' + kleur.gray('·') + ' Responsive at 375px / 768px / 1280px');
  console.log('  ' + kleur.gray('·') + ' Keyboard nav — Tab cycles in logical order, focus visible');
  console.log('  ' + kleur.gray('·') + ' Color contrast — body text WCAG AA (4.5:1)');
  console.log('  ' + kleur.gray('·') + ' Loading / empty / error states for every data area');
  console.log('  ' + kleur.gray('·') + ' Screenshot diff against the previous version');

  if (failed > 0) process.exit(1);
}
