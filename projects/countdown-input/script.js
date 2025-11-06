'use strict';

const countdownElement = document.getElementById('time');
const input = document.getElementById('typing-input');
const result = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');

let count = 10;
let timerId;

const startCountdown = () => {
  timerId = setInterval(() => {
    count--;
    countdownElement.textContent = count;

    if (count <= 0) {
      clearInterval(timerId);
      input.disabled = true;
      result.textContent = `You typed ${input.value.length} characters.`;
    }
  }, 1000);
};

input.addEventListener('input', startCountdown, { once: true });

restartBtn.addEventListener('click', function () {
  clearInterval(timerId);
  count = 10;
  countdownElement.textContent = count;
  input.disabled = false;
  input.value = '';
  result.textContent = '';

  input.addEventListener('input', startCountdown, { once: true });
});
