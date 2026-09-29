// Example themes: three OSS-safe token sets demonstrating the semantic-role
// coverage the kit's items consume. A theme is a complete visual identity as
// a token set; swap this file for your own themes module to restyle every
// item. Pinned fg/bg pairs are contrast-validated by scripts/build-arena.mjs
// (via scripts/lib/color.mjs) before the generated surfaces are written;
// sizes derive from --uifa-space and --uifa-text-base via calc().
//
// Token contract (per-theme CSS custom properties + color-scheme):
//   --uifa-bg, --uifa-surface, --uifa-surface-2, --uifa-border,
//   --uifa-border-strong, --uifa-text, --uifa-text-muted, --uifa-faint
//   --uifa-accent, --uifa-accent-soft, --uifa-accent-fg  (the accent slot)
//   --uifa-ok, --uifa-ok-soft, --uifa-ok-fg              (status: success)
//   --uifa-warn, --uifa-warn-soft, --uifa-warn-fg        (status: warning)
//   --uifa-danger, --uifa-danger-soft, --uifa-danger-fg  (status: destructive)
//   --uifa-scrim                                         (overlay backdrop)
//   --uifa-radius-control, --uifa-radius-surface, --uifa-radius-pill,
//   --uifa-border-width                                  (shape tiers)
//   --uifa-shadow-char                                   (depth)
//   --uifa-font-display, --uifa-font-body, --uifa-font-mono,
//   --uifa-text-base                                     (type)
//   --uifa-space                                         (density base unit)
//   --uifa-duration, --uifa-ease                         (motion)
//   --uifa-corner-shape, --uifa-noise                    (optional texture;
//     absent means the loader supplies the defaults: round, none)
//   color-scheme                                         (light/dark)
//
// Each theme may carry a `dialect` slot (a CSS string). It is loader-filled
// from themes/dialects/<slug>.css by convention, never hand-inlined here;
// the loader tolerates a missing or empty dialect directory.

