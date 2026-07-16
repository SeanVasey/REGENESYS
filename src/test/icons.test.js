import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { describe, it, expect } from "vitest";
import sharp from "sharp";

// Guard the served icon assets against drift. Everything under `public/` is a
// generated artifact produced by `scripts/generate-icons.mjs` from the two
// canonical root SVGs. When the source art changes, `npm run icons` must be
// re-run; these tests fail loudly if a stale asset is committed — the exact
// regression that has bitten this repo before.
const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p) => readFileSync(join(root, p));

describe("served SVGs mirror the canonical source", () => {
  // `public/*.svg` are plain copies of the root SVGs, so they must match byte
  // for byte. This is the most common (and fully deterministic) drift.
  for (const name of ["regenesys-icon.svg", "regenesys-icon-optimized.svg"]) {
    it(`public/${name} byte-matches the root source`, () => {
      expect(read(`public/${name}`).equals(read(name))).toBe(true);
    });
  }
});

describe("raster icons are opaque, correctly sized tiles", () => {
  // The favicon / iOS / PWA rasters must be edge-to-edge opaque: iOS applies
  // its own squircle mask, so any transparent corner would let the home-screen
  // wallpaper bleed through. Assert every corner pixel is fully opaque.
  const pngTargets = [
    { name: "apple-touch-icon.png", size: 180 },
    { name: "icon-192.png", size: 192 },
    { name: "icon-512.png", size: 512 },
  ];

  for (const { name, size } of pngTargets) {
    it(`public/${name} is ${size}x${size} with opaque corners`, async () => {
      const { data, info } = await sharp(read(`public/${name}`))
        .raw()
        .toBuffer({ resolveWithObject: true });

      expect(info.width).toBe(size);
      expect(info.height).toBe(size);
      expect(info.channels).toBe(4);

      const alphaAt = (x, y) => data[(y * info.width + x) * info.channels + 3];
      const corners = [
        [0, 0],
        [info.width - 1, 0],
        [0, info.height - 1],
        [info.width - 1, info.height - 1],
      ];
      for (const [x, y] of corners) {
        expect(alphaAt(x, y)).toBe(255);
      }
    });
  }
});

describe("favicon.ico is a valid multi-size container", () => {
  it("has a well-formed ICO header with three frames", () => {
    const ico = read("public/favicon.ico");
    expect(ico.readUInt16LE(0)).toBe(0); // reserved
    expect(ico.readUInt16LE(2)).toBe(1); // type: 1 = icon
    expect(ico.readUInt16LE(4)).toBe(3); // frame count: 16/32/48
  });
});
