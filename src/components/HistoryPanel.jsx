import React from "react";
import { T } from "../lib/tokens.js";
import { formatRelativeTime } from "../lib/format.js";
import { Icons } from "./Icons.jsx";
import { Glass, Collapsible } from "./UI.jsx";

export function HistoryPanel({ history, onSelect, onClear, onRemove }) {
  if (!history.length) return null;
  return (
    <Glass style={{ padding: 14, marginBottom: 16 }}>
      <Collapsible title="PROMPT HISTORY" defaultOpen={false} titleColor={T.slate}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 8,
          }}
        >
          <button
            onClick={onClear}
            style={{
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.12)",
              borderRadius: 6,
              padding: "3px 8px",
              fontSize: 10,
              color: T.error,
              cursor: "pointer",
              fontFamily: "'Reddit Sans', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Icons.Trash /> Clear All
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {history.map((h) => (
            <div
              key={h.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(h);
                }
              }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                background: T.glass,
                border: `1px solid ${T.border}`,
                borderRadius: 8,
                padding: "8px 10px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onClick={() => onSelect(h)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = T.tealBorder;
                e.currentTarget.style.background = T.tealGlass;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.background = T.glass;
              }}
            >
              {h.thumbnail && (
                <img
                  src={h.thumbnail}
                  alt=""
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 5,
                    objectFit: "cover",
                    border: `1px solid ${T.borderSubtle}`,
                    flexShrink: 0,
                  }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginBottom: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: 9,
                      color: T.teal,
                      fontFamily: "'JetBrains Mono', monospace",
                      textTransform: "uppercase",
                    }}
                  >
                    {h.mode}
                  </span>
                  <span style={{ fontSize: 9, color: T.dim }}>·</span>
                  <span style={{ fontSize: 9, color: T.dim }}>
                    {h.platform}
                  </span>
                  {h.timestamp && (
                    <>
                      <span style={{ fontSize: 9, color: T.dim }}>·</span>
                      <span style={{ fontSize: 9, color: T.dim }}>
                        {formatRelativeTime(h.timestamp)}
                      </span>
                    </>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: T.muted,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h.prompt?.slice(0, 80)}...
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(h.id);
                }}
                aria-label="Remove from history"
                style={{
                  background: "none",
                  border: "none",
                  color: T.dim,
                  cursor: "pointer",
                  padding: 2,
                  flexShrink: 0,
                }}
              >
                <Icons.X />
              </button>
            </div>
          ))}
        </div>
      </Collapsible>
    </Glass>
  );
}
