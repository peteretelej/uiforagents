// Compiles every generated Vue SFC with vue/compiler-sfc: parse + script
// compile + template compile. The generality proof for adapters.vue
// declarations.
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parse, compileScript, compileTemplate } from "vue/compiler-sfc";

const templates = readdirSync(resolve("adapters/vue"))
  .filter((file) => file.endsWith(".vue"))
  .sort();

describe.each(templates)("%s", (file) => {
  it("parses and compiles", () => {
    const source = readFileSync(resolve("adapters/vue", file), "utf8");
    const { descriptor, errors } = parse(source, { filename: file });
    expect(errors).toEqual([]);
    const hasScript = descriptor.script || descriptor.scriptSetup;
    const script = hasScript ? compileScript(descriptor, { id: file }) : null;
    const { errors: templateErrors } = compileTemplate({
      id: file,
      filename: file,
      source: descriptor.template.content,
      compilerOptions: { bindingMetadata: script?.bindings },
    });
    expect(templateErrors).toEqual([]);
  });
});
