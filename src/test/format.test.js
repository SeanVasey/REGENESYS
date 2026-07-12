import { describe, it, expect } from "vitest";
import { formatRelativeTime } from "../lib/format.js";

const NOW = new Date("2026-07-12T12:00:00Z").getTime();
const at = (msAgo) => new Date(NOW - msAgo).toISOString();

describe("formatRelativeTime", () => {
  it("returns 'just now' for timestamps under a minute old", () => {
    expect(formatRelativeTime(at(30 * 1000), NOW)).toBe("just now");
  });

  it("returns minutes for timestamps under an hour old", () => {
    expect(formatRelativeTime(at(5 * 60 * 1000), NOW)).toBe("5m ago");
  });

  it("returns hours for timestamps under a day old", () => {
    expect(formatRelativeTime(at(3 * 60 * 60 * 1000), NOW)).toBe("3h ago");
  });

  it("returns days for timestamps under a week old", () => {
    expect(formatRelativeTime(at(2 * 24 * 60 * 60 * 1000), NOW)).toBe(
      "2d ago",
    );
  });

  it("returns a locale date beyond a week", () => {
    const iso = at(10 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(iso, NOW)).toBe(
      new Date(iso).toLocaleDateString(),
    );
  });

  it("treats future timestamps as 'just now' (clock skew)", () => {
    expect(formatRelativeTime(at(-60 * 1000), NOW)).toBe("just now");
  });

  it("returns empty string for invalid input", () => {
    expect(formatRelativeTime("not-a-date", NOW)).toBe("");
  });
});
