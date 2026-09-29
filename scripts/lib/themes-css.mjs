// Shared theme-CSS serializer: the ONE generation path for [data-theme]
// token blocks, dialect layers, and the cascade-layer scaffold, used by BOTH
// scripts/build-arena.mjs (themes/tokens.css + arena pages) and
// scripts/uiforagents.mjs (the consumer's emitted themes.css).

export const LAYER_STATEMENT = "@layer uif-reset, uif-tokens, uif-items, uif-themes;";

export const RESET_BLOCK = "@layer uif-reset {\n  *, *::before, *::after { box-sizing: border-box; }\n}";

export function themeTokenBlock(theme, { ownsRoot = false } = {}) {
  const selectors = ownsRoot ? [":root", `[data-theme="${theme.slug}"]`] : [`[data-theme="${theme.slug}"]`];
  const body = Object.entries(theme.tokens)
    .map(([token, value]) => `  ${token}: ${value};`)
    .join("\n");
  return `${selectors.join(",\n")} {\n${body}\n}`;
}

export function themeRootBlock(theme) {
  const body = Object.entries(theme.tokens)
    .map(([token, value]) => `  ${token}: ${value};`)
    .join("\n");
  return `:root {\n${body}\n}`;
}

// A theme's dialect CSS: the themes/dialects/<slug>.css content verbatim.
// Dialect files are standalone order-safe CSS (they re-declare the layer
// statement and scope their rules under [data-theme] inside their own
// uif-themes block), so inlining needs no wrapper. Null when the theme
// carries no dialect CSS.
export function themeDialectBlock(theme) {
  const dialect = (theme.dialect ?? "").trim();
  if (!dialect) return null;
  return dialect;
}

export function themesTokensLayer(themes, { firstOwnsRoot = true } = {}) {
  const blocks = themes.map((theme, index) => themeTokenBlock(theme, { ownsRoot: firstOwnsRoot && index === 0 }));
  return `@layer uif-tokens {\n${blocks.join("\n\n")}\n}`;
}

// Full combined surface: header, layer statement, reset, tokens, dialects.
export function themesCss({ themes, header, firstOwnsRoot = true, withDialects = true }) {
  const parts = [header, LAYER_STATEMENT, RESET_BLOCK, themesTokensLayer(themes, { firstOwnsRoot })];
  if (withDialects) {
    const dialects = themes.map(themeDialectBlock).filter(Boolean);
    if (dialects.length > 0) parts.push(dialects.join("\n\n"));
  }
  return parts.join("\n\n") + "\n";
}

// Single-theme surface for consumers who configure one theme slug: that
// theme's block ships as :root.
export function singleThemeCss({ theme, header, withDialects = true }) {
  const parts = [header, LAYER_STATEMENT, RESET_BLOCK, themeRootBlock(theme)];
  if (withDialects) {
    const dialect = themeDialectBlock(theme);
    if (dialect) parts.push(dialect);
  }
  return parts.join("\n\n") + "\n";
}

// Per-theme page style for the arena iframes: the same statement + layer
// structure as the tokens surface, dialects included, without the header or
// reset (the arena chrome carries its own box-sizing rule).
export function themesLayerStyle(themes) {
  const dialects = themes.map(themeDialectBlock).filter(Boolean);
  const dialectCss = dialects.length > 0 ? `\n\n${dialects.join("\n\n")}` : "";
  return `${LAYER_STATEMENT}\n\n${themesTokensLayer(themes)}${dialectCss}`;
}
