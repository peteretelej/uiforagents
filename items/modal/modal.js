// Dependency-free open/close on the native dialog element.
const dialog = document.querySelector(".uif-modal");

document.querySelector("[data-slot='open']").addEventListener("click", () => {
  if (!dialog.open) dialog.showModal();
});

dialog.querySelector("[data-slot='cancel']").addEventListener("click", () => dialog.close());
dialog.querySelector("[data-slot='confirm']").addEventListener("click", () => dialog.close());
