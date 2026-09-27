# Footer

Site footer with brand block, link groups, and a legal line; columned or single-row.

Category: navigation · Behavior: none · Schema: 1.0.0 · Source: original

## Variants

| `data-variant` | Description |
| --- | --- |
| `columns` (default) | Brand block, link groups, and a full-width legal line; omit data-variant. |
| `simple` | Single row: wordmark and legal line via `data-variant="simple"`. |

## Tokens

Reads: `--surface`, `--border`, `--text`, `--text-muted`, `--faint`, `--accent`, `--font-display`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Columned footer: brand block, link groups, full-width legal line.
     Single-row variant: data-variant="simple" with wordmark + legal only. -->
<footer class="uif-footer">
  <div data-slot="brand">
    <a data-slot="wordmark" href="/">Acme</a>
    <p data-slot="note">Recording studio for distributed teams.</p>
  </div>
  <nav data-slot="group" aria-label="Product">
    <span data-slot="heading">Product</span>
    <a data-slot="link" href="#">Episodes</a>
    <a data-slot="link" href="#">Pricing</a>
    <a data-slot="link" href="#">Support</a>
  </nav>
  <nav data-slot="group" aria-label="Company">
    <span data-slot="heading">Company</span>
    <a data-slot="link" href="#">About</a>
    <a data-slot="link" href="#">Careers</a>
    <a data-slot="link" href="#">Contact</a>
  </nav>
  <p data-slot="legal">© 2026 Acme Inc. All rights reserved.</p>
</footer>
```

## Files

- [footer.html](../../items/footer/footer.html) - markup
- [footer.css](../../items/footer/footer.css) - style
- [footer.example.html](../../items/footer/footer.example.html) - example
- [fixture.aria.yml](../../items/footer/fixture.aria.yml) - fixture

## Usage

Columned footer: brand copy under `data-slot="brand"` (wordmark plus note), link groups as `data-slot="group"` navs with `data-slot="heading"` labels, and `data-slot="legal"` spanning the full width. Variant `simple` (via `data-variant="simple"`) is a single wordmark + legal row for lean pages.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/footer/fixture.aria.yml
```
