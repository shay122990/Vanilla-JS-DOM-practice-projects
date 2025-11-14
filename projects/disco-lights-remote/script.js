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

powerToggle.addEventListener('click', function () {
  powerOn = !powerOn;

  if (!powerOn) {
    if (currentInterval !== null) {
      clearInterval(currentInterval);
      currentInterval = null;
    }

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
