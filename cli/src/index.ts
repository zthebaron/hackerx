#!/usr/bin/env node
/**
 * hackerx — drop the HackerX rules and skills into any project.
 *
 * Commands:
 *   init [--skill <name>] [--scope project|user]   install CLAUDE.md + the skill
 *   audit                                          run the verification checklist locally
 *   snippet [name]                                 print a prompt from the library
 *   help                                           usage
 */

import { init } from './commands/init.js';
import { audit } from './commands/audit.js';
import { snippet } from './commands/snippet.js';
import { help } from './commands/help.js';
import kleur from 'kleur';

async function main() {
  const [, , cmd, ...rest] = process.argv;

  try {
    switch (cmd) {
      case 'init':
        await init(rest);
        break;
      case 'audit':
        await audit(rest);
        break;
      case 'snippet':
        await snippet(rest);
        break;
      case 'help':
      case '--help':
      case '-h':
      case undefined:
        help();
        break;
      case '--version':
      case '-v': {
        const { readFileSync } = await import('node:fs');
        const { fileURLToPath } = await import('node:url');
        const path = fileURLToPath(new URL('../package.json', import.meta.url));
        const pkg = JSON.parse(readFileSync(path, 'utf8'));
        console.log(pkg.version);
        break;
      }
      default:
        console.error(kleur.red(`Unknown command: ${cmd}`));
        help();
        process.exit(1);
    }
  } catch (err) {
    console.error(kleur.red('hackerx failed:'), err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
