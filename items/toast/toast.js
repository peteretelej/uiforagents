// Dependency-free show/hide. The script scopes queries to its own markup; no ids.
const region = document.querySelector(".uif-toast-region");
const toast = region.querySelector(".uif-toast");
const trigger = document.querySelector("[data-slot='trigger']");
const close = toast.querySelector("[data-slot='close']");

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
