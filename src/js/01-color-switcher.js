const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

startBtn.addEventListener('click', onClickStartChangeColor);
stopBtn.addEventListener('click', onClickStopChangeColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onClickStartChangeColor() {
  changeColor = setInterval(() => {
    startBtn.disabled = true;
    bodyEl.style.background = getRandomHexColor();
  }, 1000);
}

function onClickStopChangeColor() {
  clearInterval(changeColor);
  startBtn.disabled = false;
}
