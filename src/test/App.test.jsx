import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";

// Mock canvas for NeuralMesh
beforeEach(() => {
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

  it("renders version badge", () => {
    render(<App />);
    expect(screen.getByText("v1.2")).toBeInTheDocument();
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
