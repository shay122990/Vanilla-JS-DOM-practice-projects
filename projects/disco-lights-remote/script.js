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

// speed buttons
const slowBtn = document.getElementById('speed-slow');
const mediumBtn = document.getElementById('speed-medium');
const fastBtn = document.getElementById('speed-fast');
const insaneBtn = document.getElementById('speed-insane');

// groups for visual active state
const modeButtons = [
  multiBtn,
  bluesBtn,
  redsBtn,
  neutralsBtn,
  sunsetBtn,
  oceanBtn,
  forestBtn,
  neonBtn,
];

const speedButtons = [slowBtn, mediumBtn, fastBtn, insaneBtn];

let powerOn = false;
let currentInterval = null;
let speed = 1000;
let currentMode = null;
let currentArray = null;

function clearCurrentInterval() {
  if (currentInterval !== null) {
    clearInterval(currentInterval);
    currentInterval = null;
  }
}

function resetBodyVisual() {
  document.body.style.transition = 'none';
}

// clear active visual states
function clearActiveModes() {
  modeButtons.forEach((btn) => btn.classList.remove('remote__btn--active'));
}

function clearActiveSpeeds() {
  speedButtons.forEach((btn) => btn.classList.remove('remote__btn--active'));
}

// SOLID COLORS
function changeSolidMode(colorArray) {
  if (!powerOn) return;

  clearCurrentInterval();
  resetBodyVisual();

  document.body.style.transition = 'none';

  currentMode = 'solid';
  currentArray = colorArray;

  let i = 0;

  currentInterval = setInterval(() => {
    document.body.style.backgroundColor = colorArray[i];
    i++;
    if (i >= colorArray.length) i = 0;
  }, speed);
}

// GRADIENT
function changeGradientMode(colorArray) {
  if (!powerOn) return;

  clearCurrentInterval();
  resetBodyVisual();

  document.body.style.transition = `background-color ${speed / 1000}s linear`;

  currentMode = 'gradient';
  currentArray = colorArray;

  let i = 0;

  currentInterval = setInterval(() => {
    document.body.style.backgroundColor = colorArray[i];
    i++;
    if (i >= colorArray.length) i = 0;
  }, speed);
}

// restart current mode after speed changes
function restartCurrentMode() {
  if (!powerOn) return;

  clearCurrentInterval();

  if (currentMode === 'solid' && currentArray) {
    changeSolidMode(currentArray);
  } else if (currentMode === 'gradient' && currentArray) {
    changeGradientMode(currentArray);
  }
}

// POWER
powerToggle.addEventListener('click', function () {
  powerOn = !powerOn;

  if (!powerOn) {
    clearCurrentInterval();
    resetBodyVisual();
    document.body.style.backgroundColor = '#111';

    currentMode = null;
    currentArray = null;

    clearActiveModes();

    powerToggle.textContent = 'Power Off';
  } else {
    powerToggle.textContent = 'Power On';
  }
});

// SOLID MODES
multiBtn.addEventListener('click', () => {
  if (!powerOn) return;
  changeSolidMode(multiColors);
  clearActiveModes();
  multiBtn.classList.add('remote__btn--active');
});

bluesBtn.addEventListener('click', () => {
  if (!powerOn) return;
  changeSolidMode(bluesColors);
  clearActiveModes();
  bluesBtn.classList.add('remote__btn--active');
});

redsBtn.addEventListener('click', () => {
  if (!powerOn) return;
  changeSolidMode(redsColors);
  clearActiveModes();
  redsBtn.classList.add('remote__btn--active');
});

neutralsBtn.addEventListener('click', () => {
  if (!powerOn) return;
  changeSolidMode(neutralColors);
  clearActiveModes();
  neutralsBtn.classList.add('remote__btn--active');
});

// GRADIENT MODES
sunsetBtn.addEventListener('click', () => {
  if (!powerOn) return;
  changeGradientMode(sunsetGradient);
  clearActiveModes();
  sunsetBtn.classList.add('remote__btn--active');
});

oceanBtn.addEventListener('click', () => {
  if (!powerOn) return;
  changeGradientMode(oceanGradient);
  clearActiveModes();
  oceanBtn.classList.add('remote__btn--active');
});

forestBtn.addEventListener('click', () => {
  if (!powerOn) return;
  changeGradientMode(forestGradient);
  clearActiveModes();
  forestBtn.classList.add('remote__btn--active');
});

neonBtn.addEventListener('click', () => {
  if (!powerOn) return;
  changeGradientMode(neonGradient);
  clearActiveModes();
  neonBtn.classList.add('remote__btn--active');
});

// SPEED BUTTONS
slowBtn.addEventListener('click', () => {
  if (!powerOn) return;
  speed = 2000;
  clearActiveSpeeds();
  slowBtn.classList.add('remote__btn--active');
  restartCurrentMode();
});

mediumBtn.addEventListener('click', () => {
  if (!powerOn) return;
  speed = 1000;
  clearActiveSpeeds();
  mediumBtn.classList.add('remote__btn--active');
  restartCurrentMode();
});

fastBtn.addEventListener('click', () => {
  if (!powerOn) return;
  speed = 500;
  clearActiveSpeeds();
  fastBtn.classList.add('remote__btn--active');
  restartCurrentMode();
});

insaneBtn.addEventListener('click', () => {
  if (!powerOn) return;
  speed = 100;
  clearActiveSpeeds();
  insaneBtn.classList.add('remote__btn--active');
  restartCurrentMode();
});
