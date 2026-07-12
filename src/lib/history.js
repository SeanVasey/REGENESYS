export const HISTORY_STORAGE_KEY = "regenesys.history.v1";
export const HISTORY_LIMIT = 20;

function getDefaultStorage() {
  try {
    return globalThis.localStorage;
  } catch {
    return null; // storage access can throw in privacy modes / sandboxed frames
  }
}

export function loadHistory(storage = getDefaultStorage()) {
  try {
    const raw = storage?.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((h) => h && typeof h.prompt === "string")
      .slice(0, HISTORY_LIMIT);
  } catch {
    return [];
  }
}

export function saveHistory(history, storage = getDefaultStorage()) {
  if (!storage) return false;
  const trimmed = history.slice(0, HISTORY_LIMIT);
  try {
    storage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(trimmed));
    return true;
  } catch {
    // Data-URL thumbnails can exceed the ~5MB localStorage quota; keep the
    // prompts and drop the thumbnails rather than losing the history.
    try {
      storage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(trimmed.map(({ thumbnail: _thumbnail, ...rest }) => rest)),
      );
      return true;
    } catch {
      return false;
    }
  }
}
