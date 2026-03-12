import React, { useState, useEffect } from "react";
import { T } from "../lib/tokens.js";

const STAGES = [
  "Ingesting visual data...",
  "Deconstructing compositional geometry...",
  "Analyzing chromatic relationships...",
  "Mapping stylistic influences...",
  "Assembling prompt architecture...",
];

export function AnalysisProgress({ stage }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!stage) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % STAGES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div
      role="progressbar"
      aria-label="Analysis in progress"
      style={{
        padding: "16px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", gap: 4 }}>
        {STAGES.map((_, i) => (
          <div
            key={i}
            style={{
              width: i <= current ? 28 : 16,
              height: 3,
              borderRadius: 2,
              background: i <= current ? T.teal : T.panel,
              transition: "all 0.4s ease",
              boxShadow: i === current ? `0 0 8px ${T.tealGlow}` : "none",
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontSize: 11,
          color: T.muted,
          fontFamily: "'JetBrains Mono', monospace",
          textAlign: "center",
          animation: "vai-fadeIn 0.3s ease",
        }}
        key={current}
        aria-live="polite"
      >
        {STAGES[current]}
      </div>
    </div>
  );
}
