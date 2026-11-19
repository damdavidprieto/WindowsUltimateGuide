#!/usr/bin/env bash
# Monta la web en una carpeta lista para GitHub Pages.
#   Uso: bash scripts/build-site.sh [carpeta-de-salida]   (por defecto: _site)
# Para verla en local:
#   bash scripts/build-site.sh && python3 -m http.server -d _site 8000
set -euo pipefail

cd "$(dirname "$0")/.."
OUT="${1:-_site}"

rm -rf "$OUT"
mkdir -p "$OUT"

# La aplicación web
cp -R site/. "$OUT/"

# El contenido: los Markdown de la guía (la web los lee directamente)
for dir in hotkeys win-plus-r system power-user development; do
  mkdir -p "$OUT/$dir"
  cp "$dir"/*.md "$OUT/$dir/"
done
cp README.md LICENSE "$OUT/"

# Sin procesado de Jekyll: se publica tal cual
touch "$OUT/.nojekyll"

# Comprueba que existen todas las páginas que la web espera
missing=0
for id in $(grep -oE "\{ id: '[^']+/[^']+'" site/app.js | sed -E "s/\{ id: '([^']+)'/\1/"); do
  if [ ! -f "$OUT/$id.md" ]; then
    echo "Falta la página: $id.md" >&2
    missing=1
  fi
done
[ "$missing" -eq 0 ] || exit 1

echo "Web generada en $OUT/ ($(find "$OUT" -type f | wc -l) archivos)"
