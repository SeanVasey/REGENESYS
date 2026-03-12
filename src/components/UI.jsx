import React, { useState } from "react";
import { T } from "../lib/tokens.js";
import { Icons } from "./Icons.jsx";

export function Glass({ children, glow, accent, style = {} }) {
  const bg = glow ? T.tealGlass : accent ? "rgba(51,65,85,0.06)" : T.glass;
  const bdr = glow
    ? T.tealBorder
    : accent
      ? "rgba(100,116,139,0.1)"
      : T.border;
  const shadow = glow
    ? `0 0 30px ${T.tealGlow}, 0 1px 0 inset rgba(0,206,209,0.08)`
    : "0 4px 24px rgba(0,0,0,0.25), 0 1px 0 inset rgba(255,255,255,0.03)";
  return (
    <div
      style={{
        background: bg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${bdr}`,
        borderRadius: 14,
        boxShadow: shadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SectionLabel({ children, color }) {
  return (
    <div
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 14,
        letterSpacing: 1.8,
        color: color || T.slateLight,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span>{children}</span>
      <span
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg, ${T.border}, transparent)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      setTimeout(() => setOk(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setOk(true);
        setTimeout(() => setOk(false), 2000);
      } catch (e) {
        console.error("Copy failed", e);
      }
      document.body.removeChild(textArea);
    }
  };
  return (
    <button
      onClick={copy}
      aria-label={ok ? "Copied to clipboard" : "Copy to clipboard"}
      style={{
        background: ok ? "rgba(16,185,129,0.1)" : T.glassHover,
        border: `1px solid ${ok ? "rgba(16,185,129,0.25)" : T.border}`,
        borderRadius: 7,
        padding: "5px 10px",
        color: ok ? T.success : T.muted,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11,
        fontFamily: "'Reddit Sans', sans-serif",
        transition: "all 0.2s ease",
      }}
    >
      {ok ? <Icons.Check /> : <Icons.Copy />}
      {ok ? "Copied" : "Copy"}
    </button>
  );
}

export function Collapsible({ title, children, defaultOpen = true, titleColor }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: open ? 12 : 0,
        }}
      >
        <SectionLabel color={titleColor}>{title}</SectionLabel>
        <span
          style={{ color: T.dim, marginLeft: 8, flexShrink: 0 }}
          aria-hidden="true"
        >
          {open ? <Icons.ChevUp /> : <Icons.ChevDown />}
        </span>
      </button>
      {open && (
        <div style={{ animation: "vai-fadeIn 0.25s ease" }}>{children}</div>
      )}
    </div>
  );
}
