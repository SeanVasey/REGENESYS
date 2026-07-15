import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

// Regenerate raster icons (favicon + PWA / iOS home-screen icons) from the
// canonical source SVG. The full-tile `regenesys-icon.svg` (dark rounded tile
// with turquoise border) is the correct source for home-screen / favicon use:
// iOS and PWA launchers expect an opaque, self-contained icon. The transparent
// `regenesys-icon-optimized.svg` is reserved for in-app display and the Safari
// mask-icon, where a transparent background is ideal.
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "regenesys-icon.svg");
const svg = await readFile(svgPath);

// Square PNGs used by the manifest and apple-touch-icon.
const pngTargets = [
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
];

for (const { name, size } of pngTargets) {
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(join(root, "public", name));
  console.log(`Generated public/${name} (${size}x${size})`);
}

// favicon.ico — pack multiple PNG frames (16/32/48) into a single ICO.
// libvips/sharp can't encode ICO, so we assemble the container by hand.
// PNG-compressed ICO frames are supported by all evergreen browsers.
const icoSizes = [16, 32, 48];
const frames = await Promise.all(
  icoSizes.map((size) =>
    sharp(svg, { density: 384 }).resize(size, size).png().toBuffer(),
  ),
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: 1 = icon
header.writeUInt16LE(frames.length, 4); // image count

const entries = [];
let offset = 6 + frames.length * 16;
frames.forEach((png, i) => {
  const size = icoSizes[i];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 => 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette count
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // size of image data
  entry.writeUInt32LE(offset, 12); // offset of image data
  offset += png.length;
  entries.push(entry);
});

const ico = Buffer.concat([header, ...entries, ...frames]);
await writeFile(join(root, "public", "favicon.ico"), ico);
console.log(`Generated public/favicon.ico (${icoSizes.join("/")})`);
