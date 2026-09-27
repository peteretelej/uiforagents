// Example directions: three OSS-safe token sets demonstrating the semantic-role
// coverage the kit's items consume. A direction is a complete visual identity as
// a token set; swap this file for your own directions module to restyle every
// item. Palette pairs are contrast-checked by construction (fg >= 4.5:1 on its
// bg role); sizes derive from --space and --text-base via calc().
//
// Token contract (base scale, CSS custom properties + color-scheme):
//   --bg, --surface, --border, --text, --text-muted, --faint
//   --accent, --accent-soft, --accent-fg     (the accent slot)
//   --ok, --ok-soft, --ok-fg                 (status: success)
//   --warn, --warn-soft, --warn-fg           (status: warning)
//   --danger, --danger-soft, --danger-fg     (status: destructive)
//   --scrim                                  (overlay backdrop)
//   --radius, --shadow-char                  (layout tone)
//   --font-display, --font-body, --text-base (type)
//   --space                                  (density base unit)
//   color-scheme                             (light/dark)

export const directions = [
  {
    slug: "paper",
    name: "Paper",
    mood: "editorial",
    notes: "Warm paper, near-black ink, serif display. Quiet default.",
    tokens: {
      "--bg": "oklch(98% 0.005 85)",
      "--surface": "oklch(100% 0 0)",
      "--border": "oklch(90% 0.01 85)",
      "--text": "oklch(24% 0.01 75)",
      "--text-muted": "oklch(46% 0.015 75)",
      "--faint": "oklch(78% 0.008 80)",
      "--accent": "oklch(48% 0.13 55)",
      "--accent-soft": "oklch(95% 0.025 60)",
      "--accent-fg": "oklch(99% 0.005 85)",
      "--ok": "oklch(46% 0.11 155)",
      "--ok-soft": "oklch(95% 0.03 155)",
      "--ok-fg": "oklch(99% 0.005 155)",
      "--warn": "oklch(46% 0.1 70)",
      "--warn-soft": "oklch(96% 0.035 85)",
      "--warn-fg": "oklch(99% 0.005 85)",
      "--danger": "oklch(52% 0.17 30)",
      "--danger-soft": "oklch(95% 0.03 30)",
      "--danger-fg": "oklch(99% 0.005 30)",
      "--scrim": "oklch(24% 0.01 75 / 0.45)",
      "--radius": "8px",
      "--shadow-char":
        "0 1px 2px oklch(24% 0.01 75 / 0.08), 0 4px 12px oklch(24% 0.01 75 / 0.06)",
      "--font-display": "Georgia, 'Times New Roman', serif",
      "--font-body": "system-ui, sans-serif",
      "--space": "8px",
      "--text-base": "16px",
      "color-scheme": "light",
    },
  },
  {
    slug: "graphite",
    name: "Graphite",
    mood: "technical",
    notes: "Dark-first charcoal, cool gray, electric lime accent. Dense and flat.",
    tokens: {
      "--bg": "oklch(19% 0.005 260)",
      "--surface": "oklch(23% 0.007 260)",
      "--border": "oklch(32% 0.008 260)",
      "--text": "oklch(94% 0.003 260)",
      "--text-muted": "oklch(72% 0.006 260)",
      "--faint": "oklch(40% 0.006 260)",
      "--accent": "oklch(84% 0.17 110)",
      "--accent-soft": "oklch(84% 0.17 110 / 0.18)",
      "--accent-fg": "oklch(22% 0.02 110)",
      "--ok": "oklch(78% 0.14 155)",
      "--ok-soft": "oklch(78% 0.14 155 / 0.18)",
      "--ok-fg": "oklch(20% 0.02 155)",
      "--warn": "oklch(80% 0.14 85)",
      "--warn-soft": "oklch(80% 0.14 85 / 0.18)",
      "--warn-fg": "oklch(22% 0.02 85)",
      "--danger": "oklch(70% 0.18 25)",
      "--danger-soft": "oklch(70% 0.18 25 / 0.18)",
      "--danger-fg": "oklch(20% 0.02 25)",
      "--scrim": "oklch(10% 0.005 260 / 0.6)",
      "--radius": "4px",
      "--shadow-char": "0 1px 2px oklch(0% 0 0 / 0.4)",
      "--font-display": "ui-monospace, Menlo, Consolas, monospace",
      "--font-body": "system-ui, sans-serif",
      "--space": "8px",
      "--text-base": "16px",
      "color-scheme": "dark",
    },
  },
  {
    slug: "citrus",
    name: "Citrus",
    mood: "playful",
    notes: "Vivid orange accent, high-contrast ink, pill radius, hard sticker shadows.",
    tokens: {
      "--bg": "oklch(97% 0.02 100)",
      "--surface": "oklch(99.5% 0.01 105)",
      "--border": "oklch(88% 0.02 100)",
      "--text": "oklch(22% 0.01 110)",
      "--text-muted": "oklch(44% 0.015 110)",
      "--faint": "oklch(80% 0.015 105)",
      "--accent": "oklch(58% 0.16 60)",
      "--accent-soft": "oklch(93% 0.055 70)",
      "--accent-fg": "oklch(22% 0.02 100)",
      "--ok": "oklch(50% 0.12 150)",
      "--ok-soft": "oklch(94% 0.04 150)",
      "--ok-fg": "oklch(99% 0.005 150)",
      "--warn": "oklch(46% 0.1 70)",
      "--warn-soft": "oklch(95% 0.045 85)",
      "--warn-fg": "oklch(99% 0.005 85)",
      "--danger": "oklch(52% 0.18 28)",
      "--danger-soft": "oklch(94% 0.035 28)",
      "--danger-fg": "oklch(99% 0.005 28)",
      "--scrim": "oklch(22% 0.01 110 / 0.45)",
      "--radius": "16px",
      "--shadow-char": "0 2px 0 oklch(22% 0.01 110)",
      "--font-display": "system-ui, sans-serif",
      "--font-body": "system-ui, sans-serif",
      "--space": "8px",
      "--text-base": "16px",
      "color-scheme": "light",
    },
  },
];
