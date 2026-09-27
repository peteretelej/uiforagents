// Dependency-free play-state demo: toggles the control and advances progress.
// Wire the same hooks to a real <audio> element in a consumer.
const player = document.querySelector(".uif-player");
const button = player.querySelector("[data-slot='play']");
const bar = player.querySelector("[data-slot='progress']");
const fill = player.querySelector("[data-slot='progress-fill']");

let playing = false;
let value = Number(bar.getAttribute("aria-valuenow")) || 0;
let timer;

button.addEventListener("click", () => {
  playing = !playing;
  button.textContent = playing ? "❚❚" : "▶";
  button.setAttribute("aria-label", playing ? "Pause" : "Play");
  clearInterval(timer);
  if (playing) {
    timer = setInterval(() => {
      value = (value + 1) % 101;
      bar.setAttribute("aria-valuenow", String(value));
      fill.style.width = value + "%";
    }, 250);
  }
});
