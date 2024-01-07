import Master from "./classes/Master.js";
import Track from "./classes/Track.js";

const master = Master.getMaster();
const tracks = [];

const playButt = document.querySelector("#play-button");
playButt.addEventListener("click", () => {
  for (let i = 0; i < 4; i++) {
    tracks.push(new Track(i));
  }
});

const playSoundButts = document.querySelectorAll(".play-sound");
playSoundButts.forEach((button, index) => {
  button.addEventListener("click", (e, i = index) => {
    tracks[i].playSound();
  });
});
