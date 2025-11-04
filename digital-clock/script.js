'use strict';

const timeEl = document.getElementById('time');
const ampmEl = document.getElementById('ampm');
const dateEl = document.getElementById('date');
const display = document.getElementById('sw-display');
const startButton = document.getElementById('sw-start');
const stopButton = document.getElementById('sw-stop');
const resetButton = document.getElementById('sw-reset');
const lapButton = document.getElementById('sw-lap');
const lapsList = document.getElementById('sw-laps');

let isRunning = false;
let startTimestamp = 0;
let totalElapsedMs = 0;
let animationFrameId = null;
let lapTimes = [];
let previousLapElapsedMs = 0;

const pad = (n) => String(n).padStart(2, '0');
const pad3 = (n) => String(n).padStart(3, '0');

// ---- clock ----
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  timeEl.textContent = `${pad(hours)}:${minutes}:${seconds}`;
  ampmEl.textContent = ampm;
  dateEl.textContent = now.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

// ---- stopwatch ----
function formatMilliseconds(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor(ms % 1000);
  return `${pad(minutes)}:${pad(seconds)}.${pad3(milliseconds)}`;
}

function updateDisplay(ms) {
  display.textContent = formatMilliseconds(ms);
}

function updateButtonStates() {
  startButton.disabled = isRunning;
  stopButton.disabled = !isRunning;
  lapButton.disabled = !isRunning;
  resetButton.disabled = isRunning || totalElapsedMs === 0;
}

function updateFrame() {
  const now = performance.now();
  const currentElapsed = totalElapsedMs + (now - startTimestamp);
  updateDisplay(currentElapsed);
  animationFrameId = requestAnimationFrame(updateFrame);
}

function startStopwatch() {
  if (isRunning) return;
  isRunning = true;
  startTimestamp = performance.now();
  previousLapElapsedMs = totalElapsedMs;
  updateButtonStates();
  animationFrameId = requestAnimationFrame(updateFrame);
}

function stopStopwatch() {
  if (!isRunning) return;
  isRunning = false;
  totalElapsedMs += performance.now() - startTimestamp;
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  animationFrameId = null;
  updateDisplay(totalElapsedMs);
  updateButtonStates();
}

function resetStopwatch() {
  isRunning = false;
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  animationFrameId = null;
  totalElapsedMs = 0;
  previousLapElapsedMs = 0;
  lapTimes = [];
  lapsList.innerHTML = '';
  updateDisplay(0);
  updateButtonStates();
}

function recordLap() {
  if (!isRunning) return;
  const now = performance.now();
  const currentElapsed = totalElapsedMs + (now - startTimestamp);
  const lapDuration = currentElapsed - previousLapElapsedMs;
  previousLapElapsedMs = currentElapsed;
  lapTimes.push(lapDuration);

  const li = document.createElement('li');
  const lapIndex = document.createElement('span');
  const lapTime = document.createElement('span');
  lapIndex.className = 'lap-index';
  lapTime.className = 'lap-time';
  lapIndex.textContent = `#${lapTimes.length}`;
  lapTime.textContent = formatMilliseconds(lapDuration);
  li.append(lapIndex, lapTime);
  lapsList.prepend(li);
}

startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

updateClock();
setInterval(updateClock, 1000);
updateDisplay(0);
updateButtonStates();
