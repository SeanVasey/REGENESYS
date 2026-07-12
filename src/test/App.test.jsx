import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";

// Mock canvas for NeuralMesh
beforeEach(() => {
  localStorage.clear();
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    strokeStyle: "",
    fillStyle: "",
    lineWidth: 0,
    shadowBlur: 0,
    shadowColor: "",
  }));

  vi.spyOn(window, "requestAnimationFrame").mockImplementation((_cb) => {
    return 1;
  });
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
});

describe("App", () => {
  it("renders the header with REGENESYS title", () => {
    render(<App />);
    expect(screen.getByText("REGENESYS")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Visual Prompt Reverse-Engineering & Generation System.",
      ),
    ).toBeInTheDocument();
  });

  it("renders VASEY/AI branding", () => {
    render(<App />);
    expect(screen.getByText("VASEY/AI PRESENTS")).toBeInTheDocument();
  });

  it("renders all 6 analysis mode buttons", () => {
    render(<App />);
    expect(screen.getByText("Single Image")).toBeInTheDocument();
    expect(screen.getByText("Multi-Image Hybrid")).toBeInTheDocument();
    expect(screen.getByText("Negative Prompt")).toBeInTheDocument();
    expect(screen.getByText("Metadata Assembly")).toBeInTheDocument();
    expect(screen.getByText("Style Transfer")).toBeInTheDocument();
    expect(screen.getByText("Variation Engine")).toBeInTheDocument();
  });

  it("renders all platform buttons", () => {
    render(<App />);
    expect(screen.getByText("Universal")).toBeInTheDocument();
    expect(screen.getByText("Midjourney")).toBeInTheDocument();
    expect(screen.getByText("Stable Diffusion")).toBeInTheDocument();
  });

  it("renders all detail level buttons", () => {
    render(<App />);
    expect(screen.getByText("Concise")).toBeInTheDocument();
    expect(screen.getByText("Standard")).toBeInTheDocument();
    expect(screen.getByText("Production")).toBeInTheDocument();
  });

  it("renders upload zone", () => {
    render(<App />);
    expect(
      screen.getByText("Drop images or tap to upload"),
    ).toBeInTheDocument();
  });

  it("renders analyze button in disabled state without images", () => {
    render(<App />);
    const btn = screen.getByText("Analyze Image");
    expect(btn.closest("button")).toBeDisabled();
  });

  it("switches mode when clicking mode button", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText("Negative Prompt"));
    expect(
      screen.getByText("Generate Negative Prompt"),
    ).toBeInTheDocument();
  });

  it("shows subject input when style-transfer mode selected", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText("Style Transfer"));
    expect(
      screen.getByLabelText("Style transfer target subject"),
    ).toBeInTheDocument();
  });

  it("shows variation controls when variation mode selected", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText("Variation Engine"));
    expect(screen.getByText("VARIATION AXES")).toBeInTheDocument();
    expect(screen.getByLabelText("Color Shift deviation")).toBeInTheDocument();
  });

  it("renders footer with copyright", () => {
    render(<App />);
    expect(screen.getByText("A VASEY/AI Production")).toBeInTheDocument();
    expect(
      screen.getByText(/All rights reserved/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "VASEY Multimedia" }),
    ).toHaveAttribute("href", "https://vaseymultimedia.com");
  });

  it("renders version badge sourced from package.json", () => {
    render(<App />);
    expect(screen.getByText(`v${__APP_VERSION__}`)).toBeInTheDocument();
  });

  it("restores persisted prompt history from localStorage", () => {
    localStorage.setItem(
      "regenesys.history.v1",
      JSON.stringify([
        {
          id: 1,
          mode: "single",
          platform: "universal",
          detail: "standard",
          prompt: "a persisted prompt from a previous session",
          thumbnail: null,
          timestamp: new Date().toISOString(),
        },
      ]),
    );
    render(<App />);
    expect(screen.getByText("PROMPT HISTORY")).toBeInTheDocument();
  });

  it("shows a dismissible notice when an oversized file is skipped", async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByLabelText("Upload images");
    const big = new File(["x"], "huge.png", { type: "image/png" });
    Object.defineProperty(big, "size", { value: 21 * 1024 * 1024 });
    await user.upload(input, big);
    const notice = await screen.findByRole("alert");
    expect(notice).toHaveTextContent("huge.png skipped (larger than 20MB)");
    await user.click(
      screen.getByRole("button", { name: "Dismiss upload notice" }),
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("adds images pasted from the clipboard", async () => {
    render(<App />);
    const file = new File(["png-bytes"], "pasted.png", { type: "image/png" });
    const event = new Event("paste", { bubbles: true });
    event.clipboardData = { files: [file] };
    window.dispatchEvent(event);
    expect(await screen.findByText("UPLOADED (1)")).toBeInTheDocument();
  });

  it("renders footer brand links", () => {
    render(<App />);
    expect(
      screen.getByRole("link", { name: "Vasey Multimedia" }),
    ).toHaveAttribute("href", "https://vaseymultimedia.com");
    for (const link of screen.getAllByRole("link", { name: "VASEY/AI" })) {
      expect(link).toHaveAttribute("href", "https://vasey.ai");
    }
  });

  it("applies iOS safe-area insets to header, main, and footer", () => {
    const { container } = render(<App />);
    const header = container.querySelector("header");
    const main = container.querySelector("main");
    const footer = container.querySelector("footer");
    expect(header.getAttribute("style")).toContain("safe-area-inset-top");
    expect(header.getAttribute("style")).toContain("safe-area-inset-left");
    expect(main.getAttribute("style")).toContain("safe-area-inset-right");
    expect(footer.getAttribute("style")).toContain("safe-area-inset-bottom");
    expect(footer.getAttribute("style")).toContain("safe-area-inset-left");
  });

  it("renders a fixed top safe-area scrim that masks scrolling content", () => {
    const { container } = render(<App />);
    const scrim = container.querySelector(".vai-top-scrim");
    expect(scrim).not.toBeNull();
    expect(scrim).toHaveAttribute("aria-hidden", "true");
    const css = container.querySelector("style").textContent;
    const rule = css.match(/\.vai-top-scrim\s*\{[^}]*\}/)?.[0];
    expect(rule).toBeDefined();
    expect(rule).toContain("position: fixed");
    expect(rule).toContain("height: env(safe-area-inset-top, 0px)");
    expect(rule).toContain("pointer-events: none");
    // Fill must come from the app background token (T.bg) plus the same
    // ambient radial as the fixed glow layer — not a hardcoded approximation.
    expect(rule).toContain("#090A0F");
    expect(rule).toContain(
      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,206,209,0.04) 0%, transparent 70%)",
    );
  });

  it("sizes the app shell with dynamic viewport height and a vh fallback", () => {
    const { container } = render(<App />);
    const shell = container.querySelector(".vai-shell");
    expect(shell).not.toBeNull();
    const css = container.querySelector("style").textContent;
    expect(css).toContain(
      ".vai-shell { min-height: 100vh; min-height: 100dvh; }",
    );
  });
});
