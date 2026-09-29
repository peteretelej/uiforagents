// Color math for the generated surfaces' contrast gate: parse oklch() (the
// only color format the contract allows), composite alpha over a backdrop,
// and compute WCAG contrast ratios. Zero dependencies.

const OKLCH_PATTERN = /^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)$/;

export function parseOklch(value) {
  const match = OKLCH_PATTERN.exec(String(value).trim());
  if (!match) throw new Error(`color: unsupported color value "${value}" (oklch() only)`);
  const pct = (part) => (part.endsWith("%") ? parseFloat(part) / 100 : parseFloat(part));
  return { l: pct(match[1]), c: parseFloat(match[2]), h: parseFloat(match[3]), a: match[4] === undefined ? 1 : pct(match[4]) };
}

// OKLab -> linear sRGB (Bjorn Ottosson's constants).
export function oklchToLinearSrgb({ l, c, h }) {
  const rad = (h * Math.PI) / 180;
  const l_ = l + 0.3963377774 * c * Math.cos(rad) + 0.2158037573 * c * Math.sin(rad);
  const m_ = l - 0.1055613458 * c * Math.cos(rad) - 0.0638541728 * c * Math.sin(rad);
  const s_ = l - 0.0894841775 * c * Math.cos(rad) - 1.291485548 * c * Math.sin(rad);
  const L = l_ ** 3;
  const M = m_ ** 3;
  const S = s_ ** 3;
  return [
    4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S,
  ];
}

function luminance(rgb) {
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function composite(color, backdrop) {
  const parsed = parseOklch(color);
  const rgb = oklchToLinearSrgb(parsed);
  if (parsed.a >= 1) return rgb;
  const under = oklchToLinearSrgb(parseOklch(backdrop));
  return rgb.map((channel, i) => channel * parsed.a + under[i] * (1 - parsed.a));
}

// Contrast ratio for a fg-on-bg token pair; alpha-bearing tokens composite
// over the theme's background at their stated alpha before the ratio is
// computed.
export function tokenPairRatio(tokens, fgToken, bgToken) {
  const themeBg = tokens["--uifa-bg"];
  if (themeBg === undefined) throw new Error('color: theme is missing the "--uifa-bg" token');
  for (const token of [fgToken, bgToken]) {
    if (tokens[token] === undefined) throw new Error(`color: theme is missing token "${token}"`);
  }
  const lFg = luminance(composite(tokens[fgToken], themeBg));
  const lBg = luminance(composite(tokens[bgToken], themeBg));
  const [hi, lo] = lFg >= lBg ? [lFg, lBg] : [lBg, lFg];
  return (hi + 0.05) / (lo + 0.05);
}
