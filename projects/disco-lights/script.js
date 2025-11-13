'use strict';

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');

const codes = '0123456789ABCDEF';
let intervalId = null;

stopBtn.hidden = true;

function generateRandomString(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += codes.charAt(Math.floor(Math.random() * codes.length));
  }
  return '#' + result;
}

function startParty() {
  if (intervalId !== null) return;

  intervalId = setInterval(() => {
    const randomColor = generateRandomString(6);
    document.body.style.backgroundColor = randomColor;
  }, 500);

  stopBtn.hidden = false;
  startBtn.disabled = true;
}

function stopParty() {
  if (intervalId === null) return;

  clearInterval(intervalId);
  intervalId = null;

  stopBtn.hidden = true;
  startBtn.disabled = false;
}

startBtn.addEventListener('click', startParty);
stopBtn.addEventListener('click', stopParty);
