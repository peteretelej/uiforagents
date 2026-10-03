// Compiles every generated Svelte template with the Svelte compiler: parse +
// validate + codegen. The generality proof for adapters.svelte declarations.
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { compile } from "svelte/compiler";

const templates = readdirSync(resolve("adapters/svelte"))
  .filter((file) => file.endsWith(".svelte"))
  .sort();

describe.each(templates)("%s", (file) => {
  it("compiles", () => {
    const source = readFileSync(resolve("adapters/svelte", file), "utf8");
    const { warnings } = compile(source, { filename: file });
    expect(warnings).toEqual([]);
  });
});
