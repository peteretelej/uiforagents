// Parser for the kit's fixture.aria.yml grammar plus the assertion runner the
// generated adapter tests use. Grammar subset (plain list lines; nesting is
// flattened, entries keep document order):
//   - role "Accessible Name" [disabled] [level=3]
//   - role "Name":            (container line; children indented below)
//   - role: content           (role with its text as the accessible name)
//   - /placeholder: value     (attaches to the previous entry)
//   - text: words             (bare text, not a role)
//
// assertFixture runs under vitest with @testing-library/react's screen, so
// both are imported from the dev dependencies. A missing role/name throws
// from getByRole; explicit checks use expect.
import { expect } from "vitest";
import { screen } from "@testing-library/react";

export function parseFixture(source) {
  const entries = [];
  for (const raw of source.split("\n")) {
    const line = raw.trim();
    if (!line.startsWith("- ")) continue;
    const body = line.slice(2);
    let match;
    if ((match = /^text: (.*)$/.exec(body))) {
      entries.push({ text: match[1] });
      continue;
    }
    if ((match = /^\/placeholder: (.*)$/.exec(body))) {
      const prev = entries[entries.length - 1];
      if (prev?.role) prev.placeholder = match[1];
      continue;
    }
    if ((match = /^([a-z]+) "([^"]*)".*$/.exec(body))) {
      const entry = { role: match[1], name: match[2] };
      for (const flag of body.matchAll(/\[(disabled|level=(\d+))\]/g)) {
        if (flag[1] === "disabled") entry.disabled = true;
        else entry.level = Number(flag[2]);
      }
      entries.push(entry);
      continue;
    }
    if ((match = /^([a-z]+):(?: (.*))?$/.exec(body))) {
      entries.push(match[2] ? { role: match[1], name: match[2] } : { role: match[1] });
    }
  }
  return entries;
}

export function assertFixture(source) {
  for (const entry of parseFixture(source)) {
    if (entry.text !== undefined) {
      const flat = document.body.textContent.replace(/\s+/g, " ").trim();
      if (!flat.includes(entry.text)) expect(flat).toContain(entry.text);
      continue;
    }
    if (entry.role === "paragraph") {
      // dom-accessibility-api (testing-library's accname engine) computes no
      // paragraph role; the fixture's promise here is the copy itself.
      const flat = document.body.textContent.replace(/\s+/g, " ").trim();
      if (!flat.includes(entry.name)) expect(flat).toContain(entry.name);
      continue;
    }
    const element = screen.getByRole(entry.role, {
      name: entry.name,
      ...(entry.level !== undefined ? { level: entry.level } : {}),
    });
    if (entry.disabled) {
      expect(element.matches(":disabled") || element.getAttribute("aria-disabled") === "true").toBe(true);
    }
    if (entry.placeholder !== undefined) {
      expect(element.getAttribute("placeholder")).toBe(entry.placeholder);
    }
  }
}
