import sharp from "sharp";

// Regenesys app icon — new compass-star design with AI sparkle elements.
// Matches the SVG in public/regenesys-icon.svg at 512×512 for crisp PNG rendering.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
<linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#00e5ff"/>
      <stop offset="100%" stop-color="#00a0b8"/>
    </linearGradient>
    <linearGradient id="sparkleGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#80f0ff"/>
      <stop offset="50%" stop-color="#00d4f0"/>
      <stop offset="100%" stop-color="#00b8d9"/>
    </linearGradient>
    <radialGradient id="starGlow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.4"/>
      <stop offset="70%" stop-color="#00b8d9" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#00b8d9" stop-opacity="0"/>
    </radialGradient>
    <filter id="sparkleBlur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="starBlur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="90" fill="url(#starGlow)"/>

  <!-- Viewfinder brackets -->
  <path d="M120,170 L120,136 Q120,120 136,120 L170,120" fill="none" stroke="url(#cyanGrad)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M342,120 L376,120 Q392,120 392,136 L392,170" fill="none" stroke="url(#cyanGrad)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M120,342 L120,376 Q120,392 136,392 L170,392" fill="none" stroke="url(#cyanGrad)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M392,342 L392,376 Q392,392 376,392 L342,392" fill="none" stroke="url(#cyanGrad)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Center compass star -->
  <g filter="url(#starBlur)">
    <path d="M256,176 L270,238 L256,230 L242,238 Z" fill="url(#sparkleGrad)"/>
    <path d="M256,336 L270,274 L256,282 L242,274 Z" fill="url(#sparkleGrad)"/>
    <path d="M176,256 L238,242 L230,256 L238,270 Z" fill="url(#sparkleGrad)"/>
    <path d="M336,256 L274,270 L282,256 L274,242 Z" fill="url(#sparkleGrad)"/>
  </g>

  <!-- Center dot -->
  <circle cx="256" cy="256" r="8" fill="#00e5ff"/>
  <circle cx="256" cy="256" r="4" fill="#ffffff"/>

  <!-- AI sparkle elements -->
  <g filter="url(#sparkleBlur)">
    <path d="M164,164 L167,157 L170,164 L167,171 Z" fill="#00e5ff" opacity="0.8"/>
    <path d="M164,164 L157,161 L164,158 L171,161 Z" fill="#00e5ff" opacity="0.6"/>
    <circle cx="148" cy="186" r="2.5" fill="#00d4f0" opacity="0.7"/>
    <circle cx="186" cy="148" r="2" fill="#80f0ff" opacity="0.5"/>
    <circle cx="155" cy="155" r="1.5" fill="#00e5ff" opacity="0.4"/>
  </g>
  <g filter="url(#sparkleBlur)">
    <path d="M348,164 L351,155 L354,164 L351,173 Z" fill="#00e5ff" opacity="0.75"/>
    <path d="M348,164 L339,161 L348,158 L357,161 Z" fill="#00e5ff" opacity="0.55"/>
    <circle cx="364" cy="186" r="2.5" fill="#00d4f0" opacity="0.65"/>
    <circle cx="326" cy="148" r="2" fill="#80f0ff" opacity="0.5"/>
    <circle cx="358" cy="152" r="1.5" fill="#00e5ff" opacity="0.35"/>
  </g>
  <g filter="url(#sparkleBlur)">
    <path d="M164,348 L167,339 L170,348 L167,357 Z" fill="#00e5ff" opacity="0.7"/>
    <path d="M164,348 L155,345 L164,342 L173,345 Z" fill="#00e5ff" opacity="0.5"/>
    <circle cx="148" cy="326" r="2.5" fill="#00d4f0" opacity="0.6"/>
    <circle cx="186" cy="364" r="2" fill="#80f0ff" opacity="0.45"/>
    <circle cx="152" cy="358" r="1.5" fill="#00e5ff" opacity="0.35"/>
  </g>
  <g filter="url(#sparkleBlur)">
    <path d="M348,348 L351,339 L354,348 L351,357 Z" fill="#00e5ff" opacity="0.75"/>
    <path d="M348,348 L339,345 L348,342 L357,345 Z" fill="#00e5ff" opacity="0.55"/>
    <circle cx="364" cy="326" r="2.5" fill="#00d4f0" opacity="0.65"/>
    <circle cx="326" cy="364" r="2" fill="#80f0ff" opacity="0.5"/>
    <circle cx="360" cy="355" r="1.5" fill="#00e5ff" opacity="0.3"/>
  </g>

  <!-- Accent sparkles -->
  <g filter="url(#sparkleBlur)" opacity="0.6">
    <path d="M256,108 L258,100 L260,108 L258,116 Z" fill="#80f0ff"/>
    <path d="M256,108 L248,106 L256,104 L264,106 Z" fill="#80f0ff"/>
  </g>
  <g filter="url(#sparkleBlur)" opacity="0.6">
    <path d="M256,404 L258,396 L260,404 L258,412 Z" fill="#80f0ff"/>
    <path d="M256,404 L248,402 L256,400 L264,402 Z" fill="#80f0ff"/>
  </g>
  <g filter="url(#sparkleBlur)" opacity="0.55">
    <path d="M108,256 L100,254 L108,252 L116,254 Z" fill="#80f0ff"/>
    <path d="M108,256 L106,248 L104,256 L106,264 Z" fill="#80f0ff"/>
  </g>
  <g filter="url(#sparkleBlur)" opacity="0.55">
    <path d="M404,256 L396,254 L404,252 L412,254 Z" fill="#80f0ff"/>
    <path d="M404,256 L402,248 L400,256 L402,264 Z" fill="#80f0ff"/>
  </g>

  <!-- Diagonal dots -->
  <circle cx="196" cy="196" r="1.8" fill="#00e5ff" opacity="0.3" filter="url(#sparkleBlur)"/>
  <circle cx="316" cy="196" r="1.8" fill="#00e5ff" opacity="0.3" filter="url(#sparkleBlur)"/>
  <circle cx="196" cy="316" r="1.8" fill="#00e5ff" opacity="0.3" filter="url(#sparkleBlur)"/>
  <circle cx="316" cy="316" r="1.8" fill="#00e5ff" opacity="0.3" filter="url(#sparkleBlur)"/>

  <!-- Scattered luminous dots -->
  <circle cx="140" cy="230" r="1" fill="#80f0ff" opacity="0.4"/>
  <circle cx="372" cy="230" r="1" fill="#80f0ff" opacity="0.35"/>
  <circle cx="140" cy="282" r="1" fill="#80f0ff" opacity="0.35"/>
  <circle cx="372" cy="282" r="1" fill="#80f0ff" opacity="0.4"/>
  <circle cx="230" cy="140" r="1" fill="#80f0ff" opacity="0.3"/>
  <circle cx="282" cy="140" r="1" fill="#80f0ff" opacity="0.3"/>
  <circle cx="230" cy="372" r="1" fill="#80f0ff" opacity="0.35"/>
  <circle cx="282" cy="372" r="1" fill="#80f0ff" opacity="0.35"/>
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
