'use strict';

const emojis = document.querySelectorAll('.emoji');
const output = document.getElementById('output');
const resetBtn = document.getElementById('resetBtn');

const defaultText = 'Select a mood above!';

// When the page loads, check if there's a saved mood in localStorage
const savedMood = localStorage.getItem('mood');
if (savedMood) {
  // Find the matching emoji and activate it
  for (let i = 0; i < emojis.length; i++) {
    const emoji = emojis[i];
    if (emoji.dataset.mood === savedMood) {
      emoji.classList.add('active');
      output.textContent = 'You feel ' + savedMood + ' today!';
    }
  }
} else {
  output.textContent = defaultText;
}

function clearActive() {
  for (let i = 0; i < emojis.length; i++) {
    emojis[i].classList.remove('active');
  }
}

// Add click events to each emoji
for (let i = 0; i < emojis.length; i++) {
  const emoji = emojis[i];
  emoji.addEventListener('click', function () {
    const mood = emoji.dataset.mood;

    // Check if this emoji is already active
    const isActive = emoji.classList.contains('active');

    // Clear all active states first
    clearActive();

    if (isActive) {
      // If it was already active, unselect it
      output.textContent = defaultText;
      localStorage.removeItem('mood');
    } else {
      // Otherwise, activate it
      emoji.classList.add('active');
      output.textContent = 'You feel ' + mood + ' today!';
      localStorage.setItem('mood', mood);
    }
  });
}

// Reset button clears everything
resetBtn.addEventListener('click', function () {
  clearActive();
  output.textContent = defaultText;
  localStorage.removeItem('mood');
});
