// Shared consumer-config loader for the flow CLI (scripts/uiforagents.mjs) and the
// adherence linter (validation/check.mjs), so both tools can never disagree
// about where uiforagents.json lives, how its paths resolve, or which globs
// match.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";

export const CONFIG_NAME = "uiforagents.json";

const TOP_LEVEL_KEYS = ["kit", "theme", "themesFile", "items", "dest", "lint"];
const DEST_KEYS = ["itemsDir", "tokensCss", "docs"];

export function findConfig(startDir) {
  let dir = resolve(startDir);
  for (;;) {
    const candidate = join(dir, CONFIG_NAME);
    if (statSync(candidate, { throwIfNoEntry: false })?.isFile()) return candidate;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

// Exported so both CLIs share the "--config must carry a value" rule.
export function configFlagValue(args, label) {
  const index = args.indexOf("--config");
  if (index === -1) return null;
  const value = args[index + 1];
  if (value === undefined || value.startsWith("--")) {
    throw new Error(`${label}: --config requires a path`);
  }
  return value;
}

// Every write/lint path in uiforagents.json resolves against the config
// file's repo root; a destination that escapes that root is refused.
export function resolveInRoot(root, value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`config: ${label} must be a path`);
  }
  const resolved = resolve(root, value);
  const rel = relative(root, resolved);
  if (rel === "" || rel.startsWith("..") || isAbsolute(rel)) {
    throw new Error(`config: ${label} "${value}" escapes the config root (${root})`);
  }
  return resolved;
}

// `themesFile` is read-only input, not a write destination: the module
// may live anywhere, so absolute paths are allowed and relative paths
// resolve against the config file's directory without root confinement.
export function resolveThemesFile(root, value) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`config: themesFile must be a path`);
  }
  return resolve(root, value);
}

export function loadConfig(configPath) {
  let config;
  try {
    config = JSON.parse(readFileSync(configPath, "utf8"));
  } catch (err) {
    throw new Error(`config: cannot parse ${configPath} (${err.message})`);
  }
  const unknown = Object.keys(config).filter((key) => !TOP_LEVEL_KEYS.includes(key));
  if (unknown.length > 0) {
    throw new Error(`config: ${configPath}: unknown key "${unknown[0]}"`);
  }
  for (const key of ["kit", "theme", "items", "dest", "lint"]) {
    if (!(key in config)) throw new Error(`config: ${configPath}: missing required key "${key}"`);
  }
  if (typeof config.kit !== "string" || !config.kit.trim()) {
    throw new Error(`config: ${configPath}: "kit" must point at the uiforagents checkout`);
  }
  if (typeof config.theme !== "string" || !config.theme.trim()) {
    throw new Error(`config: ${configPath}: "theme" must be a theme slug or "all"`);
  }
  if (
    !Array.isArray(config.items) ||
    config.items.length === 0 ||
    config.items.some((name) => typeof name !== "string" || !name.trim())
  ) {
    throw new Error(`config: ${configPath}: "items" must be a non-empty array of item names`);
  }
  if (typeof config.dest !== "object" || config.dest === null || Array.isArray(config.dest)) {
    throw new Error(`config: ${configPath}: "dest" must be an object`);
  }
  const destUnknown = Object.keys(config.dest).filter((key) => !DEST_KEYS.includes(key));
  if (destUnknown.length > 0) {
    throw new Error(`config: ${configPath}: unknown dest key "${destUnknown[0]}"`);
  }
  for (const key of DEST_KEYS) {
    if (typeof config.dest[key] !== "string" || !config.dest[key].trim()) {
      throw new Error(`config: ${configPath}: dest.${key} must be a path`);
    }
  }
  if (config.themesFile !== undefined && (typeof config.themesFile !== "string" || !config.themesFile.trim())) {
    throw new Error(`config: ${configPath}: "themesFile" must be a path`);
  }
  const lint = Array.isArray(config.lint) ? config.lint : [config.lint];
  if (lint.length === 0 || lint.some((glob) => typeof glob !== "string" || !glob.trim())) {
    throw new Error(`config: ${configPath}: "lint" must be a glob or array of globs`);
  }
  return { ...config, lint, root: dirname(resolve(configPath)), path: resolve(configPath) };
}

// Minimal glob support: `**` spans path segments (including none), `*` and
// `?` stay within one segment. Enough for lint globs; no external dep.
export function globToRegExp(pattern) {
  const placeholder = "\u0000";
  const escaped = pattern
    .replace(/\/\*\*\//g, placeholder)
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*\*/g, ".*")
    .replace(/\*/g, "[^/]*")
    .replace(/\?/g, "[^/]")
    .split(placeholder)
    .join("(?:/.*)?/");
  return new RegExp(`^${escaped}$`);
}

// Directories the walk never descends into: dependency/vendor trees, VCS
// internals, and common build output. Lint globs are explicit, but the walk
// itself should not pay for or trip over trees it will never lint.
const PRUNE_DIRS = new Set([
  "node_modules", ".git", "dist", "build", "out", "output",
  ".next", ".nuxt", ".astro", ".svelte-kit", ".output", ".turbo",
  ".cache", "coverage", ".venv", "venv", "__pycache__",
]);

export function walkFiles(root) {
  const out = [];
  const visit = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!PRUNE_DIRS.has(entry.name)) visit(path);
      } else if (entry.isFile()) out.push(path);
    }
  };
  visit(root);
  return out;
}
