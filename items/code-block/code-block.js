// Dependency-free copy-to-clipboard. Wires every code block on the page;
// the label doubles as the "Copied!" feedback.
for (const block of document.querySelectorAll(".uif-code-block")) {
  const button = block.querySelector("[data-slot='copy']");
  const code = block.querySelector("[data-slot='code']");
  button.addEventListener("click", () => {
    navigator.clipboard.writeText(code.textContent.trim()).then(() => {
      button.textContent = "Copied!";
      setTimeout(() => (button.textContent = "Copy"), 2000);
    });
  });
}
