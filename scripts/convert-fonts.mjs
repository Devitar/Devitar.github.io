import { Font, woff2 } from 'fonteditor-core';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fontsDir = join(__dirname, '../src/assets/fonts');

const fonts = [
  'Bungee-Regular.ttf',
  'Cabin-VariableFont.ttf',
  'PlaywriteNZBasic.ttf'
];

// Initialize woff2 module
await woff2.init();

for (const fontFile of fonts) {
  const inputPath = join(fontsDir, fontFile);
  const outputPath = join(fontsDir, fontFile.replace('.ttf', '.woff2'));

  console.log(`Converting ${fontFile}...`);

  try {
    const buffer = readFileSync(inputPath);
    const font = Font.create(buffer, { type: 'ttf' });
    const woff2Buffer = font.write({ type: 'woff2' });
    writeFileSync(outputPath, Buffer.from(woff2Buffer));
    console.log(`  ✓ Created ${fontFile.replace('.ttf', '.woff2')}`);
  } catch (error) {
    console.error(`  ✗ Failed to convert ${fontFile}:`, error.message);
  }
}

console.log('\nDone!');
