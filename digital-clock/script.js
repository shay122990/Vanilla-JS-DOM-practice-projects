'use strict';

const timeEl = document.getElementById('time');
const ampmEl = document.getElementById('ampm');
const dateEl = document.getElementById('date');
const toggle24h = document.getElementById('toggle-24h');
const tzSelect = document.getElementById('tz-select');

let use24hFormat = false;
let selectedTimezone = 'local';

const pad = (n) => String(n).padStart(2, '0');

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

function updateClock() {
  const now = new Date();

  let dateToDisplay = now;
  if (selectedTimezone !== 'local') {
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
