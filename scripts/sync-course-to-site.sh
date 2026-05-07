#!/usr/bin/env bash
# Copy the canonical course content from the repo root into site/course/.
# Run this whenever you edit the course markdown at the repo root.
#
# Usage:  ./scripts/sync-course-to-site.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SITE_COURSE="$ROOT/site/course"

MODULES=(
  00-start-here
  01-foundations
  02-master-prompts
  03-ui-ux-vocabulary
  04-modern-ui-stack
  05-prompt-library
  06-add-ons
  07-skills
  08-demonstrations
  09-workshops
  10-philosophy
  11-final-operating-system
  templates
)

mkdir -p "$SITE_COURSE"

for m in "${MODULES[@]}"; do
  if [[ -d "$ROOT/$m" ]]; then
    rm -rf "$SITE_COURSE/$m"
    cp -R "$ROOT/$m" "$SITE_COURSE/$m"
    echo "  synced $m"
  fi
done

echo "Done. Course content in site/course/ matches the repo root."
