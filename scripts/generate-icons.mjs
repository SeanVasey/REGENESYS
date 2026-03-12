import sharp from "sharp";

// Regenesys app icon — scaled up to 512x512 for crisp rendering at all sizes.
// Matches the SVG in public/regenesys-icon.svg but at higher resolution.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00CED1" />
      <stop offset="50%" stop-color="#22A4C1" />
      <stop offset="100%" stop-color="#40E0D0" />
    </linearGradient>
    <mask id="sparkle-mask">
      <rect width="512" height="512" fill="white"/>
      <circle cx="256" cy="256" r="32" fill="black"/>
    </mask>
  </defs>
  <path d="M 179.2 89.6 L 128 89.6 C 106.77 89.6 89.6 106.77 89.6 128 L 89.6 179.2" stroke="url(#icon-grad)" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M 332.8 89.6 L 384 89.6 C 405.23 89.6 422.4 106.77 422.4 128 L 422.4 179.2" stroke="url(#icon-grad)" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M 89.6 332.8 L 89.6 384 C 89.6 405.23 106.77 422.4 128 422.4 L 179.2 422.4" stroke="url(#icon-grad)" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M 422.4 332.8 L 422.4 384 C 422.4 405.23 405.23 422.4 384 422.4 L 332.8 422.4" stroke="url(#icon-grad)" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M 256 128 L 288 224 L 384 256 L 288 288 L 256 384 L 224 288 L 128 256 L 224 224 Z" fill="url(#icon-grad)" fill-opacity="0.9" mask="url(#sparkle-mask)"/>
</svg>`;

const sizes = [
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
];

for (const { name, size } of sizes) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(`public/${name}`);
  console.log(`Generated public/${name} (${size}x${size})`);
}
