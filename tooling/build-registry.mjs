// Assembles the shadcn registry payload for an identity:
//   identities/<slug>/registry/registry.json        (index)
//   identities/<slug>/registry/<slug>.json          (composite style item, contents inlined)
// Usage: node tooling/build-registry.mjs [identitySlug]
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(process.cwd())
const slug = process.argv[2] || "ocean-calm"
const idDir = path.join(root, "identities", slug)
const outDir = path.join(idDir, "registry")

const read = (p) => fs.readFileSync(p, "utf8")
const identity = JSON.parse(read(path.join(idDir, "identity.json")))

const themeCss = read(path.join(idDir, "theme/theme.css"))
const overridesCss = read(path.join(idDir, "overrides/overrides.css"))
const pack = read(path.join(idDir, "prompt-pack.md"))
const blockFiles = fs
  .readdirSync(path.join(idDir, "blocks"))
  .filter((f) => f.endsWith(".tsx"))
  .sort()

const item = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: slug,
  type: "registry:style",
  title: identity.title,
  description: identity.description,
  author: "uiforagents",
  license: "Apache-2.0",
  dependencies: ["lucide-react", "class-variance-authority", "clsx", "tailwind-merge", "@radix-ui/react-slot"],
  registryDependencies: [],
  cssVars: {
    theme: {
      "--font-display": identity.typography.display,
      "--font-sans": identity.typography.body,
    },
    light: {
      "--background": identity.tokens.background,
      "--foreground": identity.tokens.text,
      "--card": identity.tokens.surface,
      "--card-foreground": identity.tokens.text,
      "--popover": identity.tokens.surface,
      "--popover-foreground": identity.tokens.text,
      "--primary": identity.tokens.accent,
      "--primary-foreground": identity.tokens["accent-fg"],
      "--secondary": identity.tokens["accent-soft"],
      "--secondary-foreground": identity.tokens.text,
      "--muted": "oklch(96.5% 0.008 242)",
      "--muted-foreground": identity.tokens["text-muted"],
      "--accent": identity.tokens["accent-soft"],
      "--accent-foreground": identity.tokens.text,
      "--destructive": identity.tokens.danger,
      "--destructive-foreground": identity.tokens["accent-fg"],
      "--border": identity.tokens.border,
      "--input": identity.tokens.border,
      "--ring": identity.tokens.accent,
      "--radius": "0.625rem",
    },
  },
  css: {
    "@theme inline": {
      "--color-background": "var(--background)",
      "--color-foreground": "var(--foreground)",
      "--color-primary": "var(--primary)",
      "--color-primary-foreground": "var(--primary-foreground)",
      "--color-secondary": "var(--secondary)",
      "--color-secondary-foreground": "var(--secondary-foreground)",
      "--color-muted": "var(--muted)",
      "--color-muted-foreground": "var(--muted-foreground)",
      "--color-accent": "var(--accent)",
      "--color-accent-foreground": "var(--accent-foreground)",
      "--color-destructive": "var(--destructive)",
      "--color-border": "var(--border)",
      "--color-input": "var(--input)",
      "--color-ring": "var(--ring)",
      "--font-display": identity.typography.display,
      "--font-sans": identity.typography.body,
    },
  },
  files: [
    {
      path: `theme/${slug}.css`,
      type: "registry:style",
      target: `src/identities/${slug}/theme.css`,
      content: themeCss + "\n\n/* ---- overrides ---- */\n" + overridesCss,
    },
    {
      path: `prompt-pack/${slug}.md`,
      type: "registry:file",
      target: `src/identities/${slug}/prompt-pack.md`,
      content: pack,
    },
    ...blockFiles.map((f) => ({
      path: `blocks/${f}`,
      type: "registry:block",
      target: `src/identities/${slug}/blocks/${f}`,
      content: read(path.join(idDir, "blocks", f)),
    })),
  ],
  meta: {
    identityVersion: identity.version,
    tested: identity.stack.tested,
    vibe: identity.vibe,
  },
}

fs.mkdirSync(outDir, { recursive: true })
const index = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: `@uiforagents/${slug}`,
  homepage: "https://uiforagents.com",
  items: [
    {
      name: slug,
      type: "registry:style",
      title: identity.title,
      description: identity.description,
      file: `${slug}.json`,
    },
  ],
}
fs.writeFileSync(path.join(outDir, "registry.json"), JSON.stringify(index, null, 2) + "\n")
fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(item, null, 2) + "\n")
console.log(
  `registry payload: identities/${slug}/registry/ (${blockFiles.length} blocks, theme + overrides + prompt-pack inlined)`,
)
