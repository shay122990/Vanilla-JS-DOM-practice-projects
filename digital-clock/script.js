'use strict';

const timeEl = document.getElementById('time');
const ampmEl = document.getElementById('ampm');
const dateEl = document.getElementById('date');

const pad = (n) => String(n).padStart(2, '0');

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  // Determine AM or PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Build formatted time
  const timeStr = `${pad(hours)}:${minutes}:${seconds}`;
  timeEl.textContent = timeStr;
  ampmEl.textContent = ampm;

  // Format and display date
  dateEl.textContent = now.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

// Initial call + update every second
updateClock();
setInterval(updateClock, 1000);
