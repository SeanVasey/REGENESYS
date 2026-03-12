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
    expect(screen.getByText("PROMPT GENERATOR")).toBeInTheDocument();
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
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(`\u00A9 ${year} VASEY/AI`)).toBeInTheDocument();
  });

  it("renders version badge", () => {
    render(<App />);
    expect(screen.getByText("v1.2")).toBeInTheDocument();
  });

  it("renders Systems Online indicator", () => {
    render(<App />);
    expect(screen.getByText("Systems Online")).toBeInTheDocument();
  });
});
