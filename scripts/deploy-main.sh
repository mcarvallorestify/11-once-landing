#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ Build de producción..."
npm run build

STAGING=$(mktemp -d)
cp -R dist/. "$STAGING/"
cp scripts/cpanel.main.yml "$STAGING/.cpanel.yml"

echo "→ Actualizando rama main (solo dist)..."
git checkout main 2>/dev/null || git checkout --orphan main

find "$ROOT" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

cp -R "$STAGING/." "$ROOT/"
rm -rf "$STAGING"

git add -A
git commit -m "deploy: build de produccion $(date +%Y-%m-%d)" || echo "Sin cambios en dist"
git push origin main --force

git checkout marco
echo "✓ main actualizada. Vuelves a rama marco."
