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
const toggle24h = document.getElementById('toggle-24h');
const tzSelect = document.getElementById('tz-select');

let isRunning = false;
let startTimestamp = 0;
let totalElapsedMs = 0;
let animationFrameId = null;
let lapTimes = [];
let previousLapElapsedMs = 0;
let use24hFormat = false;
let selectedTimezone = 'local';

const pad = (n) => String(n).padStart(2, '0');
const pad3 = (n) => String(n).padStart(3, '0');

const timezones = [
  'local',
  'UTC',
  'Europe/London',
  'Europe/Paris',
  'Asia/Dubai',
  'Asia/Bishkek',
  'America/New_York',
  'Asia/Tokyo',
];

tzSelect.innerHTML = timezones
  .map(
    (tz) =>
      `<option value="${tz}" ${tz === 'local' ? 'selected' : ''}>${tz}</option>`
  )
  .join('');

// ---- clock ----
function updateClock() {
  const now = new Date();

  let dateToDisplay = now;
  if (selectedTimezone !== 'local') {
    // convert to selected timezone using Intl
    dateToDisplay = new Date(
      now.toLocaleString('en-US', { timeZone: selectedTimezone })
    );
  }

  let hours = dateToDisplay.getHours();
  const minutes = pad(dateToDisplay.getMinutes());
  const seconds = pad(dateToDisplay.getSeconds());
  const ampm = hours >= 12 ? 'PM' : 'AM';

  if (!use24hFormat) hours = hours % 12 || 12;

  const timeStr = `${pad(hours)}:${minutes}:${seconds}`;
  timeEl.textContent = timeStr;
  ampmEl.textContent = use24hFormat ? '' : ampm;

  dateEl.textContent = dateToDisplay.toLocaleDateString(undefined, {
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
toggle24h.addEventListener('change', (e) => {
  use24hFormat = e.target.checked;
  updateClock();
});

tzSelect.addEventListener('change', (e) => {
  selectedTimezone = e.target.value;
  updateClock();
});

updateClock();
setInterval(updateClock, 1000);
updateDisplay(0);
updateButtonStates();
