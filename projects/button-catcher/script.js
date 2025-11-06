'use strict';

const scoreEl = document.getElementById('score');
const catchBtn = document.getElementById('catch-btn');
const timeEl = document.getElementById('time');
const resetBtn = document.getElementById('reset-btn');

let score = 0;
let moveInterval = null;
let timeLeft = 20;
let timerId = null;

function clearTimers() {
  if (timerId) clearInterval(timerId);
  if (moveInterval) clearInterval(moveInterval);
  timerId = null;
  moveInterval = null;
}

// movement of button
function moveButton() {
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  const padding = 60;
  const x = Math.random() * (innerWidth - catchBtn.offsetWidth - padding);
  const y = Math.random() * (innerHeight - catchBtn.offsetHeight - padding);
  catchBtn.style.left = `${x}px`;
  catchBtn.style.top = `${y}px`;
}

function startMoving(speed = 1500) {
  if (moveInterval) clearInterval(moveInterval);
  moveButton();
  moveInterval = setInterval(moveButton, speed);
}

//timer
function startGameTimer(durationSec = 20) {
  timeLeft = durationSec;
  timeEl.textContent = timeLeft;

  timerId = setInterval(() => {
    timeLeft -= 1;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

// lifecycle
function startGame() {
  clearTimers();
  score = 0;
  scoreEl.textContent = score;

  catchBtn.disabled = false;
  catchBtn.textContent = 'Catch Me!';

  // keep reset hidden during play
  resetBtn.hidden = true;

  startMoving(1500);
  startGameTimer(20);
}

function endGame() {
  clearTimers();
  catchBtn.disabled = true;
  catchBtn.textContent = 'Time’s up!';
  resetBtn.hidden = false;
  resetBtn.style.display = 'inline-block';
  resetBtn.style.padding = '10px 16px';
  resetBtn.style.borderRadius = '10px';
  resetBtn.style.border = '1px solid #1b2740';
  resetBtn.style.background = '#162039';
  resetBtn.style.color = '#e6e9f2';
  resetBtn.style.fontWeight = '600';
  resetBtn.style.letterSpacing = '0.2px';
  resetBtn.style.boxShadow = '0 6px 18px rgba(0,0,0,0.25)';
  resetBtn.style.transition =
    'transform 0.08s ease, opacity 0.2s ease, box-shadow 0.2s ease';
  resetBtn.style.marginTop = '10px';
  resetBtn.style.cursor = 'pointer';

  resetBtn.onmouseenter = () => (resetBtn.style.transform = 'translateY(-1px)');
  resetBtn.onmouseleave = () => (resetBtn.style.transform = 'translateY(0)');
  resetBtn.onmousedown = () =>
    (resetBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.25)');
  resetBtn.onmouseup = () =>
    (resetBtn.style.boxShadow = '0 6px 18px rgba(0,0,0,0.25)');
}

function resetGame() {
  startGame();
}

// interactions
catchBtn.addEventListener('click', () => {
  moveButton();
  score++;
  scoreEl.textContent = score;
});
startGameTimer();

resetBtn.addEventListener('click', resetGame);
