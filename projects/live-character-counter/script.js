'use strict';

const textInput = document.getElementById('message');
const remainingChars = document.getElementById('remaining');
const used = document.getElementById('used');
const progressFill = document.getElementById('progressFill');

const postBtn = document.getElementById('postBtn');
const clearBtn = document.getElementById('clearBtn');
const postText = document.getElementById('post-text');
const postsList = document.getElementById('postsList');

const MAX = 140;
let posts = [];

function renderPosts() {
  postsList.innerHTML = '';
  for (let i = 0; i < posts.length; i++) {
    const li = document.createElement('li');
    li.textContent = posts[i];
    postsList.appendChild(li);
  }
}

/// Immediately Invoked Function Expression (IIFE)
(function init() {
  const rawData = localStorage.getItem('posts');
  if (rawData) {
    try {
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed)) posts = parsed;
    } catch (e) {
      console.log(e);
    }
  }
  renderPosts();
})();
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

  const text = textInput.value.trim();
  if (text.length === 0) return;
  posts.push(text);
  localStorage.setItem('posts', JSON.stringify(posts));
  renderPosts();
  postBtn.disabled = true;
});

clearBtn.addEventListener('click', function () {
  textInput.value = '';
  used.textContent = 0;
  remainingChars.textContent = MAX;
  progressFill.style.setProperty('--pct', 0);
  remainingChars.style.color = 'var(--text)';
  used.style.color = 'var(--text)';
  postBtn.disabled = true;
  textInput.focus();
});
