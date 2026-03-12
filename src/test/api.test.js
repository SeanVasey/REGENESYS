import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchWithRetry } from "../lib/api.js";

describe("fetchWithRetry", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns data on successful response", async () => {
    const mockData = { result: "ok" };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const result = await fetchWithRetry("https://example.com/api", {});
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("retries on failure and eventually succeeds", async () => {
    const mockData = { result: "ok" };
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchWithRetry(
      "https://example.com/api",
      {},
      2,
    );
    expect(result).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("throws after exhausting retries", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Persistent failure")),
    );

    await expect(
      fetchWithRetry("https://example.com/api", {}, 1),
    ).rejects.toThrow("Persistent failure");
  });

  it("throws on HTTP error with error message from body", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: () =>
          Promise.resolve({ error: { message: "Rate limited" } }),
      }),
    );

    await expect(
      fetchWithRetry("https://example.com/api", {}, 1),
    ).rejects.toThrow("Rate limited");
  });

  it("handles non-JSON error response gracefully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error("Not JSON")),
      }),
    );

    await expect(
      fetchWithRetry("https://example.com/api", {}, 1),
    ).rejects.toThrow("HTTP Error 500");
  });
});
