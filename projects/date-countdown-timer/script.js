'use strict';

const form = document.querySelector('#countdownForm');
const targetInput = document.querySelector('#targetInput');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const msg = document.querySelector('#msg');

const daysEl = document.querySelector('#days');
const hoursEl = document.querySelector('#hours');
const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');

let timerId = null;
let targetMs = null;

function pad2(n) {
  return String(n).padStart(2, '0');
}

function setMessage(text, type = 'info') {
  msg.textContent = text;

  // optional style hook if you want later
  msg.dataset.type = type;
}

function renderTimeLeft(msLeft) {
  // If time is up
  if (msLeft <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const totalSeconds = Math.floor(msLeft / 1000);

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  // Days can be more than 2 digits, so only pad hours/min/sec
  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = pad2(hours);
  minutesEl.textContent = pad2(minutes);
  secondsEl.textContent = pad2(seconds);
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function tick() {
  const now = Date.now();
  const msLeft = targetMs - now;

  renderTimeLeft(msLeft);

  if (msLeft <= 0) {
    stopTimer();
    setMessage("Time's up! 🎉", 'done');
    startBtn.disabled = false;
  }
}

function startCountdown(dateValue) {
  // dateValue from datetime-local looks like: "2026-01-08T09:30"
  // new Date(dateValue) treats it as local time (which is what we want)
  const date = new Date(dateValue);

  // Invalid date guard
  if (Number.isNaN(date.getTime())) {
    setMessage('Please pick a valid date and time.', 'error');
    return;
  }

  const now = Date.now();
  const chosen = date.getTime();

  if (chosen <= now) {
    setMessage('Pick a future date/time (not in the past).', 'error');
    return;
  }

  targetMs = chosen;

  // Render immediately so UI updates without waiting 1s
  tick();

  // Restart interval
  stopTimer();
  timerId = setInterval(tick, 250);

  setMessage('Countdown running…', 'running');
  startBtn.disabled = true;
}

function resetUI() {
  stopTimer();
  targetMs = null;

  daysEl.textContent = '00';
  hoursEl.textContent = '00';
  minutesEl.textContent = '00';
  secondsEl.textContent = '00';

  setMessage('Not started.', 'info');
  startBtn.disabled = false;
  form.reset();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  startCountdown(targetInput.value);
});

resetBtn.addEventListener('click', resetUI);

//  if user changes date while timer running, restart
targetInput.addEventListener('change', () => {
  if (timerId !== null) {
    startBtn.disabled = false;
    stopTimer();
    setMessage('Date changed. Click Start to run again.', 'info');
  }
});

resetUI();
