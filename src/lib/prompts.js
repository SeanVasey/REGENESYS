export function buildSystem(
  mode,
  platform,
  detail,
  variationConfig,
  styleSubject,
) {
  const plat = {
    universal:
      "Output a platform-agnostic prompt that works across all major generative AI systems.",
    midjourney:
      "Optimize for Midjourney syntax: use :: for weight separation, --ar for aspect ratio, --v for version, --s for stylize, --c for chaos. Include appropriate parameter flags.",
    dalle:
      "Optimize for DALL·E: natural language descriptions, specify art styles clearly, include lighting and composition as prose. Avoid weight syntax.",
    "stable-diffusion":
      "Optimize for Stable Diffusion: comma-separated tags, quality modifiers (masterpiece, best quality, highly detailed), weighted tokens with (parentheses:1.2). Include sampling method hints.",
    flux: "Optimize for Flux: natural language with precise technical descriptors, aspect ratio and quality parameters. Clean compositional language.",
    runway:
      "Optimize for Runway ML: cinematic descriptions, motion language, camera movements (dolly, pan, zoom, tracking shot), atmospheric and temporal descriptors. Include frame rate and duration hints where relevant.",
    ideogram:
      "Optimize for Ideogram: typography handling, text rendering instructions, clean compositional descriptors. Specify text content clearly.",
    kling: "Optimize for Kling: cinematic motion descriptions, camera angle specifications, duration and movement parameters. Emphasize physical realism and motion dynamics.",
    sora: "Optimize for Sora: detailed scene descriptions with temporal progression, camera motion language, atmospheric continuity. Describe how the scene unfolds over time.",
    leonardo:
      "Optimize for Leonardo AI: include style presets, guidance scale suggestions, and negative prompt formatting. Use quality tags and artistic movement references.",
  };

  const det = {
    concise:
      "Keep the prompt concise—5-8 most impactful descriptors. No fluff.",
    standard:
      "Balanced prompt: composition, lighting, style, mood, and technical parameters.",
    production:
      "Production-grade: exhaustive technical spec including camera parameters, lens characteristics, lighting setup (key/fill/rim), color theory (palette, harmony, temperature), material/texture analysis, atmospheric effects, post-processing, artistic movement references, compositional geometry.",
  };

  const md = {
    single:
      "You are an expert visual prompt archaeologist. Analyze the uploaded image and reverse-engineer a detailed generative AI prompt that could recreate it. Deconstruct every visual decision: composition, perspective, lighting, color grading, texture, atmosphere, mood, style, and artistic influences.",
    multi:
      "You are an expert visual prompt archaeologist. Analyze all uploaded images collectively. Identify shared visual DNA—common stylistic elements, consistent technical approaches, thematic connections, recurring aesthetic choices. Synthesize a single hybrid prompt capturing the essential character shared across all images.",
    negative:
      "You are an expert in negative prompt engineering. Analyze the uploaded image(s) and determine what the image explicitly avoids. Generate a comprehensive negative prompt—common artifacts, unwanted styles, quality issues, compositional elements that would break the intended aesthetic.",
    metadata:
      "You are an expert visual metadata analyst. Analyze the uploaded image(s) and generate structured metadata: categorical tags, style classifications, technical parameters, mood descriptors, compositional elements, modular descriptive elements for remixing.",
    "style-transfer": `You are an expert in visual style extraction and transfer. Analyze the uploaded image(s) to extract the pure stylistic essence—color palette, lighting approach, texture treatment, artistic movement, compositional philosophy, mood, and technical rendering characteristics. Then apply that extracted style to the following new subject:\n\nSUBJECT: "${styleSubject}"\n\nThe output prompt should recreate the STYLE of the source image(s) but with the NEW SUBJECT described above. Preserve every stylistic nuance while completely replacing the content.`,
    variation: `You are an expert in controlled prompt variation. Analyze the uploaded image(s) and generate ${variationConfig?.count || 3} distinct prompt variants. Each variant should shift the original along these axes:\n- Color: ${variationConfig?.color || 50}% deviation\n- Mood: ${variationConfig?.mood || 50}% deviation\n- Style: ${variationConfig?.style || 50}% deviation\n- Composition: ${variationConfig?.composition || 30}% deviation\n\nLow percentages = subtle shifts. High percentages = dramatic reinterpretation. Each variant should be clearly distinct while maintaining recognizable connection to the source.`,
  };

  const formatRules =
    mode === "variation"
      ? `\n\nCRITICAL FORMATTING RULES:\nRespond using this exact structure:\n\n===PROMPT===\n(The base prompt from analyzing the source)\n\n===VARIANT_1===\n(First variant prompt)\n\n===VARIANT_2===\n(Second variant prompt)\n\n===VARIANT_3===\n(Third variant prompt — include more if count > 3)\n\n===TECHNICAL===\n(Technical breakdown)\n\n===TAGS===\n(Comma-separated style tags, 10-25 tags)\n\n===NEGATIVE===\n(Negative prompt)\n\nEach section MUST start with the exact header. No markdown. Plain text only.`
      : `\n\nCRITICAL FORMATTING RULES:\nRespond using this exact structure:\n\n===PROMPT===\n(The generated prompt)\n\n===TECHNICAL===\n(Technical breakdown: lighting, color theory, composition, camera/lens, post-processing)\n\n===TAGS===\n(Comma-separated style tags, 10-25 tags)\n\n===NEGATIVE===\n(Negative prompt: what to avoid/exclude)\n\nEach section MUST start with the exact header. No markdown. Plain text only.`;

  return `${md[mode]}\n\n${plat[platform]}\n${det[detail]}${formatRules}`;
}