export const themes = [
  {
    slug: "paper",
    name: "Paper",
    mood: "editorial",
    notes: "Warm paper, near-black ink, serif display. Quiet default.",
    tokens: {
      "--uifa-bg": "oklch(98% 0.005 85)",
      "--uifa-surface": "oklch(100% 0 0)",
      "--uifa-surface-2": "oklch(100% 0 0)",
      "--uifa-border": "oklch(90% 0.01 85)",
      "--uifa-border-strong": "oklch(90% 0.01 85)",
      "--uifa-text": "oklch(24% 0.01 75)",
      "--uifa-text-muted": "oklch(46% 0.015 75)",
      "--uifa-faint": "oklch(78% 0.008 80)",
      "--uifa-accent": "oklch(48% 0.13 55)",
      "--uifa-accent-soft": "oklch(95% 0.025 60)",
      "--uifa-accent-fg": "oklch(99% 0.005 85)",
      "--uifa-ok": "oklch(46% 0.11 155)",
      "--uifa-ok-soft": "oklch(95% 0.03 155)",
      "--uifa-ok-fg": "oklch(99% 0.005 155)",
      "--uifa-warn": "oklch(46% 0.1 70)",
      "--uifa-warn-soft": "oklch(96% 0.035 85)",
      "--uifa-warn-fg": "oklch(99% 0.005 85)",
      "--uifa-danger": "oklch(52% 0.17 30)",
      "--uifa-danger-soft": "oklch(95% 0.03 30)",
      "--uifa-danger-fg": "oklch(99% 0.005 30)",
      "--uifa-scrim": "oklch(24% 0.01 75 / 0.45)",
      "--uifa-radius-control": "8px",
      "--uifa-radius-surface": "8px",
      "--uifa-radius-pill": "999px",
      "--uifa-border-width": "1px",
      "--uifa-shadow-char":
        "0 1px 2px oklch(24% 0.01 75 / 0.08), 0 4px 12px oklch(24% 0.01 75 / 0.06)",
      "--uifa-font-display": "Georgia, 'Times New Roman', serif",
      "--uifa-font-body": "system-ui, sans-serif",
      "--uifa-font-mono": "ui-monospace, Menlo, Consolas, monospace",
      "--uifa-text-base": "16px",
      "--uifa-space": "8px",
      "--uifa-duration": "150ms",
      "--uifa-ease": "ease",
      "color-scheme": "light",
    },
  },
  {
    slug: "graphite",
    name: "Graphite",
    mood: "technical",
    notes: "Dark-first charcoal, cool gray, electric lime accent. Dense and flat.",
    tokens: {
      "--uifa-bg": "oklch(19% 0.005 260)",
      "--uifa-surface": "oklch(23% 0.007 260)",
      "--uifa-surface-2": "oklch(23% 0.007 260)",
      "--uifa-border": "oklch(32% 0.008 260)",
      "--uifa-border-strong": "oklch(32% 0.008 260)",
      "--uifa-text": "oklch(94% 0.003 260)",
      "--uifa-text-muted": "oklch(72% 0.006 260)",
      "--uifa-faint": "oklch(40% 0.006 260)",
      "--uifa-accent": "oklch(84% 0.17 110)",
      "--uifa-accent-soft": "oklch(84% 0.17 110 / 0.18)",
      "--uifa-accent-fg": "oklch(22% 0.02 110)",
      "--uifa-ok": "oklch(78% 0.14 155)",
      "--uifa-ok-soft": "oklch(78% 0.14 155 / 0.18)",
      "--uifa-ok-fg": "oklch(20% 0.02 155)",
      "--uifa-warn": "oklch(80% 0.14 85)",
      "--uifa-warn-soft": "oklch(80% 0.14 85 / 0.18)",
      "--uifa-warn-fg": "oklch(22% 0.02 85)",
      "--uifa-danger": "oklch(70% 0.18 25)",
      "--uifa-danger-soft": "oklch(70% 0.18 25 / 0.18)",
      "--uifa-danger-fg": "oklch(20% 0.02 25)",
      "--uifa-scrim": "oklch(10% 0.005 260 / 0.6)",
      "--uifa-radius-control": "4px",
      "--uifa-radius-surface": "4px",
      "--uifa-radius-pill": "999px",
      "--uifa-border-width": "1px",
      "--uifa-shadow-char": "0 1px 2px oklch(0% 0 0 / 0.4)",
      "--uifa-font-display": "ui-monospace, Menlo, Consolas, monospace",
      "--uifa-font-body": "system-ui, sans-serif",
      "--uifa-font-mono": "ui-monospace, Menlo, Consolas, monospace",
      "--uifa-text-base": "16px",
      "--uifa-space": "8px",
      "--uifa-duration": "150ms",
      "--uifa-ease": "ease",
      "color-scheme": "dark",
    },
  },
  {
    slug: "citrus",
    name: "Citrus",
    mood: "playful",
    notes: "Vivid orange accent, high-contrast ink, pill radius, hard sticker shadows.",
    tokens: {
      "--uifa-bg": "oklch(97% 0.02 100)",
      "--uifa-surface": "oklch(99.5% 0.01 105)",
      "--uifa-surface-2": "oklch(99.5% 0.01 105)",
      "--uifa-border": "oklch(88% 0.02 100)",
      "--uifa-border-strong": "oklch(88% 0.02 100)",
      "--uifa-text": "oklch(22% 0.01 110)",
      "--uifa-text-muted": "oklch(44% 0.015 110)",
      "--uifa-faint": "oklch(80% 0.015 105)",
      "--uifa-accent": "oklch(58% 0.16 60)",
      "--uifa-accent-soft": "oklch(93% 0.055 70)",
      "--uifa-accent-fg": "oklch(22% 0.02 100)",
      "--uifa-ok": "oklch(50% 0.12 150)",
      "--uifa-ok-soft": "oklch(94% 0.04 150)",
      "--uifa-ok-fg": "oklch(99% 0.005 150)",
      "--uifa-warn": "oklch(46% 0.1 70)",
      "--uifa-warn-soft": "oklch(95% 0.045 85)",
      "--uifa-warn-fg": "oklch(99% 0.005 85)",
      "--uifa-danger": "oklch(52% 0.18 28)",
      "--uifa-danger-soft": "oklch(94% 0.035 28)",
      "--uifa-danger-fg": "oklch(99% 0.005 28)",
      "--uifa-scrim": "oklch(22% 0.01 110 / 0.45)",
      "--uifa-radius-control": "16px",
      "--uifa-radius-surface": "16px",
      "--uifa-radius-pill": "999px",
      "--uifa-border-width": "1px",
      "--uifa-shadow-char": "0 2px 0 oklch(22% 0.01 110)",
      "--uifa-font-display": "system-ui, sans-serif",
      "--uifa-font-body": "system-ui, sans-serif",
      "--uifa-font-mono": "ui-monospace, Menlo, Consolas, monospace",
      "--uifa-text-base": "16px",
      "--uifa-space": "8px",
      "--uifa-duration": "150ms",
      "--uifa-ease": "ease",
      "color-scheme": "light",
    },
  },
];
