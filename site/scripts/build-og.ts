/**
 * Rasterize the OG card SVG into a PNG that social platforms accept.
 * Output: public/og.png (1200×630)
 */
import sharp from 'sharp';
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';

const SITE = decodeURIComponent(new URL('..', import.meta.url).pathname);
const SRC = `${SITE}src/assets/og.svg`;
const OUT = `${SITE}public/og.png`;

async function main() {
  if (!existsSync(SRC)) {
    console.warn(`OG source not found at ${SRC}; skipping rasterization.`);
    return;
  }
  mkdirSync(dirname(OUT), { recursive: true });
  const svg = readFileSync(SRC);
  await sharp(svg, { density: 144 })
    .resize(1200, 630, { fit: 'fill' })
    .png({ compressionLevel: 9, quality: 92 })
    .toFile(OUT);
  console.log(`Rasterized ${SRC} -> ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
