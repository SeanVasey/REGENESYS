import { describe, it, expect } from "vitest";
import { buildSystem, buildUser, parseResult } from "../lib/prompts.js";

describe("buildSystem", () => {
  it("returns a string containing the mode description for single", () => {
    const result = buildSystem("single", "universal", "standard", {}, "");
    expect(result).toContain("visual prompt archaeologist");
    expect(result).toContain("platform-agnostic");
  });

  it("includes platform-specific syntax for midjourney", () => {
    const result = buildSystem("single", "midjourney", "standard", {}, "");
    expect(result).toContain("Midjourney syntax");
    expect(result).toContain("::");
  });

  it("includes style subject for style-transfer mode", () => {
    const subject = "a cyberpunk cityscape";
    const result = buildSystem(
      "style-transfer",
      "universal",
      "standard",
      {},
      subject,
    );
    expect(result).toContain(subject);
    expect(result).toContain("style extraction");
  });

  it("includes variation config for variation mode", () => {
    const config = { color: 80, mood: 30, style: 60, composition: 20, count: 4 };
    const result = buildSystem(
      "variation",
      "universal",
      "standard",
      config,
      "",
    );
    expect(result).toContain("4 distinct prompt variants");
    expect(result).toContain("Color: 80%");
    expect(result).toContain("VARIANT_1");
  });

  it("includes concise detail level instructions", () => {
    const result = buildSystem("single", "universal", "concise", {}, "");
    expect(result).toContain("5-8 most impactful");
  });

  it("includes production detail level instructions", () => {
    const result = buildSystem("single", "universal", "production", {}, "");
    expect(result).toContain("Production-grade");
  });
});

describe("buildUser", () => {
  it("returns single image instruction", () => {
    const result = buildUser("single", "universal", "standard", 1, {}, "");
    expect(result).toContain("Analyze this image");
  });

  it("returns multi image instruction with count", () => {
    const result = buildUser("multi", "universal", "standard", 5, {}, "");
    expect(result).toContain("5 images");
  });

  it("returns negative prompt instruction", () => {
    const result = buildUser("negative", "universal", "standard", 1, {}, "");
    expect(result).toContain("negative prompt");
  });

  it("returns metadata instruction", () => {
    const result = buildUser("metadata", "universal", "standard", 1, {}, "");
    expect(result).toContain("metadata");
  });

  it("returns style transfer instruction", () => {
    const result = buildUser("style-transfer", "universal", "standard", 1, {}, "test");
    expect(result).toContain("style");
  });

  it("returns variation instruction with count", () => {
    const config = { count: 4 };
    const result = buildUser("variation", "universal", "standard", 1, config, "");
    expect(result).toContain("4 controlled prompt variants");
  });

  it("falls back to generic instruction for unknown mode", () => {
    const result = buildUser("unknown", "universal", "standard", 1, {}, "");
    expect(result).toContain("Analyze this image");
  });
});

describe("parseResult", () => {
  it("parses structured output with all sections", () => {
    const text = `===PROMPT===
A vast desert landscape at golden hour

===TECHNICAL===
Shot with 85mm lens, f/2.8

===TAGS===
landscape, desert, golden hour, cinematic

===NEGATIVE===
blurry, low quality`;

    const result = parseResult(text, "single");
    expect(result.prompt).toBe("A vast desert landscape at golden hour");
    expect(result.technical).toBe("Shot with 85mm lens, f/2.8");
    expect(result.tags).toEqual([
      "landscape",
      "desert",
      "golden hour",
      "cinematic",
    ]);
    expect(result.negativePrompt).toBe("blurry, low quality");
    expect(result.variants).toEqual([]);
  });

  it("parses variation mode with variants", () => {
    const text = `===PROMPT===
Base prompt here

===VARIANT_1===
First variant

===VARIANT_2===
Second variant

===VARIANT_3===
Third variant

===TECHNICAL===
Technical info

===TAGS===
tag1, tag2

===NEGATIVE===
neg prompt`;

    const result = parseResult(text, "variation");
    expect(result.prompt).toBe("Base prompt here");
    expect(result.variants).toHaveLength(3);
    expect(result.variants[0]).toBe("First variant");
    expect(result.variants[2]).toBe("Third variant");
  });

  it("falls back to raw text when no sections found", () => {
    const text = "Just some raw prompt text without any structure.";
    const result = parseResult(text, "single");
    expect(result.prompt).toBe(text);
    expect(result.technical).toBeNull();
    expect(result.tags).toEqual([]);
    expect(result.negativePrompt).toBeNull();
  });

  it("strips markdown code fences", () => {
    const text = "```text\n===PROMPT===\nClean prompt\n```";
    const result = parseResult(text, "single");
    expect(result.prompt).toBe("Clean prompt");
  });

  it("handles empty tags gracefully", () => {
    const text = `===PROMPT===
A prompt

===TAGS===
, , ,`;

    const result = parseResult(text, "single");
    expect(result.tags).toEqual([]);
  });
});
