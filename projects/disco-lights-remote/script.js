'use strict';

import {
  multiColors,
  bluesColors,
  redsColors,
  neutralColors,
  sunsetGradient,
  oceanGradient,
  forestGradient,
  neonGradient,
  wave,
} from './colors.js';

const powerToggle = document.getElementById('powerToggle');

// solid colors buttons
const multiBtn = document.getElementById('mode-multi');
const bluesBtn = document.getElementById('mode-blues');
const redsBtn = document.getElementById('mode-reds');
const neutralsBtn = document.getElementById('mode-neutrals');
// gradient colors buttons
const sunsetBtn = document.getElementById('grad-sunset');
const oceanBtn = document.getElementById('grad-ocean');
const forestBtn = document.getElementById('grad-forest');
const neonBtn = document.getElementById('grad-neon');
// effects buttons
const strobeBtn = document.getElementById('fx-strobe');
const pulseBtn = document.getElementById('fx-pulse');
const waveBtn = document.getElementById('fx-wave');
const randomBtn = document.getElementById('fx-random');

let powerOn = false;
let currentInterval = null;

function changeSolidMode(colorArray) {
  if (!powerOn) return;

  if (currentInterval !== null) {
    clearInterval(currentInterval);
    currentInterval = null;
  }
  document.body.style.transition = 'none';
  let i = 0;

  currentInterval = setInterval(() => {
    document.body.style.backgroundColor = colorArray[i];
    i++;
    if (i >= colorArray.length) i = 0;
  }, 500);
}

function changeGradientMode(colorArray) {
  if (!powerOn) return;

  if (currentInterval !== null) {
    clearInterval(currentInterval);
    currentInterval = null;
  }
  document.body.style.transition = 'background-color 2s linear';
  let i = 0;

  currentInterval = setInterval(() => {
    document.body.style.backgroundColor = colorArray[i];
    i++;
    if (i >= colorArray.length) i = 0;
  }, 2000);
}

function startStrobe() {
  if (!powerOn) return;

  if (currentInterval !== null) {
    clearInterval(currentInterval);
    currentInterval = null;
  }
  document.body.style.transition = 'none';

  let isWhite = false;

  currentInterval = setInterval(() => {
    document.body.style.backgroundColor = isWhite ? '#000000' : '#FFFFFF';
    isWhite = !isWhite;
  }, 100);
}

function startPulse() {
  if (!powerOn) return;

  if (currentInterval !== null) {
    clearInterval(currentInterval);
    currentInterval = null;
  }
  const pulseBaseColor = '#e5e5e5ff';
  document.body.style.transition = 'background-color 0.8s ease-in-out';

  let isBright = false;

  currentInterval = setInterval(() => {
    document.body.style.backgroundColor = isBright ? '#111111' : pulseBaseColor;
    isBright = !isBright;
  }, 800);
}

function startWave() {
  if (!powerOn) return;

  if (currentInterval !== null) {
    clearInterval(currentInterval);
    currentInterval = null;
  }

  document.body.style.transition = 'background-color 3s linear';

  let i = 0;

  currentInterval = setInterval(() => {
    document.body.style.backgroundColor = wave[i];
    i++;
    if (i >= wave.length) i = 0;
  }, 1200);
}

function startRandom() {
  if (!powerOn) return;

  if (currentInterval !== null) {
    clearInterval(currentInterval);
    currentInterval = null;
  }

  document.body.style.transition = 'none';

  currentInterval = setInterval(() => {
    const randomColor =
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
    document.body.style.backgroundColor = randomColor;
  }, 400);
}

powerToggle.addEventListener('click', function () {
  powerOn = !powerOn;

  if (!powerOn) {
    if (currentInterval !== null) {
      clearInterval(currentInterval);
      currentInterval = null;
    }

    document.body.style.transition = 'none';
    document.body.style.backgroundColor = '#111';

    powerToggle.textContent = 'Power Off';
  } else {
    powerToggle.textContent = 'Power On';
  }
});

multiBtn.addEventListener('click', () => changeSolidMode(multiColors));
bluesBtn.addEventListener('click', () => changeSolidMode(bluesColors));
redsBtn.addEventListener('click', () => changeSolidMode(redsColors));
neutralsBtn.addEventListener('click', () => changeSolidMode(neutralColors));
sunsetBtn.addEventListener('click', () => changeGradientMode(sunsetGradient));
oceanBtn.addEventListener('click', () => changeGradientMode(oceanGradient));
forestBtn.addEventListener('click', () => changeGradientMode(forestGradient));
neonBtn.addEventListener('click', () => changeGradientMode(neonGradient));
strobeBtn.addEventListener('click', startStrobe);
pulseBtn.addEventListener('click', startPulse);
waveBtn.addEventListener('click', startWave);
randomBtn.addEventListener('click', startRandom);
