export const MODES = [
  { id: "single", label: "Single Image", icon: "Image", desc: "Full prompt from one image" },
  { id: "multi", label: "Multi-Image Hybrid", icon: "Layers", desc: "Synthesize shared DNA" },
  { id: "negative", label: "Negative Prompt", icon: "Ban", desc: "What to exclude" },
  { id: "metadata", label: "Metadata Assembly", icon: "Tag", desc: "Tags & modular elements" },
  { id: "style-transfer", label: "Style Transfer", icon: "Palette", desc: "Extract style, apply to new subject" },
  { id: "variation", label: "Variation Engine", icon: "Wand", desc: "Generate controlled variants" },
];

export const PLATFORMS = [
  { id: "universal", label: "Universal" },
  { id: "midjourney", label: "Midjourney" },
  { id: "dalle", label: "DALL·E" },
  { id: "stable-diffusion", label: "Stable Diffusion" },
  { id: "flux", label: "Flux" },
  { id: "runway", label: "Runway ML" },
  { id: "ideogram", label: "Ideogram" },
  { id: "kling", label: "Kling" },
  { id: "sora", label: "Sora" },
  { id: "leonardo", label: "Leonardo" },
];

export const DETAILS = [
  { id: "concise", label: "Concise", desc: "Core descriptors" },
  { id: "standard", label: "Standard", desc: "Balanced detail" },
  { id: "production", label: "Production", desc: "Full technical spec" },
];

export const DEFAULT_VARIATION_CONFIG = {
  color: 50,
  mood: 50,
  style: 50,
  composition: 30,
  count: 3,
};
