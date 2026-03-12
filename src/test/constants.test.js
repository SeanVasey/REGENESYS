import { describe, it, expect } from "vitest";
import { MODES, PLATFORMS, DETAILS, DEFAULT_VARIATION_CONFIG } from "../lib/constants.js";

describe("constants", () => {
  it("MODES has 6 entries with required fields", () => {
    expect(MODES).toHaveLength(6);
    MODES.forEach((m) => {
      expect(m).toHaveProperty("id");
      expect(m).toHaveProperty("label");
      expect(m).toHaveProperty("icon");
      expect(m).toHaveProperty("desc");
    });
  });

  it("MODES ids are unique", () => {
    const ids = MODES.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("PLATFORMS has 10 entries", () => {
    expect(PLATFORMS).toHaveLength(10);
    PLATFORMS.forEach((p) => {
      expect(p).toHaveProperty("id");
      expect(p).toHaveProperty("label");
    });
  });

  it("DETAILS has 3 entries", () => {
    expect(DETAILS).toHaveLength(3);
  });

  it("DEFAULT_VARIATION_CONFIG has expected shape", () => {
    expect(DEFAULT_VARIATION_CONFIG).toEqual({
      color: 50,
      mood: 50,
      style: 50,
      composition: 30,
      count: 3,
    });
  });
});