export function buildUser(
  mode,
  _platform,
  _detail,
  count,
  variationConfig,
  _styleSubject,
) {
  if (mode === "single")
    return "Analyze this image and reverse-engineer the generative AI prompt that could recreate it. Follow the formatting structure specified.";
  if (mode === "multi")
    return `Analyze these ${count} images collectively. Identify shared visual DNA and synthesize a hybrid prompt. Follow the formatting structure specified.`;
  if (mode === "negative")
    return "Analyze this image and generate a comprehensive negative prompt. Follow the formatting structure specified.";
  if (mode === "metadata")
    return "Analyze this image and generate structured metadata tags and modular descriptive elements. Follow the formatting structure specified.";
  if (mode === "style-transfer")
    return "Analyze this image to extract its complete visual style, then apply that style to the subject described in your instructions. Follow the formatting structure specified.";
  if (mode === "variation")
    return `Analyze this image and generate ${variationConfig?.count || 3} controlled prompt variants as specified. Follow the formatting structure specified.`;
  return "Analyze this image. Follow the formatting structure specified.";
}

export function parseResult(text, mode) {
  const clean = text.replace(/```[a-z]*\n?/g, "").replace(/```/g, "");

  const extract = (header) => {
    const pattern = new RegExp(
      `===${header}===\\s*([\\s\\S]*?)(?=\\n===|$)`,
      "i",
    );
    const match = clean.match(pattern);
    return match ? match[1].trim() : null;
  };

  const prompt = extract("PROMPT");
  const technical = extract("TECHNICAL");
  const tagsRaw = extract("TAGS");
  const negativePrompt = extract("NEGATIVE");

  const variants = [];
  if (mode === "variation") {
    for (let i = 1; i <= 10; i++) {
      const v = extract(`VARIANT_${i}`);
      if (v) variants.push(v);
    }
  }

  const tags = tagsRaw
    ? tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  if (
    !prompt &&
    !technical &&
    tags.length === 0 &&
    !negativePrompt &&
    variants.length === 0
  ) {
    return {
      prompt: clean.trim(),
      technical: null,
      tags: [],
      negativePrompt: null,
      variants: [],
    };
  }

  return {
    prompt: prompt || clean.trim(),
    technical,
    tags,
    negativePrompt,
    variants,
  };
}
