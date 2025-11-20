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

// GRADIENT THEMES (smooth fades between colors)
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

// restart current mode
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

    powerToggle.textContent = 'Power Off';
  } else {
    powerToggle.textContent = 'Power On';
  }
});

// SOLID MODES
multiBtn.addEventListener('click', () => changeSolidMode(multiColors));
bluesBtn.addEventListener('click', () => changeSolidMode(bluesColors));
redsBtn.addEventListener('click', () => changeSolidMode(redsColors));
neutralsBtn.addEventListener('click', () => changeSolidMode(neutralColors));

// GRADIENT MODES
sunsetBtn.addEventListener('click', () => changeGradientMode(sunsetGradient));
oceanBtn.addEventListener('click', () => changeGradientMode(oceanGradient));
forestBtn.addEventListener('click', () => changeGradientMode(forestGradient));
neonBtn.addEventListener('click', () => changeGradientMode(neonGradient));

// SPEED BUTTONS
slowBtn.addEventListener('click', () => {
  speed = 2000;
  restartCurrentMode();
});

mediumBtn.addEventListener('click', () => {
  speed = 1000;
  restartCurrentMode();
});

fastBtn.addEventListener('click', () => {
  speed = 500;
  restartCurrentMode();
});

insaneBtn.addEventListener('click', () => {
  speed = 100;
  restartCurrentMode();
});
