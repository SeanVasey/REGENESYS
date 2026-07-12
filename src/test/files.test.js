import { describe, it, expect } from "vitest";
import { MAX_FILE_BYTES, partitionImageFiles } from "../lib/files.js";

const fakeFile = (name, type, size) => ({ name, type, size });

describe("partitionImageFiles", () => {
  it("accepts image files within the size limit", () => {
    const { accepted, rejected } = partitionImageFiles([
      fakeFile("a.png", "image/png", 1024),
      fakeFile("b.webp", "image/webp", MAX_FILE_BYTES),
    ]);
    expect(accepted).toHaveLength(2);
    expect(rejected).toHaveLength(0);
  });

  it("rejects non-image files with a reason", () => {
    const { accepted, rejected } = partitionImageFiles([
      fakeFile("doc.pdf", "application/pdf", 1024),
    ]);
    expect(accepted).toHaveLength(0);
    expect(rejected[0].reason).toBe("not an image");
  });

  it("rejects images over the 20MB limit with a reason", () => {
    const { accepted, rejected } = partitionImageFiles([
      fakeFile("huge.png", "image/png", MAX_FILE_BYTES + 1),
    ]);
    expect(accepted).toHaveLength(0);
    expect(rejected[0].reason).toBe("larger than 20MB");
  });

  it("handles null/undefined input and files without a type", () => {
    expect(partitionImageFiles(null)).toEqual({ accepted: [], rejected: [] });
    const { rejected } = partitionImageFiles([{ name: "x", size: 10 }]);
    expect(rejected).toHaveLength(1);
  });
});
