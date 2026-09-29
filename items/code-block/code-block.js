// Dependency-free copy-to-clipboard. Wires every code block on the page;
// the label doubles as the "Copied!" feedback.
for (const block of document.querySelectorAll(".uifa-code-block")) {
  const button = block.querySelector("[data-uifa-slot='copy']");
  const code = block.querySelector("[data-uifa-slot='code']");
  button.addEventListener("click", () => {
    navigator.clipboard.writeText(code.textContent.trim()).then(() => {
      button.textContent = "Copied!";
      setTimeout(() => (button.textContent = "Copy"), 2000);
    });
  });
}
