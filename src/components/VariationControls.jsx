import React from "react";
import { T } from "../lib/tokens.js";
import { Glass, SectionLabel } from "./UI.jsx";

const AXES = [
  { id: "color", label: "Color Shift", icon: "\uD83C\uDFA8" },
  { id: "mood", label: "Mood Shift", icon: "\uD83C\uDF17" },
  { id: "style", label: "Style Drift", icon: "\u2726" },
  { id: "composition", label: "Composition", icon: "\u25EB" },
];

export function VariationControls({ config, onChange }) {
  return (
    <Glass accent style={{ padding: 14, marginBottom: 16 }}>
      <SectionLabel>VARIATION AXES</SectionLabel>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 10,
        }}
      >
        {AXES.map((ax) => {
          const val = config[ax.id] ?? 50;
          return (
            <div key={ax.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span style={{ fontSize: 11, color: T.muted }}>
                  {ax.icon} {ax.label}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: T.teal,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {val}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={val}
                aria-label={`${ax.label} deviation`}
                onChange={(e) =>
                  onChange({ ...config, [ax.id]: parseInt(e.target.value, 10) })
                }
                style={{
                  width: "100%",
                  height: 4,
                  appearance: "none",
                  WebkitAppearance: "none",
                  background: `linear-gradient(90deg, ${T.teal} ${val}%, ${T.panel} ${val}%)`,
                  borderRadius: 2,
                  outline: "none",
                  cursor: "pointer",
                }}
              />
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 10, color: T.dim, marginBottom: 6 }}>
          Number of variants
        </div>
        <div style={{ display: "flex", gap: 6 }} role="radiogroup" aria-label="Number of variants">
          {[2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => onChange({ ...config, count: n })}
              role="radio"
              aria-checked={(config.count || 3) === n}
              style={{
                flex: 1,
                background:
                  (config.count || 3) === n ? T.tealGlass : "transparent",
                border: `1px solid ${(config.count || 3) === n ? T.tealBorder : T.border}`,
                borderRadius: 7,
                padding: "6px 0",
                fontSize: 12,
                fontWeight: 600,
                color: (config.count || 3) === n ? T.teal : T.muted,
                cursor: "pointer",
                fontFamily: "'Reddit Sans', sans-serif",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </Glass>
  );
}
