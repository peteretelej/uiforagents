// Headless gate for catalogue identities: zero console errors and no
// horizontal document overflow per viewport, for any built page. Zero kit
// dependencies: playwright resolves from the machine's global npm root.
//
// Usage: node tooling/check-mobile.mjs identities/<slug>/demo.html [more.html ...]
// Paths are relative to the working directory. For each file and each
// viewport (1280x800, 720x800, 390x844, 360x740) it asserts no horizontal document
// overflow and no console errors; exits 1 with a per-file report on any
// failure. A page may pan inside a contained scroll area; the document
// itself must not overflow.

import { execSync } from "node:child_process"
import { createRequire } from "node:module"
import { resolve } from "node:path"

const files = process.argv.slice(2)
if (files.length === 0) {
  console.error("usage: node tooling/check-mobile.mjs identities/<slug>/demo.html [...]")
  process.exit(2)
}

let playwright
try {
  const globalRoot = execSync("npm root -g", { encoding: "utf8" }).trim()
  const require = createRequire(globalRoot + "/")
  playwright = require("playwright")
} catch (err) {
  console.error("cannot resolve playwright from the machine install:", err.message)
  console.error("(the checker ships no dependency; install playwright globally to run it)")
  process.exit(2)
}

const VIEWPORTS = [
  { width: 1280, height: 800 },
  { width: 720, height: 800 },
  { width: 390, height: 844 },
  { width: 360, height: 740 },
]

const browser = await playwright.chromium.launch()
const failures = []
const report = []

try {
  for (const file of files) {
    const absolute = resolve(process.cwd(), file)
    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage({ viewport })
      const consoleErrors = []
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text())
      })
      page.on("pageerror", (err) => consoleErrors.push(String(err)))
      try {
        await page.goto("file://" + absolute, { waitUntil: "load" })
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
        const overflow = scrollWidth > viewport.width
        const label = `${file} @ ${viewport.width}x${viewport.height}`
        if (overflow) {
          failures.push(`${label}: scrollWidth ${scrollWidth}px > viewport ${viewport.width}px`)
          report.push(`FAIL ${label} - scrollWidth ${scrollWidth}px`)
        } else {
          report.push(`pass ${label} - scrollWidth ${scrollWidth}px`)
        }
        if (consoleErrors.length > 0) {
          for (const err of consoleErrors) {
            failures.push(`${label}: console error - ${err}`)
            report.push(`FAIL ${label} - console error: ${err}`)
          }
        }
      } catch (err) {
        failures.push(`${file} @ ${viewport.width}x${viewport.height}: page error - ${err.message}`)
        report.push(`FAIL ${file} @ ${viewport.width}x${viewport.height} - page error: ${err.message}`)
      } finally {
        await page.close()
      }
    }
  }
} finally {
  await browser.close()
}

console.log(report.join("\n"))
if (failures.length > 0) {
  console.error(`\n${failures.length} failure(s):`)
  for (const f of failures) console.error("  " + f)
  process.exit(1)
}
console.log("\nall checks passed")
