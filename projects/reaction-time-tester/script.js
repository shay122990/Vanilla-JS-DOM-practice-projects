'use strict';
const box = document.getElementById('box');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');

let timerId = null; // setTimeout id
let ready = false; // true when box is green
let startTs = 0; // time when it turns green
let clicked = false; // to ignore multiple clicks

function init() {
  clearTimeout(timerId);
  box.style.background = ''; // default red from CSS
  box.textContent = 'Wait...';
  message.textContent = '';
  ready = false;
  clicked = false;

  const delay = Math.floor(Math.random() * 4000) + 1000; // 1000–5000 ms
  timerId = setTimeout(() => {
    box.style.background = 'var(--green)';
    box.textContent = 'CLICK!';
    ready = true;
    startTs = performance.now(); // Returns a high-resolution timestamp (fractional milliseconds)
  }, delay);
}
box.addEventListener('click', () => {
  if (clicked) return;

  if (!ready) {
    clearTimeout(timerId);
    message.textContent = 'Too soon! ❌';
    box.textContent = 'Too soon!';
    clicked = true;
    return;
  }

  const rt = Math.round(performance.now() - startTs);
  message.textContent = `Your reaction: ${rt} ms ✅`;
  box.textContent = `${rt} ms`;
  clicked = true;
});
restartBtn.addEventListener('click', init);
init();
