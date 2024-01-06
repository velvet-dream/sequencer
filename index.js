const playButt = document.querySelector("#play-button");
playButt.addEventListener("click", () => {
  const audioCtx = new AudioContext();
  const oscillator = new OscillatorNode(audioCtx, {
    type: "sine",
  });
  oscillator.connect(audioCtx.destination);
  oscillator.start(1);
  oscillator.stop(1 + 1);
});
