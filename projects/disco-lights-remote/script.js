const powerToggle = document.getElementById('powerToggle');

// solid colors buttons
const multiBtn = document.getElementById('mode-multi');
const bluesBtn = document.getElementById('mode-blues');
const redsBtn = document.getElementById('mode-reds');
const neutralsBtn = document.getElementById('mode-neutrals');

const multiColors = [
  '#FF0000',
  '#FF7F00',
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#0000FF',
  '#8B00FF',
  '#FF00FF',
  '#00FFAA',
  '#FF1493',
  '#FFD700',
  '#7FFF00',
  '#40E0D0',
  '#1E90FF',
  '#FF4500',
];

let powerOn = false;
let currentInterval = null;

const multiColorHandler = function () {
  if (!powerOn) return;
  if (currentInterval !== null) return;

  let i = 0;

  currentInterval = setInterval(() => {
    document.body.style.backgroundColor = multiColors[i];
    i++;
    if (i >= multiColors.length) i = 0;
  }, 500);
};

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

multiBtn.addEventListener('click', multiColorHandler);
