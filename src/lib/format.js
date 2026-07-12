/**
 * Compact relative timestamp for history entries: "just now", "5m ago",
 * "3h ago", "2d ago", then a locale date beyond a week.
 */
export function formatRelativeTime(isoString, now = Date.now()) {
  const then = new Date(isoString).getTime();
  if (Number.isNaN(then)) return "";
  const minutes = Math.floor(Math.max(0, now - then) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(isoString).toLocaleDateString();
}
