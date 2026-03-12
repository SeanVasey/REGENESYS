import React from "react";
import { T } from "../lib/tokens.js";
import { Glass, SectionLabel } from "./UI.jsx";

export function SubjectInput({ value, onChange }) {
  return (
    <Glass accent style={{ padding: 14, marginBottom: 16 }}>
      <SectionLabel>TRANSFER TARGET</SectionLabel>
      <div style={{ marginTop: 10 }}>
        <div
          style={{
            fontSize: 10,
            color: T.dim,
            marginBottom: 6,
            lineHeight: 1.5,
          }}
        >
          Describe the new subject to apply the extracted style to
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. A lone astronaut standing on the edge of a Martian canyon at sunset..."
          rows={3}
          aria-label="Style transfer target subject"
          style={{
            width: "100%",
            background: "rgba(9,10,15,0.6)",
            border: `1px solid ${T.border}`,
            borderRadius: 9,
            padding: 12,
            fontSize: 12,
            lineHeight: 1.6,
            color: T.textSoft,
            fontFamily: "'Reddit Sans', sans-serif",
            resize: "vertical",
            outline: "none",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = T.tealBorder)}
          onBlur={(e) => (e.target.style.borderColor = T.border)}
        />
      </div>
    </Glass>
  );
}
