import kleur from 'kleur';

export function help(): void {
  console.log(`
${kleur.bold().green('hackerx')} ${kleur.gray('— Ship UI 100x faster with Claude Code.')}

${kleur.bold('Usage:')}
  ${kleur.cyan('hackerx init')} [--skill <name>] [--scope project|user] [--force]
                Drop ${kleur.bold('CLAUDE.md')}, ${kleur.bold('.claude/skills/<skill>/')}, and a PR template into the current project.

  ${kleur.cyan('hackerx audit')}
                Run the verification checklist (typecheck, lint, tests) and print a manual review prompt.

  ${kleur.cyan('hackerx snippet')} [name]
                Print a prompt from the prompt library. Run with no name to list available snippets.

  ${kleur.cyan('hackerx help')}
                Show this message.

${kleur.bold('Examples:')}
  ${kleur.gray('# In an existing repo:')}
  hackerx init

  ${kleur.gray('# Install the skill globally instead of per-project:')}
  hackerx init --scope user --skill ui-pattern-picker

  ${kleur.gray('# Pipe a prompt into your clipboard (macOS):')}
  hackerx snippet pattern-discovery | pbcopy

${kleur.bold('Read the course:')} ${kleur.cyan('https://hackerx.app')}
`);
}
