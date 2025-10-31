'use strict';

const scoreEl = document.getElementById('score');
const catchBtn = document.getElementById('catch-btn');

let score = 0;

catchBtn.addEventListener('click', () => {
  score++;
  scoreEl.textContent = score;

  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;

  const padding = 50;
  const x = Math.random() * (innerWidth - catchBtn.offsetWidth - padding);
  const y = Math.random() * (innerHeight - catchBtn.offsetHeight - padding);

  catchBtn.style.left = `${x}px`;
  catchBtn.style.top = `${y}px`;
});
