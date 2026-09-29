// Dependency-free show/hide. The script scopes queries to its own markup; no ids.
const region = document.querySelector(".uifa-toast-region");
const toast = region.querySelector(".uifa-toast");
const trigger = document.querySelector("[data-uifa-slot='trigger']");
const close = toast.querySelector("[data-uifa-slot='close']");

let timer;
trigger.addEventListener("click", () => {
  clearTimeout(timer);
  toast.dataset.state = "visible";
  timer = setTimeout(() => {
    toast.dataset.state = "hidden";
  }, 4000);
});

close.addEventListener("click", () => {
  clearTimeout(timer);
  toast.dataset.state = "hidden";
});
