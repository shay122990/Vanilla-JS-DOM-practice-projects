'use strict';

const startBtn = document.getElementById('start');
let codes = '0123456789ABCDEF';
let intervalId = null;

function generateRandomString(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += codes.charAt(Math.floor(Math.random() * codes.length));
  }
  return '#' + result;
}

function changeColor() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    const randomColor = generateRandomString(6);
    document.body.style.backgroundColor = randomColor;
  }, 800);
}

startBtn.addEventListener('click', changeColor);
