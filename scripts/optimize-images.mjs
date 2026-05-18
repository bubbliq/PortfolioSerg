// Resizes oversized PNGs in public/projects in place. Run once after `npm install`
// to bring 360 MB of source screens down to a web-friendly size.
//
// Usage: npm run optimize-images
import { readdir, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', 'public', 'projects');
const MAX_WIDTH = 1920;
const QUALITY = 82;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (/\.png$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function fmt(n) {
  if (n > 1024 * 1024) return `${(n / 1024 / 1024).toFixed(2)} MB`;
  return `${(n / 1024).toFixed(0)} KB`;
}

const files = await walk(ROOT);
let savedBytes = 0;
let processed = 0;

for (const file of files) {
  const before = (await stat(file)).size;
  const img = sharp(file, { failOn: 'none' });
  const meta = await img.metadata();
  const needsResize = (meta.width ?? 0) > MAX_WIDTH;
  const isHuge = before > 2 * 1024 * 1024;

  if (!needsResize && !isHuge) {
    continue;
  }

  const buf = await sharp(file, { failOn: 'none' })
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .png({ quality: QUALITY, compressionLevel: 9, palette: false })
    .toBuffer();

  // Write back only if smaller
  if (buf.length < before) {
    const { writeFile } = await import('node:fs/promises');
    await writeFile(file, buf);
    const after = (await stat(file)).size;
    savedBytes += before - after;
    processed += 1;
    console.log(`✓ ${file.replace(ROOT, '.')}  ${fmt(before)} → ${fmt(after)}`);
  } else {
    console.log(`· ${file.replace(ROOT, '.')}  (already small)`);
  }
}

console.log(`\nDone. Processed ${processed} files. Saved ${fmt(savedBytes)}.`);
