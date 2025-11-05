'use strict';

const displayEl = document.getElementById('sw-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

let isRunning = false;
let runStartTimestamp = 0;
let accumulatedMs = 0;
let animationFrameId = null;

let previousLapMarkMs = 0;
let lapDurationsMs = [];

const pad2 = (n) => String(n).padStart(2, '0');
const pad3 = (n) => String(n).padStart(3, '0');

function formatMs(ms) {
  const total = Math.floor(ms);
  const minutes = Math.floor(total / 60000);
  const seconds = Math.floor((total % 60000) / 1000);
  const millis = total % 1000;
  return `${pad2(minutes)}:${pad2(seconds)}.${pad3(millis)}`;
}

function renderDisplay(ms) {
  displayEl.textContent = formatMs(ms);
}

function setButtonStates() {
  startBtn.disabled = isRunning;
  stopBtn.disabled = !isRunning;
  lapBtn.disabled = !isRunning;
  resetBtn.disabled = isRunning || accumulatedMs === 0;
}

function frameUpdate() {
  const now = performance.now();
  const currentElapsed = accumulatedMs + (now - runStartTimestamp);
  renderDisplay(currentElapsed);
  animationFrameId = requestAnimationFrame(frameUpdate);
}

function startStopwatch() {
  if (isRunning) return;
  isRunning = true;
  runStartTimestamp = performance.now();

  previousLapMarkMs = accumulatedMs;

  setButtonStates();
  animationFrameId = requestAnimationFrame(frameUpdate);
}

function stopStopwatch() {
  if (!isRunning) return;
  isRunning = false;
  accumulatedMs += performance.now() - runStartTimestamp;

  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  animationFrameId = null;

  renderDisplay(accumulatedMs);
  setButtonStates();
}

function resetStopwatch() {
  isRunning = false;
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  animationFrameId = null;

  accumulatedMs = 0;
  previousLapMarkMs = 0;
  lapDurationsMs = [];
  lapsList.innerHTML = '';

  renderDisplay(0);
  setButtonStates();
}

function recordLap() {
  if (!isRunning) return;

  const now = performance.now();
  const currentElapsed = accumulatedMs + (now - runStartTimestamp);
  const lapMs = currentElapsed - previousLapMarkMs;
  previousLapMarkMs = currentElapsed;
  lapDurationsMs.push(lapMs);

  const li = document.createElement('li');
  const indexEl = document.createElement('span');
  const timeEl = document.createElement('span');
  indexEl.className = 'lap-index';
  timeEl.className = 'lap-time';
  indexEl.textContent = `#${lapDurationsMs.length}`;
  timeEl.textContent = formatMs(lapMs);
  li.append(indexEl, timeEl);

  // newest on top
  lapsList.prepend(li);
}

startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

renderDisplay(0);
setButtonStates();
