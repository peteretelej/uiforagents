// Dependency-free open/close on the native dialog element.
const dialog = document.querySelector(".uifa-modal");

document.querySelector("[data-uifa-slot='open']").addEventListener("click", () => {
  if (!dialog.open) dialog.showModal();
});

dialog.querySelector("[data-uifa-slot='cancel']").addEventListener("click", () => dialog.close());
dialog.querySelector("[data-uifa-slot='confirm']").addEventListener("click", () => dialog.close());
