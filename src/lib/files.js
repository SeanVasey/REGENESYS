export const MAX_FILE_BYTES = 20 * 1024 * 1024; // matches the "Up to 20MB" copy in the upload zone

/**
 * Split a FileList/array into files we can analyze and files we must skip,
 * with a human-readable reason for each rejection.
 */
export function partitionImageFiles(fileList) {
  const accepted = [];
  const rejected = [];
  for (const file of Array.from(fileList || [])) {
    if (!file.type?.startsWith("image/")) {
      rejected.push({ file, reason: "not an image" });
    } else if (file.size > MAX_FILE_BYTES) {
      rejected.push({ file, reason: "larger than 20MB" });
    } else {
      accepted.push(file);
    }
  }
  return { accepted, rejected };
}
