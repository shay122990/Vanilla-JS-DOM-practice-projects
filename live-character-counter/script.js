'use strict';

const textInput = document.getElementById('message');
const remainingChars = document.getElementById('remaining');
const used = document.getElementById('used');
const progressFill = document.getElementById('progressFill');

const postBtn = document.getElementById('postBtn');
const clearBtn = document.getElementById('clearBtn');
const postText = document.getElementById('post-text');

const MAX = 140;

textInput.addEventListener('input', function () {
  let usedCount = textInput.value.length;
  let remaining = MAX - usedCount;

  used.textContent = usedCount;
  remainingChars.textContent = remaining;

  let percent = Math.round((usedCount / MAX) * 100);
  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;
  progressFill.style.setProperty('--pct', percent);

  if (remaining < 0) {
    remainingChars.style.color = 'red';
    used.style.color = 'red';
    postBtn.disabled = true;
  } else {
    remainingChars.style.color = 'var(--text)';
    used.style.color = 'var(--text)';
    const hasContent = textInput.value.trim().length > 0;
    postBtn.disabled = !hasContent;
  }
});

postBtn.addEventListener('click', function () {
  if (postBtn.disabled) return;
  console.log('saved');
  postText.textContent = textInput.value;
  postBtn.disabled = true;
});

clearBtn.addEventListener('click', function () {
  textInput.value = '';
  used.textContent = 0;
  remainingChars.textContent = MAX;
  progressFill.style = '--pct: 0';
  remainingChars.style.color = 'var(--text)';
  used.style.color = 'var(--text)';
  postBtn.disabled = true;
  textInput.focus();
});
