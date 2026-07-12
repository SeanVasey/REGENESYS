import { describe, it, expect } from "vitest";
import {
  HISTORY_STORAGE_KEY,
  HISTORY_LIMIT,
  loadHistory,
  saveHistory,
} from "../lib/history.js";

function memoryStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    map,
  };
}

const entry = (id, extra = {}) => ({
  id,
  mode: "single",
  platform: "universal",
  detail: "standard",
  prompt: `prompt ${id}`,
  thumbnail: null,
  timestamp: "2026-07-12T10:00:00.000Z",
  ...extra,
});

describe("history persistence", () => {
  it("round-trips history through storage", () => {
    const storage = memoryStorage();
    const history = [entry(1), entry(2)];
    expect(saveHistory(history, storage)).toBe(true);
    expect(loadHistory(storage)).toEqual(history);
  });

  it("returns an empty array when storage is empty or unavailable", () => {
    expect(loadHistory(memoryStorage())).toEqual([]);
    expect(loadHistory(null)).toEqual([]);
    expect(saveHistory([entry(1)], null)).toBe(false);
  });

  it("ignores corrupt or malformed stored data", () => {
    const storage = memoryStorage();
    storage.setItem(HISTORY_STORAGE_KEY, "{not json");
    expect(loadHistory(storage)).toEqual([]);
    storage.setItem(HISTORY_STORAGE_KEY, JSON.stringify({ nope: true }));
    expect(loadHistory(storage)).toEqual([]);
    storage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify([entry(1), { id: 2 }, null]),
    );
    expect(loadHistory(storage)).toEqual([entry(1)]);
  });

  it("caps stored history at the limit", () => {
    const storage = memoryStorage();
    const many = Array.from({ length: HISTORY_LIMIT + 10 }, (_, i) =>
      entry(i),
    );
    saveHistory(many, storage);
    expect(loadHistory(storage)).toHaveLength(HISTORY_LIMIT);
  });

  it("drops thumbnails and retries when storage quota is exceeded", () => {
    const map = new Map();
    let calls = 0;
    const storage = {
      getItem: (k) => (map.has(k) ? map.get(k) : null),
      setItem: (k, v) => {
        calls += 1;
        if (calls === 1) throw new Error("QuotaExceededError");
        map.set(k, String(v));
      },
    };
    const history = [entry(1, { thumbnail: "data:image/png;base64,AAAA" })];
    expect(saveHistory(history, storage)).toBe(true);
    const stored = loadHistory(storage);
    expect(stored[0].prompt).toBe("prompt 1");
    expect(stored[0].thumbnail).toBeUndefined();
  });
});
